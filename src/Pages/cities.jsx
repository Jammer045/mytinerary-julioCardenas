import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Footer from "../footer";
import city1 from "../assets/Paris.jpg";
import city2 from "../assets/nueva-york.jpg";
import city3 from "../assets/atracciones-turisticas-en-Tokio.jpg";
import city4 from "../assets/Rome.jpg";
import city5 from "../assets/London.jpg";
import city6 from "../assets/Berlin.jpg";
import city7 from "../assets/Sydney.jpg";
import city8 from "../assets/Rio_de_Janeiro.jpg";
import city9 from "../assets/Dubai.jpg";
import city10 from "../assets/jordaan-amsterdam.jpg";
import city11 from "../assets/Prague.jpg";
import city12 from "../assets/Depositphotos_Moscow_s-2019.jpg";
import city13 from "../assets/que-visitar-en-barcelona-1.jpg";
import city14 from "../assets/image-madrid.jpg";
import city15 from "../assets/5fa5393804286.r_d.499-319-0.jpeg";
import city16 from "../assets/Vivir-en-Ibiza_03.jpg";

const destinations = [
  { id: 1, title: "Paris", image: city1, likes: 93 },
  { id: 2, title: "New York", image: city2, likes: 91 },
  { id: 3, title: "Tokyo", image: city3, likes: 70 },
  { id: 4, title: "Rome", image: city4, likes: 78 },
  { id: 5, title: "London", image: city5, likes: 95 },
  { id: 6, title: "Berlin", image: city6, likes: 92 },
  { id: 7, title: "Sydney", image: city7, likes: 89 },
  { id: 8, title: "Rio de Janeiro", image: city8, likes: 77 },
  { id: 9, title: "Dubai", image: city9, likes: 95 },
  { id: 10, title: "Amsterdam", image: city10, likes: 78 },
  { id: 11, title: "Prague", image: city11, likes: 80 },
  { id: 12, title: "Moscow", image: city12, likes: 88 },
  { id: 13, title: "Barcelona", image: city13, likes: 93 },
  { id: 14, title: "Madrid", image: city14, likes: 91 },
  { id: 15, title: "Istanbul", image: city15, likes: 70 },
  { id: 16, title: "Ibiza", image: city16, likes: 78 },
];

const Cities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filteredDestinations = destinations.filter((city) =>
    city.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        
        {filteredDestinations.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-8">
            No se encontraron resultados para "{searchTerm}"
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((city) => (
              <div
                key={city.id}
                className="relative h-[280px] overflow-hidden rounded-lg"
              >
                <img
                  src={city.image}
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