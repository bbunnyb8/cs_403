'use client'
import React, { useState } from 'react'
import { RiImageAddLine, RiEditBoxLine } from "react-icons/ri";

export default function Edit() {
  const [product_name, setProduct_name] = useState("");
  const [amount, setAmount] = useState("");
  const [total_price, setTotal_Price] = useState("");
  const [status, setStatus] = useState("");
  const [customer_name, setCustomer_name] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");

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
      {/* ปุ่ม Edit */}
      <button
        className="btn btn-square btn-ghost"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        <RiEditBoxLine className="h-5 w-5 text-warning" />
      </button>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box max-w max-h flex flex-col">
          <form method="dialog">
            <h2 className="font-bold text-lg mb-2">Edit Order</h2>

            {/* Product ID (ถ้าต้องใช้เพิ่มในอนาคต) */}
            <p className="py-2 pl-2">Order ID :</p>

            {/* Input: name */}
            {/* fieldset order item */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-2">
              <legend className="fieldset-legend">Order item</legend>
              <div className='flex flex-row'>
                <div className="p-1 w-6/10">
                  <label className="label pb-1">product name</label>
                  <input
                    type="text"
                    className="input"
                    value={product_name}
                    onChange={(e) => setProduct_name(e.target.value)}
                    required
                    readOnly
                  />
                </div>
                <div className="p-1 w-4/10">
                  <label className="label pb-1">amount</label>
                  <input
                    type="text"
                    className="input "
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    readOnly
                  />
                </div>
              </div>
              <div className='flex flex-row'>
                <div className="flex flex-col p-1 w-6/10">
                  <label className="label pb-1">total price</label>
                  <input
                    type="text"
                    className="input"
                    value={total_price}
                    onChange={(e) => setTotal_Price(e.target.value)}
                    required
                    readOnly
                  />
                </div>
                {/* ฝาก setvalue ให้ status ด้วยนะ */}
                <div className="flex flex-col p-1 w-4/10">
                  <label className="label pb-1">status</label>
                  <select defaultValue={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="select">
                    <option>pending</option>
                    <option>shipped</option>
                    <option>in transit</option>
                  </select>
                </div>
              </div>
            </fieldset>
            {/* Input: price */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-2">
              <legend className="fieldset-legend">Customer information</legend>
              
                <div className="flex flex-col p-1 w-full">
                  <label className="label pb-1">name</label>
                  <input
                    type="text"
                    className="input w-6/10"
                    value={customer_name}
                    onChange={(e) => setCustomer_name(e.target.value)}
                    required
                    readOnly
                  />
                </div>
                <div className="flex flex-col p-1 w-full">
                  <label className="label pb-1">tel</label>
                  <input
                    type="text"
                    className="input w-6/10"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    required
                    readOnly
                  />
                </div>
                <div className="flex flex-col p-1 w-full">
                  <label className="label pb-1">address</label>
                  <textarea
                    type="text"
                    className="input w-6/10 h-20 p-3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    readOnly
                  />
                </div>
            </fieldset>
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
