import React, { useState, useEffect } from 'react'
import Image from 'next/image'


const NavBar = ({isOpen,setIsOpen}) => {

  return (
    <div className='h-30 w-full '>
      <div className='fixed h-10 w-full bg-gray-100/80 shadow-md flex'>
        <div className='p-1 ml-5'>
          <Image onClick={() => setIsOpen(!isOpen)} className='cursor-pointer' src="/burger_icon.png" width={30} height={30} />
        </div>
        <div className='p-1 ml-5'>
          <Image className='pointer-events-none' src="/betteride_logo.png" width={150} height={30} />
        </div>
      </div>
    </div>
  )
}

export default NavBar