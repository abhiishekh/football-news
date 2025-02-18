"use client"
import MatchCard from '@/app/(components)/matchcard/page'
import data from '@/app/data/matchCard';
import React from 'react'

const Page1 = () => {
  return (
    <div className='font-alike w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] py-10 text-black'>
      <div className='container mx-auto'>

    <h1 className='text-3xl tracking-wider px-2 sm:px-24'>Series A</h1>
      </div>
    <div className="w-full h-[422px] sm:h-[450px] px-24 bg-[url('@/app/assets/images/seriesA/seriesA.jpeg')] bg-cover bg-bottom relative">
      <h1 className='text-3xl sm:text-5xl text-white tracking-wide absolute left-2 sm:left-20 bottom-2 sm:bottom-16'>
        Historic Rivalries, Exploring the Legendary Matches that Define Serie A.
      </h1>
    </div>
    <div className='container mx-auto px-2 sm:px-24 my-10 flex flex-wrap justify-center gap-8'>
      {
        data.map((item, index) => (
          <MatchCard
            key={index}
            title1={item.title1}
            title2={item.title2}
            image1={item.image1}
            image2={item.image2}
            score1={item.score1}
            score2={item.score2}
            location={item.location}
            status={item.status}
            date={item.date}
            series={item.series}
          />
        ))
      }
    </div>
  </div>
  )
}

export default Page1