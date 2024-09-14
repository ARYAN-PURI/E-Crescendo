"use client";
import Link from 'next/link';
import { useState } from 'react';
export default function AdminLogin() {
    const [isCorrect ,setIsCorrect]=useState(false);
    const [user,setUser]=useState({
      userName:"",
      password:"",
    });
    const [error,setError]=useState("");
    function handleLogin(){
        if(user.userName==process.env.NEXT_PUBLIC_USER_NAME && user.password==process.env.NEXT_PUBLIC_PASSWORD){
            setIsCorrect(true);
            setError("");
            document.cookie=`token=${process.env.NEXT_PUBLIC_TOKEN}; max-age=3600; path=/`
        }
        else{
            setError('Invalid Admin Credentials');
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={user.userName}
              onChange={(e) => setUser({...user,userName:e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={user.password}
              onChange={(e) => setUser({...user,password:e.target.value})}
              required
            />
          </div>
          
          {
            isCorrect?
            <div className=" text-center w-full px-4 my-4 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"><Link href={'/AdminPage'}>Enter Admin Page</Link></div>
            :
            <button onClick={handleLogin} className="w-full px-4 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
          }
        </div>
        {error!==""?
            <div className="bg-red-700 text-white my-4 w-auto py-2 px-5 rounded text-center text-lg">
                {error}
            </div>
        :null}
      </div>
    </div>
  );
}
