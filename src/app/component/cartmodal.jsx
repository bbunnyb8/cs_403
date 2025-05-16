"use client";

import React, { useEffect, useRef } from 'react'; // Import useEffect และ useRef
import { useCart } from './cartcontext';
import { IoClose } from "react-icons/io5";

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, setCartItems, openPaymentModal } = useCart();
  const modalRef = useRef(null); // สร้าง ref สำหรับ dialog element

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleProceedToPayment = () => {
    openPaymentModal();
  };
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // ใช้ useEffect เพื่อควบคุมการแสดงผลของ dialog ด้วย JavaScript
  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal(); // เปิด Modal โดยใช้ method ของ HTML dialog
      } else {
        modalElement.close(); // ปิด Modal
      }
    }
  }, [isOpen]); // ทำงานเมื่อ isOpen เปลี่ยนแปลง

  // ถ้าไม่ต้องการให้ render อะไรเลยเมื่อ Modal ปิด (เพื่อไม่ให้มี dialog element ค้างใน DOM)
  // สามารถ return null ได้ แต่ต้องแน่ใจว่าเมื่อ isOpen เป็น true มันจะถูก render ใหม่
  // หรือจะใช้ class 'modal-open' ของ DaisyUI ในการควบคุมก็ได้
  // ในที่นี้ เราจะ render dialog เสมอ แล้วใช้ showModal/close ควบคุม

  return (
    <dialog id="cart_modal_daisy" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
      <div className="modal-box w-full max-w-none"> {/* ปรับขนาด modal-box ตามต้องการ */}
        {/* ปุ่มปิด Modal ที่ใช้ method="dialog" หรือ onClick={onClose} */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </form>

        <h3 className="font-bold text-2xl text-center mb-6">My Order</h3>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 my-8">Your cart is currently empty.</p>
        ) : (
          <>
            <div className="overflow-x-auto max-h-[50vh]"> {/* ปรับ max-height */}
              <table className="table table-zebra w-full table-auto">
                <thead>
                  <tr>
                    <th className="w-6 px-1 sm:px-1">No.</th>
                    <th className="">Name</th>
                    <th className="w-14 px-1 sm:px-1">Price</th>
                    <th className="w-36 px-2 sm:px-4">Amount</th>
                    <th className="w-32 px-2 sm:px-4">Total</th>
                    <th className="w-28 px-1 sm:px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id}>
                      <th className="px-1 sm:px-1">{index + 1}</th>
                      <td className="">{item.name}</td>
                      <td className="px-1 sm:px-1">฿{item.price.toFixed(2)}</td>
                      <td className="px-2 sm:px-4">
                        <div className="flex items-center justify-center gap-1"> {/* ลด gap */}
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="btn btn-xs btn-outline"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="btn btn-xs btn-outline"
                            disabled={item.quantity >= item.items}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>฿{(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="btn btn-error btn-xs text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-end items-center mb-2">
                <span className="text-lg">Amount:</span>
                <span className="text-lg font-semibold ml-4">{totalItemsInCart}</span>
              </div>
              <div className="flex justify-end items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold ml-4">฿{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}

        <div className="modal-action mt-8">
          <form method="dialog" className='flex gap-4 w-full justify-end'>
            <button className="btn" onClick={onClose}>Cancel</button>
            {cartItems.length > 0 && (
              <button
                className="btn btn-primary"
                onClick={handleProceedToPayment} // << เรียก handleProceedToPayment
              >
                Payment
              </button>
            )}
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}