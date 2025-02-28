'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  maxCapacity: number;
  images: string[];
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Premium Wedding Photography',
      category: 'Photography',
      description: 'Professional wedding photography service including pre-wedding shoot, ceremony coverage, and reception.',
      price: 150000,
      duration: '8 hours',
      maxCapacity: 1,
      images: ['/sample1.jpg', '/sample2.jpg'],
      isActive: true
    },
    {
      id: '2',
      name: 'Corporate Event Catering',
      category: 'Catering',
      description: 'Full-service catering for corporate events including setup, service, and cleanup.',
      price: 250000,
      duration: '6 hours',
      maxCapacity: 200,
      images: ['/catering1.jpg'],
      isActive: true
    }
  ]);

  const [categories] = useState<Category[]>([
    { id: '1', name: 'Photography', description: 'Professional photography services' },
    { id: '2', name: 'Catering', description: 'Food and beverage services' },
    { id: '3', name: 'Decoration', description: 'Event decoration and setup' },
    { id: '4', name: 'Entertainment', description: 'Music and entertainment services' }
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    category: '',
    description: '',
    price: 0,
    duration: '',
    maxCapacity: 1,
    images: [],
    isActive: true
  });

  const handleAddService = () => {
    if (newService.name && newService.category && newService.price) {
      const service: Service = {
        id: Date.now().toString(),
        name: newService.name,
        category: newService.category,
        description: newService.description || '',
        price: newService.price,
        duration: newService.duration || '',
        maxCapacity: newService.maxCapacity || 1,
        images: newService.images || [],
        isActive: true
      };
      setServices([...services, service]);
      setNewService({
        name: '',
        category: '',
        description: '',
        price: 0,
        duration: '',
        maxCapacity: 1,
        images: [],
        isActive: true
      });
      setIsAddingService(false);
    }
  };

  const handleUpdateService = (service: Service) => {
    setServices(services.map(s => s.id === service.id ? service : s));
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== serviceId));
    }
  };

  const handleToggleStatus = (serviceId: string) => {
    setServices(services.map(service =>
      service.id === serviceId
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const formatLKR = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  };

  const ServiceForm = ({ service, onSubmit, onCancel }: {
    service: Partial<Service>;
    onSubmit: (service: Service) => void;
    onCancel: () => void;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {service.id ? 'Edit Service' : 'Add New Service'}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Service Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={service.name}
            onChange={(e) => setNewService({ ...service, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={service.category}
            onChange={(e) => setNewService({ ...service, category: e.target.value })}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            rows={3}
            value={service.description}
            onChange={(e) => setNewService({ ...service, description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={service.price}
              onChange={(e) => setNewService({ ...service, price: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={service.duration}
              placeholder="e.g., 2 hours"
              onChange={(e) => setNewService({ ...service, duration: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Maximum Capacity</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={service.maxCapacity}
            onChange={(e) => setNewService({ ...service, maxCapacity: Number(e.target.value) })}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(service as Service)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {service.id ? 'Update Service' : 'Add Service'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Add and manage your service offerings
            </p>
          </div>
          <button
            onClick={() => setIsAddingService(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <FaPlus className="h-4 w-4 mr-2" />
            Add New Service
          </button>
        </div>

        {/* Add/Edit Service Form */}
        {(isAddingService || editingService) && (
          <div className="mb-6">
            <ServiceForm
              service={editingService || newService}
              onSubmit={editingService ? handleUpdateService : handleAddService}
              onCancel={() => {
                setIsAddingService(false);
                setEditingService(null);
              }}
            />
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      service.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{service.description}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    Category: <span className="font-medium text-gray-900">{service.category}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: <span className="font-medium text-gray-900">{formatLKR(service.price)}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: <span className="font-medium text-gray-900">{service.duration}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Max Capacity: <span className="font-medium text-gray-900">{service.maxCapacity}</span>
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingService(service)}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(service.id)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      service.isActive
                        ? 'border-red-300 text-red-700 hover:bg-red-50'
                        : 'border-green-300 text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {service.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 