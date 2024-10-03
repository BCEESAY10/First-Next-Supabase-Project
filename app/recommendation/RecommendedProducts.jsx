"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { firebaseApp } from '../api/firebase';
import Link from 'next/link';

export default function RecommendedProducts() {
    const [recommendedProducts, setRecommendedProducts] = useState([]);
  
    useEffect(() => {
      // Fetch products with at least 5 purchases from Firebase
      const fetchRecommendedProducts = async () => {
        try {
          const productsRef = firebase.firestore().collection('products');
          const snapshot = await productsRef.where('purchaseCount', '>=', 5).get();
          const products = snapshot.docs.map(doc => doc.data());
          setRecommendedProducts(products);
        } catch (error) {
          console.error('Error fetching recommended products:', error);
        }
      };
  
      fetchRecommendedProducts();
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        
        <Link
            href={"/products"}
            className="hover:underline bg-white text-blue-500 border-blue-500 p-2 rounded-lg"
            >
            Back
            </Link>

            <h1 className="text-2xl font-bold mb-6 text-white text-center">Recommended Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-t-lg"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }