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
      }
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;