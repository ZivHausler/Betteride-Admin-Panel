import React from 'react'

const Filter = ({isOpen}) => {
    return (
        <div className={`absolute top-0 bg-blue-200 w-[300px] h-full shadow-sm flex flex-col items-center transition ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[100%]'}`}>
            side menu
        </div>
    )
}

export default Filter