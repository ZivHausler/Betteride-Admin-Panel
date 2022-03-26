import React from 'react'
import Map from './Map';
import Logs from './Logs';

const MapComponent = ({...props}) => {

  return (
    <div className='w-full flex h-full pt-10'>
      <Map {...props}/>
      <Logs db={props.db}/>
    </div>
  )
}

export default MapComponent