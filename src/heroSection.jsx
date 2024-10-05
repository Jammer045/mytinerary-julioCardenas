import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './assets/Puerta-del-Cielo_pinal-de-amoles_1_1600.jpg';

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative z-10 flex flex-col h-full items-center justify-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4 text-center">My Tineraries</h1>
        <p className="text-xl mb-8 text-center text-gray-300 bg-blue-600 bg-opacity-75 rounded-lg max-w-2xl p-4">
          "Find your perfect trip, designed by insiders who know and love their cities!"
        </p>
        <Link
          to="/cities"
          className="bg-white text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-200 transition duration-300"
        >
          Explore now!
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;