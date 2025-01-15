import React from 'react'
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
interface DATA{
    image:string | any;
    description: string;
    title: string;
    message: number;
    time: number | any;
}
const NewsCard = ({image, description, title, message, time}:DATA) => {
  return (
    <div className='w-80 my-2 sm:my-0  mx-auto bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg  overflow-hidden'>
        <div className='w-full '>
            <img src={image.src} alt="" />
        </div>  
        <div className='p-2 flex flex-col gap-5   '>
            <div>
            <h1>{title}</h1>
            <p className='text-xs'>{description}</p>
            </div>
            <div className='w-full flex justify-between items-center '>
                <p className='flex items-center gap-1'><MdOutlineMessage/>{message}</p>
                <p className='flex items-center gap-1'><MdOutlineWatchLater/>{time}</p>
            </div>
        </div>

    </div>
  )
}

export default NewsCard