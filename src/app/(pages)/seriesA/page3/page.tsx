import React from 'react'
import img1 from '@/app/assets/images/seriesA/page3/image1.png'
import img2 from '@/app/assets/images/seriesA/page3/image2.jpeg'
import img3 from '@/app/assets/images/seriesA/page3/image3.jpeg'
const Page3 = () => {
  return (
  <div className='w-full h-full bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]'>
      <div className='container mx-auto font-alike w-full  py-10 px-2 sm:px-24 text-black'>

<div className='w-full flex justify-between gap-2 sm:gap-0'>
  <div className='w-[40%] sm:w-[30%] flex flex-col gap-5'>
    <div className=' flex flex-col'>
      <div className='w-70 h-28 sm:h-44 rounded-lg overflow-hidden'>
        <img src={img3.src} alt="image" className='h-full w-full object-cover' />
      </div>
      <div className='w-70 p-2 sm:p-5 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg'>
        <p>Inter Milan Streak Continues: Victory
          Over Rivals !</p>
      </div>
    </div>
    <div className='flex flex-col'>

      <div className='w-70 h-28 sm:h-44 rounded-lg overflow-hidden bg-red-600'>
        <img src={img2.src} alt="image" className='h-full w-full object-covers object-center' />
      </div>
      <div className='w-70 p-2 sm:p-5 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg'>
        <p>As Roma’s Youth Brigade Impresses
          Fans!</p>
      </div>
    </div>
  </div>
  <div className='w-[60%] gap-4 flex flex-col'>

    <div className='w-full rounded-lg overflow-hidden'>
      <img src={img1.src} alt="image" className='h-full w-full object-cover object-top' />
    </div>
    <div className='w-full h-auto bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg p-2 sm:p-5 flex flex-col gap-5'>
      <h1 className='text-2xl'>Serie A: Tactical Battles Heat Up amoung
        Top Coaches!</h1>
      <p className='text-sm'>As the January window approaches, Serie A clubs are already linked
        with potential signings, including a focus on bolstering their
        attacking options.</p>
      <p className='text-xs'>Goalmania Editorial Stuff</p>
    </div>
  </div>
</div>
</div>
  </div>

  )
}

export default Page3