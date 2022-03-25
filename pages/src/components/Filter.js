import React from 'react'

const Filter = ({isOpen}) => {
    return (
        <div className={`absolute bg-blue-200 w-[30%] h-screen top-10 shadow-sm flex flex-col items-center transition ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[100%]'}`}>
            side menu
        </div>
    )
}

export default Filter