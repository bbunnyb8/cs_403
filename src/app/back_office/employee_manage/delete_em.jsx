'use client'
import React from 'react'
import { MdDeleteForever } from "react-icons/md";

function Delete({ employeeId, onDeleteSuccess }) {
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this ?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/delete-em`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: employeeId })
      });

      if (!res.ok) throw new Error("ลบไม่สำเร็จ");

      alert("ลบสำเร็จ");
      if (onDeleteSuccess) onDeleteSuccess();
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

export default Delete;
