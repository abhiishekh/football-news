"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import NavButton from '@/app/(components)/navbutton/page';
import DropdownMenu from '@/app/(components)/dropdown/page';
import { FaExchangeAlt, FaGlobe, FaHome, FaInfoCircle, FaNewspaper, FaStore } from 'react-icons/fa';
import Link from 'next/link';


const SubNav = () => {
  const pathname = usePathname();

  return (
    <div className="font-alike bg-gradient-to-r from-[#FF6700] to-[#B64900] w-full h-auto py-2 px-4  hidden lg:flex flex-wrap justify-between items-center text-black mt-[70px]">
      <div className='w-full container mx-auto px-2 xl:px-0 flex justify-between items-center'>

      <NavButton href="/" active={pathname === '/'} icon={<FaHome />}>Home</NavButton>
      <NavButton href="/news" active={pathname === '/news'}icon={<FaNewspaper />}>Latest News</NavButton>
      <NavButton href="/transfermarket" active={pathname === '/transfermarket'} icon={<FaExchangeAlt />}>Transfer Market</NavButton>
      <NavButton href="/seriesA" active={pathname === '/seriesA'} icon={<FaGlobe />}>Series A</NavButton>
      <DropdownMenu title="International Teams" options={['Premier League', 'La Liga', 'Bundesliga', 'Ligue 1', 'Other International Competitions']} linkPrefix="/internationsteams" />
      <NavButton href="/fantasy-football" active={pathname === '/fantasy-football'} icon={<FaGlobe />}>Fantasy Football</NavButton>
      <Link href={'/shop'}>
      <DropdownMenu title="Shop" options={['2024/2025 Jerseys', 'Serie A International']} linkPrefix="/shop" icon={<FaStore />} />
      </Link>
      <NavButton href="/about" active={pathname === '/about'} icon={<FaInfoCircle />}>About</NavButton>

      </div>
    </div>
  );
};

export default SubNav;
