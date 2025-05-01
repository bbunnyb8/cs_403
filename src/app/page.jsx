import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/back_office/login')  // ✅ ต้องใช้ path นี้ตรงกับชื่อโฟลเดอร์
};