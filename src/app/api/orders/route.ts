import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import OrderModal from "@/app/modals/orderModal";

export async function POST(req: NextRequest) {
  await dbConnect(); // Ensure the database connection is established

  try {
    const { user_id, product_id, address, payment_id, status } = await req.json();

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
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating order", error }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect(); // Ensure the database connection is established

  try {
    // Fetch all orders from the database
    const orders = await OrderModal.find();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching orders", error }, { status: 500 });
  }
}
