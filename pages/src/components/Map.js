import React from 'react'
import Filter from './Filter'

const Map = ({isOpen}) => {
    return (
        <div className='relative w-2/3 bg-green-100 h-full'>
            <p>here the map component</p>
            <Filter isOpen={isOpen}/>
        </div>
    )
}

export default Map