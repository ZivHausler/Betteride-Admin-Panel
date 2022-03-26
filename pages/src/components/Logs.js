import React, { useEffect, useState } from 'react'
import { createListenersOnLogs } from '../../../firebase/log_functions'
import Log from './Log'


const Logs = ({db}) => {
  const [logs,setLogs] = useState(null)

  useEffect(() => {
    (async () => {
        await createListenersOnLogs(db,setLogs);
    }) ();
  }, [])

  return (
    <div className='relative w-2/5 h-full bg-gray-700 max-w-[500px] flex justify-end items-center py-2 flex-col rounded-sm overflow-y-scroll'>
      {logs && logs["26-3-2022"].map(log => <Log time={log.time} type={log.type} text={log.text} server={log.server}/>)}
    </div>
  )
}

export default Logs