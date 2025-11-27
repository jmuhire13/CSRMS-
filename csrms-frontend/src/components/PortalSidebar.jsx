import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { FaHome, FaUsers, FaBox, FaChartBar, FaCog, FaHeart, FaDonate, FaUserCog, FaFileAlt, FaComment } from 'react-icons/fa'

const PortalSidebar = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('dashboard')

  const getMenuItems = () => {
    const commonItems = [
      { icon: FaHome, label: 'Dashboard', tab: 'dashboard' }
    ]

    switch (user?.role) {
      case 'admin':
        return [
          ...commonItems,
          { icon: FaUsers, label: 'Social Workers', tab: 'social-workers' },
          { icon: FaUserCog, label: 'Caregivers', tab: 'caregivers' },
          { icon: FaHeart, label: 'Children', tab: 'children' },
          { icon: FaDonate, label: 'Donations', tab: 'donations' },
          { icon: FaChartBar, label: 'Reports', tab: 'reports' }
        ]
      case 'social-worker':
        return [
          ...commonItems,
          { icon: FaHeart, label: 'My Children', tab: 'children' },
          { icon: FaBox, label: 'Cases', tab: 'cases' },
          { icon: FaChartBar, label: 'Reports', tab: 'reports' }
        ]
      case 'caregiver':
        return [
          ...commonItems,
          { icon: FaHeart, label: 'My Children', tab: 'children' },
          { icon: FaFileAlt, label: 'Assessments', tab: 'assessments' },
          { icon: FaBox, label: 'Resource Requests', tab: 'requests' },
          { icon: FaComment, label: 'Messages', tab: 'messages' }
        ]
      case 'donor':
        return [
          ...commonItems,
          { icon: FaHeart, label: 'Children in Need', tab: 'children' },
          { icon: FaDonate, label: 'Make Donation', tab: 'donate' },
          { icon: FaChartBar, label: 'Donation History', tab: 'history' }
        ]
      default:
        return commonItems
    }
  }

  const menuItems = getMenuItems()

  return (
    <aside className="fixed left-0 top-16 h-full w-64 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out z-40" style={{ backgroundColor: 'var(--white)' }}>
      <div className="p-4 border-b" style={{ borderColor: 'var(--pale-blue)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--navy-blue)' }}>
            <FaUserCog className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--navy-blue)' }}>
              {user?.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--para)' }}>
              {user?.role?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (e.isTrusted) {
                    setActiveTab(item.tab)
                    // Dispatch custom event to notify dashboard components
                    window.dispatchEvent(new CustomEvent('tabChange', { 
                      detail: item.tab
                    }))
                  }
                }}
                type="button"
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === item.tab ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                style={{ color: 'var(--navy-blue)' }}
              >
                <item.icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  )
}

export default PortalSidebar