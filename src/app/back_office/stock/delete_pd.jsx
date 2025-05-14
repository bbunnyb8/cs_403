'use client'
import React from 'react'
import { MdDeleteForever } from "react-icons/md";

function Delete({ productId, onDeleteSuccess }) {
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/delete-product`, {
  method: "DELETE",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ product_id: productId })
});

      if (!res.ok) throw new Error("Failed to delete product");

      window.location.reload(); // reload หน้าใหม่

      if (onDeleteSuccess) onDeleteSuccess(); // callback ให้ reload data
    } catch (err) {
      console.error("Delete error:", err);
      alert("เกิดข้อผิดพลาดในการลบสินค้า");
    }
  };

  return (
    <button className='btn btn-square btn-ghost' onClick={handleDelete}>
      <MdDeleteForever className='h-5 w-5 text-error' />
    </button>
  );
}

export default Delete;
