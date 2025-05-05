'use client'

import Sidebar from '@/app/component/sidebar'
import Modal from './modal'

export default function Layout({ children }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className='flex items-center p-90'>
      <Modal />
      </div>
    </div>
  )
}


