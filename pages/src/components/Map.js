import React from 'react'
import Filter from './Filter'

const Map = ({isOpen}) => {
    return (
        <div className='w-2/3 pt-10 bg-green-100'>
            <p>Here the map component will go</p>
            <Filter isOpen={isOpen}/>
        </div>
    )
}

export default Map