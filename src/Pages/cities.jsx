import React, { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCities, searchCities, clearCurrentCity } from '../Redux/citiesSlice';

const Cities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Obtenemos el estado de Redux
  const { 
    loading, 
    error, 
    searchTerm, 
    filteredCities 
  } = useSelector(state => state.cities);

  // Estado local para el botón de scroll
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Efecto para cargar las ciudades
  useEffect(() => {
    dispatch(fetchAllCities());
  }, [dispatch]);

  // Efecto para el botón de scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewCity = (city) => {
    dispatch(clearCurrentCity());
    navigate(`/city/${city._id}`);
  };

  const handleSearch = (term) => {
    dispatch(searchCities(term));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto mt-20 flex-grow px-4">
        <h1 className="text-3xl font-bold mb-8">Explore Cities</h1>
        
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full max-w-md mx-auto block border border-gray-300 rounded-md px-4 py-2 mb-8"
        />
        
        {loading && <p className="text-center text-lg">Cargando ciudades...</p>}

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {!error && filteredCities.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-8">
            {searchTerm 
              ? `No se encontraron resultados para "${searchTerm}"`
              : "No hay ciudades disponibles"}
          </p>
        )}

        {!error && filteredCities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCities.map((city, index) => (
              <div
                key={city._id || index}
                className="relative h-[280px] overflow-hidden rounded-lg"
              >
                <img
                  src={city.image || '/placeholder-image.jpg'}
                  alt={city.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 text-white bg-black/50 px-3 py-1.5 rounded text-sm">
                  {city.title}
                </div>
                <button 
                  onClick={() => handleViewCity(city)}
                  className="absolute bottom-2 left-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm"
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300"
        >
          <ArrowUp size={24} />
        </button>
      )}
      
      <Footer />
    </div>
  );
};

export default Cities;