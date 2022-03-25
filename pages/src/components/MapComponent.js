import React from 'react'
import Map from './Map';
import Logs from './Logs';

const MapComponent = ({isOpen}) => {
  return (
    <div className='w-full flex h-full pt-10'>
      <Map isOpen={isOpen} />
      <Logs />
    </div>
  )
}

export default MapComponent