"use client";
import React from 'react' ;


import { FaCircleUser } from "react-icons/fa6";
import { MdBakeryDining } from "react-icons/md";
import Link from 'next/link'
import { useCart } from './cartcontext';
import { BsBasket2Fill } from "react-icons/bs";

function Navbar() { 
  const { cartItems, openCartModal } = useCart(); // << ดึง cartItems มาจาก context

  // คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  // คำนวณราคารวมของสินค้าในตะกร้า
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);


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
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={openCartModal}> {/* << เรียก openCartModal เมื่อคลิกที่ไอคอนตะกร้าหลัก */}
                <div className="indicator">
                  <BsBasket2Fill className="h-5 w-5" />
                  {totalItemsInCart > 0 && (
                    <span className="badge badge-sm indicator-item">{totalItemsInCart}</span>
                  )}
                </div>
              </div>            
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[100] mt-3 w-80 shadow">
                <div className="card-body">
                  {cartItems.length > 0 ? (
                    <div>
                      <span className="text-lg font-bold">{totalItemsInCart} Item{totalItemsInCart > 1 ? 's' : ''} in cart</span>
                      <div className="max-h-60 overflow-y-auto my-2 pr-2">
                        {cartItems.map(item => (                        
                          <div key={item.id} className="flex justify-between items-center mb-2 border-b pb-1">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity} x ฿{item.price.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="font-medium">฿{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='pt-2 pb-2'>
                          <span className="text-neutral">Subtotal: ฿{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="card-actions mt-2">
                        <button onClick={openCartModal} className="btn btn-primary btn-block">View cart</button> 
                      </div>

                    </div>
                  ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                  )}
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
  )
}

export default Navbar;
