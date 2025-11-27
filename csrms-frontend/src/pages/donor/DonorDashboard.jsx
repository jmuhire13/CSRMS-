import React, { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import DashboardOverview from './DashboardOverview'
import ChildrenInNeed from './ChildrenInNeed'
import MakeDonation from './MakeDonation'
import DonationHistory from './DonationHistory'

const DonorDashboard = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Check for donation success/cancel in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const donationStatus = urlParams.get('donation')
    
    if (donationStatus === 'success') {
      setShowSuccessModal(true)
      setActiveTab('dashboard')
      // Trigger refresh
      setRefreshKey(prev => prev + 1)
      // Clean up URL but keep the correct path
      window.history.replaceState({}, '', window.location.pathname)
    } else if (donationStatus === 'cancelled') {
      setShowCancelModal(true)
      // Clean up URL but keep the correct path
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

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
        return <DashboardOverview key={refreshKey} />
      case 'children':
        return <ChildrenInNeed />
      case 'donate':
        return <MakeDonation />
      case 'history':
        return <DonationHistory key={refreshKey} />
      default:
        return <DashboardOverview key={refreshKey} />
    }
  }

  return (
    <div className="p-6">
      {renderContent()}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You! 🎉</h2>
            <p className="text-gray-600 mb-2">
              <strong className="text-blue-700">Your payment has been processed successfully!</strong>
            </p>
            <p className="text-gray-600 mb-6">
              Thank you for your generous donation. Your support makes a real difference in the lives of children who need it most. Together, we're building a brighter future.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  setActiveTab('dashboard')
                  setRefreshKey(prev => prev + 1)
                  window.dispatchEvent(new CustomEvent('tabChange', { detail: 'dashboard' }))
                }}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                View Dashboard
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  setActiveTab('history')
                  setRefreshKey(prev => prev + 1)
                  window.dispatchEvent(new CustomEvent('tabChange', { detail: 'history' }))
                }}
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
              >
                View Donation History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h2>
            <p className="text-gray-600 mb-6">
              Your donation was cancelled. No charges have been made to your account.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowCancelModal(false)
                  setActiveTab('donate')
                  window.dispatchEvent(new CustomEvent('tabChange', { detail: 'donate' }))
                }}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false)
                  setActiveTab('dashboard')
                  window.dispatchEvent(new CustomEvent('tabChange', { detail: 'dashboard' }))
                }}
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DonorDashboard
