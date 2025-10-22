import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button
} from '@mui/material'
import {
  TrendingUp,
  Speed,
  CheckCircle,
  School,
  RadioButtonUnchecked,
  Schedule,
  PlayArrow
} from '@mui/icons-material'
import { useLessons } from '@hooks/useLessons'
import { useUserProgress } from '@hooks/useUserProgress'
import { useNavigate } from 'react-router-dom'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`progress-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const SimpleProgress = () => {
  const [activeTab, setActiveTab] = useState(0)
  const navigate = useNavigate()
  const { lessons } = useLessons()
  const { 
    getOverallProgress, 
    getCurrentSpeed, 
    getCurrentAccuracy,
    getUserProgressForModule 
  } = useUserProgress()

  const overallProgress = getOverallProgress()
  const currentSpeed = getCurrentSpeed()
  const currentAccuracy = getCurrentAccuracy()

  // Helper function to check if a module is completed
  const isModuleCompleted = (moduleId) => {
    const moduleProgress = getUserProgressForModule(moduleId)
    if (!moduleProgress) return false
    
    // Check if the module has a passed theory check
    return moduleProgress.theoryCheckResults.some(result => result.passed)
  }

  // Helper function to check if a module has practice activity
  const hasModulePractice = (moduleId) => {
    const moduleProgress = getUserProgressForModule(moduleId)
    if (!moduleProgress) return false
    
    // Check if there's any practice activity (speed development records or lesson progress)
    return moduleProgress.speedDevelopment.length > 0 || 
           moduleProgress.lessonProgress.length > 0 ||
           moduleProgress.practiceStats.totalPracticeTime > 0
  }

  // Helper function to get module completion status
  const getModuleStatus = (moduleId) => {
    const completed = isModuleCompleted(moduleId)
    const hasPractice = hasModulePractice(moduleId)
    
    if (completed) return { status: 'completed', label: 'Completed', color: 'success' }
    if (hasPractice) return { status: 'in-progress', label: 'In Progress', color: 'warning' }
    return { status: 'not-started', label: 'Not Started', color: 'default' }
  }

  // Helper function to get the appropriate icon for module status
  const getModuleIcon = (moduleId) => {
    const completed = isModuleCompleted(moduleId)
    const hasPractice = hasModulePractice(moduleId)
    
    if (completed) return <CheckCircle color="success" />
    if (hasPractice) return <Schedule color="warning" />
    return <RadioButtonUnchecked color="disabled" />
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Progress Tracking
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Monitor your shorthand learning journey
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="600" color="primary">
                {overallProgress.percentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={overallProgress.percentage} 
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Speed color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="600" color="success.main">
                {currentSpeed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Speed (WPM)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="600" color="info.main">
                {currentAccuracy}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Accuracy
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <School color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="600" color="warning.main">
                {overallProgress.completed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modules Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<School />} label="Module Progress" />
          <Tab icon={<Speed />} label="Speed Development" />
          <Tab icon={<TrendingUp />} label="Achievements" />
        </Tabs>
      </Paper>

      {/* Module Progress Tab */}
      <TabPanel value={activeTab} index={0}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Module Completion Status
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Track your progress through the 22-module NCS Pitman Shorthand curriculum
            </Typography>
            
            {/* Summary Stats */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                  <Typography variant="h6" color="success.contrastText">
                    {lessons.filter(lesson => isModuleCompleted(lesson.id)).length}
                  </Typography>
                  <Typography variant="body2" color="success.contrastText">
                    Completed
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                  <Typography variant="h6" color="warning.contrastText">
                    {lessons.filter(lesson => hasModulePractice(lesson.id) && !isModuleCompleted(lesson.id)).length}
                  </Typography>
                  <Typography variant="body2" color="warning.contrastText">
                    In Progress
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.200', borderRadius: 1 }}>
                  <Typography variant="h6">
                    {lessons.filter(lesson => !hasModulePractice(lesson.id)).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Not Started
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Semester 1 Modules */}
            <Typography variant="h6" gutterBottom>
              Semester 1 (Weeks 1-12)
            </Typography>
            <List>
              {lessons.filter(lesson => lesson.semester === 1).map((lesson) => {
                const moduleStatus = getModuleStatus(lesson.id)
                const moduleProgress = getUserProgressForModule(lesson.id)
                
                return (
                  <ListItem key={lesson.id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
                    <ListItemIcon>
                      {getModuleIcon(lesson.id)}
                    </ListItemIcon>
                    <ListItemText
                      primary={`Module ${lesson.id}: ${lesson.title}`}
                      secondary={`Week ${lesson.weekNumber} • Target: ${lesson.speedTarget} WPM${moduleProgress && moduleProgress.practiceStats.totalPracticeTime > 0 ? ` • Practice: ${Math.round(moduleProgress.practiceStats.totalPracticeTime)} min` : ''}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={moduleStatus.label} 
                        size="small" 
                        color={moduleStatus.color}
                      />
                      {moduleStatus.status === 'not-started' && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<PlayArrow />}
                          onClick={() => navigate(`/practice/${lesson.id}`)}
                        >
                          Start
                        </Button>
                      )}
                      {moduleStatus.status === 'in-progress' && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`/assessment/${lesson.id}`)}
                        >
                          Take Test
                        </Button>
                      )}
                      {moduleStatus.status === 'completed' && (
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => navigate(`/practice/${lesson.id}`)}
                        >
                          Review
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                )
              })}
            </List>

            {/* Semester 2 Modules */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Semester 2 (Weeks 13-22)
            </Typography>
            <List>
              {lessons.filter(lesson => lesson.semester === 2).map((lesson) => {
                const moduleStatus = getModuleStatus(lesson.id)
                const moduleProgress = getUserProgressForModule(lesson.id)
                
                return (
                  <ListItem key={lesson.id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
                    <ListItemIcon>
                      {getModuleIcon(lesson.id)}
                    </ListItemIcon>
                    <ListItemText
                      primary={`Module ${lesson.id}: ${lesson.title}`}
                      secondary={`Week ${lesson.weekNumber} • Target: ${lesson.speedTarget} WPM${moduleProgress && moduleProgress.practiceStats.totalPracticeTime > 0 ? ` • Practice: ${Math.round(moduleProgress.practiceStats.totalPracticeTime)} min` : ''}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={moduleStatus.label} 
                        size="small" 
                        color={moduleStatus.color}
                      />
                      {moduleStatus.status === 'not-started' && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<PlayArrow />}
                          onClick={() => navigate(`/practice/${lesson.id}`)}
                        >
                          Start
                        </Button>
                      )}
                      {moduleStatus.status === 'in-progress' && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`/assessment/${lesson.id}`)}
                        >
                          Take Test
                        </Button>
                      )}
                      {moduleStatus.status === 'completed' && (
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => navigate(`/practice/${lesson.id}`)}
                        >
                          Review
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                )
              })}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Speed Development Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Speed Progress
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Current: {currentSpeed} WPM
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(currentSpeed / 30) * 100} 
                    sx={{ mt: 1, height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Target: 30 WPM for professional certification
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Accuracy Progress
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Current: {currentAccuracy}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={currentAccuracy} 
                    sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    color={currentAccuracy >= 95 ? 'success' : 'primary'}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Target: 95% for assessment passing
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Achievements Tab */}
      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Achievements
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete modules and assessments to earn achievements and track your progress.
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1">
                🏆 Keep learning to unlock achievements!
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  )
}

export default SimpleProgress