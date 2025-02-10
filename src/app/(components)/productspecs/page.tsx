"use client"
import { useState } from 'react';
import ProductDescription from '../productdescription/page';
import ProductInfo from '../productinfo/page';
import ProductReview from '../productreview/page';
import ShippingAndDilivery from '../shippinganddelivery/page';

const ProductSpecs = () => {
  const navItems = [
    { label: 'DESCRIPTION', content: <ProductDescription /> },
    { label: 'ADDITIONAL INFORMATION', content: <ProductInfo /> },
    { label: 'REVIEWS (0)', content: <ProductReview /> },
    { label: 'SHIPPING & DELIVERY', content: <ShippingAndDilivery /> },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Navigation bar with border-top */}
      <div className="w-full flex justify-between gap-3 ">
        <div className="w-full flex justify-between">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                ${activeIndex === index ? 'font-bold border-t-[3px] border-orange-500' : 'border-t-[3px] border-white'}
                pt-5 cursor-pointer
                rounded-sm
                flex-grow
                text-center
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 w-full px-2 sm:px-20">
        {navItems[activeIndex].content}
      </div>
    </div>
  );
};

export default ProductSpecs;
