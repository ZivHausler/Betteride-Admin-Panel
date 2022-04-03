import React, { useEffect, useState, useRef } from 'react'
import { createListenersOnLogs } from '../../../firebase/log_functions'
import Log from './Log'


const Logs = ({ db }) => {
  const [logs, setLogs] = useState([])
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
    scrollToBottom()
  }, [logs]);


 

  return (
    <div className='relative w-2/5 h-full bg-gray-700 max-w-[500px] flex items-center py-2 flex-col overflow-y-scroll'>
      {logs?.length > 0 && logs.map((log, index) => <Log key={index} time={log.time} type={log.type} text={log.text} server={log.server} />)}
      <div ref={logsEndRef} />
    </div>
  )
}

export default Logs