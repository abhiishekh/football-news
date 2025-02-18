import { NextResponse } from "next/server";
import CartModal from "@/app/modals/cartModal";  
import ProductModal from "@/app/modals/productModal";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/db";

interface CustomJwtPayload {
  userId: any;
  _id: string;
}

// Utility function to get user ID from JWT token
const getUserFromToken = async (req: Request) => {
  const token = req.headers.get("token");

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT as string) as CustomJwtPayload;
    return decoded.userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid token or session expired");
  }
};

export async function GET(req: Request) {
  try {
    // connect the database
    await dbConnect()
    //extract userId
    const userId = await getUserFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user's cart and populate the product details
    const cart = await CartModal.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    // Calculate the total price for the cart
    const totalPrice = cart.items.reduce((acc: number, item: any) => acc + item.price, 0);

    // Construct the cart response, extracting product details
    const cartResponse = {
      items: cart.items.map((item: any) => ({
        productId: item._id,
        title: item.productId.title,
        images: item.productId.images,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: totalPrice,
    };

    // Return the populated cart data
    return NextResponse.json(cartResponse, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error fetching cart", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error fetching cart", error: "Unknown error" }, { status: 500 });
  }
}
