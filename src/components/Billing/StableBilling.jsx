import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Divider
} from '@mui/material';
import {
  CreditCard,
  Download,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Star,
  Cancel,
  Upgrade,
  Add,
  Delete,
  Edit,
  Security
} from '@mui/icons-material';

// Stable data structures to prevent volatility
const STABLE_PLAN_STRUCTURE = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    popular: false,
    savings: null,
    features: [
      'Basic practice exercises (Modules A, B, C)',
      '5 speed exercises per day',
      '10 minutes dictation per day',
      'Basic progress tracking'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    period: 'month',
    popular: true,
    savings: 'Most Popular',
    features: [
      'All practice exercises (Modules A-V)',
      'Unlimited speed exercises',
      'Unlimited dictation practice',
      'Advanced progress tracking',
      'Certificates of completion',
      'Offline mode',
      'Priority support'
    ]
  },
  institutional: {
    id: 'institutional',
    name: 'Institutional',
    price: 29.99,
    period: 'month',
    popular: false,
    savings: 'Save $60/year',
    features: [
      'Everything in Premium',
      'Teacher dashboard',
      'Student management',
      'Custom branding',
      'Bulk certificates',
      'Advanced analytics',
      'Dedicated support'
    ]
  }
};

const STABLE_BILLING_HISTORY = [
  {
    id: 'inv_001',
    date: '2025-10-01',
    amount: 9.99,
    status: 'paid',
    plan: 'Premium Monthly',
    period: 'Oct 2025'
  },
  {
    id: 'inv_002', 
    date: '2025-09-01',
    amount: 9.99,
    status: 'paid',
    plan: 'Premium Monthly',
    period: 'Sep 2025'
  },
  {
    id: 'inv_003',
    date: '2025-08-01',
    amount: 9.99,
    status: 'paid',
    plan: 'Premium Monthly',
    period: 'Aug 2025'
  }
];

const STABLE_PAYMENT_METHODS = [];

// Error Boundary Component
class BillingErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Billing Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">Billing System Temporarily Unavailable</Typography>
            <Typography variant="body2">
              We're experiencing technical difficulties. Please try refreshing the page.
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => window.location.reload()} 
              sx={{ mt: 2 }}
            >
              Refresh Page
            </Button>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

