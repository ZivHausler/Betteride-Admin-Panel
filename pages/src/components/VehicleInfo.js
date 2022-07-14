import React, { useEffect, useState } from 'react'
import BatteryIcon from './BatteryIcon'
import Image from 'next/image'


const VehicleInfo = ({ setMapCenter, state, currentLocation, precentage, plateNumber, showMoreInfo, setShowMoreInfo, color, kmLeft, route }) => {

    const [isHover, setIsHover] = useState(false)

    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={() => showMoreInfo === plateNumber ? setShowMoreInfo(null) : setShowMoreInfo(plateNumber)} className='select-none w-[90%] bg-white my-[4px] shadow-md rounded-xl flex flex-col justify-between p-2 text-sm hover:scale-[102%] hover:bg-gray-100 transition ease-in-out duration-200 '>
            <div className='flex justify-between px-2 items-center'>
                <BatteryIcon precentage={precentage} />
                <div className='flex w-[100px] rounded-md border-black bg-yellow-300 item-center justify-center self-center overflow-hidden border-[1px] '>
                    <p className='bg-blue-600 w-1/6 text-white text-center h-full border-black '>IL</p>
                    <p className='font-bold w-5/6 text-center'>{plateNumber}</p>
                </div>
                <Image onClick={() => setMapCenter({ lat: currentLocation.location.lat, lng: currentLocation.location.lng })} className='hover:scale-110 transition cursor-pointer ease-in-out duration-50 ' src="/target_icon.png" width={25} height={25} />
            </div>
            <div className='mt-1 pl-2'>
                <p className='text-[14px]'><span className='font-bold '>State:</span> {state?.type ? state.type : 'idle'}</p>
                <p className='text-[14px]'><span className='font-bold '>Current address:</span> {currentLocation.address}</p>
                {
                    showMoreInfo === plateNumber &&
                    <div className='mb-8 flex flex-col'>
                        <p className={`text-[14px]`}><span className='font-bold  '>Vehicle color:</span> {color}</p>
                        <p className='text-[14px]'><span className='font-bold '>KM left:</span> {kmLeft}</p>
                        {route &&
                            <div className='flex flex-col'>
                                <p className='text-[14px] mt-3 mb-1 underline self-center'><span className='font-bold '>Route Information</span> </p>
                                <p className='text-[14px]'><span className='font-bold '>User ID:</span> {route.user_id} </p>
                                <p className='text-[14px]'><span className='font-bold '>Origin:</span> {route.start_address}</p>
                                <p className='text-[14px]'><span className='font-bold '>Destination:</span> {route.end_address}</p>
                                <p className='text-[14px]'><span className='font-bold '>Total KM:</span> {(route.distance?.value / 1000).toFixed(2)}</p>
                                <p className='text-[14px]'><span className='font-bold '>KM left:</span> {(route.km_left / 1000).toFixed(2)}</p>
                                <p className='text-[14px]'><span className='font-bold '>Total Duration:</span> {(route.duration?.value / 60).toFixed(2)} minutes</p>
                                <p className='text-[14px]'><span className='font-bold '>ETA:</span> {route.eta?.split(',')[1]?.trim()}</p>
                                <p className='text-[14px]'><span className='font-bold '>Time left:</span> {(route.time_left / 60).toFixed(2)} minutes</p>
                                <p className='text-[14px]'><span className='font-bold '>Current step:</span> {(route.index?.step == undefined ? '0' : route.index?.step) + ' / ' + route.steps?.length}  </p>

                            </div>
                        }
                    </div>
                }
            </div >
            {showMoreInfo === plateNumber ?
                <div className='relative self-center w-full'>

                    <div className={` absolute bottom-0 right-1/2 mt-2 h-6 w-8 rotate-180 translate-x-1/2 `}>
                        <Image src={`/down_arrow.png`} layout='fill' />
                    </div>
                </div>
                :
                <div className={`${isHover && 'animate-bounce '}  relative mt-2 h-6 w-8 self-center`}>
                    <Image src={`/down_arrow.png`} layout='fill' />
                </div>
            }
        </div >
    )
}

export default VehicleInfo