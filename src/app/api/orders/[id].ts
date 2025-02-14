import dbConnect from "@/app/lib/db";
import OrderModal from "@/app/modals/orderModal";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Ensure the database connection is established

  const { id } = req.query; // Get order ID from the query

  switch (req.method) {
    case "GET":
      try {
        // Fetch the order by ID
        const order = await OrderModal.findById(id);

        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
      } catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
      }
      break;

    case "PUT":
      try {
        const { status } = req.body;

        if (!status || !["pending", "successful"].includes(status)) {
          return res.status(400).json({ message: "Invalid status" });
        }

        // Find and update the order by ID
        const updatedOrder = await OrderModal.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
          return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(updatedOrder);
      } catch (error) {
        res.status(400).json({ message: "Error updating order", error });
      }
      break;

    case "DELETE":
      try {
        // Delete the order by ID
        const deletedOrder = await OrderModal.findByIdAndDelete(id);

        if (!deletedOrder) {
          return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted" });
      } catch (error) {
        res.status(400).json({ message: "Error deleting order", error });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
