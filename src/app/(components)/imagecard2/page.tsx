"use client"
import { IoMdShare } from "react-icons/io";

interface dataType{
    image:string | any;
    description:string;
    title?:string;
}
export default function Imagecard2({image, description,title}:dataType){

    console.log(image)
    
    return (
       <div className="w-full h-full flex flex-col bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg overflow-hidden my-2">
                   <div className="h-full w-full object-contain  overflow-hidden  ">
                   <img src={image.src} alt="image" className="h-full w-full object-cover "/>
                   </div>
                   <h1 className=" px-2">{title}</h1>
                   <p className="text-xs text-black flex justify-between items-start  p-2">{description} <IoMdShare className="text-blue-500 hover:cursor-pointer "/></p>
               </div>
    )
}
