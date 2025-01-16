"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/app/assets/images/image.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Sidebar from '../sidebar/page';
import DropdownMenu from '@/app/(components)/dropdown/page';
import { CiSearch } from 'react-icons/ci';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="w-full bg-gradient-to-r from-[#1D4E89] to-[#071423] px-2 sm:px-20 text-white flex font-alike py-2 sticky top-0 z-50">
      <div className="w-full flex flex-wrap justify-between items-center">
        <div className="flex gap-2 sm:gap-10 items-center">
          <div className="h-full w-16 sm:w-24">
            <Link href="/">
              <Image src={logo} alt="Logo" layout="responsive" width={100} height={100} />
            </Link>
          </div>
          <h1 className="text-3xl sm:text-5xl font-calistoga tracking-[.6rem] sm:tracking-[.7rem]">GoalMania</h1>
          
          {/* Mobile sidebar toggle button */}
          <button onClick={toggleSidebar} className="sm:hidden p-2">
            {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
          </button>
        </div>

        {/* Sidebar */}
        {isOpen && <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />}

        <div className="hidden sm:flex px-2 justify-end">
          <div className="flex gap-1 sm:gap-10 items-center">
            <div className="text-xl">
              <CiSearch />
            </div>
            <DropdownMenu title="Language" options={['English', 'French', 'German', 'Italian', 'Portuguese']} linkPrefix="/" />
            {/* Login button, can be enhanced with onClick handler */}
            <button className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full capitalize">login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
