import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useUser } from '../context/UserContext'
import { FaUserCog, FaUsers, FaHeart, FaDonate, FaArrowLeft } from 'react-icons/fa'

const RoleSelection = () => {
  const { login } = useUser()
  const navigate = useNavigate()

  // Debug log
  console.log('RoleSelection component loaded')

  const roles = [
    {
      id: 'admin',
      title: 'System Administrator',
      description: 'Manage the overall system, approve updates, and generate reports',
      icon: FaUserCog,
      color: 'var(--navy-blue)',
      user: {
        name: 'System Admin',
        email: 'admin@compassionaterwanda.org',
        permissions: ['all']
      }
    },
    {
      id: 'social-worker',
      title: 'Social Worker',
      description: 'Register children, update needs, and track resource delivery',
      icon: FaUsers,
      color: 'var(--navy-blue)',
      user: {
        name: 'Marie Uwimana',
        email: 'marie.uwimana@compassionaterwanda.org',
        region: 'Kigali',
        activeCases: 15
      }
    },
    {
      id: 'caregiver',
      title: 'Caregiver',
      description: 'View your children\'s support status and communicate with case workers',
      icon: FaHeart,
      color: 'var(--navy-blue)',
      user: {
        name: 'Grace Mukamana',
        email: 'grace.mukamana@gmail.com',
        children: ['Jean Baptiste', 'Marie Claire'],
        location: 'Kigali'
      }
    },
    {
      id: 'donor',
      title: 'Donor',
      description: 'Track your donations and see real-time impact on children\'s lives',
      icon: FaDonate,
      color: 'var(--navy-blue)',
      user: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        totalDonated: 500,
        preferredPrograms: ['Healthcare', 'Education']
      }
    }
  ]

  const handleRoleSelect = (role) => {
    login(role.id, role.user)
    navigate(`/portal/dashboard/${role.id}`)
  }

  const goBackToWebsite = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--off-white)' }}>
      {/* Header */}
      <div className="px-4 py-6" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="CSRMS Logo" className="w-12 h-12" />
              <div>
                <h1 className="text-xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
                  Compassionate Rwanda Portal
                </h1>
                <p className="text-sm" style={{ color: 'var(--para)' }}>
                  Child Support & Resource Management System
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={goBackToWebsite}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition"
              style={{ color: 'var(--navy-blue)', backgroundColor: 'transparent', border: '1px solid var(--navy-blue)' }}
            >
              <FaArrowLeft size={14} />
              Back to Website
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-16">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-secondary mb-6" style={{ color: 'var(--navy-blue)' }}>
              Access Compassionate Rwanda Platform
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--para)' }}>
              Select your role to access the appropriate dashboard and tools. 
              This demo uses sample data to showcase platform capabilities.
            </p>
          </motion.div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect(role)}
                className="p-8 rounded-3xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl"
                style={{ backgroundColor: 'var(--white)' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: role.color }}
                  >
                    <role.icon className="text-white text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-secondary mb-2" style={{ color: 'var(--navy-blue)' }}>
                      {role.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--para)' }}>
                      {role.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--off-white)' }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--navy-blue)' }}>
                    Demo User: {role.user.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--para)' }}>
                    {role.user.email}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 p-6 rounded-2xl text-center"
            style={{ backgroundColor: 'var(--beige-accent)' }}
          >
            <p className="text-sm" style={{ color: 'var(--para)' }}>
              <strong>Demo Note:</strong> This portal uses sample data to demonstrate Compassionate Rwanda functionality. 
              All information shown is for illustration purposes only.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection