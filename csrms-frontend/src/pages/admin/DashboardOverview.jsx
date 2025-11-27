import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChild, FaHandsHelping, FaUsers, FaDonate, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import api from '../../services/api';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalChildren: 0,
    totalSocialWorkers: 0,
    totalCaregivers: 0,
    totalDonations: 0,
    completedDonations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [childrenByDistrict, setChildrenByDistrict] = useState([]);
  const [donationsByCategory, setDonationsByCategory] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [childrenRes, socialWorkersRes, caregiversRes, donationsRes, districtRes, categoryRes] = await Promise.all([
        api.getAllChildren(1, 1),
        api.getAllSocialWorkers(1, 1),
        api.getAllCaregivers(1, 1),
        api.getAllDonations(1, 1),
        api.getChildrenByDistrict(),
        api.getDonationsByCategory(),
      ]);

      setStats({
        totalChildren: childrenRes.pagination?.total || 0,
        totalSocialWorkers: socialWorkersRes.pagination?.total || 0,
        totalCaregivers: caregiversRes.pagination?.total || 0,
        totalDonations: donationsRes.statistics?.total || 0,
        completedDonations: donationsRes.statistics?.completed || 0,
      });

      if (districtRes.success) {
        setChildrenByDistrict(districtRes.data || []);
      }

      if (categoryRes.success) {
        setDonationsByCategory(categoryRes.data || []);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle, onClick }) => (
    <div
      onClick={onClick}
      className="p-6 rounded-xl shadow-sm border bg-white cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: color + '20' }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-1" style={{ color }}>
        {loading ? '...' : typeof value === 'number' ? value.toLocaleString() : value}
      </h3>
      <p className="text-lg font-semibold mb-1 text-gray-800">{title}</p>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening in the system.</p>
      </div>

      {/* System Status */}
      <div className="mb-6 p-4 rounded-lg border-l-4 bg-green-50 border-green-500 flex items-center gap-3">
        <FaCheckCircle className="text-green-600" size={20} />
        <div>
          <p className="font-semibold text-green-800">All Systems Operational</p>
          <p className="text-sm text-green-700">System is running smoothly</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Children"
          value={stats.totalChildren}
          icon={FaChild}
          color="#3b82f6"
          subtitle="Registered in system"
          onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: { tab: 'children', role: 'admin' } }))}
        />
        <StatCard
          title="Social Workers"
          value={stats.totalSocialWorkers}
          icon={FaHandsHelping}
          color="#10b981"
          subtitle="Active field staff"
          onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: { tab: 'social-workers', role: 'admin' } }))}
        />
        <StatCard
          title="Caregivers"
          value={stats.totalCaregivers}
          icon={FaUsers}
          color="#f59e0b"
          subtitle="Registered caregivers"
          onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: { tab: 'caregivers', role: 'admin' } }))}
        />
        <StatCard
          title="Total Donations"
          value={`$${(stats.completedDonations / 1000).toFixed(1)}k`}
          icon={FaDonate}
          color="#8b5cf6"
          subtitle="Completed donations"
          onClick={() => window.dispatchEvent(new CustomEvent('tabChange', { detail: { tab: 'donations', role: 'admin' } }))}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Children by District */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Children by District</h2>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : childrenByDistrict.length > 0 ? (
            <div className="space-y-3">
              {childrenByDistrict.map((district, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{district._id || 'Unknown'}</span>
                      <span className="text-sm font-semibold text-gray-900">{district.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(district.count / stats.totalChildren) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No data available</div>
          )}
        </div>

        {/* Donations by Category */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Donations by Category</h2>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : donationsByCategory.length > 0 ? (
            <div className="space-y-3">
              {donationsByCategory.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{category._id || 'General'}</span>
                    <p className="text-xs text-gray-500">{category.count} donations</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">${category.totalAmount?.toLocaleString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
