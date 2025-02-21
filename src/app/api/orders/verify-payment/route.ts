import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/app/lib/db";
import OrderModal from "@/app/modals/orderModal";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "your_razorpay_secret_key";

export async function POST(req: NextRequest) {
  await dbConnect(); // Ensure database connection

  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, orderId } = await req.json();

    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature || !orderId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Verify the payment signature
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ message: "Payment verification failed" }, { status: 400 });
    }

    // Update Order Status
    await OrderModal.updateOne(
      { "orders._id": orderId },
      { $set: { "orders.$.status": "completed" } }
    );

    return NextResponse.json({ message: "Payment verified successfully" }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: "Error verifying payment", error: error.message }, { status: 500 });
  }
}
