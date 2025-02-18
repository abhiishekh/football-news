import Imagecard2 from '@/app/(components)/imagecard2/page'
import Matchweek3 from '@/app/(components)/matchweek3/page'
import { page2L, page2M } from '@/app/data/premierleauge'

import React from 'react'

const Page4 = () => {
    return (
    <div className='w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]'>
            <div className='container mx-auto font-alike w-full px-2      py-10 text-black gap-2'>
            <div className='w-full flex justify-between items-center my-5'>
                <h1 className='text-4xl '>Latest news</h1>
                <p className='uppercase text-xs'>see all</p>
            </div>
            <div className='w-full sm:flex justify-between'>

            <div className='w-full sm:w-[75%]  flex flex-wrap gap-6 '>
                <div className='w-full gap-3 flex flex-wrap justify-center'>
                    {page2L.map((item, index) => (
                        <div key={`page2L-copy1-${index}`} className='w-full sm:w-52 xl:w-60 sm:h-44'>
                            <Imagecard2
                                // key={index}
                                image={item.image}
                                description={item.description}
                            />
                        </div>
                        
                    ))}
                    {page2L.map((item, index) => (
                        <div key={`page2L-copy1-${index}`} className='w-full sm:w-52 xl:w-60  sm:h-44'>
                            <Imagecard2
                                // key={index}
                                image={item.image}
                                description={item.description}
                            />
                        </div>
                        
                    ))}
                    {page2L.map((item, index) => (
                        <div key={`page2L-copy1-${index}`} className='w-full sm:w-52 xl:w-60  sm:h-44'>
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
                <Matchweek3
                color='purple' />
            </div>
            </div>
            </div>
        </div>

    </div>
    )
}

export default Page4