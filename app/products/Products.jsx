"use client";

import Link from "next/link";
import React, { useState } from "react";
import { analytics, firestore } from "./../api/firebase";
import { logEvent } from "firebase/analytics";
import { doc, getDoc, updateDoc } from "firebase/firestore";

let timeout;
export default function Products() {
  const products = [
    {
      id: 1,
      name: "Submariner",
      price: "D1200.00",
      image:
        "https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7/c_limit,w_1600/v1/catalogue/2024/upright-c/m124060-0001",
    },
    {
      id: 2,
      name: "Day Date 40",
      price: "D2000.00",
      image:
        "https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7-majesty/c_limit,w_800/v1/catalogue/2024/upright-c/m228235-0055",
    },
    {
      id: 3,
      name: "Apple Airpod",
      price: "D1000.00",
      image:
        "https://th.bing.com/th?id=OPHS.9aexkXAs0OrF6Q474C474&w=592&h=550&o=5&pid=21.1",
    },
    {
      id: 4,
      name: "Earbuds Mini BW",
      price: "D1350.00",
      image:
        "https://th.bing.com/th?id=OPHS.dQdpgtRHmh37lg474C474&w=592&h=550&o=5&pid=21.1",
    },
    {
      id: 5,
      name: "Lace Up Sneaker Gray",
      price: "D1500.00",
      image:
        "https://th.bing.com/th?id=OPHS.NfMio1%2f1Al%2fwJQ474C474&w=592&h=550&o=5&pid=21.1",
    },
    {
      id: 6,
      name: "Black & White Nike",
      price: "D1050.00",
      image:
        "https://th.bing.com/th?id=OPHS.U4ndvwGDX%2baYRQ474C474&w=592&h=550&o=5&pid=21.1",
    },
    {
      id: 6,
      name: "Versace Eros EDT",
      price: "D590.00",
      image:
        "https://th.bing.com/th?id=OPHS.Q2aYj3ses1QWEQ474C474&w=592&h=550&o=5&pid=21.1",
    },
    {
      id: 6,
      name: "Versace Dreamer",
      price: "D1000.00",
      image:
        "https://th.bing.com/th/id/OIP.IgeITMWXE3Xatms9XW6NKwAAAA?rs=1&pid=ImgDetMain",
    },
    {
      id: 6,
      name: "Black & White Nike",
      price: "D1050.00",
      image:
        "https://th.bing.com/th?id=OPHS.U4ndvwGDX%2baYRQ474C474&w=592&h=550&o=5&pid=21.1",
    },
    {
      id: 6,
      name: "Versace Bright Crystal",
      price: "D1020.00",
      image:
        "https://luxplus.photos/files/uploads/products/45-versace-bright-crystal-30-ml-2015-10-16-big-2x.png",
    },
    {
      id: 6,
      name: "Apple iPhone 6",
      price: "D12,050.00",
      image:
        "https://th.bing.com/th/id/R.c19a2424674773b9004fd298e3f7602c?rik=Jk%2b7unr6V4qUcQ&pid=ImgRaw&r=0",
    },
    {
      id: 6,
      name: "Apple iPhone 14",
      price: "D17,000.00",
      image:
        "https://cdn.osxdaily.com/wp-content/uploads/2020/06/ios-14-iphone-widget-home-screen-redesign.jpg",
    },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(products);

  const buyProduct = async (product) => {
    try {
      setShowPopup(true);

      logEvent(analytics, "Product bought", {
        product_name: product.name,
        product_price: product.price,
      });

      const productRef = doc(firestore, "products", product.id);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        const currentCount = productDoc.data().purchaseCount || 0;

        await updateDoc(productRef, {
          purchaseCount: currentCount + 1,
        });

        if (currentCount + 1 >= 5) {
          console.log(
            `${product.name} has been bought 5 times! Add to recommended products.`
          );
          // Additional logic to add the product to "Recommended Products" can go here
        }
      } else {
        console.error("Product not found in Firestore.");
      }

      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    } catch (error) {
      console.error("Error buying product:", error);
    }
  };

  const handleSearch = (msg) => {
    logEvent(analytics, "search_product", {
      search_term: msg,
    });

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(msg.toLowerCase())
    );
    setFilter(filteredProducts);
  };

  function debounce(msg) {
    clearTimeout(timeout);
    timeout = setTimeout(() => handleSearch(msg), 500);
  }

  return (
    <div className="container mx-auto p-4">
      <ul className="justify-center mb-12 items-center flex gap-4 text-xl font-serif">

        <li>
            <Link
            href={"/recommendation"}
            className="hover:underline mr-2 bg-white text-blue-500 border-blue-500 p-2 rounded-lg"
            >
            Recommended Products
            </Link>
          <Link
            href={"/"}
            className="hover:underline bg-white text-blue-500 border-blue-500 p-2 rounded-lg"
          >
            Home
          </Link>
          <Link
            href={"/login"}
            className="hover:underline mx-5 bg-white text-blue-500 border-blue-500 p-2 rounded-lg"
          >
            Chatbot
          </Link>
          <Link
            href={"/signup"}
            className="hover:underline bg-white text-blue-500 p-2 rounded-lg"
          >
            Signup
          </Link>
        </li>
      </ul>

      <h1 className="text-2xl font-bold mb-6 text-center text-white sticky top-0">
        Our Products
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          onInput={(e) => {
            setSearchTerm(e.target.value);
            debounce(e.target.value);
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filter.length > 0 ? (
          filter.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-t-lg"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.price}</p>
              <button
                onClick={() => buyProduct(product)}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 ease-in-out"
              >
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center font-bold text-white col-span-full">
            No products found
          </p>
        )}
      </div>

      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-md">
          Product bought successfully!
        </div>
      )}
    </div>
  );
}
