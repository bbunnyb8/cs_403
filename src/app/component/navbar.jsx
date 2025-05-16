"use client";
import React from 'react' ;

import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdBakeryDining } from "react-icons/md";
import Link from 'next/link'
import { useCart } from './cartcontext';

function Navbar() { 
  const { cartItems, openCartModal } = useCart(); // << ดึง cartItems มาจาก context

  // คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  // คำนวณราคารวมของสินค้าในตะกร้า
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-xl ">
      <div className='navbar p-2'>
        <div className="navbar-start">
          <img src="/logo.png" alt="Logo" className="w-10" />
          <ul className='menu menu-horizontal'>
            <Link href={"/front_office/home"}>
              <li className='pl-3'> <button className="btn btn-ghost"><MdBakeryDining className='h-8 w-8' />Home</button> </li>
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
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={openCartModal}> {/* << เรียก openCartModal เมื่อคลิกที่ไอคอนตะกร้าหลัก */}
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                  {totalItemsInCart > 0 && (
                    <span className="badge badge-sm indicator-item">{totalItemsInCart}</span>
                  )}
                </div>
              </div>            
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[100] mt-3 w-64 shadow">
                <div className="card-body">
                  {cartItems.length > 0 ? (
                    <>
                      <span className="text-lg font-bold">{totalItemsInCart} Item{totalItemsInCart > 1 ? 's' : ''} in cart</span>
                      <div className="max-h-60 overflow-y-auto my-2 pr-2">
                        {cartItems.map(item => (                        
                          <div key={item.id} className="flex justify-between items-center mb-2 border-b pb-1">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity} x ฿{item.price.toFixed(2)}</p>
                            </div>
                            <p className="font-medium">฿{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <span className="text-neutral">Subtotal: ฿{subtotal.toFixed(2)}</span>
                      <div className="card-actions mt-2">
                        <button onClick={openCartModal} className="btn btn-primary btn-block">View cart</button> 
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                  )}
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

export default Navbar;
