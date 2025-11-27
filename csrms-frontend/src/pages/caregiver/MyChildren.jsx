import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Search, Eye, AlertCircle, Calendar, MapPin } from 'lucide-react';
import api from '../../services/api';

export default function MyChildren() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchChildren();
  }, [currentPage]);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const response = await api.getCaregiverChildren(currentPage, 10);
      if (response.success) {
        setChildren(response.data || []);
        setTotalPages(response.pagination?.pages || 1);
      }
    } catch (err) {
      console.error('Failed to fetch children:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchChildDetails = async (childId) => {
    try {
      const response = await api.getCaregiverChildDetails(childId);
      if (response.success) {
        setSelectedChild(response.data?.child || response.data);
        setShowDetailsModal(true);
      }
    } catch (err) {
      console.error('Failed to fetch child details:', err);
      alert('Failed to load child details: ' + err.message);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'active': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'needs-attention': 'bg-red-100 text-red-800',
      'completed': 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredChildren = children.filter(child =>
    child?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child?.childId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading children...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            My Children
          </h2>
          <p className="text-gray-600 mt-1">Children assigned to your care</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Children Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Child Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
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
              {!filteredChildren || filteredChildren.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">No children found</p>
                  </td>
                </tr>
              ) : (
                filteredChildren.map((child, index) => (
                  <motion.tr
                    key={child._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {child.firstName} {child.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {child.age || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {child.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {child.district || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(child.status)}`}>
                        {child.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => fetchChildDetails(child._id)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Child Details Modal */}
      {showDetailsModal && selectedChild && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-900">Child Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Child ID</p>
                    <p className="font-medium">{selectedChild.childId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{selectedChild.firstName} {selectedChild.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium">{selectedChild.age || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{selectedChild.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium">{new Date(selectedChild.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusBadge(selectedChild.status)}`}>
                      {selectedChild.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Location</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">District</p>
                    <p className="font-medium">{selectedChild.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sector</p>
                    <p className="font-medium">{selectedChild.sector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cell</p>
                    <p className="font-medium">{selectedChild.cell}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Village</p>
                    <p className="font-medium">{selectedChild.village}</p>
                  </div>
                </div>
              </div>

              {/* Guardian */}
              {selectedChild.guardianName && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{selectedChild.guardianName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-medium">{selectedChild.guardianContact || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Assessments */}
              {selectedChild.recentAssessments && selectedChild.recentAssessments.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h4>
                  <div className="space-y-3">
                    {selectedChild.recentAssessments.map((assessment) => (
                      <div key={assessment._id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{assessment.assessmentType}</p>
                            <p className="text-sm text-gray-600 mt-1">{assessment.description}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(assessment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(assessment.status)}`}>
                            {assessment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Resource Requests */}
              {selectedChild.recentRequests && selectedChild.recentRequests.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Resource Requests</h4>
                  <div className="space-y-3">
                    {selectedChild.recentRequests.map((request) => (
                      <div key={request._id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{request.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    // Navigate to create assessment with this child pre-selected
                    window.dispatchEvent(new CustomEvent('createAssessment', { detail: selectedChild._id }));
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Assessment
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    // Navigate to create resource request with this child pre-selected
                    window.dispatchEvent(new CustomEvent('createResourceRequest', { detail: selectedChild._id }));
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Request Resources
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
