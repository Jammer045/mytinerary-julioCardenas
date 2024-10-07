import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/Gemini_Generated_Image_3r8qnn3r8qnn3r8q.jpeg'
import defaultUserPhoto from './assets/usuario-sin-foto.png'

const Navbar = () => {
  // Controlador del menu hamburguesa
  const [isOpen, setIsOpen] = useState(false);
  // Simulamos un estado de login y datos de usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // Simula un login
    setIsLoggedIn(true);
    setUser({ name: "Johnny Depp", photo: defaultUserPhoto });
  };

  const handleLogout = () => {
    // Simula un logout
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    // Nombre y logo
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="My Tinerary Logo" className="h-10 w-auto rounded-lg" />
          <span className="text-2xl font-bold">My Tinerary</span>
        </Link>
        
        {/* Menu Hamburguesa */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu de escritorio */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:underline transition duration-300">Home</Link>
          <Link to="/cities" className="hover:underline transition duration-300">Cities</Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <img src={user.photo} alt={user.name} className="h-8 w-8 rounded-full" />
              <span>{user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-300">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-200 transition duration-300">
              Login
            </button>
          )}
        </div>
      </div>

      {/* Barra lateral con opciones */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-blue-800 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="p-4">
          <button onClick={() => setIsOpen(false)} className="text-white mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col space-y-4">
            <Link to="/" className="hover:bg-blue-700 px-4 py-2 rounded transition duration-300" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/cities" className="hover:bg-blue-700 px-4 py-2 rounded transition duration-300" onClick={() => setIsOpen(false)}>Cities</Link>
            {isLoggedIn ? (
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <img src={user.photo} alt={user.name} className="h-8 w-8 rounded-full" />
                  <span>{user.name}</span>
                </div>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 w-full">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={handleLogin} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-200 transition duration-300 w-full">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;