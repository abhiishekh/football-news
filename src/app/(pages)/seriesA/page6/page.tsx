import React from 'react'
import data from '@/app/data/articledata'
import newsdata from '@/app/data/page7Data'
import ArticleCard from '@/app/(components)/articleCard/page'
import NewsCard from '@/app/(components)/newsCard/page'
const Page6 = () => {
  return (
    <div className='font-alike w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF] py-10 px-2 sm:px-24 text-black'>
        <div className='w-full flex items-center justify-between'>
            <h1 className='text-4xl'>Articles</h1>
            <p className='uppercase'>see all</p>
        </div>

        <div className='w-full flex gap-10 my-5 sm:justify-center overflow-x-scroll sm:overflow-hidden'>
            {data.map((item,index)=>(
                <ArticleCard
                key={index}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                />
            ))}
        </div>

        <h1 className='text-4xl my-5'>News</h1>
        <div className='w-full sm:flex gap-10'>
            {
                newsdata.map((item,index)=>(
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

export default Page6