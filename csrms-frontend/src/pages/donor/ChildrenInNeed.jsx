import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FaChild,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaHeart,
  FaDollarSign,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import api from '../../services/api';

const ChildrenInNeed = () => {
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState([]);
  const [filteredChildren, setFilteredChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    fetchChildrenInNeed();
  }, []);

  useEffect(() => {
    filterChildren();
  }, [searchTerm, selectedCategory, children]);

  const fetchChildrenInNeed = async () => {
    try {
      setLoading(true);
      const response = await api.getChildrenInNeed();
      if (response.success) {
        setChildren(response.data || []);
        setFilteredChildren(response.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch children:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterChildren = () => {
    let filtered = [...children];

    if (searchTerm) {
      filtered = filtered.filter(child =>
        `${child.personalInfo?.firstName} ${child.personalInfo?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.location?.district?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(child =>
        child.urgentRequests?.some(req => req.category === selectedCategory)
      );
    }

    setFilteredChildren(filtered);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      healthcare: '🏥',
      education: '📚',
      nutrition: '🍎',
      housing: '🏠',
      clothing: '👕',
      emergency: '🚨'
    };
    return icons[category] || '📋';
  };

  const handleDonateToChild = (child) => {
    // Dispatch event with child data to switch to donate tab
    window.dispatchEvent(new CustomEvent('donateToChild', { 
      detail: { childId: child._id, childName: `${child.personalInfo?.firstName} ${child.personalInfo?.lastName}` }
    }));
    window.dispatchEvent(new CustomEvent('tabChange', { detail: 'donate' }));
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Children in Need</h1>
        <p className="text-gray-600 mt-1">Support children with urgent needs</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="nutrition">Nutrition</option>
              <option value="housing">Housing</option>
              <option value="clothing">Clothing</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <FaExclamationTriangle className="text-orange-500" />
          Showing {filteredChildren.length} {filteredChildren.length === 1 ? 'child' : 'children'} with urgent needs
        </div>
      </div>

      {/* Children Grid */}
      {filteredChildren.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <FaChild className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No children found with urgent needs</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChildren.map((child) => (
            <motion.div
              key={child._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Child Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-3">
                    <FaChild className="text-blue-600 text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {child.personalInfo?.firstName} {child.personalInfo?.lastName}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-blue-100">
                      <FaMapMarkerAlt className="text-xs" />
                      {child.location?.district}, {child.location?.sector}
                    </div>
                  </div>
                </div>
              </div>

              {/* Child Details */}
              <div className="p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Age:</span> {child.personalInfo?.dateOfBirth 
                      ? new Date().getFullYear() - new Date(child.personalInfo.dateOfBirth).getFullYear() 
                      : 'N/A'} years
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Gender:</span> {child.personalInfo?.gender || 'N/A'}
                  </p>
                </div>

                {/* Urgent Requests */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FaExclamationTriangle className="text-orange-500" />
                    Urgent Needs ({child.urgentRequests?.length || 0})
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {child.urgentRequests?.map((request) => (
                      <div key={request._id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1">
                            <span className="text-xl">{getCategoryIcon(request.category)}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-gray-900 truncate">{request.title}</p>
                              <p className="text-xs text-gray-600 line-clamp-2">{request.description}</p>
                              {request.estimatedCost > 0 && (
                                <p className="text-xs text-blue-600 font-medium mt-1">
                                  Est. Cost: {request.estimatedCost.toLocaleString()} RWF
                                </p>
                              )}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Estimated Cost */}
                {child.totalEstimatedCost > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Total Estimated Cost</span>
                      <span className="text-lg font-bold text-blue-600">
                        {child.totalEstimatedCost.toLocaleString()} RWF
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedChild(child)}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDonateToChild(child)}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <FaHeart />
                    Donate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Child Details Modal */}
      {selectedChild && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedChild.personalInfo?.firstName} {selectedChild.personalInfo?.lastName}
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-blue-100">
                    <FaMapMarkerAlt />
                    {selectedChild.location?.district}, {selectedChild.location?.sector}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedChild(null)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium">
                      {selectedChild.personalInfo?.dateOfBirth 
                        ? new Date().getFullYear() - new Date(selectedChild.personalInfo.dateOfBirth).getFullYear() 
                        : 'N/A'} years
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium capitalize">{selectedChild.personalInfo?.gender || 'N/A'}</p>
                  </div>
                  {selectedChild.guardian?.name && (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">Guardian</p>
                        <p className="font-medium">{selectedChild.guardian.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Guardian Contact</p>
                        <p className="font-medium">{selectedChild.guardian.phone || 'N/A'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Urgent Requests Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Urgent Requests</h3>
                <div className="space-y-3">
                  {selectedChild.urgentRequests?.map((request) => (
                    <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getCategoryIcon(request.category)}</span>
                          <div>
                            <p className="font-medium text-gray-900">{request.title}</p>
                            <p className="text-xs text-gray-500 capitalize">{request.category}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        {request.quantity && (
                          <span className="text-gray-600">Quantity: {request.quantity}</span>
                        )}
                        {request.estimatedCost > 0 && (
                          <span className="text-blue-600 font-medium">
                            {request.estimatedCost.toLocaleString()} RWF
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Cost and Donate Button */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700 font-medium">Total Estimated Cost</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {selectedChild.totalEstimatedCost?.toLocaleString() || 0} RWF
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleDonateToChild(selectedChild);
                    setSelectedChild(null);
                  }}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FaDollarSign />
                  Donate to Support This Child
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenInNeed;
