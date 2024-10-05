import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import city1 from './assets/Paris.jpg';
import city2 from './assets/nueva-york.jpg';
import city3 from './assets/atracciones-turisticas-en-Tokio.jpg';
import city4 from './assets/Rome.jpg';
import city5 from './assets/London.jpg';
import city6 from './assets/Berlin.jpg';
import city7 from './assets/Sydney.jpg';
import city8 from './assets/Rio_de_Janeiro.jpg';
import city9 from './assets/Dubai.jpg';
import city10 from './assets/jordaan-amsterdam.jpg';
import city11 from './assets/Prague.jpg';
import city12 from './assets/Depositphotos_Moscow_s-2019.jpg';

const destinations = [
  { id: 1, title: "Paris", image: city1, likes: 13 },
  { id: 2, title: "New York", image: city2, likes: 11 },
  { id: 3, title: "Tokyo", image: city3, likes: 10 },
  { id: 4, title: "Rome", image: city4, likes: 8 },
  { id: 5, title: "London", image: city5, likes: 15 },
  { id: 6, title: "Berlin", image: city6, likes: 12 },
  { id: 7, title: "Sydney", image: city7, likes: 9 },
  { id: 8, title: "Rio de Janeiro", image: city8, likes: 7 },
  { id: 9, title: "Dubai", image: city9, likes: 14 },
  { id: 10, title: "Amsterdam", image: city10, likes: 11 },
  { id: 11, title: "Prague", image: city11, likes: 10 },
  { id: 12, title: "Moscow", image: city12, likes: 8 },
];

const PopularTineraries = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 4) % destinations.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 4 + destinations.length) % destinations.length);
    };
  
    return (
      <div className="bg-blue-200 p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Tineraries</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Call to Action */}
          <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Find the perfect destination</h3>
            <p className="text-gray-600 mb-6">
              Our app will help you find the perfect path for your next trip. 
              With an easy-to-use interface and a host of itinerary options, 
              planning your next trip has never been easier.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              View more
            </button>
          </div>
  
          {/* Carousel */}
          <div className="md:w-2/3 relative">
            <div className="grid grid-cols-2 gap-4">
              {destinations.slice(currentIndex, currentIndex + 4).map((dest) => (
                <div key={dest.id} className="relative rounded-lg overflow-hidden">
                  <img src={dest.image} alt={dest.title} className="w-full h-48 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <h4 className="text-white text-lg font-semibold">{dest.title}</h4>
                  </div>
                  <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 flex items-center">
                    <Heart className="text-red-500" size={16} />
                    <span className="ml-1 text-xs">{dest.likes}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {[0, 1, 2].map((index) => (
            <div 
              key={index} 
              className={`h-2 w-2 rounded-full mx-1 ${currentIndex === index * 4 ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default PopularTineraries;