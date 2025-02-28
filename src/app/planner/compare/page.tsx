'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaStar, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';

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

export default function ComparePage() {
  const [compareItems, setCompareItems] = useState<Service[]>([]);

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
    const savedCompare = localStorage.getItem('compareItems');
    if (savedCompare) {
      const compareIds = JSON.parse(savedCompare);
      const servicesForComparison = featuredServices.filter(service => 
        compareIds.includes(service.id)
      );
      setCompareItems(servicesForComparison);
    }
  }, []);

  const formatLKR = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const removeFromComparison = (serviceId: string) => {
    const updatedCompareItems = compareItems.filter(item => item.id !== serviceId);
    setCompareItems(updatedCompareItems);
    localStorage.setItem('compareItems', JSON.stringify(updatedCompareItems.map(item => item.id)));
  };

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">No Services to Compare</h2>
            <p className="mt-4 text-lg text-gray-600">Add some services to compare them side by side.</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Compare Services</h1>
          <Link
            href="/planner"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            <FaArrowLeft className="mr-2 h-5 w-5" />
            Back to Services
          </Link>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            {compareItems.map((service) => (
              <div key={service.id} className="p-6 relative">
                <button
                  onClick={() => removeFromComparison(service.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-purple-600">{service.category}</p>
                
                <div className="mt-4">
                  <div className="flex items-center">
                    {renderStars(service.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      ({service.reviews} reviews)
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">{service.description}</p>
                
                <div className="mt-4">
                  <p className="text-xl font-bold text-purple-600">
                    {formatLKR(service.price)}
                  </p>
                </div>

                <button
                  className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 