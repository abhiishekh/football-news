// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import dbConnect from '@/app/lib/db';
import User from '@/app/modals/userModal';


const SECRET_KEY = 'Ilovecoding'; // Use a secure, random key in production

export async function POST(req: NextRequest) {
  try {
    // Extract username and password from the request body
    const { username, email, password } = await req.json();

    // Validate input fields
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Username, email, and password are required' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Create a new user document
    const newUser = new User({
      userId: username, // Use the username as the userId
      email,
      createdAt: new Date(),
    });

    // Save the new user to the database
    await newUser.save();

    // Create a JWT token for the user
    const token = jwt.sign(
      { username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Set the token in a cookie (HTTP-only)
    const cookies = cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    // Send response with the token cookie
    return NextResponse.json({ message: 'User registered successfully' }, {
      status: 200,
      headers: {
        'Set-Cookie': cookies,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
