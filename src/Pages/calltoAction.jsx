import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/istockphoto-barca.jpg';

const PopularTineraries = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los destinos de la API
  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/cities/all');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setDestinations(data.response || []); // Asumiendo que la respuesta viene en data.response
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Carousel controls
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(destinations.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + Math.ceil(destinations.length / 4)) % Math.ceil(destinations.length / 4)
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [destinations.length]); // Añadido destinations.length como dependencia

  const getSlideDestinations = (index) => {
    const start = index * 4;
    return destinations.slice(start, start + 4);
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-blue-200 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Popular Tineraries</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Call to Action section - Sin cambios */}
        <div className="relative md:w-1/3 rounded-lg shadow-md overflow-hidden">
          <div 
            style={{ 
              backgroundImage: `url(${backgroundImage})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
            }}
            className="absolute inset-0" 
          />
          <div className="absolute inset-0 bg-white bg-opacity-70" />
          <div className="relative z-10 p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Find the perfect destination</h3>
            <p className="text-black-900 mb-6">
              Our app will help you find the perfect path for your next trip.
              With an easy-to-use interface and a host of itinerary options,
              planning your next trip has never been easier.
            </p>
            <Link
              to="/cities"
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-200 transition duration-300"
            >
              View more...
            </Link>
          </div>
        </div>

        {/* Carousel section */}
        {destinations.length > 0 && (
          <div className="md:w-2/3 relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {[...Array(Math.ceil(destinations.length / 4))].map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 gap-4">
                    {getSlideDestinations(slideIndex).map((dest) => (
                      <div key={dest._id} className="relative rounded-lg overflow-hidden shadow-md group">
                        <div className="w-full h-48 overflow-hidden">
                          <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                          <h4 className="text-white text-lg font-semibold">{dest.name}</h4>
                        </div>
                        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 flex items-center">
                          <Heart className="text-red-500" size={16} />
                          <span className="ml-1 text-xs">{dest.likes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={prevSlide} 
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide} 
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      
      {/* Dots navigation */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(destinations.length / 4))].map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularTineraries;