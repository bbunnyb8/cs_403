"use client";
import { CartProvider, useCart } from '@/app/component/cartcontext'; // Import useCart ด้วย
import Navbar from '@/app/component/navbar';
import CartModal from '@/app/component/CartModal'; // << Import CartModal
import PaymentModal from '@/app/component/PaymentModal'; // << Import PaymentModal

// สร้างคอมโพเนนต์ย่อยเพื่อใช้ useCart ได้ เพราะ FrontOfficeLayout เองไม่ได้เป็น child ของ CartProvider โดยตรง
function LayoutContent({ children }) {
  const { isCartModalOpen, closeCartModal, isPaymentModalOpen,
    closePaymentModal, cartItems 
   } = useCart(); // ดึง state และฟังก์ชันปิด Modal

   const subtotalForPayment = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className='p-4'>
      
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <CartModal isOpen={isCartModalOpen} onClose={closeCartModal} /> {/* << Render CartModal ที่นี่ */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        totalAmount={subtotalForPayment} // << ส่งราคารวมไปให้ PaymentModal
      />
    </div>
  );
}

export default function FrontOfficeLayout({ children }) {
  return (
    <CartProvider>
      <LayoutContent>{children}</LayoutContent>
    </CartProvider>
  );
}