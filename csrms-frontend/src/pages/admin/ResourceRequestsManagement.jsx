import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaExclamationTriangle, FaSearch, FaFilter } from 'react-icons/fa';
import api from '../../services/api';

const ResourceRequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    urgency: ''
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionStatus, setActionStatus] = useState('');
  const [responseNote, setResponseNote] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchResourceRequests();
  }, [filters, pagination.current]);

  const fetchResourceRequests = async () => {
    try {
      setLoading(true);
      const response = await api.getAllResourceRequests(pagination.current, 20, filters);
      
      if (response.success) {
        setRequests(response.data);
        setPagination(response.pagination);
        setStatistics(response.statistics);
      }
    } catch (error) {
      console.error('Failed to fetch resource requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!actionStatus) {
      alert('Please select an action (Approve/Reject/Fulfill)');
      return;
    }

    try {
      setProcessing(true);
      const response = await api.updateResourceRequestStatus(
        selectedRequest._id,
        actionStatus,
        responseNote
      );

      if (response.success) {
        alert(`Request ${actionStatus} successfully!`);
        setShowModal(false);
        setSelectedRequest(null);
        setActionStatus('');
        setResponseNote('');
        fetchResourceRequests();
      }
    } catch (error) {
      console.error('Failed to update request:', error);
      alert('Failed to update request: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
    setActionStatus('');
    setResponseNote('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-blue-800 bg-blue-100 border-blue-300';
      case 'rejected': return 'text-gray-700 bg-gray-200 border-gray-300';
      case 'fulfilled': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'pending': return 'text-gray-600 bg-gray-100 border-gray-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent': return 'text-gray-800 bg-gray-300';
      case 'high': return 'text-blue-800 bg-blue-200';
      case 'medium': return 'text-blue-700 bg-blue-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resource Requests Management</h1>
        <p className="text-sm text-gray-600 mt-1">Review and approve caregiver resource requests</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(statistics.byStatus || {}).map(([status, data]) => (
          <div key={status} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 capitalize">{status}</p>
                <p className="text-xl font-bold text-gray-900">{data.count}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {data.totalCost.toLocaleString()} RWF
                </p>
              </div>
              <div className={`p-3 rounded-full ${getStatusColor(status)}`}>
                {status === 'pending' && <FaHourglassHalf className="text-xl" />}
                {status === 'approved' && <FaCheckCircle className="text-xl" />}
                {status === 'rejected' && <FaTimesCircle className="text-xl" />}
                {status === 'fulfilled' && <FaCheckCircle className="text-xl" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-gray-500" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="fulfilled">Fulfilled</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="nutrition">Nutrition</option>
            <option value="housing">Housing</option>
            <option value="emergency">Emergency</option>
          </select>

          <select
            value={filters.urgency}
            onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Urgency</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No resource requests found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Child</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Caregiver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Urgency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.requestId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.child?.personalInfo?.firstName} {request.child?.personalInfo?.lastName}
                      <br />
                      <span className="text-xs text-gray-500">{request.child?.childId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.caregiver?.name}
                      <br />
                      <span className="text-xs text-gray-500">{request.caregiver?.email}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {request.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="capitalize">{request.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.estimatedCost.toLocaleString()} RWF
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded border text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => openModal(request)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {pagination.current} of {pagination.pages} ({pagination.total} total)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPagination({ ...pagination, current: pagination.current - 1 })}
                disabled={pagination.current === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination({ ...pagination, current: pagination.current + 1 })}
                disabled={pagination.current === pagination.pages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Review Resource Request</h2>
              <p className="text-sm text-gray-600 mt-1">Request ID: {selectedRequest.requestId}</p>
            </div>

            <div className="p-6 space-y-4">
              {/* Request Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Child</label>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedRequest.child?.personalInfo?.firstName} {selectedRequest.child?.personalInfo?.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Caregiver</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedRequest.caregiver?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <p className="text-sm text-gray-900 mt-1 capitalize">{selectedRequest.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Urgency</label>
                  <p className="text-sm text-gray-900 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getUrgencyColor(selectedRequest.urgency)}`}>
                      {selectedRequest.urgency}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Estimated Cost</label>
                  <p className="text-sm text-gray-900 mt-1 font-semibold">
                    {selectedRequest.estimatedCost.toLocaleString()} RWF
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Quantity</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedRequest.quantity}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <p className="text-sm text-gray-900 mt-1">{selectedRequest.title}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-sm text-gray-900 mt-1">{selectedRequest.description}</p>
              </div>

              {selectedRequest.justification && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Justification</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedRequest.justification}</p>
                </div>
              )}

              {selectedRequest.status !== 'pending' && selectedRequest.responseNote && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="text-sm font-medium text-blue-900">Admin Response</label>
                  <p className="text-sm text-blue-800 mt-1">{selectedRequest.responseNote}</p>
                  <p className="text-xs text-blue-600 mt-2">
                    Responded by {selectedRequest.respondedBy?.name} on{' '}
                    {new Date(selectedRequest.respondedAt).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Action Section - Only show if status is pending */}
              {selectedRequest.status === 'pending' && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setActionStatus('approved')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                        actionStatus === 'approved'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setActionStatus('rejected')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                        actionStatus === 'rejected'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setActionStatus('fulfilled')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                        actionStatus === 'fulfilled'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Mark Fulfilled
                    </button>
                  </div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">Response Note</label>
                  <textarea
                    value={responseNote}
                    onChange={(e) => setResponseNote(e.target.value)}
                    placeholder="Add a note explaining your decision..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedRequest(null);
                  setActionStatus('');
                  setResponseNote('');
                }}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
              >
                Close
              </button>
              {selectedRequest.status === 'pending' && (
                <button
                  onClick={handleStatusUpdate}
                  disabled={!actionStatus || processing}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition"
                >
                  {processing ? 'Processing...' : 'Submit'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceRequestsManagement;
