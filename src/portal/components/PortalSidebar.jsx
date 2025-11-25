import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { FaHome, FaUsers, FaBox, FaChartBar, FaCog, FaHeart, FaDonate, FaUserCog } from 'react-icons/fa'

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
          { icon: FaUsers, label: 'User Management', tab: 'user-management' },
          { icon: FaBox, label: 'Resource Management', tab: 'resource-management' },
          { icon: FaChartBar, label: 'Reports & Analytics', tab: 'reports' },
          { icon: FaCog, label: 'System Settings', tab: 'settings' }
        ]
      case 'social-worker':
        return [
          ...commonItems,
          { icon: FaUsers, label: 'Child Registry', tab: 'children' },
          { icon: FaHeart, label: 'Active Cases', tab: 'cases' },
          { icon: FaBox, label: 'Resource Requests', tab: 'resources' },
          { icon: FaChartBar, label: 'My Reports', tab: 'reports' }
        ]
      case 'caregiver':
        return [
          ...commonItems,
          { icon: FaHeart, label: 'My Children', tab: 'children' },
          { icon: FaBox, label: 'Support Status', tab: 'support' },
          { icon: FaUsers, label: 'Messages', tab: 'messages' }
        ]
      case 'donor':
        return [
          ...commonItems,
          { icon: FaDonate, label: 'My Donations', tab: 'donations' },
          { icon: FaChartBar, label: 'Impact Dashboard', tab: 'impact' },
          { icon: FaHeart, label: 'Supported Children', tab: 'children' }
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
                onClick={() => {
                  setActiveTab(item.tab)
                  // Dispatch custom event to notify dashboard components
                  window.dispatchEvent(new CustomEvent('tabChange', { 
                    detail: { tab: item.tab, role: user?.role } 
                  }))
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-opacity-10"
                style={{ 
                  color: 'var(--navy-blue)',
                  backgroundColor: activeTab === item.tab ? 'var(--pale-blue)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.tab) {
                    e.currentTarget.style.backgroundColor = 'var(--off-white)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.tab) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <item.icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--off-white)' }}>
          <p className="text-xs" style={{ color: 'var(--para)' }}>
            <strong>Demo Mode:</strong> This portal uses sample data for demonstration purposes.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default PortalSidebar