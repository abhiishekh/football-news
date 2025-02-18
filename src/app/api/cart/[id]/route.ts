import CartModal from "@/app/modals/cartModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";  // Import ObjectId from MongoDB

interface CustomJwtPayload {
  userId: any;
  _id: string;
}

const getUserFromToken = async (req: NextRequest) => {
  const token = req.headers.get("token");
  console.log("Extracted token from headers:", token);

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

export async function DELETE(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Extract and decode the productId from the URL
  let productId = pathname.split("/").pop();
  productId = decodeURIComponent(productId?.trim() || "");
  console.log("Product ID from URL:", productId);

  if (!productId) {
    return NextResponse.json({ message: "Product ID not found." }, { status: 404 });
  }

  // Convert the productId string into MongoDB ObjectId
  let productObjectId;
  try {
    productObjectId = new ObjectId(productId);
  } catch (e) {
    return NextResponse.json({ message: "Invalid product ID format." }, { status: 400 });
  }

  // Get the user from the token
  const userId = await getUserFromToken(req);

  // If no userId is found, return an authentication error
  if (!userId) {
    return NextResponse.json({ message: "Please log in to remove products from your cart." }, { status: 401 });
  }

  // Find the user's cart by their userId
  const user = await CartModal.findOne({ userId });

  // Log the user cart data for debugging
  console.log("User cart data:", user);

  // If the user doesn't have a cart, return a not found response
  if (!user) {
    return NextResponse.json({ message: "User cart not found." }, { status: 404 });
  }

  // Find the index of the product in the items array (compare productId only)
  const productIndex = user.items.findIndex((item: { _id: string }) => {
    console.log("Checking item with productId:", item._id);  // Log each item's productId
    return item._id.toString() === productObjectId.toString();  // Convert to string for comparison
  });

  console.log("Product Index:", productIndex);  // Log the index after searching

  // If product doesn't exist in the cart, return a not found response
  if (productIndex === -1) {
    return NextResponse.json({ message: "Product not found in cart." }, { status: 404 });
  }

  // Remove the product from the user's cart (items array)
  user.items.splice(productIndex, 1);

  // Save the updated cart
  try {
    await user.save();
    return NextResponse.json({ message: "Product removed from cart successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error saving updated cart:", error);
    return NextResponse.json({ message: "Failed to save cart." }, { status: 500 });
  }
}
