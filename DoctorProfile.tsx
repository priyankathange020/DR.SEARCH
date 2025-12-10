import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Star, MapPin, Clock, Calendar, Check, ShieldCheck, Info } from 'lucide-react';
import { Appointment } from '../types';

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { getDoctorById, bookAppointment, getAppointmentsByDoctor } = useData();
  
  const doctor = getDoctorById(id || '');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Define standard time slots
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", 
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM"
  ];

  // Calculate available slots based on booked appointments
  const availableSlots = useMemo(() => {
    if (!selectedDate || !doctor) return [];
    
    // Get day name from date
    const dateObj = new Date(selectedDate);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

    // Check if doctor works on this day
    if (!doctor.availability.includes(dayName)) return [];

    const existingAppointments = getAppointmentsByDoctor(doctor.id);
    const bookedTimes = existingAppointments
        .filter(appt => appt.date === selectedDate && appt.status !== 'CANCELLED')
        .map(appt => appt.time);

    return timeSlots.filter(slot => !bookedTimes.includes(slot));
  }, [selectedDate, doctor, getAppointmentsByDoctor, timeSlots]);

  if (!doctor) {
    return <div className="p-10 text-center">Doctor not found. <Link to="/search" className="text-blue-600">Go back</Link></div>;
  }

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      navigate('/login', { state: { from: `/doctor/${id}` } });
      return;
    }

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId: doctor.id,
      patientId: user.id,
      date: selectedDate,
      time: selectedTime,
      reason: reason,
      status: 'CONFIRMED'
    };

    bookAppointment(newAppointment);
    setBookingSuccess(true);
  };

  // Get current date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header/Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <Link to="/search" className="text-gray-500 hover:text-blue-600 text-sm">Back to Search</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Doctor Info */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <img 
                            src={doctor.image} 
                            alt={doctor.name} 
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-50 shadow-md"
                        />
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
                            <p className="text-lg text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                            <p className="text-gray-600 mb-4 flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                {doctor.hospitalAffiliation}, {doctor.location}
                            </p>
                            
                            <div className="flex items-center gap-6 text-sm">
                                <div className="bg-green-50 text-green-700 px-3 py-1 rounded font-bold flex items-center">
                                    {doctor.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                                </div>
                                <div className="text-gray-500">
                                    <span className="font-bold text-gray-900">{doctor.reviewCount}</span> Reviews
                                </div>
                                <div className="text-gray-500">
                                    <span className="font-bold text-gray-900">{doctor.experience}+ Years</span> Experience
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">About Doctor</h2>
                        <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Specializations</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Varicose Veins', 'Laser Treatment', 'General Surgery', 'Vascular Medicine'].map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Col: Booking Form */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 sticky top-24">
                    {!bookingSuccess ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Book Appointment</h3>
                                <span className="text-blue-600 font-bold text-lg">₹{doctor.consultationFee}</span>
                            </div>

                            <form onSubmit={handleBook} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        min={today}
                                        className="w-full border-gray-300 rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={selectedDate}
                                        onChange={(e) => {
                                            setSelectedDate(e.target.value);
                                            setSelectedTime('');
                                        }}
                                    />
                                    {selectedDate && availableSlots.length === 0 && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center">
                                            <Info className="w-3 h-3 mr-1" />
                                            Doctor not available on this day or fully booked.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                                    <select 
                                        required
                                        disabled={!selectedDate || availableSlots.length === 0}
                                        className="w-full border-gray-300 rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                    >
                                        <option value="">-- Select Slot --</option>
                                        {availableSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                                    <textarea 
                                        rows={3}
                                        required
                                        className="w-full border-gray-300 rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Briefly describe your problem..."
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    {isAuthenticated ? (
                                        <button 
                                            type="submit" 
                                            disabled={!selectedTime}
                                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition shadow-md disabled:bg-blue-300 disabled:cursor-not-allowed"
                                        >
                                            Confirm Booking
                                        </button>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={() => navigate('/login', { state: { from: `/doctor/${id}` } })}
                                            className="w-full bg-slate-800 text-white font-bold py-3 rounded-md hover:bg-slate-900 transition shadow-md flex justify-center items-center gap-2"
                                        >
                                           Login to Book
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-center text-gray-500 mt-2">
                                    <ShieldCheck className="inline w-3 h-3 mr-1" />
                                    No payment required until visit
                                </p>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-10">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                <Check className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Booking Confirmed!</h3>
                            <p className="text-gray-500 mt-2 mb-6">
                                Your appointment with {doctor.name} on <br/>
                                <span className="font-semibold text-gray-700">{selectedDate}</span> at <span className="font-semibold text-gray-700">{selectedTime}</span> <br/>
                                is successfully scheduled.
                            </p>
                            <button 
                                onClick={() => navigate('/search')}
                                className="w-full bg-gray-100 text-gray-800 font-medium py-2 rounded hover:bg-gray-200 transition"
                            >
                                Book Another
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-900 flex items-center mb-2">
                        <Clock className="w-4 h-4 mr-2" /> Clinic Timings
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        {doctor.availability.map(day => (
                            <li key={day} className="flex justify-between">
                                <span>{day}</span>
                                <span>09:00 AM - 06:00 PM</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;