"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/app/(components)/productCard/page";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import axios from "axios";
import { useSearch } from "@/app/context/searchContext";

interface Product {
  _id: string;
  productId: string;
  title: string;
  description: string;
  price: number;
  gender: string;
  child: string;
  category: string;
  tshirtType: string;
  size: string;
  stocks: number;
  images: string[];
}

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { searchQuery, filters } = useSearch(); // Get search query and filters

  const productsPerPage = 8;

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

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGender = filters.gender.length === 0 || filters.gender.includes(product.gender);
    const matchesChild = filters.child.length === 0 || filters.child.includes(product.child);
    const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);
    const matchesTshirtType = filters.tshirtType.length === 0 || filters.tshirtType.includes(product.tshirtType);

    return matchesSearchQuery && matchesGender && matchesChild && matchesCategory && matchesTshirtType;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="w-full flex flex-col items-center justify-between my-3">
      {/* Product Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:flex md:flex-wrap md:justify-center gap-6 py-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((item) => (
            <div key={item._id} className="w-full sm:w-auto md:w-60 h-fit">
              <ProductCard
                productId={item._id}
                images={item.images}
                title={item.title}
                category={item.category}
                price={item.price}
              />
            </div>
          ))
        ) : (
          <div className="text-xl text-gray-500">No products found.</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-4 my-6">
          <button
            className="p-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaAngleLeft />
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="p-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaAngleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
