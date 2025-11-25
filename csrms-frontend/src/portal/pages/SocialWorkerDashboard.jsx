import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { 
  FaChild, 
  FaHandsHelping, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaPlus,
  FaEye,
  FaEdit,
  FaFlag,
  FaBell,
  FaCalendarAlt,
  FaPhone,
  FaHeartbeat,
  FaGraduationCap,
  FaHome,
  FaUtensils
} from 'react-icons/fa'
import { useUser } from '../context/UserContext'

const SocialWorkerDashboard = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedCase, setSelectedCase] = useState(null)

  // Listen for tab changes from sidebar
  useEffect(() => {
    const handleTabChange = (event) => {
      if (event.detail.role === 'social-worker') {
        setActiveTab(event.detail.tab)
      }
    }

    window.addEventListener('tabChange', handleTabChange)
    return () => window.removeEventListener('tabChange', handleTabChange)
  }, [])

  // Social Worker specific data
  const workerStats = {
    activeCases: 15,
    urgentCases: 3,
    completedThisMonth: 8,
    totalChildren: 42,
    region: 'Kigali District',
    responsiveTime: '2.5 hours',
    successRate: 92.3,
    pendingVisits: 6
  }

  // Active cases data
  const activeCases = [
    {
      id: 'CSE-2025-001',
      childName: 'Jean Baptiste Mugisha',
      age: 8,
      guardian: 'Agnes Mukamana',
      location: 'Kicukiro Sector',
      priority: 'high',
      lastVisit: '2024-11-20',
      nextVisit: '2024-11-27',
      needs: ['Healthcare', 'Education'],
      status: 'active',
      progress: 75,
      notes: 'Child showing improvement in school attendance. Medical follow-up needed.',
      phone: '+250 788 123 456'
    },
    {
      id: 'CSE-2025-002',
      childName: 'Marie Claire Uwimana',
      age: 12,
      guardian: 'Paul Nzeyimana',
      location: 'Nyarugenge Sector',
      priority: 'medium',
      lastVisit: '2024-11-22',
      nextVisit: '2024-11-29',
      needs: ['Nutrition', 'School supplies'],
      status: 'active',
      progress: 60,
      notes: 'Family situation stable. Need to arrange school supplies delivery.',
      phone: '+250 788 234 567'
    },
    {
      id: 'CSE-2025-003',
      childName: 'Samuel Nkurunziza',
      age: 6,
      guardian: 'Rose Mukamana',
      location: 'Gasabo Sector',
      priority: 'urgent',
      lastVisit: '2024-11-18',
      nextVisit: '2024-11-25',
      needs: ['Healthcare', 'Housing'],
      status: 'critical',
      progress: 30,
      notes: 'URGENT: Medical examination required. Housing conditions need immediate attention.',
      phone: '+250 788 345 678'
    },
    {
      id: 'CSE-2025-004',
      childName: 'Grace Ineza',
      age: 14,
      guardian: 'Joseph Habimana',
      location: 'Kicukiro Sector',
      priority: 'low',
      lastVisit: '2024-11-21',
      nextVisit: '2024-12-05',
      needs: ['Education', 'Vocational training'],
      status: 'stable',
      progress: 85,
      notes: 'Excellent progress. Ready for vocational training program enrollment.',
      phone: '+250 788 456 789'
    }
  ]

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'visit',
      message: 'Completed home visit for Marie Claire Uwimana',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'registration',
      message: 'Registered new child: Samuel Nkurunziza',
      time: '6 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'resource',
      message: 'Arranged healthcare support for Jean Baptiste',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'alert',
      message: 'Follow-up required for Grace Ineza',
      time: '2 days ago',
      status: 'pending'
    }
  ]

  // Upcoming schedule
  const upcomingSchedule = [
    {
      id: 1,
      time: '09:00 AM',
      date: '2024-11-25',
      activity: 'Home Visit',
      child: 'Samuel Nkurunziza',
      location: 'Gasabo Sector',
      priority: 'urgent'
    },
    {
      id: 2,
      time: '02:00 PM',
      date: '2024-11-27',
      activity: 'School Meeting',
      child: 'Jean Baptiste Mugisha',
      location: 'Green Hills Academy',
      priority: 'medium'
    },
    {
      id: 3,
      time: '10:30 AM',
      date: '2024-11-29',
      activity: 'Medical Checkup',
      child: 'Marie Claire Uwimana',
      location: 'Kigali Hospital',
      priority: 'low'
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

  const CaseCard = ({ caseData, onClick }) => {
    const getPriorityColor = (priority) => {
      switch(priority) {
        case 'urgent': return '#dc2626'
        case 'high': return '#ea580c'
        case 'medium': return '#ca8a04'
        case 'low': return '#16a34a'
        default: return 'var(--navy-blue)'
      }
    }

    const getStatusColor = (status) => {
      switch(status) {
        case 'critical': return '#dc2626'
        case 'active': return '#2563eb'
        case 'stable': return '#16a34a'
        default: return 'var(--navy-blue)'
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="p-4 rounded-lg border cursor-pointer portal-card"
        style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}
        onClick={() => onClick(caseData)}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-bold text-lg" style={{ color: 'var(--navy-blue)' }}>
              {caseData.childName}
            </h4>
            <p className="text-sm" style={{ color: 'var(--para)' }}>
              {caseData.id} • Age: {caseData.age} • Guardian: {caseData.guardian}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span 
              className="px-2 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: getPriorityColor(caseData.priority) }}
            >
              {caseData.priority.toUpperCase()}
            </span>
            <span 
              className="px-2 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: getStatusColor(caseData.status) }}
            >
              {caseData.status}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-3 text-sm" style={{ color: 'var(--para)' }}>
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt size={12} />
            {caseData.location}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt size={12} />
            Next: {new Date(caseData.nextVisit).toLocaleDateString()}
          </span>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-semibold" style={{ color: 'var(--navy-blue)' }}>Progress</span>
            <span className="text-sm" style={{ color: 'var(--para)' }}>{caseData.progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--off-white)' }}>
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: `${caseData.progress}%`,
                backgroundColor: caseData.progress > 70 ? '#16a34a' : caseData.progress > 40 ? '#ca8a04' : '#dc2626'
              }}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {caseData.needs.map((need, index) => (
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
        
        <p className="text-sm leading-relaxed" style={{ color: 'var(--para)' }}>
          {caseData.notes}
        </p>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: 'var(--pale-blue)' }}>
          <span className="flex items-center gap-2 text-sm" style={{ color: 'var(--para)' }}>
            <FaPhone size={12} />
            {caseData.phone}
          </span>
          <button 
            onClick={() => {
              setSelectedCase(caseData)
              alert(`Opening detailed view for ${caseData.childName}...\n\nCase ID: ${caseData.id}\nGuardian: ${caseData.guardian}\nPriority: ${caseData.priority}\nNext Visit: ${caseData.nextVisit}\n\nNotes: ${caseData.notes}`)
            }}
            className="text-sm font-semibold"
            style={{ color: 'var(--navy-blue)' }}
          >
            View Details →
          </button>
        </div>
      </motion.div>
    )
  }

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent()
      case 'children':
        return renderChildrenContent()
      case 'cases':
        return renderCasesContent()
      case 'resources':
        return renderResourcesContent()
      case 'reports':
        return renderReportsContent()
      default:
        return renderDashboardContent()
    }
  }

  // Dashboard Content (existing overview)
  const renderDashboardContent = () => {
    return (
      <div>
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Cases"
            value={workerStats.activeCases}
            icon={FaChild}
            trend={6.7}
            subtitle="Children under care"
          />
          <StatCard
            title="Urgent Cases"
            value={workerStats.urgentCases}
            icon={FaExclamationTriangle}
            trend={-12.5}
            color="#dc2626"
            subtitle="Require immediate attention"
          />
          <StatCard
            title="Completed This Month"
            value={workerStats.completedThisMonth}
            icon={FaCheckCircle}
            trend={25.0}
            color="#16a34a"
            subtitle="Cases successfully closed"
          />
          <StatCard
            title="Success Rate"
            value={`${workerStats.successRate}%`}
            icon={FaHeartbeat}
            trend={2.3}
            color="#8b5cf6"
            subtitle="Case completion rate"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Cases */}
          <div className="lg:col-span-2">
            <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
                  Active Cases ({activeCases.length})
                </h2>
                <div className="flex items-center gap-2">
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
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activeCases.map((caseData) => (
                  <CaseCard key={caseData.id} caseData={caseData} onClick={setSelectedCase} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Upcoming Schedule */}
            <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
              <h2 className="text-xl font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
                Upcoming Schedule
              </h2>
              <div className="space-y-3">
                {upcomingSchedule.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border-l-4"
                    style={{ 
                      backgroundColor: 'var(--off-white)',
                      borderColor: item.priority === 'urgent' ? '#dc2626' : 
                                  item.priority === 'medium' ? '#ca8a04' : '#16a34a'
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-sm" style={{ color: 'var(--navy-blue)' }}>
                        {item.activity}
                      </p>
                      <span className="text-xs" style={{ color: 'var(--para)' }}>
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--para)' }}>
                      {item.child}
                    </p>
                    <p className="text-xs flex items-center gap-1 mt-1" style={{ color: 'var(--para)' }}>
                      <FaMapMarkerAlt size={10} />
                      {item.location}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
              <h2 className="text-xl font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
                Quick Stats
              </h2>
              <div className="space-y-4">
                {[
                  { icon: FaClock, label: 'Avg Response Time', value: workerStats.responsiveTime },
                  { icon: FaMapMarkerAlt, label: 'Coverage Area', value: workerStats.region },
                  { icon: FaCalendarAlt, label: 'Pending Visits', value: workerStats.pendingVisits },
                  { icon: FaUsers, label: 'Total Children', value: workerStats.totalChildren }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--off-white)' }}
                  >
                    <div className="flex items-center gap-3">
                      <stat.icon size={16} style={{ color: 'var(--navy-blue)' }} />
                      <span className="font-semibold text-sm" style={{ color: 'var(--navy-blue)' }}>
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--para)' }}>
                      {stat.value}
                    </span>
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
                  { icon: FaPlus, label: 'Register New Child', color: 'var(--navy-blue)' },
                  { icon: FaCalendarAlt, label: 'Schedule Visit', color: '#16a34a' },
                  { icon: FaBell, label: 'Send Alert', color: '#dc2626' },
                  { icon: FaEdit, label: 'Update Case Notes', color: '#ca8a04' }
                ].map((action, index) => {
                  const handleActionClick = () => {
                    switch(action.label) {
                      case 'Register New Child':
                        alert('Opening child registration form...\n\nThis will create a new case file with:\n- Child personal details\n- Guardian information\n- Initial needs assessment\n- Priority level assignment')
                        break
                      case 'Schedule Visit':
                        alert('Opening visit scheduler...\n\nSchedule home visits for:\n- Regular check-ups\n- Emergency visits\n- Resource delivery\n- Progress assessments')
                        break
                      case 'Send Alert':
                        alert('Opening alert system...\n\nSend urgent notifications about:\n- Medical emergencies\n- Critical needs\n- Safety concerns\n- Resource shortages')
                        break
                      case 'Update Case Notes':
                        alert('Opening case notes editor...\n\nUpdate case files with:\n- Visit reports\n- Progress updates\n- New observations\n- Recommendation changes')
                        break
                      default:
                        alert(`${action.label} functionality will be implemented.`)
                    }
                  }
                  
                  return (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleActionClick}
                    className="w-full flex items-center gap-3 p-3 rounded-lg text-left portal-button"
                    style={{ backgroundColor: 'var(--off-white)' }}
                  >
                    <action.icon size={16} style={{ color: action.color }} />
                    <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>
                      {action.label}
                    </span>
                  </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Children Content
  const renderChildrenContent = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
          Child Registry
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeCases.map((caseData) => (
            <CaseCard key={caseData.id} caseData={caseData} onClick={setSelectedCase} />
          ))}
        </div>
      </div>
    )
  }

  // Cases Content
  const renderCasesContent = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
          Active Cases Management
        </h2>
        <div className="space-y-4">
          {activeCases.map((caseData) => (
            <CaseCard key={caseData.id} caseData={caseData} onClick={setSelectedCase} />
          ))}
        </div>
      </div>
    )
  }

  // Resources Content
  const renderResourcesContent = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
          Resource Requests
        </h2>
        <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--pale-blue)' }}>
          <p className="text-center" style={{ color: 'var(--para)' }}>
            Resource management functionality will be implemented here.
          </p>
        </div>
      </div>
    )
  }

  // Reports Content
  const renderReportsContent = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
          My Reports
        </h2>
        <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--pale-blue)' }}>
          <p className="text-center" style={{ color: 'var(--para)' }}>
            Reports and analytics functionality will be implemented here.
          </p>
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
            Social Worker Dashboard
          </h1>
          <p className="mt-2" style={{ color: 'var(--para)' }}>
            Welcome back, {user?.name || 'Marie Uwimana'}. Managing {workerStats.region} - {workerStats.activeCases} active cases.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              alert('Opening new case registration form...\n\nThis will allow you to register a new child and create a case file with:\n- Personal information\n- Family details\n- Immediate needs assessment\n- Initial support plan')
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white portal-button"
            style={{ backgroundColor: 'var(--navy-blue)' }}
          >
            <FaPlus size={16} />
            New Case
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              alert('Opening scheduling interface...\n\nPending visits: 6\n\nUpcoming scheduled visits:\n- Jean Baptiste (Nov 27)\n- Marie Claire (Nov 29)\n- Samuel (Today - URGENT)\n\nClick to reschedule or add new visits.')
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 portal-button"
            style={{ 
              color: 'var(--navy-blue)', 
              borderColor: 'var(--navy-blue)',
              backgroundColor: 'transparent'
            }}
          >
            <FaCalendarAlt size={16} />
            Schedule
          </motion.button>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}

export default SocialWorkerDashboard