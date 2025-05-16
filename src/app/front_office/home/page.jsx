"use client";
import React, { useState } from 'react';
import { TbCakeRoll } from "react-icons/tb";
import { useCart } from '@/app/component/cartcontext';


// สร้างข้อมูลตัวอย่างสำหรับสินค้า
const products = [
  {
    id: 1,
    name: 'Dark Chocolate cake',
    price: 30, // ราคาต่อชิ้น
    items: 11,
    icon: <TbCakeRoll size={64} />,
  },
  {
    id: 2,
    name: 'Black coffee',
    price: 120,
    items: 21,
    icon: <TbCakeRoll size={64} />,
  },
  {
    id: 3,
    name: 'Strawberry cheese cake',
    price: 200,
    items: 20,
    icon: <TbCakeRoll size={64} />,
  },
  {
    id: 4,
    name: 'Chocolate cookie',
    price: 20,
    items: 25,
    icon: <TbCakeRoll size={64} />,
  },
  {
    id: 5,
    name: 'Chocolate cookie',
    price: 20,
    items: 25,
    icon: <TbCakeRoll size={64} />,
  },
  {
    id: 6,
    name: 'Chocolate cookie',
    price: 20,
    items: 25,
    icon: <TbCakeRoll size={64} />,
  },
];

// ProductCard component สำหรับแสดงข้อมูลสินค้าแต่ละชิ้น
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openCartModal } = useCart(); // << ดึงฟังก์ชัน addToCart มาจาก context

  const maxOrderableQuantity = Math.min(10, product.items); // จำนวนสูงสุดที่สั่งได้ต่อครั้ง (ไม่เกิน 10 และไม่เกินสต็อก)

  const handleQuantityChange = (event) => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) { // ถ้าผู้ใช้ลบจนหมด หรือใส่ค่าที่ไม่ใช่ตัวเลข
        value = 1; // ให้เป็น 1
    }

    if (value < 1) {
      setQuantity(1);
    } else if (value > maxOrderableQuantity) {
      setQuantity(maxOrderableQuantity);
    } else {
      setQuantity(value);
    }
  };

  const handleOrderClick = () => {
    // ส่งข้อมูล product ทั้งหมด (id, name, price, icon) และ quantity ที่เลือก
    addToCart(product, quantity);
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm max-w-lg">
      <div className="flex items-center justify-center p-4">
        {product.icon}
      </div>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-gray-700 text-lg mb-1">฿{product.price}</p>
        <p className="text-gray-500 text-xs">{product.items} items available</p> {/* แสดงจำนวนสินค้าคงคลัง */}
        <div className="flex items-center gap-2 mt-auto">
          <input
            type="number"
            className="input input-bordered text-center w-20" // เพิ่ม input-bordered และกำหนดความกว้าง
            required
            min="1"
            max={maxOrderableQuantity} // กำหนด max ตามจำนวนสินค้าคงคลัง
            title={`Must be between 1 to ${maxOrderableQuantity}`}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button className="btn btn-neutral" onClick={handleOrderClick}> {/* << เพิ่ม onClick handler */}
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto">
          <h1 className="text-3xl font-bold pb-2">Order</h1>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
  );
}