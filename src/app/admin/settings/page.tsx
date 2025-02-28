'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

interface PlatformSettings {
  general: {
    platformName: string;
    supportEmail: string;
    contactPhone: string;
    timezone: string;
  };
  booking: {
    autoConfirm: boolean;
    cancellationWindow: number;
    minimumNotice: number;
    maxActiveBookings: number;
  };
  payment: {
    currency: string;
    platformFee: number;
    minimumPayout: number;
    payoutSchedule: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  };
  verification: {
    requireBusinessLicense: boolean;
    requireInsurance: boolean;
    requireIdentityProof: boolean;
    autoVerification: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    adminAlerts: boolean;
  };
}

export default function SettingsManagement() {
  const [settings, setSettings] = useState<PlatformSettings>({
    general: {
      platformName: 'Service Marketplace',
      supportEmail: 'support@servicemarketplace.com',
      contactPhone: '+1 (555) 123-4567',
      timezone: 'UTC-5',
    },
    booking: {
      autoConfirm: false,
      cancellationWindow: 24,
      minimumNotice: 2,
      maxActiveBookings: 10,
    },
    payment: {
      currency: 'USD',
      platformFee: 10,
      minimumPayout: 100,
      payoutSchedule: 'weekly',
    },
    verification: {
      requireBusinessLicense: true,
      requireInsurance: true,
      requireIdentityProof: true,
      autoVerification: false,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      adminAlerts: true,
    },
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState<PlatformSettings>(settings);

  const handleEdit = () => {
    setTempSettings(settings);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setIsEditing(false);
  };

  const handleSave = () => {
    setSettings(tempSettings);
    setIsEditing(false);
  };

  const updateSettings = (category: keyof PlatformSettings, field: string, value: any) => {
    setTempSettings({
      ...tempSettings,
      [category]: {
        ...tempSettings[category],
        [field]: value
      }
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Platform Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.general.platformName : settings.general.platformName}
          onChange={(e) => updateSettings('general', 'platformName', e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Support Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.general.supportEmail : settings.general.supportEmail}
          onChange={(e) => updateSettings('general', 'supportEmail', e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.general.contactPhone : settings.general.contactPhone}
          onChange={(e) => updateSettings('general', 'contactPhone', e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Timezone</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.general.timezone : settings.general.timezone}
          onChange={(e) => updateSettings('general', 'timezone', e.target.value)}
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderBookingSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Auto-confirm Bookings</label>
          <p className="text-sm text-gray-500">Automatically confirm new bookings without provider approval</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={isEditing ? tempSettings.booking.autoConfirm : settings.booking.autoConfirm}
            onChange={(e) => updateSettings('booking', 'autoConfirm', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Cancellation Window (hours)</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.booking.cancellationWindow : settings.booking.cancellationWindow}
          onChange={(e) => updateSettings('booking', 'cancellationWindow', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Minimum Notice (hours)</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.booking.minimumNotice : settings.booking.minimumNotice}
          onChange={(e) => updateSettings('booking', 'minimumNotice', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Maximum Active Bookings per User</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.booking.maxActiveBookings : settings.booking.maxActiveBookings}
          onChange={(e) => updateSettings('booking', 'maxActiveBookings', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Currency</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.payment.currency : settings.payment.currency}
          onChange={(e) => updateSettings('payment', 'currency', e.target.value)}
          disabled={!isEditing}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Platform Fee (%)</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.payment.platformFee : settings.payment.platformFee}
          onChange={(e) => updateSettings('payment', 'platformFee', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Minimum Payout Amount</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.payment.minimumPayout : settings.payment.minimumPayout}
          onChange={(e) => updateSettings('payment', 'minimumPayout', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Payout Schedule</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={isEditing ? tempSettings.payment.payoutSchedule : settings.payment.payoutSchedule}
          onChange={(e) => updateSettings('payment', 'payoutSchedule', e.target.value)}
          disabled={!isEditing}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );

  const renderVerificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Require Business License</label>
          <p className="text-sm text-gray-500">Require providers to submit a business license</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={isEditing ? tempSettings.verification.requireBusinessLicense : settings.verification.requireBusinessLicense}
            onChange={(e) => updateSettings('verification', 'requireBusinessLicense', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Require Insurance</label>
          <p className="text-sm text-gray-500">Require providers to have insurance coverage</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={isEditing ? tempSettings.verification.requireInsurance : settings.verification.requireInsurance}
            onChange={(e) => updateSettings('verification', 'requireInsurance', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Require Identity Proof</label>
          <p className="text-sm text-gray-500">Require providers to verify their identity</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={isEditing ? tempSettings.verification.requireIdentityProof : settings.verification.requireIdentityProof}
            onChange={(e) => updateSettings('verification', 'requireIdentityProof', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Auto-verification</label>
          <p className="text-sm text-gray-500">Automatically verify providers when all documents are submitted</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={isEditing ? tempSettings.verification.autoVerification : settings.verification.autoVerification}
            onChange={(e) => updateSettings('verification', 'autoVerification', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
          <p className="text-sm text-gray-500">Send email notifications for important updates</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={isEditing ? tempSettings.notifications.emailNotifications : settings.notifications.emailNotifications}
            onChange={(e) => updateSettings('notifications', 'emailNotifications', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">SMS Notifications</label>
          <p className="text-sm text-gray-500">Send SMS alerts for critical updates</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={isEditing ? tempSettings.notifications.smsNotifications : settings.notifications.smsNotifications}
            onChange={(e) => updateSettings('notifications', 'smsNotifications', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Push Notifications</label>
          <p className="text-sm text-gray-500">Enable mobile push notifications</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={isEditing ? tempSettings.notifications.pushNotifications : settings.notifications.pushNotifications}
            onChange={(e) => updateSettings('notifications', 'pushNotifications', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Alerts</label>
          <p className="text-sm text-gray-500">Receive notifications for important admin events</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={isEditing ? tempSettings.notifications.adminAlerts : settings.notifications.adminAlerts}
            onChange={(e) => updateSettings('notifications', 'adminAlerts', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Platform Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage platform-wide settings and configurations
              </p>
            </div>
            <div className="space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Edit Settings
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {['general', 'booking', 'payment', 'verification', 'notifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'booking' && renderBookingSettings()}
          {activeTab === 'payment' && renderPaymentSettings()}
          {activeTab === 'verification' && renderVerificationSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
        </div>
      </div>
    </AdminLayout>
  );
} 