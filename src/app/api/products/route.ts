import { NextResponse } from 'next/server';
import dbConnect from "@/app/lib/db";
import type { NextRequest } from "next/server";
import ProductModal from '@/app/modals/productModal';

// POST: Add a new product to the database
export async function POST(req: NextRequest) {
  await dbConnect(); // Ensure the database connection is established

  
  try {
    const { title, description, images, price, tshirtType, category, gender, child, stocks, size } = await req.json();
    if (!images || images.length === 0) {
      return NextResponse.json({ error: "At least one image is required" });
    }
console.log("data fetched and listed :", title,description,images,price,category,"type is : ", tshirtType,size,stocks)
    // Create the new product
    const newProduct = new ProductModal({
      title,
      description,
      images,
      price,
      tshirtType,
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
export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const gender = url.searchParams.getAll("gender");
  const child = url.searchParams.getAll("child");
  const category = url.searchParams.getAll("category");
  const tshirtType = url.searchParams.getAll("tshirtType");

  try {
    const query: any = {};

    if (gender.length) query.gender = { $in: gender };
    if (child.length) query.child = { $in: child };
    if (category.length) query.category = { $in: category };
    if (tshirtType.length) query.tshirtType = { $in: tshirtType };

    const products = await ProductModal.find(query);

    if (!products.length) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}