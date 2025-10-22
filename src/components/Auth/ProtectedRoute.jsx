import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuthMock'

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()
  if (loading) return null
  if (!currentUser) return <Navigate to="/signin" replace />
  return children
}

export default ProtectedRoute
