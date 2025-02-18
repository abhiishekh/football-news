
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '@/app/(components)/productCard/page';

const WishList = () => {
  const [wishlist, setWishlist] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch wishlist data from the API when the component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage (assumption)
      
      if (!token) {
        setError("Please log in to view your wishlist.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/wishlist', {
          headers: {
            token, // Send the token in headers
          },
        });
        console.log(response.data.wishlistResponse.items)
        if (response.status === 201) {
          setWishlist(response.data.wishlistResponse.items);
        } else {
          setError("Failed to load wishlist.");
        }
      } catch (error) {
        setError("Error fetching wishlist data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Render the wishlist or loading/error messages
  if (loading) {
    return (
      <div className='w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] flex justify-center items-center'>
        <div className='animate-spin w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] flex justify-center items-center'>
        <p>{error}</p>
      </div>
    );
  }

  if (!wishlist ) {
    return (
      <div className='w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] flex justify-center items-center'>
        <p>Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]'>
      <div className='container w-full h-full mx-auto py-10 px-2'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Your Wishlist</h1>
        <div className='w-full min-h-screen flex gap-6 flex-wrap justify-center py-6'>
          {wishlist.map((item: any) => (
            <div  key={item.productId} className='w-full sm:w-60'>

                <ProductCard 
                productId={item.productId}
                images={item.images}
                title={item.title}
                category={item.category}
                price={item.price}
                />
            </div>
          ))}
        </div>

        {/* Total Price */}
       
      </div>
    </div>
  );
};

export default WishList;
