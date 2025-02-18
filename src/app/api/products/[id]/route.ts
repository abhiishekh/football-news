import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import ProductModal from '@/app/modals/productModal';

export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl; // Get the full URL path
  const id = pathname.split('/').pop(); // Extract the last part (id) from the path

  if (!id) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const product = await ProductModal.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Error fetching product" }, { status: 500 });
  }
}
