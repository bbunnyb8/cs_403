import Sidebar from '@/app/component/sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <h1>employee manage</h1>
    </div>
  )
}
