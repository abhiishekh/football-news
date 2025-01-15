import React from 'react'


interface DATA{
    image:string | any;
    description:string;
    title:string;
    message:number;
    time:number|any
}
const VideoCard = ({image, description, title, message, time}:DATA) => {
  return (
    <div className='w-64 bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg overflow-hidden'>
        <div className='w-full'>
                <img src={image} alt="image" />
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default VideoCard