'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaShoppingCart, FaExchangeAlt, FaStar, FaHeart, FaFilter, FaCheck, FaCamera, FaUtensils, FaMusic, FaPaintBrush } from 'react-icons/fa';
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

export default function PlannerHome() {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const categories = [
    { name: 'Photography', icon: <FaCamera />, count: 45 },
    { name: 'Catering', icon: <FaUtensils />, count: 32 },
    { name: 'Entertainment', icon: <FaMusic />, count: 28 },
    { name: 'Decoration', icon: <FaPaintBrush />, count: 36 }
  ];

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

  const formatLKR = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  };

  const showNotificationWithTimeout = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleAddToCart = (serviceId: string) => {
    if (!cartItems.includes(serviceId)) {
      setCartItems([...cartItems, serviceId]);
      showNotificationWithTimeout('Service added to cart successfully!');
      
      // Store in localStorage
      const updatedCart = [...cartItems, serviceId];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } else {
      showNotificationWithTimeout('Service is already in cart!');
    }
  };

  const handleAddToCompare = (serviceId: string) => {
    if (compareItems.length >= 3 && !compareItems.includes(serviceId)) {
      showNotificationWithTimeout('You can compare up to 3 services at a time!');
      return;
    }

    if (!compareItems.includes(serviceId)) {
      const updatedCompareItems = [...compareItems, serviceId];
      setCompareItems(updatedCompareItems);
      showNotificationWithTimeout('Service added to comparison!');
      
      // Store in localStorage
      localStorage.setItem('compareItems', JSON.stringify(updatedCompareItems));
    } else {
      const updatedCompareItems = compareItems.filter(id => id !== serviceId);
      setCompareItems(updatedCompareItems);
      showNotificationWithTimeout('Service removed from comparison!');
      
      // Update localStorage
      localStorage.setItem('compareItems', JSON.stringify(updatedCompareItems));
    }
  };

  // Load cart and compare items from localStorage on component mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    const savedCompare = localStorage.getItem('compareItems');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedCompare) {
      setCompareItems(JSON.parse(savedCompare));
    }
  }, []);

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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Notification */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300">
            {notificationMessage}
          </div>
        )}
        
        {/* Hero Section */}
        <div className="bg-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                Find Perfect Services for Your Event
              </h1>
              <p className="mt-6 text-xl text-purple-100">
                Connect with the best event service providers in one place
              </p>
              <div className="mt-10">
                <div className="max-w-xl mx-auto bg-white rounded-full shadow-lg p-2">
                  <div className="flex">
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        className="w-full border-0 bg-transparent px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
                        placeholder="Search for services..."
                      />
                    </div>
                    <button className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800">
                      <FaSearch className="mr-2" />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/planner/services?category=${category.name}`}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="text-purple-600 text-3xl mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {category.count} services
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Services Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Services
              </h2>
              <Link
                href="/planner/services"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/planner/services/${service.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-sm text-purple-600">
                      {service.category}
                    </p>
                    <div className="mt-2 flex items-center">
                      <div className="flex">
                        {renderStars(service.rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({service.reviews} reviews)
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-lg font-bold text-purple-600">
                        {formatLKR(service.price)}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(service.id);
                        }}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                      >
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCompare(service.id);
                        }}
                        className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors duration-200 ${
                          compareItems.includes(service.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {compareItems.includes(service.id) ? (
                          <FaCheck className="mr-2" />
                        ) : (
                          <FaExchangeAlt className="mr-2" />
                        )}
                        {compareItems.includes(service.id) ? 'Added' : 'Compare'}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Plan Your Perfect Event?
            </h2>
            <p className="mt-4 text-xl text-purple-100">
              Browse our services and start planning today
            </p>
            <div className="mt-8">
              <Link
                href="/planner/services"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 md:text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 