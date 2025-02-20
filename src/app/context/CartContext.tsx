"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  productId: string;
  quantity: number;
  _id: string;
  title: string;
  price: number;
  mrp: number;
  images: string;
  stocks: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  subtotal: number;
  setSubtotal: (price: number) => void;
  getCartData: () => Promise<void>;
  removeCartItem: (itemId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);

  const getCartData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/cartItems", {
        method: "GET",
        headers: { "Content-Type": "application/json", token },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items);
        setTotalPrice(data.totalPrice);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeCartItem = async (itemId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token },
      });

      if (response.ok) {
        setCartItems((prev) => prev.filter((item) => item._id !== itemId));
        getCartData(); // Refresh cart after removal
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <CartContext.Provider value={{ subtotal, setSubtotal, cartItems, totalPrice, getCartData, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
