import Link from 'next/link'
//icon
import { FaBoxOpen } from "react-icons/fa"; // order
import { FaStoreAlt } from "react-icons/fa"; // stock
import { IoPersonCircle } from "react-icons/io5";
import { BsFillPersonVcardFill } from "react-icons/bs"; // employee
import { IoMdLogOut } from "react-icons/io";

export default function Sidebar() {
  
  return (
    <div className='p-4 fixed h-full z-50'>
      <ul className="menu bg-base-100 rounded-box w-56 shadow-md ">
        <div className="p-6 flex items-center justify-center">
          <img src="/logo-full.png" alt="Logo" className="w-60" />
        </div>
        <li className='pl-2 pt-4 pb-4 pr-2' >
          <Link href="/back_office/order">
          <FaBoxOpen className='h-5 w-5' />
            Order
          </Link>
        </li>
       <label className='pl-2 pt-2 pb-2 pr-2 text-base-content/50'>MANAGEMENT</label>
       <li className='pl-2 pt-4 pb-2 pr-2' >
          <Link href="/back_office/stock">
          <FaStoreAlt className='h-5 w-5' />
            Stock
          </Link>
        </li>
        <li className='pl-2 pt-2 pb-2 pr-2' >
          <Link href="/back_office/customer_manage">
          <IoPersonCircle className='h-5 w-5' />
            Customer
          </Link>
        </li>
        <li className='pl-2 pt-2 pb-2 pr-2' >
          <Link href="/back_office/employee_manage">
          <BsFillPersonVcardFill className='h-5 w-5' />
            Employee
          </Link>
        </li>
        <label className='pl-2 pt-2 pb-2 pr-2 text-base-content/50'>OPTION</label>
        <li className='pl-2 pt-2 pb-2 pr-2 ' >
          <Link href="/back_office/login">
          <IoMdLogOut className='h-5 w-5' />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  )
}