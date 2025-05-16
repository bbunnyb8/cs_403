'use client'

import React from 'react'

export default function change_profile() {

  return (
    <div>
        {/* ปุ่ม Save */}
          <div className="flex flex-col items-end mt-6">
            <button
            className="btn btn-outline btn-primary"
            onClick={() => document.getElementById("my_modal_4").showModal()}
            >
            Save
            </button>
          </div>

          {/* Modal */}
          <dialog id="my_modal_4" className="modal">
              <div className="card card-border bg-base-100 text-legend w-96">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Change Profile</h2>
                  <p>You want to save the changed information.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary"> {/* ใช้ฟังก์ชันปิด Modal ของ General Information */}
                      Save
                    </button>
                    <button className="btn btn-ghost" onClick={() => document.getElementById("my_modal_4").close()}> {/* ใช้ฟังก์ชันปิด Modal ของ General Information */}
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
          </dialog>
    </div>
  )
}