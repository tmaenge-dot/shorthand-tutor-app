import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  Badge,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  TrendingUp,
  Timeline,
  EmojiEvents,
  Star,
  CheckCircle,
  RadioButtonUnchecked,
  School,
  Speed,
  Gesture,
  Timer,
  PlayArrow,
  Refresh,
  Info,
  BookmarkBorder,
  Bookmark,
  CalendarToday,
  AssignmentTurnedIn,
  LocalFireDepartment,
  ShowChart,
  BarChart
} from '@mui/icons-material'
import { useUserProgress } from '../../hooks/useUserProgress'
import { useSubscription } from '../../hooks/useSubscription'

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`progress-tabpanel-${index}`}
    aria-labelledby={`progress-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
)

const AdvancedProgressTracker = () => {
  const { userProgress } = useUserProgress()
  const { currentPlan } = useSubscription()
  const [activeTab, setActiveTab] = useState(0)
  const [progressData, setProgressData] = useState({
    overview: {},
    detailed: {},
    achievements: [],
    streaks: {},
    weaknesses: [],
    recommendations: []
  })

  useEffect(() => {
    generateProgressData()
  }, [userProgress])

  const generateProgressData = () => {
    const overview = generateOverviewData()
    const detailed = generateDetailedData()
    const achievements = generateAchievements()
    const streaks = generateStreakData()
    const weaknesses = generateWeaknessAnalysis()
    const recommendations = generateRecommendations()

    setProgressData({
      overview,
      detailed,
      achievements,
      streaks,
      weaknesses,
      recommendations
    })
  }

  const generateOverviewData = () => {
    return {
      totalLessons: 24,
      completedLessons: 8,
      currentAccuracy: 78,
      currentSpeed: 45,
      studyTime: 42,
      practiceStreak: 7,
      overallGrade: 'B+',
      nextMilestone: 'Module D Completion',
      estimatedCompletion: '3 weeks'
    }
  }

  const generateDetailedData = () => {
    return {
      modules: [
        { id: 'A', name: 'Basic Strokes', progress: 100, accuracy: 85, timeSpent: 8 },
        { id: 'B', name: 'Consonants', progress: 100, accuracy: 82, timeSpent: 12 },
        { id: 'C', name: 'Vowels', progress: 90, accuracy: 78, timeSpent: 10 },
        { id: 'D', name: 'Joining Strokes', progress: 45, accuracy: 72, timeSpent: 6 },
        { id: 'E', name: 'Special Forms', progress: 0, accuracy: 0, timeSpent: 0 },
        { id: 'F', name: 'Speed Building', progress: 0, accuracy: 0, timeSpent: 0 }
      ],
      skills: [
        { name: 'Stroke Accuracy', level: 78, trend: '+5%' },
        { name: 'Writing Speed', level: 45, trend: '+8 WPM' },
        { name: 'Reading Fluency', level: 65, trend: '+12%' },
        { name: 'Dictation', level: 52, trend: '+3%' },
        { name: 'Theory Knowledge', level: 88, trend: '+15%' }
      ],
      weeklyProgress: [
        { week: 'Week 1', accuracy: 65, speed: 25, hours: 8 },
        { week: 'Week 2', accuracy: 72, speed: 32, hours: 10 },
        { week: 'Week 3', accuracy: 76, speed: 38, hours: 12 },
        { week: 'Week 4', accuracy: 78, speed: 45, hours: 14 }
      ]
    }
  }

  const generateAchievements = () => {
    return [
      { 
        id: 1, 
        name: 'First Steps', 
        description: 'Complete your first lesson', 
        earned: true, 
        date: '2025-10-15',
        icon: '🎯',
        rarity: 'bronze'
      },
      { 
        id: 2, 
        name: 'Speed Demon', 
        description: 'Reach 40+ WPM', 
        earned: true, 
        date: '2025-10-18',
        icon: '⚡',
        rarity: 'silver'
      },
      { 
        id: 3, 
        name: 'Accuracy Master', 
        description: 'Maintain 85%+ accuracy for 5 sessions', 
        earned: false, 
        progress: 60,
        icon: '🎯',
        rarity: 'gold'
      },
      { 
        id: 4, 
        name: 'Week Warrior', 
        description: 'Practice every day for a week', 
        earned: true, 
        date: '2025-10-19',
        icon: '🔥',
        rarity: 'silver'
      },
      { 
        id: 5, 
        name: 'Theory Scholar', 
        description: 'Score 90%+ on all theory tests', 
        earned: false, 
        progress: 75,
        icon: '📚',
        rarity: 'platinum'
      }
    ]
  }

  const generateStreakData = () => {
    return {
      current: 7,
      longest: 12,
      weeklyGoal: 5,
      weeklyProgress: 5,
      monthlyGoal: 20,
      monthlyProgress: 18
    }
  }

  const generateWeaknessAnalysis = () => {
    return [
      {
        area: 'Curved Strokes (R, L)',
        accuracy: 68,
        improvement: 'Practice Module B exercises daily',
        priority: 'high'
      },
      {
        area: 'Vowel Positioning',
        accuracy: 72,
        improvement: 'Focus on position placement drills',
        priority: 'medium'
      },
      {
        area: 'Speed Under Pressure',
        accuracy: 65,
        improvement: 'Regular timed practice sessions',
        priority: 'medium'
      }
    ]
  }

  const generateRecommendations = () => {
    return [
      {
        type: 'practice',
        title: 'Focus on Curved Strokes',
        description: 'Spend 15 minutes daily practicing R and L strokes',
        priority: 'high',
        estimatedTime: '15 min/day'
      },
      {
        type: 'speed',
        title: 'Speed Building Exercise',
        description: 'Practice common word outlines to improve fluency',
        priority: 'medium',
        estimatedTime: '20 min'
      },
      {
        type: 'theory',
        title: 'Review Vowel Rules',
        description: 'Strengthen theoretical understanding of vowel placement',
        priority: 'low',
        estimatedTime: '10 min'
      }
    ]
  }

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': '#4caf50', 'A': '#4caf50', 'A-': '#8bc34a',
      'B+': '#cddc39', 'B': '#ffeb3b', 'B-': '#ffc107',
      'C+': '#ff9800', 'C': '#ff5722', 'C-': '#f44336'
    }
    return gradeColors[grade] || '#9e9e9e'
  }

  const getRarityColor = (rarity) => {
    const colors = {
      bronze: '#cd7f32',
      silver: '#c0c0c0', 
      gold: '#ffd700',
      platinum: '#e5e4e2'
    }
    return colors[rarity] || '#9e9e9e'
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShowChart color="primary" />
          Advanced Progress Tracking
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive analysis of your shorthand learning journey
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ textAlign: 'center', background: `linear-gradient(135deg, ${getGradeColor(progressData.overview.overallGrade)} 0%, ${getGradeColor(progressData.overview.overallGrade)}99 100%)` }}>
            <CardContent>
              <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                {progressData.overview.overallGrade}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                Overall Grade
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <School color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h5">
                    {progressData.overview.completedLessons}/{progressData.overview.totalLessons}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lessons Complete
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <LocalFireDepartment color="error" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h5">
                    {progressData.overview.practiceStreak}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Day Streak
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Gesture color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h5">
                    {progressData.overview.currentAccuracy}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current Accuracy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Speed color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h5">
                    {progressData.overview.currentSpeed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Words Per Minute
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Module Progress" />
          <Tab label="Skills Analysis" />
          <Tab label="Achievements" />
          <Tab label="Recommendations" />
        </Tabs>
      </Box>

      {/* Module Progress Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Module Completion Status
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {progressData.detailed.modules?.map((module, index) => (
                    <Box key={module.id} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Module {module.id}: {module.name}
                        </Typography>
                        <Chip 
                          label={`${module.progress}%`} 
                          color={module.progress === 100 ? 'success' : module.progress > 0 ? 'primary' : 'default'}
                          size="small"
                        />
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={module.progress} 
                        sx={{ height: 8, borderRadius: 4, mb: 1 }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', typography: 'body2', color: 'text.secondary' }}>
                        <span>Accuracy: {module.accuracy}%</span>
                        <span>Time: {module.timeSpent}h</span>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Next Milestone
                </Typography>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <EmojiEvents sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {progressData.overview.nextMilestone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Estimated completion: {progressData.overview.estimatedCompletion}
                  </Typography>
                  <Button variant="contained" startIcon={<PlayArrow />} sx={{ mt: 2 }}>
                    Continue Learning
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Practice Streaks
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">Current Streak</Typography>
                  <Chip 
                    icon={<LocalFireDepartment />} 
                    label={`${progressData.streaks.current} days`} 
                    color="error"
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">Longest Streak</Typography>
                  <Chip 
                    icon={<Star />} 
                    label={`${progressData.streaks.longest} days`} 
                    color="warning"
                  />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" gutterBottom>Weekly Goal Progress</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(progressData.streaks.weeklyProgress / progressData.streaks.weeklyGoal) * 100} 
                  sx={{ height: 6, borderRadius: 3 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {progressData.streaks.weeklyProgress}/{progressData.streaks.weeklyGoal} days this week
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Skills Analysis Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Skill Breakdown
                </Typography>
                {progressData.detailed.skills?.map((skill, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1">{skill.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                          label={skill.trend} 
                          size="small" 
                          color={skill.trend.includes('+') ? 'success' : 'default'}
                          icon={skill.trend.includes('+') ? <TrendingUp /> : undefined}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {skill.level}%
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.level} 
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Areas for Improvement
                </Typography>
                {progressData.weaknesses.map((weakness, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: 'action.hover' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {weakness.area}
                      </Typography>
                      <Chip 
                        label={weakness.priority} 
                        size="small" 
                        color={weakness.priority === 'high' ? 'error' : weakness.priority === 'medium' ? 'warning' : 'default'}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Current accuracy: {weakness.accuracy}%
                    </Typography>
                    <Typography variant="body2">
                      💡 {weakness.improvement}
                    </Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Achievements Tab */}
      <TabPanel value={activeTab} index={2}>
        <Grid container spacing={3}>
          {progressData.achievements.map((achievement) => (
            <Grid item xs={12} sm={6} md={4} key={achievement.id}>
              <Card 
                sx={{ 
                  position: 'relative',
                  border: achievement.earned ? `2px solid ${getRarityColor(achievement.rarity)}` : '1px solid #e0e0e0',
                  opacity: achievement.earned ? 1 : 0.7
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: 60, 
                      height: 60, 
                      mx: 'auto', 
                      mb: 2,
                      bgcolor: achievement.earned ? getRarityColor(achievement.rarity) : 'grey.300',
                      fontSize: '2rem'
                    }}
                  >
                    {achievement.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {achievement.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {achievement.description}
                  </Typography>
                  
                  {achievement.earned ? (
                    <Chip 
                      icon={<CheckCircle />} 
                      label={`Earned ${achievement.date}`}
                      color="success"
                      size="small"
                    />
                  ) : (
                    <Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={achievement.progress || 0} 
                        sx={{ mb: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {achievement.progress || 0}% complete
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Recommendations Tab */}
      <TabPanel value={activeTab} index={3}>
        <Typography variant="h6" gutterBottom>
          Personalized Learning Recommendations
        </Typography>
        <Grid container spacing={3}>
          {progressData.recommendations.map((rec, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6">
                      {rec.title}
                    </Typography>
                    <Chip 
                      label={rec.priority} 
                      size="small" 
                      color={rec.priority === 'high' ? 'error' : rec.priority === 'medium' ? 'warning' : 'default'}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {rec.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      icon={<Timer />} 
                      label={rec.estimatedTime}
                      variant="outlined"
                      size="small"
                    />
                    <Button variant="contained" size="small">
                      Start Practice
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  )
}

export default AdvancedProgressTracker