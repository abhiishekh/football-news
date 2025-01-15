import Imagecard2 from '@/app/(components)/imagecard2/page'
import Matchweek3 from '@/app/(components)/matchweek3/page'
import { page2L, page2M } from '@/app/data/premierleauge'

import React from 'react'

const Page4 = () => {
    return (
        <div className='font-alike w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] px-2 sm:px-24  py-10 text-black gap-2'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-4xl '>Latest news</h1>
                <p className='uppercase text-xs'>see all</p>
            </div>
            <div className='w-full sm:flex justify-between'>

            <div className='w-full sm:w-[75%]  flex flex-wrap gap-6'>
                <div className='w-full gap-3 flex flex-wrap justify-center'>
                    {page2L.map((item, index) => (
                        <div key={`page2L-copy1-${index}`} className='w-full sm:w-52 xl:w-60 h-44'>
                            <Imagecard2
                                // key={index}
                                image={item.image}
                                description={item.description}
                            />
                        </div>
                        
                    ))}
                    {page2L.map((item, index) => (
                        <div key={`page2L-copy1-${index}`} className='w-full sm:w-52 xl:w-60  h-44'>
                            <Imagecard2
                                // key={index}
                                image={item.image}
                                description={item.description}
                            />
                        </div>
                        
                    ))}
                    {page2L.map((item, index) => (
                        <div key={`page2L-copy1-${index}`} className='w-full sm:w-52 xl:w-60  h-44'>
                            <Imagecard2
                                // key={index}
                                image={item.image}
                                description={item.description}
                            />
                        </div>
                        
                    ))}
                   
                </div>
            </div>
            <div className='w-full sm:w-[24%] h-full sm:h-full flex flex-col items-center '>
            <div className='w-full sm:h-screen flex items-center '>
                <Matchweek3 />
            </div>
            </div>
            </div>
        </div>
    )
}

export default Page4