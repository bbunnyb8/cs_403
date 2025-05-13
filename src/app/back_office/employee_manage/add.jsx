'use client'
import React, { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiImageAddLine, RiEditBoxLine } from "react-icons/ri";


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
            <form method="dialog">
              <h2 className="font-bold text-lg mb-2">Add Employee</h2>
              <p className="py-2 pl-2">ID :</p>
  
              <p className="py-2 pl-2"><b>Personal Information</b></p>
              {/* Input: name and last name */}
              <div className="flex p-2 space-x-2">
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="name"
                />
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="last name"
                />
              </div>
  
              {/* Input: birthday */}
              <div className="flex p-2">
                <input
                  type="text"
                  className="input validator w-1/2"
                  placeholder="birthday"
                />
              </div>
  
              <p className="py-2 pl-2"><b>Contact Information</b></p>
              {/* Input: phone and email */}
              <div className="flex p-2 space-x-2">
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="phone"
                />
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="e-mail"
                />
              </div>
  
              {/* Input: address */}
              <div className="flex p-2">
                <input
                  type="text"
                  className="input validator w-full"
                  placeholder="address"
                />
              </div>
  
            <p className="py-2 pl-2"><b>Login Information</b></p>
              {/* Input: username and password */}
              <div className="flex p-2 space-x-2">
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="username"
                />
                <input
                  type="text"
                  className="input validator w-1/2" // ปรับ width ให้เหลือครึ่งหนึ่ง
                  placeholder="password"
                />
              </div>
            </form>
  
            {/* ปุ่ม OK */}
            <div className="flex flex-row justify-center p-4 gap-2">
                            <button
                  type="button"
                  className="btn btn-dash btn-success"
                  onClick={() => document.getElementById("my_modal_4").close()}
                >
                  OK
                </button>
            </div>
          </div>
        </dialog>
      </div>
  );
}
