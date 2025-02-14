import dbConnect from "@/app/lib/db";
import OrderModal from "@/app/modals/orderModal";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Ensure the database connection is established

  switch (req.method) {
    case "POST":
      try {
        const { user_id, product_id, address, payment_id, status } = req.body;

        // Create a new order instance
        const newOrder = new OrderModal({
          user_id,
          product_id,
          address,
          payment_id,
          status: status || "pending", // Default status is "pending" if not provided
        });

        // Save the order to the database
        await newOrder.save();
        res.status(201).json(newOrder);
      } catch (error) {
        res.status(400).json({ message: "Error creating order", error });
      }
      break;

    case "GET":
      try {
        // Fetch all orders from the database
        const orders = await OrderModal.find();
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
