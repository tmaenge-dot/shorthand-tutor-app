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
  Avatar
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
  Target,
  EmojiEvents,
  School,
  Gesture,
  VolumeUp,
  Analytics
} from '@mui/icons-material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useUserProgress } from '../../hooks/useUserProgress'
import { useSubscription } from '../../hooks/useSubscription'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const AnalyticsDashboard = () => {
  const { userProgress } = useUserProgress()
  const { currentPlan } = useSubscription()
  const [timeRange, setTimeRange] = useState('week')
  const [analyticsData, setAnalyticsData] = useState({
    strokePractice: [],
    dictationPerformance: [],
    speedDevelopment: [],
    moduleCompletion: [],
    weeklyActivity: [],
    strengthsWeaknesses: []
  })

  useEffect(() => {
    generateAnalyticsData()
  }, [userProgress, timeRange])

  const generateAnalyticsData = () => {
    // Generate mock analytics data based on user progress
    const strokePracticeData = generateStrokePracticeData()
    const dictationData = generateDictationData()
    const speedData = generateSpeedData()
    const moduleData = generateModuleData()
    const activityData = generateActivityData()
    const strengthsData = generateStrengthsWeaknessesData()

    setAnalyticsData({
      strokePractice: strokePracticeData,
      dictationPerformance: dictationData,
      speedDevelopment: speedData,
      moduleCompletion: moduleData,
      weeklyActivity: activityData,
      strengthsWeaknesses: strengthsData
    })
  }

  const generateStrokePracticeData = () => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90
    return Array.from({ length: days }, (_, i) => ({
      day: timeRange === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] :
           timeRange === 'month' ? `Day ${i + 1}` : `Week ${Math.floor(i / 7) + 1}`,
      accuracy: Math.min(95, 60 + Math.random() * 35 + i * 2),
      attempts: Math.floor(5 + Math.random() * 15),
      improvement: Math.random() * 10 - 5
    }))
  }

  const generateDictationData = () => {
    const sessions = 10
    return Array.from({ length: sessions }, (_, i) => ({
      session: `Session ${i + 1}`,
      speed: Math.floor(40 + Math.random() * 40 + i * 3),
      accuracy: Math.min(98, 70 + Math.random() * 25 + i * 2),
      duration: Math.floor(5 + Math.random() * 15)
    }))
  }

  const generateSpeedData = () => {
    return [
      { month: 'Jan', wpm: 25, target: 30 },
      { month: 'Feb', wpm: 32, target: 35 },
      { month: 'Mar', wpm: 38, target: 40 },
      { month: 'Apr', wpm: 45, target: 45 },
      { month: 'May', wpm: 52, target: 50 },
      { month: 'Jun', wpm: 58, target: 55 }
    ]
  }

  const generateModuleData = () => {
    const modules = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    return modules.map((module, i) => ({
      module,
      completion: Math.min(100, i * 15 + Math.random() * 20),
      timeSpent: Math.floor(2 + Math.random() * 8),
      lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    }))
  }

  const generateActivityData = () => {
    return [
      { activity: 'Stroke Practice', value: 35, color: '#0088FE' },
      { activity: 'Dictation', value: 25, color: '#00C49F' },
      { activity: 'Theory Study', value: 20, color: '#FFBB28' },
      { activity: 'Speed Tests', value: 15, color: '#FF8042' },
      { activity: 'Review', value: 5, color: '#8884D8' }
    ]
  }

  const generateStrengthsWeaknessesData = () => {
    return [
      {
        category: 'Consonants',
        strength: 85,
        weakness: 'Curved strokes',
        improvement: '+12%'
      },
      {
        category: 'Vowels',
        strength: 78,
        weakness: 'Position placement',
        improvement: '+8%'
      },
      {
        category: 'Speed',
        strength: 92,
        weakness: 'Consistency',
        improvement: '+15%'
      },
      {
        category: 'Accuracy',
        strength: 88,
        weakness: 'Complex outlines',
        improvement: '+10%'
      }
    ]
  }

  const calculateOverallScore = () => {
    if (!analyticsData.strokePractice.length) return 0
    const avgAccuracy = analyticsData.strokePractice.reduce((sum, item) => sum + item.accuracy, 0) / analyticsData.strokePractice.length
    const speedFactor = analyticsData.speedDevelopment.length > 0 ? 
      analyticsData.speedDevelopment[analyticsData.speedDevelopment.length - 1].wpm / 60 : 0.5
    return Math.min(100, Math.floor(avgAccuracy * 0.7 + speedFactor * 30))
  }

  const getPerformanceInsights = () => {
    const insights = []
    const recentAccuracy = analyticsData.strokePractice.slice(-3).reduce((sum, item) => sum + item.accuracy, 0) / 3
    
    if (recentAccuracy > 85) {
      insights.push({
        type: 'success',
        icon: <TrendingUp />,
        message: 'Excellent stroke accuracy improvement over the last 3 sessions!'
      })
    } else if (recentAccuracy < 70) {
      insights.push({
        type: 'warning',
        icon: <Warning />,
        message: 'Consider focusing more on stroke practice fundamentals'
      })
    }

    const speedData = analyticsData.speedDevelopment
    if (speedData.length >= 2) {
      const recentSpeed = speedData[speedData.length - 1].wpm
      const previousSpeed = speedData[speedData.length - 2].wpm
      if (recentSpeed > previousSpeed) {
        insights.push({
          type: 'info',
          icon: <Speed />,
          message: `Speed increased by ${recentSpeed - previousSpeed} WPM this month!`
        })
      }
    }

    return insights
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
            Comprehensive analysis of your shorthand learning progress
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

      {/* Performance Insights */}
      {getPerformanceInsights().length > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {getPerformanceInsights().map((insight, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Alert 
                severity={insight.type} 
                icon={insight.icon}
                sx={{ borderRadius: 2 }}
              >
                {insight.message}
              </Alert>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Overall Score & Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent>
              <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <EmojiEvents sx={{ fontSize: 30, color: 'white' }} />
              </Avatar>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                {calculateOverallScore()}
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
                    {analyticsData.strokePractice.length > 0 ? 
                      Math.round(analyticsData.strokePractice.slice(-1)[0]?.accuracy || 0) : 0}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stroke Accuracy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Speed color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h5">
                    {analyticsData.speedDevelopment.length > 0 ? 
                      analyticsData.speedDevelopment.slice(-1)[0]?.wpm || 0 : 0}
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
                    {Math.floor(Math.random() * 50 + 20)}h
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
                    {analyticsData.moduleCompletion.filter(m => m.completion > 80).length}
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

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Stroke Practice Accuracy Trend */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Gesture color="primary" />
                Stroke Practice Accuracy
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.strokePractice}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ fill: '#8884d8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Speed Development */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Speed color="primary" />
                Speed Development (WPM)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.speedDevelopment}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="wpm" stroke="#82ca9d" strokeWidth={2} name="Actual WPM" />
                  <Line type="monotone" dataKey="target" stroke="#ffc658" strokeWidth={2} strokeDasharray="5 5" name="Target WPM" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Activity Distribution */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BarChart color="primary" />
                Activity Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.weeklyActivity}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.weeklyActivity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Module Progress */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Target color="primary" />
                Module Completion
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={analyticsData.moduleCompletion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="module" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Strengths & Weaknesses Analysis */}
        <Grid item xs={12}>
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
                      <TableCell>Strength Level</TableCell>
                      <TableCell>Area for Improvement</TableCell>
                      <TableCell>Recent Progress</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analyticsData.strengthsWeaknesses.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="subtitle2">{row.category}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={row.strength} 
                              sx={{ width: 100, height: 8, borderRadius: 4 }}
                            />
                            <Typography variant="body2">{row.strength}%</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {row.weakness}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={row.improvement} 
                            color="success" 
                            size="small"
                            icon={<TrendingUp />}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                            Practice →
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
      </Grid>
    </Box>
  )
}

export default AnalyticsDashboard