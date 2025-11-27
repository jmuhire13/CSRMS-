import React, { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/api'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [requirePasswordChange, setRequirePasswordChange] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('csrms_token')
      if (token) {
        apiService.setToken(token)
        const response = await apiService.getCurrentUser()
        if (response.success) {
          setUser(response.user)
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('csrms_token')
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('csrms_token')
    } finally {
      setLoading(false)
    }
  }

  const login = (userData, needsPasswordChange = false) => {
    setUser(userData)
    setIsAuthenticated(true)
    setRequirePasswordChange(needsPasswordChange)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    apiService.logout()
    window.location.href = '/portal'
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated,
    requirePasswordChange,
    setRequirePasswordChange
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}