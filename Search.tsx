import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SPECIALTIES, LOCATIONS } from '../constants';
import { useData } from '../context/DataContext';
import { Star, MapPin, Clock, Filter, ThumbsUp } from 'lucide-react';

const SearchPage: React.FC = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const { doctors } = useData();
  
  const [selectedSpecialty, setSelectedSpecialty] = useState(queryParams.get('specialty') || '');
  const [selectedLocation, setSelectedLocation] = useState(queryParams.get('location') || '');
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    setSelectedSpecialty(queryParams.get('specialty') || '');
    setSelectedLocation(queryParams.get('location') || '');
  }, [search]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchSpec = selectedSpecialty ? doc.specialty === selectedSpecialty : true;
      const matchLoc = selectedLocation ? doc.location === selectedLocation : true;
      const matchRating = doc.rating >= minRating;
      return matchSpec && matchLoc && matchRating;
    });
  }, [doctors, selectedSpecialty, selectedLocation, minRating]);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedSpecialty ? `${selectedSpecialty}s` : 'All Specialists'} 
            {selectedLocation ? ` in ${selectedLocation}` : ''}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <Filter className="h-5 w-5 text-blue-600" />
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <select 
                  value={selectedSpecialty} 
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2 border"
                >
                  <option value="">All Specialties</option>
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select 
                  value={selectedLocation} 
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2 border"
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.0].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        id={`rating-${rating}`}
                        name="rating"
                        type="radio"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                        {rating}+ <Star className="h-3 w-3 text-yellow-400 ml-1 fill-current" />
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      id="rating-all"
                      name="rating"
                      type="radio"
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="rating-all" className="ml-2 text-sm text-gray-700">Any</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="flex-1">
            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
                <button 
                  onClick={() => {setSelectedLocation(''); setSelectedSpecialty(''); setMinRating(0);}}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredDoctors.map((doc) => (
                  <div key={doc.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col sm:flex-row">
                    <div className="w-full sm:w-48 h-48 sm:h-auto relative">
                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-blue-800 shadow-sm backdrop-blur-sm">
                            {doc.experience}+ Years Exp.
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                <Link to={`/doctor/${doc.id}`} className="hover:text-blue-600 transition">
                                    {doc.name}
                                </Link>
                            </h3>
                            <p className="text-blue-600 font-medium">{doc.specialty}</p>
                            <p className="text-sm text-gray-500 mt-1">{doc.hospitalAffiliation}</p>
                          </div>
                          <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                            <span className="text-green-700 font-bold mr-1">{doc.rating}</span>
                            <Star className="h-4 w-4 text-green-500 fill-current" />
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {doc.location}
                          </div>
                          <div className="flex items-center">
                             <ThumbsUp className="h-4 w-4 mr-1 text-gray-400" />
                             {doc.reviewCount} Reviews
                          </div>
                          <div className="flex items-center text-green-600 font-medium">
                            <Clock className="h-4 w-4 mr-1" />
                            Available Today
                          </div>
                        </div>
                        
                        <div className="mt-3">
                            <p className="text-sm text-gray-500 line-clamp-2">{doc.about}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between border-t pt-4 gap-4">
                        <div className="text-gray-900 font-semibold">
                           ₹{doc.consultationFee} <span className="text-gray-500 font-normal text-sm">/ Consultation</span>
                        </div>
                        <Link 
                          to={`/doctor/${doc.id}`}
                          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition text-center shadow-sm"
                        >
                          Book Appointment
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;