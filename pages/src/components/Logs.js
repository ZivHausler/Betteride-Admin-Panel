import React, {useEffect, useState} from 'react'

const Logs = () => {

    const callLogs = () => {
        fetch('http://localhost:3000/api/print_logs')
        .then(response => response.json())
        .then(response => console.log(response))
    }
    
  return (
    <div className='w-1/3 h-full bg-blue-100 '>
        <p>Here the logs will go</p>
    </div>
  )
}

export default Logs