"use client";
import CartProduct from '@/app/(components)/cartproduct/page';
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';

interface CartPageProps {}

interface CartItem {
  productId: string;
  quantity: any;
  _id: string;
  title: string;
  price: number;
  mrp: number;
  images: string;
  stocks: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemMrp, setItemMrp] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(70);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, getlength } = useAuth()
  const { setSubtotal } = useCart()
  const getCartData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Unauthorized. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/cartItmes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });
      if(!response){
        console.log(" something went wrong")
      }
      if (response.ok) {
        const data = await response.json();
        console.log(data.items)
        setCartItems(data.items);
        setItemPrice(data.totalPrice);
      } else {
        setError('Failed to fetch cart items. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching cart data:', err);
      setError('An error occurred while fetching cart data.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCartData();
  }, [isAuthenticated]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities, [itemId]: newQuantity };
      localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });
  };

  const handleRemove = (itemId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });

    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[itemId];
      localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });
  };

  //
  const handleRemoveProduct = async (itemId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized. Please log in.');
      return;
    }

    console.log(itemId)
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });
  
      if (response.ok) {
      console.log('removed successfully')
      getCartData()
      getlength()
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError('An error occurred while removing the item from the cart.');
    }
  };

  const handleSubtotal = ()=>{
    setSubtotal(itemPrice)
    
  }

  

  return (
    <div className="flex justify-center w-full min-h-screen bg-gradient-to-br from-white to-blue-300 text-black">
      <div className="w-full min-h-screen md:w-5/6 2xl:w-3/5">
        <div className="m-2 flex gap-4 items-center pt-5">
          <h1 className="font-semibold capitalize text-xl lg:text-3xl">Subtotal</h1>
          <h1 className="font-bold text-xl">${itemPrice}.00</h1>
        </div>
        <div className="flex items-center justify-center sticky top-16 z-20">
          <Link href={'checkout'}>
          <button onClick={handleSubtotal} className="bg-[#EA580C]/90 backdrop-blur-md hover:bg-[#EA580C] transform translate-all duration-300 px-20 py-2 rounded-full text-white font-semibold text-xl">
            Checkout
          </button>
          </Link>
        </div>

        {/* Bill Section */}
        <div className="w-full flex justify-center">
          <div className="w-full bg-white m-2 h-auto rounded-xl p-3 lg:p-5 flex flex-col gap-3">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">Loading...</div>
            ) : error ? (
              <div className="w-full h-full flex items-center justify-center text-red-500">{error}</div>
            ) : (
              <div>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <CartProduct
                    key={item.productId?.toString()} // Ensure it's a string for React keys
                    _id={item.productId?.toString()} // Ensure productId is passed
                      title={item.title}
                      price={item.price}
                      imageUrl={item.images}
                      quantity={item.quantity}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveProduct}
                    />
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center">No Products in Cart</div>
                )}
              </div>
            )}
            <div className="flex justify-end">
              <p className="font-bold mb-5 text-lg">${itemPrice}.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
