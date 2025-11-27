import React, { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import DashboardOverview from './DashboardOverview'
import ChildrenInNeed from './ChildrenInNeed'
import MakeDonation from './MakeDonation'
import DonationHistory from './DonationHistory'

const DonorDashboard = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Listen for tab changes from sidebar
  useEffect(() => {
    const handleTabChange = (event) => {
      setActiveTab(event.detail)
    }

    window.addEventListener('tabChange', handleTabChange)
    return () => window.removeEventListener('tabChange', handleTabChange)
  }, [])

  // Render appropriate component based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />
      case 'children':
        return <ChildrenInNeed />
      case 'donate':
        return <MakeDonation />
      case 'history':
        return <DonationHistory />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  )
}

export default DonorDashboard
