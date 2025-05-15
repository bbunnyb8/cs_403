import React from 'react'
import Link from 'next/link'

function change_login() {
  return (
    <div className="flex justify-center join join-horizontal lg:join-horizontal p-4">
        <Link href={"/front_office/login"}>
        <button className="btn btn-neutral btn-soft join-item ">Login</button>
        </Link>
        <Link href={"/front_office/register"}>
        <button className="btn btn-neutral btn-soft join-item">Register</button>
        </Link>
    </div>
  )
}

export default change_login