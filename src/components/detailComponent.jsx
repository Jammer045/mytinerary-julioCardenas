import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ItineraryCard from './cardItineraryComponent';

const CityDetail = () => {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { currentCity } = useSelector(state => state.cities);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        if (currentCity?._id) {
          // URL corregida según tu endpoint
          const response = await axios.get(`http://localhost:8080/api/cities/city/${currentCity._id}/tineraries`);
          setItineraries(response.data.response);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [currentCity]);

  if (loading || !currentCity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with City Info */}
      <div className="relative h-[50vh] mb-8">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${currentCity.image || '/placeholder-image.jpg'})`,
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
            {currentCity.title}
          </h1>

          <p className="text-lg text-white bg-gray-800/70 p-4 rounded mb-4">
            {currentCity.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold mb-8">Available Itineraries</h2>
        {itineraries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary) => (
              <ItineraryCard key={itinerary._id} itinerary={itinerary} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">No itineraries available for this city yet.</p>
        )}
      </div>
    </div>
  );
};

export default CityDetail;