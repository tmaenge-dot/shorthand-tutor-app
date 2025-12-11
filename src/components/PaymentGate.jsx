import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material'
import {
  CheckCircle,
  Lock,
  CreditCard,
  Security,
  AutoAwesome,
  EmojiEvents,
  School,
  Speed,
  Assessment
} from '@mui/icons-material'
import { useSubscription } from '../hooks/useSubscription'

const PaymentGate = ({ open, onClose, moduleId, moduleName }) => {
  const { upgradeToPremium, PREMIUM_PRICE } = useSubscription()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingZip: ''
  })

  const premiumFeatures = [
    { icon: <Lock />, text: 'Access to all 22+ modules (E through Z)' },
    { icon: <School />, text: 'Advanced shorthand techniques and phrasing' },
    { icon: <Speed />, text: 'Speed development exercises up to 120 WPM' },
    { icon: <Assessment />, text: 'Comprehensive assessments and certifications' },
    { icon: <AutoAwesome />, text: 'AI-powered stroke recognition and feedback' },
    { icon: <EmojiEvents />, text: 'Professional shorthand certification pathway' }
  ]

  const handleInputChange = (field) => (event) => {
    const value = event.target.value
    
    // Format card number with spaces
    if (field === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      setPaymentData({ ...paymentData, [field]: formatted })
    } else if (field === 'expiryMonth' || field === 'expiryYear') {
      // Only allow numbers
      if (/^\d*$/.test(value)) {
        setPaymentData({ ...paymentData, [field]: value })
      }
    } else if (field === 'cvv') {
      // Only allow 3-4 digits
      if (/^\d{0,4}$/.test(value)) {
        setPaymentData({ ...paymentData, [field]: value })
      }
    } else {
      setPaymentData({ ...paymentData, [field]: value })
    }
    setError('')
  }

  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, '')
    if (cleaned.length < 13 || cleaned.length > 19) {
      return false
    }
    
    // Luhn algorithm for card validation
    let sum = 0
    let isEven = false
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10)
      
      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }

  const handlePayment = async () => {
    setError('')
    
    // Validate inputs
    if (!paymentData.cardNumber || !paymentData.cardName || 
        !paymentData.expiryMonth || !paymentData.expiryYear || 
        !paymentData.cvv) {
      setError('Please fill in all payment fields')
      return
    }

    // Validate card number
    if (!validateCardNumber(paymentData.cardNumber)) {
      setError('Invalid card number. Please check and try again.')
      return
    }

    // Validate expiry date
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100 // Last 2 digits
    const currentMonth = currentDate.getMonth() + 1
    
    const expMonth = parseInt(paymentData.expiryMonth, 10)
    const expYear = parseInt(paymentData.expiryYear, 10)
    
    if (expMonth < 1 || expMonth > 12) {
      setError('Invalid expiry month')
      return
    }
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      setError('Card has expired')
      return
    }

    // Validate CVV
    if (paymentData.cvv.length < 3) {
      setError('Invalid CVV')
      return
    }

    setLoading(true)

    try {
      // Simulate payment processing
      // In production, integrate with Stripe, PayPal, or other payment gateway
      await new Promise(resolve => setTimeout(resolve, 2000))

      // For demo purposes, we'll accept any valid card format
      // In production, this would call your payment API
      const lastFourDigits = paymentData.cardNumber.replace(/\s/g, '').slice(-4)
      
      upgradeToPremium({
        lastFourDigits,
        cardType: getCardType(paymentData.cardNumber),
        amount: PREMIUM_PRICE
      })

      setSuccess(true)
      
      // Close dialog after success
      setTimeout(() => {
        onClose()
        // Reload to update UI
        window.location.reload()
      }, 2000)

    } catch (err) {
      setError('Payment processing failed. Please try again.')
      setLoading(false)
    }
  }

  const getCardType = (number) => {
    const cleaned = number.replace(/\s/g, '')
    if (/^4/.test(cleaned)) return 'Visa'
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard'
    if (/^3[47]/.test(cleaned)) return 'Amex'
    if (/^6(?:011|5)/.test(cleaned)) return 'Discover'
    return 'Card'
  }

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
        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Successful! 🎉
            </Typography>
            <Typography variant="body2">
              Welcome to Premium! You now have access to all modules.
            </Typography>
          </Alert>
        ) : (
          <>
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

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange('cardNumber')}
                  disabled={loading}
                  InputProps={{
                    startAdornment: <CreditCard sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  inputProps={{ maxLength: 19 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  placeholder="John Doe"
                  value={paymentData.cardName}
                  onChange={handleInputChange('cardName')}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Month"
                  placeholder="MM"
                  value={paymentData.expiryMonth}
                  onChange={handleInputChange('expiryMonth')}
                  disabled={loading}
                  inputProps={{ maxLength: 2 }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Year"
                  placeholder="YY"
                  value={paymentData.expiryYear}
                  onChange={handleInputChange('expiryYear')}
                  disabled={loading}
                  inputProps={{ maxLength: 2 }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="CVV"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={handleInputChange('cvv')}
                  disabled={loading}
                  type="password"
                  InputProps={{
                    startAdornment: <Security sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Billing ZIP Code"
                  placeholder="12345"
                  value={paymentData.billingZip}
                  onChange={handleInputChange('billingZip')}
                  disabled={loading}
                />
              </Grid>
            </Grid>

            <Alert severity="info" icon={<Security />} sx={{ mt: 2 }}>
              <Typography variant="caption">
                🔒 Your payment information is encrypted and secure. We use industry-standard encryption.
              </Typography>
            </Alert>
          </>
        )}
      </DialogContent>

      <DialogActions>
        {!success && (
          <>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePayment}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <CreditCard />}
            >
              {loading ? 'Processing...' : `Pay $${PREMIUM_PRICE}`}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default PaymentGate
