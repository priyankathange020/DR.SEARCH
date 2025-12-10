import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import DoctorProfile from './pages/DoctorProfile';
import Login from './pages/Login';
import DoctorRegister from './pages/DoctorRegister';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/doctor/:id" element={<DoctorProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/doctor-register" element={<DoctorRegister />} />
              </Routes>
            </main>
            
            <footer className="bg-slate-900 text-slate-300 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                      <h3 className="text-white text-lg font-bold mb-4">DR.SEARCH</h3>
                      <p className="text-sm">Connecting patients with the best specialists across India for over 10 years. Your health is our priority.</p>
                  </div>
                  <div>
                      <h4 className="text-white font-semibold mb-4">For Patients</h4>
                      <ul className="space-y-2 text-sm">
                          <li><a href="#" className="hover:text-white">Find Doctors</a></li>
                          <li><a href="#" className="hover:text-white">Video Consultation</a></li>
                          <li><a href="#" className="hover:text-white">Book Appointment</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-white font-semibold mb-4">For Doctors</h4>
                      <ul className="space-y-2 text-sm">
                          <li><a href="#" className="hover:text-white">Join as a Doctor</a></li>
                          <li><a href="#" className="hover:text-white">Practice Management</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-white font-semibold mb-4">Contact</h4>
                      <ul className="space-y-2 text-sm">
                          <li>support@drsearch.in</li>
                          <li>+91 98765 43210</li>
                      </ul>
                  </div>
              </div>
            </footer>
          </div>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;