import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  Lock,
  CheckCircle,
  Star,
  School,
  Speed,
  RecordVoiceOver,
  Timeline,
  EmojiEvents,
  CloudDownload,
  Support
} from '@mui/icons-material'
import { useSubscription } from '../../hooks/useSubscription'

const SubscriptionGate = ({ 
  feature, 
  moduleId = null, 
  children, 
  fallback = null,
  showUpgradeDialog = false,
  onClose = () => {}
}) => {
  const { hasAccess, currentPlan, getRemainingUsage, getUpgradeUrl, plans } = useSubscription()
  const [upgradeDialogOpen, setUpgradeDialogOpen] = React.useState(showUpgradeDialog)

  const access = hasAccess(feature, moduleId)
  const remaining = getRemainingUsage(feature)

  if (access) {
    return children
  }

  if (fallback) {
    return fallback
  }

  // Default upgrade prompt
  return (
    <>
      <Card sx={{ 
        border: '2px dashed #1976d2', 
        textAlign: 'center', 
        p: 2, 
        bgcolor: 'rgba(25, 118, 210, 0.05)' 
      }}>
        <CardContent>
          <Lock sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Premium Feature
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {getUpgradeMessage(feature, moduleId, remaining)}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => setUpgradeDialogOpen(true)}
            sx={{ mr: 1 }}
          >
            Upgrade Now
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => window.open('/pricing', '_blank')}
          >
            View Plans
          </Button>
        </CardContent>
      </Card>

      <UpgradeDialog
        open={upgradeDialogOpen}
        onClose={() => {
          setUpgradeDialogOpen(false)
          onClose()
        }}
        feature={feature}
        moduleId={moduleId}
      />
    </>
  )
}

const UpgradeDialog = ({ open, onClose, feature, moduleId }) => {
  const { plans, currentPlan, upgradeSubscription } = useSubscription()

  const handleUpgrade = async (planId) => {
    const result = await upgradeSubscription(planId)
    if (result.success) {
      onClose()
      // Show success message
    } else {
      // Show error message
      console.error(result.message)
    }
  }

  const getFeatureIcon = (featureName) => {
    const iconMap = {
      module: <School />,
      speedExercise: <Speed />,
      dictation: <RecordVoiceOver />,
      certificates: <EmojiEvents />,
      offlineMode: <CloudDownload />,
      teacherDashboard: <Timeline />
    }
    return iconMap[featureName] || <Star />
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          🚀 Upgrade to Premium
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Unlock all features and accelerate your shorthand learning
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          {Object.values(plans).filter(plan => plan.id !== 'free').map((plan) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: plan.id === 'premium' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  position: 'relative'
                }}
              >
                {plan.savings && (
                  <Chip 
                    label={plan.savings}
                    color="success"
                    size="small"
                    sx={{ 
                      position: 'absolute',
                      top: 8,
                      right: 8
                    }}
                  />
                )}
                
                <CardContent sx={{ textAlign: 'center', pb: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {plan.name}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" component="span" fontWeight="bold">
                      ${plan.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      /{plan.billing}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {plan.description}
                  </Typography>

                  <List dense>
                    {plan.id === 'premium' || plan.id === 'premium-yearly' ? (
                      <>
                        <ListItem>
                          <ListItemIcon><School color="primary" /></ListItemIcon>
                          <ListItemText primary="All 20 Modules (A-U)" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Speed color="primary" /></ListItemIcon>
                          <ListItemText primary="Unlimited Speed Exercises" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><RecordVoiceOver color="primary" /></ListItemIcon>
                          <ListItemText primary="Full Dictation Library" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><EmojiEvents color="primary" /></ListItemIcon>
                          <ListItemText primary="Progress Certificates" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CloudDownload color="primary" /></ListItemIcon>
                          <ListItemText primary="Offline Mode" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Support color="primary" /></ListItemIcon>
                          <ListItemText primary="Priority Support" />
                        </ListItem>
                      </>
                    ) : (
                      <>
                        <ListItem>
                          <ListItemIcon><School color="primary" /></ListItemIcon>
                          <ListItemText primary="All Premium Features" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Timeline color="primary" /></ListItemIcon>
                          <ListItemText primary="Teacher Dashboard" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                          <ListItemText primary="Student Management" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Star color="primary" /></ListItemIcon>
                          <ListItemText primary="Custom Branding" />
                        </ListItem>
                      </>
                    )}
                  </List>
                </CardContent>
                
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant={plan.id === 'premium' ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={() => handleUpgrade(plan.id)}
                    size="large"
                  >
                    {plan.id === 'institutional' ? 'Contact Sales' : 'Choose Plan'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Why Upgrade?
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">Complete NCS curriculum</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">Professional speed development</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">Audio dictation with highlighting</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">Progress certificates</Typography>
              </Box>
              <Box sx={ { display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">Mobile-friendly learning</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">Priority customer support</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Maybe Later</Button>
        <Button variant="contained" onClick={onClose}>
          Continue with Free Plan
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const getUpgradeMessage = (feature, moduleId, remaining) => {
  switch (feature) {
    case 'module':
      return `Module ${moduleId} is available in Premium. Unlock all 20 modules for complete learning.`
    case 'speedExercise':
      return remaining === 0 
        ? 'Daily speed exercise limit reached. Upgrade for unlimited practice.'
        : `${remaining} speed exercises remaining today. Upgrade for unlimited access.`
    case 'dictation':
      return remaining === 0
        ? 'Daily dictation limit reached. Upgrade for unlimited audio practice.'
        : `${remaining} minutes of dictation remaining today. Upgrade for unlimited access.`
    case 'certificates':
      return 'Download progress certificates with Premium subscription.'
    case 'offlineMode':
      return 'Access your lessons offline with Premium subscription.'
    default:
      return 'This feature requires a Premium subscription.'
  }
}

export default SubscriptionGate