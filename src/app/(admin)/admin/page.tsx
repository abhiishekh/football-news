"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./product/page";
import AddproductDialog from "@/app/(components)/AddproductDialog/page";
import Orders from "./orders/page";
import Users from "./users/page";
import Revenue from "./revenue/page";

export default function AdminPage() {
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("product");

  useEffect(() => {
    fetchUsersCount();
    fetchOrdersData();
  }, []);

  const fetchUsersCount = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsersCount(response.data.users.length);
    } catch (error) {
      console.error("Error fetching users count", error);
    }
  };

  const fetchOrdersData = async () => {
    try {
      const response = await axios.get("/api/orders/allorders")
      const totalOrders = response.data.reduce((count: any, item: { orders: string | any[]; }) => count + item.orders.length, 0);
      console.log("Total Number of Orders:", totalOrders);
      
      setOrdersCount(totalOrders);

      const revenue = response.data.reduce((sum: number, order: any) => {
        return sum + order.orders.reduce((orderSum: number, item: any) => {
          return orderSum + (item.price || 0) * (item.quantity || 1);
        }, 0);
      }, 0);
      
      setTotalRevenue(revenue);
      console.log("Total Revenue:", revenue);
      
    } catch (error) {
      console.error("Error fetching orders data", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white to-blue-300">
      <div className="container px-2 mt-12 sm:mt-0 min-h-screen w-full md:w-[1100px] mx-auto py-10">
        <h1 className="font-bold text-3xl text-black text-center">Admin Page</h1>

        {/* Dashboard Tabs */}
        <div className="w-full flex flex-wrap sm:justify-between items-center gap-2 sm:gap-4 my-12">
          <h1
            onClick={() => setActiveTab("product")}
            className={`py-2 sm:py-4 px-8 rounded-lg font-bold border border-orange-500 text-sm sm:text-xl cursor-pointer ${
              activeTab === "product" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
            }`}
          >
            Products
          </h1>

          <h1
            onClick={() => setActiveTab("orders")}
            className={`py-2 sm:py-4 px-8 rounded-lg font-bold border border-orange-500 text-sm sm:text-xl cursor-pointer ${
              activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
            }`}
          >
            Orders: {ordersCount}
          </h1>

          <h1
            onClick={() => setActiveTab("revenue")}
            className={`py-2 sm:py-4 px-8 rounded-lg font-bold border border-orange-500 text-sm sm:text-xl cursor-pointer ${
              activeTab === "revenue" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
            }`}
          >
            Revenue: ${totalRevenue.toFixed(2)}
          </h1>

          <h1
            onClick={() => setActiveTab("users")}
            className={`py-2 sm:py-4 px-8 rounded-lg font-bold border border-orange-500 text-sm sm:text-xl cursor-pointer ${
              activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
            }`}
          >
            Users: {usersCount}
          </h1>
        </div>

        <AddproductDialog />

        {/* Conditional Rendering Based on Active Tab */}
        <div className="mt-8">
          {activeTab === "product" && (
            <>
              <h1 className="text-3xl text-center">All Products</h1>
              <Product />
            </>
          )}

          {activeTab === "orders" && (
            <div >
            <div><Orders/></div>
            </div>
          )}

          {activeTab === "revenue" && (
           <div>
            <Revenue/>
           </div>
          )}

          {activeTab === "users" && (
            <div>
              <Users/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
