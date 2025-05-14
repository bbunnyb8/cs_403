import React from 'react'

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
                    <Link href={"/front_office/home"}>
                    <li className='pl-3'> <button className="btn btn-ghost"><MdBakeryDining className='h-8 w-8'/>Home</button> </li>
                    </Link>
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
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <button className="btn btn-ghost btn-circle">
                                    <FaUser />
                                </button>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-30 p-2 shadow">
                            <li>
                            <Link href={"/front_office/profile"} className="justify-between">
                                Profile
                            </Link>
                            </li>
                            <li>
                            <Link href={"/front_office/order"} className="justify-between">
                                My Order
                            </Link>
                            </li>
                            <li>
                            <Link href={"/front_office/login"} className="justify-between">
                                Logout
                            </Link>
                            </li>
                        </ul>
                        </div>
            </div>
        </div>
    </div>
  )
}

export default nevbar
