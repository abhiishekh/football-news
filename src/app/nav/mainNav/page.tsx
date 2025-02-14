'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/app/assets/images/image.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Sidebar from '../sidebar/page';
import DropdownMenu from '@/app/(components)/dropdown/page';
import { CiSearch } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Track authentication state
  const [isSignUp, setIsSignUp] = useState(false); // Track which form is being shown
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    try {
      // Send signout request to the server
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });

      if (res.ok) {
        document.cookie = 'token=; Max-Age=0; path=/'; // Expire the token in cookies
        setIsAuthenticated(false); // Update the authentication state
        router.push('/'); // Redirect to the home page
      } else {
        const data = await res.json();
        alert(data.message); // Show error message from the server
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const checkAuthentication = () => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert('Signup successful!');
      setIsSignUp(false); // Close sign up dialog
      setIsAuthenticated(true); // Update auth state
      router.push('/'); // Redirect to home page after signup
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('Something went wrong during sign up');
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert('Sign-in successful!');
      setIsAuthenticated(true); // Update authentication state
      router.push('/dashboard'); // Redirect to dashboard after sign in
    } catch (error) {
      console.error('Error during sign in:', error);
      alert('Something went wrong during sign in');
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#1D4E89] to-[#071423] text-white flex font-alike py-2 lg:py-0 fixed top-0 z-50">
      <div className='w-full xl:w-[1150px] mx-auto px-2 xl:px-0'>

        <div className="w-full flex flex-wrap justify-between items-center">
          <div className="w-full lg:w-auto flex gap-2 sm:gap-10 items-center justify-between">
            <div className='flex items-center'>
              <div className="h-full w-16 sm:w-24">
                <Link href="/">
                  <Image src={logo} alt="Logo" layout="responsive" width={100} height={100} />
                </Link>
              </div>
              <h1 className="text-3xl sm:text-5xl font-calistoga tracking-[.6rem] sm:tracking-[.7rem]">
                GoalMania
              </h1>
            </div>

            {/* Mobile sidebar toggle button */}
            <button onClick={toggleSidebar} className="lg:hidden p-2">
              {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
            </button>
          </div>

          {/* Sidebar */}
          {isOpen && <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />}

          <div className="hidden lg:flex px-2 justify-end">
            <div className="flex gap-1 sm:gap-10 items-center">
              <div className="text-xl">
                <CiSearch />
              </div>
              <DropdownMenu
                title="Language"
                options={['English', 'French', 'German', 'Italian', 'Portuguese']}
                linkPrefix="/"
              />
              {/* Login / Sign Out button */}
              {isAuthenticated ? (
                <div className="cursor-pointer text-white" onClick={handleSignOut}>
                  Sign Out
                </div>
              ) : (
                <div className="flex gap-4">
                  <Dialog>
                    <DialogTrigger className='bg-white/10 px-4 py-2 rounded-full '>
                      SignIn
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className='text-center text-3xl'>SignIn</DialogTitle>
                        <DialogDescription className='flex flex-col gap-4'>
                          <Label>Username</Label>
                          <Input
                            type="text"
                            name="username"
                            placeholder='Username'
                            value={formData.username}
                            onChange={handleFormChange}
                          />
                          <Label>Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleFormChange}
                          />
                          <Button className='text-xl' onClick={handleSignIn}>
                            Sign In
                          </Button>
                          <p className='text-lg'>
                            Don't have an account{' '}
                            <span className='text-blue-400 cursor-pointer' onClick={() => { setIsSignUp(true); }}>
                              Sign Up Now
                            </span>
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  {/* SignUp Dialog */}
                  <Dialog open={isSignUp} onOpenChange={(open) => setIsSignUp(open)}>
                    <DialogTrigger></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className='text-center text-3xl'>Sign Up</DialogTitle>
                        <DialogDescription className='flex flex-col gap-4'>
                          <Label>Username</Label>
                          <Input
                            type="text"
                            name="username"
                            placeholder='Username'
                            value={formData.username}
                            onChange={handleFormChange}
                          />
                          <Label>Email</Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleFormChange}
                          />
                          <Label>Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleFormChange}
                          />
                          <Button className='text-xl' onClick={handleSignUp}>
                            Sign Up
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
