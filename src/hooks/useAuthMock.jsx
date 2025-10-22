import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState('guest') // 'guest', 'registered', 'premium'

  const continueAsGuest = () => {
    const guestUser = { 
      uid: 'guest-' + Date.now(), 
      email: 'guest@shorthand.app', 
      displayName: 'Guest User',
      isGuest: true 
    }
    setCurrentUser(guestUser)
    setUserType('guest')
    localStorage.setItem('currentUser', JSON.stringify(guestUser))
    localStorage.setItem('userType', 'guest')
    return guestUser
  }

  const signup = async ({ email, password, displayName }) => {
    const mockUser = { uid: 'demo-' + Date.now(), email, displayName, isGuest: false }
    setCurrentUser(mockUser)
    setUserType('registered')
    localStorage.setItem('currentUser', JSON.stringify(mockUser))
    localStorage.setItem('userType', 'registered')
    return mockUser
  }

  const login = async ({ email, password }) => {
    const mockUser = { uid: 'demo-' + Date.now(), email, isGuest: false }
    setCurrentUser(mockUser)
    setUserType('registered')
    localStorage.setItem('currentUser', JSON.stringify(mockUser))
    localStorage.setItem('userType', 'registered')
    return mockUser
  }

  const logout = async () => {
    setCurrentUser(null)
    setUserType('guest')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userType')
  }

  const upgradeFromGuest = async ({ email, password, displayName }) => {
    if (currentUser?.isGuest) {
      const upgradedUser = { 
        uid: 'upgraded-' + Date.now(), 
        email, 
        displayName,
        isGuest: false 
      }
      setCurrentUser(upgradedUser)
      setUserType('registered')
      localStorage.setItem('currentUser', JSON.stringify(upgradedUser))
      localStorage.setItem('userType', 'registered')
      return upgradedUser
    }
    throw new Error('Can only upgrade guest accounts')
  }

  // Load user from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('currentUser')
    const savedType = localStorage.getItem('userType')
    if (saved) {
      setCurrentUser(JSON.parse(saved))
      setUserType(savedType || 'guest')
    }
  }, [])

  const value = {
    currentUser,
    userType,
    loading,
    signup,
    login,
    logout,
    continueAsGuest,
    upgradeFromGuest
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}