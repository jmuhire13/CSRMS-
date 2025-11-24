import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useUser()
  
  // If not authenticated, redirect to role selection
  if (!isAuthenticated) {
    return <Navigate to="/portal/" replace />
  }
  
  // If allowedRoles is specified and user doesn't have the required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/portal/" replace />
  }
  
  return children
}

export default ProtectedRoute