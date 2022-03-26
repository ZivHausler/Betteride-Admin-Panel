import React, { useState,useEffect } from 'react'

const BatteryIcon = ({ precentage }) => {
    const [color, setColor] = useState('')

    useEffect(()=>{
        if (precentage >= 70) {
            setColor('bg-green-400')
        }
        else if (precentage >= 40) {
            setColor('bg-yellow-400')
        }
        else setColor('bg-red-400') 
    },[precentage])


    return (
        <div className='relative border-[1px] border-black w-8 h-[17px] rounded-[5px] flex items-center justify-center bg-white'>
            <p className='absolute z-10 text-xs font-bold text-center '>
                {precentage}%
            </p>
            <div className={`rounded-l rounded-sm absolute z-0 ${color} w-[${precentage}%] h-full left-0`}></div>
            <div className='w-[2px] h-2 absolute bg-black -right-[3px] rounded-r-sm border-right-1 border-black '></div>
        </div>
    )
}

export default BatteryIcon