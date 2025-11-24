import React, { createContext, useContext, useState } from 'react'

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

  const login = (userRole, userData) => {
    setUser({
      role: userRole,
      ...userData
    })
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}