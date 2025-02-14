import { NextResponse } from 'next/server';
import dbConnect from "@/app/lib/db";
import type { NextRequest } from "next/server";
import ProductModal from '@/app/modals/productModal';

// POST: Add a new product to the database
export async function POST(req: NextRequest) {
  await dbConnect(); // Ensure the database connection is established

  
  try {
    const { title, description, images, price, category, gender, child, stocks, size } = await req.json();
    if (!images || images.length === 0) {
      return NextResponse.json({ error: "At least one image is required" });
    }

    // Create the new product
    const newProduct = new ProductModal({
      title,
      description,
      images,
      price,
      category,
      gender,
      child,
      stocks,
      size,
    });

    // Save the product to the database
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 }); // Success: 201 status with product data
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "Error adding product" }, { status: 400 });
  }
}
// get response for all the products 
export async function GET() {
  // Connect to the database
  await dbConnect();

  try {
    // Fetch all products from the database
    const products = await ProductModal.find();

    if (!products || products.length === 0) {
      // If no products found, return a 404 response
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }

    // Return the list of products with a 200 status code (success)
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching products:", error);

    // Return an internal server error response if something goes wrong
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}