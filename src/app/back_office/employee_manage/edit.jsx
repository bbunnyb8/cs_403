'use client'
import React, { useState } from 'react'
import { RiEditBoxLine } from "react-icons/ri";

export default function Edit({ employee }) {
  const [name, setName] = useState(employee?.Name || "");
  const [email, setEmail] = useState(employee?.Email || "");
  const [tel, setTel] = useState(employee?.TEL || "");
  const [salary, setSalary] = useState(employee?.Salary || "");
  const [status, setStatus] = useState(employee?.Status || "");

  const dialogId = `modal_edit_${employee?.ID}`;

  const openModal = () => {
    document.getElementById(dialogId).showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/edit-em", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ID: employee.ID,
          Name: name,
          Email: email,
          TEL: tel,
          Salary: salary,
          Status: status
        }),
      });

      if (!res.ok) throw new Error("Failed to update employee");

      alert("อัปเดตข้อมูลสำเร็จ");
      document.getElementById(dialogId).close();
      window.location.reload();
    } catch (err) {
      console.error("Submit error:", err);
      alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูลพนักงาน");
    }
  };



  return (
    <div className="relative">
      <button className="btn btn-square btn-ghost" onClick={openModal}>
        <RiEditBoxLine className="h-5 w-5 text-warning" />
      </button>

      <dialog id={dialogId} className="modal">
        <div className="modal-box max-w-md flex flex-col">
          <form onSubmit={handleSubmit}>
            <h2 className="font-bold text-lg mb-2">Edit employee</h2>
            <p className="py-2 pl-2">ID : <span className="font-semibold">{employee?.ID}</span></p>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                className="input"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="input"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                className="input"
                placeholder="Phone"
                value={tel}
                onChange={e => setTel(e.target.value)}
                required
              />
              <input
                type="number"
                className="input"
                placeholder="Salary"
                value={salary}
                onChange={e => setSalary(e.target.value)}
                required
              />
              <select
                className="input"
                value={status}
                onChange={e => setStatus(e.target.value)}
                required
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>

            <div className="flex flex-row justify-end p-4 gap-2">
              <button type="submit" className="btn btn-success">Submit</button>
              <button type="button" className="btn btn btn-outline border-base-300 text-base-content/70" onClick={() => document.getElementById(dialogId).close()}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
