import React from 'react';
import { Clock, Heart, Banknote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ItineraryCard = ({ itinerary }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Image Section */}
      <div className="relative h-48">
        <img 
          src={itinerary.photo} 
          alt={itinerary.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors">
          <Heart className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{itinerary.name}</h3>
          <div className="flex items-center gap-1 text-green-600">
            <Banknote className="w-5 h-5" />
            <span className="text-lg font-bold">{itinerary.price}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Clock className="w-4 h-4" />
          <span>{itinerary.duration}h</span>
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {itinerary.hashtags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View More Button */}
        <button
          onClick={() => navigate(`/activities/${itinerary._id}`)}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default ItineraryCard;