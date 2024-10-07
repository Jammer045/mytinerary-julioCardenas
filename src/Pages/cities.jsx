import React from 'react';
import Footer from '../footer';
import city1 from '../assets/Paris.jpg';
import city2 from '../assets/nueva-york.jpg';
import city3 from '../assets/atracciones-turisticas-en-Tokio.jpg';
import city4 from '../assets/Rome.jpg';
import city5 from '../assets/London.jpg';
import city6 from '../assets/Berlin.jpg';
import city7 from '../assets/Sydney.jpg';
import city8 from '../assets/Rio_de_Janeiro.jpg';
import city9 from '../assets/Dubai.jpg';
import city10 from '../assets/jordaan-amsterdam.jpg';
import city11 from '../assets/Prague.jpg';
import city12 from '../assets/Depositphotos_Moscow_s-2019.jpg';

const Cities = () => {
  const cityImages = [city1, city2, city3, city4, city5, city6, city7, city8, city9, city10, city11, city12];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto mt-8 flex-grow">
        <h1 className="text-3xl font-bold mb-4">Explore Cities</h1>
        <input type="text" />
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cityImages.map((city, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <img src={city} alt={`City ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <p className="text-white text-2xl font-bold text-center px-4 py-2 bg-blue-600 rounded-lg">
              Coming soon...
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cities;