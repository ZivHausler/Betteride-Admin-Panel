import React, { useState } from 'react'
import VehicleInfo from './VehicleInfo';

const Filter = ({ isOpen, vehicles }) => {

    const [showAddFilters, setShowAddFilters] = useState(false);
    const [plateNumber, setPlateNumber] = useState("");
    return (
        <div className={`rounded-xl absolute top-0 pt-3 bg-gray-200/80 backdrop-blur-[3px] w-[325px] h-[98%] mt-1.5 ml-2  shadow-md flex flex-col items-center transition ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[150%] '} `}>
            <div className={`px-2 shadow-md bg-gray-500 w-[90%] rounded-xl  overflow-hidden ${showAddFilters ? 'pb-2' : ''}`}>
                <p onClick={() => setShowAddFilters(!showAddFilters)} className='text-white text-center text-sm cursor-pointer hover:bg-gray-400 transition ease-in-out duration-200'>Add vehicle filters</p>
                {showAddFilters && <div className=''>
                    <div className='flex bg-gray-200 rounded-md p-1 shadow-sm'>
                        <p className='text-sm px-1 '>Plate number:</p>
                        <input className='text-sm bg-gray-200 outline-none' placeholder='vehicle plate number' value={plateNumber} onInput={(e) => setPlateNumber(e.target.value)} type="text" name="plateNumber" />
                    </div>
                </div>
                }
            </div>

            {vehicles &&
                <div className='w-full h-full flex flex-col items-center pt-2'>
                    {Object.values(vehicles).map(vehicle => <VehicleInfo key={vehicle.plateNumber} plateNumber={vehicle.plateNumber} currentLocation={vehicle.currentLocation} precentage={vehicle.battery} stats={vehicle.stats} />)}
                </div>
            }
        </div>
    )
}

export default Filter