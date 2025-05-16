"use client";

import React, { useEffect, useRef } from 'react';
import { useCart } from './cartcontext'; // เพื่อใช้ clearCart และ closePaymentModal
import { IoClose } from "react-icons/io5";
import { FaQrcode } from "react-icons/fa";

// สมมติว่าคุณมี path ไปยังรูป QR Code ของคุณ
const QR_CODE_IMAGE_PATH = 'FaQrcode'; // <<===== แก้ไข PATH รูป QR CODE ของคุณที่นี่

export default function PaymentModal({ isOpen, onClose, totalAmount }) {
  const { clearCart, closeCartModal } = useCart(); // ดึง clearCart และ closeCartModal มาใช้
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

  const handleSubmitPayment = () => {
    // ตรงนี้คุณอาจจะต้องมีการ integrate กับ payment gateway จริง
    // หรือทำการบันทึกการสั่งซื้อ
    console.log('Payment submitted for amount:', totalAmount);
    alert('Payment successful! Your order has been placed.'); // ตัวอย่าง alert

    clearCart(); // ล้างตะกร้า
    onClose(); // ปิด PaymentModal
    closeCartModal(); // ปิด CartModal หลักด้วย (ถ้ายังเปิดอยู่)
  };

  if (!isOpen) {
    return null;
  }

  return (
    <dialog id="payment_modal_daisy" className="modal modal-bottom sm:modal-middle" ref={paymentModalRef}>
      <div className="modal-box w-11/12 max-w-md"> {/* ปรับขนาดให้พอดีกับ QR Code */}
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose} // เมื่อกด X ให้เรียก onClose (ซึ่งคือ closePaymentModal)
          >
            <IoClose size={24} />
          </button>
        </form>

        <h3 className="font-bold text-2xl text-center mb-4">Payment</h3>

        <div className="flex flex-col items-center">
          {/* รูป QR Code */}
          <div className="mb-4 p-4 bg-white rounded-lg inline-block"> {/* เพิ่มพื้นหลังสีขาวให้ QR Code ดูเด่นขึ้น */}
            <FaQrcode
              size={200} // ปรับขนาดตามต้องการ (เช่น 200, 240, 280)
              className="text-black" // สีของ QR Code (ปกติจะเป็นสีดำ)
            />
          </div>

          {/* ราคารวม */}
          <p className="text-xl font-semibold mb-1">Total Amount:</p>
          <p className="text-3xl font-bold text-primary mb-6">฿{totalAmount.toFixed(2)}</p>
        </div>

        <div className="modal-action mt-6">
          <form method="dialog" className="flex gap-4 w-full justify-center">
            <button
              className="btn btn-neutral" // หรือ btn-ghost
              onClick={onClose} // ปุ่ม Cancel ก็เรียก onClose
            >
              Cancel
            </button>
            <button
              className="btn btn-success text-white" // หรือ btn-primary
              onClick={handleSubmitPayment} // << เรียก handleSubmitPayment เมื่อกด Submit
            >
              Submit Payment
            </button>
          </form>
        </div>
      </div>
      {/* Backdrop click to close */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}