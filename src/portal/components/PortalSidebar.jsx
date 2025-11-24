import React from 'react'
import { useUser } from '../context/UserContext'
import { FaHome, FaUsers, FaBox, FaChartBar, FaCog, FaHeart, FaDonate, FaUserCog } from 'react-icons/fa'

const PortalSidebar = () => {
  const { user } = useUser()

  const getMenuItems = () => {
    const commonItems = [
      { icon: FaHome, label: 'Dashboard', path: '#' }
    ]

    switch (user?.role) {
      case 'admin':
        return [
          ...commonItems,
          { icon: FaUsers, label: 'User Management', path: '#' },
          { icon: FaBox, label: 'Resource Management', path: '#' },
          { icon: FaChartBar, label: 'Reports & Analytics', path: '#' },
          { icon: FaCog, label: 'System Settings', path: '#' }
        ]
      case 'social-worker':
        return [
          ...commonItems,
          { icon: FaUsers, label: 'Child Registry', path: '#' },
          { icon: FaHeart, label: 'Active Cases', path: '#' },
          { icon: FaBox, label: 'Resource Requests', path: '#' },
          { icon: FaChartBar, label: 'My Reports', path: '#' }
        ]
      case 'caregiver':
        return [
          ...commonItems,
          { icon: FaHeart, label: 'My Children', path: '#' },
          { icon: FaBox, label: 'Support Status', path: '#' },
          { icon: FaUsers, label: 'Messages', path: '#' }
        ]
      case 'donor':
        return [
          ...commonItems,
          { icon: FaDonate, label: 'My Donations', path: '#' },
          { icon: FaChartBar, label: 'Impact Dashboard', path: '#' },
          { icon: FaHeart, label: 'Supported Children', path: '#' }
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
              <a
                href={item.path}
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-opacity-10"
                style={{ 
                  color: 'var(--navy-blue)',
                  backgroundColor: index === 0 ? 'var(--pale-blue)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (index !== 0) {
                    e.currentTarget.style.backgroundColor = 'var(--off-white)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== 0) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <item.icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
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