'use client'
import React, { useState, useEffect } from 'react'
import { RiEditBoxLine } from "react-icons/ri";

export default function Edit({ order }) {
  const [product_name, setProduct_name] = useState(order.product_name || "");
  const [amount, setAmount] = useState(order.total_amount || "");
  const [total_price, setTotal_Price] = useState(order.total_price || "");
  const [status, setStatus] = useState(order.status || "in progress");
  const [customer_name, setCustomer_name] = useState(order.customer_name || "");
  const [tel, setTel] = useState(order.tel || "");
  const [address, setAddress] = useState(order.address || "");

  

useEffect(() => {
  if (order.user_id) {
    console.log(order.user_id)
    fetch(`/api/user/${order.user_id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCustomer_name(data.name || "")
        setTel(data.tel || "")
        setAddress(data.address || "")
      })
  }
}, [order.user_id])



  const openModal = () => {
    document.getElementById(`modal_edit_${order.order_id}`).showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("order_id", order.order_id);
      formData.append("status", status);

      const res = await fetch("/api/edit-order", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update order");

      alert("อัปเดตสถานะสำเร็จ");
      document.getElementById(`modal_edit_${order.order_id}`).close();
      window.location.reload();
    } catch (err) {
      console.error("Submit error:", err);
      alert("เกิดข้อผิดพลาดในการแก้ไขออเดอร์");
    }
  };

  const overallAmount = order.items && order.items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const overallTotalPrice = order.items && order.items.reduce((sum, item) => sum + (item.total_price || 0), 0);

  return (
    <div className="relative">
      <button className="btn btn-square btn-ghost" onClick={openModal}>
        <RiEditBoxLine className="h-5 w-5 text-warning" />
      </button>

      <dialog id={`modal_edit_${order.order_id}`} className="modal">
        <div className="modal-box max-w-md flex flex-col">
          <form onSubmit={handleSubmit}>
            <h2 className="font-bold text-lg mb-2">Order</h2>
            {/* แสดง Order ID หากต้องการ */}
            {/* <p className="py-2 pl-2">Order ID : {order.order_id}</p> */}
            
            {/* Table for order items based on Screenshot */}
            <div className="rounded-lg p-1 mb-4"> {/* ลด padding และ margin bottom */}
              <table className="table table-sm w-full table-auto"> {/* ใช้ table-sm ให้กระชับขึ้น */}
                <thead>
                    <tr className="text-center">
                      <th className="w-10 px-1 font-normal">No.</th>
                      <th className="px-1 text-left font-normal">Name</th>
                      <th className="w-20 px-1 font-normal">Price</th>
                      <th className="w-20 px-1 font-normal">Amount</th>
                      <th className="w-20 px-1 font-normal">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ตรวจสอบว่า order.items มีค่าและเป็น array ก่อน map */}
                    {order.items && order.items.map((item, idx) => (
                      <tr key={idx} className="text-center">
                        <td className="px-1">{idx + 1}</td>
                        <td className="px-1 text-left">{item.product_name}</td>
                        <td className="px-1">{item.price}</td>
                        <td className="px-1">{item.amount}</td>
                        <td className="px-1">{item.total_price}</td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>

            {/* Display Overall Amount and Total Price */}
            <hr className="my-2" />
            <div className="flex justify-end items-center mt-2 mb-1 pr-2"> {/* ปรับ margin/padding */}
                <div className="text-right">
                    <p className="text-sm">Amount: <span className="font-semibold">{overallAmount}</span></p>
                    <p className="text-base font-bold">Total: <span className="font-semibold">฿{overallTotalPrice}</span></p> {/* เพิ่ม B หรือสกุลเงินตามต้องการ */}
                </div>
            </div>
            
            {/* Status (อาจจะย้ายไปส่วนอื่น หรือคงไว้ถ้ายังต้องการแก้ไข) */}
            {/* ถ้าไม่ต้องการแสดง status ในส่วนนี้ สามารถย้าย <fieldset> ที่เกี่ยวข้องกับ status ออกไปได้ */}
            <div className='flex flex-col p-1 mt-2 w-1/2, md:w-1/3 ml-auto'>
              <label className="label pb-1 text-sm">
                <span className="label-text">Status</span> {/* ใช้ label-text ของ DaisyUI */}
              </label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="select ">
                <option value="in progress">in progress</option>
                <option value="success">success</option>
              </select>
            </div>
            
            {/* Customer Information (ถ้าไม่ต้องการแสดงในส่วนนี้ ให้ลบออก) */}
            {/* <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-2 mt-4">...</fieldset> */}

            <div className="flex flex-row justify-end p-4 gap-2 mt-4"> {/* อาจจะต้องปรับ mt-4 */}
              <button type="submit" className="btn btn-neutral btn-success">Submit</button>
              <button type="button" className="btn btn-outline border-base-300 text-base-content/70" onClick={() => document.getElementById(`modal_edit_${order.order_id}`).close()}>Cancel</button>
            </div>
          </form>       
        </div>
      </dialog>
    </div>
  );
}
