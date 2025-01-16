"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import NavButton from '@/app/(components)/navbutton/page';
import DropdownMenu from '@/app/(components)/dropdown/page';
import { FaExchangeAlt, FaGlobe, FaHome, FaInfoCircle, FaNewspaper, FaStore } from 'react-icons/fa';


const SubNav = () => {
  const pathname = usePathname();

  return (
    <div className="font-alike bg-gradient-to-r from-[#FF6700] to-[#B64900] w-full h-auto py-2 px-4 sm:px-24 hidden sm:flex flex-wrap justify-between items-center text-black">
      <NavButton href="/" active={pathname === '/'} icon={<FaHome />}>Home</NavButton>
      <NavButton href="/news" active={pathname === '/news'}icon={<FaNewspaper />}>Latest News</NavButton>
      <NavButton href="/transfermarket" active={pathname === '/transfermarket'} icon={<FaExchangeAlt />}>Transfer Market</NavButton>
      <NavButton href="/seriesA" active={pathname === '/seriesA'} icon={<FaGlobe />}>Series A</NavButton>
      <DropdownMenu title="International Teams" options={['Premier League', 'La Liga', 'Bundesliga', 'Ligue 1', 'Other International Competitions']} linkPrefix="/internationsteams" />
      <NavButton href="/fantasy-football" active={pathname === '/fantasy-football'} icon={<FaGlobe />}>Fantasy Football</NavButton>
      <DropdownMenu title="Shop" options={['2024/2025 Jerseys', 'Serie A International']} linkPrefix="/shop" icon={<FaStore />} />
      <NavButton href="/about" active={pathname === '/about'} icon={<FaInfoCircle />}>About</NavButton>
    </div>
  );
};

export default SubNav;
