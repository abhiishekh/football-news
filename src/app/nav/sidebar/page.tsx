'use client';

import DropdownMenu from '@/app/(components)/dropdown/page';
import NavButton from '@/app/(components)/navbutton/page';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { FaCaretDown, FaHome, FaNewspaper, FaExchangeAlt, FaGlobe, FaStore, FaInfoCircle, FaSignInAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isInternationalTeamsOpen, setIsInternationalTeamsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    // Check if token exists in cookies (or local storage)
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    setIsAuthenticated(!!token);
  }, []);

  const pathname = usePathname();

  const handleSignOut = () => {
    document.cookie = 'token=; Max-Age=0; path=/'; // Clear the token cookie
    setIsAuthenticated(false); // Update state
    router.push('/signin'); // Redirect to sign-in page
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

        {/* If user is not authenticated, show sign-in button */}
        {!isAuthenticated ? (
          <button
            onClick={() => router.push('/auth/signin')} // Navigate to the custom sign-in page
            className="px-4 py-2 bg-white/80 text-black backdrop-blur-lg rounded-full capitalize flex items-center gap-1"
          >
            <FaSignInAlt /> Sign In
          </button>
        ) : (
          // If authenticated, show sign-out button
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-white/80 text-black backdrop-blur-lg rounded-full capitalize flex items-center gap-1"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
