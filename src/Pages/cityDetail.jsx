import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CityDetail from '../components/detailComponent.jsx';
import Footer from '../footer';

const CityPage = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCity = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/cities/${id}`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setCity(data.response);
      } catch (err) {
        console.error('Error fetching city:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <CityDetail city={city} />
      </div>
      <Footer />
    </div>
  );
};

export default CityPage;