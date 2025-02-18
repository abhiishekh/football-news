"use client"

import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";
import transferMarket from '@/app/assets/images/transferMarketimages/bannerImageTransferMarket.png'
import data from '@/app/data/contentdata'
import loremdata1 from '@/app/data/loremdata1'
import ContentText from "@/app/(components)/content/page";
import image from '@/app/data/imageData'
import newData from '@/app/data/rectanglecarddata'
import ReactangelCard from "@/app/(components)/rectanglecard/page";
import LatestNewsCard1 from "@/app/(components)/latestNewscard1/page";
import ImageSet from "@/app/(components)/imgcard/page";
const TransferMarket = () => {
    return (
        <>
        {/* //first section */}

        <div className=" font-alike w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]  py-10 text-black mx-auto">
            <div className="container w-full sm:flex justify-center sm:justify-between px-2      items-center mx-auto">
                <h1 className="text-4xl text-center mb-2 sm:mb-0">Transfer Market</h1>
                <div className="flex  items-center justify-center relative">
                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Enter your search term..."
                        className="text-[#747474] p-3 bg-transparent pl-5 rounded-full border border-[#747474] w-[300px] focus:outline-none"
                    />
                    {/* Search Button */}
                    <button className="absolute right-5 sm:right-0 bg-[#FF6700] hover:bg-[#e65c00] text-white font-bold py-4 px-7 rounded-full flex items-center justify-center">
                        <CiSearch className="text-white text-lg" />
                    </button>
                </div>
            </div>
            <div className="w-full relative mt-5  h-[500px] overflow-hidden">
                <Image
                    src={transferMarket}
                    alt="banner-image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                />
                <h1 className="container mx-auto text-white text-4xl w-[80%] absolute bottom-10 left-4 sm:left-24">
                    From Rumors to Reality, The Most Anticipated
                    Transfers of the Year.
                </h1>
            </div>
   
            <div className="container mx-auto flex w-full px-2 sm:px-24 justify-between my-5">
                <h3 className="capitalize text-2xl tracking-wider">latest transfer news</h3>
                <p className="capitalize ">all news</p>
            </div>
            <div className="container mx-auto w-full px-2  sm:flex justify-center sm:justify-between ">
                <div className="w-full sm:w-[40%]">
                <hr className="h-[3px] bg-[#FF6700]" />
                <ContentText
                text="Big clubs like Manchester City and Chelsea."
                />
                </div>
                <div className="w-full sm:w-[40%]">
                <hr className="hidden sm:block h-[3px] bg-[#FF6700]" />
                <ContentText
                text="Barcelona seeks a forward, while Real Madrid."
                />
                </div>
                
            </div>
        </div>
        {/* second section */}
        <div className="w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]">

        <div className='container font-alike w-full  py-16 sm:py-20 px-2  text-black flex mx-auto'>
        <div className="w-full sm:w-[50%]"> 
        <hr className="h-[3px] bg-[#FF6700]" />
            {
                data.map((items,index)=>(
                    <ContentText
                    key={index}
                    text={items.text}
                    />
                )
            )}

            <h1 className="mt-10 text-3xl capitalize tracking-wide">Latest Transfer news</h1>
                <div className="flex flex-col gap-2 sm:gap-4 items-center mt-5">
                    {newData.map((items, index)=>(
                        <ReactangelCard
                        key={index}
                        title={items.title}
                        image={items.image}
                        description={items.description}
                        date={items.date}
                        />
                    ))}
                </div>
        </div>

        <hr className="hidden sm:block w-[2px] h-auto mx-16 bg-[#FF6700] "/>
        <div className="w-[40%] hidden sm:flex flex-col gap-4"> 
            <LatestNewsCard1/>
            <LatestNewsCard1/>
        </div>
        </div>
        </div>

        {/* //third section  */}
        <div className="w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]">
        <div className="container mx-auto font-alike w-full min-h-screen py-10 sm:py-20 px-2  text-black flex flex-col items-center ">
            <h1 className="text-2xl text-center  my-5 tracking-wider">lorem lipsom</h1>

            <div className="w-full sm:grid grid-cols-2  gap-1 gap-x-16">
                
                {
                    loremdata1.map((item,index)=>(
                        <ContentText
                        key={index}
                        text={item.text}
                        />
                    ))
                }
            </div>
            <h1 className="mt-16 text-3xl tracking-wider"> lorem lipsum</h1>
            <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-10 mt-10 overflow-hidden">
               {
                image.map((item, index)=>(
                    <ImageSet key={index} image={item.image}/>
                ))
               }
            </div>
            <h1 className="mt-16 text-3xl tracking-wider"> lorem lipsum</h1>
               <div className="w-full sm:flex sm:gap-24 mt-10 justify-center">
                <div className="w-full sm:w-[50%] ">
                <hr className="h-[3px] bg-[#FF6700]" />
               <ContentText
               text=" dapibus sapien sipina adpibuspa layenias. "
               />
                </div>
                <div className="w-full sm:w-[50%]">
                <hr className="hidden sm:block h-[3px] bg-[#FF6700]" />
               <ContentText
               text=" dapibus sapien sipina adpibuspa layenias.  "
               />
                </div>

               </div>
        </div>
        </div>


        {/* //forth section */}
        <div className="w-full h-auto bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]">
        <div className="container mx-auto font-alike w-full h-full py-20 px-2 text-black flex flex-col items-center">
            

        <h1 className="text-2xl text-center  my-5 tracking-wider">lorem lipsom</h1>
        <div className="w-full sm:grid grid-cols-2  gap-1 gap-x-16">

        {
            data.map((item,index)=>(
                <ContentText key={index} text={item.text}/>
            ))
        }
        </div>
        </div>
        </div>

        </>
    );
};

export default TransferMarket;
