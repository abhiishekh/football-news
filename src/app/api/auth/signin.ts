// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import dbConnect from '@/app/lib/db';
import User from '@/app/modals/userModal';


const SECRET_KEY = 'Ilovecoding'; // Use a secure, random key in production

export async function POST(req: NextRequest) {
  try {
    // Extract username and password from the request body
    const { username, password } = await req.json();

    // Validate input fields
    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Find the user in the database by username
    const user = await User.findOne({ userId: username });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Example: Basic password check (Replace with real password hashing and validation)
    // In a real-world scenario, you would hash the password and compare it with the stored hash.
    if (password !== 'password') { // Replace this with real password validation
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

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
    return NextResponse.json({ message: 'Login successful' }, {
      status: 200,
      headers: {
        'Set-Cookie': cookies,
      },
    });
  } catch (error) {
    console.error('Error during signin:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
