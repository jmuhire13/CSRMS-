import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, Plus, Filter, DollarSign, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function ResourceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [children, setChildren] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [preSelectedChildId, setPreSelectedChildId] = useState(null);

  const [formData, setFormData] = useState({
    childId: '',
    category: 'healthcare',
    title: '',
    description: '',
    urgency: 'normal',
    estimatedCost: '',
    quantity: '',
    justification: ''
  });

  useEffect(() => {
    fetchRequests();
    fetchChildren();

    // Listen for create resource request event from child details
    const handleCreateRequest = (e) => {
      setPreSelectedChildId(e.detail);
      setFormData(prev => ({ ...prev, childId: e.detail }));
      setShowCreateModal(true);
    };

    window.addEventListener('createResourceRequest', handleCreateRequest);
    return () => window.removeEventListener('createResourceRequest', handleCreateRequest);
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [selectedStatus, selectedCategory]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.getCaregiverResourceRequests(selectedStatus, selectedCategory);
      if (response.success) {
        setRequests(response.data?.requests || response.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch resource requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await api.getCaregiverChildren(1, 100);
      if (response.success) {
        setChildren(response.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch children:', err);
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createResourceRequest(formData);
      if (response.success) {
        alert('Resource request created successfully! Social worker has been notified.');
        setShowCreateModal(false);
        setFormData({
          childId: '',
          category: 'healthcare',
          title: '',
          description: '',
          urgency: 'normal',
          estimatedCost: '',
          quantity: '',
          justification: ''
        });
        setPreSelectedChildId(null);
        fetchRequests();
      }
    } catch (err) {
      console.error('Failed to create resource request:', err);
      alert('Failed to create resource request: ' + err.message);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'reviewing': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'fulfilled': 'bg-purple-100 text-purple-800',
      'cancelled': 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyBadge = (urgency) => {
    const urgencyColors = {
      'low': 'bg-gray-100 text-gray-800',
      'normal': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return urgencyColors[urgency] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-7 h-7 text-green-600" />
            Resource Requests
          </h2>
          <p className="text-gray-600 mt-1">Request resources for children's needs</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Request
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={selectedStatus || ''}
            onChange={(e) => setSelectedStatus(e.target.value || null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="fulfilled">Fulfilled</option>
          </select>

          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="nutrition">Nutrition</option>
            <option value="housing">Housing</option>
            <option value="clothing">Clothing</option>
            <option value="emergency">Emergency</option>
            <option value="other">Other</option>
          </select>

          {(selectedStatus || selectedCategory) && (
            <button
              onClick={() => {
                setSelectedStatus(null);
                setSelectedCategory(null);
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading requests...</p>
          </div>
        </div>
      ) : !requests || requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-500">No resource requests found</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Create Your First Request
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((request, index) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                      {request.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyBadge(request.urgency)}`}>
                      {request.urgency}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{request.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Request ID</p>
                      <p className="font-medium">{request.requestId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Child</p>
                      <p className="font-medium">
                        {request.child?.firstName} {request.child?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Category</p>
                      <p className="font-medium capitalize">{request.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Estimated Cost</p>
                      <p className="font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {request.estimatedCost ? `${request.estimatedCost.toLocaleString()} RWF` : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {request.quantity && (
                    <div className="mt-3 text-sm">
                      <p className="text-gray-500">Quantity: <span className="font-medium">{request.quantity}</span></p>
                    </div>
                  )}

                  {request.responseNote && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Social Worker Response:</p>
                      <p className="text-sm text-blue-700 mt-1">{request.responseNote}</p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>Created: {new Date(request.createdAt).toLocaleDateString()}</span>
                    {request.fulfilledAt && (
                      <span>Fulfilled: {new Date(request.fulfilledAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-900">Create Resource Request</h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setPreSelectedChildId(null);
                  setFormData({
                    childId: '',
                    category: 'healthcare',
                    title: '',
                    description: '',
                    urgency: 'normal',
                    estimatedCost: '',
                    quantity: '',
                    justification: ''
                  });
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Child <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.childId}
                  onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Choose a child...</option>
                  {children.map(child => (
                    <option key={child._id} value={child._id}>
                      {child.firstName} {child.lastName} ({child.childId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="housing">Housing</option>
                    <option value="clothing">Clothing</option>
                    <option value="emergency">Emergency</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., School supplies for new semester"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of what is needed..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Cost (RWF)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                    placeholder="e.g., 50000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g., 5 books, 1 uniform"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Justification <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.justification}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                  placeholder="Why is this resource needed? How will it benefit the child?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setPreSelectedChildId(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
