import { NextResponse } from "next/server";
import ProductModal from "@/app/modals/productModal";
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import WishlistModal from "@/app/modals/wishlistModal";
import dbConnect from "@/app/lib/db";

interface WishListPayload {
    userId: any;
    _id: string;  
}

const getUserFromToken = async (req: Request) => {
  const token = req.headers.get("token");
  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT as string) as WishListPayload;
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid token or session expired");
  }
};

export async function POST(req: Request) {
  await dbConnect()
  try {
    const { productId } = await req.json();
    
    const userId = await getUserFromToken(req);

    if (!userId) {
      return NextResponse.json({ message: "Please log in to add products to your wishlist." }, { status: 401 });
    }

    if (!productId) {
      return NextResponse.json({ message: "Missing productId" }, { status: 400 });
    }

    if (!ObjectId.isValid(productId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const product = await ProductModal.findById(productId);
    if (!product) {
      console.log("Product not found");
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    let wishlist = await WishlistModal.findOne({ userId });

    if (!wishlist) {
      wishlist = new WishlistModal({
        userId,
        items: [{ productId, quantity: 1, price: product.price }],
        total: product.price, // Initialize total with the first item's price
      });
      await wishlist.save();
      return NextResponse.json(wishlist, { status: 201 });
    }

    // Check if the product already exists in the wishlist
    const existingItemIndex = wishlist.items.findIndex((item: { productId: { toString: () => any; }; }) => item.productId.toString() === productId);

    if (existingItemIndex >= 0) {
      // Product exists, update quantity and price
      wishlist.items[existingItemIndex].quantity += 1;
      wishlist.items[existingItemIndex].price = product.price * wishlist.items[existingItemIndex].quantity;
    } else {
      // Product doesn't exist in wishlist, add it
      wishlist.items.push({ productId, quantity: 1, price: product.price });
    }

    // Recalculate total price
    wishlist.total = wishlist.items.reduce((acc: any, item: { price: any; }) => acc + item.price, 0);

    await wishlist.save();
    return NextResponse.json(wishlist, { status: 200 });

  } catch (error: unknown) {
    console.error("Error adding product to wishlist:", error);
    return NextResponse.json({ message: "Error adding product to wishlist", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

export async function GET(req: Request){
  await dbConnect()
  try {
    const userId = await getUserFromToken(req);

    if (!userId) {
      return NextResponse.json({ message: "Please log in to add products to your wishlist." }, { status: 401 });
    }

    const response = await WishlistModal.findOne({ userId }).populate("items.productId");
    if (!response) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }
    const totalPrice = response.items.reduce((acc: number, item: any) => acc + item.price, 0);

    // Construct the cart response, extracting product details
    const wishlistResponse = {
      items: response.items.map((item: any) => ({
        productId: item._id,
        title: item.productId.title,
        images: item.productId.images,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: totalPrice,
    };
    
console.log(wishlistResponse)
console.log("printed data allready")
    return NextResponse.json({wishlistResponse } , {status:201})
  }  catch (error: unknown) {
      return NextResponse.json({ message: "Something went Wrong", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
