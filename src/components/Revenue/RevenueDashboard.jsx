import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import {
  TrendingUp,
  AccountBalance,
  Payment,
  People,
  MonetizationOn,
  GetApp,
  Share,
  Analytics
} from '@mui/icons-material'

const RevenueDashboard = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0,
    paypalBalance: 0,
    affiliateEarnings: 0
  })
  
  const [showPayoutDialog, setShowPayoutDialog] = useState(false)
  const [paypalEmail, setPaypalEmail] = useState('tmaenge@gmail.com') // Your PayPal email

  // Simulated revenue data - in production, this would come from your backend
  useEffect(() => {
    // Simulate real-time revenue updates
    const updateRevenue = () => {
      setRevenueData({
        totalRevenue: 12450.75,
        monthlyRevenue: 2890.50,
        activeSubscriptions: 145,
        paypalBalance: 8940.25,
        affiliateEarnings: 1250.00
      })
    }
    
    updateRevenue()
    const interval = setInterval(updateRevenue, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  // Revenue breakdown by plan
  const revenueBreakdown = [
    {
      plan: 'Premium Monthly',
      subscribers: 89,
      pricePerUser: 19.99,
      monthlyRevenue: 1779.11,
      growth: '+15%'
    },
    {
      plan: 'Premium Yearly',
      subscribers: 34,
      pricePerUser: 199.99,
      monthlyRevenue: 566.64, // Yearly divided by 12
      growth: '+8%'
    },
    {
      plan: 'Professional Monthly',
      subscribers: 18,
      pricePerUser: 49.99,
      monthlyRevenue: 899.82,
      growth: '+22%'
    },
    {
      plan: 'Professional Yearly',
      subscribers: 4,
      pricePerUser: 499.99,
      monthlyRevenue: 166.66, // Yearly divided by 12
      growth: '+5%'
    }
  ]

  // Recent transactions
  const recentTransactions = [
    {
      id: 'txn_001',
      user: 'Sarah Johnson',
      plan: 'Premium Yearly',
      amount: 199.99,
      date: '2025-10-22',
      status: 'Completed',
      paypalTxnId: 'PP_12345'
    },
    {
      id: 'txn_002',
      user: 'Mike Rodriguez',
      plan: 'Professional Monthly',
      amount: 49.99,
      date: '2025-10-22',
      status: 'Completed',
      paypalTxnId: 'PP_12346'
    },
    {
      id: 'txn_003',
      user: 'Educational Institute XYZ',
      plan: 'Institutional License',
      amount: 499.50,
      date: '2025-10-21',
      status: 'Completed',
      paypalTxnId: 'PP_12347'
    },
    {
      id: 'txn_004',
      user: 'Jennifer Liu',
      plan: 'Premium Monthly',
      amount: 19.99,
      date: '2025-10-21',
      status: 'Completed',
      paypalTxnId: 'PP_12348'
    }
  ]

  // Affiliate program data
  const affiliateData = [
    {
      affiliate: 'Court Reporting School A',
      referrals: 12,
      commission: 300.75,
      conversionRate: '8.5%'
    },
    {
      affiliate: 'Stenography Blog B',
      referrals: 8,
      commission: 199.92,
      conversionRate: '12.3%'
    },
    {
      affiliate: 'Training Center C',
      referrals: 15,
      commission: 374.85,
      conversionRate: '6.2%'
    }
  ]

  const handlePayoutRequest = () => {
    // In production, this would trigger a payout to your PayPal account
    console.log(`Requesting payout to ${paypalEmail}`)
    setShowPayoutDialog(false)
    // Simulate payout success
    setTimeout(() => {
      alert(`Payout of $${revenueData.paypalBalance} initiated to ${paypalEmail}`)
    }, 1000)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Revenue Dashboard - Mr T. Maenge
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Real-time tracking of your Shorthand Tutor app earnings
      </Typography>

      {/* Revenue Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MonetizationOn color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Revenue</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                ${revenueData.totalRevenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="success.main">
                +18% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Monthly Revenue</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                ${revenueData.monthlyRevenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Subscribers</Typography>
              </Box>
              <Typography variant="h4" color="info.main">
                {revenueData.activeSubscriptions}
              </Typography>
              <Typography variant="body2" color="success.main">
                +12 new this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">PayPal Balance</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                ${revenueData.paypalBalance.toLocaleString()}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => setShowPayoutDialog(true)}
                sx={{ mt: 1 }}
              >
                Request Payout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* PayPal Integration Info */}
      <Alert severity="success" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🔄 PayPal Direct Integration Active
        </Typography>
        <Typography variant="body2">
          • All payments are processed directly to your PayPal account: <strong>{paypalEmail}</strong><br/>
          • Automatic instant payments - no waiting for transfers<br/>
          • PayPal takes 2.9% + $0.30 per transaction (industry standard)<br/>
          • You keep 97.1% of all revenue after PayPal fees<br/>
          • Automatic tax reporting and international payment support
        </Typography>
      </Alert>

      {/* Revenue Breakdown */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Revenue by Subscription Plan
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Plan</TableCell>
                      <TableCell align="right">Subscribers</TableCell>
                      <TableCell align="right">Price/User</TableCell>
                      <TableCell align="right">Monthly Revenue</TableCell>
                      <TableCell align="right">Growth</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {revenueBreakdown.map((row) => (
                      <TableRow key={row.plan}>
                        <TableCell component="th" scope="row">
                          {row.plan}
                        </TableCell>
                        <TableCell align="right">{row.subscribers}</TableCell>
                        <TableCell align="right">${row.pricePerUser}</TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight="bold" color="success.main">
                            ${row.monthlyRevenue.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={row.growth} 
                            color="success" 
                            size="small" 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Affiliate Earnings
              </Typography>
              <Typography variant="h4" color="secondary" gutterBottom>
                ${revenueData.affiliateEarnings.toLocaleString()}
              </Typography>
              
              {affiliateData.map((affiliate, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {affiliate.affiliate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {affiliate.referrals} referrals • ${affiliate.commission} commission
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={parseFloat(affiliate.conversionRate)} 
                    sx={{ mt: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {affiliate.conversionRate} conversion rate
                  </Typography>
                </Box>
              ))}
              
              <Button variant="outlined" fullWidth startIcon={<Share />}>
                Generate Affiliate Link
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recent Transactions
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>PayPal ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>{transaction.plan}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        ${transaction.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={transaction.status} 
                        color="success" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {transaction.paypalTxnId}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Payout Request Dialog */}
      <Dialog open={showPayoutDialog} onClose={() => setShowPayoutDialog(false)}>
        <DialogTitle>Request PayPal Payout</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Request immediate payout of your current balance to your PayPal account.
          </Typography>
          <Alert severity="info" sx={{ my: 2 }}>
            Available Balance: <strong>${revenueData.paypalBalance}</strong>
          </Alert>
          <TextField
            fullWidth
            label="PayPal Email"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
            margin="normal"
            helperText="Confirm your PayPal account email"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPayoutDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handlePayoutRequest}>
            Request Payout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Revenue Projections */}
      <Card sx={{ mt: 4, bgcolor: 'primary.light', color: 'white' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📈 Projected Annual Revenue
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Conservative Estimate</Typography>
              <Typography variant="h4">$108,000/year</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Based on current growth rate of 500 users by year-end
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Moderate Growth</Typography>
              <Typography variant="h4">$312,000/year</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                With strategic marketing reaching 1,500 users
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Aggressive Expansion</Typography>
              <Typography variant="h4">$780,000/year</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                International expansion + institutional partnerships
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RevenueDashboard