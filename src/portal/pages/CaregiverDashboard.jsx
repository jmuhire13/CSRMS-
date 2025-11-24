import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { 
  FaChild, 
  FaHeartbeat, 
  FaGraduationCap, 
  FaUtensils, 
  FaHome,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaBell,
  FaUser,
  FaMapMarkerAlt,
  FaHeart,
  FaClipboardList,
  FaComments,
  FaPaperPlane,
  FaDownload,
  FaEye
} from 'react-icons/fa'
import { useUser } from '../context/UserContext'

const CaregiverDashboard = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('children')
  const [selectedChild, setSelectedChild] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  // Caregiver's children data
  const children = [
    {
      id: 'CHD-001',
      name: 'Jean Baptiste Mukamana',
      age: 8,
      caseId: 'CSE-2025-001',
      socialWorker: 'Marie Uwimana',
      socialWorkerPhone: '+250 788 123 456',
      photo: '/api/placeholder/100/100',
      status: 'active',
      lastUpdate: '2024-11-22',
      nextVisit: '2024-11-27',
      progress: {
        overall: 85,
        health: 90,
        education: 80,
        nutrition: 85,
        housing: 90
      },
      currentNeeds: ['School supplies', 'Winter clothing'],
      completedSupport: ['Medical checkup', 'Vaccination', 'School enrollment'],
      recentActivities: [
        {
          date: '2024-11-22',
          type: 'medical',
          description: 'Completed routine medical checkup - All good!',
          status: 'completed'
        },
        {
          date: '2024-11-20',
          type: 'education',
          description: 'Received school supplies package',
          status: 'completed'
        },
        {
          date: '2024-11-18',
          type: 'nutrition',
          description: 'Monthly nutrition package delivered',
          status: 'completed'
        }
      ],
      upcomingEvents: [
        {
          date: '2024-11-27',
          time: '10:00 AM',
          type: 'visit',
          description: 'Social worker home visit'
        },
        {
          date: '2024-11-30',
          time: '02:00 PM',
          type: 'medical',
          description: 'Dental checkup at Kigali Hospital'
        }
      ]
    },
    {
      id: 'CHD-002',
      name: 'Marie Claire Mukamana',
      age: 12,
      caseId: 'CSE-2025-015',
      socialWorker: 'Marie Uwimana',
      socialWorkerPhone: '+250 788 123 456',
      photo: '/api/placeholder/100/100',
      status: 'active',
      lastUpdate: '2024-11-21',
      nextVisit: '2024-12-01',
      progress: {
        overall: 78,
        health: 85,
        education: 75,
        nutrition: 80,
        housing: 85
      },
      currentNeeds: ['Mathematics tutor', 'School uniform'],
      completedSupport: ['Health insurance', 'School fees payment', 'Nutrition support'],
      recentActivities: [
        {
          date: '2024-11-21',
          type: 'education',
          description: 'School performance review - Improving in mathematics',
          status: 'completed'
        },
        {
          date: '2024-11-19',
          type: 'education',
          description: 'Arranged extra math tutoring sessions',
          status: 'completed'
        }
      ],
      upcomingEvents: [
        {
          date: '2024-12-01',
          time: '09:00 AM',
          type: 'visit',
          description: 'School meeting with teachers'
        },
        {
          date: '2024-12-05',
          time: '03:00 PM',
          type: 'education',
          description: 'Math tutoring session begins'
        }
      ]
    }
  ]

  // Messages with social worker
  const messages = [
    {
      id: 1,
      from: 'Marie Uwimana',
      fromType: 'social_worker',
      message: 'Hello Grace! Jean Baptiste did very well in his medical checkup yesterday. All his vaccinations are up to date. The next visit is scheduled for November 27th.',
      timestamp: '2024-11-22 14:30',
      read: true
    },
    {
      id: 2,
      from: 'Grace Mukamana',
      fromType: 'caregiver',
      message: 'Thank you Marie! That\'s wonderful news. I noticed Jean Baptiste has been more energetic lately. Should I prepare anything special for the next visit?',
      timestamp: '2024-11-22 15:45',
      read: true
    },
    {
      id: 3,
      from: 'Marie Uwimana',
      fromType: 'social_worker',
      message: 'Just have his school reports ready if possible. Also, we\'ll be discussing Marie Claire\'s math tutoring program. The tutoring will start next week.',
      timestamp: '2024-11-23 09:15',
      read: true
    },
    {
      id: 4,
      from: 'System',
      fromType: 'system',
      message: 'Reminder: Marie Claire\'s school meeting is scheduled for December 1st at 9:00 AM. Please confirm your attendance.',
      timestamp: '2024-11-24 08:00',
      read: false
    }
  ]

  // Support statistics
  const supportStats = {
    totalChildren: 2,
    activeSupport: 2,
    completedGoals: 12,
    upcomingVisits: 3,
    messagesThisMonth: 8,
    avgProgress: Math.round((children[0].progress.overall + children[1].progress.overall) / 2)
  }

  const StatCard = ({ title, value, icon: Icon, color = 'var(--navy-blue)', subtitle, trend }) => (
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

  const ChildCard = ({ child, onClick }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="p-6 rounded-xl shadow-sm border cursor-pointer portal-card"
      style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}
      onClick={() => onClick(child)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
          style={{ backgroundColor: 'var(--navy-blue)' }}
        >
          {child.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
            {child.name}
          </h3>
          <p className="text-sm mb-1" style={{ color: 'var(--para)' }}>
            Age: {child.age} years • Case: {child.caseId}
          </p>
          <p className="text-sm" style={{ color: 'var(--para)' }}>
            Social Worker: {child.socialWorker}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: '#16a34a' }}>
            {child.progress.overall}%
          </div>
          <div className="text-xs" style={{ color: 'var(--para)' }}>
            Overall Progress
          </div>
        </div>
      </div>
      
      {/* Progress bars */}
      <div className="space-y-2 mb-4">
        {[
          { label: 'Health', value: child.progress.health, icon: FaHeartbeat },
          { label: 'Education', value: child.progress.education, icon: FaGraduationCap },
          { label: 'Nutrition', value: child.progress.nutrition, icon: FaUtensils }
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <item.icon size={14} style={{ color: 'var(--navy-blue)' }} />
            <span className="text-sm w-20" style={{ color: 'var(--navy-blue)' }}>{item.label}</span>
            <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--off-white)' }}>
              <div 
                className="h-2 rounded-full transition-all"
                style={{ 
                  width: `${item.value}%`,
                  backgroundColor: item.value > 80 ? '#16a34a' : item.value > 60 ? '#ca8a04' : '#dc2626'
                }}
              />
            </div>
            <span className="text-sm w-10 text-right" style={{ color: 'var(--para)' }}>{item.value}%</span>
          </div>
        ))}
      </div>
      
      {/* Current needs */}
      <div className="mb-4">
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>Current Needs:</p>
        <div className="flex flex-wrap gap-2">
          {child.currentNeeds.map((need, index) => (
            <span 
              key={index}
              className="px-2 py-1 rounded-full text-xs font-semibold"
              style={{ 
                backgroundColor: 'var(--beige-accent)', 
                color: 'var(--navy-blue)' 
              }}
            >
              {need}
            </span>
          ))}
        </div>
      </div>
      
      {/* Next visit */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--pale-blue)' }}>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--para)' }}>
          <FaCalendarAlt size={12} />
          Next visit: {new Date(child.nextVisit).toLocaleDateString()}
        </div>
        <button 
          className="text-sm font-semibold"
          style={{ color: 'var(--navy-blue)' }}
        >
          View Details →
        </button>
      </div>
    </motion.div>
  )

  const MessageItem = ({ message }) => {
    const isFromUser = message.fromType === 'caregiver'
    const isSystem = message.fromType === 'system'
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isFromUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div 
          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
            isSystem ? 'border-l-4' : ''
          }`}
          style={{ 
            backgroundColor: isFromUser ? 'var(--navy-blue)' : 
                            isSystem ? 'var(--beige-accent)' : 'var(--off-white)',
            color: isFromUser ? 'white' : 'var(--para)',
            borderColor: isSystem ? '#ca8a04' : 'transparent'
          }}
        >
          {!isFromUser && !isSystem && (
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--navy-blue)' }}>
              {message.from}
            </p>
          )}
          {isSystem && (
            <p className="text-xs font-semibold mb-1" style={{ color: '#ca8a04' }}>
              System Notification
            </p>
          )}
          <p className="text-sm leading-relaxed">{message.message}</p>
          <p className="text-xs mt-2 opacity-75">
            {new Date(message.timestamp).toLocaleString()}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
            Caregiver Dashboard
          </h1>
          <p className="mt-2" style={{ color: 'var(--para)' }}>
            Welcome back, {user?.name || 'Grace Mukamana'}. Here's the latest on your children's support.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white portal-button"
            style={{ backgroundColor: 'var(--navy-blue)' }}
          >
            <FaPhone size={16} />
            Contact Worker
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
            <FaDownload size={16} />
            Download Report
          </motion.button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="My Children"
          value={supportStats.totalChildren}
          icon={FaChild}
          subtitle="Under support program"
        />
        <StatCard
          title="Avg Progress"
          value={`${supportStats.avgProgress}%`}
          icon={FaCheckCircle}
          trend={5.2}
          color="#16a34a"
          subtitle="Overall development"
        />
        <StatCard
          title="Upcoming Visits"
          value={supportStats.upcomingVisits}
          icon={FaCalendarAlt}
          color="#ca8a04"
          subtitle="Scheduled this month"
        />
        <StatCard
          title="Goals Completed"
          value={supportStats.completedGoals}
          icon={FaHeart}
          trend={12.5}
          color="#8b5cf6"
          subtitle="This year"
        />
      </div>

      {/* Content Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: 'var(--off-white)' }}>
          {[
            { id: 'children', label: 'My Children', icon: FaChild },
            { id: 'messages', label: 'Messages', icon: FaComments },
            { id: 'schedule', label: 'Schedule', icon: FaCalendarAlt }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id ? 'text-white' : ''
              }`}
              style={{ 
                backgroundColor: activeTab === tab.id ? 'var(--navy-blue)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--navy-blue)'
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'children' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} onClick={setSelectedChild} />
          ))}
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-xl shadow-sm border p-6 h-96" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
              <div className="flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: 'var(--pale-blue)' }}>
                <h2 className="text-xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
                  Messages with Marie Uwimana
                </h2>
                <span className="text-sm" style={{ color: 'var(--para)' }}>
                  Social Worker
                </span>
              </div>
              <div className="h-64 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-lg border"
                  style={{ borderColor: 'var(--pale-blue)' }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: 'var(--navy-blue)' }}
                >
                  <FaPaperPlane size={16} />
                </motion.button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
              <h3 className="text-lg font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
                Your Social Worker
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: 'var(--navy-blue)' }}
                  >
                    MU
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--navy-blue)' }}>Marie Uwimana</p>
                    <p className="text-sm" style={{ color: 'var(--para)' }}>Kigali District</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--para)' }}>
                  <FaPhone size={12} />
                  +250 788 123 456
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--para)' }}>
                  <FaEnvelope size={12} />
                  marie.uwimana@compassionaterwanda.org
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
              <h3 className="text-lg font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                {[
                  { icon: FaPhone, label: 'Call Social Worker', color: '#16a34a' },
                  { icon: FaBell, label: 'Request Emergency Help', color: '#dc2626' },
                  { icon: FaClipboardList, label: 'Update Child Info', color: 'var(--navy-blue)' },
                  { icon: FaDownload, label: 'Download Reports', color: '#ca8a04' }
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
      )}

      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {children.map((child) => (
            <div key={child.id} className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
              <h3 className="text-lg font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
                {child.name} - Upcoming Events
              </h3>
              <div className="space-y-3">
                {child.upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--off-white)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold" style={{ color: 'var(--navy-blue)' }}>
                        {event.description}
                      </p>
                      <span className="text-sm" style={{ color: 'var(--para)' }}>
                        {event.time}
                      </span>
                    </div>
                    <p className="text-sm flex items-center gap-1" style={{ color: 'var(--para)' }}>
                      <FaCalendarAlt size={12} />
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CaregiverDashboard