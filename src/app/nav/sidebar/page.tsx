'use client';

import DropdownMenu from '@/app/(components)/dropdown/page';
import NavButton from '@/app/(components)/navbutton/page';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { FaCaretDown, FaHome, FaNewspaper, FaExchangeAlt, FaGlobe, FaStore, FaInfoCircle, FaSignInAlt } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isInternationalTeamsOpen, setIsInternationalTeamsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

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

  const pathname = usePathname();

  return (
    <div
      ref={sidebarRef}
      className={`z-10 fixed top-0 left-0 h-full w-64 bg-gradient-to-r from-[#FF6700]/80 to-[#B64900]/80 backdrop-blur-md text-black transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col items-start py-6 px-4 gap-3">
        {/* Home */}
        <NavButton href="/" active={pathname === '/'} icon={<FaHome />}>
          Home
        </NavButton>

        {/* Latest News */}
        <NavButton href="/news" active={pathname === '/news'} icon={<FaNewspaper />}>
          Latest News
        </NavButton>

        {/* Transfer Market */}
        <NavButton href="/transfermarket" active={pathname === '/transfermarket'} icon={<FaExchangeAlt />}>
          Transfer Market
        </NavButton>

        {/* Series A */}
        <NavButton href="/seriesA" active={pathname === '/seriesA'} icon={<FaGlobe />}>
          Series A
        </NavButton>

        {/* International Teams Dropdown */}
        <DropdownMenu
          title="International Teams"
          options={['Premier League', 'La Liga', 'Bundesliga', 'Ligue 1', 'Other International Competitions']}
          linkPrefix="/internationsteams"
          // icon={<FaCaretDown />}
        />

        {/* Fantasy Football */}
        <NavButton href="/fantasy-football" active={pathname === '/fantasy-football'} icon={<FaGlobe />}>
          Fantasy Football
        </NavButton>

        {/* Shop Dropdown */}
        <DropdownMenu
          title="Shop"
          options={['2024/2025 Jerseys', 'Serie A International']}
          linkPrefix="/shop"
          icon={<FaStore />}
        />

        {/* About */}
        <NavButton href="/about" active={pathname === '/about'} icon={<FaInfoCircle />}>
          About
        </NavButton>
      </div>

      {/* Login section and language dropdown */}
      <div className="flex gap-1 sm:gap-10 items-center px-2">
        {/* Language Dropdown */}
        <DropdownMenu
          title="Language"
          options={['English', 'French', 'German', 'Italian', 'Portuguese']}
          linkPrefix="/"
          // icon={<FaCaretDown />}
        />

        {/* Login Button */}
        <button className="px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full capitalize flex items-center gap-1">
          <FaSignInAlt /> Login
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
