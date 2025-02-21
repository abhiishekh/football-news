// components/CartProduct.tsx
import { Trash } from 'lucide-react';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';

interface CartProductProps {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

const CartProduct = ({
  _id,
  title,
  price,
  imageUrl,
  quantity,
  onQuantityChange,
  onRemove,
}: CartProductProps) => {

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      onQuantityChange(_id, newQuantity);
    }
  };
  const handleRemove = () => {
    console.log("clicked")
    console.log(_id)
    onRemove(_id);
  };

  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div className="flex gap-3 items-center">
        <img src={imageUrl[0]} alt={title} className="w-20 h-20 object-cover" />
        <div>
          <p className="font-semibold">{title}</p>
          <div className="flex gap-2 items-center">
            {/* <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-12 border p-1 text-center"
            /> */}
            <div className='flex  gap-2  px-4 bg-orange-500 rounded-md py-[2px] '>
                <p className='cursor-pointer font-bold' >-</p>
                <p className='px-2'>{quantity}</p>
                <p className='cursor-pointer font-bold'>+</p>
            </div>
            <button onClick={handleRemove} className="text-red-500">
              <Trash />
            </button>
          </div>
        </div>
      </div>
      <p>${price * quantity}</p>
    </div>
  );
};

export default CartProduct;
