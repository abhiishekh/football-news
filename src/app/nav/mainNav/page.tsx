import React from 'react'
import logo from '@/app/assets/images/image.png'
import { CiSearch } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
const MainNav = () => {
  return (
    <div className='w-full bg-gradient-to-r from-[#1D4E89] to-[#071423] px-2 sm:px-20 text-white flex font-alike py-2'>
       <div className='w-full flex flex-wrap justify-between items-center'>
        <div className='flex gap-2 sm:gap-10 items-center '>
            <div className='h-full w-16 sm:w-24'>
                <img src={logo.src} alt="" className='h-full w-full object-contain'/>
            </div>
            <div>
                <h1 className='text-3xl sm:text-5xl font-calistoga tracking-[.7rem] '>GoalMania</h1>
            </div>
        </div>
        <div className='flex gap-1 sm:gap-10 items-center'>
            <div className='text-xl'><CiSearch/></div>
            <div className='relative group'>
            <button className='px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full flex items-center gap-1 capitalize'>
              Language <FaCaretDown className='text-xs'/>
            </button>
            <div className='absolute left-20 z-10 top-7 hidden mt-[2px] w-20 py-2 overflow-hidden bg-[#FFFFFFE0] border border-gray-300 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg group-hover:block'>
              <ul>
                <li className='px-3 pb-2 text-xs hover:bg-gray-200 text-black'>English</li>
                <li className='px-3 pb-2 text-xs hover:bg-gray-200 text-black'>French</li>
                <li className='px-3 pb-2 text-xs hover:bg-gray-200 text-black'>German</li>
                <li className='px-3 pb-2 text-xs hover:bg-gray-200 text-black'>Italian</li>
                <li className='px-3 pb-2 text-xs hover:bg-gray-200 text-black'>Portuguese</li>

              </ul>
            </div>
          </div>


            <button className='px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full capitalize'>login</button>
        </div>

       </div>
    </div>
  )
}

export default MainNav