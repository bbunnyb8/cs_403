'use client'

import React from 'react'
import Navbar from '@/app/component/navbar'
import Change_profile from './change_profile'; 
import Change_password from './change_password'; 

function Page() {

  return (
    <div className='flex flex-col p-2'>
        <div className="w-full p-2">
          <h1 className="text-3xl font-bold pl-90">Profile</h1>
            {/* Input: name , lastname , birthday , phone , email , address  */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 mx-auto">
              <legend className="fieldset-legend">General Information</legend>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="label pb-1">Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your Name"
                    />
                </div>
                <div className="flex flex-col">
                  <label className="label pb-1">Tel</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your Tel"
                    />
                </div>
                <div className="flex flex-col">
                  <label className="label pb-1">E-Mail</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your E-mail"
                    />
                </div>
                <div className="flex flex-col">
                  <label className="label pb-1">Address</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your Address"
                    />
                </div>
              </div>

            <Change_profile/>

            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 mx-auto">
              <legend className="fieldset-legend">Password Information</legend>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="label pb-1">Password</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your Password"
                    />
                </div>
                <div className="flex flex-col">
                  <label className="label pb-1">Confirm Password</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your Confirm Password"
                    />
                </div>
              </div>

            <Change_password/>
            
            </fieldset>
    </div>
    </div>
  )
}
export default Page;