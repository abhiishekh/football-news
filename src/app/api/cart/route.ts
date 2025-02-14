// import { NextResponse } from "next/server";
// import CartModal from "@/app/modals/cartModal";
// import ProductModal from "@/app/modals/productModal";
// import { clerkClient } from '@clerk/clerk-sdk-node';
// import mongoose from "mongoose";

// // Helper function to get userId from Clerk's session
// const getUserFromClerk = async (req: Request) => {
//   const authHeader = req.headers.get("Authorization");

//   // Add logging to check if the Authorization header is present
//   console.log('Authorization Header:', authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     throw new Error("Unauthorized");
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     // Retrieve your Clerk API key from environment variables or config
//     const clerkApiKey = process.env.CLERK_API_KEY;  // Make sure you set this in your .env file

//     if (!clerkApiKey) {
//       throw new Error("Clerk API key is missing in environment variables.");
//     }

//     // Verify the session using Clerk's `verifySession` method (with API key)
//     const session = await clerkClient.sessions.verifySession(token, clerkApiKey);
//     return session.userId; // Returns the userId of the authenticated session
//   } catch (error) {
//     console.error('Error verifying session:', error);
//     throw new Error("Invalid token or session expired");
//   }
// };

// // This API route will handle adding products to the cart.
// export async function POST(req: Request) {
//   try {
//     const { productId, quantity } = await req.json(); // Get data from request body

//     // Get userId from Clerk session
//     const userId = await getUserFromClerk(req);

//     if (!userId || !productId || !quantity) {
//       return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//     }

//     // Check if the product exists in the Product collection
//     const product = await ProductModal.findById(productId);
//     if (!product) {
//       return NextResponse.json({ message: "Product not found" }, { status: 404 });
//     }

//     // Calculate the price for the quantity of products
//     const price = product.price * quantity;

//     // Find the cart for the user
//     let cart = await CartModal.findOne({ userId });

//     if (!cart) {
//       // If the user doesn't have a cart, create a new one
//       cart = new CartModal({
//         userId,
//         items: [{ productId, quantity, price }],
//         total: price,
//       });
//       await cart.save();
//       return NextResponse.json(cart, { status: 201 });
//     }

//     // If the cart exists, check if the product is already in the cart
//     const existingItemIndex = cart.items.findIndex((item: { productId: { toString: () => any; }; }) => item.productId.toString() === productId.toString());

//     if (existingItemIndex >= 0) {
//       // Product exists, update the quantity and total price
//       cart.items[existingItemIndex].quantity += quantity;
//       cart.items[existingItemIndex].price = product.price * cart.items[existingItemIndex].quantity;
//     } else {
//       // Product doesn't exist in the cart, add it
//       cart.items.push({ productId, quantity, price });
//     }

//     // Recalculate the total price
//     cart.total = cart.items.reduce((acc: any, item: { price: any; }) => acc + item.price, 0);

//     // Save the updated cart
//     await cart.save();
//     return NextResponse.json(cart, { status: 200 });

//   } catch (error: unknown) {
//     console.error(error);
//     // Handle errors more gracefully
//     if (error instanceof Error) {
//       return NextResponse.json({ message: "Error adding product to cart", error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ message: "Error adding product to cart", error: "Unknown error" }, { status: 500 });
//   }
// }
