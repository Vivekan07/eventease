'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

interface Service {
  id: number;
  name: string;
  category: string;
  provider: string;
  status: 'active' | 'pending' | 'suspended';
  price: number;
  rating: number;
  bookings: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  servicesCount: number;
}

export default function ServicesManagement() {
  // Mock data for demonstration
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'House Cleaning',
      category: 'Cleaning',
      provider: 'CleanPro Services',
      status: 'active',
      price: 80,
      rating: 4.5,
      bookings: 150,
    },
    {
      id: 2,
      name: 'Plumbing Repair',
      category: 'Plumbing',
      provider: 'Quick Fix Plumbers',
      status: 'active',
      price: 120,
      rating: 4.8,
      bookings: 89,
    },
    {
      id: 3,
      name: 'Lawn Mowing',
      category: 'Gardening',
      provider: 'Green Thumb Gardens',
      status: 'suspended',
      price: 60,
      rating: 3.9,
      bookings: 45,
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Cleaning',
      description: 'Home and office cleaning services',
      servicesCount: 25,
    },
    {
      id: 2,
      name: 'Plumbing',
      description: 'Plumbing installation and repair services',
      servicesCount: 15,
    },
    {
      id: 3,
      name: 'Gardening',
      description: 'Lawn care and gardening services',
      servicesCount: 20,
    },
  ]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter services based on search term and filters
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([...categories, {
        id: categories.length + 1,
        name: newCategory.name,
        description: newCategory.description,
        servicesCount: 0,
      }]);
      setNewCategory({ name: '', description: '' });
      setShowAddCategory(false);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (window.confirm('Are you sure you want to delete this category? This will affect all services in this category.')) {
      setCategories(categories.filter(category => category.id !== categoryId));
    }
  };

  const handleServiceStatusChange = (serviceId: number, newStatus: 'active' | 'pending' | 'suspended') => {
    setServices(services.map(service =>
      service.id === serviceId ? { ...service, status: newStatus } : service
    ));
  };

  const handleDeleteService = (serviceId: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  return (
    <AdminLayout>
      {/* Categories Section */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Service Categories</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage service categories and their descriptions
            </p>
          </div>
          <button
            onClick={() => setShowAddCategory(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>

        {showAddCategory && (
          <div className="p-4 border-b border-gray-200">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  id="categoryName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  id="categoryDescription"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddCategory(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Category
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.servicesCount} services
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Service Listings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor service listings across categories
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
                placeholder="Search by name or provider"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="categoryFilter"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="statusFilter"
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
          </div>
        </div>

        {/* Services Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      service.status === 'active' ? 'bg-green-100 text-green-800' :
                      service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${service.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.rating.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <select
                      className="mr-2 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={service.status}
                      onChange={(e) => handleServiceStatusChange(service.id, e.target.value as 'active' | 'pending' | 'suspended')}
                    >
                      <option value="active">Set Active</option>
                      <option value="pending">Set Pending</option>
                      <option value="suspended">Suspend</option>
                    </select>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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