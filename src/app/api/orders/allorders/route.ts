import dbConnect from "@/app/lib/db";
import orderModal from "@/app/modals/orderModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const orders = await orderModal
      .find()
      .populate("userId", "name email") // Populating user details
      .populate("orders.product.productId", "title images price"); // Populating product details

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: "No Orders Found" }, { status: 404 });
    }

    // Transform the response
    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      user: order.userId.name,
      email: order.userId.email || "No Email",
      orders: order.orders.map((item: { product: { productId: { title: any; images: any[]; price: any; }; }; amount: any; status: any; createdAt: string | number | Date; }) => ({
        productTitle: item.product?.productId?.title || "Unknown Product",
        productImage:
        item.product?.productId?.images?.[0] || "https://via.placeholder.com/50",
        price: item.product?.productId?.price ?? 0,
        amount: item.amount ?? 0, // Extracting amount
        status: item.status || "Pending", // Extracting status
        createdAt: new Date(item.createdAt).toLocaleDateString(), // Formatting date
      })),
    }));

    return NextResponse.json(formattedOrders, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching orders", error: error.message },
      { status: 500 }
    );
  }
}
