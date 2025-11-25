import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useUser } from '../context/UserContext'
import { FaSignOutAlt, FaBell, FaUser } from 'react-icons/fa'
import NotificationPanel from './NotificationPanel'

const PortalHeader = () => {
  const { user, logout } = useUser()
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.href = '/portal'
  }

  const goBackToWebsite = () => {
    window.location.href = '/'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 shadow-md" style={{ backgroundColor: 'var(--white)' }}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="CSRMS Logo" className="w-10 h-10" />
          <div>
            <h1 className="text-lg font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
              Compassionate Rwanda Portal
            </h1>
            <p className="text-xs" style={{ color: 'var(--para)' }}>
              {user?.role?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Dashboard
            </p>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(true)}
            className="p-2 rounded-lg relative"
            style={{ color: 'var(--navy-blue)' }}
          >
            <FaBell size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold" style={{ color: 'var(--navy-blue)' }}>
                {user?.name}
              </p>
              <p className="text-xs" style={{ color: 'var(--para)' }}>
                {user?.email}
              </p>
            </div>
            
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--navy-blue)' }}>
              <FaUser className="text-white text-sm" />
            </div>
          </div>

          {/* Logout */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 rounded-lg font-semibold text-sm"
            style={{ color: 'var(--navy-blue)', backgroundColor: 'var(--off-white)' }}
          >
            <FaSignOutAlt />
          </motion.button>

          {/* Back to Website */}
          <motion.button
            onClick={goBackToWebsite}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 rounded-lg font-semibold text-sm hidden lg:block"
            style={{ color: 'white', backgroundColor: 'var(--navy-blue)' }}
          >
            Website
          </motion.button>
        </div>
      </div>
      
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </header>
  )
}

export default PortalHeader