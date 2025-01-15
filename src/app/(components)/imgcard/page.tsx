import Image, { StaticImageData } from "next/image";

interface ImageType {
  image: StaticImageData | string;
}

const ImageSet = ({ image }: ImageType) => {
  return (
    <div
      className="rounded-lg overflow-hidden w-48 h-32 bg-center bg-cover"
      style={{
        backgroundImage: `url(${typeof image === "string" ? image : image.src})`, 
      }}
    ></div>
  );
};

export default ImageSet;
