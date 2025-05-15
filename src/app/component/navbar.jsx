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

                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                        <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                        <span className="text-lg font-bold">8 Items</span>
                        <span className="text-neutral">Subtotal: ฿500</span>
                        <div className="card-actions">
                            <button className="btn btn-warning btn-block">View cart</button>
                        </div>
                        </div>
                    </div>
                    </div>

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
    </div>
  )
}

export default nevbar
