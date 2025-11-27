import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FaChild, 
  FaFolderOpen, 
  FaUserNurse, 
  FaExclamationTriangle,
  FaChartLine,
  FaCheckCircle
} from 'react-icons/fa';
import api from '../../services/api';

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await api.getMyReports();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 border border-gray-400 text-gray-800 px-4 py-3 rounded text-sm">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Children',
      value: stats?.overview?.totalChildren || 0,
      icon: FaChild,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Active Cases',
      value: stats?.overview?.activeCases || 0,
      icon: FaFolderOpen,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
    {
      title: 'With Caregivers',
      value: stats?.overview?.childrenWithCaregivers || 0,
      icon: FaUserNurse,
      color: 'gray',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-700',
      borderColor: 'border-gray-200'
    },
    {
      title: 'Need Assignment',
      value: stats?.overview?.childrenWithoutCaregivers || 0,
      icon: FaExclamationTriangle,
      color: 'gray',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      borderColor: 'border-gray-300'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-4 lg:p-6">
      {/* Header */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-xs md:text-sm text-gray-600 mt-1">Welcome back! Here's your current workload</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${card.bgColor} border ${card.borderColor} rounded-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Children by Status */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Children by Status</h3>
          <div className="space-y-3">
            {stats?.childrenByStatus && Object.entries(stats.childrenByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    status === 'active' ? 'bg-blue-700' :
                    status === 'inactive' ? 'bg-gray-400' :
                    status === 'graduated' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}></div>
                  <span className="text-gray-700 capitalize">{status}</span>
                </div>
                <span className="font-semibold text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cases by Priority */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cases by Priority</h3>
          <div className="space-y-3">
            {stats?.casesByPriority && Object.entries(stats.casesByPriority).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    priority === 'urgent' ? 'bg-gray-800' :
                    priority === 'high' ? 'bg-blue-800' :
                    priority === 'medium' ? 'bg-blue-600' :
                    'bg-gray-500'
                  }`}></div>
                  <span className="text-gray-700 capitalize">{priority}</span>
                </div>
                <span className="font-semibold text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cases by Category */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cases by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats?.casesByCategory && Object.entries(stats.casesByCategory).map(([category, count]) => (
            <div key={category} className="text-center">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-600 capitalize mt-1">{category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <FaChartLine className="w-6 h-6 text-blue-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Last 30 Days Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FaChild className="text-blue-700" />
                <div>
                  <p className="text-xs text-gray-600">New Children</p>
                  <p className="text-lg font-bold text-gray-900">
                    {stats?.recentActivity?.last30Days?.newChildren || 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaFolderOpen className="text-blue-700" />
                <div>
                  <p className="text-xs text-gray-600">New Cases</p>
                  <p className="text-lg font-bold text-gray-900">
                    {stats?.recentActivity?.last30Days?.newCases || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
