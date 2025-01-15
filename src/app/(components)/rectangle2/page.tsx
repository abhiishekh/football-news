import Image from 'next/image';
import React from 'react'
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
interface DATA{
    image:string| any
    description:string;
    message:number;
    time:number| any;
}

const RectangleCard2 = ({image, description, message, time}:DATA) => {
  return (
    <div className='font-alike w-full h-24  rounded-lg  flex gap-4  p-3 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] my-2 sm:my-0'>
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
            <div className='flex flex-col justify-between'>
                <p className='text-sm '>{description}</p>
                <div className='flex justify-end w-full gap-3 items-end'>
                    <h1 className='text-xs flex items-center '> <MdOutlineMessage/>{message}</h1>
                    <p className='text-xs flex items-center gap-1'><MdOutlineWatchLater/>{time}</p>
                </div>
            </div>
    
        </div>
  )
}

export default RectangleCard2