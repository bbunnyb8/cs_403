import React from 'react'
import { BiHome } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";

function nevbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="navbar-start">
        <img src= "/logo-full.png" alt="Logo" className="w-20" />
        <button className="btn btn-ghost"><BiHome />Home</button>
    </div>

    <div className="navbar-end">
        <button className="btn">
            <IoMdSearch type="search" className="grow" placeholder="Search"/>
        <input type="search" className="grow" placeholder="Search" />
        </button>
        <button className="btn btn-ghost btn-circle">
            <FaUser />
        </button>
    </div>
    </div>
  )
}

export default nevbar
