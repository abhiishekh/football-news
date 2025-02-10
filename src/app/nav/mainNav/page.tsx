"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/app/assets/images/image.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Sidebar from '../sidebar/page';
import DropdownMenu from '@/app/(components)/dropdown/page';
import { CiSearch } from 'react-icons/ci';
import { UserButton, useUser, useClerk, SignInButton } from '@clerk/nextjs'; // Corrected import
import { useRouter } from 'next/navigation'; 

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();  
  const router = useRouter(); 

  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div className="w-full bg-gradient-to-r from-[#1D4E89] to-[#071423] text-white flex font-alike py-2 lg:py-0 fixed top-0 z-50">
      <div className='w-full xl:w-[1150px] mx-auto px-2 xl:px-0'>

      <div className="w-full flex flex-wrap justify-between items-center">
        <div className="w-full lg:w-auto flex gap-2 sm:gap-10 items-center justify-between ">
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
            {isSignedIn ? (
              <UserButton/>
            ) : (
              <div
               
                className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full capitalize"
              >
                <SignInButton/>
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
