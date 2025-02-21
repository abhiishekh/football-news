import React from 'react'

const Shop = () => {
  return (
    <div className='font-alike w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] text-black mx-auto'>
      <div className=' h-auto  mx-auto'>
        <div className="w-full h-[calc(100vh-7rem)] px-2 sm:px-24 bg-[url('@/app/assets/images/shop/shophome.jpeg')] bg-cover bg-center">
          <div className='absolute w-1/2 bottom-4 left-16'>
            <h1 className='text-4xl text-white'>
          Tradition and Modern meet for a timeless Football Look.
            </h1>
            <div className=' w-full flex justify-end'>
            <button className='px-4 py-2 rounded-full bg-orange-600 text-white'>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop