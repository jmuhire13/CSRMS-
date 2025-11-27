import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  FileText, 
  Package, 
  MessageSquare, 
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import api from '../../services/api';

export default function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await api.getCaregiverDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  const statCards = [
    {
      title: 'My Children',
      value: stats?.totalChildren || 0,
      icon: Users,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textLight: 'text-blue-700'
    },
    {
      title: 'Recent Assessments',
      value: stats?.recentAssessments || 0,
      icon: FileText,
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
      textLight: 'text-green-700',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Pending Requests',
      value: stats?.pendingRequests || 0,
      icon: Package,
      color: 'bg-amber-500',
      bgLight: 'bg-amber-50',
      textLight: 'text-amber-700'
    },
    {
      title: 'Unread Messages',
      value: stats?.unreadMessages || 0,
      icon: MessageSquare,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textLight: 'text-purple-700'
    },
    {
      title: 'Urgent Attention',
      value: stats?.childrenNeedingAttention || 0,
      icon: AlertCircle,
      color: 'bg-red-500',
      bgLight: 'bg-red-50',
      textLight: 'text-red-700',
      subtitle: 'Last 7 days'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Track your children and activities</p>
        </div>
        <button
          onClick={fetchDashboardStats}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgLight} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
              <p className={`text-3xl font-bold ${stat.textLight}`}>{stat.value}</p>
              {stat.subtitle && (
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'children' }))}
              className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-blue-900">View My Children</p>
              <p className="text-sm text-blue-700">See all assigned children</p>
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'requests' }))}
              className="w-full text-left px-4 py-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-amber-900">Resource Requests</p>
              <p className="text-sm text-amber-700">Submit or track requests</p>
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'messages' }))}
              className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-purple-900">Messages</p>
              <p className="text-sm text-purple-700">Chat with social workers</p>
            </button>
          </div>
        </motion.div>

        {/* Important Reminders */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Important Reminders
          </h3>
          <div className="space-y-3">
            {stats?.childrenNeedingAttention > 0 ? (
              <div className="px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="font-medium text-red-900">Urgent Assessments</p>
                <p className="text-sm text-red-700">
                  {stats.childrenNeedingAttention} {stats.childrenNeedingAttention === 1 ? 'child needs' : 'children need'} immediate attention
                </p>
              </div>
            ) : null}
            
            {stats?.pendingRequests > 0 ? (
              <div className="px-4 py-3 bg-amber-50 border-l-4 border-amber-500 rounded">
                <p className="font-medium text-amber-900">Pending Requests</p>
                <p className="text-sm text-amber-700">
                  You have {stats.pendingRequests} pending resource {stats.pendingRequests === 1 ? 'request' : 'requests'}
                </p>
              </div>
            ) : null}
            
            {stats?.unreadMessages > 0 ? (
              <div className="px-4 py-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                <p className="font-medium text-purple-900">New Messages</p>
                <p className="text-sm text-purple-700">
                  {stats.unreadMessages} unread {stats.unreadMessages === 1 ? 'message' : 'messages'} from social workers
                </p>
              </div>
            ) : null}

            {stats?.childrenNeedingAttention === 0 && stats?.pendingRequests === 0 && stats?.unreadMessages === 0 ? (
              <div className="px-4 py-3 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="font-medium text-green-900">All Caught Up!</p>
                <p className="text-sm text-green-700">No urgent items at the moment</p>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
