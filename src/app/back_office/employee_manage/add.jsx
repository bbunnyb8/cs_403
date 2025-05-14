'use client'
import React, { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";



export default function Modal() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      price: price,
      amount: amount,
    };

    try {
      const response = await fetch('/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Product added successfully:', data);
        document.getElementById("my_modal_4").close();
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="relative">
      <button
        className="btn btn-accent"
        onClick={() => document.getElementById("modal_add").showModal()}
      >
        <IoIosAddCircleOutline className="h-5 w-5" />
        Add Employee
      </button>

        <dialog id="modal_add" className="modal">
          <div className="modal-box max-w max-h flex flex-col">
            <form method="dialog">
              <h2 className="font-bold text-lg mb-2">Add employee</h2>
              <p className="py-2 pl-2">ID :</p>
  
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                <legend className="fieldset-legend">Personal Information</legend>
                <div className="flex flex-row gap-4">
                  <div className="form-control">
                    <label className="label">First Name</label>
                    <input type="text" className="input w-full" placeholder="Enter your First name" />
                  </div>
                  <div className="form-control">
                    <label className="label">Last Name</label>
                    <input type="text" className="input w-full" placeholder="Enter your Last name" />
                  </div>
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Birth Date</span>
                  </label>
                  <input type="date" className="input input-bordered w-full" />
                </div>
              </fieldset>

                          {/* ช่องข้อมูลติดต่อ */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
              <legend className="fieldset-legend">Contact Information</legend>
              <div className="flex flex-row gap-4">
                <div className="form-control">
                  <label className="label">phone</label>
                  <input type="text" className="input w-full" placeholder="Enter your phone" />
                </div>
                <div className="form-control">
                  <label className="label">E-mail</label>
                  <input type="text" className="input w-full" placeholder="Enter your E-mail" />
                </div>
              </div>
              <div className="form-control mt-4">
                <label className="label">address</label>
                <textarea placeholder="address" className="textarea textarea-xs w-full"></textarea>
              </div>
             </fieldset>
                {/* ช่องUsername Password */}
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                <legend className="fieldset-legend">Login Information</legend>
                <div className="flex flex-row gap-4">
                  <div className="form-control">
                    <label className="label">username</label>
                    <input type="text" className="input w-full" placeholder="Enter your username" />
                  </div>
                  <div className="form-control">
                    <label className="label">password</label>
                    <input type="text" className="input w-full" placeholder="Enter your password" />
                  </div>
                </div>
              </fieldset>
            </form>

              {/* ปุ่มsumbit and canel */}
              <div className="flex flex-row justify-end p-4 gap-2">
                <button type="submit" className="btn btn-neutral btn-dash">Submit</button>
                <button
                  type="button"
                  className="btn btn-dash btn-error"
                  onClick={() => document.getElementById("modal_add").close()}
                >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
  );
}
