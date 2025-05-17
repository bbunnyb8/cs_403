'use client'
import React, { useState, useEffect } from 'react'
import { RiEditBoxLine } from "react-icons/ri";

export default function Edit({ order }) {
  const [product_name, setProduct_name] = useState(order.product_name || "");
  const [amount, setAmount] = useState(order.amount || "");
  const [total_price, setTotal_Price] = useState(order.total_price || "");
  const [status, setStatus] = useState(order.status || "in progress");
  const [customer_name, setCustomer_name] = useState(order.customer_name || "");
  const [tel, setTel] = useState(order.tel || "");
  const [address, setAddress] = useState(order.address || "");


  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


    useEffect(() => {
      fetch('/api/order') // <-- แก้ path ตาม API ที่คุณทำไว้
        .then((res) => res.json())
        .then((data) => {
          setStockData(data);
          setFilteredData(data); // แสดงทั้งหมดก่อนกรอง
        })
        .catch((err) => console.error('Error fetching stock data:', err));
    }, []);


// useEffect(() => {
//   if (order.user_id) {
//     console.log(order.user_id)
//     fetch(`/api/user/${order.user_id}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         setCustomer_name(data.name || "")
//         setTel(data.tel || "")
//         setAddress(data.address || "")
//       })
//   }
// }, [order.user_id])

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

            <h2 className="font-bold text-lg mb-2">Edit Order</h2>
            <p className="py-2 pl-2">Order ID : {order.order_id}</p>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-2">
              <legend className="fieldset-legend">Order item</legend>
              <div className='flex flex-row'>
                <div className="p-1 w-6/10">
                  <label className="label pb-1">product name</label>
                  <input type="text" className="input" value={product_name} readOnly />
                </div>
                <div className="p-1 w-4/10">
                  <label className="label pb-1">amount</label>
                  <input type="text" className="input" value={amount} readOnly />
                </div>
              </div>
              <div className='flex flex-row'>
                <div className="flex flex-col p-1 w-6/10">
                  <label className="label pb-1">total price</label>
                  <input type="text" className="input" value={total_price} readOnly />
                </div>
                <div className="flex flex-col p-1 w-4/10">
                  <label className="label pb-1">status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="select">
                    <option value="in progress">in progress</option>
                    <option value="success">success</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-2">
              <legend className="fieldset-legend">Customer information</legend>
              <div className="flex flex-col p-1 w-full">
                <label className="label pb-1">name</label>
                <input type="text" className="input" value={customer_name} readOnly />
              </div>
              <div className="flex flex-col p-1 w-full">
                <label className="label pb-1">tel</label>
                <input type="text" className="input" value={tel} readOnly />
              </div>
              <div className="flex flex-col p-1 w-full">
                <label className="label pb-1">address</label>
                <textarea className="input h-20 p-3" value={address} readOnly />
              </div>
            </fieldset>

            <div className="flex flex-row justify-end p-4 gap-2">
              <button type="submit" className="btn btn-neutral btn-success">Submit</button>
              <button type="button" className="btn btn-outline border-base-300 text-base-content/70" onClick={() => document.getElementById(`modal_edit_${order.order_id}`).close()}>Cancel</button>
            </div>
          </form>       
        </div>
      </dialog>
    </div>
  );
}
