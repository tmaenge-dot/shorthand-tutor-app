import React from 'react'
import { Button, Box, Typography } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import { useAuth } from '../../hooks/useAuthMock'

// NOTE: set VITE_STRIPE_PUBLISHABLE_KEY in your environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

const BillingPage = () => {
  const { currentUser } = useAuth()

  const handleSubscribe = async (priceId) => {
    if (!currentUser) return
    
    // Development mock: Show success message instead of actual Stripe checkout
    if (import.meta.env.DEV) {
      console.log('Mock subscription attempt:', { priceId, uid: currentUser.uid })
      alert(`Mock subscription created for ${priceId}. In production, this would redirect to Stripe checkout.`)
      return
    }
    
    // Production code (only runs in production builds)
    const stripe = await stripePromise
    try {
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, uid: currentUser.uid })
      })
      const data = await res.json()
      if (data.sessionId) {
        stripe.redirectToCheckout({ sessionId: data.sessionId })
      }
    } catch (error) {
      console.error('Checkout session error:', error)
      alert('Unable to create checkout session. Please try again later.')
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>Billing</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>Choose a plan</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={() => handleSubscribe('price_premium_monthly')}>Subscribe - Premium</Button>
        <Button variant="outlined" onClick={() => handleSubscribe('price_institutional_monthly')}>Contact Sales</Button>
      </Box>
    </Box>
  )
}

export default BillingPage
