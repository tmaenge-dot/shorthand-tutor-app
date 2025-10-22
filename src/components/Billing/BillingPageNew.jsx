import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Divider,
  Paper,
  Stack,
  LinearProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material'
import {
  CheckCircle,
  Star,
  CreditCard,
  Security,
  AccountBalance,
  PaymentOutlined,
  AutoAwesome,
  Close,
  Lock,
  Person,
  Business
} from '@mui/icons-material'
import { loadStripe } from '@stripe/stripe-js'
import { useAuth } from '../../hooks/useAuthMock'
import { useSubscription, SUBSCRIPTION_PLANS } from '../../hooks/useSubscription'
import toast from 'react-hot-toast'

// NOTE: set VITE_STRIPE_PUBLISHABLE_KEY in your environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

const BillingPage = () => {
  const { currentUser, userType, upgradeFromGuest } = useAuth()
  const { currentPlan, updatePlan } = useSubscription()
  
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [checkoutStep, setCheckoutStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [guestUpgrade, setGuestUpgrade] = useState({
    email: '',
    password: '',
    displayName: ''
  })

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setShowCheckout(true)
    setCheckoutStep(currentUser?.isGuest ? 0 : 1)
  }

  const handleGuestUpgrade = async () => {
    if (!guestUpgrade.email || !guestUpgrade.password || !guestUpgrade.displayName) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      await upgradeFromGuest(guestUpgrade)
      toast.success('Account created successfully!')
      setCheckoutStep(1)
    } catch (error) {
      toast.error('Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!selectedPlan) return
    
    setLoading(true)
    
    // Development mock: Show success message instead of actual Stripe checkout
    if (import.meta.env.DEV) {
      console.log('Mock subscription attempt:', { 
        planId: selectedPlan.id, 
        uid: currentUser.uid,
        paymentMethod 
      })
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful subscription
      updatePlan(selectedPlan.id)
      toast.success(`Successfully subscribed to ${selectedPlan.name}!`)
      setShowCheckout(false)
      setSelectedPlan(null)
      setCheckoutStep(0)
      setLoading(false)
      return
    }
    
    // Production code (only runs in production builds)
    const stripe = await stripePromise
    try {
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId: selectedPlan.stripePriceId, 
          uid: currentUser.uid 
        })
      })
      const data = await res.json()
      if (data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId })
      }
    } catch (error) {
      console.error('Stripe error:', error)
      toast.error('Payment failed. Please try again.')
    }
    setLoading(false)
  }

  const getPlanFeatures = (plan) => {
    const features = []
    
    if (plan.id === 'free') {
      features.push(
        { text: 'Modules A, B, C', icon: <CheckCircle color="success" /> },
        { text: '5 speed exercises/day', icon: <CheckCircle color="warning" /> },
        { text: '10 min dictation/day', icon: <CheckCircle color="warning" /> },
        { text: 'Basic progress tracking', icon: <CheckCircle color="success" /> }
      )
    } else {
      features.push(
        { text: 'All 21 modules (A-V)', icon: <CheckCircle color="success" /> },
        { text: 'Unlimited speed exercises', icon: <CheckCircle color="success" /> },
        { text: 'Unlimited dictation', icon: <CheckCircle color="success" /> },
        { text: 'Certificates & achievements', icon: <Star color="primary" /> },
        { text: 'Offline mode', icon: <CheckCircle color="success" /> },
        { text: 'Priority support', icon: <AutoAwesome color="primary" /> }
      )
    }
    
    return features
  }

  const checkoutSteps = currentUser?.isGuest 
    ? ['Create Account', 'Payment Method', 'Complete']
    : ['Payment Method', 'Complete']

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Choose Your Learning Path
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Master Pitman Shorthand with the plan that fits your needs
        </Typography>
        
        {currentUser?.isGuest && (
          <Alert severity="info" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
            <strong>You're currently exploring as a guest.</strong> Create an account to unlock premium features and save your progress.
          </Alert>
        )}
        
        {currentPlan && !currentUser?.isGuest && (
          <Chip 
            label={`Current Plan: ${currentPlan.name || 'Unknown'}`}
            color="primary" 
            sx={{ mt: 2 }}
          />
        )}
      </Box>

      {/* Plans Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Card 
              sx={{ 
                height: '100%',
                border: plan.id === 'premium' ? '2px solid' : '1px solid',
                borderColor: plan.id === 'premium' ? 'primary.main' : 'divider',
                position: 'relative',
                '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' }
              }}
            >
              {plan.id === 'premium' && (
                <Chip 
                  label="Most Popular" 
                  color="primary" 
                  sx={{ 
                    position: 'absolute', 
                    top: -12, 
                    left: '50%', 
                    transform: 'translateX(-50%)' 
                  }} 
                />
              )}
              
              <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" color="primary.main">
                    ${plan.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {plan.billing === 'forever' ? 'Free forever' : `per ${plan.billing.replace('ly', '')}`}
                  </Typography>
                  {plan.savings && (
                    <Chip label={plan.savings} color="success" size="small" sx={{ mt: 1 }} />
                  )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                  {plan.description}
                </Typography>

                <List sx={{ mb: 3, flexGrow: 1 }}>
                  {getPlanFeatures(plan).map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {feature.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature.text}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  variant={plan.id === 'free' ? 'outlined' : 'contained'}
                  size="large"
                  fullWidth
                  onClick={() => plan.id === 'free' ? null : handleSelectPlan(plan)}
                  disabled={currentPlan?.id === plan.id || (plan.id === 'free' && currentUser?.isGuest)}
                  sx={{ mt: 'auto' }}
                >
                  {plan.id === 'free' 
                    ? (currentUser?.isGuest ? 'Current Plan' : 'Downgrade')
                    : currentPlan?.id === plan.id 
                    ? 'Current Plan' 
                    : 'Choose Plan'
                  }
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Payment Security */}
      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Secure Payment Processing
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Security color="success" />
            <Typography variant="body2">SSL Encrypted</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreditCard color="primary" />
            <Typography variant="body2">Stripe Secure</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Lock color="action" />
            <Typography variant="body2">PCI Compliant</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Checkout Dialog */}
      <Dialog 
        open={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Subscribe to {selectedPlan?.name}
            <Button onClick={() => setShowCheckout(false)} sx={{ minWidth: 'auto' }}>
              <Close />
            </Button>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Stepper activeStep={checkoutStep} sx={{ mb: 3 }}>
            {checkoutSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {loading && <LinearProgress sx={{ mb: 2 }} />}

          {/* Step 0: Create Account (Guest Users Only) */}
          {checkoutStep === 0 && currentUser?.isGuest && (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                Create an account to save your progress and access premium features
              </Alert>
              
              <Stack spacing={3}>
                <TextField
                  label="Full Name"
                  value={guestUpgrade.displayName}
                  onChange={(e) => setGuestUpgrade({ ...guestUpgrade, displayName: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Email Address"
                  type="email"
                  value={guestUpgrade.email}
                  onChange={(e) => setGuestUpgrade({ ...guestUpgrade, email: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={guestUpgrade.password}
                  onChange={(e) => setGuestUpgrade({ ...guestUpgrade, password: e.target.value })}
                  fullWidth
                />
              </Stack>
            </Box>
          )}

          {/* Step 1: Payment Method */}
          {checkoutStep === (currentUser?.isGuest ? 1 : 0) && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ mb: 3 }}
              >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CreditCard />
                      Credit/Debit Card
                    </Box>
                  }
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PaymentOutlined />
                      PayPal
                    </Box>
                  }
                />
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccountBalance />
                      Bank Transfer
                    </Box>
                  }
                />
              </RadioGroup>

              {/* Order Summary */}
              <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{selectedPlan?.name} Plan</Typography>
                  <Typography fontWeight="bold">${selectedPlan?.price}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary.main">
                    ${selectedPlan?.price} / {selectedPlan?.billing.replace('ly', '')}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowCheckout(false)} disabled={loading}>
            Cancel
          </Button>
          
          {checkoutStep === 0 && currentUser?.isGuest && (
            <Button 
              onClick={handleGuestUpgrade} 
              variant="contained"
              disabled={loading}
            >
              Create Account
            </Button>
          )}
          
          {checkoutStep === (currentUser?.isGuest ? 1 : 0) && (
            <Button 
              onClick={handleSubscribe} 
              variant="contained"
              disabled={loading}
              startIcon={<Security />}
            >
              {loading ? 'Processing...' : `Pay $${selectedPlan?.price}`}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BillingPage