import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  LinearProgress,
  IconButton,
  Tooltip,
  Snackbar
} from '@mui/material'
import {
  Share,
  ContentCopy,
  TrendingUp,
  People,
  MonetizationOn,
  CheckCircle,
  Info,
  Launch,
  Email
} from '@mui/icons-material'

const AffiliateProgram = ({ userType = 'affiliate' }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [showReferralDialog, setShowReferralDialog] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  
  // Affiliate data - would come from backend in production
  const [affiliateData, setAffiliateData] = useState({
    affiliateId: 'AFF_12345',
    totalEarnings: 1247.50,
    pendingCommissions: 234.75,
    totalReferrals: 47,
    conversionRate: 8.5,
    currentTier: 'Silver',
    nextTierProgress: 65
  })

  const affiliateLink = `https://shorthandtutor.app/?ref=${affiliateData.affiliateId}`
  
  // Commission structure
  const commissionTiers = [
    {
      tier: 'Bronze',
      referrals: '1-10',
      commission: '20%',
      bonuses: 'Welcome bonus: $50',
      color: '#CD7F32'
    },
    {
      tier: 'Silver',
      referrals: '11-25',
      commission: '25%',
      bonuses: 'Monthly bonus: $100',
      color: '#C0C0C0'
    },
    {
      tier: 'Gold',
      referrals: '26-50',
      commission: '30%',
      bonuses: 'Quarterly bonus: $500',
      color: '#FFD700'
    },
    {
      tier: 'Platinum',
      referrals: '51+',
      commission: '35%',
      bonuses: 'Annual bonus: $2000',
      color: '#E5E4E2'
    }
  ]

  // Recent referrals
  const recentReferrals = [
    {
      id: 'REF_001',
      user: 'Sarah Johnson',
      plan: 'Premium Monthly',
      commission: 4.99,
      status: 'Confirmed',
      date: '2025-10-22'
    },
    {
      id: 'REF_002',
      user: 'Mike Rodriguez',
      plan: 'Professional Yearly',
      commission: 149.97,
      status: 'Confirmed',
      date: '2025-10-21'
    },
    {
      id: 'REF_003',
      user: 'Jennifer Liu',
      plan: 'Premium Yearly',
      commission: 49.99,
      status: 'Pending',
      date: '2025-10-20'
    }
  ]

  // Marketing materials
  const marketingMaterials = [
    {
      type: 'Banner - Large',
      size: '728x90',
      description: 'Perfect for website headers',
      downloadUrl: '/marketing/banner-large.png'
    },
    {
      type: 'Banner - Medium',
      size: '300x250',
      description: 'Ideal for sidebar placement',
      downloadUrl: '/marketing/banner-medium.png'
    },
    {
      type: 'Social Media Kit',
      size: 'Multiple',
      description: 'Facebook, Twitter, Instagram templates',
      downloadUrl: '/marketing/social-kit.zip'
    },
    {
      type: 'Email Template',
      size: 'HTML',
      description: 'Ready-to-use email promotion',
      downloadUrl: '/marketing/email-template.html'
    }
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true)
    })
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const TabPanel = ({ children, value, index }) => {
    return (
      <div hidden={value !== index}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Affiliate Program - Earn 25% Commission
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Promote Shorthand Tutor and earn generous commissions on every referral
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MonetizationOn color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Earnings</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                ${affiliateData.totalEarnings.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="success.main">
                +$234.75 pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Referrals</Typography>
              </Box>
              <Typography variant="h4" color="info.main">
                {affiliateData.totalReferrals}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active subscribers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Conversion Rate</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {affiliateData.conversionRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Above average!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Tier: {affiliateData.currentTier}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={affiliateData.nextTierProgress} 
                sx={{ mt: 2, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {affiliateData.nextTierProgress}% to Gold tier
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Commission Notice */}
      <Alert severity="success" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🎉 High Commission Rate - Earn Up to 35%!
        </Typography>
        <Typography variant="body2">
          • <strong>25% base commission</strong> on all subscription plans<br/>
          • <strong>Monthly recurring commissions</strong> - earn every month your referrals stay subscribed<br/>
          • <strong>Tier bonuses</strong> - earn up to 35% commission in Platinum tier<br/>
          • <strong>Instant PayPal payouts</strong> - get paid as soon as you reach $50 minimum<br/>
          • <strong>60-day cookie tracking</strong> - get credit even if users don't buy immediately
        </Typography>
      </Alert>

      {/* Main Content Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Dashboard" />
            <Tab label="Referral Tools" />
            <Tab label="Commission Tiers" />
            <Tab label="Marketing Materials" />
          </Tabs>
        </Box>

        {/* Dashboard Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                Recent Referrals
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Plan</TableCell>
                      <TableCell align="right">Commission</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentReferrals.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell>{referral.date}</TableCell>
                        <TableCell>{referral.user}</TableCell>
                        <TableCell>{referral.plan}</TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight="bold" color="success.main">
                            ${referral.commission}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={referral.status} 
                            color={referral.status === 'Confirmed' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Next Payout
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    ${affiliateData.pendingCommissions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Minimum payout: $50
                  </Typography>
                  <Button variant="contained" fullWidth disabled={affiliateData.pendingCommissions < 50}>
                    Request Payout
                  </Button>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Payouts processed within 24 hours via PayPal
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Referral Tools Tab */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h5" gutterBottom>
            Your Referral Tools
          </Typography>
          
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Unique Referral Link
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  value={affiliateLink}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Tooltip title="Copy link">
                  <IconButton onClick={() => copyToClipboard(affiliateLink)}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
                <Button 
                  variant="outlined" 
                  startIcon={<Share />}
                  onClick={() => setShowReferralDialog(true)}
                >
                  Share
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Share this link on social media, your website, or directly with potential users. 
                You'll earn commission on every successful referral!
              </Typography>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Share Options
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<Email />}
                      href={`mailto:?subject=Learn Pitman Shorthand&body=Check out this amazing shorthand learning app: ${affiliateLink}`}
                    >
                      Share via Email
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<Launch />}
                      href={`https://twitter.com/intent/tweet?text=Learning Pitman Shorthand has never been easier! Check out this app: ${affiliateLink}`}
                      target="_blank"
                    >
                      Share on Twitter
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<Launch />}
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}`}
                      target="_blank"
                    >
                      Share on Facebook
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Referral Tips
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Target court reporters, stenographers, and journalism students<br/>
                    • Share in shorthand communities and forums<br/>
                    • Highlight the progressive learning system<br/>
                    • Mention the mobile-friendly design<br/>
                    • Emphasize practical speed development<br/>
                    • Use your own success story as testimony
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Commission Tiers Tab */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h5" gutterBottom>
            Commission Structure & Tiers
          </Typography>
          
          <Grid container spacing={3}>
            {commissionTiers.map((tier, index) => (
              <Grid item xs={12} sm={6} md={3} key={tier.tier}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    bgcolor: tier.tier === affiliateData.currentTier ? 'primary.light' : 'background.paper',
                    color: tier.tier === affiliateData.currentTier ? 'white' : 'text.primary'
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {tier.tier}
                      {tier.tier === affiliateData.currentTier && (
                        <Chip label="Current" size="small" sx={{ ml: 1 }} />
                      )}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {tier.commission}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {tier.referrals} referrals
                    </Typography>
                    <Typography variant="caption" display="block">
                      {tier.bonuses}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              💰 Commission Examples
            </Typography>
            <Typography variant="body2">
              • Premium Monthly ($19.99) = <strong>$4.99-$6.99 commission</strong><br/>
              • Premium Yearly ($199.99) = <strong>$49.99-$69.99 commission</strong><br/>
              • Professional Monthly ($49.99) = <strong>$12.49-$17.49 commission</strong><br/>
              • Professional Yearly ($499.99) = <strong>$124.99-$174.99 commission</strong>
            </Typography>
          </Alert>
        </TabPanel>

        {/* Marketing Materials Tab */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h5" gutterBottom>
            Marketing Materials
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Download professional marketing materials to promote Shorthand Tutor effectively.
          </Typography>
          
          <Grid container spacing={3}>
            {marketingMaterials.map((material, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {material.type}
                    </Typography>
                    <Typography variant="body2" color="primary" gutterBottom>
                      {material.size}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {material.description}
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      href={material.downloadUrl}
                      download
                    >
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Card sx={{ mt: 4, bgcolor: 'info.light' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                📧 Need Custom Materials?
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                Contact our affiliate support team for custom banners, landing pages, or specialized marketing materials 
                tailored to your audience. We're here to help you succeed!
              </Typography>
              <Button variant="outlined" color="inherit" sx={{ mt: 2, color: 'white', borderColor: 'white' }}>
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </TabPanel>
      </Card>

      {/* Referral Dialog */}
      <Dialog open={showReferralDialog} onClose={() => setShowReferralDialog(false)}>
        <DialogTitle>Share Your Referral Link</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Copy and share your unique referral link:
          </Typography>
          <TextField
            fullWidth
            value={affiliateLink}
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={() => copyToClipboard(affiliateLink)}>
                  <ContentCopy />
                </IconButton>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReferralDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Copy Success Snackbar */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Link copied to clipboard!"
      />
    </Box>
  )
}

export default AffiliateProgram