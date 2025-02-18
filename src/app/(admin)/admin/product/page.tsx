"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

interface Product {
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

export default function Product() {
  // State to store the products
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("/api/products");  // Type the response
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto border-[1px] p-2 border-black rounded-md mt-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Stocks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} className="h-12 ">
                <TableCell className="font-medium h-4">
                  <img src={product.images[0]} alt={product.title} className="w-12 h-12" />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="text-right">{product.stocks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
