"use client";

import { IoMdShare } from "react-icons/io";

interface dataType {
  image: string | any;
  description: string;
}

export default function ImageCard({ image, description }: dataType) {
  return (
    <div className="w-36 sm:w-56 h-52 flex flex-col gap-1 sm:gap-3">
      <div
        className="h-24 sm:h-40 w-full rounded-xl overflow-hidden shadow-lg shadow-[#00000040] flex-shrink-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover", 
          backgroundRepeat: "no-repeat",
        }}
      >
      </div>
      <p className="text-sm  text-black flex justify-between items-start  px-2">
        {description}{" "}
        <IoMdShare className="text-blue-500 hover:cursor-pointer text-3xl" />
      </p>
    </div>
  );
}
