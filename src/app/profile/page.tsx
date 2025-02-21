"use client"
import axios from 'axios';
import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { IoMdLogOut } from 'react-icons/io';
import { useRouter } from 'next/navigation';

interface User{
  createdAt: string | number | Date ;
  name:string | null;
  email:string | null;

}
const ProfilePage = () => {
  const { cart } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {logout} = useAuth()
  const router = useRouter()
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user', {
          headers: {
            token
          },
        });
        console.log(response.data)
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleLogout = ()=>{
    logout
    router.push('/')

  }

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-spinner h-spinner border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin-fast"></div>
        <p className="ml-4 text-xl">Loading...</p>
      </div>
    );
  }
  return (
    <div className='w-full  min-h-screen bg-gray-500/10 flex justify-center'>
    <div className='mx-2 bg-transparent h-auto w-full md:w-1/2 flex flex-col '>
       <div className='w-full flex flex-col items-center mt-10 '>
        
        <div className="w-full flex justify-between items-center">
        <h1 className="font-semibold text-2xl md:text-3xl">Login and Security</h1>
        <h1 className='font-medium text-xl cursor-pointer capitalize  p-2 flex items-center gap-2'
        onClick={handleLogout}
        >logout <IoMdLogOut/></h1>
        </div>

        <div className='w-full h-auto flex flex-col   border-[1px] border-gray-400 rounded-lg mt-5'>
        
        {/* //Name ? */}
        <div className="m-4 flex justify-between items-center">
          <div>
          <h2 className=" font-medium capitalize">Name</h2>
        <h1 className='font-regular capitalize mb-5 '>{user?.name || 'Name'}</h1>
          </div>
          <button className="h-1/2 px-10 border-[1px] border-gray-400 rounded-full">
            Edit
          </button>
        </div>

        {/* // horizontal line  */}
        <div className="w-full border-b-[1px] border-gray-500"></div>

{/* // email ? */}
        <div className="m-4 flex justify-between items-center">
          <div>

          <h2 className=" font-medium capitalize">email</h2>
        <h1 className='font-regular capitalize  mb-5 '>{user?.email || 'email'}</h1>
          </div>
          <button className="h-1/2 px-10 border-[1px] border-gray-400 rounded-full">
            Edit
          </button>
        </div>
        
         {/* // horizontal line  */}
         <div className="w-full border-b-[1px] border-gray-500"></div>
      
{/* //created At  */}

<div className="m-4 flex justify-between items-center">
          <div>

          <h2 className=" font-medium capitalize">Joined </h2>
          <p className='font-regular capitalize mb-5'>
  <strong></strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
</p>

          </div>
          <button className="h-1/2 px-10 border-[1px] border-gray-400 rounded-full">
            Edit
          </button>
        </div>
        </div>
       </div>

    </div>
    </div>
  );
};

export default ProfilePage;
