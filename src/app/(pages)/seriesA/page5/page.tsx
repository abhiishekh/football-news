import React from 'react'
import data from '@/app/data/rectangeData2'
import ReactangelCard from '@/app/(components)/rectanglecard/page'
import RectangleCard2 from '@/app/(components)/rectangle2/page'
const Page5 = () => {
  return (
    <div className='w-full h-full bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]'>
      <div className='container mx-auto font-alike w-full min-h-screen  py-10 px-2  text-black '>
        <h1 className='text-5xl tracking-wider mb-10'>Series A</h1>
            <div className='w-full sm:w-[80%] h-24 sm:grid grid-cols-2 gap-x-10 gap-10 mx-auto'>
                {
                  data.map((item,index)=>(
                    <RectangleCard2
                    key={index}
                    image={item.image}
                    description={item.description}
                    time={item.time}
                    message={item.message}
                    />
                  ))
                }
            </div>
    </div> 
    </div> 
  )
}

export default Page5