import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FaHistory,
  FaSearch,
  FaFilter,
  FaDownload,
  FaCheck,
  FaClock,
  FaTimes,
  FaChild,
  FaCalendarAlt
} from 'react-icons/fa';
import api from '../../services/api';

const DonationHistory = () => {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [searchTerm, statusFilter, typeFilter, categoryFilter, donations]);

  const fetchHistory = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.getDonorHistory({ page, limit: 20 });
      if (response.success) {
        setDonations(response.data || []);
        setFilteredDonations(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (err) {
      console.error('Failed to fetch donation history:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterDonations = () => {
    let filtered = [...donations];

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.donationId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(d => d.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(d => d.type === typeFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(d => d.category === categoryFilter);
    }

    setFilteredDonations(filtered);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheck className="text-green-600" />;
      case 'pending': return <FaClock className="text-yellow-600" />;
      case 'failed': return <FaTimes className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateTotalDonated = () => {
    return filteredDonations
      .filter(d => d.status === 'completed')
      .reduce((sum, d) => sum + d.amount, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donation History</h1>
          <p className="text-gray-600 mt-1">View and manage your past donations</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Donated (Completed)</p>
          <p className="text-2xl font-bold text-blue-600">{calculateTotalDonated().toLocaleString()} RWF</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="general">General</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="nutrition">Nutrition</option>
            <option value="housing">Housing</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        {(statusFilter !== 'all' || typeFilter !== 'all' || categoryFilter !== 'all' || searchTerm) && (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredDonations.length} of {donations.length} donations
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
                setCategoryFilter('all');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Donations List */}
      {filteredDonations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <FaHistory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No donations found matching your filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDonations.map((donation) => (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Donation Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(donation.status)}
                      <span className="font-semibold text-gray-900">{donation.donationId}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" />
                      {new Date(donation.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <span className="capitalize">{donation.type.replace('-', ' ')}</span>
                    <span className="capitalize">{donation.category}</span>
                    <span className="capitalize">{donation.paymentMethod?.replace('-', ' ')}</span>
                  </div>

                  {donation.dedicatedTo && donation.dedicatedTo.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                      <FaChild />
                      For: {donation.dedicatedTo.map(c => 
                        `${c.personalInfo?.firstName} ${c.personalInfo?.lastName}`
                      ).join(', ')}
                    </div>
                  )}

                  {donation.message && (
                    <p className="mt-2 text-sm text-gray-600 italic">"{donation.message}"</p>
                  )}
                </div>

                {/* Amount and Actions */}
                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {donation.amount.toLocaleString()} <span className="text-sm font-normal text-gray-600">RWF</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDonation(donation)}
                      className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                    {donation.status === 'completed' && (
                      <button
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                        title="Download Receipt"
                      >
                        <FaDownload />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => fetchHistory(pagination.current - 1)}
            disabled={pagination.current === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {pagination.current} of {pagination.pages}
          </span>
          <button
            onClick={() => fetchHistory(pagination.current + 1)}
            disabled={pagination.current === pagination.pages}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedDonation.donationId}</h2>
                  <p className="text-blue-100 mt-1">Donation Details</p>
                </div>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status and Amount */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block mt-1 text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(selectedDonation.status)}`}>
                    {selectedDonation.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">
                    {selectedDonation.amount.toLocaleString()} RWF
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedDonation.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {selectedDonation.type.replace('-', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium text-gray-900 capitalize">{selectedDonation.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {selectedDonation.paymentMethod?.replace('-', ' ')}
                  </p>
                </div>
                {selectedDonation.transactionId && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="font-medium text-gray-900 font-mono text-sm">
                      {selectedDonation.transactionId}
                    </p>
                  </div>
                )}
              </div>

              {/* Children Beneficiaries */}
              {selectedDonation.dedicatedTo && selectedDonation.dedicatedTo.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">Dedicated To</p>
                  <div className="space-y-2">
                    {selectedDonation.dedicatedTo.map((child, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <FaChild className="text-blue-600" />
                        <span className="font-medium text-gray-900">
                          {child.personalInfo?.firstName} {child.personalInfo?.lastName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message */}
              {selectedDonation.message && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Your Message</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 italic">"{selectedDonation.message}"</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {selectedDonation.status === 'completed' && (
                  <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                    <FaDownload />
                    Download Receipt
                  </button>
                )}
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
