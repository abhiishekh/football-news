"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

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
        const response = await axios.get<Product[]>("/api/products"); // Type the response
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
      <div className="container mx-auto border-[1px] p-4 border-black rounded-md mt-12 shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Stocks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} className="h-12">
                <TableCell className="font-medium h-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.stocks}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-3 justify-end">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition"
                      onClick={() => console.log("Edit", product.title)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => console.log("Delete", product.title)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
