import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import {
  CheckCircle,
  Star,
  School,
  Business,
  Payment,
  AccountBalance,
  CreditCard,
  Security,
  MonetizationOn
} from '@mui/icons-material'
import { useAuth } from '../../hooks/useAuthMock'
import toast from 'react-hot-toast'

// PayPal Configuration - Replace with your actual PayPal details
const PAYPAL_CONFIG = {
  clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
  currency: 'USD',
  merchantId: 'YOUR_PAYPAL_MERCHANT_EMAIL@gmail.com' // Your PayPal email
}

const PayPalPaymentSystem = () => {
  const { currentUser } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [paymentInProgress, setPaymentInProgress] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [affiliateCode, setAffiliateCode] = useState('')

  // Subscription Plans with Pricing
  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free Explorer',
      price: 0,
      period: 'Forever',
      description: 'Perfect for trying shorthand basics',
      popular: false,
      features: [
        'Access to Modules A, B, C',
        '5 speed exercises per day',
        '10 minutes dictation daily',
        'Basic progress tracking',
        'Community support'
      ],
      limitations: [
        'Limited modules access',
        'Daily usage limits',
        'Basic features only'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Learner',
      price: 19.99,
      period: 'month',
      description: 'Complete shorthand mastery',
      popular: true,
      features: [
        'All 21 learning modules (A-V)',
        'Unlimited speed exercises',
        'Unlimited dictation practice',
        'Advanced progress analytics',
        'AI-powered feedback',
        'Certificates & achievements',
        'Priority email support',
        'Offline mode access',
        'Mobile app access'
      ],
      yearlyDiscount: {
        price: 199.99,
        savings: 39.89,
        period: 'year'
      }
    },
    {
      id: 'professional',
      name: 'Professional Stenographer',
      price: 49.99,
      period: 'month',
      description: 'For serious professionals and institutions',
      popular: false,
      features: [
        'Everything in Premium',
        'Advanced court reporting modules',
        'Legal & medical terminology',
        'Professional certification prep',
        'Speed targets up to 225 WPM',
        'Custom practice materials',
        'One-on-one virtual coaching',
        'Instructor dashboard',
        'Bulk student management',
        'White-label licensing',
        'Priority phone support'
      ],
      yearlyDiscount: {
        price: 499.99,
        savings: 99.89,
        period: 'year'
      }
    }
  ]

  // One-time Purchase Options
  const oneTimePurchases = [
    {
      id: 'complete_course',
      name: 'Complete Course Lifetime',
      price: 299.99,
      description: 'One-time payment for lifetime access',
      features: [
        'Lifetime access to all modules',
        'All future updates included',
        'No recurring payments',
        'Full premium features',
        'Priority support'
      ]
    },
    {
      id: 'certification_prep',
      name: 'Certification Prep Package',
      price: 149.99,
      description: 'Specialized preparation for stenography certification',
      features: [
        'Court reporting preparation',
        'Mock certification exams',
        'Speed development program',
        'Professional guidance',
        '6 months access'
      ]
    }
  ]

  // Institutional Pricing
  const institutionalPlans = [
    {
      id: 'school_basic',
      name: 'Educational Institution (Basic)',
      pricePerStudent: 9.99,
      minimumStudents: 10,
      description: 'For schools and training centers',
      features: [
        'All premium features',
        'Student management dashboard',
        'Progress reporting',
        'Bulk enrollment',
        'Educational pricing'
      ]
    },
    {
      id: 'school_premium',
      name: 'Educational Institution (Premium)',
      pricePerStudent: 6.99,
      minimumStudents: 50,
      description: 'Volume pricing for larger institutions',
      features: [
        'Everything in Basic',
        'Custom branding',
        'API access',
        'Advanced analytics',
        'Dedicated support'
      ]
    }
  ]

  // PayPal Payment Handler
  const handlePayPalPayment = async (plan, isYearly = false) => {
    setPaymentInProgress(true)
    
    try {
      // Calculate final price
      const finalPrice = isYearly && plan.yearlyDiscount 
        ? plan.yearlyDiscount.price 
        : plan.price

      // Create PayPal payment
      const paypalPayment = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },
        redirect_urls: {
          return_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-cancelled`
        },
        transactions: [{
          amount: {
            total: finalPrice.toString(),
            currency: PAYPAL_CONFIG.currency
          },
          description: `Shorthand Tutor - ${plan.name} ${isYearly ? 'Yearly' : 'Monthly'} Subscription`,
          item_list: {
            items: [{
              name: plan.name,
              sku: plan.id,
              price: finalPrice.toString(),
              currency: PAYPAL_CONFIG.currency,
              quantity: 1
            }]
          },
          payee: {
            email: PAYPAL_CONFIG.merchantId
          }
        }]
      }

      // For demo purposes - in production, this would go to your backend
      console.log('PayPal Payment Request:', paypalPayment)
      
      // Simulate PayPal redirect
      toast.success('Redirecting to PayPal for secure payment...')
      
      // In production, redirect to PayPal or use PayPal JS SDK
      window.open(
        `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_CONFIG.merchantId}&item_name=${encodeURIComponent(plan.name)}&amount=${finalPrice}&currency_code=${PAYPAL_CONFIG.currency}`,
        '_blank'
      )

    } catch (error) {
      console.error('PayPal payment error:', error)
      toast.error('Payment failed. Please try again.')
    } finally {
      setPaymentInProgress(false)
      setShowPaymentDialog(false)
    }
  }

  // Subscription Management
  const handleSubscribe = (plan, isYearly = false) => {
    setSelectedPlan({ ...plan, isYearly })
    setShowPaymentDialog(true)
  }

  // Affiliate Code Application
  const applyAffiliateCode = (plan) => {
    if (affiliateCode.trim()) {
      // Apply 10% discount for valid affiliate codes
      const discount = plan.price * 0.1
      return {
        ...plan,
        price: plan.price - discount,
        affiliateDiscount: discount
      }
    }
    return plan
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Choose Your Shorthand Learning Plan
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
        All payments go directly to your secure PayPal account • No hidden fees • Cancel anytime
      </Typography>

      {/* Revenue Information Banner */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          💰 Revenue Streams for Mr T. Maenge
        </Typography>
        <Typography variant="body2">
          • Monthly/Yearly Subscriptions: $19.99-$49.99/month per user<br/>
          • One-time Purchases: $149.99-$299.99 per user<br/>
          • Institutional Licensing: $6.99-$9.99 per student<br/>
          • Affiliate Commissions: 25% of referred sales<br/>
          • All payments processed directly to your PayPal account
        </Typography>
      </Alert>

      {/* Subscription Plans */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Subscription Plans
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {subscriptionPlans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Card 
              sx={{ 
                height: '100%', 
                position: 'relative',
                border: plan.popular ? '2px solid' : '1px solid',
                borderColor: plan.popular ? 'primary.main' : 'divider'
              }}
            >
              {plan.popular && (
                <Chip 
                  label="Most Popular" 
                  color="primary" 
                  sx={{ 
                    position: 'absolute', 
                    top: -10, 
                    left: '50%', 
                    transform: 'translateX(-50%)' 
                  }} 
                />
              )}
              
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom align="center">
                  {plan.name}
                </Typography>
                
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography variant="h3" component="span" color="primary">
                    ${plan.price}
                  </Typography>
                  <Typography variant="h6" component="span" color="text.secondary">
                    /{plan.period}
                  </Typography>
                </Box>

                {plan.yearlyDiscount && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Yearly: ${plan.yearlyDiscount.price}/year 
                    (Save ${plan.yearlyDiscount.savings}!)
                  </Alert>
                )}

                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                  {plan.description}
                </Typography>

                <List dense>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature}
                        primaryTypographyProps={{ fontSize: '0.875rem' }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 3 }}>
                  {plan.id === 'free' ? (
                    <Button variant="outlined" fullWidth disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={() => handleSubscribe(plan, false)}
                        sx={{ mb: 1 }}
                      >
                        Start Monthly Plan
                      </Button>
                      {plan.yearlyDiscount && (
                        <Button 
                          variant="outlined" 
                          fullWidth 
                          onClick={() => handleSubscribe(plan, true)}
                        >
                          Save with Yearly
                        </Button>
                      )}
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* One-time Purchases */}
      <Typography variant="h4" gutterBottom>
        One-Time Purchases
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {oneTimePurchases.map((purchase) => (
          <Grid item xs={12} md={6} key={purchase.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {purchase.name}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  ${purchase.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {purchase.description}
                </Typography>
                
                <List dense>
                  {purchase.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>

                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => handlePayPalPayment(purchase)}
                  sx={{ mt: 2 }}
                >
                  Purchase Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Institutional Pricing */}
      <Typography variant="h4" gutterBottom>
        Institutional Licensing
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {institutionalPlans.map((plan) => (
          <Grid item xs={12} md={6} key={plan.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  ${plan.pricePerStudent}/student
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Minimum {plan.minimumStudents} students • {plan.description}
                </Typography>
                
                <List dense>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>

                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => window.location.href = 'mailto:tmaenge@shorthandtutor.com?subject=Institutional Licensing Inquiry'}
                  sx={{ mt: 2 }}
                >
                  Contact for Quote
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onClose={() => setShowPaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Complete Your Purchase
        </DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedPlan.name} {selectedPlan.isYearly ? 'Yearly' : 'Monthly'}
                </Typography>
                <Typography variant="h4" color="primary">
                  ${selectedPlan.isYearly && selectedPlan.yearlyDiscount 
                    ? selectedPlan.yearlyDiscount.price 
                    : selectedPlan.price}
                </Typography>
                {selectedPlan.isYearly && selectedPlan.yearlyDiscount && (
                  <Typography variant="body2" color="success.main">
                    You save ${selectedPlan.yearlyDiscount.savings} with yearly billing!
                  </Typography>
                )}
              </Alert>

              <TextField
                fullWidth
                label="Affiliate/Referral Code (Optional)"
                value={affiliateCode}
                onChange={(e) => setAffiliateCode(e.target.value)}
                placeholder="Enter code for 10% discount"
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label="Payment Method"
                >
                  <MenuItem value="paypal">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Payment sx={{ mr: 1 }} />
                      PayPal (Recommended)
                    </Box>
                  </MenuItem>
                  <MenuItem value="credit">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CreditCard sx={{ mr: 1 }} />
                      Credit/Debit Card (via PayPal)
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              {paymentInProgress && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Processing your payment...
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={() => selectedPlan && handlePayPalPayment(applyAffiliateCode(selectedPlan), selectedPlan.isYearly)}
            disabled={paymentInProgress}
            startIcon={<Security />}
          >
            Pay Securely with PayPal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Revenue Projections */}
      <Card sx={{ mt: 4, bgcolor: 'success.light' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            💰 Revenue Projections for Mr T. Maenge
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="success.dark">
                Conservative (100 users)
              </Typography>
              <Typography variant="body2">
                • 70 Free users: $0<br/>
                • 25 Premium users: $499.75/month<br/>
                • 5 Professional users: $249.95/month<br/>
                <strong>Total: $749.70/month</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="success.dark">
                Moderate (500 users)
              </Typography>
              <Typography variant="body2">
                • 300 Free users: $0<br/>
                • 150 Premium users: $2,998.50/month<br/>
                • 50 Professional users: $2,499.50/month<br/>
                <strong>Total: $5,498/month</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="success.dark">
                Optimistic (2000 users)
              </Typography>
              <Typography variant="body2">
                • 1000 Free users: $0<br/>
                • 800 Premium users: $15,992/month<br/>
                • 200 Professional users: $9,998/month<br/>
                <strong>Total: $25,990/month</strong>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PayPalPaymentSystem