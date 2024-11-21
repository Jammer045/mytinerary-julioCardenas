import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HeroSection from './Pages/heroSection';
import Cities from './Pages/cities';
import CityPage from './Pages/cityDetail.jsx';
import Navbar from './NavBar';
import PopularTineraries from './Pages/calltoAction';
import Footer from './footer';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
import Activities from './Pages/activitiesPage.jsx';
import SignIn from './components/siginComponent.jsx';
import SignUp from './components/signUpComponent.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginWithToken } from './Redux/authSlice.js';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function Home() {
  return (
    <div>
      <HeroSection />
      <PopularTineraries />
      <Footer/>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cities',
        element: <Cities />,
      },
      {
        path: 'city/:id',
        element: <CityPage />,
      },
      {
        path: '/activities/:id',
        element: <Activities />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
]);
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loginWithToken(token).then((user) => {
        dispatch(setUser({ user, token }));
      });
    }
  }, []);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;