const StableBilling = () => {
  // Defensive state management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [billingHistory, setBillingHistory] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openUpgradeDialog, setOpenUpgradeDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [openAddPaymentDialog, setOpenAddPaymentDialog] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });

  // Stable current user detection
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPlanId, setCurrentPlanId] = useState('free');

  // Defensive loading of auth and subscription data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        
        // Safely load current user
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          try {
            setCurrentUser(JSON.parse(savedUser));
          } catch (e) {
            console.warn('Invalid saved user data');
            setCurrentUser({ isGuest: true, email: 'guest@shorthand.app' });
          }
        } else {
          setCurrentUser({ isGuest: true, email: 'guest@shorthand.app' });
        }

        // Safely load subscription data
        const savedSubscription = localStorage.getItem('subscription');
        if (savedSubscription) {
          try {
            const subscription = JSON.parse(savedSubscription);
            const planId = subscription.planId || 'free';
            if (STABLE_PLAN_STRUCTURE[planId]) {
              setCurrentPlanId(planId);
              
              // Load billing history for paid plans
              if (planId !== 'free') {
                setBillingHistory(STABLE_BILLING_HISTORY);
              }
            } else {
              setCurrentPlanId('free');
            }
          } catch (e) {
            console.warn('Invalid subscription data, defaulting to free');
            setCurrentPlanId('free');
          }
        }

        setError(null);
      } catch (err) {
        console.error('Failed to load billing data:', err);
        setError('Failed to load billing information');
        // Set safe defaults
        setCurrentUser({ isGuest: true, email: 'guest@shorthand.app' });
        setCurrentPlanId('free');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Memoized stable data to prevent re-renders
  const availablePlans = useMemo(() => Object.values(STABLE_PLAN_STRUCTURE), []);
  
  const currentPlanDetails = useMemo(() => {
    return STABLE_PLAN_STRUCTURE[currentPlanId] || STABLE_PLAN_STRUCTURE.free;
  }, [currentPlanId]);

  // Stable event handlers
  const handleUpgrade = async (planId) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (STABLE_PLAN_STRUCTURE[planId]) {
        setCurrentPlanId(planId);
        
        // Add billing history for paid plans
        if (planId !== 'free') {
          setBillingHistory(STABLE_BILLING_HISTORY);
        } else {
          setBillingHistory([]);
        }
        
        localStorage.setItem('subscription', JSON.stringify({
          planId,
          status: 'active',
          startDate: new Date().toISOString()
        }));
      }
      
      setOpenUpgradeDialog(false);
    } catch (err) {
      setError('Upgrade failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentPlanId('free');
      setBillingHistory([]); // Clear billing history when downgrading to free
      localStorage.setItem('subscription', JSON.stringify({
        planId: 'free',
        status: 'free'
      }));
      
      setOpenCancelDialog(false);
    } catch (err) {
      setError('Cancellation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaymentMethod = async () => {
    try {
      setLoading(true);
      
      // Validate form
      if (!paymentForm.cardNumber || !paymentForm.expiryMonth || !paymentForm.expiryYear || !paymentForm.cvv || !paymentForm.nameOnCard) {
        setError('Please fill in all required payment fields.');
        return;
      }

      // Simulate API call to add payment method
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPaymentMethod = {
        id: 'pm_' + Date.now(),
        brand: paymentForm.cardNumber.startsWith('4') ? 'visa' : 'mastercard',
        last4: paymentForm.cardNumber.slice(-4),
        expiry: `${paymentForm.expiryMonth}/${paymentForm.expiryYear.slice(-2)}`,
        isDefault: paymentMethods.length === 0
      };

      setPaymentMethods(prev => [...prev, newPaymentMethod]);
      
      // Reset form
      setPaymentForm({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        nameOnCard: '',
        billingAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'US'
        }
      });
      
      setOpenAddPaymentDialog(false);
      setError(null);
    } catch (err) {
      setError('Failed to add payment method. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePaymentMethod = async (methodId) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
    } catch (err) {
      setError('Failed to delete payment method.');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) { // 16 digits + 3 spaces
      setPaymentForm(prev => ({ ...prev, cardNumber: formatted }));
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'paid':
        return { label: 'Paid', color: 'success' };
      case 'pending':
        return { label: 'Pending', color: 'warning' };
      case 'failed':
        return { label: 'Failed', color: 'error' };
      default:
        return { label: status, color: 'default' };
    }
  };

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading billing information...
        </Typography>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Error Loading Billing</Typography>
          <Typography variant="body2">{error}</Typography>
          <Button 
            variant="outlined" 
            onClick={() => window.location.reload()} 
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <BillingErrorBoundary>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 2, md: 4 } }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Billing & Subscription
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your subscription, billing history, and payment methods
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Current Plan */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-start' }, gap: 2, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Current Plan
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {currentPlanDetails.name}
                      </Typography>
                      {currentPlanDetails.popular && (
                        <Chip icon={<Star />} label="Popular" color="primary" size="small" />
                      )}
                    </Box>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      ${currentPlanDetails.price}
                      <Typography component="span" variant="body2" color="text.secondary">
                        /{currentPlanDetails.period}
                      </Typography>
                    </Typography>
                    {currentPlanDetails.savings && (
                      <Chip label={currentPlanDetails.savings} color="success" size="small" sx={{ mt: 1 }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, width: { xs: '100%', sm: 'auto' } }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => setOpenUpgradeDialog(true)}
                      disabled={currentPlanId === 'institutional' || loading}
                      sx={{ minWidth: { xs: 'auto', sm: '120px' } }}
                    >
                      {currentPlanId === 'free' ? 'Upgrade' : 'Change Plan'}
                    </Button>
                    {currentPlanId !== 'free' && (
                      <Button 
                        variant="outlined"
                        color="error"
                        onClick={() => setOpenCancelDialog(true)}
                        disabled={loading}
                        sx={{ minWidth: { xs: 'auto', sm: '120px' } }}
                      >
                        Cancel
                      </Button>
                    )}
                  </Box>
                </Box>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Plan Features
                </Typography>
                
                <List>
                  {currentPlanDetails.features.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                
                {currentPlanId === 'free' && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Upgrade to Premium to unlock unlimited practice sessions, advanced analytics, and all learning features!
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Usage & Next Billing */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Usage This Month
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Practice Sessions
                      </Typography>
                      <Typography variant="h6">
                        {currentPlanId === 'free' ? '12/20' : 'Unlimited'}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Assessments
                      </Typography>
                      <Typography variant="h6">
                        {currentPlanId === 'free' ? '3/5' : 'Unlimited'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {currentPlanId !== 'free' && (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Next Billing
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Nov 1, 2025
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${currentPlanDetails.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Payment Methods */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 2 }}>
                  <Typography variant="h6">Payment Methods</Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<Add />}
                    size="small" 
                    onClick={() => setOpenAddPaymentDialog(true)}
                    sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
                  >
                    Add Payment Method
                  </Button>
                </Box>
                
                {paymentMethods.length === 0 ? (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      No payment methods added yet. Add a payment method to manage your subscription.
                    </Typography>
                  </Alert>
                ) : (
                  paymentMethods.map((method) => (
                    <Box key={method.id} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, mb: 1 }}>
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                          <CreditCard />
                          <Box>
                            <Typography variant="body1">
                              •••• •••• •••• {method.last4}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {method.brand.toUpperCase()} • Expires {method.expiry}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {method.isDefault && (
                            <Chip label="Default" size="small" color="primary" />
                          )}
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeletePaymentMethod(method.id)}
                            disabled={loading}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Billing History */}
          <Grid item xs={12} lg={currentPlanId === 'free' ? 12 : 6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Billing History
                </Typography>
                
                {billingHistory.length === 0 ? (
                  <Alert severity="info">
                    {currentPlanId === 'free' 
                      ? 'No billing history available for free plan.' 
                      : 'No billing history yet. Your transactions will appear here.'}
                  </Alert>
                ) : (
                  <Box sx={{ overflowX: 'auto' }}>
                    <TableContainer>
                      <Table sx={{ minWidth: 500 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {billingHistory.map((invoice) => {
                            const statusConfig = getStatusChip(invoice.status);
                            return (
                              <TableRow key={invoice.id}>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.plan}</TableCell>
                                <TableCell>${invoice.amount}</TableCell>
                                <TableCell>
                                  <Chip 
                                    label={statusConfig.label} 
                                    color={statusConfig.color} 
                                    size="small" 
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button size="small" startIcon={<Download />}>
                                    PDF
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Cancel Subscription Dialog */}
        <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
          <DialogTitle>Cancel Subscription</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.
            </Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>
              Your access will continue until Nov 1, 2025
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCancelDialog(false)} disabled={loading}>
              Keep Subscription
            </Button>
            <Button onClick={handleCancelSubscription} color="error" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Cancel Subscription'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Upgrade Plan Dialog */}
        <Dialog open={openUpgradeDialog} onClose={() => setOpenUpgradeDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Change Subscription Plan</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Plan</InputLabel>
              <Select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                label="Select Plan"
              >
                {availablePlans.filter(plan => plan.id !== currentPlanId).map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.name} - ${plan.price}/{plan.period}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {selectedPlan && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {STABLE_PLAN_STRUCTURE[selectedPlan]?.name} Features:
                </Typography>
                <List>
                  {STABLE_PLAN_STRUCTURE[selectedPlan]?.features.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUpgradeDialog(false)} disabled={loading}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleUpgrade(selectedPlan)} 
              variant="contained"
              disabled={!selectedPlan || loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Upgrade Plan'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Payment Method Dialog */}
        <Dialog open={openAddPaymentDialog} onClose={() => setOpenAddPaymentDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Security color="primary" />
              Add Payment Method
            </Box>
          </DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 3 }}>
              Your payment information is encrypted and secure. We use industry-standard security measures.
            </Alert>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  value={paymentForm.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  inputProps={{ maxLength: 19 }}
                  required
                />
              </Grid>
              
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel>Expiry Month</InputLabel>
                  <Select
                    value={paymentForm.expiryMonth}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, expiryMonth: e.target.value }))}
                    label="Expiry Month"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <MenuItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel>Expiry Year</InputLabel>
                  <Select
                    value={paymentForm.expiryYear}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, expiryYear: e.target.value }))}
                    label="Expiry Year"
                  >
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <MenuItem key={year} value={String(year)}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  value={paymentForm.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      setPaymentForm(prev => ({ ...prev, cvv: value }));
                    }
                  }}
                  placeholder="123"
                  inputProps={{ maxLength: 4 }}
                  required
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Name on Card"
                  value={paymentForm.nameOnCard}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, nameOnCard: e.target.value }))}
                  placeholder="John Doe"
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Billing Address
                  </Typography>
                </Divider>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={paymentForm.billingAddress.street}
                  onChange={(e) => setPaymentForm(prev => ({ 
                    ...prev, 
                    billingAddress: { ...prev.billingAddress, street: e.target.value }
                  }))}
                  placeholder="123 Main Street"
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={paymentForm.billingAddress.city}
                  onChange={(e) => setPaymentForm(prev => ({ 
                    ...prev, 
                    billingAddress: { ...prev.billingAddress, city: e.target.value }
                  }))}
                  placeholder="New York"
                />
              </Grid>
              
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="State"
                  value={paymentForm.billingAddress.state}
                  onChange={(e) => setPaymentForm(prev => ({ 
                    ...prev, 
                    billingAddress: { ...prev.billingAddress, state: e.target.value }
                  }))}
                  placeholder="NY"
                />
              </Grid>
              
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  value={paymentForm.billingAddress.zipCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 5) {
                      setPaymentForm(prev => ({ 
                        ...prev, 
                        billingAddress: { ...prev.billingAddress, zipCode: value }
                      }));
                    }
                  }}
                  placeholder="10001"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddPaymentDialog(false)} disabled={loading}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddPaymentMethod} 
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : <Security />}
            >
              {loading ? 'Adding...' : 'Add Payment Method'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </BillingErrorBoundary>
  );
};

export default StableBilling;