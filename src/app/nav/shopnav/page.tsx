"use client";

import React from "react";
import { CiHeart, CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { useSearch } from "@/app/context/searchContext";

const ShopNav = () => {
  const { cart } = useAuth()
  const { setSearchQuery } = useSearch();
  return (
    <div>
      <div className="w-full h-full container flex justify-between py-2 sm:py-5 items-center mx-auto mt-16 sm:mt-0 px-2  ">
        <h1 className="hidden sm:block text-4xl tracking-widest">Shop</h1>

        <div className="flex  items-center justify-center relative">
          {/* Input Field */}
          <input
            type="text"
            placeholder="search here..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-[#747474] p-2 bg-transparent sm:pl-5 rounded-full border border-[#747474]w-[150px] sm:w-[300px] focus:outline-none bg-white"
          />
          {/* Search Button */}
          <button className="absolute right-0  bg-[#FF6700] hover:bg-[#e65c00] text-white font-bold py-3 px-5 rounded-full flex items-center justify-center">
            <CiSearch className="text-white text-lg" />
          </button> 
        </div>
        <div className="flex gap-3 justify-center mt-4 items-center ">
            <Link href={'/shop/wishlist'}>
          <h1 className="flex gap-1 items-center ">
            <CiHeart />
            <p className=" font-medium cursor-pointer capitalize tracking-wide ">
              wishlist
            </p>
          </h1>
            </Link>
          <div className="cursor-pointer text-xl flex items-center relative">
            <Link href="/shop/cart" className="flex items-center pr-2">
              <IoCartOutline />
              {cart && <p className="ml-2 absolute bg-red-500 rounded-full px-2 bottom-2 text-sm">{cart}</p>}
            </Link>
          </div>
        </div>
      </div>
      {/* <Nav/> */}
    </div>
  );
};

export default ShopNav;
