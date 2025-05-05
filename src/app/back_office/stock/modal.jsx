'use client'
import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { useRouter } from 'next/navigation'

function modal() {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [amount, setAmount] = useState('')
    const router = useRouter()
    const handleAdd_product = (e) => {
        e.preventDefault()
        // TODO: เชื่อม API login ตรงนี้
        alert(`Logging in as ${name}`)
    
        router.push('/back_office/stock')
  return (
    <div className='relative items-center'>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <button className="btn btn-active btn-accent" onClick={()=>document.getElementById('my_modal_4').showModal()}>
        <IoIosAddCircleOutline className='h-5 w-5' />
            Add Product
        </button>
        
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-xl h-8/10 max-h-xl ">
                <h2 className="font-bold text-lg">Add Product</h2>
                <p className="py-4">Click the button below to close</p>
                
                            <input type="password" className="grow" placeholder="password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} required/>
                

                <div className="modal-action">
                    <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
  )
}

export default modal