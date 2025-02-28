'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

interface Booking {
  id: number;
  service: string;
  provider: string;
  customer: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  rating?: number;
  feedback?: string;
}

export default function BookingsManagement() {
  // Mock data for demonstration
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      service: 'House Cleaning',
      provider: 'CleanPro Services',
      customer: 'John Smith',
      date: '2024-03-25',
      time: '10:00 AM',
      status: 'confirmed',
      amount: 80,
      paymentStatus: 'paid',
      rating: 4.5,
      feedback: 'Great service, very thorough cleaning',
    },
    {
      id: 2,
      service: 'Plumbing Repair',
      provider: 'Quick Fix Plumbers',
      customer: 'Sarah Johnson',
      date: '2024-03-26',
      time: '2:30 PM',
      status: 'pending',
      amount: 120,
      paymentStatus: 'pending',
    },
    {
      id: 3,
      service: 'Lawn Mowing',
      provider: 'Green Thumb Gardens',
      customer: 'Mike Wilson',
      date: '2024-03-24',
      time: '9:00 AM',
      status: 'completed',
      amount: 60,
      paymentStatus: 'paid',
      rating: 5,
      feedback: 'Perfect job, my lawn looks amazing',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter bookings based on search term and filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesPayment = filterPayment === 'all' || booking.paymentStatus === filterPayment;
    
    const matchesDate = (!dateRange.start || booking.date >= dateRange.start) &&
                       (!dateRange.end || booking.date <= dateRange.end);

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const handleStatusChange = (bookingId: number, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const handlePaymentStatusChange = (bookingId: number, newStatus: 'paid' | 'pending' | 'refunded') => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, paymentStatus: newStatus } : booking
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Bookings Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all bookings across the platform
          </p>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                id="search"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Booking Status</label>
              <select
                id="status"
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
              <label htmlFor="payment" className="block text-sm font-medium text-gray-700">Payment Status</label>
              <select
                id="payment"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating & Feedback
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{booking.service}</div>
                    <div className="text-sm text-gray-500">ID: #{booking.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{booking.date}</div>
                    <div>{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${booking.amount}</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {booking.rating ? (
                      <div>
                        <div className="text-sm text-gray-900">{booking.rating} / 5</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{booking.feedback}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No rating yet</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="space-y-2">
                      <select
                        className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as 'pending' | 'confirmed' | 'completed' | 'cancelled')}
                      >
                        <option value="pending">Set Pending</option>
                        <option value="confirmed">Set Confirmed</option>
                        <option value="completed">Set Completed</option>
                        <option value="cancelled">Set Cancelled</option>
                      </select>
                      <select
                        className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={booking.paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(booking.id, e.target.value as 'paid' | 'pending' | 'refunded')}
                      >
                        <option value="pending">Payment Pending</option>
                        <option value="paid">Mark Paid</option>
                        <option value="refunded">Mark Refunded</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
} 