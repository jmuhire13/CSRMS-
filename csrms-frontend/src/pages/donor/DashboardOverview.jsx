import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FaDollarSign,
  FaChild,
  FaChartLine,
  FaCalendarAlt,
  FaHeart,
  FaTrophy,
  FaHandsHelping
} from 'react-icons/fa';
import api from '../../services/api';

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await api.getDonorDashboard();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard:', err);
      setError('Failed to load dashboard data');
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
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Donated',
      value: `${stats?.totalDonated?.toLocaleString() || 0} RWF`,
      icon: FaDollarSign,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'This Year',
      value: `${stats?.thisYearTotal?.toLocaleString() || 0} RWF`,
      icon: FaCalendarAlt,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'This Month',
      value: `${stats?.thisMonthTotal?.toLocaleString() || 0} RWF`,
      icon: FaChartLine,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Children Supported',
      value: stats?.childrenSupported || 0,
      icon: FaChild,
      color: 'pink',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    }
  ];

  // Calculate max value for chart scaling
  const maxAmount = Math.max(...(stats?.monthlyTrend?.map(m => m.amount) || [0]));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Donor Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your impact and donation history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-600" />
            Monthly Donations
          </h3>
          <div className="h-64">
            <div className="flex items-end justify-between h-full gap-2">
              {stats?.monthlyTrend?.map((month, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-48">
                    <div
                      className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors relative group"
                      style={{
                        height: `${maxAmount > 0 ? (month.amount / maxAmount) * 100 : 0}%`,
                        minHeight: month.amount > 0 ? '4px' : '0'
                      }}
                    >
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {month.amount.toLocaleString()} RWF
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaHeart className="text-pink-600" />
            Donation by Category
          </h3>
          <div className="space-y-4">
            {stats?.categoryBreakdown && Object.entries(stats.categoryBreakdown).map(([category, data], index) => {
              const percentage = stats.totalDonated > 0 ? (data.amount / stats.totalDonated) * 100 : 0;
              const colors = [
                'bg-blue-500',
                'bg-green-500',
                'bg-purple-500',
                'bg-pink-500',
                'bg-yellow-500',
                'bg-red-500',
                'bg-indigo-500'
              ];
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                    <span className="text-sm text-gray-600">{data.amount.toLocaleString()} RWF ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Impact Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6"
      >
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 p-3 rounded-lg">
            <FaTrophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats?.totalDonations || 0}</p>
                <p className="text-sm text-gray-600">Total Donations Made</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats?.childrenSupported || 0}</p>
                <p className="text-sm text-gray-600">Children Helped</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {stats?.monthlyTrend?.filter(m => m.count > 0).length || 0}
                </p>
                <p className="text-sm text-gray-600">Active Months</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Donations */}
      {stats?.recentDonations && stats.recentDonations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaHandsHelping className="text-green-600" />
            Recent Donations
          </h3>
          <div className="space-y-3">
            {stats.recentDonations.map((donation) => (
              <div key={donation._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{donation.amount.toLocaleString()} RWF</p>
                  <p className="text-sm text-gray-600 capitalize">{donation.category} • {donation.type}</p>
                  {donation.dedicatedTo && donation.dedicatedTo.length > 0 && (
                    <p className="text-xs text-blue-600 mt-1">
                      For: {donation.dedicatedTo.map(c => `${c.personalInfo?.firstName} ${c.personalInfo?.lastName}`).join(', ')}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date(donation.createdAt).toLocaleDateString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                    donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {donation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'donate' }))}
            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <FaDollarSign className="text-blue-600 text-xl" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Make a Donation</p>
              <p className="text-sm text-gray-600">Support children in need</p>
            </div>
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'children' }))}
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <FaChild className="text-green-600 text-xl" />
            <div className="text-left">
              <p className="font-medium text-gray-900">View Children</p>
              <p className="text-sm text-gray-600">See who needs help</p>
            </div>
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: 'history' }))}
            className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <FaChartLine className="text-purple-600 text-xl" />
            <div className="text-left">
              <p className="font-medium text-gray-900">View History</p>
              <p className="text-sm text-gray-600">See all donations</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
