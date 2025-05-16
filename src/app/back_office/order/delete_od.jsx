'use client'
import React from 'react'
import { MdDeleteForever } from "react-icons/md";

export default function Delete({ orderId, onDeleteSuccess }) {
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/delete-order`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id: orderId })
      });

      if (!res.ok) throw new Error("Failed to delete product");

      alert("ลบสำเร็จ");
      window.location.reload(); // reload หน้าใหม่

      if (onDeleteSuccess) onDeleteSuccess(); // callback ให้ reload data
    } catch (err) {
      console.error("Delete error:", err);
      alert("เกิดข้อผิดพลาดในการลบ");
    }
  };

  return (
    <button className='btn btn-square btn-ghost' onClick={handleDelete}>
      <MdDeleteForever className='h-5 w-5 text-error' />
    </button>
  );
}
