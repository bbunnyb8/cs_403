'use client'
import { useState } from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  
  const handleLogin = async (e) => {
    e.preventDefault()
  
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
  
    if (!res.ok) {
      alert('Login ไม่สำเร็จ')
      return
    }
  
    const data = await res.json()
  
    if (data.success) {
      alert('Login สำเร็จ')
      router.push('/back_office/order')
    } else {
      alert('Login ไม่สำเร็จ')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white ">
      <div className="w-full max-w-sm p-8 rounded-lg bg-white">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo-full.png" alt="Logo" className="w-40 h-18 mb-2" />
        </div>

        {/* Login Form */}
          {/* change button */}
          <div className="flex justify-center join join-vertical lg:join-horizontal">
            <Link href={"/front_office/login"}>
            <button className='btn btn-secondary join-item'>Login</button>
            </Link>
            <Link href={"/front_office/register"}>
            <button className='btn btn-secondary join-item'>Register</button>
            </Link>
          </div>
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="input input-bordered flex items-center gap-2 mt-5">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              className="grow"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-5">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              className="grow"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="flex flex-col items-center mt-6">
            <button type="submit" className="btn btn-lg  btn-outline btn-error w-40">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}