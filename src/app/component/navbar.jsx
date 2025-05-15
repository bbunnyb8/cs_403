import React from 'react'


import { FaCircleUser } from "react-icons/fa6";
import { MdBakeryDining } from "react-icons/md";
import Link from 'next/link'
import { BsBasket2Fill } from "react-icons/bs";

function nevbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-xl ">
        <div className=' navbar p-2'>
            <div className="navbar-start">
                
                <ul className='menu menu-horizontal'>
                    <Link href={"/front_office/home"}>
                    <li > <button className="btn btn-ghost"><MdBakeryDining className='h-8 w-8'/>Home</button> </li>
                    </Link>
                </ul>
            </div>
            <div className='navbar-center'>
                <img src= "/logo-full.png" alt="Logo" className="w-30" />
            </div>

            <div className="navbar-end gap-4">
                

                <div className="flex flex-row gap-2">
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <BsBasket2Fill className="h-5 w-5" />
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                        <span className="text-lg font-bold">8 Items</span>
                        <span className="text-base-content/70">Subtotal: ฿500</span>
                        <div className="card-actions">
                            <button className="btn btn-neutral btn-block">View cart</button>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="indicator">
                                <FaCircleUser className="h-5 w-5" />
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
                            <Link href={"/front_office/my_order"} className="justify-between">
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
