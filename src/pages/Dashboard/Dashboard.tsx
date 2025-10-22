import React, { useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Alert
} from '@mui/material'
import {
  PlayArrow,
  Assignment,
  TrendingUp,
  Schedule,
  CheckCircle,
  RadioButtonUnchecked,
  Speed,
  BarChart,
  School,
  MenuBook
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useUserProgress } from '../../hooks/useUserProgress'
import { useLessons } from '../../hooks/useLessons'

const Dashboard: React.FC = () => {
  const { 
    state: userProgressState, 
    getOverallProgress, 
    getCurrentSpeed, 
    getCurrentAccuracy,
    initializeUser 
  } = useUserProgress()
  const { lessons, getLessonById } = useLessons()

  const overallProgress = getOverallProgress()
  const currentSpeed = getCurrentSpeed()
  const currentAccuracy = getCurrentAccuracy()
  const currentLesson = getLessonById(userProgressState.currentModule || 'A')

  // Initialize user if not already done
  useEffect(() => {
    if (!userProgressState.user) {
      initializeUser({
        name: 'Student',
        currentModule: 'A'
      })
    }
  }, [userProgressState.user, initializeUser])

  // Get recent activity
  const getRecentActivity = () => {
    const activities: any[] = []
    
    userProgressState.userProgress.forEach(progress => {
      // Add completed lessons
      progress.lessonProgress.forEach(lesson => {
        if (lesson.completed) {
          activities.push({
            type: 'lesson',
            moduleId: progress.moduleId,
            title: `Completed lesson in Module ${progress.moduleId}`,
            date: lesson.completedAt || new Date(),
            accuracy: lesson.accuracy
          })
        }
      })
      
      // Add theory check results
      progress.theoryCheckResults.forEach(result => {
        activities.push({
          type: 'theory-check',
          moduleId: progress.moduleId,
          title: `Theory Check ${progress.moduleId} - ${result.passed ? 'Passed' : 'Failed'}`,
          date: result.completedAt,
          score: result.score,
          passed: result.passed
        })
      })
    })
    
    return activities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5)
  }

  const recentActivity = getRecentActivity()

  // Get upcoming deadlines (theory checks)
  const getUpcomingDeadlines = () => {
    const incomplete = userProgressState.userProgress.filter(progress => 
      !progress.theoryCheckResults.some(result => result.passed)
    )
    
    return incomplete.slice(0, 3).map(progress => {
      const lesson = getLessonById(progress.moduleId)
      return {
        moduleId: progress.moduleId,
        title: lesson?.title || `Module ${progress.moduleId}`,
        weekNumber: lesson?.weekNumber || 0,
        type: 'Theory Check'
      }
    })
  }

  const upcomingDeadlines = getUpcomingDeadlines()

  if (userProgressState.isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Loading Dashboard...</Typography>
        <LinearProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Welcome back, {userProgressState.user?.name || 'Student'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Continue your shorthand learning journey. You're currently on Module {userProgressState.currentModule}.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Current Lesson Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <School />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    Current Lesson: Module {currentLesson?.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentLesson?.title}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="body1" paragraph>
                {currentLesson?.description}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Learning Objectives:
                </Typography>
                <List dense>
                  {currentLesson?.objectives.slice(0, 3).map((objective, index) => (
                    <ListItem key={index} sx={{ py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={objective}
                        primaryTypographyProps={{ fontSize: '0.875rem' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
            
            <CardActions>
              <Button 
                variant="contained" 
                startIcon={<PlayArrow />}
                component={Link}
                to={`/practice/${currentLesson?.id}`}
                size="large"
              >
                Continue Learning
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Assignment />}
                component={Link}
                to="/practice"
              >
                Practice Exercises
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Progress Overview */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Your Progress
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Overall Completion</Typography>
                  <Typography variant="body2" fontWeight="500">
                    {overallProgress.percentage}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={overallProgress.percentage} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {overallProgress.completed} of {overallProgress.total} modules completed
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                    <Speed sx={{ fontSize: 30, mb: 1 }} />
                    <Typography variant="h6" fontWeight="600">
                      {currentSpeed}
                    </Typography>
                    <Typography variant="caption">
                      WPM Speed
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light', color: 'white' }}>
                    <BarChart sx={{ fontSize: 30, mb: 1 }} />
                    <Typography variant="h6" fontWeight="600">
                      {currentAccuracy}%
                    </Typography>
                    <Typography variant="caption">
                      Accuracy
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Quick Actions
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<School />}
                    component={Link}
                    to="/practice"
                    sx={{ py: 2 }}
                  >
                    Practice
                  </Button>
                </Grid>
                
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Assignment />}
                    component={Link}
                    to="/assessment"
                    sx={{ py: 2 }}
                  >
                    Take Test
                  </Button>
                </Grid>
                
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<TrendingUp />}
                    component={Link}
                    to="/progress"
                    sx={{ py: 2 }}
                  >
                    View Progress
                  </Button>
                </Grid>
                
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<MenuBook />}
                    component={Link}
                    to="/resources"
                    sx={{ py: 2 }}
                  >
                    Resources
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Deadlines */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Upcoming Deadlines
              </Typography>
              
              {upcomingDeadlines.length > 0 ? (
                <List>
                  {upcomingDeadlines.map((deadline, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Schedule color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${deadline.type} - Module ${deadline.moduleId}`}
                        secondary={deadline.title}
                      />
                      <Chip 
                        label={`Week ${deadline.weekNumber}`}
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Great job! You're up to date with all assessments.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Recent Activity
              </Typography>
              
              {recentActivity.length > 0 ? (
                <List>
                  {recentActivity.map((activity, index) => (
                    <ListItem key={index} sx={{ px: 0, borderBottom: index < recentActivity.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                      <ListItemIcon>
                        {activity.type === 'lesson' ? (
                          <School color="primary" />
                        ) : (
                          <Assignment color={activity.passed ? 'success' : 'error'} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.title}
                        secondary={activity.date.toLocaleDateString()}
                      />
                      {activity.type === 'theory-check' && (
                        <Chip 
                          label={`${activity.score}%`}
                          size="small"
                          color={activity.passed ? 'success' : 'error'}
                        />
                      )}
                      {activity.type === 'lesson' && activity.accuracy && (
                        <Chip 
                          label={`${activity.accuracy}% accuracy`}
                          size="small"
                          color="info"
                        />
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Alert severity="info">
                  Start learning to see your activity here!
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard