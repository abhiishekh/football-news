import React from 'react'

const ProductReview = () => {
  return (
    <div className='w-full lg:flex'>
      <div className='w-full lg:w-[25%]'>
        <h1 className='uppercase'>Reviews</h1>
        <p className='text-xs'>There are no reviews yet</p>
      </div>
      <div className='w-full lg:w-[75%]'>
        <div className='w-full'>
          <h1 className='uppercase'>be the first one two write</h1>
          <p className='text-xs'>Your email address will not be published. Required fields are marked</p>
        </div>
        <div className='w-full lg:flex mt-5'>
          <div className='flex gap-2 flex-wrap my-2'>
            <label htmlFor="textreview"> Your Review :</label>
            <textarea
              className="bg-transparent rounded-md p-2 h-20 text-start overflow-y-auto border-[1px] border-gray-600 resize-none text-xs placeholder-gray-500"
              placeholder="Enter text here"
            />

          </div>
          <div className='flex gap-2 ml-2 my-2'>
            <label htmlFor="textreview">Name</label>
            <input type="text"
            placeholder="Your Name "
              className='bg-transparent rounded-md p-2 h-10 border-[1px] border-gray-600 placeholder-gray-500 text-xs'
            />
          </div>
          <div className='flex gap-2 ml-2 my-2'>
            <label htmlFor="textreview"> Email</label>
            <input type="email"
            placeholder='YourEmail@gmail.com'
              className='bg-transparent rounded-md p-2 h-10 border-[1px] border-gray-600 placeholder-gray-500 text-xs'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductReview