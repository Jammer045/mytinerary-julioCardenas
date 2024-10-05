import React from 'react';
import backgroundImage from './assets/Puerta-del-Cielo_pinal-de-amoles_1_1600.jpg';

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative z-10 flex flex-col h-full items-center justify-center text-white px-4">        
        <h1 className="text-5xl font-bold mb-4 text-center">My Tineraries</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          "Find your perfect trip, designed by insiders who know and love their cities!"
        </p>
        <button className="bg-white text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-200 transition duration-300">
          Explore now!
        </button>
      </div>
    </div>
  );
};

export default HeroSection;