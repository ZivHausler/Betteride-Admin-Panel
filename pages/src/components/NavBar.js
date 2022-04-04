import React, { useState, useEffect } from 'react'
import Image from 'next/image'


const NavBar = ({isOpen,setIsOpen}) => {

  return (
      <div className='fixed select-none z-10 h-10 w-full bg-gray-100/80 shadow-md flex items-center'>
        {/* Burger */}
        <div className='p-1 ml-5 select-none cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          <div className='w-8 h-1 bg-black rounded-full m-1'></div>
          <div className='w-8 h-1 bg-black rounded-full m-1'></div>
          <div className='w-8 h-1 bg-black rounded-full m-1'></div>
        </div>
        <div className='p-1 ml-5'>
          <Image className='pointer-events-none' src="/betteride_logo.png" width={150} height={30} />
        </div>
        
      </div>
  )
}

export default NavBar