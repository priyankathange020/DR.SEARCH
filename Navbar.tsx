import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Stethoscope, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">DR.SEARCH</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition">Home</Link>
            <Link to="/search" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition">Find Doctors</Link>
            {!isAuthenticated ? (
              <Link to="/doctor-register" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition">Are you a Doctor?</Link>
            ) : null}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm">Hello, {user?.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700 font-medium text-sm transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-blue-700 font-medium px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/login" // For simplicity, pointing to login, in real app would be signup
                  className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-full font-medium transition shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
            <Link to="/search" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Find Doctors</Link>
            {!isAuthenticated && (
              <Link to="/doctor-register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Are you a Doctor?</Link>
            )}
            {isAuthenticated ? (
               <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50">Login / Sign Up</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;