import React from 'react'
import productimage from '@/app/assets/images/shop/jersey/jersey1.jpeg'
import { FaHeart } from 'react-icons/fa'
import { FaCodeCompare, FaScaleBalanced } from 'react-icons/fa6'
import ProductSpecs from '@/app/(components)/productspecs/page'

const ProductDetails = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gradient-to-br from-white to-blue-500 text-black'>

    <div className="w-full md:w-5/6 2xl:w-3/5 mx-auto h-full flex flex-wrap gap-8 justify-center pt-10 px-3">
    <div className="lg:flex w-full h-full gap-2 md:gap-12 ">
      {/* img */}
      <div className='w-full mt-12 lg:mt-0 lg:w-[45%] h-[450px] flex flex-col gap-3'>
      <div className='w-full h-[80%] bg-white rounded-md overflow-hidden'>
          <img src={productimage.src} alt="product" className='w-full h-full object-contain object-center' />
      </div>
      <div className='flex w-full justify-center gap-6'>
        <div className='w-20 h-20 bg-white rounded-md overflow-hidden'>
      <img src={productimage.src} alt="product" className='w-full h-full object-contain object-center' />
        </div>
        <div className='w-20 h-20 bg-white rounded-md overflow-hidden'>
      <img src={productimage.src} alt="product" className='w-full h-full object-contain object-center' />
        </div>
        <div className='w-20 h-20 bg-white rounded-md overflow-hidden'>
      <img src={productimage.src} alt="product" className='w-full h-full object-contain object-center' />
        </div>
      </div>
      </div>
      {/* details */}
      <div className='h-full w-full lg:w-[45%] py-5'>
        <h1 className='w-drv p-2 text-3xl rounded-lg bg-gradient-to-r from-white to-blue-500 my-8'>Arsenal football jersey 2024-25</h1>
        <p className='text-xl font-bold'>$119</p>
        <p className='uppercase text-gray-400'>delivery in europe</p>
        {/* //size  */}
        <div className='my-1'>
          <h1 className='capitalize my-2 text-lg'>size:</h1>
          <div className='flex gap-2'>

          <li className='text-center rounded-sm px-2 list-none border-[1px] border-black'>s</li>
          <li className='text-center rounded-sm px-2 list-none border-[1px] border-black'>m</li>
          <li className='text-center rounded-sm px-2 list-none border-[1px] border-black'>l</li>
          <li className='text-center rounded-sm px-2 list-none border-[1px] border-black'>xl</li>
          <li className='text-center rounded-sm px-2 list-none border-[1px] border-black'>2xl</li>
          <li className='text-center rounded-sm px-2 list-none border-[1px] border-black'>3xl</li>
          </div>
        </div>

        {/* //buttons  */}
        <div className='w-full flex gap-6 my-5'>
          <div className='border-[1px] border-orange-600 flex rounded-full items-center px-4'>
            <p className='px-2 py-1'>-</p>
            <hr className='h-full w-[1px] bg-orange-500'/>
            <p className='px-4 py-1'>1</p>
            <hr className='h-full w-[1px] bg-orange-500'/>


            <p className='px-2 py-1 text-center'>+</p>
          </div>
          <button className='px-4 py-2 rounded-full capitalize bg-orange-500 text-white font-bold'>add to cart</button>
        </div>

        {/* //compate, wishlist , size chart  */}

        <div className='flex justify-between'>
          <div className='text-xs flex gap-1'><FaCodeCompare/>Compare</div>
          <div className='flex gap-1 text-xs items-center'><FaHeart/><p>wishlist</p></div>
          <div className='text-lg capitalize'><p className='flex gap-1 items-center'> <FaScaleBalanced/>size chart</p></div>
        </div>


        {/* //other details  */}
        <div className='flex justify-between my-3'>
          <div>
            <div className='flex gap-1 text-sm'><p className='uppercase'>uks:</p><p>s</p></div>
            <div className='flex gap-1 text-sm items-center'><p className='capitalize'>category:</p><p className='text-xs'>football</p></div>
            <div className='flex gap-1 text-sm items-center'><p className='capitalize'>Tags:</p><p className='text-xs'>Arsenal football jersey 2024-25</p></div>
          </div>
          <div>
            size chart here
          </div>
        </div>
      </div>
    </div>
  </div>

    <div className='text-xs w-full h-96 lg:h-64 2xl:w-[1150px] px-2 lg:px-0 lg:flex justify-between mt-12 mx-auto'>
        <ProductSpecs/>
    </div>

    </div>
  </>
  )
}

export default ProductDetails