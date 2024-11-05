import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityById, clearCurrentCity } from '../Redux/citiesSlice';
import CityDetail from '../components/detailComponent';
import Footer from '../footer';

const CityPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Obtenemos el estado de Redux
  const { currentCity, loading, error } = useSelector(state => state.cities);

  useEffect(() => {
    if (id) {
      dispatch(fetchCityById(id));
    }

    // Limpieza al desmontar
    return () => {
      dispatch(clearCurrentCity());
    };
  }, [dispatch, id]);

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
        <CityDetail city={currentCity} />
      </div>
      <Footer />
    </div>
  );
};

export default CityPage;