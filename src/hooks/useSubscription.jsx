import { useState, useEffect, useContext, createContext } from 'react'

// Subscription Context
const SubscriptionContext = createContext()

// Free tier: Modules A-D (first 4 modules)
// Premium tier: Module E onwards
const FREE_MODULES = ['A', 'B', 'C', 'D']
const PREMIUM_PRICE = 29.99 // USD

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState({
    isPremium: false,
    plan: 'free',
    expiryDate: null,
    paymentMethod: null,
    startDate: null
  })

  // Load subscription from localStorage
  useEffect(() => {
    const savedSubscription = localStorage.getItem('userSubscription')
    if (savedSubscription) {
      try {
        const parsed = JSON.parse(savedSubscription)
        // Check if subscription is still valid
        if (parsed.expiryDate && new Date(parsed.expiryDate) > new Date()) {
          setSubscription(parsed)
        } else if (parsed.expiryDate) {
          // Subscription expired
          setSubscription({
            isPremium: false,
            plan: 'free',
            expiryDate: null,
            paymentMethod: null,
            startDate: null
          })
          localStorage.removeItem('userSubscription')
        }
      } catch (error) {
        console.error('Error loading subscription:', error)
      }
    }
  }, [])

  // Save subscription to localStorage
  const saveSubscription = (newSubscription) => {
    setSubscription(newSubscription)
    localStorage.setItem('userSubscription', JSON.stringify(newSubscription))
  }

  // Upgrade to premium
  const upgradeToPremium = (paymentDetails) => {
    const now = new Date()
    const expiryDate = new Date(now)
    expiryDate.setFullYear(expiryDate.getFullYear() + 1) // 1 year subscription

    const newSubscription = {
      isPremium: true,
      plan: 'premium',
      expiryDate: expiryDate.toISOString(),
      paymentMethod: paymentDetails.lastFourDigits,
      startDate: now.toISOString(),
      price: PREMIUM_PRICE,
      currency: 'USD'
    }

    saveSubscription(newSubscription)
    return newSubscription
  }

  // Check if user can access a module
  const canAccessModule = (moduleId) => {
    // If premium, can access all
    if (subscription.isPremium) {
      return true
    }
    
    // If free, only modules A-D
    return FREE_MODULES.includes(moduleId)
  }

  // Check if module requires upgrade
  const requiresUpgrade = (moduleId) => {
    return !canAccessModule(moduleId)
  }

  // Cancel subscription
  const cancelSubscription = () => {
    setSubscription({
      isPremium: false,
      plan: 'free',
      expiryDate: null,
      paymentMethod: null,
      startDate: null
    })
    localStorage.removeItem('userSubscription')
  }

  const value = {
    subscription,
    upgradeToPremium,
    canAccessModule,
    requiresUpgrade,
    cancelSubscription,
    FREE_MODULES,
    PREMIUM_PRICE
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider')
  }
  return context
}
