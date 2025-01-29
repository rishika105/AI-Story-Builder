import React from 'react'
import { FaRegPenToSquare } from "react-icons/fa6";

const Sidebar = ({createNewSession}) => {
  return (
    <div className='bg-darkblue-600 absolute z-30 h-[88%] w-[260px] mt-[1px] left-0 text-white'>
    

    <div className='flex relative' onClick={createNewSession}>
    <button className='text-white p-7 ml-7'>
        New chat
      </button>
      <FaRegPenToSquare className='mt-8 ml-[135px] absolute'/>
    </div>
    </div>
  )
}

export default Sidebar
