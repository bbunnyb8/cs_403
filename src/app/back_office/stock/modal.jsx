'use client'
import React, { useState } from 'react';
// icon
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";

export default function Modal() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
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
        alert('เพิ่มสินค้าสำเร็จแล้ว'); // แจ้งเตือนหลังอัพเดทเสร็จ
        document.getElementById("my_modal_4").close();
        window.location.reload();
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
        className="btn btn-success"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        <IoIosAddCircleOutline className="h-5 w-5" />
        Add Product
      </button>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box max-w max-h flex flex-col">
          <form onSubmit={handleSubmit}>
            <h2 className="font-bold text-lg mb-2">Add Product</h2>

            <p className="py-2 pl-2">Product ID :</p>

            {/* Name */}
            <div className="p-2">
              <label className="label pb-1">product name</label>
              <input
                type="text"
                className="input validator w-full"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Price */}
            <div className="p-2">
              <label className="label pb-1">price</label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="input validator w-2/4"
                  placeholder="price"
                  min="1"
                  max="1000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <p className="pl-4 text-xs text-gray-500">Must enter a number</p>
              </div>
            </div>

            {/* Amount */}
            <div className="p-2">
              <label className="label pb-1">amount</label>
              <div className="flex items-center">
              <input
                type="number"
                className="input validator w-2/4"
                placeholder="amount"
                min="1"
                max="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
                <p className="pl-4 text-xs text-gray-500">Must enter a number</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-row justify-end p-4 gap-2">
              <button type="submit" className="btn btn-success">Submit</button>
              <button
                type="button"
                className="btn btn-outline border-base-300 text-base-content/70"
                onClick={() => document.getElementById("my_modal_4").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
