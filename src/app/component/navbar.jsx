import React from 'react'
import { BiHome } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdBakeryDining } from "react-icons/md";
import Link from 'next/link'

function nevbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-xl ">
        <div className=' navbar p-2'>
            <div className="navbar-start">
                <img src= "/logo.png" alt="Logo" className="w-10" />
                <ul className='menu menu-horizontal'>
                    <li className='pl-3'> <button className="btn btn-ghost"><MdBakeryDining className='h-8 w-8'/>Home</button> </li>
                </ul>
            </div>

            <div className="navbar-end gap-4">
                <label className="input input-bordered flex items-center w-60">
                        <IoMdSearch className="text-gray-400" />
                        <input
                        type="search"
                        className="grow"
                        placeholder="search"
                        />
                </label>
                <button className="btn btn-ghost btn-circle">
                    <FaUser />
                </button>
            </div>
        </div>
    </div>
  )
}

export default nevbar
