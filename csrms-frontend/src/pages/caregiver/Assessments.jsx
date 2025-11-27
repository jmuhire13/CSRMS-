import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Plus, AlertCircle, Filter } from 'lucide-react';
import api from '../../services/api';

export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [children, setChildren] = useState([]);
  const [preSelectedChildId, setPreSelectedChildId] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filterUrgency, setFilterUrgency] = useState(null);

  const [formData, setFormData] = useState({
    childId: '',
    assessmentType: 'general',
    status: 'needs-attention',
    description: '',
    observations: '',
    recommendations: '',
    urgency: 'medium',
    followUpDate: ''
  });

  useEffect(() => {
    fetchAssessments();
    fetchChildren();

    // Listen for create assessment event from child details
    const handleCreateAssessment = (e) => {
      setPreSelectedChildId(e.detail);
      setFormData(prev => ({ ...prev, childId: e.detail }));
      setShowCreateModal(true);
    };

    window.addEventListener('createAssessment', handleCreateAssessment);
    return () => window.removeEventListener('createAssessment', handleCreateAssessment);
  }, []);

  useEffect(() => {
    fetchAssessments();
  }, [filterType, filterUrgency]);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filterType) filters.assessmentType = filterType;
      if (filterUrgency) filters.urgency = filterUrgency;
      
      const response = await api.getCaregiverAssessments(filters);
      if (response.success) {
        setAssessments(response.data?.assessments || response.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch assessments:', err);
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

  const handleCreateAssessment = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        observations: formData.observations.split('\n').filter(o => o.trim()).map(note => ({
          category: formData.assessmentType,
          note: note
        })),
        recommendations: formData.recommendations.split('\n').filter(r => r.trim())
      };

      const response = await api.createAssessment(submitData);
      if (response.success) {
        alert('Assessment created successfully! Social worker has been notified.');
        setShowCreateModal(false);
        setFormData({
          childId: '',
          assessmentType: 'general',
          status: 'needs-attention',
          description: '',
          observations: '',
          recommendations: '',
          urgency: 'medium',
          followUpDate: ''
        });
        setPreSelectedChildId(null);
        fetchAssessments();
      }
    } catch (err) {
      console.error('Failed to create assessment:', err);
      alert('Failed to create assessment: ' + err.message);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'needs-attention': 'bg-red-100 text-red-800',
      'improving': 'bg-yellow-100 text-yellow-800',
      'stable': 'bg-blue-100 text-blue-800',
      'excellent': 'bg-green-100 text-green-800'
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
            <FileText className="w-7 h-7 text-blue-600" />
            Child Assessments
          </h2>
          <p className="text-gray-600 mt-1">Track children's wellbeing and progress</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Assessment
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
            value={filterType || ''}
            onChange={(e) => setFilterType(e.target.value || null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="nutrition">Nutrition</option>
            <option value="housing">Housing</option>
            <option value="wellbeing">Wellbeing</option>
            <option value="general">General</option>
          </select>

          <select
            value={filterUrgency || ''}
            onChange={(e) => setFilterUrgency(e.target.value || null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Urgency Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          {(filterType || filterUrgency) && (
            <button
              onClick={() => {
                setFilterType(null);
                setFilterUrgency(null);
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Assessments List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading assessments...</p>
          </div>
        </div>
      ) : !assessments || assessments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-500">No assessments found</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Your First Assessment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {assessments.map((assessment, index) => (
            <motion.div
              key={assessment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {assessment.assessmentType} Assessment
                    </h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(assessment.status)}`}>
                      {assessment.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyBadge(assessment.urgency)}`}>
                      {assessment.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Child: {assessment.child?.firstName} {assessment.child?.lastName}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{assessment.description}</p>

              {assessment.observations && assessment.observations.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Observations:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {assessment.observations.map((obs, i) => (
                      <li key={i}>{typeof obs === 'string' ? obs : obs.note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {assessment.recommendations && assessment.recommendations.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Recommendations:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {assessment.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {assessment.followUpDate && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Follow-up Date:</strong> {new Date(assessment.followUpDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div className="mt-4 text-xs text-gray-500">
                Created: {new Date(assessment.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-900">Create Child Assessment</h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setPreSelectedChildId(null);
                  setFormData({
                    childId: '',
                    assessmentType: 'general',
                    status: 'needs-attention',
                    description: '',
                    observations: '',
                    recommendations: '',
                    urgency: 'normal',
                    followUpDate: ''
                  });
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateAssessment} className="p-6 space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  This assessment will be automatically sent to the assigned social worker for review.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Child <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.childId}
                  onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    Assessment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.assessmentType}
                    onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General</option>
                    <option value="health">Health</option>
                    <option value="education">Education</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="housing">Housing</option>
                    <option value="wellbeing">Wellbeing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="needs-attention">Needs Attention</option>
                    <option value="improving">Improving</option>
                    <option value="stable">Stable</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a general overview of the assessment..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observations (one per line)
                </label>
                <textarea
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  placeholder="Child appears healthy&#10;Attending school regularly&#10;Good interaction with peers"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommendations (one per line)
                </label>
                <textarea
                  value={formData.recommendations}
                  onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
                  placeholder="Schedule medical checkup&#10;Provide additional school materials&#10;Continue monitoring progress"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Assessment
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
