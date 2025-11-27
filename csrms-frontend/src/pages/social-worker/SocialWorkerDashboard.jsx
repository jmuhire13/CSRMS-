import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import DashboardOverview from './DashboardOverview';
import ChildrenManagement from './ChildrenManagement';
import CaseManagement from './CaseManagement';

const SocialWorkerDashboard = () => {
  const { user } = useUser();
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
      case 'children':
        return <ChildrenManagement />;
      case 'cases':
        return <CaseManagement />;
      case 'reports':
        return <DashboardOverview />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {renderContent()}
    </div>
  );
};

export default SocialWorkerDashboard;
