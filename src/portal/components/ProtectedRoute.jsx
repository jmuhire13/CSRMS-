import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useUser()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--off-white)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin mx-auto mb-4" 
               style={{ borderColor: 'var(--pale-blue)', borderTopColor: 'var(--navy-blue)' }}>
          </div>
          <p className="text-lg font-semibold" style={{ color: 'var(--navy-blue)' }}>
            Loading...
          </p>
        </div>
      </div>
    )
  }
  
  // If not authenticated, redirect to auth
  if (!isAuthenticated || !user) {
    return <Navigate to="/portal/" replace />
  }
  
  // If allowedRoles is specified and user doesn't have the required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/portal/" replace />
  }
  
  return children
}

export default ProtectedRoute