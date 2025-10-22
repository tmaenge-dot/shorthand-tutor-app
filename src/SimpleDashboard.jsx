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
  Button
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
  QuestionAnswer
} from '@mui/icons-material'
import { useAuth } from './hooks/useAuthMock'
import GuestUserBanner from './components/Auth/GuestUserBanner'
import SubscriptionGate from './components/Subscription/SubscriptionGate'
import UsageTracker from './components/Subscription/UsageTracker'
import { useSubscription } from './hooks/useSubscription'
import { useLessons } from './hooks/useLessons'
import { useUserProgress } from './hooks/useUserProgress'

const SimpleDashboard = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { lessons } = useLessons()
  const { getOverallProgress, getCurrentSpeed, getCurrentAccuracy } = useUserProgress()
  const { hasAccess, currentPlan } = useSubscription()
  
  const overallProgress = getOverallProgress()
  const currentSpeed = getCurrentSpeed()
  const currentAccuracy = getCurrentAccuracy()

  // Available modules based on subscription
  const availableModules = ['A', 'B', 'C', 'D', 'E']
  const premiumModules = ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="lg">
        {/* Guest User Banner */}
        <GuestUserBanner usage={{ speedExercises: 2, dictationMinutes: 5 }} />
        
        {/* Usage Tracker - temporarily disabled */}
        {/* <UsageTracker variant="compact" /> */}
        
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h4" gutterBottom>
                Welcome to Pitman Shorthand
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Master the art of shorthand writing with our comprehensive NCS curriculum
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
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <School sx={{ mr: 1 }} />
                  Learning Modules
                </Typography>
                
                <Grid container spacing={2}>
                  {availableModules.map((module) => (
                    <Grid item xs={6} sm={4} md={2} key={module}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'primary.light' }
                        }}
                        onClick={() => handleNavigate(`/lesson/${module}`)}
                      >
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                          <Typography variant="h6">Module {module}</Typography>
                          <CheckCircle sx={{ color: 'success.main', mt: 1 }} />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                  
                  {premiumModules.slice(0, 6).map((module) => (
                    <Grid item xs={6} sm={4} md={2} key={module}>
                      <SubscriptionGate feature="module" moduleId={module}>
                        <Card 
                          sx={{ 
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'primary.light' }
                          }}
                          onClick={() => handleNavigate(`/lesson/${module}`)}
                        >
                          <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h6">Module {module}</Typography>
                            <CheckCircle sx={{ color: 'success.main', mt: 1 }} />
                          </CardContent>
                        </Card>
                      </SubscriptionGate>
                    </Grid>
                  ))}
                </Grid>
                
                {currentPlan.id === 'free' && (
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Unlock all 20 modules with Premium
                    </Typography>
                    <Button variant="contained" color="primary">
                      Upgrade Now
                    </Button>
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