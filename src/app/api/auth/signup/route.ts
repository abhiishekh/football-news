// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import dbConnect from '@/app/lib/db';
import User from '@/app/modals/userModal';
import bcrypt from 'bcryptjs'

const JWT = process.env.JWT as string

export async function POST(req: NextRequest) {
  try {
    // Extract username and password from the request body
    const { name, email, password } = await req.json();

    // Validate input fields
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'name, email, and password are required' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password,10)

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password : hashedPassword,
      createdAt: new Date(),
    });

    // Save the new user to the database
    await newUser.save();
    const userId = newUser._id;
    // Create a JWT token for the user
    const token = jwt.sign(
      { userId },
      JWT,
      { expiresIn: '1h' }
    );

console.log(token)


    // Send response with the token cookie
    return NextResponse.json({ token}, {
      status: 200,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
