import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
  Avatar,
  Button
} from '@mui/material'
import {
  TrendingUp,
  Assessment,
  Speed,
  Timer,
  CheckCircle,
  Warning,
  Star,
  BarChart,
  Timeline,
  TrackChanges,
  EmojiEvents,
  School,
  Gesture,
  VolumeUp,
  Analytics,
  CalendarToday
} from '@mui/icons-material'
import { useUserProgress } from '../../hooks/useUserProgress'
import { useSubscription } from '../../hooks/useSubscription'

const AnalyticsLite = () => {
  const { userProgress } = useUserProgress()
  const { currentPlan } = useSubscription()
  const [timeRange, setTimeRange] = useState('week')
  const [analyticsData, setAnalyticsData] = useState({
    sessions: [],
    performance: {},
    insights: []
  })

  useEffect(() => {
    generateBasicAnalytics()
  }, [userProgress, timeRange])

  const generateBasicAnalytics = () => {
    // Generate basic analytics data
    const sessions = generateSessionData()
    const performance = calculatePerformanceMetrics()
    const insights = generateInsights()

    setAnalyticsData({
      sessions,
      performance,
      insights
    })
  }

  const generateSessionData = () => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90
    return Array.from({ length: Math.min(days, 10) }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      accuracy: Math.floor(60 + Math.random() * 35 + i * 2),
      speed: Math.floor(20 + Math.random() * 40 + i * 3),
      duration: Math.floor(5 + Math.random() * 25),
      module: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
    })).reverse()
  }

  const calculatePerformanceMetrics = () => {
    return {
      overallScore: Math.floor(70 + Math.random() * 25),
      avgAccuracy: Math.floor(75 + Math.random() * 20),
      currentSpeed: Math.floor(30 + Math.random() * 40),
      studyTime: Math.floor(20 + Math.random() * 50),
      modulesMastered: Math.floor(2 + Math.random() * 4),
      streak: Math.floor(3 + Math.random() * 10),
      improvement: {
        accuracy: Math.floor(Math.random() * 20) - 10,
        speed: Math.floor(Math.random() * 15) - 5
      }
    }
  }

  const generateInsights = () => {
    const insights = []
    const { performance } = analyticsData

    if (performance.improvement?.accuracy > 5) {
      insights.push({
        type: 'success',
        icon: <TrendingUp />,
        title: 'Accuracy Improving!',
        message: `Your stroke accuracy has improved by ${performance.improvement.accuracy}% this week`
      })
    }

    if (performance.improvement?.speed > 3) {
      insights.push({
        type: 'info',
        icon: <Speed />,
        title: 'Speed Boost',
        message: `Writing speed increased by ${performance.improvement.speed} WPM`
      })
    }

    if (performance.streak > 5) {
      insights.push({
        type: 'success',
        icon: <EmojiEvents />,
        title: 'Great Streak!',
        message: `You've practiced for ${performance.streak} consecutive days`
      })
    }

    return insights
  }

  const getStrengthsAndWeaknesses = () => {
    return [
      {
        category: 'Consonants',
        strength: analyticsData.performance.avgAccuracy || 75,
        weakness: 'Curved strokes (R, L)',
        recommendation: 'Practice Module B exercises'
      },
      {
        category: 'Vowels',
        strength: (analyticsData.performance.avgAccuracy || 75) - 10,
        weakness: 'Position placement',
        recommendation: 'Focus on vowel positioning drills'
      },
      {
        category: 'Speed',
        strength: analyticsData.performance.currentSpeed || 35,
        weakness: 'Consistency under pressure',
        recommendation: 'Regular timed practice sessions'
      }
    ]
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Analytics color="primary" />
            Learning Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your progress and identify areas for improvement
          </Typography>
        </Box>
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="quarter">This Quarter</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Insights Section */}
      {analyticsData.insights.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {analyticsData.insights.map((insight, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Alert 
                severity={insight.type} 
                icon={insight.icon}
                sx={{ borderRadius: 2 }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  {insight.title}
                </Typography>
                <Typography variant="body2">
                  {insight.message}
                </Typography>
              </Alert>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent>
              <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <EmojiEvents sx={{ fontSize: 30, color: 'white' }} />
              </Avatar>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                {analyticsData.performance.overallScore}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Overall Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Gesture color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h5">
                    {analyticsData.performance.avgAccuracy}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Accuracy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Speed color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h5">
                    {analyticsData.performance.currentSpeed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current WPM
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Timer color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h5">
                    {analyticsData.performance.studyTime}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Study Time
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <School color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h5">
                    {analyticsData.performance.modulesMastered}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Modules Mastered
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Recent Sessions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="primary" />
                Recent Practice Sessions
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Module</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Accuracy</TableCell>
                      <TableCell>Speed (WPM)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analyticsData.sessions.map((session, index) => (
                      <TableRow key={index}>
                        <TableCell>{session.date}</TableCell>
                        <TableCell>
                          <Chip label={`Module ${session.module}`} size="small" />
                        </TableCell>
                        <TableCell>{session.duration} min</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={session.accuracy} 
                              sx={{ width: 50, height: 6, borderRadius: 3 }}
                            />
                            <Typography variant="body2">{session.accuracy}%</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color={session.speed > 40 ? 'success.main' : 'text.primary'}>
                            {session.speed}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrackChanges color="primary" />
                Weekly Goals
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Practice 5 days" 
                    secondary="Completed ✓"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="80% accuracy" 
                    secondary="Achieved ✓"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Timer color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="45 WPM speed" 
                    secondary="In progress..."
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Strengths & Weaknesses */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Assessment color="primary" />
            Strengths & Areas for Improvement
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Current Level</TableCell>
                  <TableCell>Area for Focus</TableCell>
                  <TableCell>Recommendation</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getStrengthsAndWeaknesses().map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="subtitle2">{item.category}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={item.strength} 
                          sx={{ width: 100, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2">{item.strength}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {item.weakness}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {item.recommendation}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" color="primary">
                        Practice
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Upgrade Notice for Advanced Analytics */}
      {currentPlan?.id === 'free' && (
        <Card sx={{ mt: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ color: 'white' }}>
                <Typography variant="h6" gutterBottom>
                  Unlock Advanced Analytics
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Get detailed charts, progress trends, and personalized learning insights with Premium
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
              >
                Upgrade Now
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default AnalyticsLite