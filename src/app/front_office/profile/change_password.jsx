'use client'

import React from 'react'

export default function change_password() {

  return (
    <div>
        {/* ปุ่ม Save */}
          <div className="flex flex-col items-end mt-6">
            <button
            className="btn btn-outline btn-primary"
            onClick={() => document.getElementById("my_modal_5").showModal()}
            >
            Save
            </button>
          </div>

          {/* Modal */}
          <dialog id="my_modal_5" className="modal">
              <div className="card card-border bg-base-100 text-legend w-96">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Change Password</h2>
                  <p>You want to save the changed information.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">
                      Save
                    </button>
                    <button className="btn btn-ghost" onClick={() => document.getElementById("my_modal_5").close()}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
          </dialog>
    </div>
  )
}