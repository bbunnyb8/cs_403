"use client";

import React, { useState } from 'react';
import Sidebar from '@/app/component/sidebar';

const stockData = [
  { id: '#IT0001', name: 'inkbook', price: '100', amount: 9 },
  { id: '#IT0002', name: 'gifted', price: '6,000', amount: 11 },
  { id: '#IT0003', name: 'phattaratkan', price: '750', amount: 110 },
  { id: '#IT0004', name: 'namo', price: '780', amount: 62 },
  { id: '#IT0005', name: 'alex', price: '600', amount: 70 },
  { id: '#IT0006', name: 'kayn', price: '1,300', amount: 34 },
  { id: '#IT0007', name: 'no name', price: '4,700', amount: 25 },
  { id: '#IT0008', name: 'na me', price: '450', amount: 6 },
  { id: '#IT0009', name: 'hua pao', price: '750', amount: 1 },
  { id: '#IT0010', name: 'gieto', price: '450', amount: 14 },
];

export default function StockLayout() {

  return (
    
    <div className="static flex">
      <Sidebar />

      <div className="static h-full w-full p-6">

        <div className="flex flex-row  pb-6">
          <h1 className="flex text-3xl font-bold">Stock</h1>
          <label className='flex text-base-content/50 pl-4 pt-2'>(11 items)</label>
        </div>
        
          {/* Search and Filter */}
          <div className="flex items-center gap-2 mb-4">
          <label className="input">
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
            <select className="border rounded px-3 py-2">
              <option>Product ID</option>
              <option>Name</option>
              <option>Price</option>
              <option>Amount</option>
              <option>Action</option>
            </select>
          </div>

        {/* Table */}
        <div className="overflow-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase">
                <th className="p-4"><input type="checkbox" /></th>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4">{item.id}</td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.price}</td>
                  <td className="p-4">{item.amount}</td>
                  <td className="p-4 space-x-2 text-orange-500">
                    {/* <button><Pencil size={16} /></button>
                    <button><Trash2 size={16} /></button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 text-sm text-gray-600">
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Previous</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

