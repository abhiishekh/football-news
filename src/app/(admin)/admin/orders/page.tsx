import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface OrderItem {
  productTitle: string;
  productImage: string;
  price: number;
  date: string; // Added date here to display per item
}

interface Order {
  orderId: string;
  totalPrice: number;
  user: string;
  email: string;
  items: OrderItem[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const fetchOrdersData = async () => {
    try {
      const response = await axios.get("/api/orders/allorders");
      
      const formattedOrders: Order[] = response.data.map((order: any) => ({
        orderId: order.orderId || "N/A",
        totalPrice: order.totalAmount || 0,
        user: order.user || "Unknown User",
        email: order.email || "No Email",
        items: order.orders.map((item: any) => ({
          productTitle: item.productTitle || "Unknown Product",
          productImage: item.productImage || "https://via.placeholder.com/50",
          price: item.price ?? 0,
          date: item.createdAt && !isNaN(new Date(item.createdAt).getTime()) 
            ? new Date(item.createdAt).toLocaleDateString() 
            : "Date Not Available", // Extracts date from `item.createdAt`
        })),
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders data", error);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto border-[1px] p-4 border-black rounded-md mt-12  shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Orders List</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) =>
                order.items.map((item, index) => (
                  <TableRow key={`${order.orderId}-${index}`} className="h-12">
                    <TableCell>
                      <img
                        src={item.productImage}
                        alt={item.productTitle}
                        className="w-12 h-12 rounded-md"
                      />
                    </TableCell>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.date}</TableCell> 
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No Orders Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
