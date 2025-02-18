import React from 'react';
import logo from '@/app/assets/images/internationalterms/premierleauge/premierleaugelogo.png';
import Image from 'next/image';
import Imagecard2 from '@/app/(components)/imagecard2/page';
import { page1 } from '@/app/data/premierleauge';
import news1 from '@/app/assets/images/internationalterms/premierleauge/news1.jpeg';
import data from '@/app/data/newsdata2';
import Page2 from './page2/page';
import Page3 from './page3/page';
import Page4 from './page4/page';
import ImageCard from '@/app/(components)/imagecard/page';
const PremierLeauge = () => {
  return (
    <>
    <div className='font-alike w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]  pb-10 pt-5 text-black mt-10 sm:mt-0'>
      <div className='container mx-auto'>

      <h1 className='capitalize px-2  text-4xl my-5'>International terms</h1>
      </div>
      <div className="w-full h-auto bg-[#37003C] text-white">
        <div className="container px-2 mx-auto   py-2 sm:py-5 text-3xl flex gap-4 items-center">
          <Image src={logo} alt="logo" width={40} height={12} />
          <h1>Premier Leauge</h1>
        </div>
      </div>
      <div className="container mx-auto px-2  w-full h-auto flex justify-center gap-2 sm:gap-20 my-5">
        <div className="w-full h-96">
          <Imagecard2
            title="Premier League Update"
            description="Arsenal and Tottenham are in a tight race for the top, with both teams showing impressive form. Manchester United faces challenges, with consistency in their performances."
            image={news1}
          />
        </div>
        <div className="w-40 sm:w-64 h-36 sm:h-48">
          {Array.isArray(page1) &&
            page1.map((item, index) => (
              <Imagecard2
                key={`page1-${index}`}
                description={item.description}
                image={item.image}
              />
            ))}
        </div>
      </div>

      <Page2 />
      <Page3 />
      <Page4 />

      <div className="w-full sm:flex gap-5">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <ImageCard
              key={`data-${index}`}
              image={item.image}
              description={item.description}
            />
          ))}
      </div>
      </div>
    </>
  );
};

export default PremierLeauge;
