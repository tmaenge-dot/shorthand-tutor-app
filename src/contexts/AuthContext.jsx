import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    try {
      setLoading(true)
      
      // Create user account
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update display name
      await updateProfile(newUser, { displayName })
      
      // Create user profile in Firestore
      const userProfile = {
        uid: newUser.uid,
        email: newUser.email,
        displayName: displayName,
        createdAt: serverTimestamp(),
        subscription: {
          plan: 'free',
          status: 'active',
          startDate: serverTimestamp(),
          endDate: null
        },
        progress: {
          currentModule: 'A',
          completedModules: [],
          totalSpeedExercises: 0,
          totalDictationMinutes: 0,
          averageSpeed: 0,
          averageAccuracy: 0
        },
        usage: {
          lastResetDate: new Date().toDateString(),
          dailySpeedExercises: 0,
          dailyDictationMinutes: 0
        }
      }
      
      await setDoc(doc(db, 'users', newUser.uid), userProfile)
      setUserProfile(userProfile)
      
      toast.success('Account created successfully!')
      return { success: true, user: newUser }
      
    } catch (error) {
      console.error('Signup error:', error)
      toast.error(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Sign in with email and password
  const signin = async (email, password) => {
    try {
      setLoading(true)
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      toast.success('Welcome back!')
      return { success: true, user }
    } catch (error) {
      console.error('Signin error:', error)
      toast.error(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth)
      setUserProfile(null)
      toast.success('Signed out successfully')
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error(error.message)
      return { success: false, error: error.message }
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Password reset email sent!')
      return { success: true }
    } catch (error) {
      console.error('Reset password error:', error)
      toast.error(error.message)
      return { success: false, error: error.message }
    }
  }

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), updates)
        setUserProfile(prev => ({ ...prev, ...updates }))
        toast.success('Profile updated successfully!')
        return { success: true }
      }
    } catch (error) {
      console.error('Update profile error:', error)
      toast.error(error.message)
      return { success: false, error: error.message }
    }
  }

  // Update subscription
  const updateSubscription = async (subscriptionData) => {
    try {
      if (user) {
        const updates = {
          subscription: {
            ...userProfile.subscription,
            ...subscriptionData,
            updatedAt: serverTimestamp()
          }
        }
        
        await updateDoc(doc(db, 'users', user.uid), updates)
        setUserProfile(prev => ({ ...prev, ...updates }))
        
        toast.success('Subscription updated successfully!')
        return { success: true }
      }
    } catch (error) {
      console.error('Update subscription error:', error)
      toast.error(error.message)
      return { success: false, error: error.message }
    }
  }

  // Track usage
  const trackUsage = async (type, amount = 1) => {
    try {
      if (user && userProfile) {
        const today = new Date().toDateString()
        const usage = { ...userProfile.usage }
        
        // Reset daily counters if it's a new day
        if (usage.lastResetDate !== today) {
          usage.dailySpeedExercises = 0
          usage.dailyDictationMinutes = 0
          usage.lastResetDate = today
        }
        
        // Update usage counters
        if (type === 'speedExercise') {
          usage.dailySpeedExercises += amount
        } else if (type === 'dictation') {
          usage.dailyDictationMinutes += amount
        }
        
        const updates = { usage }
        await updateDoc(doc(db, 'users', user.uid), updates)
        setUserProfile(prev => ({ ...prev, ...updates }))
        
        return { success: true }
      }
    } catch (error) {
      console.error('Track usage error:', error)
      return { success: false, error: error.message }
    }
  }

  // Load user profile from Firestore
  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        const profile = userDoc.data()
        setUserProfile(profile)
        return profile
      }
    } catch (error) {
      console.error('Load profile error:', error)
    }
  }

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        await loadUserProfile(user.uid)
      } else {
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    userProfile,
    loading,
    signup,
    signin,
    logout,
    resetPassword,
    updateUserProfile,
    updateSubscription,
    trackUsage
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}