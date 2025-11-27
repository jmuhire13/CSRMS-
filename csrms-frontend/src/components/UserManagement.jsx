import { useState, useEffect } from 'react';
import { FaUserPlus, FaUsers, FaEdit, FaTrash, FaKey, FaTimes, FaCopy, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';

const UserManagement = ({ userType }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tempPassword, setTempPassword] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    password: '',
  });
  const [useAutoPassword, setUseAutoPassword] = useState(true);
  const [alert, setAlert] = useState(null);

  const districts = [
    'Kigali', 'Eastern', 'Northern', 'Southern', 'Western'
  ];

  useEffect(() => {
    loadUsers();
  }, [userType, pagination.current]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = userType === 'social-worker'
        ? await api.getAllSocialWorkers(pagination.current)
        : await api.getAllCaregivers(pagination.current);
      
      if (response.success) {
        setUsers(response.data);
        setPagination(response.pagination);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to load users' });
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      // Prepare data with password
      const userData = { ...formData };
      if (useAutoPassword) {
        // Backend will generate password
        delete userData.password;
      } else {
        // Use custom password
        if (!userData.password || userData.password.length < 6) {
          setAlert({ type: 'error', message: 'Password must be at least 6 characters' });
          setLoading(false);
          return;
        }
      }

      const response = userType === 'social-worker'
        ? await api.createSocialWorker(userData)
        : await api.createCaregiver(userData);

      if (response.success) {
        setTempPassword(response.data.temporaryPassword || formData.password);
        setFormData({ name: '', email: '', phone: '', district: '', password: '' });
        loadUsers();
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to create user' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    setLoading(true);
    try {
      const response = await api.deleteUser(userId);
      if (response.success) {
        setAlert({ type: 'success', message: 'User deleted successfully' });
        setTimeout(() => setAlert(null), 3000);
        loadUsers();
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to delete user' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (userId) => {
    if (!confirm('Are you sure you want to reset this user\'s password?')) return;

    setLoading(true);
    try {
      const response = await api.resetUserPassword(userId);
      if (response.success) {
        alert(`New temporary password: ${response.temporaryPassword}\n\nPlease share this with the user securely.`);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to reset password' });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setTempPassword('');
    setAlert(null);
    setFormData({ name: '', email: '', phone: '', district: '', password: '' });
    setUseAutoPassword(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {userType === 'social-worker' ? 'Social Workers' : 'Caregivers'}
          </h2>
          <p className="text-gray-600 mt-1">
            Manage {userType === 'social-worker' ? 'social worker' : 'caregiver'} accounts
          </p>
        </div>
        {!showCreateModal && !tempPassword && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FaUserPlus />
            Create New
          </button>
        )}
      </div>

      {/* Alerts */}
      {alert && !tempPassword && (
        <div className={`px-4 py-3 rounded ${
          alert.type === 'error' ? 'bg-gray-100 border border-gray-400 text-gray-800' : 'bg-blue-50 border border-blue-400 text-blue-800'
        }`}>
          {alert.message}
        </div>
      )}

      {/* Success Message with Temp Password */}
      {tempPassword && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaCheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              {userType === 'social-worker' ? 'Social Worker' : 'Caregiver'} Created Successfully!
            </h4>
            <p className="text-gray-600 mb-6">
              The account has been created. Please share the temporary password securely.
            </p>
          </div>
          
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Temporary Password
            </label>
            <div className="bg-white p-4 rounded-lg border-2 border-blue-300 mb-3">
              <div className="flex items-center justify-between">
                <code className="text-2xl font-mono font-bold text-blue-900 tracking-wider">{tempPassword}</code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(tempPassword);
                    setAlert({ type: 'success', message: 'Password copied to clipboard!' });
                    setTimeout(() => setAlert(null), 2000);
                  }}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FaCopy />
                  Copy
                </button>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p>
                The user will be <strong>required to change this password</strong> on their first login for security purposes.
              </p>
            </div>
          </div>
          
          <button
            onClick={closeModal}
            className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            Done
          </button>
        </div>
      )}

      {/* Create User Form */}
      {showCreateModal && !tempPassword && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Create New {userType === 'social-worker' ? 'Social Worker' : 'Caregiver'}
            </h3>
            <button 
              onClick={closeModal} 
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleCreate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+250 XXX XXX XXX"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password Section */}
            <div className="border-t border-gray-200 pt-5">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Temporary Password <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setUseAutoPassword(!useAutoPassword);
                    if (useAutoPassword) {
                      setFormData({ ...formData, password: generatePassword() });
                    } else {
                      setFormData({ ...formData, password: '' });
                    }
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                >
                  {useAutoPassword ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Enter Custom
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Auto-Generate
                    </>
                  )}
                </button>
              </div>
              
              {!useAutoPassword && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter temporary password (min 6 characters)"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, password: generatePassword() })}
                      className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold border border-gray-300"
                    >
                      Generate
                    </button>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p>User will be required to change this password on first login</p>
                  </div>
                </div>
              )}
              
              {useAutoPassword && (
                <div className="flex items-start gap-3 text-sm text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <svg className="w-6 h-6 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p>
                    A secure 8-character temporary password will be automatically generated and displayed after account creation.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed font-semibold transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <FaUserPlus className="w-5 h-5" />
                    Create {userType === 'social-worker' ? 'Social Worker' : 'Caregiver'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      {!showCreateModal && !tempPassword && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                District
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && users.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No {userType === 'social-worker' ? 'social workers' : 'caregivers'} found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.district || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResetPassword(user._id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Reset Password"
                      >
                        <FaKey />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPagination({ ...pagination, current: pagination.current - 1 })}
                disabled={pagination.current === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination({ ...pagination, current: pagination.current + 1 })}
                disabled={pagination.current === pagination.pages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{pagination.current}</span> of{' '}
                  <span className="font-medium">{pagination.pages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setPagination({ ...pagination, current: page })}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === pagination.current
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default UserManagement;
