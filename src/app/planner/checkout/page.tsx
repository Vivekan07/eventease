'use client';

import React, { useState } from 'react';
import { FaLock, FaCreditCard, FaCalendar, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';

interface CheckoutItem {
  id: string;
  serviceName: string;
  provider: string;
  date: string;
  time: string;
  location: string;
  price: number;
}

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: ''
  });

  const checkoutItems: CheckoutItem[] = [
    {
      id: '1',
      serviceName: 'Premium Wedding Photography',
      provider: 'John Photography',
      date: '2024-03-20',
      time: '14:00',
      location: 'Valvetithurai',
      price: 150000
    },
    {
      id: '2',
      serviceName: 'Luxury Catering Service',
      provider: 'Gourmet Delights',
      date: '2024-03-20',
      time: '12:00',
      location: 'Valvetithurai',
      price: 250000
    }
  ];

  const formatLKR = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  };

  const calculateSubtotal = () => {
    return checkoutItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateServiceFee = () => {
    return 2000; // Fixed service fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceFee();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Here you would typically:
      // 1. Create a payment intent with Stripe
      // 2. Confirm the payment
      // 3. Handle the response
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call
      // Redirect to success page
      window.location.href = '/planner/checkout/success';
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-start border-b border-gray-200 pb-4">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">{item.serviceName}</h3>
                      <p className="text-sm text-gray-500">{item.provider}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FaCalendar className="h-4 w-4 text-gray-400 mr-1" />
                        <span>{item.date} at {item.time}</span>
                        <span className="mx-2">·</span>
                        <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-1" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <p className="text-base font-medium text-gray-900">{formatLKR(item.price)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p>{formatLKR(calculateSubtotal())}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Service Fee</p>
                  <p>{formatLKR(calculateServiceFee())}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 border-t border-gray-200 pt-2">
                  <p>Total</p>
                  <p>{formatLKR(calculateTotal())}</p>
                </div>
              </div>
            </div>

            {/* Secure Payment Notice */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center">
                <FaLock className="h-5 w-5 text-purple-600" />
                <p className="ml-2 text-sm text-purple-700">
                  Your payment is secured by Stripe. We never store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="4242 4242 4242 4242"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FaLock className="h-5 w-5 mr-2" />
                      Pay {formatLKR(calculateTotal())}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 