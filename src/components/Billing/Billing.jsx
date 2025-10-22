import React, { useState, useEffect } from 'react';
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
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  CreditCard,
  Receipt,
  Download,
  CheckCircle,
  Cancel,
  Warning,
  Star,
  School,
  Speed,
  Assessment,
  Analytics,
  Group,
  Payment,
  AccountBalance,
  Security
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuthMock';
import { useSubscription } from '../../hooks/useSubscription';

const Billing = () => {
  const { currentUser } = useAuth();
  const { currentPlan, hasAccess, plans } = useSubscription();
  const [billingHistory, setBillingHistory] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openUpgradeDialog, setOpenUpgradeDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  // Helper to get current plan ID whether currentPlan is object or string
  const currentPlanId = typeof currentPlan === 'object' ? currentPlan.id : currentPlan;

  // Mock billing data
  useEffect(() => {
    // Simulate loading billing history
    setBillingHistory([
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
    ]);

    // Simulate payment methods
    setPaymentMethods([
      {
        id: 'pm_001',
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiry: '12/26',
        isDefault: true
      }
    ]);
  }, []);

  // Convert subscription plans to billing format
  const availablePlans = Object.values(plans || {}).map(plan => ({
    id: plan.id,
    name: plan.name,
    price: plan.price,
    period: plan.billing === 'forever' ? 'forever' : 'month',
    popular: plan.id === 'premium',
    savings: plan.id === 'institutional' ? 'Perfect for schools' : undefined,
    features: plan.id === 'free' ? [
      'Basic practice exercises (Modules A, B, C)',
      '5 speed exercises per day', 
      '10 minutes dictation per day',
      'Basic progress tracking'
    ] : plan.id === 'premium' ? [
      'All modules (A-U) unlocked',
      'Unlimited speed exercises',
      'Unlimited dictation practice', 
      'Complete progress tracking',
      'Stroke recognition system',
      'Outline & phrasing practice',
      'Certificates & achievements',
      'Offline mode',
      'Q&A Assistant',
      'Priority support'
    ] : [
      'All Premium features',
      'Multi-user management', 
      'Institutional dashboard',
      'Bulk user creation',
      'Advanced analytics',
      'Custom branding options',
      'Dedicated support'
    ],
    limitations: plan.id === 'free' ? [
      'Limited modules access',
      'Daily usage limits',
      'No certificates', 
      'No offline mode'
    ] : []
  }));

  const getCurrentPlanDetails = () => {
    return availablePlans.find(plan => plan.id === currentPlanId) || availablePlans[0];
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      paid: { color: 'success', label: 'Paid' },
      pending: { color: 'warning', label: 'Pending' },
      failed: { color: 'error', label: 'Failed' }
    };
    return statusConfig[status] || { color: 'default', label: status };
  };

  const handleCancelSubscription = () => {
    // Mock cancellation logic
    alert('Subscription cancellation requested. You will retain access until the end of your billing period.');
    setOpenCancelDialog(false);
  };

  const handleUpgradePlan = () => {
    if (selectedPlan) {
      // Mock upgrade logic
      alert(`Upgrade to ${selectedPlan} plan requested. You would be redirected to payment processing.`);
      setOpenUpgradeDialog(false);
      setSelectedPlan('');
    }
  };

  const currentPlanDetails = getCurrentPlanDetails();

  return (
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
                    disabled={currentPlanId === 'institutional'}
                    fullWidth={{ xs: true, sm: false }}
                  >
                    {currentPlanId === 'free' ? 'Upgrade' : 'Change Plan'}
                  </Button>
                  {currentPlanId !== 'free' && (
                    <Button 
                      variant="outlined"
                      fullWidth={{ xs: true, sm: false }} 
                      color="error"
                      onClick={() => setOpenCancelDialog(true)}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Plan Features
              </Typography>
              <List dense>
                {currentPlanDetails.features.map((feature, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle color="success" fontSize="small" />
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
                      {currentPlanId === 'institutional' ? 'Nov 1, 2025' : 'Nov 1, 2025'}
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
        {currentPlanId !== 'free' && (
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 2 }}>
                  <Typography variant="h6">Payment Methods</Typography>
                  <Button variant="outlined" size="small" fullWidth={{ xs: true, sm: false }}>Add Method</Button>
                </Box>
                
                {paymentMethods.map((method) => (
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
                      {method.isDefault && (
                        <Chip label="Default" size="small" />
                      )}
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Billing History */}
        <Grid item xs={12} lg={currentPlanId === 'free' ? 12 : 6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Billing History
              </Typography>
              
              {currentPlan === 'free' ? (
                <Alert severity="info">
                  No billing history available for free plan.
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
            Your access will continue until {currentPlan === 'institutional' ? 'Nov 1, 2025' : 'Nov 1, 2025'}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)}>Keep Subscription</Button>
          <Button onClick={handleCancelSubscription} color="error">
            Cancel Subscription
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
              {availablePlans.filter(plan => plan.id !== (typeof currentPlan === 'object' ? currentPlan.id : currentPlan)).map((plan) => (
                <MenuItem key={plan.id} value={plan.id}>
                  {plan.name} - ${plan.price}/{plan.period}
                  {plan.savings && ` (${plan.savings})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {selectedPlan && (
            <Alert severity="info">
              Your new plan will take effect immediately and you'll be charged a prorated amount.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpgradeDialog(false)}>Cancel</Button>
          <Button onClick={handleUpgradePlan} variant="contained" disabled={!selectedPlan}>
            Upgrade Plan
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Billing;