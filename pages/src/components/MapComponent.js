import React from 'react'
import Map from './Map';
import Logs from './Logs';

const MapComponent = () => {
  return (
    <div className='w-full flex h-full'>
      <Map />
      <Logs />
    </div>
  )
}

export default MapComponent