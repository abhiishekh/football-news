import React from 'react'
import { CiHeart, CiSearch } from 'react-icons/ci'
import { IoCartOutline } from 'react-icons/io5'
import Nav from '../page'

const ShopNav = () => {
    return (
        <div>

        <div className='w-full xl:w-[1100px] flex justify-between py-2 sm:py-5 items-center mx-auto'>
            <h1 className='text-4xl tracking-widest'>Shop</h1>

            <div className="flex  items-center justify-center relative">
                {/* Input Field */}
                <input
                    type="text"
                    placeholder="search here..."
                    className="text-[#747474] p-2 bg-transparent pl-5 rounded-full border border-[#747474] w-[300px] focus:outline-none"
                />
                {/* Search Button */}
                <button className="absolute right-5 sm:right-0 bg-[#FF6700] hover:bg-[#e65c00] text-white font-bold py-3 px-5 rounded-full flex items-center justify-center">
                    <CiSearch className="text-white text-lg" />
                </button>
            </div>
            <div className='flex justify-between items-center gap-10'>
                <h1 className='flex gap-1 items-center'>
                    <CiHeart />
                    <p className='text-xs font-medium'>wishlist</p>
                </h1>
                <div>
                    <IoCartOutline />
                </div>
            </div>

        </div>
        {/* <Nav/> */}
        </div>
    )
}

export default ShopNav