"use client"
import NavButton from '@/app/(components)/navbutton/page'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaHome } from 'react-icons/fa'

const Nav = () => {
  const pathname = usePathname()
  return (
    <div className= ' font-alike  w-full bg-orange-600 mx-auto px-2'>
        <div className=' container lg:w-[1150px] mx-auto py-2 flex justify-center'>
            <div className='w-full text-sm lg:w-[800px] flex justify-between'>
                <NavButton href='/shop' active={pathname === '/shop'} icon={<FaHome />}>Home</NavButton>
                <NavButton href='/shop/2024/2025jerseys' active={pathname === '/shop'}>2024/2025jersey</NavButton>
                <NavButton href='/SeriesA/international' active={pathname === '/shop'}>SeriesA/international</NavButton>
            </div>
        </div>
    </div>
  )
}

export default Nav