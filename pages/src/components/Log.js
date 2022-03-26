import React from 'react'

const Log = ({ time, type, text, server }) => {


    return (
        <div onClick={() => alert(`time: ${time}\nserver: ${server}\ntype: ${type}\ntext: ${text}`)}
            className='font-mono transition ease-in-out duration-100 text-xs w-[95%] bg-white pl-2 py-1 my-1 w-full rounded-lg shadow-md cursor-pointer hover:bg-gray-200 flex items-center'>
            <div className='w-2.5 h-2.5 rounded-full shadow-sm mr-1 '>
                <div className={`w-2.5 h-2.5 rounded-full bg-${type === "OK" ? "green" : type === "ERROR" ? "red" : 'yellow'}-400 shadow-sm mr-1 animate-pulse`}>

                </div>
            </div>
            <div className='mr-1'>{`[${time}]`}</div>
            <div className='pr-1'>{`${text}`}</div>
        </div>
    )
}

export default Log