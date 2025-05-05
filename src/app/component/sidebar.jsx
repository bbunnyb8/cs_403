
import Link from 'next/link'
export default function Sidebar() {
  
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>

      <div className="drawer-side shadow-xl base-100">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="p-6 flex items-center justify-center">
              <img src="/logo-full.png" alt="Logo" className="w-60" />
          </div>

          <li className='p-2'><Link href="/back_office/order">Order</Link></li>
          <li className='p-4'>MANAGEMENT</li>
          <li className='p-2'><Link href="/back_office/stock">Stock</Link></li>
          <li className='p-2'><Link href="/back_office/customer_manage">Customer</Link></li>
          <li className='p-2'><Link href="/back_office/employee_manage">Employee</Link></li>
          <li className='p-2'><Link href="/back_office/login">Logout</Link></li>
        </ul>
      </div>
    </div>
  )
}
