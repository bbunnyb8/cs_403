'use client'
import React, { useState, useEffect } from 'react'
import { RiEmojiStickerLine } from "react-icons/ri";

export default function Info({ customer }) {
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // โหลดข้อมูลจากฐานข้อมูล
  useEffect(() => {
    fetch('/api/order') // <-- แก้ path ตาม API ที่คุณทำไว้
      .then((res) => res.json())
      .then((data) => {
        setStockData(data);
        setFilteredData(data); // แสดงทั้งหมดก่อนกรอง
      })
      .catch((err) => console.error('Error fetching stock data:', err));
  }, []);

  // อัปเดต filteredData ตาม searchQuery


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const renderPageButtons = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= maxVisible) {
        pages.push(...[1, 2, 3, '...', totalPages]);
      } else if (currentPage >= totalPages - 2) {
        pages.push(...[1, '...', totalPages - 2, totalPages - 1, totalPages]);
      } else {
        pages.push(...[1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]);
      }
    }

    return pages.map((page, index) =>
      page === '...' ? (
        <button key={`ellipsis-${index}`} className="join-item btn btn-disabled">...</button>
      ) : (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`join-item btn ${currentPage === page ? 'btn-active btn-accent' : ''}`}
        >
          {page}
        </button>
      )
    );
  };


  // ใช้ id ไม่ซ้ำกันในแต่ละแถว
  const dialogId = `info_modal_${customer?.user_id ?? customer?.id ?? Math.random()}`;

  return (
    <div className="relative">
      {/* ปุ่ม Info */}
      <button
        className="btn btn-square btn-ghost"
        onClick={() => document.getElementById(dialogId).showModal()}
      >
        <RiEmojiStickerLine className="h-5 w-5 text-info" />
      </button>

      <dialog id={dialogId} className="modal">
        <div className="modal-box max-w max-h flex flex-col">
          {/* Header */}
            <label className="text-3xl font-bold">Order</label>

          {/* Table */}
          <div className=" rounded-lg p-4">
            <table className="table table-zebra w-full table-auto">
              <thead>
                <tr className="text-center">
                  <th className="w-10 px-1 sm:px-1 ">No.</th>
                  <th className="w-100 px-1 sm:px-1 text-left">Name</th>
                  <th className="w-20 px-1 sm:px-1">Price</th>
                  <th className="w-20 px-2 sm:px-1">Amount</th>
                  <th className="w-20 px-2 sm:px-1">Total</th>
                </tr>
              </thead>
              {/* TODO: เปลี่ยนชื่อ item ให้ตรงเองนะ จุ๊บ ๆ */}
              <tbody>
                {currentItems.map((item, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="w-10 px-1 sm:px-1">{startIndex + idx + 1}</td>
                    <td className="w-100 px-1 sm:px-1 text-left">{item.name}</td>
                    <td className="w-20 px-1 sm:px-1">{item.price}</td>
                    <td className="w-20 px-1 sm:px-1">{item.total_amount}</td>
                    <td className="w-20 px-1 sm:px-1">{item.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-end items-center mb-2">
              <span className="text-lg">Amount:</span>
              <span className="text-lg font-semibold ml-4">{filteredData.length}</span>
            </div>
            <div className="flex justify-end items-center">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold ml-4">฿{filteredData.length}</span>
            </div>
          </div>
          <div className="flex flex-row justify-end pt-4">
            <button
              type="button"
              className="btn btn-outline btn-base-300 border-base-300 text-base-content/70"
              onClick={() => document.getElementById(dialogId).close()}
            >
              Cancel
            </button>
          </div>
        </div>
        
        
      </dialog>
    </div>
  );
}