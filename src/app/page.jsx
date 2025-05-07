'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENTRY === 'front_office') {
      router.replace('/front_office/login');
    } else if (process.env.NEXT_PUBLIC_ENTRY === 'back_office') {
      router.replace('/back_office/order');
    }
  }, [router]);

  return null;
}