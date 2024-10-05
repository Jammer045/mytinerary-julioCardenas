import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">My Tinerary</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cities" className="hover:underline">Cities</Link>
          <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;