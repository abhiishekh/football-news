import React from 'react'
import data from '@/app/data/videonewsdata'
import NewsCard from '@/app/(components)/newsCard/page'
const Page7 = () => {
  return (
    <div className='font-alike w-full  bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] py-10 text-black'>
      <div className='container mx-auto my-5'>

        <h1 className='text-4xl tracking-wider px-2 sm:px-24 my-5'>Videos</h1>
      </div>
        <div className='w-full sm:flex gap-5'>
          {
            data.map((item,index)=>(
              <NewsCard
              key={index}
              image={item.image}
              description={item.description}
              title={item.title}
              message={item.message}
              time={item.time}
              />
            ))
          }
        </div>
    </div>
  )
}

export default Page7