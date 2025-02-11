import Nav from '@/app/nav/shopnav/nav'
import ShopNav from '@/app/nav/shopnav/page'
import React from 'react'

const NavS = () => {
  return (
    <div>
        <div className='w-full px-24 mx-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] text-black'>
          <ShopNav />
        </div>
        <Nav />
    </div>
  )
}

export default NavS