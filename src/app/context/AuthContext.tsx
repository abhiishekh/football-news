"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';  // For decoding JWT on the client-side
import axios from 'axios';
import { useCart } from './CartContext';

// Define types for auth state
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  cart: number | string;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getlength:()=>void;
}

interface DecodedToken {
  userId: string;
  exp: number;
}


// Create a context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<number | string>('')
  
  useEffect(() => {
    const token = localStorage.getItem("token");  
    const isTokenExpired = (token : string | null ) => {
      if (!token) return true;
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
      } catch (error) {
        console.error("Error decoding token:", error);
        return true;
      }
    };
    const isExpired = isTokenExpired(token);

    if (token && !isExpired) {
      const decodedToken = jwtDecode<DecodedToken>(token);  
      const userId = (decodedToken as { userId: string }).userId;

      if (userId) {
        setIsAuthenticated(true);  
        setUser(userId);  
      }
    }
  }, []);  // Run this only on the first render (componentDidMount)

  

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data.token)

      if (res.ok) {
        localStorage.setItem("token", data.token);  // Save token to localStorage
        const token = data.token;
        const decodedToken = jwtDecode(token);  // Decode the token

        const userId = (decodedToken as { userId: string }).userId;

        setIsAuthenticated(true);  // Set user as authenticated
        getlength()
        setUser(userId);  // Store the user data
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);  // Save token to localStorage
        alert('Signup successful!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");  // Remove token from localStorage
    setIsAuthenticated(false);  // Log out the user
    getlength()
    setUser(null);  // Clear user data
  };


  // calculating the  cartlength 
  const getlength = async () => {

    const token = localStorage.getItem("token");
    if (!token) {
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
        console.log(data.items.length)
        setCart(data.items.length)
      
      } else {
      console.log("Failed to fetch cart items. Please try again")
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getlength()
  },[cart, isAuthenticated, logout, getlength])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user,cart, login, signup, logout, getlength }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
