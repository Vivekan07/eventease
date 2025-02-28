'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaTrash, FaCreditCard, FaLock } from 'react-icons/fa';

interface Service {
  id: string;
  image: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  description: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Service[]>([]);

  const featuredServices: Service[] = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      name: 'Premium Photography',
      category: 'Photography',
      rating: 4.8,
      reviews: 156,
      price: 150000,
      description: 'Professional photography service for all your event needs'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3',
      name: 'Luxury Catering',
      category: 'Catering',
      rating: 4.9,
      reviews: 203,
      price: 250000,
      description: 'Exquisite catering service with international cuisine'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
      name: 'Live Band',
      category: 'Entertainment',
      rating: 4.7,
      reviews: 128,
      price: 180000,
      description: 'Professional live band for your entertainment needs'
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a',
      name: 'Deluxe Decoration',
      category: 'Decoration',
      rating: 4.6,
      reviews: 142,
      price: 120000,
      description: 'Transform your venue with our elegant decoration services'
    }
  ];

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const cartIds = JSON.parse(savedCart);
      const servicesInCart = featuredServices.filter(service => 
        cartIds.includes(service.id)
      );
      setCartItems(servicesInCart);
    }
  }, []);

  const formatLKR = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  };

  const removeFromCart = (serviceId: string) => {
    const updatedCartItems = cartItems.filter(item => item.id !== serviceId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems.map(item => item.id)));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateServiceFee = () => {
    return calculateSubtotal() * 0.05; // 5% service fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceFee();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h2>
            <p className="mt-4 text-lg text-gray-600">Add some services to your cart to get started.</p>
            <Link
              href="/planner"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              <FaArrowLeft className="mr-2 h-5 w-5" />
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <Link
            href="/planner"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            <FaArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b last:border-b-0">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-purple-600">{item.category}</p>
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="ml-6 flex flex-col items-end">
                      <p className="text-lg font-bold text-purple-600">
                        {formatLKR(item.price)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatLKR(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee (5%)</span>
                  <span className="text-gray-900">{formatLKR(calculateServiceFee())}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-purple-600">
                      {formatLKR(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/planner/checkout"
                className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                <FaCreditCard className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </Link>

              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <FaLock className="h-4 w-4 mr-2" />
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 