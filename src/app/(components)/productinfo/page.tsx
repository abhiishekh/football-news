import React from 'react'

const ProductInfo = () => {
  return (
    <div className='w-full my-5'>
      <div className='flex gap-32 xl:gap-64'>
        <h1 className='capitalize'>weight</h1>
        <p>250g</p>
      </div>
      <hr className='h-2 w-60 px-2 xl:px-0 xl:w-96 my-2'/>
      <div className='flex gap-32 xl:gap-64'>
        <h1 className='capitalize'>size</h1>
        <p>s.m.l.xl.2xl.3xl</p>
      </div>
    </div>
  )
}

export default ProductInfo