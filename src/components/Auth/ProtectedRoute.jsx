import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuthMock'

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading, continueAsGuest } = useAuth()
  const location = useLocation()
  
  // Auto-sign in as guest for educational content to allow public access
  useEffect(() => {
    if (!currentUser && !loading && (
      location.pathname.startsWith('/lesson') ||
      location.pathname.startsWith('/practice') ||
      location.pathname.startsWith('/assessment') ||
      location.pathname.startsWith('/progress')
    )) {
      continueAsGuest()
    }
  }, [currentUser, loading, location.pathname, continueAsGuest])
  
  if (loading) return null
  
  // Allow guest access to educational content
  if (!currentUser && (
    location.pathname.startsWith('/lesson') ||
    location.pathname.startsWith('/practice') ||
    location.pathname.startsWith('/assessment') ||
    location.pathname.startsWith('/progress')
  )) {
    return null // Component will re-render after auto guest login
  }
  
  if (!currentUser) return <Navigate to="/signin" replace />
  return children
}

export default ProtectedRoute
