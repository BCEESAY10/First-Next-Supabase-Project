"use client"

import Link from 'next/link';
import React, { useState } from 'react';

export default function Products() {
  const products = [
    {
      id: 1,
      name: 'Submariner',
      price: 'D1200.00',
      image: 'https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7/c_limit,w_1600/v1/catalogue/2024/upright-c/m124060-0001',
    },
    {
      id: 2,
      name: 'Day Date 40',
      price: 'D2000.00',
      image: 'https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7-majesty/c_limit,w_800/v1/catalogue/2024/upright-c/m228235-0055',
    },
    {
      id: 3,
      name: 'Apple Airpod',
      price: 'D1000.00',
      image: 'https://th.bing.com/th?id=OPHS.9aexkXAs0OrF6Q474C474&w=592&h=550&o=5&pid=21.1',
    },
    {
      id: 4,
      name: 'Earbuds Mini BW',
      price: 'D1350.00',
      image: 'https://th.bing.com/th?id=OPHS.dQdpgtRHmh37lg474C474&w=592&h=550&o=5&pid=21.1',
    },
    {
      id: 5,
      name: 'Lace Up Sneaker Gray',
      price: 'D1500.00',
      image: 'https://th.bing.com/th?id=OPHS.NfMio1%2f1Al%2fwJQ474C474&w=592&h=550&o=5&pid=21.1',
    },
    {
      id: 6,
      name: 'Black & White Nike',
      price: 'D1050.00',
      image: 'https://th.bing.com/th?id=OPHS.U4ndvwGDX%2baYRQ474C474&w=592&h=550&o=5&pid=21.1',
    },
  ];


  const [showPopup, setShowPopup] = useState(false);

  const buyProduct = () => {
    setShowPopup(true); 
    setTimeout(() => {
      setShowPopup(false); 
    }, 5000);
  };

  return (

    <div className="container mx-auto p-4">

    <ul className="justify-center mb-12 items-center flex gap-4 text-xl font-serif">
        <li>
          <Link href={"/"} className="hover:underline bg-white text-blue-500 border-blue-500 p-2 rounded-lg">
            Home
          </Link>
          <Link href={"/login"} className="hover:underline mx-5 bg-white text-blue-500 border-blue-500 p-2 rounded-lg">
            Login
          </Link>
          <Link href={"/signup"} className="hover:underline bg-white text-blue-500 p-2 rounded-lg">
            Signup
          </Link>
        </li>
      </ul>


      <h1 className="text-2xl font-bold mb-6 text-center text-white sticky top-0">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded-t-lg"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.price}</p>
            <button onClick={buyProduct} className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 ease-in-out">
              Buy Now
            </button>
          </div>
        ))}
      </div>
      
      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-md">
            Product bought successfully!
        </div>
        )}

    </div>
  );
}
