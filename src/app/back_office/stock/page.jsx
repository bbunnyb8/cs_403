import Sidebar from '@/app/component/sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <h1>stock</h1>
    </div>
  )
}
