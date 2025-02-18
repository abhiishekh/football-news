"use client"
import axios from 'axios'
import React from 'react'
import { useCart } from '../context/CartLength'

const page = () => {
 const {cart } = useCart()
 console.log(cart)
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-white to-blue-400'>

    <div className='container mx-auto text-center min-h-screen '>
        <h1>Profile</h1>
        <p>cart Length is {cart}</p>
    </div>
    </div>
  )
}

export default page
