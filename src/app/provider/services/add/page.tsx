'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function AddService() {
  const [formData, setFormData] = useState({
    serviceName: '',
    category: '',
    price: '',
    duration: '',
    description: '',
    location: '',
    availability: [] as string[],
  });

  const categories = [
    'Cleaning',
    'Plumbing',
    'Electrical',
    'Gardening',
    'Home Repair',
    'Moving',
    'Painting',
    'Other'
  ];

  const availabilityOptions = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvailabilityChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Add New Service</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Service Name */}
            <div>
              <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (USD)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Service Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter service area or location"
                required
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availabilityOptions.map(day => (
                  <div key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      id={day}
                      checked={formData.availability.includes(day)}
                      onChange={() => handleAvailabilityChange(day)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={day} className="ml-2 block text-sm text-gray-700">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
} 