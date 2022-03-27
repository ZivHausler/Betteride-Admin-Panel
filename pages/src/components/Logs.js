import React, { useEffect, useState } from 'react'
import { createListenersOnLogs } from '../../../firebase/log_functions'
import Log from './Log'


const Logs = ({ db }) => {
  const [logs, setLogs] = useState(null)

  useEffect(() => {
    (async () => {
      await createListenersOnLogs(db, setLogs);
    })();
  }, [])

  const getCurrentDate = () => {
    const currentdate = new Date();
    return currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear();
  }

  return (
    <div className='relative w-2/5 h-full bg-gray-700 max-w-[500px] flex items-center py-2 flex-col overflow-y-scroll'>
      {logs && logs[getCurrentDate()].map((log, index) => <Log index={index } time={log.time} type={log.type} text={log.text} server={log.server} />)}
    </div>
  )
}

export default Logs