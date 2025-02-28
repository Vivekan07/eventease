'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaStar, FaArrowLeft, FaShoppingCart, FaComments, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaImage, FaSmile, FaTimes } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'provider';
  timestamp: Date;
}

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Amazing service! The photos were absolutely stunning.',
      date: '2024-03-15'
    },
    {
      id: '2',
      userName: 'David K.',
      rating: 4,
      comment: 'Very professional and punctual. Great work overall.',
      date: '2024-03-10'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'provider',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: 'I\'m interested in your service. Can you tell me more about the packages?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000)
    },
    {
      id: '3',
      text: 'Of course! We have several packages available. Our most popular package includes...',
      sender: 'provider',
      timestamp: new Date(Date.now() - 2400000)
    }
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, showChat]);

  // Sample service data - in real app, fetch this based on params.id
  const service = {
    id: '1',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    name: 'Premium Photography',
    category: 'Photography',
    rating: 4.8,
    reviews: 156,
    price: 150000,
    description: 'Professional photography service for all your event needs. We specialize in capturing your special moments with artistic excellence and attention to detail.',
    provider: {
      name: 'John Smith Photography',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      experience: '10+ years',
      phone: '+94 77 123 4567',
      email: 'john@smithphotography.com',
      location: 'Valvetithurai, Sri Lanka'
    }
  };

  const formatLKR = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  };

  const renderStars = (rating: number, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        } ${interactive ? 'cursor-pointer' : ''}`}
        onClick={interactive ? () => setNewReview({ ...newReview, rating: index + 1 }) : undefined}
      />
    ));
  };

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (!cartItems.includes(service.id)) {
      cartItems.push(service.id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // Dispatch custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'));
      alert('Service added to cart!');
    } else {
      alert('Service is already in cart!');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate provider response
      setTimeout(() => {
        const providerResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. I\'ll get back to you shortly.',
          sender: 'provider',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, providerResponse]);
      }, 1000);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        userName: 'You', // In real app, get from user profile
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/planner/services"
              className="inline-flex items-center text-purple-600 hover:text-purple-700"
            >
              <FaArrowLeft className="mr-2 h-5 w-5" />
              Back to Services
            </Link>
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-96 object-cover"
                />
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                  <p className="mt-2 text-purple-600">{service.category}</p>
                  
                  <div className="mt-4 flex items-center">
                    {renderStars(service.rating)}
                    <span className="ml-2 text-gray-600">
                      ({service.reviews} reviews)
                    </span>
                  </div>

                  <p className="mt-4 text-gray-600">{service.description}</p>
                  
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-900">Price</h2>
                    <p className="mt-2 text-2xl font-bold text-purple-600">
                      {formatLKR(service.price)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Add Review Form */}
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Write a Review
                </h2>
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex">
                      {renderStars(newReview.rating, true)}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews Section */}
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Customer Reviews
                </h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center">
                        <FaUser className="h-10 w-10 text-gray-400" />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold">{review.userName}</h3>
                          <div className="flex items-center mt-1">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Provider Info */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center">
                  <img
                    src={service.provider.image}
                    alt={service.provider.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {service.provider.name}
                    </h2>
                    <p className="text-gray-600">{service.provider.experience} experience</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-gray-600">{service.provider.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-gray-600">{service.provider.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-gray-600">{service.provider.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <button
                  onClick={addToCart}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 mb-4 flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>

                <button
                  onClick={() => setShowChat(!showChat)}
                  className="w-full bg-purple-50 text-purple-600 px-6 py-3 rounded-md hover:bg-purple-100 flex items-center justify-center"
                >
                  <FaComments className="mr-2 h-5 w-5" />
                  Chat with Provider
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        {showChat && (
          <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-purple-600 text-white">
              <div className="flex items-center">
                <button onClick={() => setShowChat(false)} className="mr-3">
                  <FaTimes className="h-5 w-5" />
                </button>
                <div>
                  <h3 className="font-semibold">{service.provider.name}</h3>
                  <p className="text-sm text-purple-200">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 h-[calc(100vh-180px)] bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-white shadow-md rounded-tl-none'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button type="button" className="text-gray-500 hover:text-purple-600">
                  <FaSmile className="h-6 w-6" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
                >
                  <FaPaperPlane className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 