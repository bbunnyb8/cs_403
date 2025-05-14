'use client'
import React, { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { RiImageAddLine, RiEditBoxLine } from "react-icons/ri";
import DatePicker from "react-datepicker";

export default function Edit() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("amount", amount);
      if (image) formData.append("image", image);

      const res = await fetch("/api/edit-product", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update product");

      const data = await res.json();
      console.log("Success:", data);

      document.getElementById("my_EditEmploy").close(); // ปิด modal
    } catch (err) {
      console.error("Submit error:", err);
      alert("เกิดข้อผิดพลาดในการแก้ไขสินค้า");
    }
  };

   return (
      <div className="relative">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => document.getElementById("my_EditEmploy").showModal()}
        >
          <RiEditBoxLine className="h-5 w-5 text-warning" />
        </button>
  
        <dialog id="my_EditEmploy" className="modal">
          <div className="modal-box max-w max-h flex flex-col">
            <form method="dialog">
              <h2 className="font-bold text-lg mb-2">Edit Employee</h2>
              <p className="py-2 pl-2">ID :</p>
  
            {/* ช่องข้อมูลส่วนตัว */}
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
                onClick={() => document.getElementById("my_EditEmploy").close()}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
  );
}
