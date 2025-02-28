'use client';

import { useState } from 'react';
import { FaCalendar, FaStar, FaComments, FaTag, FaClock, FaCheckCircle } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';

interface Booking {
  id: string;
  customerName: string;
  eventType: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface Message {
  id: string;
  customerName: string;
  preview: string;
  timestamp: string;
  unread: boolean;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ServiceProviderDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      customerName: 'John Doe',
      eventType: 'Wedding',
      date: '2024-04-15',
      status: 'pending'
    },
    // Add more mock bookings
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      customerName: 'Alice Smith',
      preview: 'Hi, I would like to discuss the catering package...',
      timestamp: '10:30 AM',
      unread: true
    },
    // Add more mock messages
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      customerName: 'Bob Wilson',
      rating: 5,
      comment: 'Excellent service! Very professional and punctual.',
      date: '2024-03-20'
    },
    // Add more mock reviews
  ]);

  const stats = {
    totalBookings: 45,
    completedBookings: 38,
    averageRating: 4.8,
    totalRevenue: 15000,
    activePromotions: 2,
    responseRate: 95
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaCalendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {stats.completedBookings} completed
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.averageRating}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaStar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(stats.averageRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaTag className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {stats.activePromotions} active promotions
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-6 space-y-4">
            {bookings.slice(0, 3).map(booking => (
              <div key={booking.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FaCalendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      New booking from {booking.customerName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.eventType} - {booking.date}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaCalendar className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">View Calendar</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaTag className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Add Promotion</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaComments className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Messages</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaClock className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Update Hours</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your services, bookings, and customer interactions
                </p>
              </div>
              <div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <FaCheckCircle className="h-4 w-4 mr-2" />
                  Update Status
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['overview', 'bookings', 'services', 'messages', 'reviews', 'promotions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            {activeTab === 'overview' && renderOverview()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 