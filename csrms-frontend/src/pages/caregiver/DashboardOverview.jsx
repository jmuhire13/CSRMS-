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
      <div className="flex items-center justify-center min-h-96 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: 'var(--navy-blue)' }}></div>
          <p className="mt-4 text-sm" style={{ color: 'var(--para)' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 md:px-4 py-3 mx-3 md:mx-4 rounded relative text-sm" style={{ backgroundColor: 'var(--off-white)', border: '1px solid var(--pale-blue)', color: 'var(--para)' }}>
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
      color: 'var(--navy-blue)',
      bgLight: 'var(--off-white)',
      textLight: 'var(--navy-blue)'
    },
    {
      title: 'Recent Assessments',
      value: stats?.recentAssessments || 0,
      icon: FileText,
      color: 'var(--light-navy)',
      bgLight: 'var(--off-white)',
      textLight: 'var(--light-navy)',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Pending Requests',
      value: stats?.pendingRequests || 0,
      icon: Package,
      color: 'var(--slate-blue)',
      bgLight: 'var(--off-white)',
      textLight: 'var(--slate-blue)'
    },
    {
      title: 'Unread Messages',
      value: stats?.unreadMessages || 0,
      icon: MessageSquare,
      color: 'var(--slate-blue)',
      bgLight: 'var(--off-white)',
      textLight: 'var(--slate-blue)'
    },
    {
      title: 'Urgent Attention',
      value: stats?.childrenNeedingAttention || 0,
      icon: AlertCircle,
      color: '#dc2626',
      bgLight: '#fef2f2',
      textLight: '#991b1b',
      subtitle: 'Last 7 days'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>Dashboard Overview</h2>
          <p className="mt-1" style={{ color: 'var(--para)' }}>Track your children and activities</p>
        </div>
        <button
          onClick={fetchDashboardStats}
          className="px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2"
          style={{ backgroundColor: 'var(--navy-blue)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--light-navy)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--navy-blue)'}
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
            className="rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            style={{ backgroundColor: stat.bgLight }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: stat.color }}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--para)' }}>{stat.title}</p>
              <p className="text-3xl font-bold font-secondary" style={{ color: stat.textLight }}>{stat.value}</p>
              {stat.subtitle && (
                <p className="text-xs mt-1" style={{ color: 'var(--para)' }}>{stat.subtitle}</p>
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
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 font-secondary" style={{ color: 'var(--navy-blue)' }}>
            <Calendar className="w-5 h-5" style={{ color: 'var(--navy-blue)' }} />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'children' }))}
              className="w-full text-left px-4 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--off-white)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--pale-blue)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--off-white)'}
            >
              <p className="font-medium" style={{ color: 'var(--navy-blue)' }}>View My Children</p>
              <p className="text-sm" style={{ color: 'var(--para)' }}>See all assigned children</p>
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'requests' }))}
              className="w-full text-left px-4 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--off-white)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--pale-blue)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--off-white)'}
            >
              <p className="font-medium" style={{ color: 'var(--navy-blue)' }}>Resource Requests</p>
              <p className="text-sm" style={{ color: 'var(--para)' }}>Submit or track requests</p>
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'messages' }))}
              className="w-full text-left px-4 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--off-white)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--pale-blue)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--off-white)'}
            >
              <p className="font-medium" style={{ color: 'var(--navy-blue)' }}>Messages</p>
              <p className="text-sm" style={{ color: 'var(--para)' }}>Chat with social workers</p>
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
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2 font-secondary" style={{ color: 'var(--navy-blue)' }}>
            <AlertCircle className="w-5 h-5" style={{ color: 'var(--slate-blue)' }} />
            Important Reminders
          </h3>
          <div className="space-y-3">
            {stats?.childrenNeedingAttention > 0 ? (
              <div className="px-4 py-3 rounded" style={{ backgroundColor: 'var(--off-white)', borderLeft: '4px solid var(--slate-blue)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--navy-blue)' }}>Urgent Assessments</p>
                <p className="text-xs" style={{ color: 'var(--para)' }}>
                  {stats.childrenNeedingAttention} {stats.childrenNeedingAttention === 1 ? 'child needs' : 'children need'} immediate attention
                </p>
              </div>
            ) : null}
            
            {stats?.pendingRequests > 0 ? (
              <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-sm font-medium text-blue-900">Pending Requests</p>
                <p className="text-xs text-blue-700">
                  You have {stats.pendingRequests} pending resource {stats.pendingRequests === 1 ? 'request' : 'requests'}
                </p>
              </div>
            ) : null}
            
            {stats?.unreadMessages > 0 ? (
              <div className="px-4 py-3 bg-gray-50 border-l-4 border-gray-500 rounded">
                <p className="text-sm font-medium text-gray-900">New Messages</p>
                <p className="text-xs text-gray-700">
                  {stats.unreadMessages} unread {stats.unreadMessages === 1 ? 'message' : 'messages'} from social workers
                </p>
              </div>
            ) : null}

            {stats?.childrenNeedingAttention === 0 && stats?.pendingRequests === 0 && stats?.unreadMessages === 0 ? (
              <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-sm font-medium text-blue-900">All Caught Up!</p>
                <p className="text-xs text-blue-700">No urgent items at the moment</p>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
