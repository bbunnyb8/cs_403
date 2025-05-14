'use client'
import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiImageAddLine, RiEditBoxLine } from "react-icons/ri";

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

      document.getElementById("my_modal_4").close(); // ปิด modal
    } catch (err) {
      console.error("Submit error:", err);
      alert("เกิดข้อผิดพลาดในการแก้ไขสินค้า");
    }
  };

   return (
      <div className="relative">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          <RiEditBoxLine className="h-5 w-5 text-warning" />
        </button>
  
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box max-w max-h flex flex-col">
            <form method="dialog">
              <h2 className="font-bold text-lg mb-2">Edit employee</h2>
              <p className="py-2 pl-2">ID :</p>
  
              <p className="py-2 pl-2"><b>Personal Information</b></p>
              {/* Input: name and last name */}
              <div className="flex p-2 space-x-2">
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="name"
                />
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="last name"
                />
              </div>
  
              {/* Input: birthday */}
              <div className="flex p-2">
                <input
                  type="text"
                  className="input validator w-1/2"
                  placeholder="birthday"
                />
              </div>
  
              <p className="py-2 pl-2"><b>Contact Information</b></p>
              {/* Input: phone and email */}
              <div className="flex p-2 space-x-2">
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="phone"
                />
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="e-mail"
                />
              </div>
  
              {/* Input: address */}
              <div className="flex p-2">
                <input
                  type="text"
                  className="input validator w-full"
                  placeholder="address"
                />
              </div>
  
            <p className="py-2 pl-2"><b>Login Information</b></p>
              {/* Input: username and password */}
              <div className="flex p-2 space-x-2">
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="username"
                />
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="password"
                />
              </div>
            </form>
  
            {/* ปุ่ม OK */}
            <div className="flex flex-row justify-center p-4 gap-2">
                            <button
                  type="button"
                  className="btn btn-dash btn-success"
                  onClick={() => document.getElementById("my_modal_4").close()}
                >
                  OK
                </button>
            </div>
          </div>
        </dialog>
      </div>
  );
}
