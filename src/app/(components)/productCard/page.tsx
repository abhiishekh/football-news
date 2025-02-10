import React from 'react'

interface DATA {
  image: string | any;
  title: string;
  price: number;
  category: string;
}

const ProductCard = ({ image, title, price, category }: DATA) => {
  return (
    <div>
      <div className='w-full h-auto rounded-lg overflow-hidden bg-white'>
        <div className='h-64 w-full'>
          <img
            src={image.src}
            alt="product image"
            className='w-full h-full object-contain object-center'
          />
        </div>

        <div className='bg-gradient-to-r from-white to-blue-500 p-2 mt-0'>
          <h1 className='text-xs font-bold capitalize'>{title}</h1>
          <p className='text-xs text-gray-600 capitalize'>{category}</p>
          <p className='text-sm font-bold'>${price}</p>
        </div>
      </div>
      <button className='w-full bg-orange-600 text-white px-4 py-2 mt-2 rounded-full'>Add to cart</button>
    </div>
  )
}

export default ProductCard
