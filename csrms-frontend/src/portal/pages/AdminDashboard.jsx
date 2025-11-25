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
import ResourceMatching from '../components/ResourceMatching'

const AdminDashboard = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Listen for tab changes from sidebar
  useEffect(() => {
    const handleTabChange = (event) => {
      if (event.detail.role === 'admin') {
        setActiveTab(event.detail.tab)
      }
    }

    window.addEventListener('tabChange', handleTabChange)
    return () => window.removeEventListener('tabChange', handleTabChange)
  }, [])
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

  const StatCard = ({ title, value, icon: Icon, trend, color = 'var(--navy-blue)', subtitle, onClick }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 rounded-xl shadow-sm border portal-card cursor-pointer hover:shadow-md transition-all"
      style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}
      onClick={() => {
        const details = getStatCardDetails(title, value, trend)
        alert(details)
      }}
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

  // Helper function to provide detailed information for StatCards
  const getStatCardDetails = (title, value, trend) => {
    const trendText = trend ? `\\n\\nTrend: ${trend > 0 ? '+' : ''}${trend}% compared to last month` : ''
    
    switch (title) {
      case 'Total Children':
        return `Total Children Registered: ${value}\\n\\nBreakdown:\\n• Active cases: ${systemStats.activeCases}\\n• Completed cases: 678\\n• New this month: 23\\n• Average age: 9.2 years\\n• Male: 52%, Female: 48%${trendText}`
      case 'Active Cases':
        return `Active Cases Requiring Attention: ${value}\\n\\nPriority levels:\\n• Critical: 12 cases\\n• High: 87 cases\\n• Medium: 146 cases\\n• Average case duration: 8.3 months\\n• Resolution rate: 85%${trendText}`
      case 'Social Workers':
        return `Field Social Workers: ${value}\\n\\nStaff details:\\n• Full-time: 28 workers\\n• Part-time: 6 workers\\n• Average caseload: 15 children\\n• Districts covered: 12\\n• Response time: 2.5 hours avg${trendText}`
      case 'Total Resources':
        return `Total Resources Available: ${value}\\n\\nResource allocation:\\n• Healthcare: $32,500\\n• Education: $28,900\\n• Nutrition: $18,600\\n• Housing: $9,500\\n• Emergency fund: $15,000${trendText}`
      default:
        return `${title}: ${value}\\n\\nClick to view detailed analytics and historical data.${trendText}`
    }
  }

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
                onClick={() => {
                  alert('Opening geographic distribution map... This will show district-wise data visualization.')
                  // TODO: Implement map view functionality
                }}
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
                onClick={() => {
                  alert('Opening full activity log... This will show complete system activity history.')
                  // TODO: Implement full activity view
                }}
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
    const usersList = [
      { id: 2, name: 'Jean Baptiste', role: 'Social Worker', status: 'Active', district: 'Musanze', lastLogin: '2024-11-24' },
      { id: 3, name: 'Grace Mukamana', role: 'Caregiver', status: 'Active', district: 'Kigali', lastLogin: '2024-11-25' },
      { id: 4, name: 'Paul Nkurunziza', role: 'Social Worker', status: 'Pending', district: 'Huye', lastLogin: '2024-11-20' },
      { id: 5, name: 'Rose Uwase', role: 'Donor', status: 'Active', district: 'N/A', lastLogin: '2024-11-23' },
      { id: 6, name: 'Marie Uwimana', role: 'Social Worker', status: 'Active', district: 'Kigali', lastLogin: '2024-11-25' }
    ]

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
              onClick={() => {
                alert('Opening user registration form... This will allow you to add new users to the system.')
                // TODO: Implement user registration modal
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              <FaPlus size={16} />
              Add New User
            </motion.button>
          </div>
          
          {/* User Management Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard title="Total Users" value="127" icon={FaUsers} color="#3b82f6" />
            <StatCard title="Active Users" value="98" icon={FaCheckCircle} color="#10b981" />
            <StatCard title="Pending Approvals" value="12" icon={FaExclamationTriangle} color="#f59e0b" />
          </div>

          {/* Users List */}
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-semibold" style={{ color: 'var(--navy-blue)' }}>
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">District</div>
              <div className="col-span-2">Last Login</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {usersList.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-12 gap-4 px-4 py-3 rounded-lg border"
                style={{ borderColor: 'var(--pale-blue)', backgroundColor: 'var(--off-white)' }}
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: 'var(--navy-blue)' }}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>{user.name}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-sm" style={{ color: 'var(--para)' }}>{user.role}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-sm" style={{ color: 'var(--para)' }}>{user.district}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-sm" style={{ color: 'var(--para)' }}>{user.lastLogin}</span>
                </div>
                <div className="col-span-1 flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      alert(`User Management Actions for ${user.name}:\\n\\n• Edit user details\\n• Change role/permissions\\n• Reset password\\n• ${user.status === 'Active' ? 'Deactivate' : 'Activate'} account\\n• View activity log`)
                    }}
                    className="p-1 rounded"
                    style={{ color: 'var(--navy-blue)' }}
                  >
                    <FaEdit size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                alert('Loading more users... This will show additional users with pagination controls.')
              }}
              className="px-6 py-2 rounded-lg border-2 font-semibold"
              style={{ 
                color: 'var(--navy-blue)', 
                borderColor: 'var(--navy-blue)',
                backgroundColor: 'transparent'
              }}
            >
              Load More Users
            </motion.button>
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
              onClick={() => {
                alert('Opening resource registration form... This will allow you to add new resources to inventory.')
                // TODO: Implement resource registration modal
              }}
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
        </div>
        
        {/* Automated Resource Matching */}
        <ResourceMatching />
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
              onClick={() => {
                alert('Generating custom analytics report... This will create a detailed performance analysis.')
                // TODO: Implement report generation functionality
              }}
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
            onClick={() => {
              alert('Exporting system report... This will download a comprehensive system overview.')
              // TODO: Implement actual export functionality
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white portal-button"
            style={{ backgroundColor: 'var(--navy-blue)' }}
          >
            <FaDownload size={16} />
            Export Report
          </motion.button>
        </div>
      </div>

      {/* Main Content Area */}
      {renderTabContent()}
    </div>
  )
}

export default AdminDashboard