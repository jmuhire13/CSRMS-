import React from 'react'
import { Outlet } from 'react-router-dom'
import PortalHeader from './PortalHeader'
import PortalSidebar from './PortalSidebar'

const PortalLayout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--off-white)' }}>
      <PortalHeader />
      <div className="flex">
        <PortalSidebar />
        <main className="flex-1 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default PortalLayout