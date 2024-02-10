import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl font-semibold text-center my-7'>profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <input type="text" placeholder='username' id='username'
        className='sn border p-3 rounded-lg'/>
        <input type="text" placeholder='email' id='email'
        className='sn border p-3 rounded-lg'/>
        <input type="text" placeholder='password' id='password'
        className='sn border p-3 rounded-lg'/>
        <button 
        className='bg-blue-500 p-3 rounded-lg uppercase hover:opacity-95
                   text-white disabled:opacity-95'>Update</button>
        </form>   
      <div className='flex justify-between mt-5'>
        <span className='sn border rounded-lg p-2  bg-red-700 text-white'>Delete account</span>
        <span className='sn border rounded-lg p-2 bg-red-700 text-white'>sign out</span>

      </div>

    </div>
  )
}

