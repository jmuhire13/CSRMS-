import React, { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import UserManagement from '../../components/UserManagement';
import ChildrenManagement from './ChildrenManagement';
import DonationsManagement from './DonationsManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Listen for tab changes from sidebar
  useEffect(() => {
    const handleTabChange = (event) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('tabChange', handleTabChange);
    return () => window.removeEventListener('tabChange', handleTabChange);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'social-workers':
        return <UserManagement userType="social-worker" />;
      case 'caregivers':
        return <UserManagement userType="caregiver" />;
      case 'children':
        return <ChildrenManagement />;
      case 'donations':
        return <DonationsManagement />;
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Reports & Analytics</h1>
            <p className="text-gray-600">Detailed reports and analytics coming soon...</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto" style={{ backgroundColor: 'var(--off-white)' }}>
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
