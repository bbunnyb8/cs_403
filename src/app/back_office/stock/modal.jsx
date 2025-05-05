'use client'
import React from 'react'
// icon
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";

import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function modal() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [amount, setAmount] = useState('')
    
    
  return (
    <div className='relative '>
        {/* add button on page */}
        <button className="btn btn-active btn-accent" onClick={()=>document.getElementById('my_modal_4').showModal()}>
        <IoIosAddCircleOutline className='h-5 w-5' />
            Add Product
        </button>
        
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-4/8 max-w h-6/8 max-h-xl flex flex-col">
                <form method="dialog">
                <h2 className="font-bold text-lg">Add Product</h2>
                
                <p className="py-4 pl-4 ">Product ID : </p>
                {/* img */}
                <div className='flex items-center justify-center items-center '>
                    <RiImageAddLine className='h-40 w-40'/>
                </div>
                {/* input name */} 
                <div className='flex p-4'>
                    <input type="text" className="input validator w-full" placeholder="name" value={name} 
                    onChange={(e) => setName(e.target.value)} required/>
                </div>
                {/* input price */}
                <div className='flex p-4'>
                    <input type="number" className="input validator w-2/4" required placeholder="price" 
                        min="1" max="1000"
                        title="Must be enter the number" 
                        value={price} onChange={(e) => setPrice(e.target.value)} /> 
                    <p className="pl-4 validator-hint">Must be enter the number</p>
                </div>
                
                {/* input amount */}
                <div className='flex p-4'>
                    <input type="number" className="input validator w-2/4" required placeholder="amount" 
                        min="1" max="1000"
                        title="Must be enter the number" 
                        value={amount} onChange={(e) => setAmount(e.target.value)} /> 
                    <p className="pl-4 validator-hint">Must be enter the number</p>
                </div>
                </form>
                <div className='absolute flex p-4 right-0 bottom-0'>
                    <div className='flex pt-4 '>
                        <button className="btn btn-neutral btn-dash">Submit</button>
                    </div>
                
                    <div className='flex p-4 '>
                        <button className="btn btn-dash btn-error" 
                        onClick={() => document.getElementById('my_modal_4').close()}>
                        Cancle
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
  )
}

