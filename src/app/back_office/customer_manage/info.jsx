'use client'
import React, { useState } from 'react'
import { RiImageAddLine, RiEditBoxLine } from "react-icons/ri";
import { RiEmojiStickerLine } from "react-icons/ri";

export default function Edit() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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
            <h2 className="font-bold text-lg mb-2">Edit Product</h2>

            {/* Product ID (ถ้าต้องใช้เพิ่มในอนาคต) */}
            <p className="py-2 pl-2">Product ID :</p>

            {/* อัปโหลดรูป */}
            <div className="flex items-center justify-center p-6">
              <label htmlFor="image-upload" className="cursor-pointer">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-md"
                  />
                ) : (
                  <RiImageAddLine className="h-40 w-40 text-gray-400" />
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Input: name */}
            <div className="flex p-2">
              <input
                type="text"
                className="input validator w-full"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Input: price */}
            <div className="flex p-2">
              <input
                type="number"
                className="input validator w-2/4"
                required
                placeholder="price"
                min="1"
                max="1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="pl-4 text-xs validator-hint text-gray-500">Must enter a number</p>
            </div>

            {/* Input: amount */}
            <div className="flex p-2">
              <input
                type="number"
                className="input validator w-2/4"
                required
                placeholder="amount"
                min="1"
                max="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="pl-4 text-xs validator-hint text-gray-500">Must enter a number</p>
            </div>
          </form>

          {/* ปุ่ม Submit & Cancel */}
          <div className="flex flex-row justify-end p-4 gap-2">
            <button className="btn btn-neutral btn-dash" onClick={handleSubmit}>Submit</button>
            <button className="btn btn-dash btn-error" onClick={() => document.getElementById("my_modal_4").close()}>Cancel</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
