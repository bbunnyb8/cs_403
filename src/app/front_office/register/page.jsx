'use client'
import { useState } from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { MdEmail } from "react-icons/md";
import Navbar from '@/app/component/navbar'
import Link from 'next/link'
import Change_login from '@/app/component/change_login'

export default function LoginPage() {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const router = useRouter()
  
  // const handleLogin = async (e) => {
  //   e.preventDefault()
  
  //   const res = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username, password }),
  //   })
  
  //   if (!res.ok) {
  //     alert('Login ไม่สำเร็จ')
  //     return
  //   }
  
  //   const data = await res.json()
  
  //   if (data.success) {
  //     alert('Login สำเร็จ')
  //     router.push('/back_office/order')
  //   } else {
  //     alert('Login ไม่สำเร็จ')
  //   }
  // }

  return (
    <div className='flex flex-col p-4'>
      <Navbar />    
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm p-8 rounded-lg">
        {/* Register Form */}
            <Change_login />
        <h2 className="text-center text-xl font-semibold mb-4">register</h2>
        {/* <form onSubmit={handleLogin} className="space-y-4"> */}
          <label className="input input-bordered flex items-center gap-2 mt-5">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              className="grow"
              placeholder="full-name"
              // required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-5">
            <MdEmail className="text-gray-400" />
            <input
              type="password"
              className="grow"
              placeholder="email"
              // required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-5">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              className="grow"
              placeholder="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              // required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-5">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              className="grow"
              placeholder="re-password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              // required
            />
          </label>
          <div className="flex flex-col items-center mt-6">
            <button className="btn btn-outline btn-error btn-lg">register</button>
          </div>
        {/* </form> */}
      </div>
    </div>
  </div>
  )
}