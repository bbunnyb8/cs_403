"use client";

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // << เพิ่ม state สำหรับ Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // ถ้ามีสินค้านี้ในตะกร้าแล้ว ให้อัปเดตจำนวน
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity } // เพิ่มจำนวนตามที่สั่งใหม่
            : item
        );
      } else {
        // ถ้ายังไม่มีสินค้านี้ในตะกร้า ให้เพิ่มเข้าไปใหม่
        return [...prevItems, { ...product, quantity: quantity }];
      }
    });
    console.log(`Added to cart: ${product.name}, Quantity: ${quantity}. Current cart:`, cartItems); // แสดง log เพื่อตรวจสอบ (cartItems อาจยังไม่อัปเดตทันทีใน log นี้เนื่องจาก setState เป็น async)
  };

  const openCartModal = () => setIsCartModalOpen(true);    // << ฟังก์ชันเปิด Modal
  const closeCartModal = () => setIsCartModalOpen(false);  // << ฟังก์ชันปิด Modal
  const openPaymentModal = () => setIsPaymentModalOpen(true);    // << ฟังก์ชันเปิด Payment Modal
  const closePaymentModal = () => setIsPaymentModalOpen(false); // << ฟังก์ชันปิด Payment Modal

  const clearCart = () => {                                   // << ฟังก์ชันล้างตะกร้า
    setCartItems([]);
    console.log('Cart cleared');
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, setCartItems, isCartModalOpen ,openCartModal,
      closeCartModal, isPaymentModalOpen, openPaymentModal, closePaymentModal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};