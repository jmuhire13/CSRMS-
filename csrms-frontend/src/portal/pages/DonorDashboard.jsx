import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { 
  FaDonate, 
  FaChild, 
  FaHeartbeat, 
  FaGraduationCap, 
  FaUtensils, 
  FaHome,
  FaChartLine,
  FaCalendarAlt,
  FaDollarSign,
  FaHandsHelping,
  FaUsers,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaHeart,
  FaCreditCard,
  FaPiggyBank,
  FaAward,
  FaDownload,
  FaPlus,
  FaEye,
  FaStar,
  FaTrophy
} from 'react-icons/fa'
import { useUser } from '../context/UserContext'

const DonorDashboard = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedTimeframe, setSelectedTimeframe] = useState('thisYear')

  // Listen for tab changes from sidebar
  useEffect(() => {
    const handleTabChange = (event) => {
      if (event.detail.role === 'donor') {
        setActiveTab(event.detail.tab)
      }
    }

    window.addEventListener('tabChange', handleTabChange)
    return () => window.removeEventListener('tabChange', handleTabChange)
  }, [])

  // Donor statistics
  const donorStats = {
    totalDonated: 2850,
    thisMonth: 250,
    thisYear: 2850,
    lastYear: 1950,
    childrenSupported: 8,
    monthlyRecurring: 200,
    oneTimeDonations: 650,
    avgMonthly: 237,
    donorLevel: 'Gold Supporter',
    memberSince: 'March 2024',
    nextMilestone: 5000,
    impactScore: 94
  }

  // Donation history
  const donationHistory = [
    {
      id: 'DON-2024-045',
      date: '2024-11-15',
      amount: 250,
      type: 'Monthly Recurring',
      status: 'completed',
      category: 'General Support',
      method: 'Credit Card',
      children: ['Jean Baptiste', 'Marie Claire', 'Samuel']
    },
    {
      id: 'DON-2024-044',
      date: '2024-11-01',
      amount: 500,
      type: 'One-time',
      status: 'completed',
      category: 'Emergency Relief',
      method: 'PayPal',
      children: ['Grace', 'David']
    },
    {
      id: 'DON-2024-043',
      date: '2024-10-15',
      amount: 250,
      type: 'Monthly Recurring',
      status: 'completed',
      category: 'Education Support',
      method: 'Credit Card',
      children: ['Jean Baptiste', 'Marie Claire']
    },
    {
      id: 'DON-2024-042',
      date: '2024-10-01',
      amount: 300,
      type: 'One-time',
      status: 'completed',
      category: 'Healthcare',
      method: 'Bank Transfer',
      children: ['Samuel', 'Agnes']
    }
  ]

  // Children directly supported
  const supportedChildren = [
    {
      id: 'CHD-001',
      name: 'Jean Baptiste Mugisha',
      age: 8,
      location: 'Kicukiro Sector, Kigali',
      supportStarted: '2024-03-15',
      totalSupport: 1200,
      currentNeeds: ['School supplies', 'Healthcare'],
      progress: {
        health: 92,
        education: 88,
        nutrition: 90,
        overall: 90
      },
      recentUpdates: [
        {
          date: '2024-11-20',
          message: 'Jean Baptiste scored 85% in his mathematics exam! Your support for school supplies is making a real difference.',
          type: 'education'
        },
        {
          date: '2024-11-10',
          message: 'Completed routine medical checkup. All vaccinations up to date thanks to your healthcare support.',
          type: 'health'
        }
      ],
      photo: '/api/placeholder/80/80'
    },
    {
      id: 'CHD-002',
      name: 'Marie Claire Uwimana',
      age: 12,
      location: 'Nyarugenge Sector, Kigali',
      supportStarted: '2024-05-20',
      totalSupport: 850,
      currentNeeds: ['Vocational training', 'Uniform'],
      progress: {
        health: 88,
        education: 85,
        nutrition: 92,
        overall: 88
      },
      recentUpdates: [
        {
          date: '2024-11-18',
          message: 'Marie Claire has been selected for the scholarship program! Your continued support made this possible.',
          type: 'education'
        },
        {
          date: '2024-11-05',
          message: 'Monthly nutrition package delivered. Family reports improved health and energy levels.',
          type: 'nutrition'
        }
      ],
      photo: '/api/placeholder/80/80'
    },
    {
      id: 'CHD-003',
      name: 'Samuel Nkurunziza',
      age: 6,
      location: 'Gasabo Sector, Kigali',
      supportStarted: '2024-08-10',
      totalSupport: 650,
      currentNeeds: ['Emergency housing', 'Medical care'],
      progress: {
        health: 75,
        education: 70,
        nutrition: 80,
        overall: 75
      },
      recentUpdates: [
        {
          date: '2024-11-22',
          message: 'Emergency housing support approved. Family will be relocated to safer accommodation this week.',
          type: 'housing'
        },
        {
          date: '2024-11-12',
          message: 'Medical treatment for recurring illness completed successfully. Recovery progressing well.',
          type: 'health'
        }
      ],
      photo: '/api/placeholder/80/80'
    }
  ]

  // Impact metrics
  const impactMetrics = {
    childrenReached: 8,
    mealsProvided: 240,
    medicalCheckups: 12,
    schoolDaysEnabled: 480,
    familiesHelped: 6,
    emergenciesAddressed: 3
  }

  const StatCard = ({ title, value, icon: Icon, color = 'var(--navy-blue)', subtitle, trend, currency }) => (
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
        {currency ? '$' : ''}{typeof value === 'number' ? value.toLocaleString() : value}
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

  const ChildCard = ({ child }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="p-6 rounded-xl shadow-sm border portal-card"
      style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
          style={{ backgroundColor: 'var(--navy-blue)' }}
        >
          {child.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
            {child.name}
          </h3>
          <p className="text-sm mb-1" style={{ color: 'var(--para)' }}>
            Age: {child.age} • {child.location}
          </p>
          <p className="text-sm mb-1" style={{ color: 'var(--para)' }}>
            Your support: ${child.totalSupport} since {new Date(child.supportStarted).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold" style={{ color: '#16a34a' }}>
            {child.progress.overall}%
          </div>
          <div className="text-xs" style={{ color: 'var(--para)' }}>
            Progress
          </div>
        </div>
      </div>
      
      {/* Progress indicators */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: 'Health', value: child.progress.health, icon: FaHeartbeat },
          { label: 'Education', value: child.progress.education, icon: FaGraduationCap },
          { label: 'Nutrition', value: child.progress.nutrition, icon: FaUtensils },
          { label: 'Overall', value: child.progress.overall, icon: FaStar }
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <item.icon size={12} style={{ color: 'var(--navy-blue)' }} />
            <span className="text-xs" style={{ color: 'var(--para)' }}>{item.label}</span>
            <span className="text-xs font-semibold ml-auto" style={{ 
              color: item.value > 85 ? '#16a34a' : item.value > 70 ? '#ca8a04' : '#dc2626' 
            }}>
              {item.value}%
            </span>
          </div>
        ))}
      </div>
      
      {/* Recent updates */}
      <div className="mb-4">
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>Recent Updates:</p>
        <div className="space-y-2">
          {child.recentUpdates.slice(0, 2).map((update, index) => (
            <div key={index} className="p-2 rounded text-xs" style={{ backgroundColor: 'var(--off-white)' }}>
              <p style={{ color: 'var(--para)' }}>{update.message}</p>
              <p className="text-xs mt-1 opacity-75" style={{ color: 'var(--para)' }}>
                {new Date(update.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current needs */}
      <div className="flex flex-wrap gap-1 mb-3">
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
      
      <button 
        className="w-full mt-2 py-2 text-sm font-semibold text-white rounded-lg"
        style={{ backgroundColor: 'var(--navy-blue)' }}
      >
        View Full Story
      </button>
    </motion.div>
  )

  const DonationItem = ({ donation }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 rounded-lg border"
      style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}
    >
      <div className="flex items-center gap-4">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--navy-blue)' + '15', color: 'var(--navy-blue)' }}
        >
          <FaDonate size={16} />
        </div>
        <div>
          <p className="font-semibold" style={{ color: 'var(--navy-blue)' }}>
            ${donation.amount} - {donation.category}
          </p>
          <p className="text-sm" style={{ color: 'var(--para)' }}>
            {new Date(donation.date).toLocaleDateString()} • {donation.method} • {donation.type}
          </p>
          <p className="text-xs" style={{ color: 'var(--para)' }}>
            Supported: {donation.children.join(', ')}
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className="px-2 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#16a34a' }}>
          {donation.status}
        </span>
      </div>
    </motion.div>
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
              Donor Dashboard
            </h1>
            <span 
              className="px-3 py-1 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: '#ffd700', color: '#000' }}
            >
              <FaTrophy size={12} className="inline mr-1" />
              {donorStats.donorLevel}
            </span>
          </div>
          <p className="text-lg" style={{ color: 'var(--para)' }}>
            Welcome back, {user?.name || 'John Smith'}! Thank you for making a difference in children's lives.
          </p>
          <p className="text-sm" style={{ color: 'var(--para)' }}>
            Member since {donorStats.memberSince} • Impact Score: {donorStats.impactScore}/100
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              alert('Opening donation portal...\n\nDonation options:\n• One-time donation\n• Monthly recurring support\n• Sponsor a specific child\n• Emergency relief fund\n• Education support\n• Healthcare fund\n\nChoose amount and payment method to proceed.')
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white portal-button"
            style={{ backgroundColor: 'var(--navy-blue)' }}
          >
            <FaPlus size={16} />
            Make Donation
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              alert(`Downloading tax receipt...\n\nTax Year: 2024\nTotal Deductible: $${donorStats.thisYear}\n\nThis official receipt includes:\n• All qualifying donations\n• Organization tax ID\n• Donor information\n• IRS compliance details\n\nReceipt will be saved as PDF.`)
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 portal-button"
            style={{ 
              color: 'var(--navy-blue)', 
              borderColor: 'var(--navy-blue)',
              backgroundColor: 'transparent'
            }}
          >
            <FaDownload size={16} />
            Tax Receipt
          </motion.button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Donated"
          value={donorStats.totalDonated}
          icon={FaDollarSign}
          trend={18.5}
          currency={true}
          subtitle="Lifetime contributions"
        />
        <StatCard
          title="Children Supported"
          value={donorStats.childrenSupported}
          icon={FaChild}
          trend={14.3}
          color="#16a34a"
          subtitle="Directly impacted"
        />
        <StatCard
          title="This Month"
          value={donorStats.thisMonth}
          icon={FaCalendarAlt}
          color="#ca8a04"
          currency={true}
          subtitle="November donations"
        />
        <StatCard
          title="Next Milestone"
          value={`$${donorStats.nextMilestone - donorStats.totalDonated}`}
          icon={FaAward}
          color="#8b5cf6"
          subtitle="To Platinum level"
        />
      </div>

      {/* Progress to next milestone */}
      <div className="mb-8 p-6 rounded-xl shadow-sm border" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
            Progress to Platinum Supporter
          </h3>
          <span className="text-sm" style={{ color: 'var(--para)' }}>
            ${donorStats.totalDonated} / ${donorStats.nextMilestone}
          </span>
        </div>
        <div className="w-full h-4 rounded-full" style={{ backgroundColor: 'var(--off-white)' }}>
          <div 
            className="h-4 rounded-full transition-all"
            style={{ 
              width: `${(donorStats.totalDonated / donorStats.nextMilestone) * 100}%`,
              backgroundColor: '#ffd700'
            }}
          />
        </div>
        <p className="text-sm mt-2" style={{ color: 'var(--para)' }}>
          Only ${donorStats.nextMilestone - donorStats.totalDonated} away from unlocking exclusive updates and impact reports!
        </p>
      </div>

      {/* Tab Content */}
      {(activeTab === 'dashboard' || activeTab === 'impact') && (
        <div>
          {/* Content Tabs */}
          <div className="mb-6">
            <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: 'var(--off-white)' }}>
              {[
                { id: 'overview', label: 'Impact Overview', icon: FaChartLine },
                { id: 'children', label: 'Supported Children', icon: FaChild },
                { id: 'history', label: 'Donation History', icon: FaCreditCard }
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

          {(activeTab === 'dashboard' || activeTab === 'impact' || activeTab === 'overview') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-xl shadow-sm border p-6 mb-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
              <h2 className="text-xl font-bold font-secondary mb-6" style={{ color: 'var(--navy-blue)' }}>
                Your Impact This Year
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: 'Children Reached', value: impactMetrics.childrenReached, icon: FaChild, color: '#16a34a' },
                  { label: 'Meals Provided', value: impactMetrics.mealsProvided, icon: FaUtensils, color: '#ca8a04' },
                  { label: 'Medical Checkups', value: impactMetrics.medicalCheckups, icon: FaHeartbeat, color: '#dc2626' },
                  { label: 'School Days', value: impactMetrics.schoolDaysEnabled, icon: FaGraduationCap, color: '#2563eb' },
                  { label: 'Families Helped', value: impactMetrics.familiesHelped, icon: FaUsers, color: '#8b5cf6' },
                  { label: 'Emergencies', value: impactMetrics.emergenciesAddressed, icon: FaHeart, color: '#f59e0b' }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-lg"
                    style={{ backgroundColor: 'var(--off-white)' }}
                  >
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-full" style={{ backgroundColor: metric.color + '15', color: metric.color }}>
                        <metric.icon size={20} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold font-secondary" style={{ color: metric.color }}>
                      {metric.value}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--para)' }}>
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Donation Summary */}
            <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--pale-blue)' }}>
              <h3 className="text-lg font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
                Donation Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--para)' }}>Monthly Recurring</span>
                  <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>${donorStats.monthlyRecurring}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--para)' }}>One-time Donations</span>
                  <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>${donorStats.oneTimeDonations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--para)' }}>Average Monthly</span>
                  <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>${donorStats.avgMonthly}</span>
                </div>
                <hr style={{ borderColor: 'var(--pale-blue)' }} />
                <div className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>Total This Year</span>
                  <span className="font-bold text-lg" style={{ color: '#16a34a' }}>${donorStats.thisYear}</span>
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
                  { icon: FaPlus, label: 'Make One-time Donation', color: '#16a34a' },
                  { icon: FaCreditCard, label: 'Update Payment Method', color: 'var(--navy-blue)' },
                  { icon: FaDownload, label: 'Download Tax Receipt', color: '#ca8a04' },
                  { icon: FaHeart, label: 'Sponsor a Child', color: '#dc2626' }
                ].map((action, index) => {
                  const handleActionClick = () => {
                    switch(action.label) {
                      case 'Make Quick Donation':
                        alert('Quick donation options...\n\n• $25 - Nutrition package for 1 child\n• $50 - School supplies set\n• $100 - Medical checkup\n• $200 - Monthly support package\n• Custom amount\n\nSelect amount for instant donation.')
                        break
                      case 'View Impact Report':
                        alert('Opening detailed impact report...\n\nYour contributions have supported:\n• 8 children directly\n• 15 families indirectly\n• 3 community programs\n• Healthcare for 25 children\n• Education for 12 children\n\nDetailed metrics and stories included.')
                        break
                      case 'Update Payment Method':
                        alert('Payment method settings...\n\nCurrent method: Credit Card ending in 4532\n\nUpdate options:\n• Add new credit/debit card\n• Link bank account\n• PayPal integration\n• Cryptocurrency options\n• Modify recurring amounts')
                        break
                      case 'Download Tax Receipt':
                        alert(`Tax documentation center...\n\nAvailable receipts:\n• 2024 YTD: $${donorStats.thisYear}\n• 2023 Full Year: $${donorStats.lastYear}\n• Monthly statements\n• Individual donation receipts\n\nAll IRS-compliant documentation.`)
                        break
                      case 'Sponsor a Child':
                        alert('Child sponsorship program...\n\nBecome a dedicated sponsor:\n• Choose a specific child\n• Monthly commitment ($50-200)\n• Direct progress updates\n• Letter exchanges\n• Annual visit opportunities\n\nMake a lasting personal impact.')
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
      )}

        </div>
      )}

      {activeTab === 'children' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {supportedChildren.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      )}

      {(activeTab === 'donations' || activeTab === 'history') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
              Recent Donations
            </h2>
            <select 
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: 'var(--pale-blue)' }}
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="thisYear">This Year</option>
              <option value="lastYear">Last Year</option>
              <option value="allTime">All Time</option>
            </select>
          </div>
          <div className="space-y-4">
            {donationHistory.map((donation) => (
              <DonationItem key={donation.id} donation={donation} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DonorDashboard