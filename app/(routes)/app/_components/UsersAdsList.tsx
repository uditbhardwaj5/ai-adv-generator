"use client"
import React, { useState } from 'react'
import Image from 'next/image'
function UsersAdsList() {
  const [adsList, setAdsList] = useState([]);
  return (
    <div>
     <h2 className='font-bold text-2xl mb-2 mt-5'>My Ads</h2>

      {adsList.length === 0 &&
        <div className='p-5 border-dashed border-2 rounded-2xl flex flex-col items-center justify-center mt-6 gap-3'>
          <Image src={'/signboard.png'} alt="empty" width={200} height={200} className='w-20'/>
          <h2 className='text-xl'>Your don't have any ads created</h2>
          <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg'>Create New Ads</button>
        </div>
      }
    </div>
  )
}

export default UsersAdsList
