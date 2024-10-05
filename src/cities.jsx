import React from 'react';
import Footer from './footer';

const Cities = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto mt-8 flex-grow">
          <h1 className="text-3xl font-bold mb-4">Explore Cities</h1>
          <div>{"Esto va a ser cities :D"}</div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Cities;