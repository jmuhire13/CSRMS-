import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { 
  FaUsers, 
  FaChild, 
  FaHandsHelping, 
  FaDonate, 
  FaChartLine, 
  FaCog, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaUserCog,
  FaBuilding,
  FaMapMarkerAlt,
  FaArrowUp,
  FaDownload,
  FaPlus,
  FaEye,
  FaEdit
} from 'react-icons/fa'
import { useUser } from '../context/UserContext'

const AdminDashboard = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [notifications, setNotifications] = useState([])

  // Navigation tabs
  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FaUsers },
    { id: 'user-management', label: 'User Management', icon: FaUsers },
    { id: 'resource-management', label: 'Resource Management', icon: FaBuilding },
    { id: 'reports', label: 'Reports & Analytics', icon: FaChartLine },
    { id: 'settings', label: 'System Settings', icon: FaCog }
  ]

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update notifications or refresh data
      setNotifications(prev => [
        {
          id: Date.now(),
          message: `New child registration from ${['Kigali', 'Musanze', 'Muhanga'][Math.floor(Math.random() * 3)]}`,
          type: 'info',
          timestamp: new Date()
        },
        ...prev.slice(0, 4)
      ])
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // System statistics
  const systemStats = {
    totalChildren: 1247,
    activeChildren: 892,
    activeCases: 245,
    socialWorkers: 34,
    totalResources: 89500,
    pendingApprovals: 12,
    completedCases: 678
  }

  // System health
  const systemHealth = {
    databaseHealth: 98.5,
    responseTime: 245, // ms
    uptime: 99.8,
    activeUsers: 67
  }

  // District data
  const districtData = [
    { name: 'Kigali', children: 387, workers: 12, completion: 96 },
    { name: 'Musanze', children: 234, workers: 8, completion: 92 },
    { name: 'Muhanga', children: 198, workers: 6, completion: 89 },
    { name: 'Huye', children: 156, workers: 4, completion: 94 },
    { name: 'Rubavu', children: 143, workers: 3, completion: 87 },
    { name: 'Others', children: 129, workers: 1, completion: 85 }
  ]

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      user: 'Jean Uwimana',
      action: 'Registered new child in Kigali district',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      user: 'Marie Mukamana',
      action: 'Updated resource inventory',
      timestamp: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      user: 'Paul Nkurunziza',
      action: 'Case assessment pending review',
      timestamp: '6 hours ago',
      status: 'pending'
    },
    {
      id: 4,
      user: 'Grace Uwase',
      action: 'Monthly report generated',
      timestamp: '1 day ago',
      status: 'info'
    }
  ]

  const StatCard = ({ title, value, icon: Icon, trend, color = 'var(--navy-blue)', subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-xl shadow-sm border portal-card"
      style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: color + '15', color: color }}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold font-secondary mb-1" style={{ color }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </h3>
      <p className="text-lg font-semibold mb-1" style={{ color: 'var(--navy-blue)' }}>
        {title}
      </p>
      {subtitle && (
        <p className="text-sm" style={{ color: 'var(--para)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )

  const ActivityItem = ({ activity }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-3 rounded-lg"
      style={{ backgroundColor: 'var(--off-white)' }}
    >
      <div className="flex-1">
        <p className="text-sm font-semibold" style={{ color: 'var(--navy-blue)' }}>
          {activity.user}
        </p>
        <p className="text-xs mb-1" style={{ color: 'var(--para)' }}>
          {activity.action}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--para)' }}>
            {activity.timestamp}
          </span>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-semibold portal-status ${
        activity.status === 'pending' ? 'portal-status-warning' :
        activity.status === 'completed' ? 'portal-status-success' : 'portal-status-info'
      }`}>
        {activity.status}
      </span>
    </motion.div>
  )

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent()
      case 'user-management':
        return renderUserManagementContent()
      case 'resource-management':
        return renderResourceManagementContent()
      case 'reports':
        return renderReportsContent()
      case 'settings':
        return renderSettingsContent()
      default:
        return renderDashboardContent()
    }
  }

  // Dashboard Content (existing overview)
  const renderDashboardContent = () => {
    return (
      <div>
        {/* System Health Alert */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg border-l-4 flex items-center justify-between"
          style={{ backgroundColor: '#dcfce7', borderColor: '#10b981' }}
        >
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" size={20} />
            <div>
              <p className="font-semibold text-green-800">All Systems Operational</p>
              <p className="text-sm text-green-700">
                Server uptime: {systemHealth.uptime}% | Response time: {systemHealth.responseTime}ms | {systemHealth.activeUsers} active users
              </p>
            </div>
          </div>
          <span className="text-sm text-green-600">Last checked: 2 min ago</span>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Children"
            value={systemStats.totalChildren}
            icon={FaChild}
            trend={5.2}
            subtitle="Active in system"
          />
          <StatCard
            title="Active Cases"
            value={systemStats.activeCases}
            icon={FaHandsHelping}
            trend={-2.1}
            color="#f59e0b"
            subtitle="Need attention"
          />
          <StatCard
            title="Social Workers"
            value={systemStats.socialWorkers}
            icon={FaUsers}
            trend={8.3}
            color="#10b981"
            subtitle="Field staff"
          />
          <StatCard
            title="Total Resources"
            value={`$${(systemStats.totalResources / 1000).toFixed(1)}k`}
            icon={FaDonate}
            trend={12.7}
            color="#8b5cf6"
            subtitle="Available funds"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* District Overview */}
          <div className="lg:col-span-2 rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
                District Overview
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-semibold flex items-center gap-1"
                style={{ color: 'var(--navy-blue)' }}
              >
                <FaMapMarkerAlt size={14} />
                View Map
              </motion.button>
            </div>
            <div className="space-y-3">
              {districtData.map((district, index) => (
                <motion.div
                  key={district.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--off-white)' }}
                >
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--navy-blue)' }}>
                      {district.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--para)' }}>
                      {district.children} children • {district.workers} workers
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold" style={{ color: district.completion > 90 ? '#10b981' : '#f59e0b' }}>
                      {district.completion}%
                    </p>
                    <p className="text-xs" style={{ color: 'var(--para)' }}>
                      completion
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
                Recent System Activities
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-semibold flex items-center gap-1"
                style={{ color: 'var(--navy-blue)' }}
              >
                <FaEye size={14} />
                View All
              </motion.button>
            </div>
            <div className="space-y-2">
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // User Management Content
  const renderUserManagementContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--pale-blue)' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
              User Management
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              <FaPlus size={16} />
              Add New User
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard title="Total Users" value="127" icon={FaUsers} color="#3b82f6" />
            <StatCard title="Active Users" value="98" icon={FaCheckCircle} color="#10b981" />
            <StatCard title="Pending Approvals" value="12" icon={FaExclamationTriangle} color="#f59e0b" />
          </div>
          <div className="text-center py-8" style={{ color: 'var(--para)' }}>
            <FaUsers size={48} className="mx-auto mb-4 opacity-50" />
            <p>User management interface will be implemented here.</p>
            <p className="text-sm">Features: Add/Edit users, Role management, Permissions</p>
          </div>
        </div>
      </div>
    )
  }

  // Resource Management Content
  const renderResourceManagementContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--pale-blue)' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
              Resource Management
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              <FaPlus size={16} />
              Add Resource
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Resources" value="847" icon={FaBuilding} color="#8b5cf6" />
            <StatCard title="Available" value="623" icon={FaCheckCircle} color="#10b981" />
            <StatCard title="Allocated" value="187" icon={FaHandsHelping} color="#f59e0b" />
            <StatCard title="Pending" value="37" icon={FaExclamationTriangle} color="#ef4444" />
          </div>
          <div className="text-center py-8" style={{ color: 'var(--para)' }}>
            <FaBuilding size={48} className="mx-auto mb-4 opacity-50" />
            <p>Resource management interface will be implemented here.</p>
            <p className="text-sm">Features: Inventory tracking, Resource allocation, Distribution management</p>
          </div>
        </div>
      </div>
    )
  }

  // Reports & Analytics Content
  const renderReportsContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--pale-blue)' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
              Reports & Analytics
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              <FaDownload size={16} />
              Generate Report
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard title="Monthly Reports" value="24" icon={FaChartLine} color="#10b981" />
            <StatCard title="Data Points" value="15.7K" icon={FaChartLine} color="#3b82f6" />
            <StatCard title="Analytics Views" value="342" icon={FaEye} color="#8b5cf6" />
          </div>
          <div className="text-center py-8" style={{ color: 'var(--para)' }}>
            <FaChartLine size={48} className="mx-auto mb-4 opacity-50" />
            <p>Advanced analytics and reporting interface will be implemented here.</p>
            <p className="text-sm">Features: Custom reports, Data visualization, Performance metrics</p>
          </div>
        </div>
      </div>
    )
  }

  // System Settings Content
  const renderSettingsContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--pale-blue)' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
              System Settings
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard title="Server Health" value="98.5%" icon={FaCheckCircle} color="#10b981" />
            <StatCard title="Database Size" value="2.4GB" icon={FaCog} color="#8b5cf6" />
            <StatCard title="Active Sessions" value="67" icon={FaUsers} color="#3b82f6" />
          </div>
          <div className="text-center py-8" style={{ color: 'var(--para)' }}>
            <FaCog size={48} className="mx-auto mb-4 opacity-50" />
            <p>System configuration and settings interface will be implemented here.</p>
            <p className="text-sm">Features: Security settings, Backup configuration, System preferences</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
            System Administrator
          </h1>
          <p className="mt-2" style={{ color: 'var(--para)' }}>
            Welcome back, {user?.name || 'Admin'}. Manage your CSRMS platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white portal-button"
            style={{ backgroundColor: 'var(--navy-blue)' }}
          >
            <FaDownload size={16} />
            Export Report
          </motion.button>
        </div>
      </div>

      {/* Navigation Sidebar */}
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: 'var(--pale-blue)' }}>
            {/* User Profile Section */}
            <div className="p-6 border-b" style={{ borderColor: 'var(--pale-blue)' }}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: 'var(--navy-blue)' }}
                >
                  <FaUserCog />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--navy-blue)' }}>System Admin</h3>
                  <p className="text-sm" style={{ color: 'var(--para)' }}>Admin</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4">
              {navigationTabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left mb-2 transition-all font-medium ${
                    activeTab === tab.id 
                      ? 'text-white' 
                      : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--navy-blue)' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'var(--navy-blue)'
                  }}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard