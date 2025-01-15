"use client"
import React from 'react'
import { FaChevronRight } from "react-icons/fa";
interface Text {
    text: string;
}
const ContentText = ({ text }: Text) => {
    return (
        <div className="w-full ">
            
            <div className="flex w-full justify-between items-center">

                <p className="my-1 sm:my-5">{text}</p>
                <FaChevronRight />
            </div>
            <hr className="h-[3px] bg-[#FF6700]" />
        </div>
    )
}

export default ContentText