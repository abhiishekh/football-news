import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "your_razorpay_key_id";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "your_razorpay_secret_key";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();
    
    if (!amount) {
      return NextResponse.json({ message: "Amount is required" }, { status: 400 });
    }

    const options = {
      amount: amount * 100, // Razorpay requires amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error creating Razorpay order", error: error.message }, { status: 500 });
  }
}
