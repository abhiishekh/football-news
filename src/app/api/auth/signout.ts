// pages/api/auth/signout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear the token cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, // Set maxAge to 0 to delete the cookie
      path: '/'
    }));

    return res.status(200).json({ message: 'Logged out successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
