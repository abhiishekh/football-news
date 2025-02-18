import Imagecard2 from '@/app/(components)/imagecard2/page'
import Matchweek2 from '@/app/(components)/matchweek2/page'
import { page2L, page2M } from '@/app/data/premierleauge'
import logo from '@/app/assets/images/internationalterms/premierleauge/premierleaugelogo.png'

import React from 'react'

const Page3 = () => {
    return (
        <div className='font-alike w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] '>

            <div className='container mx-auto px-2   py-10 text-black sm:flex gap-2'>

            {/* //left  */}
            <div className='w-full sm:w-[24%] h-full sm:h-full flex flex-col items-center '>
            <div className='w-full sm:h-screen flex items-center '>
                <Matchweek2
                color='purple'
                heading='Premeir League'
                logo={logo}
                />
            </div>
            </div>
            {/* //middle  */}
            <div className='w-full sm:w-[50%] sm:h-72'>
                {
                    page2M.map((item, index) => (
                        <Imagecard2
                            key={index}
                            image={item.image}
                            description={item.description}
                            title={item.title}
                        />
                    ))
                }
            </div>
            {/* // right  */}
            <div className='w-full sm:w-[24%] sm:h-48 '>
                {page2L.map((item, index) => (
                    <Imagecard2
                        key={index}
                        image={item.image}
                        description={item.description}
                    />
                ))}
            </div>
            </div>
        </div>
    )
}

export default Page3