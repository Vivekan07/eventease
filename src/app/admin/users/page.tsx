'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'provider';
  status: 'active' | 'inactive' | 'blocked';
  joinDate: string;
  lastActive: string;
}

export default function UsersManagement() {
  // Mock data for demonstration
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-03-20',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'provider',
      status: 'active',
      joinDate: '2024-02-01',
      lastActive: '2024-03-19',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'user',
      status: 'blocked',
      joinDate: '2024-01-20',
      lastActive: '2024-03-15',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'provider',
      status: 'inactive',
      joinDate: '2024-02-10',
      lastActive: '2024-03-01',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'user' | 'provider'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'blocked'>('all');

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = (userId: number, newStatus: 'active' | 'inactive' | 'blocked') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-lg">
        {/* Header */}
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">User Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor user accounts across the platform
          </p>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                id="search"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as 'all' | 'user' | 'provider')}
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="provider">Providers</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive' | 'blocked')}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'provider' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <select
                      className="mr-2 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value as 'active' | 'inactive' | 'blocked')}
                    >
                      <option value="active">Set Active</option>
                      <option value="inactive">Set Inactive</option>
                      <option value="blocked">Block</option>
                    </select>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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