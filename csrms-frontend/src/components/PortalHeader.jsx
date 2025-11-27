import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { FaSignOutAlt, FaBell, FaUser } from 'react-icons/fa'
import NotificationPanel from './NotificationPanel'

const PortalHeader = () => {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = (e) => {
    e.preventDefault()
    if (e.isTrusted) {
      logout()
      navigate('/portal')
    }
  }

  const goBackToWebsite = (e) => {
    e.preventDefault()
    if (e.isTrusted) {
      navigate('/')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-4 py-2 md:py-3 shadow-md" style={{ backgroundColor: 'var(--white)' }}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
          <img src="/logo.svg" alt="CSRMS Logo" className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-sm md:text-lg font-bold font-secondary truncate" style={{ color: 'var(--navy-blue)' }}>
              <span className="hidden sm:inline">Compassionate Rwanda Portal</span>
              <span className="sm:hidden">CR Portal</span>
            </h1>
            <p className="text-xs truncate" style={{ color: 'var(--para)' }}>
              {user?.role?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Dashboard
            </p>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(true)}
            className="p-1.5 md:p-2 rounded-lg relative"
            style={{ color: 'var(--navy-blue)' }}
          >
            <FaBell size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-3 md:h-3 bg-blue-600 rounded-full"></span>
          </motion.button>

          {/* User Menu */}
          <div className="flex items-center gap-1.5 md:gap-3">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold" style={{ color: 'var(--navy-blue)' }}>
                {user?.name}
              </p>
              <p className="text-xs" style={{ color: 'var(--para)' }}>
                {user?.email}
              </p>
            </div>
            
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--navy-blue)' }}>
              <FaUser className="text-white text-xs md:text-sm" />
            </div>
          </div>

          {/* Logout */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm"
            style={{ color: 'var(--navy-blue)', backgroundColor: 'var(--off-white)' }}
            type="button"
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
            type="button"
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