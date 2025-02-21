import ShopSidebar from '@/app/(components)/shopsidebar/page'
import React from 'react'
import ProductPage from '@/app/(pages)/productpage/page'

const Jersey = () => {
  return (
    <div className='w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] text-black'>
      <div className='bg-gradient-to-br from-[#71CCFF] to-[#1E50A0]'>
        <div className='w-full container mx-auto'>
          <h1 className='text-4xl text-white py-3 px-2 capitalize'>2024/2025 jerseys</h1>
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

export default Jersey