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
  const [activeTab, setActiveTab] = useState('overview')
  const [notifications, setNotifications] = useState([])

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
    caregivers: 567,
    ngoPartners: 18,
    donors: 89,
    totalDonations: 1250000,
    monthlyDonations: 185000,
    resourcesDistributed: 1580,
    successRate: 94.2
  }

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'registration',
      message: 'New child registered by Marie Uwimana',
      location: 'Kigali District',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'resource',
      message: 'Emergency food package distributed',
      location: 'Musanze District',
      timestamp: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'donor',
      message: 'New monthly donor registered',
      location: 'Online Platform',
      timestamp: '6 hours ago',
      status: 'active'
    },
    {
      id: 4,
      type: 'alert',
      message: 'Critical case requires immediate attention',
      location: 'Muhanga District',
      timestamp: '8 hours ago',
      status: 'pending'
    }
  ]

  // System health metrics
  const systemHealth = {
    serverStatus: 'operational',
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
      className="flex items-center p-4 rounded-lg border-l-4 mb-3"
      style={{ 
        backgroundColor: 'var(--off-white)', 
        borderColor: activity.status === 'pending' ? '#f59e0b' : 
                      activity.status === 'completed' ? '#10b981' : 'var(--navy-blue)'
      }}
    >
      <div className="flex-1">
        <p className="font-semibold text-sm" style={{ color: 'var(--navy-blue)' }}>
          {activity.message}
        </p>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-xs flex items-center gap-1" style={{ color: 'var(--para)' }}>
            <FaMapMarkerAlt size={10} />
            {activity.location}
          </span>
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
            System Administrator Dashboard
          </h1>
          <p className="mt-2" style={{ color: 'var(--para)' }}>
            Welcome back, {user?.name || 'System Admin'}. Here's your system overview.
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 portal-button"
            style={{ 
              color: 'var(--navy-blue)', 
              borderColor: 'var(--navy-blue)',
              backgroundColor: 'transparent'
            }}
          >
            <FaCog size={16} />
            Settings
          </motion.button>
        </div>
      </div>

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
          subtitle="Require attention"
        />
        <StatCard
          title="Social Workers"
          value={systemStats.socialWorkers}
          icon={FaUsers}
          trend={12.5}
          color="#10b981"
          subtitle="Field operatives"
        />
        <StatCard
          title="Total Donations"
          value={`$${Math.round(systemStats.totalDonations / 1000)}k`}
          icon={FaDonate}
          trend={18.3}
          color="#8b5cf6"
          subtitle="This month: $185k"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="NGO Partners"
          value={systemStats.ngoPartners}
          icon={FaBuilding}
          trend={8.1}
          subtitle="Active partnerships"
        />
        <StatCard
          title="Success Rate"
          value={`${systemStats.successRate}%`}
          icon={FaArrowUp}
          trend={1.5}
          color="#10b981"
          subtitle="Case completion"
        />
        <StatCard
          title="Resources Distributed"
          value={systemStats.resourcesDistributed}
          icon={FaHandsHelping}
          trend={15.2}
          subtitle="This month"
        />
      </div>

      {/* Content Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
            <div className="flex items-center justify-between mb-6">
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

        {/* District Overview */}
        <div>
          <div className="rounded-xl shadow-sm border p-6 mb-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
                District Overview
              </h2>
            </div>
            <div className="space-y-4">
              {districtData.map((district, index) => (
                <motion.div
                  key={district.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--off-white)' }}
                >
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--navy-blue)' }}>
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

          {/* Quick Actions */}
          <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
            <h2 className="text-xl font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
              Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                { icon: FaPlus, label: 'Add New User', color: 'var(--navy-blue)' },
                { icon: FaUserCog, label: 'Manage Permissions', color: '#f59e0b' },
                { icon: FaChartLine, label: 'Generate Report', color: '#10b981' },
                { icon: FaCog, label: 'System Settings', color: '#8b5cf6' }
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left portal-button"
                  style={{ backgroundColor: 'var(--off-white)' }}
                >
                  <action.icon size={16} style={{ color: action.color }} />
                  <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard