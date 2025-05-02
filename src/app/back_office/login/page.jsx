'use client'
import { useState } from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  
  const handleLogin = (e) => {
    e.preventDefault()
    // TODO: เชื่อม API login ตรงนี้
    alert(`Logging in as ${username}`)

    router.push('/back_office/order')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white ">
      <div className="w-full max-w-sm p-8 rounded-lg bg-white">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo-full.png" alt="Logo" className="w-40 h-18 mb-2" />
        </div>

        {/* Login Form */}
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="input input-bordered flex items-center gap-2">
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
          <label className="input input-bordered flex items-center gap-2">
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
            <button type="submit" className="btn btn-lg btn-secondary w-full">
              Login
            </button>
        </form>
      </div>
    </div>
  )
}