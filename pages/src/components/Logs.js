import React, { useEffect, useState, useRef } from 'react'
import { createListenersOnLogs } from '../../../firebase/log_functions'
import Log from './Log'


const Logs = ({ db }) => {
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [selectedFilter, setSelectedFilter] = useState(['OK', 'WARNING', 'ERROR', 'ALGO'])
  const logsEndRef = useRef(null)

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // init logs listener
  useEffect(() => {
    (async () => {
      await createListenersOnLogs(db, setLogs);
    })();
  }, [])

  useEffect(() => {
    if (selectedFilter.length === 4) setFilteredLogs(logs)
    else if (selectedFilter.length === 0) setFilteredLogs([])
    else {
      setFilteredLogs(logs.filter(e => selectedFilter.includes(e.type)))
    }
    scrollToBottom()
  }, [logs, selectedFilter])

  return (
    <div className=' w-2/5 h-full bg-gray-700 max-w-[500px]  flex items-center flex-col overflow-hidden'>
      <div className='w-full flex flex-row flex-wrap items-center justify-center shadow-[0_3px_5px_rgba(55,65,81,1)] z-20 '>
        <div onClick={() => selectedFilter.includes('OK') ? setSelectedFilter(selectedFilter.filter(e => e !== 'OK')) : setSelectedFilter([...selectedFilter, 'OK'])} className={`flex flex-row w-[22%] m-1 p-2 justify-center items-center cursor-pointer shadow rounded-xl h-8  duration-100 ease-in-out ${selectedFilter.includes('OK') ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-500 hover:bg-gray-400 text-white '} `}>
          <div className={`w-2.5 h-2.5 rounded-full shadow-sm mr-1 bg-green-400 `}></div>
          <p className='font-light  '>
            Ok
          </p>
        </div>
        <div onClick={() => selectedFilter.includes('WARNING') ? setSelectedFilter(selectedFilter.filter(e => e !== 'WARNING')) : setSelectedFilter([...selectedFilter, 'WARNING'])} className={`flex flex-row w-[22%] m-1 p-2 justify-center items-center cursor-pointer shadow rounded-xl h-8  duration-100 ease-in-out ${selectedFilter.includes('WARNING') ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-500 hover:bg-gray-400 text-white '} `}>
          <div className={`w-2.5 h-2.5 rounded-full shadow-sm mr-1 bg-yellow-400 animate-pulse`}></div>
          <p className='font-light  '>
            Warn
          </p>
        </div>
        <div onClick={() => selectedFilter.includes('ERROR') ? setSelectedFilter(selectedFilter.filter(e => e !== 'ERROR')) : setSelectedFilter([...selectedFilter, 'ERROR'])} className={`flex flex-row w-[22%] m-1 p-2 justify-center items-center cursor-pointer shadow rounded-xl h-8  duration-100 ease-in-out ${selectedFilter.includes('ERROR') ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-500 hover:bg-gray-400 text-white '} `}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <p className='font-light pl-1'>Error</p>
        </div>
        <div onClick={() => selectedFilter.includes('ALGO') ? setSelectedFilter(selectedFilter.filter(e => e !== 'ALGO')) : setSelectedFilter([...selectedFilter, 'ALGO'])} className={`flex flex-row w-[22%] m-1 p-2 justify-center items-center cursor-pointer shadow rounded-xl h-8  duration-100 ease-in-out ${selectedFilter.includes('ALGO') ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-500 hover:bg-gray-400 text-white '} `}>
          <div className={`w-2.5 h-2.5 rounded-full shadow-sm mr-1 bg-blue-600`}></div>
          <p className='font-light'>Algo</p>
        </div>
      </div>
      <div className='py-2 h-full w-full flex items-center flex-col overflow-y-scroll'>
        {filteredLogs?.length > 0 && filteredLogs.map((log, index) => <Log key={index} time={log.time} type={log.type} text={log.text} server={log.server} />)}
        <div ref={logsEndRef} />
      </div>
    </div>
  )
}

export default Logs