import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from './Redux/authSlice';
import logo from "./assets/Gemini_Generated_Image_3r8qnn3r8qnn3r8q.jpeg";
import defaultUserPhoto from "./assets/usuario-sin-foto.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Obtenemos el estado de auth desde Redux
  const { user, token } = useSelector(state => state.auth);
  const isLoggedIn = !!token; // Si hay token, está logueado

  const handleLogout = async () => {
    await dispatch(userLogout());
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-900 bg-opacity-70 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" onClick={handleLogoClick} className="flex items-center space-x-2">
          <img src={logo} alt="My Tinerary Logo" className="h-10 w-auto rounded-lg"/>
          <span className="text-2xl font-bold">My Tinerary</span>
        </a>

        {/* Botón de Login y menu hamburguesa */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <img src={defaultUserPhoto} alt="" className="h-8 w-8 rounded-full"/>
          )}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <img src={user?.photo} alt={user?.name} className="h-8 w-8 rounded-full"/>
              <span className="hidden md:inline">{user?.name}</span>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-200 transition duration-300"
            >
              Login
            </button>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Menu lateral */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-blue-800 z-50 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <button onClick={() => setIsOpen(false)} className="text-white mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="hover:bg-blue-700 px-4 py-2 rounded transition duration-300" 
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/cities" 
              className="hover:bg-blue-700 px-4 py-2 rounded transition duration-300" 
              onClick={() => setIsOpen(false)}
            >
              Cities
            </Link>

            {/* Login en barra lateral */}
            {isLoggedIn ? (
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <img src={user?.photo} alt={user?.name} className="h-8 w-8 rounded-full"/>
                  <span>{user?.name}</span>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  handleLogin();
                  setIsOpen(false);
                }}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-200 transition duration-300 w-full"
              >
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