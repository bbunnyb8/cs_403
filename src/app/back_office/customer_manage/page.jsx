'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/component/sidebar';
import Delete from "./delete_pd";
import { IoSearch } from "react-icons/io5";
import Info from './info';

export default function StockLayout() {
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  // โหลดข้อมูลจากฐานข้อมูล
  useEffect(() => {
    fetch('/api/stock') // <-- แก้ path ตาม API ที่คุณทำไว้
      .then((res) => res.json())
      .then((data) => {
        setStockData(data);
        setFilteredData(data); // แสดงทั้งหมดก่อนกรอง
      })
      .catch((err) => console.error('Error fetching stock data:', err));
  }, []);

  // อัปเดต filteredData ตาม searchQuery
  useEffect(() => {
    const filtered = stockData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // กลับไปหน้าแรกเมื่อกรองใหม่
  }, [searchQuery, stockData]);

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
          className={`join-item btn ${currentPage === page ? 'btn-active btn-primary' : ''}`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="flex w-full">
      <div className="fixed">
        <Sidebar />
      </div>

      <div className="relative flex flex-col w-full p-6 ml-60">
        {/* Header */}
        <div className="flex flex-row gap-2 items-center pb-6">
          <h1 className="text-3xl font-bold">Customer</h1>
          <label className='text-base-content/50 mt-2'>({filteredData.length} user)</label>
        </div>

        {/* Search & Modal */}
        <div className="flex flex-row items-center pb-6 justify-between w-full gap-2">
          <label className='input input-bordered w-80'>
            <IoSearch className='h-5 w-5'/>
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* ถ้าจะเพิ่มการค้นหาตาม Type ก็แก้ dropdown ตรงนี้ */}
          </label>

        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="table table-zebra table-fixed min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase">
                <th className="p-2 w-[50px]">#</th>
                <th className="p-2 w-[50px]">ID</th>
                <th className="p-2 w-[150px]">Name</th>
                <th className="p-2 w-[150px]">E-Mail</th>
                <th className="p-2 w-[100px]">Tel</th>
                <th className="p-2 w-[50px] text-center">Action</th>
              </tr>
            </thead>

            {/* TODO: เปลี่ยนชื่อให้ตรงด้วยนะ */}

            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50 h-2">
                  <td className="p-2">{startIndex + idx + 1}</td>
                  <td className="p-2">{item.product_id}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.price}</td>
                  <td className="p-2">{item.amount}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <Info /> <Delete />
                  </td>
                </tr>
              ))}
              {Array.from({ length: itemsPerPage - currentItems.length }).map((_, idx) => (
                <tr key={`empty-${idx}`} className="border-t h-2">
                  <td className="p-2">-</td>
                  <td className="p-2">-</td>
                  <td className="p-2">-</td>
                  <td className="p-2">-</td>
                  <td className="p-2">-</td>
                  <td className="p-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
          <div className="join">
            <button onClick={handlePrev} disabled={currentPage === 1} className="join-item btn">«</button>
            {renderPageButtons()}
            <button onClick={handleNext} disabled={currentPage === totalPages} className="join-item btn">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
