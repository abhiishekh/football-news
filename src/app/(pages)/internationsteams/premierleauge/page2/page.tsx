import React from 'react'
import { page2L , page2M } from '@/app/data/premierleauge'
import Imagecard2 from '@/app/(components)/imagecard2/page'
import MatchweekCard from '@/app/(components)/matchweek/page'
const Page2 = () => {
  return (
    <div className='font-alike w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] px-2 sm:px-24  py-10 text-black sm:flex gap-2'>

        {/* //left  */}
        <div className='w-full sm:w-[24%] sm:h-48 '>
            {page2L.map((item,index)=>(
                <Imagecard2
                key={index}
                image={item.image}
                description={item.description}
                />
            ))}
        </div>
        {/* // middle  */}
        <div className='w-full sm:w-[50%] sm:h-72'>
            {
                page2M.map((item,index)=>(
                    <Imagecard2
                    key={index}
                    image={item.image}
                    description={item.description}
                    title={item.title}
                    />
                ))
            }
        </div>
        {/* //right  */}
        <div className='w-full sm:w-[24%] h-full sm:h-full flex flex-col items-center '>
            <div className='w-full sm:h-screen flex items-center '>

            <MatchweekCard/>
            </div>
        </div>
    </div>
  )
}

export default Page2