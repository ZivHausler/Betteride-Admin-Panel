import React, { useState, useEffect } from 'react'
import VehicleInfo from './VehicleInfo';

const Filter = ({ setMapCenter, isOpen, vehicles }) => {

    const [showAddFilters, setShowAddFilters] = useState(false);
    const [filteredVehicles, setFilteredVehicles] = useState({});
    const [plateNumberFilter, setPlateNumberFilter] = useState("");
    const [batteryMinFilter, setBatteryMinFilter] = useState(0)
    const [batteryMaxFilter, setBatteryMaxFilter] = useState(100)

    // useEffect(()=>{
    //     if(plateNumberFilter)
    // },[plateNumberFilter])

    return (
        <div className={`rounded-xl absolute top-0 pt-3 bg-gray-200/80 backdrop-blur-[3px] w-[325px] h-[75%] mt-1.5 ml-2  shadow-md flex flex-col items-center transition ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[150%] '} `}>
            <div className={`px-2 shadow-md bg-gray-500 w-[90%] rounded-xl  overflow-hidden ${showAddFilters ? 'pb-2' : ''}`}>
                <p onClick={() => setShowAddFilters(!showAddFilters)} className='text-white text-center text-sm cursor-pointer hover:bg-gray-400 transition ease-in-out duration-200'>Add vehicle filters</p>
                {showAddFilters &&
                    <div className=''>
                        <div className='flex bg-gray-200 rounded-md p-1 shadow-sm'>
                            <p className='text-sm px-1 '>Plate number:</p>
                            <input className='text-sm bg-white rounded-md outline-none' placeholder='vehicle plate number' value={plateNumberFilter} onInput={(e) => setPlateNumberFilter(e.target.value)} type="text" name="plateNumber" />
                        </div>
                        <div className='flex bg-gray-200 rounded-md p-1 shadow-sm'>
                            <p className='text-sm'>Battery from</p>
                            <input className='text-sm outline-none w-10 bg-white text-center rounded-xl mx-2' value={batteryMinFilter} onInput={(e) => setBatteryMinFilter(e.target.value)} type="number" min={0} max={100} name="plateNumber" />
                            <p>{" to "}</p>
                            <input className='ml-2 text-sm outline-none bg-white rounded-xl w-10 text-center' value={batteryMaxFilter} onInput={(e) => setBatteryMaxFilter(e.target.value)} type="number" min={0} max={100} name="plateNumber" />
                        </div>
                    </div>
                }
            </div>

            {vehicles &&
                <div className='w-full h-full flex flex-col items-center pt-2'>
                    {Object.values(vehicles).map(vehicle => <VehicleInfo setMapCenter={setMapCenter} key={vehicle.plateNumber} plateNumber={vehicle.plateNumber} currentLocation={vehicle.currentLocation} precentage={parseInt(vehicle.battery.current / vehicle.battery.capacity * 100)} state={vehicle.state} />)}
                </div>
            }
        </div>
    )
}

export default Filter