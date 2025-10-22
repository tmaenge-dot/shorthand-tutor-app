import { useState, useEffect, createContext, useContext } from 'react'

// Mock user types
export type UserType = 'guest' | 'premium' | 'professional' | 'admin'

export interface User {
  id: string
  email: string
  displayName?: string
  isGuest: boolean
  userType: UserType
  subscriptionStatus: 'active' | 'cancelled' | 'expired'
  subscriptionPlan?: string
}

interface AuthContextType {
  currentUser: User | null
  userType: UserType
  login: (email: string, password: string) => Promise<User>
  loginAsGuest: () => User
  continueAsGuest: () => User
  signup: (email: string, password: string, displayName?: string) => Promise<User>
  logout: () => void
  upgradeSubscription: (newPlan: string) => void
  isAuthenticated: boolean
  isAdmin: boolean
  isPremium: boolean
  isProfessional: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<UserType>('guest')

  useEffect(() => {
    // Don't auto-login - let users sign in manually
    console.log('AuthProvider mounted - no auto-login')
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login logic - simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockUser: User = {
      id: 'user_12345',
      email: email,
      displayName: email.includes('admin') ? 'Admin User' : email.includes('tmaenge') ? 'Mr T. Maenge' : 'Premium User',
      isGuest: false,
      userType: email.includes('admin') ? 'admin' : email.includes('tmaenge') ? 'admin' : 'premium',
      subscriptionStatus: 'active',
      subscriptionPlan: email.includes('admin') || email.includes('tmaenge') ? 'Professional Yearly' : 'Premium Monthly'
    }
    
    setCurrentUser(mockUser)
    setUserType(mockUser.userType)
    return mockUser
  }

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest_' + Date.now(),
      email: 'guest@example.com',
      displayName: 'Guest User',
      isGuest: true,
      userType: 'guest',
      subscriptionStatus: 'expired'
    }
    
    setCurrentUser(guestUser)
    setUserType('guest')
    return guestUser
  }

  const continueAsGuest = () => {
    return loginAsGuest()
  }

  const signup = async (email: string, password: string, displayName?: string) => {
    // Mock signup logic - simulate registration delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newUser: User = {
      id: 'user_' + Date.now(),
      email: email,
      displayName: displayName || email.split('@')[0],
      isGuest: false,
      userType: 'premium',
      subscriptionStatus: 'active',
      subscriptionPlan: 'Premium Monthly'
    }
    
    setCurrentUser(newUser)
    setUserType(newUser.userType)
    return newUser
  }

  const logout = () => {
    setCurrentUser(null)
    setUserType('guest')
  }

  const upgradeSubscription = (newPlan: string) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        subscriptionPlan: newPlan,
        subscriptionStatus: 'active' as const,
        userType: newPlan.includes('Professional') ? 'professional' as UserType : 'premium' as UserType
      }
      setCurrentUser(updatedUser)
      setUserType(updatedUser.userType)
    }
  }

  const value: AuthContextType = {
    currentUser,
    userType,
    login,
    loginAsGuest,
    continueAsGuest,
    signup,
    logout,
    upgradeSubscription,
    isAuthenticated: !!currentUser,
    isAdmin: userType === 'admin',
    isPremium: ['premium', 'professional', 'admin'].includes(userType),
    isProfessional: ['professional', 'admin'].includes(userType)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuth