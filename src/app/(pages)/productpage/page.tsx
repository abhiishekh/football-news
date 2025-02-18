"use client"
import React, { useEffect, useState } from 'react';
// import data from '@/app/data/productdata';
import ProductCard from '@/app/(components)/productCard/page';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';

interface Product {
  _id: string;
  productId: string;
  title: string;
  description: string;
  price: number;
  gender: string;
  child: string;
  category: string;
  size: string;
  stocks: number;
  images: string[]; 
}

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  const productsPerPage = 8; 

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: React.SetStateAction<number | any>) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const generatePagination = () => {
    const pages = [];

    if (currentPage > 2) {
      pages.push(1); 
    }
    if (currentPage > 3) {
      pages.push("...");
    }

    if (currentPage - 1 > 1 && currentPage + 1 < totalPages) {
      pages.push(currentPage - 1);
    }

    pages.push(currentPage);

    if (currentPage < totalPages - 1) {
      pages.push(currentPage + 1);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <div className='w-full min-h-screen flex gap-6 flex-wrap justify-center py-6'>
        {currentProducts.map((item, index) => (
          <div key={index} className='w-full sm:w-60'>
            
            <ProductCard
              productId={item._id}
              images={item.images}
              title={item.title}
              category={item.category}
              price={item.price}
            />
          </div>
        ))}
      </div>

      <div className='flex justify-center items-center space-x-3 mt-6'>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-3 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300'
        >
          <FaAngleLeft />
        </button>

        {generatePagination().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== "..." && paginate(page)}
            className={`px-4 py-2 rounded-md ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : page === "..."
                ? 'bg-gray-200 text-gray-700'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-3 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300'
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
