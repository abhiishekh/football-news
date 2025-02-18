import { NextResponse } from "next/server";
import CartModal from "@/app/modals/cartModal";
import ProductModal from "@/app/modals/productModal";
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb'; // To validate MongoDB ObjectId

interface CustomJwtPayload {
    userId: any;
    _id: string;  
}

const getUserFromToken = async (req: Request) => {
  const token = req.headers.get("token");
  console.log("Extracted token from headers:", token); // Debug token
  
  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT as string) as CustomJwtPayload;
    return decoded.userId;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error("Invalid token or session expired");
  }
};

export async function POST(req: Request) {
  try {
    const { productId, quantity } = await req.json();
    if (quantity <= 0 || isNaN(quantity)) {
      return NextResponse.json({ message: "Invalid quantity" }, { status: 400 });
    }

    const userId = await getUserFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: "Please log in to add products to your cart." }, { status: 401 });
    }
    
    
    if (!productId || !quantity) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    
    // Validate productId format
    if (!ObjectId.isValid(productId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }
    
    // Check if the product exists in the Product collection
    const product = await ProductModal.findById(productId);
      console.log(product)
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    console.log("please login")

    // Calculate the price for the quantity of products
    const price = product.price * quantity;

    // Find the cart for the user
    let cart = await CartModal.findOne({ userId });

    if (!cart) {
      // If the user doesn't have a cart, create a new one
      cart = new CartModal({
        userId,
        items: [{ productId, quantity, price }],
        total: price,
      });
      await cart.save();
      console.log("New cart created:", cart); // Debug new cart creation
      return NextResponse.json(cart, { status: 201 });
    }

    // If the cart exists, check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex((item: { productId: { toString: () => any; }; }) => item.productId.toString() === productId.toString());


    if (existingItemIndex >= 0) {
      // Product exists, update the quantity and total price
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price = product.price * cart.items[existingItemIndex].quantity;
    } else {
      // Product doesn't exist in the cart, add it
      cart.items.push({ productId, quantity, price });
    }

    // Recalculate the total price
    cart.total = cart.items.reduce((acc: any, item: { price: any; }) => acc + item.price, 0);


    // Save the updated cart
    await cart.save();

    return NextResponse.json(cart, { status: 200 });

  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error adding product to cart", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error adding product to cart", error: "Unknown error" }, { status: 500 });
  }
}

