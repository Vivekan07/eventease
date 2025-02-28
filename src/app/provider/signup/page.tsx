'use client';

import { useState } from 'react';
import Link from 'next/link';
import ImageUpload from '../components/ImageUpload';

export default function ServiceProviderSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phoneNumber: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ ...formData, profileImage });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-sm text-gray-600">
            Join as a service provider and start growing your business
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-6">
            <ImageUpload
              onImageChange={(file) => setProfileImage(file)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <input
                type="text"
                id="businessName"
                name="businessName"
                placeholder="Business Name"
                required
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                required
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                required
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/provider/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 