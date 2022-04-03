import React from 'react'

const Log = ({ time, type, text, server }) => {
    return (
        <div onClick={() => alert(`time: ${time}\nserver: ${server}\ntype: ${type}\ntext: ${text}`)}
            className={`font-mono transition ease-in-out duration-100 text-xs w-[95%] bg-white pl-2 py-1 my-1 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 flex items-center`}>
            <div className='w-2.5 h-2.5 rounded-full shadow-sm mr-1 '>
                {type === "ERROR" ?
                    <span class="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span> :
                    <div className={`w-2.5 h-2.5 rounded-full shadow-sm mr-1 ${type === "WARNING" ?  "bg-yellow-400 animate-pulse" : "bg-green-400"}`}></div>
                }
            </div>
            <div className='mr-1'>{`[${time}]`}</div>
            <div className='pr-1'>{`${text}`}</div>
        </div>
    )
}

export default Log