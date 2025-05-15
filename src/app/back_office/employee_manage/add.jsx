'use client'
import React, { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Modal() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    birthday: '',
    phone: '',
    email: '',
    address: '',
    username: '',
    password: '',
    salary: '',
    status: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const employeeData = {
      name: `${formData.name} ${formData.lastname}`,
      email: formData.email,
      tel: formData.phone,
      salary: formData.salary || '0',
      status: formData.status || 'online',
    };

    try {
      const response = await fetch('/api/add-em', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('เพิ่มข้อมูลพนักงานเรียบร้อยแล้ว');
        document.getElementById("modal_add").close();
        window.location.reload();
      } else {
        console.error('Error:', data.error);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className="relative">
      <button
        className="btn btn-success"
        onClick={() => document.getElementById("modal_add").showModal()}
      >
        <IoIosAddCircleOutline className="h-5 w-5" />
        Add Employee
      </button>

      <dialog id="modal_add" className="modal">
        <div className="modal-box max-w max-h flex flex-col">
          <form method="dialog">
            <h2 className="font-bold text-lg mb-2">Add Employee</h2>
            <p className="py-2 pl-2">ID :</p>

            <p className="py-2 pl-2"><b>Personal Information</b></p>
            <div className="flex p-2 space-x-2">
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="input validator w-1/2" placeholder="name" />
              <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="input validator w-1/2" placeholder="last name" />
            </div>

            <div className="flex p-2">
              <input type="text" name="birthday" value={formData.birthday} onChange={handleChange} className="input validator w-1/2" placeholder="birthday" />
            </div>

            <p className="py-2 pl-2"><b>Contact Information</b></p>
            <div className="flex p-2 space-x-2">
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input validator w-1/2" placeholder="phone" />
              <input type="text" name="email" value={formData.email} onChange={handleChange} className="input validator w-1/2" placeholder="e-mail" />
            </div>

            <div className="flex p-2">
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="input validator w-full" placeholder="address" />
            </div>

            <p className="py-2 pl-2"><b>Login Information</b></p>
            <div className="flex p-2 space-x-2">
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="input validator w-1/2" placeholder="username" />
              <input type="text" name="password" value={formData.password} onChange={handleChange} className="input validator w-1/2" placeholder="password" />
            </div>

            <p className="py-2 pl-2"><b>Job Information</b></p>
            <div className="flex p-2 space-x-2">
              <div className="flex p-2 space-x-2">
  <input
    type="text"
    name="salary"
    value={formData.salary}
    onChange={handleChange}
    className="input validator w-1/2"
    placeholder="salary"
  />
  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    className="select select-bordered w-1/2"
  >
    <option value="">Select status</option>
    <option value="online">Online</option>
    <option value="offline">Offline</option>
  </select>
</div>


            </div>
          </form>

          <div className="flex flex-row justify-center p-4 gap-2">
            <button type="button" className="btn btn-success" onClick={handleSubmit}>OK</button>
            <button type="button" className="btn btn-outline border-base-300 text-base-content/70" onClick={() => document.getElementById("modal_add").close()}>Cancel</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
