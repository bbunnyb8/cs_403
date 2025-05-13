'use client'
import React, { useState } from 'react';
// icon
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";

export default function Modal() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      price: price,
      amount: amount,
    };

    try {
      const response = await fetch('/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Product added successfully:', data);
        document.getElementById("my_modal_4").close();
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="relative">
      <button
        className="btn btn-accent"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        <IoIosAddCircleOutline className="h-5 w-5" />
        Add Employee
      </button>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box max-w max-h flex flex-col">
          <form onSubmit={handleSubmit}>
            <h2 className="font-bold text-lg mb-2">Add Employee</h2>

            <p className="py-2 pl-2">Employee ID :</p>

            {/* Upload image */}
            <div className="flex items-center justify-center p-6">
              <label htmlFor="image-upload" className="cursor-pointer">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-md"
                  />
                ) : (
                  <RiImageAddLine className="h-40 w-40 text-gray-400" />
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Name */}
            <div className="flex p-2">
              <input
                type="text"
                className="input validator w-full"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Price */}
            <div className="flex p-2">
              <input
                type="number"
                className="input validator w-2/4"
                placeholder="price"
                min="1"
                max="1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <p className="pl-4 text-xs text-gray-500">Must enter a number</p>
            </div>

            {/* Amount */}
            <div className="flex p-2">
              <input
                type="number"
                className="input validator w-2/4"
                placeholder="amount"
                min="1"
                max="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <p className="pl-4 text-xs text-gray-500">Must enter a number</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row justify-end p-4 gap-2">
              <button type="submit" className="btn btn-neutral btn-dash">Submit</button>
              <button
                type="button"
                className="btn btn-dash btn-error"
                onClick={() => document.getElementById("my_modal_4").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
