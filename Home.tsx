import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, CheckCircle, Calendar, Shield } from 'lucide-react';
import { SPECIALTIES, LOCATIONS } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?specialty=${searchSpecialty}&location=${searchLocation}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Find the Best <span className="text-blue-200">Doctors</span> in India
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-blue-100 mb-10">
            Book appointments with top-rated vascular specialists, cardiologists, and more across Mumbai, Delhi, Bangalore and other major cities.
          </p>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-4">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                >
                  <option value="">Select City</option>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={searchSpecialty}
                  onChange={(e) => setSearchSpecialty(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                >
                  <option value="">Select Specialty</option>
                  {SPECIALTIES.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                </select>
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Signals / Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-slate-50 transition">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">MCI Verified Specialists</h3>
              <p className="text-gray-600">Every doctor on our platform is verified for their credentials and registration.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-slate-50 transition">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Booking</h3>
              <p className="text-gray-600">View real-time availability and book appointments instantly online.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-slate-50 transition">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your health data and personal information are kept safe and secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Specialties */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Top Specialties</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPECIALTIES.slice(0, 8).map((spec) => (
              <div
                key={spec}
                onClick={() => navigate(`/search?specialty=${spec}`)}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition border border-gray-100 hover:border-blue-300 text-center"
              >
                <p className="font-medium text-gray-800">{spec}</p>
                <p className="text-sm text-gray-500 mt-1">Book now</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Are you a qualified doctor?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of other doctors and grow your practice by reaching more patients across India.
          </p>
          <button
             onClick={() => navigate('/doctor-register')}
             className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            Join as a Doctor
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;