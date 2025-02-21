import mongoose from "mongoose";

interface ProductType {
  title: string;
  description: string;
  images: string[];
  price: number;
  tshirtType: string;
  category: string;
  gender: string;
  child: string;
  stocks: number;
  size: string;
}

// Define Schema
const productSchema = new mongoose.Schema<ProductType>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true }, // ✅ Fix typo (was "reqired")
  price: { type: Number, required: true },
  tshirtType: { type: String, required: true }, // ✅ Ensure it's correctly added
  category: { type: String, required: true },
  gender: { type: String, required: true },
  child: { type: String, required: true },
  stocks: { type: Number, required: true },
  size: { type: String, required: true },
});

// Check if the model is already compiled, otherwise compile it
const ProductModal = mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModal;
