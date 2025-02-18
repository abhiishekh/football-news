import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import dbConnect from '@/app/lib/db';
import User from '@/app/modals/userModal';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'Ilovecoding';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();


    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare the password hash with the stored hash
    const isTruePassword = await bcrypt.compare(password, user.password);

    if (!isTruePassword) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate the JWT token
    const userId = user._id; 
    const token = jwt.sign(
      { userId },
      SECRET_KEY,
      { expiresIn: '1h' }
    );


    // Return a successful response
    return NextResponse.json({ token }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error during signin:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
