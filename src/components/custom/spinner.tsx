// components/Spinner.tsx
import React from 'react';

const Spinner = () => {
  return (
    <div className=" w-full min-h-screen flex items-center justify-center">
                <div className="w-spinner h-spinner border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin-fast"></div>
                <p className="ml-4 text-xl">Loading...</p>
              </div>  
  );
};

export default Spinner;
