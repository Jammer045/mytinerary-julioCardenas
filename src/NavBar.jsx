import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/Gemini_Generated_Image_3r8qnn3r8qnn3r8q.jpeg'

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="My Tinerary Logo" className="h-10 w-auto rounded-lg" />
          <span className="text-2xl font-bold">My Tinerary</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline transition duration-300">Home</Link>
          <Link to="/cities" className="hover:underline transition duration-300">Cities</Link>
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-200 transition duration-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;