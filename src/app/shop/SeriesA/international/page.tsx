import ShopSidebar from '@/app/(components)/shopsidebar/page'
import ProductPage from '@/app/(pages)/productpage/page';
import React from 'react'

const Page = () => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] '>


<div className='bg-gradient-to-br from-[#71CCFF] to-[#1E50A0]'>
        <div className='w-full container mx-auto'>
          <h1 className='text-4xl text-white py-3 px-2 capitalize'>Series A and International</h1>
        </div>
      </div>

    <div className='w-full  flex '>
        <div className=' h-full hidden sm:block '>
      <ShopSidebar/>
        </div>
      <div className=' w-full flex justify-center'>
        <ProductPage/>
      </div>
      </div>
    </div>
  )
}

export default Page;
