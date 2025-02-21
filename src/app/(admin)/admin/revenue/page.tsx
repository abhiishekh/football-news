import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const Revenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const fetchOrdersData = async () => {
    try {
      const response = await axios.get("/api/orders/allorders");

      // Calculate total number of orders
      const totalOrders = response.data.reduce(
        (count: number, item: { orders: any[] }) => count + item.orders.length,
        0
      );
      setOrdersCount(totalOrders);

      // Calculate total revenue
      const revenue = response.data.reduce((sum: number, order: any) => {
        return (
          sum +
          order.orders.reduce((orderSum: number, item: any) => {
            return orderSum + (item.price || 0) * (item.quantity || 1);
          }, 0)
        );
      }, 0);

      setTotalRevenue(revenue);
      console.log("Total Revenue:", revenue);
    } catch (error) {
      console.error("Error fetching orders data", error);
    }
  };

  // Pie Chart Data
  const data = [
    { name: "Total Revenue", value: totalRevenue },
    { name: "Total Orders", value: ordersCount  }, // Scaled for better visualization
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="container mx-auto p-6  ">
        <h1 className="text-3xl font-bold text-center mb-6">Revenue Overview</h1>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Total Revenue: ${totalRevenue.toFixed(2)}</h2>
          <h3 className="text-lg text-gray-600">Total Orders: {ordersCount}</h3>

          <div className="w-full h-80 ">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
