'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaPencilAlt, FaSave } from 'react-icons/fa';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>('/default-avatar.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+94 77 123 4567',
    address: 'Colombo, Sri Lanka',
    bio: 'Event planner with a passion for creating memorable experiences.'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the profile data to your backend
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-purple-600">
            <div className="absolute -bottom-12 left-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white">
                {profileImage && (
                  <div className="relative w-full h-full">
                    <Image
                      src={profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                      sizes="(max-width: 128px) 100vw, 128px"
                    />
                  </div>
                )}
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity hover:bg-opacity-70"
                  >
                    <FaCamera className="h-8 w-8 text-white" />
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {isEditing ? (
                  <>
                    <FaSave className="mr-2 -ml-1 h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <FaPencilAlt className="mr-2 -ml-1 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-6 pt-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <div className="mt-1">
                  <textarea
                    name="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 