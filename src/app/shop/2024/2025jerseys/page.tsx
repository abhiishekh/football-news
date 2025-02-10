import ShopSidebar from '@/app/(components)/shopsidebar/page'
import React from 'react'
import ProductPage from '@/app/(pages)/productpage/page'

const Jersey = () => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] text-black'>
      <div className='bg-gradient-to-br from-[#71CCFF] to-[#4083c7]'>
        <div className='w-full lg:w-[1150px] mx-auto'>
          <h1 className='text-4xl text-white py-3'>2024/2025jerseys</h1>
        </div>
      </div>


      <div className='w-full  flex '>
        <div className='w-[25%] h-full hidden sm:block'>

      <ShopSidebar/>
        </div>
      <div className='m-5 w-[calc(100vh - 25%)] w-full flex justify-center'>
        <ProductPage/>
      </div>
      </div>
    </div>
  )
}

export default Jersey