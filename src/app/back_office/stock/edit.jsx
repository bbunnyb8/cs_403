'use client'
import React from 'react'
// icon
import { RiImageAddLine } from "react-icons/ri";
import { RiEditBoxLine } from "react-icons/ri";

import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function edit() {
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
   
      return (
        <div className="relative">
         {/* Add button */}
          <button
            className="btn btn-square btn-ghost"
            onClick={() => document.getElementById("my_modal_4").showModal()}
         >
            <RiEditBoxLine className="h-5 w-5 text-warning" />
          </button>
   
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box max-w max-h flex flex-col">
              <form method="dialog">
                <h2 className="font-bold text-lg mb-2">Edit Product</h2>
   
               {/* Product ID label */}
                <p className="py-2 pl-2">Product ID :</p>
   
               {/* Upload image section */}
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

              {/* Input: Name */}
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
   
               {/* Input: Price */}
                <div className="flex p-2">
                  <input
                    type="number"
                    className="input validator w-2/4"
                    required placeholder="price"
                    min="1"
                    max="1000"
                    title="Must be enter the number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <p className="pl-4 text-xs validator-hint text-gray-500">Must enter a number</p>
                </div>
   
               {/* Input: Amount */}
                <div className="flex p-2">
                  <input
                    type="number"
                    className="input validator w-2/4"
                    required placeholder="amount"
                    min="1"
                    max="1000"
                    title="Must be enter the number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <p className="pl-4 text-xs validator-hint text-gray-500">Must enter a number</p>
                </div>
              </form>

             {/* Submit & Cancel Buttons */}
              <div className="flex flex-row justify-end p-4 gap-2">
                <button className="btn btn-neutral btn-dash">Submit</button>
                <button
                className="btn btn-dash btn-error"
                onClick={() => document.getElementById("my_modal_4").close()}
                >
                Cancel
              </button>
            </div>
            </div>
          </dialog>
        </div>
  )
}

