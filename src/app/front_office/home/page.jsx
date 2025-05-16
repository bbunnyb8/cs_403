"use client";
import React, { useState, useEffect } from 'react';
import { TbCakeRoll } from "react-icons/tb";
import { useCart } from '@/app/component/cartcontext';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const defaultIcon = <TbCakeRoll size={64} />;
  const maxOrderableQuantity = Math.min(10, product.amount);

  const handleQuantityChange = (event) => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) value = 1;
    if (value < 1) setQuantity(1);
    else if (value > maxOrderableQuantity) setQuantity(maxOrderableQuantity);
    else setQuantity(value);
  };

  const handleOrderClick = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm max-w-lg">
      <div className="flex items-center justify-center p-4">
        {product.icon || defaultIcon}
      </div>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-gray-700 text-lg mb-1">฿{product.price}</p>
        <p className="text-gray-500 text-xs">{product.amount} items available</p>
        <div className="flex items-center gap-2 mt-auto">
          <input
            type="number"
            className="input input-bordered text-center w-20"
            required
            min="1"
            max={maxOrderableQuantity}
            title={`Must be between 1 to ${maxOrderableQuantity}`}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button className="btn btn-neutral" onClick={handleOrderClick}>
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Products from API:", data); // DEBUG
        if (Array.isArray(data)) {
          const productsWithIcon = data.map((p) => ({
            ...p,
            icon: <TbCakeRoll size={64} />,
          }));
          setProducts(productsWithIcon);
        } else {
          console.error("Unexpected response format:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto">
        <h1 className="text-3xl font-bold pb-2">Order</h1>
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
          {loading ? (
            <div>Loading...</div>
          ) : products.length === 0 ? (
            <div>No products found.</div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
// This code is a React component that fetches product data from an API and displays it in a grid format.