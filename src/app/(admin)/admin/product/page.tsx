"use client"

import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  title: string;
  description: string;
  price: number;
  gender: string;
  child: string;
  category: string;
  size: string;
  stocks: number;
  images: string[]; // Assuming images is an array of image URLs
}

export default function Product() {
  // State to store the products
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data); // Assuming response.data contains the list of products
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full min-h-screen">
      <h1 className="text-3xl text-center py-5">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.title} className="border p-4 rounded-md shadow-lg">
            <h2 className="font-bold text-xl">{product.title}</h2>
            <p>{product.description}</p>
            <div className="flex flex-wrap gap-2">
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={product.title} className="w-32 h-32 object-cover rounded-md" />
              ))}
            </div>
            <p className="text-lg mt-2">${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Size: {product.size}</p>
            <p>Stocks: {product.stocks}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
