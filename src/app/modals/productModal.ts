import mongoose from "mongoose";

interface ProductType {
  title: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  gender: string;
  child: string;
  stocks: number;
  size: string;
}

// Check if the model already exists
const productSchema = new mongoose.Schema<ProductType>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], reqired: true},
  price: { type: Number, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  child: { type: String, required: true },
  stocks: { type: Number, required: true },
  size: { type: String, required: true },
});

// Check if the model is already compiled, otherwise compile it
const ProductModal = mongoose.models.Product || mongoose.model("Product", productSchema);


export default ProductModal;
