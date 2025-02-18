import React from 'react'
import image1 from '@/app/assets/images/seriesA/page2/image1.jpeg'
import image2 from '@/app/assets/images/seriesA/page2/image2.jpeg'
import image3 from '@/app/assets/images/seriesA/page2/image3.jpeg'
const Page2 = () => {
  return (
    <div className='w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]'>

   
    <div className='container mx-auto font-alike w-full  py-10 px-2 sm:px-24 text-black'>
    <h1 className='text-3xl tracking-wider'>Series A</h1>
    <div className='w-full flex justify-between gap-2'>
      {/* //left  */}

      <div className='w-[60%] gap-2 sm:gap-4 flex flex-col'>
        <div className='w-full rounded-lg overflow-hidden'>
          <img src={image1.src} alt="image" className='h-full w-full object-cover object-top' />
        </div>
        <div className='w-full h-auto bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg p-2 sm:p-5 flex flex-col gap-5'>
          <h1 className='text-2xl'>Title Race Heating up.</h1>
          <p className='text-sm'>The competition between Inter Milan and AC Milan intensifies as
            both teams secure crucial wins, settings the stage for a thrilling title
            race this season...</p>
          <p className='text-xs'>Goalmania Editorial Stuff</p>
        </div>
      </div>
      {/* //right  */}
      <div className='w-[40%] sm:w-[30%] flex flex-col gap-5'>
        <div className=' flex flex-col'>
          <div className='w-70 h-28 sm:h-44 rounded-lg overflow-hidden'>
            <img src={image2.src} alt="image" className='h-full w-full object-cover' />
          </div>
          <div className='w-70 p-2 sm:p-5 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg'>
            <p>Napoli’s Star forward Hits From Just
              in Times.</p>
          </div>
        </div>
        <div className='flex flex-col'>

          <div className='w-70 h-28 sm:h-44 rounded-lg overflow-hidden bg-red-600'>
            <img src={image3.src} alt="image" className='h-full w-full object-covers object-center' />
          </div>
          <div className='w-70 p-2 sm:p-5 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg'>
            <p>Napoli’s Star forward Hits From Just
              in Times.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Page2