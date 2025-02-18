"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use useParams to get dynamic params
import axios from "axios";
import { FaHeart, FaHeartBroken } from "react-icons/fa"; // Import both filled and empty heart icons
import { FaCodeCompare, FaScaleBalanced } from "react-icons/fa6";
import ProductSpecs from "@/app/(components)/productspecs/page";
import Link from "next/link";
import Spinner from "@/components/custom/spinner";

const ProductDetails = () => {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [wishlistStatus, setWishlistStatus] = useState<string>(""); 
  const { productId } = useParams(); 

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false); // Track wishlist status

  // Fetch product details when productId changes
  useEffect(() => {
    if (productId) {
      axios
        .get(`/api/products/${productId}`) // Fetch product details from the API  
        .then((response) => {
          setProduct(response.data); // Set the fetched product data
          // Set the first image as the default selected image
          setSelectedImage(response.data.images[0]);
        })
        .catch((error) => {
          setError("Failed to load product details.");
          console.error(error);
        });

      // Check if the product is in the wishlist when component loads
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(`/api/wishlist/check/${productId}`, { headers: { token } }) // Custom API route to check wishlist status
          .then((response) => {
            if (response.status === 200 && response.data.isWishlisted) {
              setIsWishlisted(true);
            }
          })
          .catch((error) => {
            console.error("Error checking wishlist status:", error);
          });
      }
    }
  }, [productId]);

  // Function to handle adding/removing product from wishlist
  const handleWishlistToggle = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage (assuming token is stored there)
    if (!token) {
      setWishlistStatus("Please log in to add to wishlist.");
      return;
    }

    try {
      if (isWishlisted) {
        // Send a DELETE request to remove the product from the wishlist
        const response = await axios.delete(`/api/wishlist/${productId}`, {
          headers: { token },
        });

        if (response.status === 200) {
          setIsWishlisted(false);
          setWishlistStatus("Product removed from wishlist!");
        }
      } else {
        // Send a POST request to add the product to the wishlist
        const response = await axios.post(
          "/api/wishlist",
          { productId: product._id, quantity: 1 }, // Assuming we add a single item to the wishlist
          { headers: { token } } // Send the token in the request headers
        );

        if (response.status === 200) {
          setIsWishlisted(true);
          setWishlistStatus("Product added to wishlist!");
        }
      }
    } catch (error) {
      setWishlistStatus("Failed to toggle wishlist.");
      console.error(error);
    }
  };

  // If product data is still not available, show loading state
  if (!product) {
    return <div className="w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]"><Spinner/></div>;
  }

  // Check if images array is available and has valid data
  const images = product.images || [];
  const imageElements = images.slice(0, 4).map((image: string, index: number) => (
    <div
      key={index}
      className="w-20 h-20 bg-white rounded-md overflow-hidden cursor-pointer"
      onClick={() => setSelectedImage(image)} // Update selected image on click
    >
      <img
        src={image}
        alt={`product-thumbnail-${index}`}
        className="w-full h-full object-contain object-center"
      />
    </div>
  ));

  // Check if sizes array is available and has valid data
  const sizes = product.sizes || []; // Fallback to an empty array if sizes is undefined or null

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white to-blue-500 text-black">
      <div className="w-full md:w-5/6 2xl:w-3/5 mx-auto h-full flex flex-wrap gap-8 justify-center pt-10 px-3">
        <div className="lg:flex w-full h-full gap-2 md:gap-12">
          {/* img */}
          <div className="w-full mt-12 lg:mt-0 lg:w-[45%] h-[450px] flex flex-col gap-3">
            <div className="w-full h-[80%] bg-white rounded-md overflow-hidden">
              <img
                src={selectedImage || images[0]} // Display selected image or fallback to first image
                alt={product.title}
                className="w-full h-full object-contain object-center"
              />
            </div>
            <div className="flex w-full justify-center gap-6">
              {imageElements}
            </div>
          </div>

          {/* details */}
          <div className="h-full w-full lg:w-[45%] py-5">
            <h1 className="w-drv p-2 text-3xl rounded-lg bg-gradient-to-r from-white to-blue-500 my-8">
              {product.title}
            </h1>
            <p className="text-xl font-bold">${product.price}</p>
            <p className="uppercase text-gray-400">delivery in europe</p>

            {/* size options */}
            <div className="my-1">
              <h1 className="capitalize my-2 text-lg">size:</h1>
              <div className="flex gap-2">
                {sizes.length > 0 ? (
                  sizes.map((size: string, index: number) => (
                    <li
                      key={index}
                      className="text-center rounded-sm px-2 list-none border-[1px] border-black"
                    >
                      {size}
                    </li>
                  ))
                ) : (
                  <p>No sizes available</p> // Display a fallback message if sizes are not available
                )}
              </div>
            </div>

            {/* buttons */}
            <div className="w-full flex gap-6 my-5">
              <div className="border-[1px] border-orange-600 flex rounded-full items-center px-4">
                <p className="px-2 py-1">-</p>
                <hr className="h-full w-[1px] bg-orange-500" />
                <p className="px-4 py-1">1</p>
                <hr className="h-full w-[1px] bg-orange-500" />
                <p className="px-2 py-1 text-center">+</p>
              </div>
              <Link href="/shop/cart">
                <button className="px-4 py-2 rounded-full capitalize bg-orange-500 text-white font-bold">
                  add to cart
                </button>
              </Link>
            </div>

            {/* compare, wishlist, size chart */}
            <div className="flex justify-between">
              <div className="text-xs flex gap-1">
                <FaCodeCompare />
                Compare
              </div>
              <div onClick={handleWishlistToggle} className="flex gap-1 text-xs items-center cursor-pointer">
                {isWishlisted ? <FaHeart className="text-red-500" /> : <FaHeartBroken />} {/* Filled or empty heart */}
                <p>{isWishlisted ? "In Wishlist" : "Add to Wishlist"}</p>
              </div>
              <div className="text-lg capitalize">
                <p className="flex gap-1 items-center">
                  <FaScaleBalanced />
                  size chart
                </p>
              </div>
            </div>

            {/* other details */}
            <div className="flex justify-between my-3">
              <div>
                <div className="flex gap-1 text-sm">
                  <p className="uppercase">uks:</p>
                  <p>{product.sizeUK}</p>
                </div>
                <div className="flex gap-1 text-sm items-center">
                  <p className="capitalize">category:</p>
                  <p className="text-xs">{product.category}</p>
                </div>
                <div className="flex gap-1 text-sm items-center">
                  <p className="capitalize">Tags:</p>
                  <p className="text-xs">{product.title}</p>
                </div>
              </div>
              <div>size chart here</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs w-full h-96 lg:h-64 2xl:w-[1150px] px-2 lg:px-0 lg:flex justify-between mt-12 mx-auto">
        <ProductSpecs />
      </div>
    </div>
  );
};

export default ProductDetails;
