import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  Button,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material'
import { AppIcons } from '../../utils/iconManager'

const AdaptiveLearningEngine = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [learningPath, setLearningPath] = useState([])
  const [currentRecommendations, setCurrentRecommendations] = useState([])
  const [adaptationDialogOpen, setAdaptationDialogOpen] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState({})
  const [difficultyAdjustments, setDifficultyAdjustments] = useState([])
  const [learningStyle, setLearningStyle] = useState('balanced')

  useEffect(() => {
    generateUserProfile()
    generateLearningPath()
    generateRecommendations()
    calculatePerformanceMetrics()
  }, [])

  const generateUserProfile = () => {
    // Simulate AI analysis of user performance
    const profile = {
      id: 'user_001',
      skillLevel: 'intermediate',
      learningSpeed: 'moderate',
      strengths: ['straight_strokes', 'consonants', 'memory_retention'],
      weaknesses: ['curved_strokes', 'vowel_placement', 'speed_writing'],
      preferredPracticeTime: 20, // minutes
      consistencyScore: 78,
      motivationLevel: 'high',
      lastActive: '2025-10-20',
      totalPracticeHours: 24.5,
      accuracyTrend: 'improving',
      speedTrend: 'stable',
      engagementPattern: 'evening_learner',
      masteredSymbols: 15,
      totalSymbols: 43,
      currentModule: 'B',
      recommendedModule: 'C',
      adaptationHistory: [
        { date: '2025-10-18', change: 'Reduced practice time from 30 to 20 minutes', reason: 'User fatigue detected' },
        { date: '2025-10-15', change: 'Increased curved stroke focus', reason: 'Low accuracy in R and L symbols' },
        { date: '2025-10-12', change: 'Added visual learning aids', reason: 'Learning style analysis' }
      ]
    }

    setUserProfile(profile)
  }

  const generateLearningPath = () => {
    const path = [
      {
        id: 1,
        title: 'Review Foundation Strokes',
        description: 'Reinforce P, B, T, D strokes with accuracy focus',
        estimatedTime: 15,
        difficulty: 'easy',
        priority: 'high',
        status: 'completed',
        adaptiveReason: 'User shows excellent straight stroke mastery',
        symbols: ['P', 'B', 'T', 'D'],
        successCriteria: '85% accuracy maintained',
        personalizedTips: 'Your straight strokes are excellent! Use this confidence for curved strokes.'
      },
      {
        id: 2,
        title: 'Curved Stroke Intensive',
        description: 'Focus on R and L with specialized practice techniques',
        estimatedTime: 25,
        difficulty: 'medium',
        priority: 'high',
        status: 'current',
        adaptiveReason: 'Identified weakness in curved strokes requiring targeted practice',
        symbols: ['R', 'L'],
        successCriteria: '70% accuracy improvement',
        personalizedTips: 'Break down curved strokes into smaller segments for better control.'
      },
      {
        id: 3,
        title: 'Vowel Placement Mastery',
        description: 'Precision training for vowel positioning relative to consonants',
        estimatedTime: 20,
        difficulty: 'medium',
        priority: 'medium',
        status: 'upcoming',
        adaptiveReason: 'Sequential learning based on consonant mastery',
        symbols: ['A', 'E', 'I', 'O', 'U'],
        successCriteria: 'Consistent positioning accuracy',
        personalizedTips: 'Use grid practice for vowel positioning - your detail orientation will help here.'
      },
      {
        id: 4,
        title: 'Speed Building Phase',
        description: 'Gradual speed increase while maintaining accuracy',
        estimatedTime: 30,
        difficulty: 'hard',
        priority: 'low',
        status: 'locked',
        adaptiveReason: 'Unlocks after 75% accuracy in previous modules',
        symbols: ['Combined practice'],
        successCriteria: '40 WPM with 80% accuracy',
        personalizedTips: 'Your methodical approach will serve you well in speed development.'
      }
    ]

    setLearningPath(path)
  }

  const generateRecommendations = () => {
    const recommendations = [
      {
        id: 1,
        type: 'practice_adjustment',
        title: 'Reduce Practice Session Length',
        description: 'AI detected fatigue patterns in your recent sessions. Consider 15-minute focused sessions instead of 30-minute ones.',
        priority: 'high',
        impact: 'Improved retention and reduced errors',
        actionRequired: true,
        estimatedImprovement: '+12% accuracy',
        icon: <Timer color="warning" />,
        category: 'session_optimization'
      },
      {
        id: 2,
        type: 'content_focus',
        title: 'Curved Stroke Specialization',
        description: 'Your performance data shows excellent straight stroke mastery but opportunity in curved strokes.',
        priority: 'high',
        impact: 'Balanced skill development',
        actionRequired: false,
        estimatedImprovement: '+18% overall accuracy',
        icon: <MyLocation color="primary" />,
        category: 'skill_balancing'
      },
      {
        id: 3,
        type: 'learning_style',
        title: 'Visual Learning Enhancement',
        description: 'Based on your interaction patterns, visual aids and animations would boost your learning efficiency.',
        priority: 'medium',
        impact: 'Faster concept comprehension',
        actionRequired: false,
        estimatedImprovement: '+15% learning speed',
        icon: <PersonalVideo color="info" />,
        category: 'learning_optimization'
      },
      {
        id: 4,
        type: 'motivation',
        title: 'Achievement Milestone',
        description: 'You\'re 2 symbols away from the "Foundation Master" achievement. Focus on K and G symbols next.',
        priority: 'low',
        impact: 'Motivation boost',
        actionRequired: false,
        estimatedImprovement: 'Engagement increase',
        icon: <EmojiEvents color="success" />,
        category: 'gamification'
      }
    ]

    setCurrentRecommendations(recommendations)
  }

  const calculatePerformanceMetrics = () => {
    const metrics = {
      overallProgress: 65,
      weeklyImprovement: 8,
      consistencyScore: 78,
      adaptationScore: 85,
      learningEfficiency: 72,
      strengthsUtilization: 82,
      weaknessImprovement: 45,
      motivationIndex: 88,
      projectedCompletion: '6 weeks',
      nextMilestone: 'Module C Completion',
      aiConfidence: 92
    }

    setPerformanceMetrics(metrics)
  }

  const handleApplyRecommendation = (recommendationId) => {
    const recommendation = currentRecommendations.find(r => r.id === recommendationId)
    
    // Simulate applying the recommendation
    if (recommendation) {
      const adjustment = {
        id: Date.now(),
        type: recommendation.type,
        title: recommendation.title,
        appliedAt: new Date().toISOString(),
        expectedImprovement: recommendation.estimatedImprovement,
        status: 'active'
      }

      setDifficultyAdjustments(prev => [...prev, adjustment])
      
      // Update recommendations to reflect applied state
      setCurrentRecommendations(prev => 
        prev.map(r => r.id === recommendationId ? { ...r, applied: true } : r)
      )
    }
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'info'
    }
    return colors[priority] || 'default'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <AppIcons.CheckCircle color="success" />
      case 'current':
        return <AppIcons.PlayArrow color="primary" />
      case 'upcoming':
        return <AppIcons.AccessTime color="action" />
      case 'locked':
        return <AppIcons.Lock color="disabled" />
      default:
        return <AppIcons.Info />
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Psychology color="primary" />
        Adaptive Learning Engine
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        AI-powered personalized learning experience that adapts to your progress and preferences
      </Typography>

      {/* Performance Overview */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              AI Learning Analysis
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{performanceMetrics.overallProgress}%</Typography>
                  <Typography variant="body2">Overall Progress</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{performanceMetrics.adaptationScore}</Typography>
                  <Typography variant="body2">Adaptation Score</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{performanceMetrics.weeklyImprovement}%</Typography>
                  <Typography variant="body2">Weekly Growth</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{performanceMetrics.aiConfidence}%</Typography>
                  <Typography variant="body2">AI Confidence</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <AutoAwesome sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6">Next Optimization</Typography>
              <Typography variant="body2">{performanceMetrics.nextMilestone}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* AI Recommendations */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Lightbulb color="primary" />
                AI Recommendations
              </Typography>
              
              {currentRecommendations.map((recommendation) => (
                <Card key={recommendation.id} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {recommendation.icon}
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {recommendation.title}
                          </Typography>
                          <Chip 
                            label={recommendation.priority} 
                            size="small" 
                            color={getPriorityColor(recommendation.priority)}
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {recommendation.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          <Chip 
                            label={`Impact: ${recommendation.impact}`} 
                            size="small" 
                            variant="outlined"
                          />
                          <Chip 
                            label={recommendation.estimatedImprovement} 
                            size="small" 
                            color="success"
                            variant="outlined"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          {recommendation.actionRequired && !recommendation.applied && (
                            <Button 
                              size="small" 
                              variant="contained"
                              onClick={() => handleApplyRecommendation(recommendation.id)}
                            >
                              Apply Now
                            </Button>
                          )}
                          {recommendation.applied && (
                            <Chip label="Applied" color="success" size="small" />
                          )}
                          <Button size="small" variant="outlined">
                            Learn More
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Adaptive Learning Path */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Timeline color="primary" />
                Personalized Learning Path
              </Typography>
              
              <Stepper orientation="vertical">
                {learningPath.map((step) => (
                  <Step key={step.id} active={step.status === 'current'} completed={step.status === 'completed'}>
                    <StepLabel icon={getStatusIcon(step.status)}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        {step.title}
                        <Chip 
                          label={step.difficulty} 
                          size="small" 
                          color={step.difficulty === 'easy' ? 'success' : step.difficulty === 'medium' ? 'warning' : 'error'}
                        />
                        <Chip 
                          label={`${step.estimatedTime} min`} 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {step.description}
                      </Typography>
                      
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          <strong>AI Insight:</strong> {step.adaptiveReason}
                        </Typography>
                      </Alert>
                      
                      <Paper sx={{ p: 2, mb: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                        <Typography variant="body2">
                          💡 <strong>Personalized Tip:</strong> {step.personalizedTips}
                        </Typography>
                      </Paper>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          <strong>Success Criteria:</strong> {step.successCriteria}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Focus Symbols:</strong> {step.symbols.join(', ')}
                        </Typography>
                      </Box>
                      
                      {step.status === 'current' && (
                        <Button variant="contained" startIcon={<AppIcons.PlayArrow />}>
                          Continue Learning
                        </Button>
                      )}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        {/* User Profile & Metrics */}
        <Grid item xs={12} lg={4}>
          {userProfile && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Insights color="primary" />
                  Learning Profile
                </Typography>
                
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                    <School sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6">{userProfile.skillLevel.toUpperCase()}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userProfile.totalPracticeHours} hours practiced
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Learning Efficiency
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={performanceMetrics.learningEfficiency} 
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {performanceMetrics.learningEfficiency}% - Above average
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Consistency Score
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={userProfile.consistencyScore} 
                    color="success"
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {userProfile.consistencyScore}% - Excellent
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                  Strengths
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {userProfile.strengths.map((strength, index) => (
                    <Chip 
                      key={index} 
                      label={strength.replace('_', ' ')} 
                      size="small" 
                      color="success" 
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                  Focus Areas
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {userProfile.weaknesses.map((weakness, index) => (
                    <Chip 
                      key={index} 
                      label={weakness.replace('_', ' ')} 
                      size="small" 
                      color="warning" 
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Recent Adaptations */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesome color="primary" />
                Recent Adaptations
              </Typography>
              
              <List dense>
                {userProfile?.adaptationHistory.slice(0, 3).map((adaptation, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                        <Settings sx={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={adaptation.change}
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            {adaptation.reason}
                          </Typography>
                          <br />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(adaptation.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<AppIcons.Settings />}
                onClick={() => setAdaptationDialogOpen(true)}
                sx={{ mt: 2 }}
              >
                View All Adaptations
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Adaptation History Dialog */}
      <Dialog open={adaptationDialogOpen} onClose={() => setAdaptationDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Adaptation History</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Track how the AI has personalized your learning experience over time
          </Typography>
          
          <List>
            {userProfile?.adaptationHistory.map((adaptation, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <AutoAwesome color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={adaptation.change}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Reason:</strong> {adaptation.reason}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(adaptation.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < userProfile.adaptationHistory.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdaptationDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdaptiveLearningEngine