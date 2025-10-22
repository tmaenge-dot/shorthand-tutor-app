import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    yearlyPrice: 0,
    billing: 'forever',
    features: {
      modules: ['A', 'B', 'C'], // Only first 3 modules
      speedExercisesPerDay: 5,
      dictationMinutesPerDay: 10,
      progressTracking: true,
      certificates: false,
      offlineMode: false,
      prioritySupport: false
    },
    description: 'Perfect for trying shorthand basics'
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    yearlyPrice: 99.99, // Save ~17%
    billing: 'monthly',
    savings: 'Save $20/year',
    features: {
      modules: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
      speedExercisesPerDay: -1, // Unlimited
      dictationMinutesPerDay: -1, // Unlimited
      progressTracking: true,
      certificates: true,
      offlineMode: true,
      prioritySupport: true
    },
    description: 'Complete shorthand mastery with all features'
  },
  institutional: {
    id: 'institutional',
    name: 'Institutional',
    price: 29.99,
    yearlyPrice: 299.99, // Save ~17%
    billing: 'monthly',
    savings: 'Save $60/year',
    features: {
      modules: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
      speedExercisesPerDay: -1, // Unlimited
      dictationMinutesPerDay: -1, // Unlimited
      progressTracking: true,
      certificates: true,
      offlineMode: true,
      prioritySupport: true,
      teacherDashboard: true,
      studentManagement: true,
      customBranding: true,
      bulkCertificates: true,
      analytics: true
    },
    description: 'Complete solution for schools and training centers'
  }
}

// Subscription Context
const SubscriptionContext = createContext()

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

export const SubscriptionProvider = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState(SUBSCRIPTION_PLANS.free)
  const [subscriptionStatus, setSubscriptionStatus] = useState('free') // free, active, past_due, canceled
  const [usageStats, setUsageStats] = useState({
    speedExercisesToday: 0,
    dictationMinutesToday: 0,
    lastResetDate: new Date().toDateString()
  })

  // Load subscription data from localStorage and sync with Firebase user doc
  useEffect(() => {
    const savedUsage = localStorage.getItem('usageStats')
    if (savedUsage) {
      const usage = JSON.parse(savedUsage)
      const today = new Date().toDateString()
      if (usage.lastResetDate !== today) {
        const resetUsage = {
          speedExercisesToday: 0,
          dictationMinutesToday: 0,
          lastResetDate: today
        }
        setUsageStats(resetUsage)
        localStorage.setItem('usageStats', JSON.stringify(resetUsage))
      } else {
        setUsageStats(usage)
      }
    }

    // Listen for auth changes to sync subscription plan from Firestore user doc
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            const planId = data.plan || 'free'
            const planKey = planId.toLowerCase()
            setCurrentPlan(SUBSCRIPTION_PLANS[planKey] || SUBSCRIPTION_PLANS.free)
            setSubscriptionStatus(data.subscriptionStatus || 'free')
            // persist locally
            localStorage.setItem('subscription', JSON.stringify({ planId: planKey, status: data.subscriptionStatus || 'free' }))
          }
        } catch (err) {
          console.error('Failed to fetch user subscription:', err)
        }
      } else {
        // load from storage or default to free
        const savedSubscription = localStorage.getItem('subscription')
        if (savedSubscription) {
          const subscription = JSON.parse(savedSubscription)
          setCurrentPlan(SUBSCRIPTION_PLANS[subscription.planId] || SUBSCRIPTION_PLANS.free)
          setSubscriptionStatus(subscription.status || 'free')
        }
      }
    })

    return () => unsubscribe()
  }, [])

  // Check if user has access to a specific feature
  const hasAccess = (feature, moduleId = null) => {
    const plan = currentPlan.features
    
    switch (feature) {
      case 'module':
        return plan.modules.includes(moduleId)
      
      case 'speedExercise':
        return plan.speedExercisesPerDay === -1 || usageStats.speedExercisesToday < plan.speedExercisesPerDay
      
      case 'dictation':
        return plan.dictationMinutesPerDay === -1 || usageStats.dictationMinutesToday < plan.dictationMinutesPerDay
      
      case 'certificates':
        return plan.certificates
      
      case 'offlineMode':
        return plan.offlineMode
      
      case 'teacherDashboard':
        return plan.teacherDashboard
      
      default:
        return true
    }
  }

  // Record usage of a feature (alias: trackUsage)
  const recordUsage = (feature, amount = 1) => {
    const today = new Date().toDateString()
    let newUsage = { ...usageStats }
    
    // Reset if new day
    if (newUsage.lastResetDate !== today) {
      newUsage = {
        speedExercisesToday: 0,
        dictationMinutesToday: 0,
        lastResetDate: today
      }
    }
    
    switch (feature) {
      case 'speedExercise':
        newUsage.speedExercisesToday += amount
        break
      case 'dictation':
        newUsage.dictationMinutesToday += amount
        break
    }
    
    setUsageStats(newUsage)
    localStorage.setItem('usageStats', JSON.stringify(newUsage))
  }

  const trackUsage = (feature, amount = 1) => recordUsage(feature, amount)

  // Get remaining usage for the day
  const getRemainingUsage = (feature) => {
    const plan = currentPlan.features
    
    switch (feature) {
      case 'speedExercise':
        if (plan.speedExercisesPerDay === -1) return -1 // Unlimited
        return Math.max(0, plan.speedExercisesPerDay - usageStats.speedExercisesToday)
      
      case 'dictation':
        if (plan.dictationMinutesPerDay === -1) return -1 // Unlimited
        return Math.max(0, plan.dictationMinutesPerDay - usageStats.dictationMinutesToday)
      
      default:
        return -1
    }
  }

  // Upgrade subscription (mock implementation)
  const upgradeSubscription = async (planId) => {
    try {
      // In a real implementation, this would integrate with Stripe or payment processor
      
      // Mock successful upgrade - use lowercase plan keys
      const newPlan = SUBSCRIPTION_PLANS[planId.toLowerCase()]
      if (newPlan) {
        setCurrentPlan(newPlan)
        setSubscriptionStatus('active')
        
        // Save to localStorage (in real app, this would be saved to backend)
        localStorage.setItem('subscription', JSON.stringify({
          planId: planId.toLowerCase(),
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + (newPlan.billing === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString()
        }))
        
        return { success: true, message: 'Subscription upgraded successfully!' }
      }
      
      return { success: false, message: 'Invalid plan selected' }
    } catch (error) {
      console.error('Subscription upgrade failed:', error)
      return { success: false, message: 'Upgrade failed. Please try again.' }
    }
  }

  // Get upgrade URL (mock - would integrate with Stripe)
  const getUpgradeUrl = (planId) => {
    // In real implementation, this would return Stripe checkout URL
    return `/pricing?plan=${planId}`
  }

  // Get usage statistics
  const getUsageStats = () => {
    // Mock weekly and monthly stats - in real app this would come from backend
    return {
      weeklySpeedExercises: Math.floor(Math.random() * 20) + 10,
      weeklyDictationMinutes: Math.floor(Math.random() * 180) + 60,
      weeklyModulesAccessed: Math.floor(Math.random() * 5) + 2,
      totalDaysActive: Math.floor(Math.random() * 25) + 5,
      completed: usageStats.speedExercisesToday + usageStats.dictationMinutesToday,
      total: (currentPlan.features?.speedExercisesPerDay === -1 ? 100 : currentPlan.features?.speedExercisesPerDay || 0) + 
             (currentPlan.features?.dictationMinutesPerDay === -1 ? 100 : currentPlan.features?.dictationMinutesPerDay || 0),
      percentage: 0
    }
  }

  const value = {
    currentPlan,
    subscriptionStatus,
    usageStats,
    hasAccess,
    recordUsage,
    trackUsage,
    getRemainingUsage,
    upgradeSubscription,
    getUpgradeUrl,
    getUsageStats,
    plans: SUBSCRIPTION_PLANS
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export default SubscriptionProvider