import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import OrderModal from "@/app/modals/orderModal";
import ProductModal from "@/app/modals/productModal";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT || "your_secret_key";

interface DecodedToken extends JwtPayload {
  userId: string;
}

/**
 * ✅ Create a New Order
 */
export async function POST(req: NextRequest) {
  await dbConnect(); // Ensure database connection

  try {
    // 1️⃣ Verify JWT Token
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }
if(token){
  console.log("got token")
}
    let decodedToken: DecodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY) as DecodedToken;
    } catch (error) {
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const userId = decodedToken.userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: Invalid user data" }, { status: 401 });
    }

    // 2️⃣ Extract Order Data
    const { productId, address, amount } = await req.json();
    if (!productId || !address || !amount) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
console.log ( "Got the details", productId, address, amount)
    // 3️⃣ Fetch Product Details
    const product = await ProductModal.findById(productId).select("title images price");
    if (!product) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 404 });
    }
    console.log("find the produc details ", product)

    // 4️⃣ Create New Order
    const newOrder = {
      product: {
        productId: product._id,
        title: product.title,
        images: product.images,
        price: product.price,
      },
      address,
      amount: parseFloat(amount),
      status: "pending",
      createdAt: new Date(),
    };

    let userOrder = await OrderModal.findOne({ userId });
    if (userOrder) {
      userOrder.orders.push(newOrder);
      await userOrder.save();
    } else {
      userOrder = new OrderModal({ userId, orders: [newOrder] });
      await userOrder.save();
    }
console.log("order created")
    return NextResponse.json({ message: "Order created successfully", order: newOrder }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Error creating order", error: error.message }, { status: 500 });
  }
}
