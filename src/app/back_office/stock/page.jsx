'use client'
import Sidebar from '@/app/component/sidebar'
import React, { useState, useEffect } from 'react';
import { useState } from 'react';
import Sidebar from '@/app/component/sidebar';
import Modal from './modal';
import Edit from "./edit";
import Delete from "./delete_pd";

export default function StockLayout() {
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  // โหลดข้อมูลจากฐานข้อมูล
  useEffect(() => {
    fetch('/api/stock') // <-- แก้ path ตาม API 
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


export default function StockLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(stockData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = stockData.slice(startIndex, startIndex + itemsPerPage);


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

  
    if (totalPages <= maxVisible + 2) {
      // กรณี total น้อยกว่า 5 หน้าทั้งหมดแสดงได้
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // กรณีหน้ามากกว่า 5

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
      
    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <button key={`ellipsis-${index}`} className="join-item btn btn-disabled">
            ...
          </button>
        );
      }
  
      return (

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


      );
    });
  };


  return (

    <div className="flex">
      <Sidebar />
      <h1>stock</h1>


    <div className="flex w-full">
      <div className="fixed">
        <Sidebar />
      </div>


      <div className="relative flex flex-col w-full p-6 ml-60">
        {/* Header */}
        <div className="flex flex-row gap-2 items-center pb-6">
          <h1 className="text-3xl font-bold">Stock</h1>
          <label className='text-base-content/50 mt-2'>({filteredData.length} items)</label>
        </div>

        {/* Search & Modal */}
        <div className="flex flex-row items-center pb-6 justify-between w-full gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="🔍 Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-80"
            />
            {/* ถ้าจะเพิ่มการค้นหาตาม Type ก็แก้ dropdown ตรงนี้ */}
          </div>

          <div className="flex-none">

      
      <div className="relative flex flex-col w-full p-6 ml-60 ">
        {/* header */}
        <div className="flex flex-row gap-2 items-center pb-6">
          <h1 className="text-3xl font-bold">Stock</h1>
          <label className='text-base-content/50 mt-2'>(11 items)</label>
        </div>
        {/* Search and Filter */}
        <div className="flex flex-row items-center  pb-6 w-full flex-none justify-between gap-2">
          <div className='flex flex-row gap-2'>
            <label className="input w-80">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search" />
            </label>
            {/* select drop down */}
            <label className="select w-50 flex-none">
              <span className="label">Type</span>
                <select defaultValue="Product ID" className="select">
                  <option>Product ID</option>
                  <option>Name</option>
                  <option>Price</option>
                  <option>Amount</option>
                </select>
            </label>
          </div>
        {/* modal */}
          <div className=' inset-y-0 right-0 flex-none'>

            <Modal />
          </div>
        </div>

        {/* Table */}

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="table table-zebra table-fixed min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase">
                <th className="p-4 w-[50px]">#</th>
                <th className="p-4 w-[120px]">ID</th>
                <th className="p-4 w-[200px]">Name</th>
                <th className="p-4 w-[100px]">Price</th>
                <th className="p-4 w-[100px]">Amount</th>
                <th className="p-4 w-[150px] text-center">Action</th>

        <div className="overflow-x-auto rounded-lg border border-gray-200 ">
          <table className="table table-zebra table-fixed min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase">
              <th className="p-4 w-[50px]">#</th>
              <th className="p-4 w-[120px]">ID</th>
              <th className="p-4 w-[200px]">Name</th>
              <th className="p-4 w-[100px]">Price</th>
              <th className="p-4 w-[100px]">Amount</th>
              <th className="p-4 w-[150px] text-center">Action</th>

              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50 h-12">

                  <td className="p-4">{startIndex + idx + 1}</td>
                  <td className="p-4">{item.product_id}</td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.price}</td>
                  <td className="p-4">{item.amount}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <Edit /> <Delete id={item.product_id} />
                  </td>
                </tr>
              ))}
              {Array.from({ length: itemsPerPage - currentItems.length }).map((_, idx) => (
                <tr key={`empty-${idx}`} className="border-t h-12">
                  <td className="p-4">-</td>
                  <td className="p-4">-</td>
                  <td className="p-4">-</td>
                  <td className="p-4">-</td>
                  <td className="p-4">-</td>
                  <td className="p-4"></td>
                </tr>
              ))}
            </tbody>
=======
                  <td className="p-4 w-[50px]">{startIndex + idx + 1}</td>
                  <td className="p-4 w-[120px]">{item.id}</td>
                  <td className="p-4 w-[200px]">{item.name}</td>
                  <td className="p-4 w-[100px]">{item.price}</td>
                  <td className="p-4 w-[100px]">{item.amount}</td>
                  <td className="p-4 w-[150px] items-center gap-2 flex flex-row w-full justify-center">
                    <Edit /> <Delete />
                  </td>
                </tr>
              ))}

              {/* เพิ่มแถวเปล่าจนครบ 10 แถว */}
              {Array.from({ length: itemsPerPage - currentItems.length }).map((_, idx) => (
                <tr key={`empty-${idx}`} className="border-t h-12">
                  <td className="p-4 w-[50px]">-</td>
                  <td className="p-4 w-[120px]">-</td>
                  <td className="p-4 w-[200px]">-</td>
                  <td className="p-4 w-[100px]">-</td>
                  <td className="p-4 w-[100px]">-</td>
                  <td className="p-4 w-[150px] h-[73.49px] text-center"></td>
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


            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="join-item btn"
            >
            
            </button>

            {renderPageButtons()}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="join-item btn"
            >
            
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

