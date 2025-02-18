'use client';

import DropdownMenu from '@/app/(components)/dropdown/page';
import NavButton from '@/app/(components)/navbutton/page';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { FaCaretDown, FaHome, FaNewspaper, FaExchangeAlt, FaGlobe, FaStore, FaInfoCircle, FaSignInAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isInternationalTeamsOpen, setIsInternationalTeamsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const pathname = usePathname()
  const router = useRouter();
  const [isSignup, setIsSignUp] = useState(false);
  const { isAuthenticated, login, logout, signup } = useAuth(); // Use the auth hook
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggleSidebar();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toggleSidebar]);


  const handleSignIn = async () => {
    await login(formData.email, formData.password);
  };

  const handleSignUp = async () => {
    await signup(formData.name, formData.email, formData.password);
  };


  return (
    <div
      ref={sidebarRef}
      className={`z-10 fixed top-[63px] left-0 h-full w-64 bg-gradient-to-b from-[##1D4E89]/80 to-[#0b265d]/80 backdrop-blur-md transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col items-start py-6 px-4 gap-3">
        <div className="flex gap-3">
          {/* Display user profile if authenticated */}
          {isAuthenticated ? (
            <div>Profile</div> // Replace with a profile view or button for logged-in users
          ) : null}
        </div>

        {/* Navigation buttons */}
        <NavButton href="/" active={pathname === '/'} icon={<FaHome />}>
          Home
        </NavButton>

        <NavButton href="/latestnews" active={pathname === '/news'} icon={<FaNewspaper />}>
          Latest News
        </NavButton>

        <NavButton href="/transfermarket" active={pathname === '/transfermarket'} icon={<FaExchangeAlt />}>
          Transfer Market
        </NavButton>

        <NavButton href="/seriesA" active={pathname === '/seriesA'} icon={<FaGlobe />}>
          Series A
        </NavButton>

        {/* International Teams Dropdown */}
        <DropdownMenu
          title="International Teams"
          options={['Premier League', 'La Liga', 'Bundesliga', 'Ligue 1', 'Other International Competitions']}
          linkPrefix="/internationsteams"
        />

        <NavButton href="/fantasy-football" active={pathname === '/fantasy-football'} icon={<FaGlobe />}>
          Fantasy Football
        </NavButton>

        {/* Shop Dropdown */}
        <Link href={'/shop'}>
          <DropdownMenu
            title="Shop"
            options={['2024/2025 Jerseys', 'Serie A International']}
            linkPrefix="/shop"
            icon={<FaStore />}
          />
        </Link>

        <NavButton href="/about" active={pathname === '/about'} icon={<FaInfoCircle />}>
          About
        </NavButton>
      </div>

      {/* Language dropdown and Login/Sign Out button */}
      <div className="flex gap-1 sm:gap-10 items-center px-2">
        <DropdownMenu
          title="Language"
          options={['English', 'French', 'German', 'Italian', 'Portuguese']}
          linkPrefix="/"
        />
  {isAuthenticated ? (
                <div className="cursor-pointer text-white bg-white/10 px-4 py-2 rounded-full" onClick={logout}>
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
                          <Label>Email</Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder='email'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                          <Label>Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={(e)=> setFormData({...formData, password:e.target.value})}
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
                  <Dialog open={isSignup} onOpenChange={(open) => setIsSignUp(open)}>
                    <DialogTrigger></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className='text-center text-3xl'>Sign Up</DialogTitle>
                        <DialogDescription className='flex flex-col gap-4'>
                          <Label>Name</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder='name'
                            value={formData.name}
                            onChange={(e) => {setFormData({...formData, name: e.target.value})}}
                          />
                          <Label>Email</Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={(e)=>{setFormData({...formData, email:e.target.value})}}
                          />
                          <Label>Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={(e) => {setFormData({...formData, password:e.target.value})}}
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
  );
};

export default Sidebar;
