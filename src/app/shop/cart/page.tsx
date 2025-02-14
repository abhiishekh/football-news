
"use client"
import { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Image from '../assets/images/image.png';


interface ItemType {
  _id: string | null | undefined;
  title: string;
  price: number;
  mrp: number;
  imageUrl: string;
  stocks: number;
}

const CartPage = () => {
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemMrp, setItemMrp] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number | string>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(70);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities, [itemId]: newQuantity };
      localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });
  };

  const handleRemove = (itemId: string) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[itemId]; 
      localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });


  };


  return (
      <div className="flex justify-center w-full min-h-screen bg-gradient-to-br from-white to-blue-300 text-black">
        <div className="w-full min-h-screen md:w-5/6 2xl:w-3/5">
          <div className="m-2 flex gap-4 items-center pt-5">
            <h1 className="font-semibold capitalize text-xl lg:text-3xl">Subtotal</h1>
            <h1 className="font-bold text-xl">₹{itemPrice}.00</h1>
          </div>
          <div className="flex items-center justify-center sticky top-16 z-20">
            <button
              className="bg-[#953FE6]/80 backdrop-blur-md hover:bg-[#953FE6] transform translate-all duration-300 px-20 py-2 rounded-full text-white font-semibold text-xl"
             
            >
              Checkout
            </button>
          </div>
          {/* <div className="h-auto w-full mt-5">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">Loading...</div>
            ) : data && data.length > 0 ? (
              data.map((item: ItemType) => (
                <CartProduct
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  price={item.price}
                  mrp={item.mrp}
                  imageUrl={item.imageUrl}
                  stocks={item.stocks}
                  quantity={quantities[item._id || ''] || 1}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">No Products in Cart</div>
            )}
          </div> */}
          {/* Bill Section */}
          <div className="w-full flex justify-center">
            <div className="w-full bg-white m-2 h-auto rounded-xl p-3 lg:p-5 flex flex-col gap-3">
              <div>
                    <div className="flex items-center justify-between capitalize">
                      <div className="flex gap-2 items-center">
                        <p className="font-semibold">Jersey</p>
                        <p><RxCross2 /></p>
                        {/* <p>{quantities[item._id || ''] || 1}</p> */}
                        <p>2</p>
                      </div>
                      {/* <p className="font-semibold">₹{(item.mrp * (quantities[item._id || ''] || 1))}</p> */}
                      <p>2999</p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold mb-5 text-lg">₹{itemMrp}.00</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Delivery Charge</p>
                {deliveryCharge > 0 ? <p>₹70</p> : <p>-₹70</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <p>Discount</p>
                  <p className="text-red-500">-{discountPercentage}%</p>
                </div>
                <p className="font-semibold">-₹{discount}</p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold mb-5 text-lg">₹{itemPrice}.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default CartPage;