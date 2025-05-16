"use client";

import React, { useEffect, useRef } from 'react';
import { useCart } from './cartcontext';
import { IoClose } from "react-icons/io5";
import { FaQrcode } from "react-icons/fa";

export default function PaymentModal({ isOpen, onClose, totalAmount }) {
  const { cartItems, clearCart, closeCartModal } = useCart();
  const paymentModalRef = useRef(null);

  useEffect(() => {
    const modalElement = paymentModalRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    const user_id = typeof window !== "undefined" ? localStorage.getItem('user_id') : null;
    try {
      const res = await fetch('/api/new-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          total_price: totalAmount,
          user_id: user_id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order failed');
      alert('Payment successful! Your order has been placed.');
      clearCart();
      onClose();
      closeCartModal();
    } catch (err) {
      alert('Order failed: ' + err.message);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <dialog id="payment_modal_daisy" className="modal modal-bottom sm:modal-middle" ref={paymentModalRef}>
      <div className="modal-box w-11/12 max-w-md">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
            type="button"
          >
            <IoClose size={24} />
          </button>
        </form>

        <h3 className="font-bold text-2xl text-center mb-4">Payment</h3>

        <div className="flex flex-col items-center">
          <div className="mb-4 p-4 bg-white rounded-lg inline-block">
            <FaQrcode size={200} className="text-black" />
          </div>
          <p className="text-xl font-semibold mb-1">Total Amount:</p>
          <p className="text-3xl font-bold text-primary mb-6">฿{totalAmount.toFixed(2)}</p>
        </div>

        <div className="modal-action mt-6">
          <form method="dialog" className="flex gap-4 w-full justify-center">
            <button
              className="btn btn-neutral"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="btn btn-success text-white"
              onClick={handleSubmitPayment}
              type="submit"
            >
              Submit Payment
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}