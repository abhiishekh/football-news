import dbConnect from "@/app/lib/db";
import ProductModal from "@/app/modals/productModal";
import type { NextApiRequest, NextApiResponse } from "next";


// Ensure the database connection is established
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Establish the database connection

  const { id } = req.query; // Get product ID from the request query

  switch (req.method) {
    case "GET":
      try {
        // Find a product by ID
        const product = await ProductModal.findById(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
      }
      break;

    case "PUT":
      try {
        // Update product data based on the ID
        const updatedProduct = await ProductModal.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(400).json({ message: "Error updating product" });
      }
      break;

    case "DELETE":
      try {
        // Delete product by ID
        const deletedProduct = await ProductModal.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted" });
      } catch (error) {
        res.status(400).json({ message: "Error deleting product" });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
