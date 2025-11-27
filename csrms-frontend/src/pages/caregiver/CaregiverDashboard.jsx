import { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import MyChildren from './MyChildren';
import Assessments from './Assessments';
import ResourceRequests from './ResourceRequests';
import Messages from './Messages';

export default function CaregiverDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const handleTabChange = (e) => {
      setActiveTab(e.detail);
    };

    window.addEventListener('tabChange', handleTabChange);
    return () => window.removeEventListener('tabChange', handleTabChange);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'children':
        return <MyChildren />;
      case 'assessments':
        return <Assessments />;
      case 'requests':
        return <ResourceRequests />;
      case 'messages':
        return <Messages />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
}
