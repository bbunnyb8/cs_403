import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/back_office')  // ✅ ต้องใช้ path นี้ตรงกับชื่อโฟลเดอร์
};