import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
interface DATA{
    image:string | any;
    title:string;
    subtitle:string;
    description:string
}
const ArticleCard = ({image, title, subtitle, description}:DATA) => {
  return (
    <div className='w-full sm:w-80 mb-2 p-2 sm:p-5 flex flex-col gap-4 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg  hover:shadow-[5px_5px_5px_#EB5F00] transition-shadow duration-300'>
        <div className='w-full flex gap-5'>
            <div className='w-28'>
            <img src={image.src} alt="image" className='w-full h-full object-cover object-center'/>
            </div>
            <div>
                <h1 className='text-lg'>{title}</h1>
                <p className='text-xs'>{subtitle}</p>
            </div>
        </div>
        <div>
            <p className='text-xs'>{description}</p>
        </div>

        <button className='w-full text-lg items-center border-2 text-orange-600 border-orange-600 rounded-2xl p-2 sm:p-3 flex gap-10'> see all articles <FaArrowRightLong/> </button>
    </div>
  )
}

export default ArticleCard