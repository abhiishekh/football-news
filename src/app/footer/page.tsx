"use client"
import React from 'react'
import logo from '@/app/assets/images/image.png'
import google from '@/app/assets/images/contactImages/google.png'
import tiktok from '@/app/assets/images/contactImages/tiktok.png'
import facebook from '@/app/assets/images/contactImages/facebook.png'
import instagram from '@/app/assets/images/contactImages/instagram.png'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className=' font-alike w-full bg-gradient-to-r from-[#B64900] to-[#FF6700] text-white flex items-center pt-10 flex-col'>
            <div className='flex w-full sm:w-[70%] px-2 sm:pl-60'>
                <div className=''>
                    <Image src={logo} alt="logo" loading='lazy'/>
                </div>
                <div>
                    <h1 className='text-3xl sm:text-5xl font-calistoga tracking-[.7rem] mb-2 '>GoalMania</h1>
                    <p className='text-xs text-black'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at auctor leo, vitae dapibus sapien. Etiam vehicula et lacus nec suscipit. Suspendisse tempor id lectus ut interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam id aliquam magna. Donec in elit libero. Nullam aliquet dui elit, pellentesque ullamcorper sapien molestie et....</p>
                    <button className='text-sm text-black p-2 bg-[#FFFFFFB2] rounded-full my-5 cursor-pointer'>Read more</button>
                </div>
            </div>
            <div>
                <div className="flex gap-5 my-3">
                    <div className="w-10">
                        <Image
                            src={google}
                            alt="Google Icon"
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                            loading="lazy"
                        />
                    </div>
                    <div className="w-10">
                        <Image
                            src={tiktok}
                            alt="TikTok Icon"
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                            loading="lazy"
                        />
                    </div>
                    <div className="w-10">
                        <Image
                            src={facebook}
                            alt="Facebook Icon"
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                            loading="lazy"
                        />
                    </div>
                    <div className="w-10">
                        <Image
                            src={instagram}
                            alt="Instagram Icon"
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                            loading="lazy"
                        />
                    </div>
                </div>
                <div>
                    <p className='text-xs text-black'>
                        Copyright @ 2024 Goalmaina. All right reserved.
                    </p>
                </div>
            </div>

            <div className='mt-5 w-full h-auto  bg-gradient-to-r from-[#071423] to-[#1D4E89] flex justify-center gap-4 p-2 sm:gap-20 items-center flex-wrap'>
                <li className='list-none ml-2'>Terms & Conditions</li>
                <li className='list-none ml-2'>Privacy</li>
                <li className='list-none ml-2'>Accessibility Information</li>
                <li className='list-none ml-2'>Accessibility Information</li>

            </div>
        </div>
    )
}

export default Footer