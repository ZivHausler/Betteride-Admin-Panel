import React, { useState, useEffect } from 'react'
import Image from 'next/image'


const NavBar = ({isOpen,setIsOpen}) => {

  return (
    <div className='h-full w-full '>
      <div className='fixed z-20 h-10 w-full bg-gray-300 shadow-md flex'>
        <div className='p-1 ml-5'>
          <Image onClick={() => setIsOpen(!isOpen)} className='cursor-pointer' src="/burger_icon.png" width={30} height={30} />
        </div>
        <div className='p-1 ml-5'>
          <Image className='pointer-events-none' src="/betteride_logo.png" width={150} height={30} />
        </div>
      </div>
      <div className={`absolute z-10 bg-blue-200 w-[30%] h-screen top-10 shadow-sm flex flex-col items-center transition ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[100%]'}`}>
        side menu
      </div>
    </div>
  )
}

export default NavBar