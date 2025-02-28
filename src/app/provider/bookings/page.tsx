'use client';

import { useState } from 'react';
import { FaCalendar, FaCheck, FaTimes, FaClock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';

interface Booking {
  id: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  notes: string;
  specialRequests?: string;
}

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      serviceName: 'Premium Wedding Photography',
      customerName: 'John & Sarah Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '+1 (555) 123-4567',
      date: '2024-04-15',
      time: '10:00 AM',
      status: 'confirmed',
      totalAmount: 150000,
      paymentStatus: 'paid',
      notes: 'Outdoor wedding at Central Park',
      specialRequests: 'Extra focus on candid shots'
    },
    {
      id: '2',
      serviceName: 'Corporate Event Catering',
      customerName: 'Tech Corp Inc.',
      customerEmail: 'events@techcorp.com',
      customerPhone: '+1 (555) 987-6543',
      date: '2024-04-20',
      time: '12:00 PM',
      status: 'pending',
      totalAmount: 250000,
      paymentStatus: 'pending',
      notes: 'Annual company meeting',
      specialRequests: 'Vegetarian options required'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesDate = !filterDate || booking.date === filterDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLKR = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your bookings and appointments
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Search</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Search by customer or service"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white shadow rounded-lg">
          <div className="divide-y divide-gray-200">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Booking Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{booking.serviceName}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <FaCalendar className="h-4 w-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <FaClock className="h-4 w-4" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">{booking.notes}</p>
                      {booking.specialRequests && (
                        <p className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Special Requests:</span> {booking.specialRequests}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <FaUser className="h-4 w-4 text-gray-400" />
                        <span>{booking.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="h-4 w-4 text-gray-400" />
                        <span>{booking.customerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaPhone className="h-4 w-4 text-gray-400" />
                        <span>{booking.customerPhone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Payment Status:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Amount:</span>
                        <span className="font-medium">{formatLKR(booking.totalAmount)}</span>
                      </div>
                      <div className="flex flex-col space-y-2 mt-4">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                            >
                              <FaCheck className="h-4 w-4 mr-2" />
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                              <FaTimes className="h-4 w-4 mr-2" />
                              Cancel
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'completed')}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                          >
                            <FaCheck className="h-4 w-4 mr-2" />
                            Mark as Completed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 