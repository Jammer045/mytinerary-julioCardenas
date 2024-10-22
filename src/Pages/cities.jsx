import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Footer from "../footer";

const Cities = () => {
  const [cities, setCities] = useState([]); // Inicializa como array vacío
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect para cargar ciudades al montar el componente
  useEffect(() => {
    const fetchCities = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/cities/all');
            if (!response.ok) {
                throw new Error('Error en la red: ${response.status}');
            }
            const data = await response.json();
            console.log(data); // Para depuración

            if (data.response && Array.isArray(data.response)) {
                setCities(data.response);
            } else {
                setError('Los datos recibidos no tienen el formato esperado.');
                setCities([]);
            }
        } catch (err) {
            console.error('Error fetching cities:', err);
            setError('Error al cargar las ciudades: ' + err.message);
            setCities([]);
        } finally {
            setLoading(false);
        }
    };

    fetchCities();
}, []); // El arreglo vacío asegura que solo se ejecute al montar el componente

  // Filtrado de ciudades
  const filteredCities = Array.isArray(cities)
    ? cities.filter(city => city.title && city.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto mt-20 flex-grow px-4">
        <h1 className="text-3xl font-bold mb-8">Explore Cities</h1>
        
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
                key={city.id || index}
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
                <button className="absolute bottom-2 left-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm">
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
