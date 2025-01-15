import React from 'react'
import image1 from '@/app/assets/images/seriesA/page4/image1.jpeg'
import image2 from '@/app/assets/images/seriesA/page4/image2.jpeg'
import image3 from '@/app/assets/images/seriesA/page4/image3.png'
import video from '@/app/assets/images/seriesA/page4/video1.jpeg'

const Page4 = () => {
  return (
    <div className='font-alike w-full bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] py-10 px-2 sm:px-24 text-black'>

        <div className='w-full flex flex-col items-center gap-10'>
          <div className='w-full sm:flex  gap-5'>
            <div className='flex flex-col my-4 sm:my-0'>
              <div className='w-70 h-44 rounded-lg overflow-hidden'>
                <img src={image1.src} alt="image" className='h-full w-full object-cover' />
              </div>
              <div className='w-70 p-5 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg'>
                <p>Inter Milan Streak Continues: Victory
                  Over Rivals !</p>
              </div>
            </div>
            <div className='flex flex-col my-4 sm:my-0'>

              <div className='w-70 h-44 rounded-lg overflow-hidden bg-red-600'>
                <img src={image2.src} alt="image" className='h-full w-full object-covers object-center' />
              </div>
              <div className='w-70 p-5 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg'>
                <p>As Roma’s Youth Brigade Impresses
                  Fans!</p>
              </div>
            </div>
            <div className='flex flex-col my-4 sm:my-0'>

              <div className='w-70 h-44 rounded-lg overflow-hidden bg-red-600'>
                <img src={image3.src} alt="image" className='h-full w-full object-covers object-center' />
              </div>
              <div className='w-70 p-5 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg'>
                <p>As Roma’s Youth Brigade Impresses
                  Fans!</p>
              </div>
            </div>
          </div>
          <div className='w-full gap-4 flex flex-col sm:h-[500px]'>
            <div className='w-full rounded-lg overflow-hidden'>
              <img src={video.src} alt="image" className='h-full w-full object-cover object-top' />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Page4