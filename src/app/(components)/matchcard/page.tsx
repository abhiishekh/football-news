import React from 'react';
interface DATA{
    image1:string | any;
    score1:number;
    title1:string;
    image2:string | any;
    score2:number;
    title2:string;
    date:number | any;
    location:string;
    status:string;
    series:string;
}

const MatchCard = ({image1,image2,score1,score2,series,location,date,title1,title2,status}:DATA) => {
  return (
    <div className='w-64 h-36 bg-gradient-to-r from-[#FFFFFF] to-[#71CCFF]  rounded-lg overflow-hidden p-2 hover:shadow-[5px_5px_5px_#FFA500] transfrom transition-all duration-300'>
        <div className='w-full flex justify-between'>
            <p className='text-xs'>{date}</p>
            <p className='text-xs'>{status}</p>
        </div>
        <div className='w-full my-3'>
            <div className='w-full flex justify-between my-1'>
                <div className='flex gap-2 items-center'>
                    <div className='w-10  rounded-lg overflow-hidden'>
                    <img src={image1.src} alt="logo" className='w-full h-full object-contain'/>
                    </div>
                    <h1>{title1}</h1>
                </div>
                {/* //score */}
                <p className='px-5 py-1  flex items-center bg-blue-200 rounded-md'>{score1}</p>
            </div>
            <div className='w-full flex justify-between my-1'>
                <div className='flex gap-2 items-center'>
                    <div className='w-10  rounded-lg overflow-hidden'>
                    <img src={image2.src} alt="logo" className='w-full h-full object-contain'/>
                    </div>
                    <h1>{title2}</h1>
                </div>
                {/* //score */}
                <p className='px-5 py-1 flex items-center bg-blue-200 rounded-md'>{score2}</p>
            </div>
           
            
        </div>
        <hr className='w-full h-[3px] bg-red-400'/>
        <div className='w-full flex justify-between my-1 text-xs'>
            <p>Seris {series}</p>
            <p>{location}</p>
        </div>  

    </div>
  );
};

export default MatchCard;