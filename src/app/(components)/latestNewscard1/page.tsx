"use client"

import React from "react";

const LatestNewCard1 = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-blue-400 to-blue-100 rounded-lg p-6 shadow-lg">
      <h1 className="text-white text-xl font-bold mb-4 text-center">LATEST TRANSFERS</h1>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="p-2 text-gray-700 font-semibold">Players</th>
            <th className="p-2 text-gray-700 font-semibold">Transfer</th>
            <th className="p-2 text-gray-700 font-semibold">Fee</th>
          </tr>
        </thead>
        <tbody>
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <tr key={index} className="bg-white odd:bg-blue-50">
                <td className="p-2 border border-gray-300">Lorem ipsum</td>
                <td className="p-2 border border-gray-300">Lorem ipsum</td>
                <td className="p-2 border border-gray-300">Lorem ipsum</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <a
          href="#"
          className="text-blue-600 hover:text-blue-800 font-bold text-sm"
        >
          WHOLE LIST &gt;
        </a>
      </div>
    </div>
  );
};

export default LatestNewCard1;
