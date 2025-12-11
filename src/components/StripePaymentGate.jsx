import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Divider
} from '@mui/material'
import {
  Lock,
  CheckCircle,
  Security,
  EmojiEvents,
  School,
  Speed,
  Assessment,
  AutoAwesome
} from '@mui/icons-material'
import { useSubscription } from '../hooks/useSubscription'

// Initialize Stripe (use your publishable key)
// In production, load this from environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE')

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  },
  hidePostalCode: false
}

const CheckoutForm = ({ onClose, moduleId, moduleName, price }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { upgradeToPremium } = useSubscription()
  
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  // Create PaymentIntent on component mount
  useEffect(() => {
    // Call your backend to create a payment intent
    // This is where you'd call your API endpoint
    // For demo purposes, we'll simulate it
    
    // In production, replace with actual API call:
    // fetch('/api/create-payment-intent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount: price })
    // })
    // .then(res => res.json())
    // .then(data => setClientSecret(data.clientSecret))
    
    console.log('Payment Intent would be created here with amount:', price)
  }, [price])

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setError(null)

    const cardElement = elements.getElement(CardElement)

    // For demo/testing without backend:
    // We'll create a payment method and simulate success
    try {
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      })

      if (methodError) {
        setError(methodError.message)
        setProcessing(false)
        return
      }

      // In production with backend, you would:
      // const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: cardElement,
      //     billing_details: {
      //       name: event.target.name.value,
      //       email: event.target.email.value
      //     }
      //   }
      // })
      
      // For demo purposes - simulate successful payment
      setTimeout(() => {
        console.log('Payment Method Created:', paymentMethod.id)
        
        // Upgrade user to premium
        upgradeToPremium({
          lastFourDigits: paymentMethod.card.last4,
          cardType: paymentMethod.card.brand,
          amount: price,
          paymentMethodId: paymentMethod.id
        })
        
        setSucceeded(true)
        setProcessing(false)
        
        // Close dialog after success
        setTimeout(() => {
          onClose()
          window.location.reload()
        }, 2000)
      }, 2000)

    } catch (err) {
      setError('Payment failed. Please try again.')
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Card Information
        </Typography>
        <Box 
          sx={{ 
            p: 2, 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.paper'
          }}
        >
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {succeeded && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            Payment Successful! 🎉
          </Typography>
          <Typography variant="body2">
            Welcome to Premium! Redirecting...
          </Typography>
        </Alert>
      )}

      <Alert severity="info" icon={<Security />} sx={{ mb: 2 }}>
        <Typography variant="caption">
          🔒 Secured by Stripe. Your payment information is encrypted and secure.
        </Typography>
      </Alert>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onClose} disabled={processing || succeeded}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!stripe || processing || succeeded}
          startIcon={processing ? <CircularProgress size={20} /> : null}
        >
          {processing ? 'Processing...' : `Pay $${price}`}
        </Button>
      </Box>
    </form>
  )
}

const StripePaymentGate = ({ open, onClose, moduleId, moduleName }) => {
  const { PREMIUM_PRICE } = useSubscription()

  const premiumFeatures = [
    { icon: <Lock />, text: 'Access to all 22+ modules (E through Z)' },
    { icon: <School />, text: 'Advanced shorthand techniques and phrasing' },
    { icon: <Speed />, text: 'Speed development exercises up to 120 WPM' },
    { icon: <Assessment />, text: 'Comprehensive assessments and certifications' },
    { icon: <AutoAwesome />, text: 'AI-powered stroke recognition and feedback' },
    { icon: <EmojiEvents />, text: 'Professional shorthand certification pathway' }
  ]

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Lock color="primary" />
          <Typography variant="h6">
            Upgrade to Premium
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            <strong>Module {moduleId} - {moduleName}</strong> requires a premium subscription.
          </Typography>
          <Typography variant="body2">
            Upgrade now to unlock all advanced modules and features!
          </Typography>
        </Alert>

        <Card sx={{ mb: 3, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  ${PREMIUM_PRICE}
                </Typography>
                <Typography variant="body2">
                  One-time payment • Lifetime access
                </Typography>
              </Box>
              <EmojiEvents sx={{ fontSize: 60, opacity: 0.3 }} />
            </Box>
          </CardContent>
        </Card>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Premium Features
        </Typography>
        <List dense sx={{ mb: 3 }}>
          {premiumFeatures.map((feature, index) => (
            <ListItem key={index}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                {React.cloneElement(feature.icon, { color: 'primary', fontSize: 'small' })}
              </ListItemIcon>
              <ListItemText 
                primary={feature.text}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Payment Information
        </Typography>

        <Elements stripe={stripePromise}>
          <CheckoutForm 
            onClose={onClose}
            moduleId={moduleId}
            moduleName={moduleName}
            price={PREMIUM_PRICE}
          />
        </Elements>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Note:</strong> This demo uses Stripe test mode. In production, this will process real payments.
            Test card: 4242 4242 4242 4242 (any future expiry, any CVV)
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default StripePaymentGate
