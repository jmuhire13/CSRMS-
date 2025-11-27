import React from 'react'
import { Outlet } from 'react-router-dom'
import PortalHeader from './PortalHeader'
import PortalSidebar from './PortalSidebar'

const PortalLayout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--off-white)' }}>
      <PortalHeader />
      <div className="flex pt-14 md:pt-16">
        <PortalSidebar />
        <main className="flex-1 lg:ml-64 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default PortalLayout