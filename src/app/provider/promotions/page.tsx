'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTag, FaClock, FaPercent } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';

interface Promotion {
  id: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  services: string[];
  minimumBookingAmount?: number;
  maxUsage?: number;
  usageCount: number;
  isActive: boolean;
  code: string;
}

export default function PromotionsManagement() {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      name: 'Early Bird Special',
      description: 'Book early and save 20% on all photography services',
      discountType: 'percentage',
      discountValue: 20,
      startDate: '2024-04-01',
      endDate: '2024-05-31',
      services: ['Premium Wedding Photography', 'Event Photography'],
      minimumBookingAmount: 100000,
      maxUsage: 50,
      usageCount: 12,
      isActive: true,
      code: 'EARLY20'
    },
    {
      id: '2',
      name: 'Summer Package Deal',
      description: 'Fixed LKR 50,000 off on catering packages above LKR 200,000',
      discountType: 'fixed',
      discountValue: 50000,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      services: ['Corporate Event Catering', 'Wedding Catering'],
      minimumBookingAmount: 200000,
      maxUsage: 30,
      usageCount: 5,
      isActive: true,
      code: 'SUMMER500'
    }
  ]);

  const [isAddingPromotion, setIsAddingPromotion] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    name: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    startDate: '',
    endDate: '',
    services: [],
    isActive: true,
    code: ''
  });

  const services = [
    'Premium Wedding Photography',
    'Event Photography',
    'Corporate Event Catering',
    'Wedding Catering'
  ];

  const handleAddPromotion = () => {
    if (newPromotion.name && newPromotion.discountValue && newPromotion.code) {
      const promotion: Promotion = {
        id: Date.now().toString(),
        name: newPromotion.name,
        description: newPromotion.description || '',
        discountType: newPromotion.discountType || 'percentage',
        discountValue: newPromotion.discountValue,
        startDate: newPromotion.startDate || '',
        endDate: newPromotion.endDate || '',
        services: newPromotion.services || [],
        minimumBookingAmount: newPromotion.minimumBookingAmount,
        maxUsage: newPromotion.maxUsage,
        usageCount: 0,
        isActive: true,
        code: newPromotion.code
      };
      setPromotions([...promotions, promotion]);
      setNewPromotion({
        name: '',
        description: '',
        discountType: 'percentage',
        discountValue: 0,
        startDate: '',
        endDate: '',
        services: [],
        isActive: true,
        code: ''
      });
      setIsAddingPromotion(false);
    }
  };

  const handleUpdatePromotion = (promotion: Promotion) => {
    setPromotions(promotions.map(p => p.id === promotion.id ? promotion : p));
    setEditingPromotion(null);
  };

  const handleDeletePromotion = (promotionId: string) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      setPromotions(promotions.filter(p => p.id !== promotionId));
    }
  };

  const handleToggleStatus = (promotionId: string) => {
    setPromotions(promotions.map(promotion =>
      promotion.id === promotionId
        ? { ...promotion, isActive: !promotion.isActive }
        : promotion
    ));
  };

  const formatLKR = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  };

  const PromotionForm = ({ promotion, onSubmit, onCancel }: {
    promotion: Partial<Promotion>;
    onSubmit: (promotion: Promotion) => void;
    onCancel: () => void;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {promotion.id ? 'Edit Promotion' : 'Add New Promotion'}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Promotion Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={promotion.name}
            onChange={(e) => setNewPromotion({ ...promotion, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            rows={3}
            value={promotion.description}
            onChange={(e) => setNewPromotion({ ...promotion, description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={promotion.discountType}
              onChange={(e) => setNewPromotion({ ...promotion, discountType: e.target.value as 'percentage' | 'fixed' })}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Value {promotion.discountType === 'percentage' ? '(%)' : '(LKR)'}
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={promotion.discountValue}
              onChange={(e) => setNewPromotion({ ...promotion, discountValue: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={promotion.startDate}
              onChange={(e) => setNewPromotion({ ...promotion, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={promotion.endDate}
              onChange={(e) => setNewPromotion({ ...promotion, endDate: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Applicable Services</label>
          <select
            multiple
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={promotion.services}
            onChange={(e) => setNewPromotion({
              ...promotion,
              services: Array.from(e.target.selectedOptions, option => option.value)
            })}
          >
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Booking Amount</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={promotion.minimumBookingAmount}
              onChange={(e) => setNewPromotion({ ...promotion, minimumBookingAmount: Number(e.target.value) })}
              placeholder="Enter amount in LKR"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Usage</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={promotion.maxUsage}
              onChange={(e) => setNewPromotion({ ...promotion, maxUsage: Number(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Promotion Code</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={promotion.code}
            onChange={(e) => setNewPromotion({ ...promotion, code: e.target.value.toUpperCase() })}
            placeholder="e.g., SUMMER2024"
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
            onClick={() => onSubmit(promotion as Promotion)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {promotion.id ? 'Update Promotion' : 'Add Promotion'}
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
            <h1 className="text-2xl font-bold text-gray-900">Promotions Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create and manage special offers and discounts
            </p>
          </div>
          <button
            onClick={() => setIsAddingPromotion(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <FaPlus className="h-4 w-4 mr-2" />
            Add New Promotion
          </button>
        </div>

        {/* Add/Edit Promotion Form */}
        {(isAddingPromotion || editingPromotion) && (
          <div className="mb-6">
            <PromotionForm
              promotion={editingPromotion || newPromotion}
              onSubmit={editingPromotion ? handleUpdatePromotion : handleAddPromotion}
              onCancel={() => {
                setIsAddingPromotion(false);
                setEditingPromotion(null);
              }}
            />
          </div>
        )}

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map(promotion => (
            <div key={promotion.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{promotion.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      promotion.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {promotion.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{promotion.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaPercent className="h-4 w-4 mr-2" />
                    <span>
                      {promotion.discountType === 'percentage'
                        ? `${promotion.discountValue}% off`
                        : `${formatLKR(promotion.discountValue)} off`}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="h-4 w-4 mr-2" />
                    <span>{promotion.startDate} to {promotion.endDate}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaTag className="h-4 w-4 mr-2" />
                    <span>Code: {promotion.code}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Usage: {promotion.usageCount}/{promotion.maxUsage || '∞'}</span>
                    <span className="text-gray-500">
                      Min. Booking: {formatLKR(promotion.minimumBookingAmount || 0)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingPromotion(promotion)}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePromotion(promotion.id)}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(promotion.id)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      promotion.isActive
                        ? 'border-red-300 text-red-700 hover:bg-red-50'
                        : 'border-green-300 text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {promotion.isActive ? 'Deactivate' : 'Activate'}
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