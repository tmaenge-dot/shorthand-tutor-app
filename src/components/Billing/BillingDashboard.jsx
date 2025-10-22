import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Switch,
  FormControlLabel,
  Divider,
  Link,
  CircularProgress
} from '@mui/material'
import {
  Payment,
  Download,
  Cancel,
  Upgrade,
  History,
  Security,
  CreditCard,
  AccountBalance
} from '@mui/icons-material'

const BillingDashboard = ({ currentUser = 'demo_user' }) => {
  const [userSubscription, setUserSubscription] = useState({
    plan: 'Premium Monthly',
    status: 'Active',
    nextBilling: '2025-11-22',
    amount: 19.99,
    paymentMethod: 'PayPal (*****@gmail.com)',
    autoRenew: true,
    subscriptionId: 'SUB_12345'
  })

  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Payment history - in production, this would come from your backend
  const paymentHistory = [
    {
      id: 'PAY_001',
      date: '2025-10-22',
      amount: 19.99,
      status: 'Completed',
      plan: 'Premium Monthly',
      paypalId: 'PP_12345',
      invoice: 'INV_001'
    },
    {
      id: 'PAY_002',
      date: '2025-09-22',
      amount: 19.99,
      status: 'Completed',
      plan: 'Premium Monthly',
      paypalId: 'PP_12346',
      invoice: 'INV_002'
    },
    {
      id: 'PAY_003',
      date: '2025-08-22',
      amount: 19.99,
      status: 'Completed',
      plan: 'Premium Monthly',
      paypalId: 'PP_12347',
      invoice: 'INV_003'
    }
  ]

  const handleCancelSubscription = () => {
    setIsProcessing(true)
    
    // Simulate PayPal subscription cancellation
    setTimeout(() => {
      setUserSubscription(prev => ({
        ...prev,
        status: 'Cancelled',
        autoRenew: false
      }))
      setIsProcessing(false)
      setShowCancelDialog(false)
      alert('Subscription cancelled successfully. You will continue to have access until your next billing date.')
    }, 2000)
  }

  const handleUpgrade = (newPlan) => {
    setIsProcessing(true)
    
    // Simulate PayPal subscription upgrade
    setTimeout(() => {
      const planAmounts = {
        'Premium Yearly': 199.99,
        'Professional Monthly': 49.99,
        'Professional Yearly': 499.99
      }
      
      setUserSubscription(prev => ({
        ...prev,
        plan: newPlan,
        amount: planAmounts[newPlan] || prev.amount,
        nextBilling: newPlan.includes('Yearly') ? '2026-10-22' : '2025-11-22'
      }))
      setIsProcessing(false)
      setShowUpgradeDialog(false)
      alert(`Successfully upgraded to ${newPlan}`)
    }, 2000)
  }

  const toggleAutoRenew = () => {
    setIsProcessing(true)
    
    // Simulate PayPal subscription auto-renewal toggle
    setTimeout(() => {
      setUserSubscription(prev => ({
        ...prev,
        autoRenew: !prev.autoRenew
      }))
      setIsProcessing(false)
    }, 1000)
  }

  const downloadInvoice = (invoiceId) => {
    // In production, this would download a PDF invoice
    alert(`Downloading invoice ${invoiceId}...`)
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success'
      case 'cancelled': return 'error'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Billing & Subscription Management
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Manage your Shorthand Tutor subscription and payment settings
      </Typography>

      {/* Current Subscription Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Current Subscription
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary">
                  {userSubscription.plan}
                </Typography>
                <Chip 
                  label={userSubscription.status} 
                  color={getStatusColor(userSubscription.status)}
                  sx={{ mt: 1 }}
                />
              </Box>
              
              <Typography variant="body1" gutterBottom>
                <strong>Amount:</strong> ${userSubscription.amount}/month
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Next Billing:</strong> {userSubscription.nextBilling}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Payment Method:</strong> {userSubscription.paymentMethod}
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={userSubscription.autoRenew}
                    onChange={toggleAutoRenew}
                    disabled={isProcessing || userSubscription.status === 'Cancelled'}
                  />
                }
                label="Auto-renewal"
                sx={{ mt: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Upgrade />}
                  onClick={() => setShowUpgradeDialog(true)}
                  disabled={userSubscription.status === 'Cancelled'}
                >
                  Upgrade Plan
                </Button>
                
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={() => setShowCancelDialog(true)}
                  disabled={userSubscription.status === 'Cancelled' || isProcessing}
                >
                  Cancel Subscription
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<CreditCard />}
                  href="https://www.paypal.com/myaccount/autopay/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Manage PayPal Settings
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* PayPal Integration Notice */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          💡 PayPal Direct Billing
        </Typography>
        <Typography variant="body2">
          Your subscription is managed through PayPal's secure billing system. All payments are processed directly by PayPal, 
          ensuring maximum security and convenience. You can manage your payment methods, view transaction history, 
          and update billing information directly through your PayPal account.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="outlined" 
            size="small" 
            href="https://www.paypal.com/myaccount/summary"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<AccountBalance />}
          >
            View PayPal Account
          </Button>
        </Box>
      </Alert>

      {/* Payment History */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Payment History
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>PayPal Transaction</TableCell>
                  <TableCell align="center">Invoice</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.plan}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold">
                        ${payment.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={payment.status} 
                        color={getStatusColor(payment.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`https://www.paypal.com/activity/payment/${payment.paypalId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="caption"
                      >
                        {payment.paypalId}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        startIcon={<Download />}
                        onClick={() => downloadInvoice(payment.invoice)}
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Cancel Subscription Dialog */}
      <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
        <DialogTitle>Cancel Subscription</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to cancel your subscription? You will continue to have access 
            to premium features until your next billing date ({userSubscription.nextBilling}).
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            After cancellation, you will lose access to:
            <ul>
              <li>Advanced speed development exercises</li>
              <li>Personalized practice sessions</li>
              <li>Progress tracking and analytics</li>
              <li>Expert feedback and assessment</li>
            </ul>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)}>
            Keep Subscription
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleCancelSubscription}
            disabled={isProcessing}
            startIcon={isProcessing ? <CircularProgress size={20} /> : <Cancel />}
          >
            {isProcessing ? 'Cancelling...' : 'Cancel Subscription'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upgrade Plan Dialog */}
      <Dialog open={showUpgradeDialog} onClose={() => setShowUpgradeDialog(false)} maxWidth="md">
        <DialogTitle>Upgrade Your Plan</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Choose a new plan to upgrade your subscription:
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Premium Yearly</Typography>
                  <Typography variant="h4" color="primary">$199.99/year</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Save $40 compared to monthly billing
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={() => handleUpgrade('Premium Yearly')}
                    disabled={isProcessing}
                  >
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Professional Monthly</Typography>
                  <Typography variant="h4" color="primary">$49.99/month</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Advanced features + personalized coaching
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={() => handleUpgrade('Professional Monthly')}
                    disabled={isProcessing}
                  >
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ bgcolor: 'primary.light', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6">Professional Yearly</Typography>
                  <Typography variant="h4">$499.99/year</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Best value! Includes everything plus priority support
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={() => handleUpgrade('Professional Yearly')}
                    disabled={isProcessing}
                  >
                    Upgrade to Professional
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpgradeDialog(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Security Notice */}
      <Card sx={{ mt: 4, bgcolor: 'success.light' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Security sx={{ mr: 1, color: 'white' }} />
            <Typography variant="h6" sx={{ color: 'white' }}>
              Secure Payment Processing
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
            All transactions are processed securely through PayPal's industry-leading payment infrastructure. 
            Your payment information is never stored on our servers. PayPal protects your financial data 
            with bank-level security and fraud protection.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default BillingDashboard