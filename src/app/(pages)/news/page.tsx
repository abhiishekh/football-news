"use client"

import ImageCard from '@/app/(components)/imagecard/page';
import imageText1 from '@/app/assets/images/imageText1.jpeg'
import imageText2 from '@/app/assets/images/imageText2.jpeg'
import { IoMdShare } from "react-icons/io";
import data1 from '@/app/data/newsdata1'
import data2 from '@/app/data/newsdata2'
import data3 from '@/app/data/newsdata3'


// const apiKey = process.env.NEXT_PUBLIC_NEWS_API;

export default function News() {

    return (
        <>
  {/* //section 1  */}
            <div className="font-alike w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] px-2 sm:px-24 py-10 text-black ">
                <h1 className="text-4xl font-semibold font-serif">Latest News</h1>
                <div>
                    <div className="flex w-full py-2 justify-end items-center">
                        <p className="text-blue-600 uppercase">See all</p>
                    </div>
                    <div className="flex w-full  justify-between items-start gap-2">
                        <div className="sm:w-[45%] w-[65%]">
                            <img src={imageText1.src} alt="image" className='w-full rounded-xl' />
                            <div>
                                <h3 className='text-3xl gap-5  sm:mt-5 flex items-start justify-between pr-4'>Upcoming Derbies Set to
                                    Captivate Fans <IoMdShare className='text-md text-blue-500' /> </h3>
                                <p className='mt-3 text-xs'>
                                    European football is a vibrant and competitive landscape, centered around prestigious competitions like the UEFA Champions League and the Europa League, which showcase the continent's top clubs. Major domestic leagues, including England's Premier League, Spain's La Liga, Germany's Bundesliga, Italy's Serie A, and France's Ligue 1, feature iconic teams like Real Madrid, Bayern Munich, and Manchester City, along with star players such as Lionel Messi and Kylian Mbappé. The influence of financial fair play regulations, investment in youth academies, and the integration of technology like VAR are shaping the future of the sport. With a growing global fanbase and upcoming events like the UEFA European Championship, European football continues to captivate audiences around the world.
                                </p>
                            </div>
                        </div>
                        <div className='w-[45%] h-full flex sm:gap-16 flex-wrap justify-start items-center'>
                            {
                                data1.map((items, index) => (
                                    <ImageCard
                                        key={index}
                                        image={items.image.src}
                                        description={items.description}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* // section 2  */}
            <div className="w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] px-2 sm:px-24 py-10 text-black overflow-hidden">
                <div className=''>
                    <div className="flex w-full py-2 justify-end items-center">
                        <p className="text-blue-600 uppercase">See all</p>
                    </div>
                    <div className="flex w-full  justify-between items-start gap-2">

                        <div className='w-[45%] h-full flex sm:gap-16 flex-wrap justify-start items-center'>
                            {
                                data2.map((items, index) => (
                                    <ImageCard
                                        key={index}
                                        image={items.image.src}
                                        description={items.description}
                                    />
                                ))
                            }
                        </div>
                        <div className="sm:w-[45%] w-[65%]">
                            <img src={imageText2.src} alt="image" className='w-full rounded-xl' />
                            <div>
                                <h3 className='text-3xl   sm:mt-5 flex items-start justify-between pr-4'>Young Stars Making Waves
                                    Across European Leagues<IoMdShare className='text-md text-blue-500 text-3xl'  /> </h3>
                                <p className='mt-3 text-xs'>
                                    European football is a dynamic and multifaceted realm, characterized by its rich history and intense rivalries. At its core are elite competitions such as the UEFA Champions League, where top clubs from various leagues battle for supremacy, and the Europa League, which offers additional opportunities for teams to shine on the continental stage. Major leagues like the Premier League, La Liga, Bundesliga, Serie A, and Ligue 1 not only showcase footballing talent but also draw massive audiences, reflecting the sport's global appeal. Clubs are investing heavily in youth development and scouting to secure the next generation of stars, while financial fair play regulations aim to maintain competitive balance. The introduction of technologies like VAR has transformed match officiating, adding another layer of intrigue. As European football evolves, it continues to inspire millions, with iconic matches and legendary players at the forefront of its narrative, and the anticipation builds for upcoming tournaments like the UEFA European Championship, promising thrilling moments for fans worldwide. European football is a vibrant and competitive landscape, centered around prestigious competitions like the UEFA Champions League and the Europa League, which showcase the continent's top clubs. Major domestic leagues, including England's Premier League, Spain's La Liga, Germany's Bundesliga, Italy's Serie A, and France's Ligue 1, feature iconic teams like Real Madrid, Bayern Munich, and Manchester City, along with star players such as Lionel Messi and Kylian Mbappé.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* //last news section */}
            <div className='w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] px-2 sm:px-24 py-10 text-black '>
                <h1 className='text-4xl font-medium text-center'>Latest News</h1>
                <div className='w-full h-full flex gap-4 sm:gap-16 mt-8 sm:justify-center items-center overflow-x-scroll sm:overflow-hidden'>
                            {
                                data3.map((items, index) => (
                                    <ImageCard
                                        key={index}
                                        image={items.image.src}
                                        description={items.description}
                                    />
                                ))
                            }
                        </div>
            </div>
      
        </>
    )
}