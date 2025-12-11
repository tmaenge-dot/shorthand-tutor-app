import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  LinearProgress,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Button,
  Badge
} from '@mui/material'
import {
  School,
  MenuBook,
  Speed,
  Assessment,
  Timeline,
  Star,
  PlayArrow,
  CheckCircle,
  TrendingUp,
  BookmarkBorder,
  Draw,
  Edit,
  Create,
  Link as LinkIcon,
  Group,
  QuestionAnswer,
  Lock,
  LockOpen
} from '@mui/icons-material'
import { useAuth } from './hooks/useAuthMock'
import { useSubscription } from './hooks/useSubscription'
import { useLessons } from './hooks/useLessons'
import { useUserProgress } from './hooks/useUserProgress'
import PayPalPaymentGate from './components/PayPalPaymentGate';

const SimpleDashboard = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { lessons } = useLessons()
  const { getOverallProgress, getCurrentSpeed, getCurrentAccuracy } = useUserProgress()
  const { canAccessModule, subscription, FREE_MODULES } = useSubscription()
  
  const [showPaymentGate, setShowPaymentGate] = useState(false)
  const [selectedModule, setSelectedModule] = useState(null)
  
  const overallProgress = getOverallProgress()
  const currentSpeed = getCurrentSpeed()
  const currentAccuracy = getCurrentAccuracy()

  // All available modules
  const allModules = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V']

  const handleNavigate = (path) => {
    navigate(path)
  }

  const handleModuleClick = (module) => {
    if (canAccessModule(module)) {
      navigate(`/lesson/${module}`)
    } else {
      setSelectedModule(module)
      setShowPaymentGate(true)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="lg">
        {/* Payment Gate Dialog */}
        {selectedModule && (
          <PayPalPaymentGate
            open={showPaymentGate}
            onClose={() => {
              setShowPaymentGate(false)
              setSelectedModule(null)
            }}
          />
        )}
        
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '2rem' }}>
                Pitman Shorthand Learning Dashboard
              </Typography>
              <Typography variant="h2" component="h2" sx={{ 
                opacity: 0.9, 
                fontSize: '1.2rem',
                fontWeight: 400 
              }}>
                Master stenography with interactive lessons, speed development, and professional certification
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
                Complete NCS curriculum • Court reporting preparation • Secretarial skills development
              </Typography>
            </Paper>
          </Grid>

          {/* Progress Overview */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Timeline sx={{ mr: 1 }} />
                  Learning Progress
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Overall Progress</Typography>
                    <Typography variant="body2">{overallProgress.percentage}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={overallProgress.percentage} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                      <Typography variant="h4" color="primary">{currentSpeed}</Typography>
                      <Typography variant="caption">WPM Speed</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                      <Typography variant="h4" color="success.main">{currentAccuracy}%</Typography>
                      <Typography variant="caption">Accuracy</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                
                <List>
                  <ListItemButton onClick={() => handleNavigate('/practice')}>
                    <ListItemIcon><Speed color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Practice Session" 
                      secondary="Start speed development"
                    />
                  </ListItemButton>
                  
                  <ListItemButton onClick={() => handleNavigate('/stroke-recognition')}>
                    <ListItemIcon><Draw color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Learn Strokes" 
                      secondary="Master stroke formations"
                    />
                  </ListItemButton>
                  
                  <ListItemButton onClick={() => handleNavigate('/outline-phrasing')}>
                    <ListItemIcon><Create color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Outline Construction" 
                      secondary="Build complete words"
                    />
                  </ListItemButton>
                  
                  <ListItemButton onClick={() => handleNavigate('/shortforms')}>
                    <ListItemIcon><Speed color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Learn Shortforms" 
                      secondary="Abbreviated outlines"
                    />
                  </ListItemButton>
                  
                  <ListItemButton onClick={() => handleNavigate('/phrasing')}>
                    <ListItemIcon><Group color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Practice Phrasing" 
                      secondary="Join words for speed"
                    />
                  </ListItemButton>
                  
                  <ListItemButton onClick={() => handleNavigate('/assessment')}>
                    <ListItemIcon><Assessment color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Take Assessment" 
                      secondary="Test your skills"
                    />
                  </ListItemButton>
                  
                  <ListItemButton onClick={() => handleNavigate('/qa-assistant')}>
                    <ListItemIcon><QuestionAnswer color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Ask Questions" 
                      secondary="Get instant help"
                    />
                  </ListItemButton>
                  
                  <ListItemButton onClick={() => handleNavigate('/resources')}>
                    <ListItemIcon><MenuBook color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Study Resources" 
                      secondary="Theory and examples"
                    />
                  </ListItemButton>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Available Modules */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <School sx={{ mr: 1 }} />
                    Learning Modules
                  </Typography>
                  {!subscription.isPremium && (
                    <Chip 
                      label={`${FREE_MODULES.length} Free • ${allModules.length - FREE_MODULES.length} Premium`}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>
                
                <Grid container spacing={2}>
                  {allModules.slice(0, 12).map((module) => {
                    const isLocked = !canAccessModule(module)
                    const lesson = lessons.find(l => l.id === module)
                    
                    return (
                      <Grid item xs={6} sm={4} md={2} key={module}>
                        <Card 
                          sx={{ 
                            cursor: 'pointer',
                            position: 'relative',
                            '&:hover': { 
                              bgcolor: isLocked ? 'grey.100' : 'primary.light',
                              transform: 'translateY(-2px)',
                              transition: 'all 0.2s'
                            },
                            opacity: isLocked ? 0.7 : 1,
                            border: isLocked ? '2px dashed' : '2px solid transparent',
                            borderColor: isLocked ? 'grey.300' : 'transparent'
                          }}
                          onClick={() => handleModuleClick(module)}
                        >
                          <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            {isLocked && (
                              <Lock 
                                sx={{ 
                                  position: 'absolute', 
                                  top: 8, 
                                  right: 8, 
                                  fontSize: 20,
                                  color: 'warning.main'
                                }} 
                              />
                            )}
                            <Typography variant="h6">Module {module}</Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 0.5, height: 32, overflow: 'hidden' }}>
                              {lesson?.title || 'Advanced Module'}
                            </Typography>
                            {!isLocked ? (
                              <LockOpen sx={{ color: 'success.main', mt: 1, fontSize: 20 }} />
                            ) : (
                              <Chip 
                                label="Premium" 
                                size="small" 
                                color="warning" 
                                sx={{ mt: 1 }}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
                
                {!subscription.isPremium && (
                  <Box sx={{ mt: 3, textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                      🎓 Unlock Full Access to All Modules
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Modules A-D are free. Upgrade to access modules E-V and advanced features!
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="large"
                      onClick={() => {
                        setSelectedModule('E')
                        setShowPaymentGate(true)
                      }}
                    >
                      Upgrade to Premium - $29.99
                    </Button>
                  </Box>
                )}
                
                {subscription.isPremium && (
                  <Box sx={{ mt: 3, textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                    <Typography variant="body1" fontWeight="bold" color="success.dark">
                      ✨ Premium Member - All Modules Unlocked!
                    </Typography>
                    <Typography variant="body2" color="success.dark">
                      Valid until: {new Date(subscription.expiryDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default SimpleDashboard