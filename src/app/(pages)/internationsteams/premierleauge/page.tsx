import React from 'react'
import logo from '@/app/assets/images/internationalterms/premierleauge/premierleaugelogo.png'
import Image from 'next/image'
import Imagecard2 from '@/app/(components)/imagecard2/page'
import { page1} from '@/app/data/premierleauge'
import news1 from '@/app/assets/images/internationalterms/premierleauge/news1.jpeg'
import Page2 from './page2/page'
const PremierLeauge = () => {
  return (
    <>
      <div className='w-full h-auto bg-[#37003C] text-white'>
        <div className='px-2 sm:px-24  py-2 sm:py-5 text-3xl flex gap-4 items-center'>
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={12}
          />
          <h1 className=''>Premier Leauge</h1>
        </div>
      </div>
      <div className='px-2 sm:px-24 w-full h-auto flex justify-center gap-2 sm:gap-20 my-5'>
        {/* //left  */}

        <div className='w-[55%] h-96'>
          <Imagecard2
            title='Premier League Update'
            description='Arsenal and Tottenham are in a tight race for the top, with both teams showing impressive form. Manchester United faces challenges, with consistency in their performances. '
            image={news1}
          />

        </div>
        {/* // right  */}
        <div className='w-40 sm:w-64 h-36 sm:h-48'>
          {page1.map((item, index) => (
            <Imagecard2
              key={index}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <Page2/>

    </>
  )
}

export default PremierLeauge