'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaStar, FaSearch, FaFilter } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

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

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Sample services data
  const services: Service[] = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      name: 'Premium Photography',
      category: 'Photography',
      rating: 4.8,
      reviews: 156,
      price: 150000,
      description: 'Professional photography service for all your event needs.'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3',
      name: 'Luxury Catering',
      category: 'Catering',
      rating: 4.9,
      reviews: 203,
      price: 250000,
      description: 'Exquisite catering service with international cuisine.'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
      name: 'Live Band',
      category: 'Entertainment',
      rating: 4.7,
      reviews: 128,
      price: 180000,
      description: 'Professional live band for your entertainment needs.'
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a',
      name: 'Deluxe Decoration',
      category: 'Decoration',
      rating: 4.6,
      reviews: 142,
      price: 120000,
      description: 'Transform your venue with our elegant decoration services.'
    }
  ];

  const categories = ['All', 'Photography', 'Catering', 'Entertainment', 'Decoration'];

  const formatLKR = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || 
                           service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
            <p className="mt-4 text-lg text-gray-600">
              Find and book the perfect services for your event
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Link href={`/planner/services/${service.id}`} key={service.id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    <p className="mt-1 text-sm text-purple-600">{service.category}</p>
                    
                    <div className="mt-2 flex items-center">
                      <div className="flex">
                        {renderStars(service.rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({service.reviews} reviews)
                      </span>
                    </div>

                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="mt-4">
                      <p className="text-lg font-bold text-purple-600">
                        {formatLKR(service.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 