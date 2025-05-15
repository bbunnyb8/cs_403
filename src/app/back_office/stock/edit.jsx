'use client'
import React, { useState } from 'react'
import { RiImageAddLine, RiEditBoxLine } from "react-icons/ri";

export default function Edit({ productId, productName, productPrice, productAmount, onEditSuccess }) {
  const [name, setName] = useState(productName || "");
  const [price, setPrice] = useState(productPrice || "");
  const [amount, setAmount] = useState(productAmount || "");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const modalId = `edit-modal-${productId}`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];ไไ
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
  console.log("Product ID being submitted:", productId); // ตรวจสอบค่าที่ส่งไป
  try {
    const formData = new FormData();
    formData.append("product_id", productId);
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

    // เรียก onEditSuccess เพื่อต้องการอัปเดตข้อมูลใน UI
    onEditSuccess(); // เรียกใช้ฟังก์ชันที่ส่งมาจาก StockLayout

    alert("อัปเดตสินค้าสำเร็จ");
    window.location.reload(); // โหลดหน้าใหม่เพื่อแสดงข้อมูลที่อัปเดต
  } catch (err) {
    console.error("Submit error:", err);
    alert("เกิดข้อผิดพลาดในการแก้ไขสินค้า");
  }
};
  return (
    <div className="relative">
      {/* ปุ่ม Edit */}
      <button
        className="btn btn-square btn-ghost"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        <RiEditBoxLine className="h-5 w-5 text-warning" />
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box max-w max-h flex flex-col">
          <form method="dialog">
            <h2 className="font-bold text-lg mb-2">Edit Product</h2>

            {/* Product ID (ถ้าต้องใช้เพิ่มในอนาคต) */}
            {/* Product ID */}
<div className="flex flex-col p-2">
  <label className="mb-1 font-medium">
    Product ID : <span className="font-normal">{productId}</span>
  </label>
</div>

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
            <div className="flex flex-col p-2">
              <label htmlFor={`edit-price-${productId}`} className="mb-1 font-medium">Price</label>
              <input
                id={`edit-price-${productId}`}
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
            <div className="flex flex-col p-2">
              <label htmlFor={`edit-amount-${productId}`} className="mb-1 font-medium">Amount</label>
              <input
                id={`edit-amount-${productId}`}
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
            <button className="btn btn-dash btn-error" onClick={() => document.getElementById(modalId).close()}>Cancel</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
