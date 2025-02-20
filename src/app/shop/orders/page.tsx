
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: '2024-02-19',
      total: 49.99,
      items: [
        { id: 101, name: 'Product A', quantity: 2 },
        { id: 102, name: 'Product B', quantity: 1 }
      ]
    },
    {
      id: 2,
      date: '2024-02-18',
      total: 89.99,
      items: [
        { id: 103, name: 'Product C', quantity: 1 },
        { id: 104, name: 'Product D', quantity: 3 }
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]'>
      <div className='w-full h-full container mx-auto px-4'>
        <h1 className='text-3xl pt-12 font-semibold'>My Orders</h1>
        {loading ? (
          <p className='text-lg mt-6'>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className='text-lg mt-6'>No orders found.</p>
        ) : (
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {orders.map((order) => (
              <div key={order.id} className='bg-white p-4 rounded-xl shadow-md flex flex-col'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className='text-xl font-semibold'>Order #{order.id}</h2>
                    <p className='text-gray-700'>Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p className='text-gray-700'>Total: ${order.total.toFixed(2)}</p>
                    <h3 className='mt-2 font-medium'>Items:</h3>
                    <ul className='list-disc pl-5'>
                      {order.items.map((item) => (
                        <li key={item.id} className='text-gray-600'>{item.name} (x{item.quantity})</li>
                      ))}
                    </ul>
                  </div>
                  <div className='w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600'>
                    Image
                  </div>
                </div>
                <button className='mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
