import Image from 'next/image'
import React from 'react'
interface Data{
    title:string;
    image:string | any;
    date:string | any;
    description:string;
}
const ReactangelCard = ({title, image, date, description}:Data) => {
  return (
    <div className='font-alike w-full  rounded-lg  flex gap-4  p-3 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF]'>
        <div className='w-36 relative rounded-lg overflow-hidden'>
        <div className='w-full h-full relative'>
            <Image
              src={image}
              alt='image'
              layout='fill'   
              objectFit='cover'  
              objectPosition='center' 
            />
          </div>

        </div>
        <div>
            <div className='flex justify-between w-full'>
                <h1 className='text-lg'>{title}</h1>
                <p>{date}</p>
            </div>
            <p className='text-xs '>{description}</p>
        </div>

    </div>
  )
}

export default ReactangelCard