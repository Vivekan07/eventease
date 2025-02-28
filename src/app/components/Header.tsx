'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUser, FaShoppingCart, FaBars, FaTimes, FaExchangeAlt } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Update cart count whenever localStorage changes
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartCount(cartItems.length);
    };

    // Initial count
    updateCartCount();

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Custom event listener for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/planner" className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">EventEase</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/planner/services" className="text-gray-600 hover:text-purple-600">Services</Link>
            <Link href="/planner/about" className="text-gray-600 hover:text-purple-600">About</Link>
            <Link href="/planner/contact" className="text-gray-600 hover:text-purple-600">Contact</Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/planner/cart" className="relative text-gray-600 hover:text-purple-600">
              <FaShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/planner/compare" className="text-gray-600 hover:text-purple-600">
              <FaExchangeAlt className="h-6 w-6" />
            </Link>
            <Link href="/planner/profile" className="text-gray-600 hover:text-purple-600">
              <FaUser className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6 text-gray-600" />
            ) : (
              <FaBars className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/planner/services"
                className="text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/planner/about"
                className="text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/planner/contact"
                className="text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/planner/cart"
                className="flex items-center text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart className="h-5 w-5 mr-2" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-purple-600 text-white text-xs font-bold rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/planner/compare"
                className="text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Compare
              </Link>
              <Link
                href="/planner/profile"
                className="text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 