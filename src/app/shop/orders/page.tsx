"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

// Define types for Product, Address, and Order
interface Product {
  _id: string;
  title: string;
  images: string[];
}

interface Address {
  street_address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

interface Order {
  product: any;
  _id: string;
  userId: string;
  productId: Product;
  address: Address;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const { isAuthenticated } = useAuth()
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await axios.get<Order[]>("/api/orders", {
          headers: {token },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] px-4">
      <div className="w-full h-full container mx-auto">
        <h1 className="text-2xl sm:text-3xl pt-8 font-semibold text-center sm:text-left">
          My Orders
        </h1>
        {loading ? (
          <p className="text-base sm:text-lg mt-6 text-center">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-base sm:text-lg mt-6 text-center">No orders found.</p>
        ) : (
          <div className="mt-6 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row gap-4 items-start"
              >
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28  rounded-lg flex items-center justify-center overflow-hidden">
                  {order.product.productId?.images?.length > 0 ? (
                    <img
                      src={order.product.productId.images[0]}
                      alt="Product"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs sm:text-sm">No Image</span>
                  )}
                </div>

                {/* Order Details */}
                <div className="flex-1">
                  <div className=" flex flex-col justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold">Order #{order._id}</h2>

                    {/* Order Status Badge */}
                    <span
                      className={`px-3 py-1 w-fit text-xs sm:text-sm font-medium text-white rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-500"
                          : order.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                        <p className="text-lg font-semibold my-1">{order.product.title}</p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Total: ${order.amount.toFixed(2)}
                  </p>

                  {/* Product Title */}
                  <h3 className="mt-2 font-medium text-sm sm:text-base">
                    {order.productId?.title}
                  </h3>

                  {/* Address Display in One Line */}
                  <p className="text-gray-500 text-xs sm:text-sm mt-2">
                    {`${order.address?.street_address}, ${order.address?.city}, ${order.address?.state}, ${order.address?.country} - ${order.address?.postal_code}`}
                  </p>

                
                </div>
              </div>
            ))}
          </div>
        )}

<span className="loading loading-ring loading-lg bg-red-500"></span>
      </div>
    </div>
  );
};

export default Orders;
