'use client'
import React, { useState } from 'react'
import { RiEmojiStickerLine } from "react-icons/ri";

export default function Info() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

      document.getElementById("my_modal_4").close(); // ปิด modal
    } catch (err) {
      console.error("Submit error:", err);
      alert("เกิดข้อผิดพลาดในการแก้ไขสินค้า");
    }
  };

  return (
    <div className="relative">
      {/* ปุ่ม Info */}
      <button
        className="btn btn-square btn-ghost"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        <RiEmojiStickerLine className="h-5 w-5 text-info-content" />
      </button>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box max-w max-h flex flex-col">
          <form method="dialog">
            <h2 className="font-bold text-lg mb-2">View Customer</h2>
            <p className="py-2 pl-2">Customer ID :</p>

            {/* Input: name , lastname */}
            <fieldset className="fieldset bg-base-200 border-base-300 flex p-2 space-x-2 flex-wrap bg-base-200">
              <legend className="fieldset-legend">Personal Information</legend>

              <div className="flex flex-col">
                <label className="label pb-1">name</label>
                <input 
                type="text" 
                className="input"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                readOnly/>
              </div>

              <div className="flex flex-col">
                <label className="label pb-1">last name</label>
                <input 
                type="text" 
                className="input" 
                value={lastname} 
                onChange={(e) => setLastname(e.target.value)}
                readOnly/>
              </div>

              <div className="flex flex-col">
                <label className="label pb-1">birthday</label>
                <input 
                type="text" 
                className="input" 
                value={birthday} 
                onChange={(e) => setBirthday(e.target.value)}
                readOnly/>
              </div>
            </fieldset>

            {/* Input: phone , email , address */}
            <fieldset className="fieldset bg-base-200 border-base-300 flex p-2 space-x-2 flex-wrap">
              <legend className="fieldset-legend">Contact Information</legend>

              <div className="flex flex-col">
                <label className="label pb-1">phone</label>
                <input 
                type="text" 
                className="input" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}                
                readOnly/>
              </div>

              <div className="flex flex-col">
                <label className="label pb-1">e-mail</label>
                <input 
                type="text" 
                className="input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}                
                readOnly />
              </div>

              <div className="flex flex-col">
                <label className="label pb-1">address</label>
                <textarea 
                type="text" 
                className="textarea textarea-xl p-3" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}                
                readOnly/>
              </div>
            </fieldset>

            {/* Input: username password */}
            <fieldset className="fieldset bg-base-200 border-base-300 flex p-2 space-x-2 flex-wrap bg-base-200">
              <legend className="fieldset-legend">Personal Information</legend>

              <div className="flex flex-col">
                <label className="label pb-1">username</label>
                <input 
                type="text" 
                className="input" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}                
                readOnly/>
              </div>

              <div className="flex flex-col">
                <label className="label pb-1">password</label>
                <input 
                type="text" 
                className="input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}                
                readOnly/>
              </div>
            </fieldset>

          </form>

          {/* ปุ่ม OK */}
          <div className="flex flex-row justify-end p-4 gap-2">
                          <button
                type="button"
                className="btn btn-dash btn-error"
                onClick={() => document.getElementById("my_modal_4").close()}
              >
                Cancel
              </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}