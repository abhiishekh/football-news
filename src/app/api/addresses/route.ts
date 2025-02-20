import { NextRequest, NextResponse } from "next/server";
import AddressModal from "@/app/modals/addressModal";
import dbConnect from "@/app/lib/db";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT!);
    const userId = new mongoose.Types.ObjectId(decoded.userId);

    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const { name, street_address, city, state, postal_code, country, phone_number } = body || {};
    if (!name || !street_address || !city || !state || !postal_code || !country || !phone_number) {
  
      return NextResponse.json({ message: "Missing required fields", error: "All address fields are required" }, { status: 400 });
    }

    let userAddresses = await AddressModal.findOne({ user_id: userId });

    const newAddress = { name, street_address, city, state, postal_code, country, phone_number };

    if (!userAddresses) {
      userAddresses = new AddressModal({
        user_id: userId,
        addresses: [], 
      });
    } else {
      console.log("🟢 Adding New Address to User Document");
      userAddresses.addresses.push(newAddress);
    }
    await userAddresses.save();
    console.log("✅ Address document successfully saved!");

    return NextResponse.json({ message: "Address added successfully", data: userAddresses }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ message: "Error creating address", error: error.message }, { status: 400 });
  }
}


// 🔹 [GET] Fetch User Addresses
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT!);
    const userId = new mongoose.Types.ObjectId(decoded.userId);

    // 🔍 Find the user's addresses
    const userAddresses = await AddressModal.findOne({ user_id: userId });

    if (!userAddresses || userAddresses.addresses.length === 0) {
      return NextResponse.json({ message: "No addresses found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Addresses retrieved successfully", data: userAddresses.addresses }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: "Error retrieving addresses", error: error.message }, { status: 400 });
  }
}