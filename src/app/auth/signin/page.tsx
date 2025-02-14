'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';

export default function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Always call useRouter hook unconditionally
  const router = useRouter();

  // Use useEffect to ensure the login logic runs only on the client side
  useEffect(() => {
    // Can perform client-side logic here if needed (e.g., checking session)
  }, []);

  const handleSignin = async () => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message);
        return;
      }

      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold mb-4">Sign In</h2>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={(e) => e.preventDefault()}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mb-4"
            />
            <FormMessage />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mb-4"
            />
            <FormMessage />
          </FormControl>

          <Button onClick={handleSignin} className="w-full mt-4">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
