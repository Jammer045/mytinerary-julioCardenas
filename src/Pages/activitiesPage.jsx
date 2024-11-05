import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

const Activities = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <Construction size={100} className="text-yellow-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Under Construction</h1>
      <p className="text-gray-600 text-center max-w-md">
        We're working hard to bring you amazing activities. Please check back soon!
      </p>
    </div>
  );
};

export default Activities;