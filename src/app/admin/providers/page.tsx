'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

interface ServiceProvider {
  id: number;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  serviceCategories: string[];
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  totalBookings: number;
  completionRate: number;
  joinDate: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  documents: {
    type: string;
    status: 'verified' | 'pending' | 'rejected';
  }[];
}

export default function ServiceProvidersManagement() {
  // Mock data for demonstration
  const [providers, setProviders] = useState<ServiceProvider[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@cleanpro.com',
      phone: '+1 (555) 123-4567',
      businessName: 'CleanPro Services',
      serviceCategories: ['Cleaning', 'Home Maintenance'],
      status: 'active',
      rating: 4.8,
      totalBookings: 156,
      completionRate: 98,
      joinDate: '2024-01-15',
      verificationStatus: 'verified',
      documents: [
        { type: 'Business License', status: 'verified' },
        { type: 'Insurance', status: 'verified' },
        { type: 'ID Proof', status: 'verified' }
      ]
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@quickfix.com',
      phone: '+1 (555) 987-6543',
      businessName: 'Quick Fix Plumbers',
      serviceCategories: ['Plumbing'],
      status: 'pending',
      rating: 0,
      totalBookings: 0,
      completionRate: 0,
      joinDate: '2024-03-20',
      verificationStatus: 'pending',
      documents: [
        { type: 'Business License', status: 'pending' },
        { type: 'Insurance', status: 'pending' },
        { type: 'ID Proof', status: 'verified' }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@greenthumb.com',
      phone: '+1 (555) 456-7890',
      businessName: 'Green Thumb Gardens',
      serviceCategories: ['Gardening', 'Landscaping'],
      status: 'suspended',
      rating: 3.9,
      totalBookings: 45,
      completionRate: 85,
      joinDate: '2024-02-01',
      verificationStatus: 'verified',
      documents: [
        { type: 'Business License', status: 'verified' },
        { type: 'Insurance', status: 'rejected' },
        { type: 'ID Proof', status: 'verified' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVerification, setFilterVerification] = useState('all');

  // Filter providers based on search term and filters
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || provider.status === filterStatus;
    const matchesVerification = filterVerification === 'all' || provider.verificationStatus === filterVerification;

    return matchesSearch && matchesStatus && matchesVerification;
  });

  const handleStatusChange = (providerId: number, newStatus: 'active' | 'pending' | 'suspended') => {
    setProviders(providers.map(provider =>
      provider.id === providerId ? { ...provider, status: newStatus } : provider
    ));
  };

  const handleVerificationStatusChange = (providerId: number, newStatus: 'verified' | 'pending' | 'rejected') => {
    setProviders(providers.map(provider =>
      provider.id === providerId ? { ...provider, verificationStatus: newStatus } : provider
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Service Providers Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor service providers across the platform
          </p>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                id="search"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search by name, email, or business"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label htmlFor="verification" className="block text-sm font-medium text-gray-700">Verification</label>
              <select
                id="verification"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filterVerification}
                onChange={(e) => setFilterVerification(e.target.value)}
              >
                <option value="all">All Verification Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Providers List */}
        <div className="divide-y divide-gray-200">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Provider Info */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{provider.businessName}</h4>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{provider.name}</p>
                    <p>{provider.email}</p>
                    <p>{provider.phone}</p>
                    <p className="mt-2">Joined: {provider.joinDate}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {provider.serviceCategories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="text-lg font-semibold text-gray-900">{provider.rating.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Bookings</p>
                      <p className="text-lg font-semibold text-gray-900">{provider.totalBookings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completion Rate</p>
                      <p className="text-lg font-semibold text-gray-900">{provider.completionRate}%</p>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Account Status</p>
                      <select
                        className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={provider.status}
                        onChange={(e) => handleStatusChange(provider.id, e.target.value as 'active' | 'pending' | 'suspended')}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Verification Status</p>
                      <select
                        className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={provider.verificationStatus}
                        onChange={(e) => handleVerificationStatusChange(provider.id, e.target.value as 'verified' | 'pending' | 'rejected')}
                      >
                        <option value="verified">Verified</option>
                        <option value="pending">Pending Review</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Documents</p>
                    <div className="space-y-2">
                      {provider.documents.map((doc) => (
                        <div key={doc.type} className="flex items-center justify-between">
                          <span className="text-sm text-gray-900">{doc.type}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
} 