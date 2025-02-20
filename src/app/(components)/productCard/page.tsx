import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

interface DATA {
  images: string[] | any;
  title: string;
  price: number;
  category: string;
  productId: string;
}

const ProductCard = ({ images, title, price, category, productId }: DATA) => {
  const [error, setError] = useState<string | null>(null); // To hold error messages
  const [success, setSuccess] = useState<string | null>(null); // To hold success messages
  const [loading, setLoading] = useState<boolean>(false); // To show loading state while adding to cart
  const { isAuthenticated, getlength } = useAuth();
  const [showAlert, setShowAlert] = useState<boolean>(false); // To control the visibility of the alert
  const imageUrl = images && images.length > 0 ? images[0] : '/default-image.jpg';

  // Add to cart function
  const addToCart = async () => {
    setLoading(true);
    setError(null); // Clear any previous error message
    setSuccess(null); // Clear any previous success message

    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
      setError('Please log in to add items to your cart.');
      setShowAlert(true);
      setLoading(false);

      setTimeout(() => {
        setShowAlert(false); // Hide alert after 3 seconds
      }, 3000);

      return;
    }

    // Log the productId and quantity to check the data
    console.log("Adding to cart with Product ID:", productId, "and Quantity: 1");

    try {
      // Make a POST request to the backend to add the product to the cart
      const response = await axios.post('/api/cart', {
        productId,
        quantity: 1,
      }, {
        headers: {
          token: token
        },
      });

      if (!response) {
        console.log("Could not add product to cart");
      } else {
        console.log("Product added to cart successfully", response.data);
      }

      setSuccess('Product added to cart successfully!');
      getlength()
      setShowAlert(true);
      setLoading(false);

      setTimeout(() => {
        setShowAlert(false); // Hide alert after 3 seconds
      }, 3000);

    } catch (err) {
      // If there is an error, show the error message
      console.error("Error adding to cart:", err);
      setError('Failed to add product to cart.');
      setShowAlert(true);
      setLoading(false);

      setTimeout(() => {
        setShowAlert(false); // Hide alert after 3 seconds
      }, 3000);
    }
  };

  const handleAddToCartClick = () => {
    if (isAuthenticated) {
      addToCart(); // Proceed with adding the product to the cart if authenticated
    } else {
      setError('Please log in to add items to your cart.');
      setShowAlert(true); // Show the alert if not authenticated

      setTimeout(() => {
        setShowAlert(false); // Hide alert after 3 seconds
      }, 3000);
    }
  };

  return (
    <div>
      <div className="w-full h-auto rounded-lg overflow-hidden bg-white">
        <div className="h-64 w-full">
          <Link href={`/shop/productdetails/${productId}`}>
            <img
              src={imageUrl}
              alt="product image"
              className="w-full h-full object-contain object-center"
            />
          </Link>
        </div>

        <div className="bg-gradient-to-r from-white to-blue-500 p-2 mt-0">
          <h1 className="text-xs font-bold capitalize">{title}</h1>
          <p className="text-xs text-gray-600 capitalize">{category}</p>
          <p className="text-sm font-bold">${price}</p>
        </div>
      </div>

      <button
        onClick={handleAddToCartClick}
        disabled={loading} // Disable button if loading
        className={`w-full ${loading ? 'bg-gray-400' : 'bg-orange-600'} text-white px-4 py-2 mt-2 rounded-full`}
      >
        {loading ? 'Adding to Cart...' : 'Add to Cart'}
      </button>

      {/* Show Shadcn Alert for success or error messages */}
      {showAlert && success && (
        <Alert
          className="mt-2 fixed top-4 right-4 z-50 w-fit text-green-500 flex gap-1" // Position the alert in the right upper corner
        >
          <AlertTitle className='flex items-center'><Check /> Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {showAlert && error && (
        <Alert
          className="mt-2 fixed top-4 right-4 z-50 w-fit bg-white flex gap-1 " // Position the alert in the right upper corner
          variant="destructive"
        >
          <AlertTitle className='flex items-center '><X /> Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ProductCard;
