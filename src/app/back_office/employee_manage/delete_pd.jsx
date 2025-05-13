'use client'
import React from 'react'
import { MdDeleteForever } from "react-icons/md";

function delete_pd() {
  return (
    <div className='static'>
        {/* add button on page */}
        <button className='btn btn-square btn-ghost'>
            <MdDeleteForever className='h-5 w-5 text-error' />
        </button>
    
    </div>
  )
}
export default delete_pd
