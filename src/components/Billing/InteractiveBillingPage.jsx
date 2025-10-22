import React, { useState, useEffect } from 'react'
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
  StepLabel,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  IconButton,
  Tooltip,
  Badge,
  Switch,
  Collapse,
  Fade,
  Zoom,
  Slide,
  Grow
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
  Business,
  TrendingUp,
  Speed,
  School,
  Assessment,
  EmojiEvents,
  Psychology,
  Timeline,
  LocalOffer,
  Celebration,
  MonetizationOn,
  Savings,
  CompareArrows,
  Calculate,
  AccessTime,
  ExpandMore,
  Visibility,
  VisibilityOff,
  Help,
  Info,
  Warning,
  Discount,
  Timer,
  FlashOn,
  Analytics,
  Diamond,
  WorkspacePremium,
  Phone,
  Google as GoogleIcon
} from '@mui/icons-material'
import { loadStripe } from '@stripe/stripe-js'
import { useAuth } from '../../hooks/useAuthMock'
import { useSubscription, SUBSCRIPTION_PLANS } from '../../hooks/useSubscription'
import toast from 'react-hot-toast'

// NOTE: set VITE_STRIPE_PUBLISHABLE_KEY in your environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

const InteractiveBillingPage = () => {
  const { currentUser, userType, upgradeFromGuest } = useAuth()
  const { currentPlan, upgradeSubscription } = useSubscription()
  
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [checkoutStep, setCheckoutStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [billingCycle, setBillingCycle] = useState('yearly')
  const [showComparison, setShowComparison] = useState(false)
  const [promocode, setPromocode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(null)
  const [savingsCalculator, setSavingsCalculator] = useState({
    studyHours: 10,
    studyWeeks: 12
  })
  const [animatedStats, setAnimatedStats] = useState({
    savings: 0,
    features: 0,
    roi: 0
  })
  
  const [guestUpgrade, setGuestUpgrade] = useState({
    email: '',
    password: '',
    displayName: ''
  })

  // Enhanced plan data with more detailed features
  const enhancedPlans = {
    free: {
      ...SUBSCRIPTION_PLANS.free,
      color: 'default', // Use 'default' instead of 'grey' for Chip compatibility
      themeColor: 'grey', // Keep original color for other styling
      icon: <School />,
      highlights: ['Perfect for beginners', 'Try before you buy'],
      limitations: ['Limited modules', 'Daily exercise limits', 'No certificates'],
      features: {
        modules: 3,
        exercises: 5,
        dictation: 10,
        certificates: false,
        offline: false,
        support: 'Community',
        analytics: 'Basic',
        ai: false
      }
    },
    premium: {
      ...SUBSCRIPTION_PLANS.premium,
      color: 'primary',
      themeColor: 'primary',
      icon: <Star />,
      badge: 'Most Popular',
      highlights: ['Complete learning experience', 'Best value for money'],
      features: {
        modules: 21,
        exercises: '∞',
        dictation: '∞',
        certificates: true,
        offline: true,
        support: 'Priority',
        analytics: 'Advanced',
        ai: true
      }
    },
    institutional: {
      ...SUBSCRIPTION_PLANS.institutional,
      color: 'secondary',
      themeColor: 'secondary',
      icon: <Business />,
      badge: 'Professional',
      highlights: ['For schools & businesses', 'Bulk management tools'],
      features: {
        modules: 21,
        exercises: '∞',
        dictation: '∞',
        certificates: true,
        offline: true,
        support: 'Priority',
        analytics: 'Enterprise',
        ai: true,
        bulk: true,
        reporting: true
      }
    }
  }

  const promocodes = {
    'SAVE20': { discount: 20, type: 'percentage', description: '20% off first year' },
    'STUDENT50': { discount: 50, type: 'percentage', description: '50% student discount' },
    'WELCOME10': { discount: 10, type: 'fixed', description: '$10 off any plan' }
  }

  // Animation effects
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedStats(prev => ({
        savings: Math.min(prev.savings + 1, calculateSavings()),
        features: Math.min(prev.features + 1, getFeatureCount()),
        roi: Math.min(prev.roi + 1, calculateROI())
      }))
    }, 50)

    return () => clearInterval(timer)
  }, [savingsCalculator, billingCycle])

  const calculateSavings = () => {
    if (billingCycle === 'yearly') {
      return Math.round((enhancedPlans.premium.price * 12 - enhancedPlans.premium.yearlyPrice) * 100) / 100
    }
    return 0
  }

  const getFeatureCount = () => {
    return Object.keys(enhancedPlans.premium.features).length
  }

  const calculateROI = () => {
    const timeValue = savingsCalculator.studyHours * savingsCalculator.studyWeeks * 25 // $25/hour value
    const planCost = billingCycle === 'yearly' ? enhancedPlans.premium.yearlyPrice : enhancedPlans.premium.price * 12
    return Math.round((timeValue / planCost) * 100)
  }

  const applyPromoCode = () => {
    if (promocodes[promocode.toUpperCase()]) {
      setAppliedDiscount(promocodes[promocode.toUpperCase()])
      toast.success('Promo code applied successfully!')
    } else {
      toast.error('Invalid promo code')
    }
  }

  const calculateDiscountedPrice = (price) => {
    if (!appliedDiscount) return price
    
    if (appliedDiscount.type === 'percentage') {
      return price * (1 - appliedDiscount.discount / 100)
    } else {
      return Math.max(0, price - appliedDiscount.discount)
    }
  }

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setShowCheckout(true)
    setCheckoutStep(0) // Always start at step 0 of checkout
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
        paymentMethod,
        billingCycle,
        discount: appliedDiscount
      })
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful subscription
      await upgradeSubscription(selectedPlan.id)
      toast.success(
        <Box>
          <Typography variant="body1" fontWeight="bold">
            🎉 Welcome to {selectedPlan.name}!
          </Typography>
          <Typography variant="body2">
            Your premium features are now active
          </Typography>
        </Box>
      )
      setShowCheckout(false)
      setSelectedPlan(null)
      setCheckoutStep(0)
      setLoading(false)
      return
    }
    
    // Production code would handle real Stripe integration
    setLoading(false)
  }

  const checkoutSteps = currentUser?.isGuest === true 
    ? ['Create Account', 'Payment Method', 'Complete']
    : ['Payment Method', 'Complete']

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      {/* Animated Header */}
      <Fade in timeout={1000}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom fontWeight="bold" sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}>
            Master Shorthand Faster
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            Choose the perfect plan for your learning journey
          </Typography>
          
          {/* Live Stats Bar */}
          <Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 3, mb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold">
                    ${animatedStats.savings}
                  </Typography>
                  <Typography variant="body2">Yearly Savings</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold">
                    {animatedStats.features}+
                  </Typography>
                  <Typography variant="body2">Premium Features</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold">
                    {animatedStats.roi}%
                  </Typography>
                  <Typography variant="body2">Learning ROI</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          {currentUser?.isGuest && (
            <Slide direction="down" in timeout={1500}>
              <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
                <Typography variant="body1" fontWeight="bold">
                  🚀 You're exploring as a guest
                </Typography>
                <Typography variant="body2">
                  Create an account to unlock all features and save your progress
                </Typography>
              </Alert>
            </Slide>
          )}
        </Box>
      </Fade>

      {/* Interactive Billing Cycle Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Paper sx={{ p: 1, borderRadius: 3 }}>
          <ToggleButtonGroup
            value={billingCycle}
            exclusive
            onChange={(e, newValue) => newValue && setBillingCycle(newValue)}
            sx={{ borderRadius: 2 }}
          >
            <ToggleButton value="monthly" sx={{ px: 3, py: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" fontWeight="bold">Monthly</Typography>
                <Typography variant="caption">Pay monthly</Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value="yearly" sx={{ px: 3, py: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" fontWeight="bold">Yearly</Typography>
                <Typography variant="caption">Save 20%</Typography>
                <Chip label="Best Value" size="small" color="success" sx={{ ml: 1 }} />
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Box>

      {/* Enhanced Plans Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {Object.entries(enhancedPlans).map(([key, plan], index) => (
          <Grid item xs={12} md={4} key={key}>
            <Zoom in timeout={1000 + index * 200}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: plan.badge ? '3px solid' : '1px solid',
                  borderColor: plan.badge ? `${plan.themeColor}.main` : 'divider',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-8px)', 
                    boxShadow: 4,
                    borderColor: `${plan.themeColor}.main`
                  }
                }}
              >
                {/* Plan Badge */}
                {plan.badge && (
                  <Box sx={{ 
                    position: 'absolute', 
                    top: -16, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    zIndex: 1
                  }}>
                    <Chip 
                      label={plan.badge}
                      color={plan.color === 'default' ? 'primary' : plan.color}
                      icon={<Star />}
                      sx={{ px: 2, fontWeight: 'bold' }}
                    />
                  </Box>
                )}
                
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Plan Header */}
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar sx={{ 
                      width: 64, 
                      height: 64, 
                      mx: 'auto', 
                      mb: 2,
                      bgcolor: `${plan.themeColor}.main`
                    }}>
                      {plan.icon}
                    </Avatar>
                    
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      {plan.name}
                    </Typography>
                    
                    {/* Dynamic Pricing */}
                    <Box sx={{ mb: 2 }}>
                      {billingCycle === 'yearly' && plan.yearlyPrice ? (
                        <Box>
                          <Typography variant="h3" fontWeight="bold" color={`${plan.themeColor}.main`}>
                            ${calculateDiscountedPrice(plan.yearlyPrice)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            per year
                          </Typography>
                          <Typography variant="caption" sx={{ textDecoration: 'line-through' }}>
                            ${plan.price * 12} normally
                          </Typography>
                        </Box>
                      ) : (
                        <Box>
                          <Typography variant="h3" fontWeight="bold" color={`${plan.themeColor}.main`}>
                            ${calculateDiscountedPrice(plan.price)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            per month
                          </Typography>
                        </Box>
                      )}
                      
                      {appliedDiscount && (
                        <Chip 
                          label={`${appliedDiscount.description}`}
                          color="success" 
                          size="small" 
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {plan.description}
                    </Typography>

                    {/* Plan Highlights */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
                      {plan.highlights?.map((highlight, idx) => (
                        <Chip 
                          key={idx}
                          label={highlight} 
                          size="small" 
                          variant="outlined"
                          color={plan.color === 'default' ? 'primary' : plan.color}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Enhanced Features List */}
                  <Box sx={{ mb: 3, flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      What's Included:
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <School fontSize="small" color={plan.color === 'default' ? 'action' : plan.color} />
                          <Typography variant="body2">
                            {plan.features.modules} Modules
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Speed fontSize="small" color={plan.color === 'default' ? 'action' : plan.color} />
                          <Typography variant="body2">
                            {plan.features.exercises} Exercises
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Assessment fontSize="small" color={plan.color === 'default' ? 'action' : plan.color} />
                          <Typography variant="body2">
                            {plan.features.dictation} min/day
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Analytics fontSize="small" color={plan.color === 'default' ? 'action' : plan.color} />
                          <Typography variant="body2">
                            {plan.features.analytics}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      {plan.features.certificates && (
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <EmojiEvents fontSize="small" color="success" />
                            <Typography variant="body2">Certificates</Typography>
                          </Box>
                        </Grid>
                      )}
                      
                      {plan.features.ai && (
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Psychology fontSize="small" color="info" />
                            <Typography variant="body2">AI Coaching</Typography>
                          </Box>
                        </Grid>
                      )}
                      
                      {plan.features.offline && (
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <FlashOn fontSize="small" color="warning" />
                            <Typography variant="body2">Offline Mode</Typography>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Box>

                  {/* Action Button */}
                  <Button
                    variant={plan.badge ? 'contained' : 'outlined'}
                    size="large"
                    fullWidth
                    onClick={() => plan.id === 'free' ? null : handleSelectPlan(plan)}
                    disabled={currentPlan?.id === plan.id || (plan.id === 'free' && currentUser?.isGuest)}
                    color={plan.color === 'default' ? 'primary' : plan.color}
                    sx={{ 
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    {plan.id === 'free' 
                      ? (currentUser?.isGuest ? 'Current Plan' : 'Free Forever')
                      : currentPlan?.id === plan.id 
                      ? 'Current Plan' 
                      : 'Get Started'
                    }
                  </Button>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Interactive Savings Calculator */}
      <Grow in timeout={2000}>
        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
            💰 Calculate Your Learning Investment
          </Typography>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" gutterBottom>
                  Study Hours per Week: {savingsCalculator.studyHours}
                </Typography>
                <Slider
                  value={savingsCalculator.studyHours}
                  onChange={(e, val) => setSavingsCalculator(prev => ({ ...prev, studyHours: val }))}
                  min={1}
                  max={40}
                  marks={[
                    { value: 5, label: '5h' },
                    { value: 10, label: '10h' },
                    { value: 20, label: '20h' },
                    { value: 40, label: '40h' }
                  ]}
                  sx={{ color: 'white' }}
                />
              </Box>
              
              <Box>
                <Typography variant="body1" gutterBottom>
                  Study Duration: {savingsCalculator.studyWeeks} weeks
                </Typography>
                <Slider
                  value={savingsCalculator.studyWeeks}
                  onChange={(e, val) => setSavingsCalculator(prev => ({ ...prev, studyWeeks: val }))}
                  min={4}
                  max={52}
                  marks={[
                    { value: 12, label: '3 months' },
                    { value: 24, label: '6 months' },
                    { value: 52, label: '1 year' }
                  ]}
                  sx={{ color: 'white' }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {calculateROI()}% ROI
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Return on your learning investment
                </Typography>
                
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Time Value: ${(savingsCalculator.studyHours * savingsCalculator.studyWeeks * 25).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Based on $25/hour professional rate
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grow>

      {/* Feature Comparison */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          onClick={() => setShowComparison(!showComparison)}
          startIcon={<CompareArrows />}
          fullWidth
          sx={{ py: 1.5, mb: 2 }}
        >
          {showComparison ? 'Hide' : 'Show'} Detailed Feature Comparison
        </Button>
        
        <Collapse in={showComparison}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Feature Comparison
            </Typography>
            {/* Feature comparison table would go here */}
            <Alert severity="info">
              Detailed feature comparison table with all plan differences
            </Alert>
          </Paper>
        </Collapse>
      </Box>

      {/* Enhanced Checkout Dialog */}
      <Dialog 
        open={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        maxWidth="lg" 
        fullWidth
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Subscribe to {selectedPlan?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join thousands of successful shorthand learners
              </Typography>
            </Box>
            <IconButton onClick={() => setShowCheckout(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4 }}>
          <Stepper activeStep={checkoutStep} sx={{ mb: 4 }}>
            {checkoutSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {loading && <LinearProgress sx={{ mb: 3 }} />}

          {/* Enhanced Checkout Steps */}
          {checkoutStep === 0 && currentUser?.isGuest === true && (
            <Fade in>
              <Box>
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body1" fontWeight="bold">
                    🚀 Create your account to get started
                  </Typography>
                  <Typography variant="body2">
                    Join our community and start your shorthand mastery journey
                  </Typography>
                </Alert>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <TextField
                        label="Full Name"
                        value={guestUpgrade.displayName}
                        onChange={(e) => setGuestUpgrade({ ...guestUpgrade, displayName: e.target.value })}
                        fullWidth
                        variant="outlined"
                      />
                      <TextField
                        label="Email Address"
                        type="email"
                        value={guestUpgrade.email}
                        onChange={(e) => setGuestUpgrade({ ...guestUpgrade, email: e.target.value })}
                        fullWidth
                        variant="outlined"
                      />
                      <TextField
                        label="Password"
                        type="password"
                        value={guestUpgrade.password}
                        onChange={(e) => setGuestUpgrade({ ...guestUpgrade, password: e.target.value })}
                        fullWidth
                        variant="outlined"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                      <Typography variant="h6" gutterBottom>
                        What you'll get:
                      </Typography>
                      <List>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: 'white' }} />
                          </ListItemIcon>
                          <ListItemText primary="Personal progress tracking" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: 'white' }} />
                          </ListItemIcon>
                          <ListItemText primary="Achievement system" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: 'white' }} />
                          </ListItemIcon>
                          <ListItemText primary="Personalized recommendations" />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}

          {/* Enhanced Payment Step */}
          {checkoutStep === (currentUser?.isGuest === true ? 1 : 0) && (
            <Fade in>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    💳 Choose Payment Method
                  </Typography>
                  
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    sx={{ mb: 3 }}
                  >
                    <Paper sx={{ 
                      p: 2, 
                      mb: 1, 
                      border: paymentMethod === 'card' ? '2px solid' : '1px solid', 
                      borderColor: paymentMethod === 'card' ? 'primary.main' : 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': { boxShadow: 2 }
                    }}>
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <CreditCard color="primary" />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="body1" fontWeight="bold">Credit/Debit Card</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Visa, MasterCard, American Express • Instant activation
                              </Typography>
                            </Box>
                            <Chip label="Most Popular" size="small" color="primary" />
                          </Box>
                        }
                        sx={{ width: '100%', margin: 0 }}
                      />
                    </Paper>
                    
                    <Paper sx={{ 
                      p: 2, 
                      mb: 1, 
                      border: paymentMethod === 'paypal' ? '2px solid' : '1px solid', 
                      borderColor: paymentMethod === 'paypal' ? 'primary.main' : 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': { boxShadow: 2 }
                    }}>
                      <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <PaymentOutlined color="primary" />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="body1" fontWeight="bold">PayPal</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Secure PayPal checkout • No card details needed
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Typography variant="caption" sx={{ 
                                bgcolor: 'success.light', 
                                color: 'success.dark',
                                px: 1, 
                                py: 0.5, 
                                borderRadius: 1 
                              }}>
                                Secure
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ width: '100%', margin: 0 }}
                      />
                    </Paper>
                    
                    <Paper sx={{ 
                      p: 2, 
                      mb: 1, 
                      border: paymentMethod === 'apple' ? '2px solid' : '1px solid', 
                      borderColor: paymentMethod === 'apple' ? 'primary.main' : 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': { boxShadow: 2 }
                    }}>
                      <FormControlLabel
                        value="apple"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <Phone color="primary" />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="body1" fontWeight="bold">Apple Pay</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Quick and secure with Touch ID or Face ID
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Typography variant="caption" sx={{ 
                                bgcolor: 'info.light', 
                                color: 'info.dark',
                                px: 1, 
                                py: 0.5, 
                                borderRadius: 1 
                              }}>
                                Fast
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ width: '100%', margin: 0 }}
                      />
                    </Paper>
                    
                    <Paper sx={{ 
                      p: 2, 
                      mb: 1, 
                      border: paymentMethod === 'google' ? '2px solid' : '1px solid', 
                      borderColor: paymentMethod === 'google' ? 'primary.main' : 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': { boxShadow: 2 }
                    }}>
                      <FormControlLabel
                        value="google"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <GoogleIcon color="primary" />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="body1" fontWeight="bold">Google Pay</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Pay with your Google account • One-click checkout
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Typography variant="caption" sx={{ 
                                bgcolor: 'warning.light', 
                                color: 'warning.dark',
                                px: 1, 
                                py: 0.5, 
                                borderRadius: 1 
                              }}>
                                Easy
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ width: '100%', margin: 0 }}
                      />
                    </Paper>
                  </RadioGroup>

                  {/* Credit Card Form */}
                  {paymentMethod === 'card' && (
                    <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CreditCard color="primary" />
                        Card Details
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              startAdornment: <CreditCard sx={{ mr: 1, color: 'action.active' }} />
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Expiry Date"
                            placeholder="MM/YY"
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="CVC"
                            placeholder="123"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <Tooltip title="3-digit security code on the back of your card">
                                  <Help sx={{ color: 'action.active', cursor: 'help' }} />
                                </Tooltip>
                              )
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Cardholder Name"
                            placeholder="John Doe"
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                        <Lock sx={{ color: 'success.main', fontSize: 16 }} />
                        <Typography variant="caption" color="success.main">
                          Your payment information is encrypted and secure
                        </Typography>
                      </Box>
                    </Paper>
                  )}

                  {/* PayPal Info */}
                  {paymentMethod === 'paypal' && (
                    <Paper sx={{ p: 3, mb: 3, bgcolor: 'blue.50' }}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PaymentOutlined color="primary" />
                        You'll be redirected to PayPal to complete your payment securely
                      </Typography>
                    </Paper>
                  )}

                  {/* Apple Pay Info */}
                  {paymentMethod === 'apple' && (
                    <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone color="primary" />
                        Use Touch ID or Face ID to pay securely with Apple Pay
                      </Typography>
                    </Paper>
                  )}

                  {/* Google Pay Info */}
                  {paymentMethod === 'google' && (
                    <Paper sx={{ p: 3, mb: 3, bgcolor: 'orange.50' }}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <GoogleIcon color="primary" />
                        Pay quickly and securely with your Google account
                      </Typography>
                    </Paper>
                  )}

                  {/* Promo Code Section */}
                  <Accordion sx={{ mb: 3 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalOffer color="success" />
                        <Typography>Have a promo code?</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <TextField
                          label="Promo Code"
                          value={promocode}
                          onChange={(e) => setPromocode(e.target.value.toUpperCase())}
                          size="small"
                          sx={{ flexGrow: 1 }}
                        />
                        <Button 
                          variant="outlined" 
                          onClick={applyPromoCode}
                          disabled={!promocode}
                        >
                          Apply
                        </Button>
                      </Box>
                      
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                          Available codes: SAVE20, STUDENT50, WELCOME10
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  
                  {/* Security & Trust Indicators */}
                  <Paper sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'success.light' }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Security color="success" />
                      Your Payment is Protected
                    </Typography>
                    
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                          <Typography variant="caption">256-bit SSL</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                          <Typography variant="caption">PCI Compliant</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                          <Typography variant="caption">No commitment</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                          <Typography variant="caption">Cancel anytime</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Enhanced Order Summary */}
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, bgcolor: 'grey.50', position: 'sticky', top: 20 }}>
                    <Typography variant="h6" gutterBottom>
                      📋 Order Summary
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>{selectedPlan?.name} Plan</Typography>
                        <Typography fontWeight="bold">
                          ${billingCycle === 'yearly' ? selectedPlan?.yearlyPrice : selectedPlan?.price}
                        </Typography>
                      </Box>
                      
                      {billingCycle === 'yearly' && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="success.main">
                            Yearly discount (20%)
                          </Typography>
                          <Typography variant="body2" color="success.main">
                            -${Math.round((selectedPlan?.price * 12 - selectedPlan?.yearlyPrice) * 100) / 100}
                          </Typography>
                        </Box>
                      )}
                      
                      {appliedDiscount && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="success.main">
                            Promo: {appliedDiscount.description}
                          </Typography>
                          <Typography variant="body2" color="success.main">
                            -{appliedDiscount.type === 'percentage' ? `${appliedDiscount.discount}%` : `$${appliedDiscount.discount}`}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6" color="primary.main">
                        ${calculateDiscountedPrice(
                          billingCycle === 'yearly' ? selectedPlan?.yearlyPrice : selectedPlan?.price
                        )} / {billingCycle.replace('ly', '')}
                      </Typography>
                    </Box>
                    
                    {billingCycle === 'yearly' && (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          🎉 You save ${calculateSavings()} per year!
                        </Typography>
                      </Alert>
                    )}
                    
                    <Typography variant="caption" color="text.secondary">
                      Secure payment powered by Stripe. Cancel anytime.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Fade>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 4, gap: 2 }}>
          <Button onClick={() => setShowCheckout(false)} disabled={loading} size="large">
            Cancel
          </Button>
          
          {checkoutStep === 0 && currentUser?.isGuest === true && (
            <Button 
              onClick={handleGuestUpgrade} 
              variant="contained"
              disabled={loading}
              size="large"
              sx={{ px: 4 }}
            >
              {loading ? 'Creating Account...' : 'Create Account & Continue'}
            </Button>
          )}
          
          {checkoutStep === (currentUser?.isGuest === true ? 1 : 0) && (
            <Button 
              onClick={handleSubscribe} 
              variant="contained"
              disabled={loading}
              startIcon={<Security />}
              size="large"
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              {loading ? 'Processing...' : `Complete Purchase - $${calculateDiscountedPrice(
                billingCycle === 'yearly' ? selectedPlan?.yearlyPrice : selectedPlan?.price
              )}`}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Security & Trust Section */}
      <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          🔒 Secure & Trusted Payment Processing
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Security color="success" />
              <Typography variant="body2">256-bit SSL Encryption</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CreditCard color="primary" />
              <Typography variant="body2">Stripe Secure Processing</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lock color="action" />
              <Typography variant="body2">PCI DSS Compliant</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Celebration color="warning" />
              <Typography variant="body2">30-Day Money Back</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default InteractiveBillingPage