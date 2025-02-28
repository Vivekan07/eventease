'use client';

import { useState } from 'react';
import { FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaLock } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';

interface Profile {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
  };
  businessInfo: {
    businessName: string;
    description: string;
    website: string;
    serviceAreas: string[];
    yearsInBusiness: number;
  };
  accountSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    showContactInfo: boolean;
  };
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+94 77 123 4567',
      address: 'No. 123, Sample Street, Valvetithurai 03',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    businessInfo: {
      businessName: 'JD Event Services',
      description: 'Professional event planning and management services with over 5 years of experience.',
      website: 'www.jdevents.com',
      serviceAreas: ['Valvetithurai', 'Gampaha', 'Kalutara'],
      yearsInBusiness: 5,
    },
    accountSettings: {
      emailNotifications: true,
      smsNotifications: true,
      showContactInfo: true,
    },
  });

  const handleSave = () => {
    // Here you would typically make an API call to save the profile
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          personalInfo: {
            ...profile.personalInfo,
            avatar: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {/* Personal Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
              <div className="flex items-start">
                <div className="relative">
                  <img
                    src={profile.personalInfo.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer">
                      <FaCamera className="h-4 w-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <div className="ml-6 flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={profile.personalInfo.name}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo, name: e.target.value }
                      })}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1 flex items-center">
                        <FaEnvelope className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                          type="email"
                          value={profile.personalInfo.email}
                          onChange={(e) => setProfile({
                            ...profile,
                            personalInfo: { ...profile.personalInfo, email: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <div className="mt-1 flex items-center">
                        <FaPhone className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                          type="tel"
                          value={profile.personalInfo.phone}
                          onChange={(e) => setProfile({
                            ...profile,
                            personalInfo: { ...profile.personalInfo, phone: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <div className="mt-1 flex items-center">
                      <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        value={profile.personalInfo.address}
                        onChange={(e) => setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, address: e.target.value }
                        })}
                        disabled={!isEditing}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Business Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input
                    type="text"
                    value={profile.businessInfo.businessName}
                    onChange={(e) => setProfile({
                      ...profile,
                      businessInfo: { ...profile.businessInfo, businessName: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={3}
                    value={profile.businessInfo.description}
                    onChange={(e) => setProfile({
                      ...profile,
                      businessInfo: { ...profile.businessInfo, description: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <div className="mt-1 flex items-center">
                      <FaGlobe className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        value={profile.businessInfo.website}
                        onChange={(e) => setProfile({
                          ...profile,
                          businessInfo: { ...profile.businessInfo, website: e.target.value }
                        })}
                        disabled={!isEditing}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Years in Business</label>
                    <input
                      type="number"
                      value={profile.businessInfo.yearsInBusiness}
                      onChange={(e) => setProfile({
                        ...profile,
                        businessInfo: { ...profile.businessInfo, yearsInBusiness: Number(e.target.value) }
                      })}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Areas</label>
                  <input
                    type="text"
                    value={profile.businessInfo.serviceAreas.join(', ')}
                    onChange={(e) => setProfile({
                      ...profile,
                      businessInfo: { ...profile.businessInfo, serviceAreas: e.target.value.split(',').map(area => area.trim()) }
                    })}
                    disabled={!isEditing}
                    placeholder="Enter areas separated by commas"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications about bookings and messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.accountSettings.emailNotifications}
                      onChange={(e) => setProfile({
                        ...profile,
                        accountSettings: { ...profile.accountSettings, emailNotifications: e.target.checked }
                      })}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">SMS Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.accountSettings.smsNotifications}
                      onChange={(e) => setProfile({
                        ...profile,
                        accountSettings: { ...profile.accountSettings, smsNotifications: e.target.checked }
                      })}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Show Contact Information</h3>
                    <p className="text-sm text-gray-500">Display your contact information to customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.accountSettings.showContactInfo}
                      onChange={(e) => setProfile({
                        ...profile,
                        accountSettings: { ...profile.accountSettings, showContactInfo: e.target.checked }
                      })}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    <FaLock className="h-4 w-4 mr-2" />
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 