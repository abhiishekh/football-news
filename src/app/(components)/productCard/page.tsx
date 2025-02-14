
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface DATA {
  images: string[] | any;
  title: string;
  price: number;
  category: string;
  productId: string; // Assuming we pass productId to the component
}

const ProductCard = ({ images, title, price, category, productId }: DATA) => {
  const [error, setError] = useState<string | null>(null); // To hold error messages
  const [success, setSuccess] = useState<string | null>(null); // To hold success messages
  const [loading, setLoading] = useState<boolean>(false); // To show loading state while adding to cart
  
  const imageUrl = images && images.length > 0 ? images[0] : '/default-image.jpg'; 

  // Add to cart function
  const addToCart = async () => {
    setLoading(true);
    setError(null); // Clear any previous error message
    setSuccess(null); // Clear any previous success message

    try {
      // Make an API request to add the product to the cart
      const response = await axios.post('/api/cart', {
        userId: "your_user_id_here", // Replace with the actual user ID
        productId: productId,
        quantity: 1, // Assuming 1 item per add to cart
      });

      // If the request is successful, display the success message
      setSuccess("Product added to cart successfully!");
    } catch (err) {
      // If there is an error, display the error message
      setError("Failed to add product to cart.");
    } finally {
      setLoading(false); // Set loading state to false once the API call is completed
    }
  };

  return (
    <div>
      <div className='w-full h-auto rounded-lg overflow-hidden bg-white'>
        <div className='h-64 w-full'>
          <Link href={'/shop/productdetails'}>
            <img
              src={imageUrl}
              alt="product image"
              className='w-full h-full object-contain object-center'
            />
          </Link>
        </div>

        <div className='bg-gradient-to-r from-white to-blue-500 p-2 mt-0'>
          <h1 className='text-xs font-bold capitalize'>{title}</h1>
          <p className='text-xs text-gray-600 capitalize'>{category}</p>
          <p className='text-sm font-bold'>${price}</p>
        </div>
      </div>

      <button 
        onClick={addToCart}
        disabled={loading} // Disable button if loading
        className={`w-full ${loading ? 'bg-gray-400' : 'bg-orange-600'} text-white px-4 py-2 mt-2 rounded-full`}
      >
        {loading ? 'Adding to Cart...' : 'Add to Cart'}
      </button>

      {/* Show success or error messages */}
      {success && <div className='text-green-600 mt-2'>{success}</div>}
      {error && <div className='text-red-600 mt-2'>{error}</div>}
    </div>
  );
};

export default ProductCard;
