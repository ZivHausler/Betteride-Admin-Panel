import React from 'react'
import BatteryIcon from './BatteryIcon'
import Image from 'next/image'


const VehicleInfo = ({state,currentLocation,precentage,plateNumber}) => {
    return (
        <div className='select-none w-[90%] h-24 bg-white my-1 shadow-md rounded-xl flex flex-col justify-between p-2 text-sm hover:scale-105 hover:bg-gray-100 transition ease-in-out duration-200 '>
            <div className='flex justify-between px-2 items-center'>
                <BatteryIcon precentage={precentage} />
                <div className='flex w-[100px] rounded-md border-black bg-yellow-300 item-center justify-center self-center overflow-hidden border-[1px] '>
                    <p className='bg-blue-600 w-1/6 text-white text-center h-full border-black '>IL</p>
                    <p className='font-bold w-5/6 text-center'>{plateNumber}</p>
                </div>
                <Image onClick={() => alert(currentLocation.location.lat+ ", " + currentLocation.location.lng )} className='hover:scale-110 transition cursor-pointer ease-in-out duration-20 ' src="/target_icon.png" width={25} height={25} />
            </div>
            <div >
                <p className='text-[14px]'><span className='font-bold '>State:</span> {state ? state : 'idle'}</p>
                <p className='text-[14px]'><span className='font-bold '>Current address:</span> {currentLocation.address}</p>
            </div>
        </div>
    )
}

export default VehicleInfo