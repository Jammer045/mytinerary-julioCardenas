import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CityDetail = ({ city }) => {
  const navigate = useNavigate();

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${city.image || '/placeholder-image.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-lg mb-8 hover:bg-black/60 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-4xl font-bold text-white mb-4 text-shadow">
          {city.title}
        </h1>

        <p className="text-lg text-white bg-gray-800/70 p-4 rounded mb-4">{city.description}</p>

        <div className="bg-blue-400 text-black px-6 py-4 rounded-lg inline-block">
          <p className="text-xl font-semibold">Under construction...</p>
        </div>
      </div>
    </div>
  );
};

export default CityDetail;
