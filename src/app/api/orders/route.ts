import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import OrderModal from "@/app/modals/orderModal";
import jwt, { JwtPayload } from 'jsonwebtoken'
import ProductModal from "@/app/modals/productModal";


const SECRET_KEY = process.env.JWT || "your_secret_key";


interface DecodedToken extends JwtPayload {
  userId: string;
}

export async function POST(req: NextRequest) {
  await dbConnect(); // Ensure database connection

  try {
    //  Verify Token
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    let decodedToken: DecodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY) as DecodedToken;
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const userId = decodedToken?.userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: Invalid user data" }, { status: 401 });
    }

    //  Extract Request Body
    const { productId, selectedAddress, razorpayOrderId, razorpayPaymentId, amount, status } = await req.json();
    console.log( " data extracted: ", productId, selectedAddress, razorpayOrderId, razorpayPaymentId,amount,status)
    if (!productId || !selectedAddress || !razorpayOrderId || !amount) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const { street_address, city, state, country, postal_code } = selectedAddress;
    if (!street_address || !city || !state || !country || !postal_code) {
      return NextResponse.json({ message: "Incomplete address details" }, { status: 400 });
    }


    const product = await ProductModal.findById(productId).select("title images price");
    if (!product) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 404 });
    }

    //  New order object
    const newOrder = {
      razorpayOrderId,
      razorpayPaymentId,
      product: {
        productId: product._id,
        title: product.title,
        images: product.images,
        price: product.price
      },
      address:selectedAddress,
      amount: parseFloat(amount),
      status: status || "pending",
      createdAt: new Date()
    };

    //  Check if user already has an order history
    let userOrder = await OrderModal.findOne({ userId });

    if (userOrder) {
      //  Append new order to existing user's order array
      userOrder.orders.push(newOrder);
      await userOrder.save();
    } else {
      //  Create a new order record for this user
      userOrder = new OrderModal({ userId, orders: [newOrder] });
      await userOrder.save();
    }

    return NextResponse.json({ message: "Order added successfully", order: newOrder }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Error creating order", error: error.message }, { status: 500 });
  }
}


interface DecodedToken extends JwtPayload {
  userId: string;
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    let decodedToken: DecodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY) as DecodedToken;
    } catch (error) {
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const userId = decodedToken?.userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: Invalid user data" }, { status: 401 });
    }

    //  Fetch single document containing all orders of the user
    const userOrders = await OrderModal.findOne({ userId }).populate("orders.product.productId");

    if (!userOrders || userOrders.orders.length === 0) {
      return NextResponse.json({ message: "No orders found for this user." }, { status: 404 });
    }

    return NextResponse.json(userOrders.orders, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: "Error fetching orders", error: error.message }, { status: 500 });
  }
}
