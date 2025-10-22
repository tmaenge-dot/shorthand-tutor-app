import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Stack,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
} from '@mui/material'
import {
  School,
  Speed,
  VolumeUp,
  Person,
  PersonAdd,
  CheckCircle,
  Star,
  Lock,
  LockOpen,
  AutoAwesome
} from '@mui/icons-material'
import { useAuth } from '../../hooks/useAuthMock'
import toast from 'react-hot-toast'

const WelcomeScreen = () => {
  const navigate = useNavigate()
  const { continueAsGuest, signup } = useAuth()
  const [showSignUp, setShowSignUp] = useState(false)
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  const handleGuestAccess = () => {
    continueAsGuest()
    toast.success('Welcome! Exploring as guest user')
    navigate('/dashboard')
  }

  const handleSignUp = async () => {
    if (!signUpData.email || !signUpData.password || !signUpData.displayName) {
      toast.error('Please fill in all fields')
      return
    }
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await signup({
        email: signUpData.email,
        password: signUpData.password,
        displayName: signUpData.displayName
      })
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const guestFeatures = [
    { icon: <School />, text: 'Access to Modules A, B, C', limited: false },
    { icon: <Speed />, text: '5 speed exercises per day', limited: true },
    { icon: <VolumeUp />, text: '10 minutes dictation per day', limited: true },
    { icon: <CheckCircle />, text: 'Basic progress tracking', limited: false }
  ]

  const premiumFeatures = [
    { icon: <AutoAwesome />, text: 'All 21 modules (A-V)', limited: false },
    { icon: <Speed />, text: 'Unlimited speed exercises', limited: false },
    { icon: <VolumeUp />, text: 'Unlimited dictation practice', limited: false },
    { icon: <Star />, text: 'Certificates & achievements', limited: false },
    { icon: <LockOpen />, text: 'Offline mode access', limited: false }
  ]

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Box sx={{ maxWidth: 1200, width: '100%' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
            Master Pitman Shorthand
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1 }}>
            Interactive learning with the official NCS curriculum
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Practice writing, speed development, and audio dictation
          </Typography>
        </Box>

        {/* Options Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
          
          {/* Guest Access Card */}
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Person sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Try as Guest
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Start learning immediately with no registration required
                </Typography>
                <Chip label="Free Forever" color="success" />
              </Box>

              <List sx={{ mb: 3 }}>
                {guestFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ color: feature.limited ? 'warning.main' : 'success.main' }}>
                      {feature.limited ? <Lock /> : feature.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature.text}
                      primaryTypographyProps={{ 
                        color: feature.limited ? 'text.secondary' : 'text.primary' 
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleGuestAccess}
                sx={{ mb: 2 }}
              >
                Continue as Guest
              </Button>
              
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block' }}>
                No email required • Start immediately
              </Typography>
            </CardContent>
          </Card>

          {/* Premium Account Card */}
          <Card sx={{ height: '100%', border: '2px solid', borderColor: 'primary.main' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <PersonAdd sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Create Account
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Unlock the complete shorthand mastery experience
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Chip label="Free Trial" color="primary" />
                  <Chip label="Best Value" color="secondary" />
                </Box>
              </Box>

              <List sx={{ mb: 3 }}>
                {premiumFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ color: 'success.main' }}>
                      {feature.icon}
                    </ListItemIcon>
                    <ListItemText primary={feature.text} />
                  </ListItem>
                ))}
              </List>

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => setShowSignUp(true)}
                  color="primary"
                >
                  Create Free Account
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/signin')}
                >
                  Already have an account?
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Bottom Features */}
        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.9)' }}>
          <Typography variant="h6" gutterBottom>
            What makes our shorthand course special?
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 3, mt: 2 }}>
            <Box>
              <School sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">Official NCS Curriculum</Typography>
              <Typography variant="body2" color="text.secondary">
                Based on the National Council for Shorthand official course materials
              </Typography>
            </Box>
            <Box>
              <Speed sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">Interactive Practice</Typography>
              <Typography variant="body2" color="text.secondary">
                Canvas-based stroke practice with real-time feedback and accuracy scoring
              </Typography>
            </Box>
            <Box>
              <VolumeUp sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">Audio Dictation</Typography>
              <Typography variant="body2" color="text.secondary">
                Voice recognition and text-to-speech for comprehensive dictation training
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Sign Up Dialog */}
      <Dialog open={showSignUp} onClose={() => setShowSignUp(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Your Account</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Full Name"
              value={signUpData.displayName}
              onChange={(e) => setSignUpData({ ...signUpData, displayName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email Address"
              type="email"
              value={signUpData.email}
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={signUpData.password}
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={signUpData.confirmPassword}
              onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
              fullWidth
            />
            <Alert severity="info">
              Start with a free trial. Upgrade to premium anytime to unlock all features.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSignUp(false)}>Cancel</Button>
          <Button 
            onClick={handleSignUp} 
            variant="contained" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WelcomeScreen