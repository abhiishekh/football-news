"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaCaretDown } from "react-icons/fa";

const SubNav = () => {
  const pathname = usePathname()

  return (
    <div className='font-alike bg-gradient-to-r from-[#FF6700] to-[#B64900] w-full h-auto py-2 px-4 sm:px-24 flex flex-wrap justify-between items-center text-black'>
      {/* Home */}
      <Link href='/'>
        <li
          className={`list-none text-sm capitalize cursor-pointer ${pathname === '/' ? 'text-white' : ''}`}
        >
          Home
        </li>
      </Link>
      {/* Latest News */}
      <Link href='/news'>
        <li
          className={`list-none text-sm capitalize cursor-pointer ${pathname === '/news' ? 'text-white' : ''}`}
        >
          Latest News
        </li>
      </Link>
      {/* Transfer Market */}
      <Link href='/transfermarket'>
        <li
          className={`list-none text-sm capitalize cursor-pointer ${pathname === '/transfermarket' ? 'text-white' : ''}`}
        >
          Transfer Market
        </li>
      </Link>
      {/* Series A */}
      <Link href='/seriesA'>
        <li
          className={`list-none text-sm capitalize cursor-pointer ${pathname === '/seriesA' ? 'text-white' : ''}`}
        >
          Series A
        </li>
      </Link>
      {/* International Teams */}
      <div className='relative group'>
        <Link href='/internationsteams'>
          <li
            className={`list-none text-sm capitalize flex items-center gap-1 cursor-pointer ${pathname === '/internationsteams' ? 'text-white' : ''}`}
          >
            International Teams
            <FaCaretDown className='text-xs' />
          </li>
        </Link>
        <div className='absolute z-10 left-20 hidden mt-[2px] w-36 h-52 overflow-hidden bg-[#FFFFFFE0] border border-gray-300 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg group-hover:block py-2'>
          <ul>
            <li className='px-4 pb-1 text-xs hover:bg-gray-200 text-black capitalize'>Premier League</li>
            <li className='px-4 pb-1 text-xs hover:bg-gray-200 text-black capitalize'>La Liga</li>
            <li className='px-4 pb-1 text-xs hover:bg-gray-200 text-black capitalize'>Bundesliga</li>
            <li className='px-4 pb-1 text-xs hover:bg-gray-200 text-black capitalize'>Ligue 1</li>
            <li className='px-4 pb-1 text-xs hover:bg-gray-200 text-black capitalize'>Other International Competitions</li>
          </ul>
        </div>
      </div>
      {/* Fantasy Football */}
      <Link href='/fantasy-football'>
        <li
          className={`list-none text-sm capitalize cursor-pointer ${pathname === '/fantasy-football' ? 'text-white' : ''}`}
        >
          Fantasy Football
        </li>
      </Link>
      {/* Shop */}
      <div className='relative group'>
        <li
          className={`list-none text-sm capitalize flex items-center gap-1 cursor-pointer ${pathname === '/shop' ? 'text-white' : ''}`}
        >
          Shop
          <FaCaretDown className='text-xs' />
        </li>
        <div className='absolute z-10 left-5 hidden mt-[2px] w-36 h-52 overflow-hidden bg-[#FFFFFFE0] border border-gray-300 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg group-hover:block py-2'>
          <ul>
            <li className='px-4 pb-1 text-xs hover:bg-gray-200 text-black capitalize'>2024/2025 Jerseys</li>
            <li className='px-4 pb-1 text-xs hover:bg-gray-200 text-black capitalize'>Serie A International</li>
          </ul>
        </div>
      </div>
      {/* About */}
      <Link href='/about'>
        <li
          className={`list-none text-sm capitalize cursor-pointer ${pathname === '/about' ? 'text-white' : ''}`}
        >
          About
        </li>
      </Link>
    </div>
  );
};

export default SubNav;
