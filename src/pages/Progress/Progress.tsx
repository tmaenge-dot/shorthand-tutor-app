import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tab,
  Tabs,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert
} from '@mui/material'
import {
  TrendingUp,
  Speed,
  BarChart,
  CheckCircle,
  Cancel,
  Timer,
  Assignment,
  School,
  EmojiEvents,
  CalendarToday
} from '@mui/icons-material'
import { useUserProgress } from '../../hooks/useUserProgress'
import { useLessons } from '../../hooks/useLessons'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`progress-tabpanel-${index}`}
      aria-labelledby={`progress-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  )
}

const Progress: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  
  const { 
    state: userProgressState, 
    getOverallProgress, 
    getCurrentSpeed, 
    getCurrentAccuracy 
  } = useUserProgress()
  const { lessons } = useLessons()

  const overallProgress = getOverallProgress()
  const currentSpeed = getCurrentSpeed()
  const currentAccuracy = getCurrentAccuracy()

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  // Calculate module progress details
  const getModuleProgressData = () => {
    return lessons.map(lesson => {
      const moduleProgress = userProgressState.userProgress.find(p => p.moduleId === lesson.id)
      const theoryCheckPassed = moduleProgress?.theoryCheckResults.some(r => r.passed) || false
      const lessonsCompleted = moduleProgress?.lessonProgress.filter(lp => lp.completed).length || 0
      const totalLessons = lesson.content.length
      const averageAccuracy = moduleProgress?.practiceStats.averageAccuracy || 0
      const timeSpent = moduleProgress?.practiceStats.totalPracticeTime || 0

      return {
        moduleId: lesson.id,
        title: lesson.title,
        weekNumber: lesson.weekNumber,
        semester: lesson.semester,
        theoryCheckPassed,
        lessonsCompleted,
        totalLessons,
        completionPercentage: totalLessons > 0 ? Math.round((lessonsCompleted / totalLessons) * 100) : 0,
        averageAccuracy,
        timeSpent,
        lastAccessed: moduleProgress?.lastAccessed || new Date()
      }
    })
  }

  const moduleProgressData = getModuleProgressData()

  // Get recent achievements
  const getRecentAchievements = () => {
    const achievements = []
    
    // Check for completed modules
    moduleProgressData.forEach(module => {
      if (module.theoryCheckPassed) {
        achievements.push({
          title: `Module ${module.moduleId} Completed`,
          description: `Passed theory check for ${module.title}`,
          date: module.lastAccessed,
          type: 'completion',
          icon: <CheckCircle color="success" />
        })
      }
    })

    // Check for speed milestones
    if (currentSpeed >= 30) {
      achievements.push({
        title: 'Speed Master',
        description: 'Achieved 30+ WPM writing speed',
        date: new Date(),
        type: 'speed',
        icon: <Speed color="primary" />
      })
    } else if (currentSpeed >= 20) {
      achievements.push({
        title: 'Speed Improver',
        description: 'Achieved 20+ WPM writing speed',
        date: new Date(),
        type: 'speed',
        icon: <Speed color="secondary" />
      })
    }

    // Check for accuracy achievements
    if (currentAccuracy >= 95) {
      achievements.push({
        title: 'Accuracy Expert',
        description: 'Maintained 95%+ accuracy',
        date: new Date(),
        type: 'accuracy',
        icon: <BarChart color="success" />
      })
    }

    return achievements
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5)
  }

  const recentAchievements = getRecentAchievements()

  // Get speed development data
  const getSpeedDevelopmentData = () => {
    const allSpeedRecords = userProgressState.userProgress
      .flatMap(progress => progress.speedDevelopment)
      .sort((a, b) => a.date.getTime() - b.date.getTime())

    // Group by week for trend analysis
    const weeklyData = []
    const now = new Date()
    
    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000))
      const weekEnd = new Date(weekStart.getTime() + (7 * 24 * 60 * 60 * 1000))
      
      const weekRecords = allSpeedRecords.filter(record => 
        record.date >= weekStart && record.date < weekEnd
      )
      
      if (weekRecords.length > 0) {
        const avgSpeed = weekRecords.reduce((sum, record) => sum + record.speed, 0) / weekRecords.length
        const avgAccuracy = weekRecords.reduce((sum, record) => sum + record.accuracy, 0) / weekRecords.length
        
        weeklyData.push({
          week: `Week ${12 - i}`,
          speed: Math.round(avgSpeed),
          accuracy: Math.round(avgAccuracy),
          records: weekRecords.length
        })
      }
    }
    
    return weeklyData
  }

  const speedDevelopmentData = getSpeedDevelopmentData()

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Progress Tracking
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor your shorthand learning journey and achievements
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', margin: '0 auto', mb: 2 }}>
                <TrendingUp />
              </Avatar>
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
              <Avatar sx={{ bgcolor: 'success.main', margin: '0 auto', mb: 2 }}>
                <Speed />
              </Avatar>
              <Typography variant="h4" fontWeight="600" color="success.main">
                {currentSpeed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Speed (WPM)
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Target: 30 WPM
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'info.main', margin: '0 auto', mb: 2 }}>
                <BarChart />
              </Avatar>
              <Typography variant="h4" fontWeight="600" color="info.main">
                {currentAccuracy}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Accuracy
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Target: 95%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'warning.main', margin: '0 auto', mb: 2 }}>
                <CheckCircle />
              </Avatar>
              <Typography variant="h4" fontWeight="600" color="warning.main">
                {overallProgress.completed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modules Completed
              </Typography>
              <Typography variant="caption" color="text.secondary">
                of {overallProgress.total} total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<School />} label="Module Progress" />
          <Tab icon={<TrendingUp />} label="Speed Development" />
          <Tab icon={<EmojiEvents />} label="Achievements" />
        </Tabs>
      </Paper>

      {/* Module Progress Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Detailed Module Progress
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Module</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Week</TableCell>
                        <TableCell>Semester</TableCell>
                        <TableCell>Lessons</TableCell>
                        <TableCell>Theory Check</TableCell>
                        <TableCell>Accuracy</TableCell>
                        <TableCell>Time Spent</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {moduleProgressData.map((module) => (
                        <TableRow key={module.moduleId}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6">{module.moduleId}</Typography>
                              {module.theoryCheckPassed && (
                                <CheckCircle color="success" fontSize="small" />
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>{module.title}</TableCell>
                          <TableCell>{module.weekNumber}</TableCell>
                          <TableCell>
                            <Chip 
                              label={`S${module.semester}`}
                              size="small"
                              color={module.semester === 1 ? 'primary' : 'secondary'}
                            />
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="body2">
                                {module.lessonsCompleted}/{module.totalLessons}
                              </Typography>
                              <LinearProgress 
                                variant="determinate" 
                                value={module.completionPercentage} 
                                sx={{ width: 80, height: 4 }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={module.theoryCheckPassed ? 'Passed' : 'Pending'}
                              size="small"
                              color={module.theoryCheckPassed ? 'success' : 'default'}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {module.averageAccuracy > 0 ? `${module.averageAccuracy}%` : '-'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {module.timeSpent > 0 ? `${Math.round(module.timeSpent / 60)}h` : '-'}
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
      </TabPanel>

      {/* Speed Development Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Speed Development Trend
                </Typography>
                
                {speedDevelopmentData.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Period</TableCell>
                          <TableCell>Average Speed (WPM)</TableCell>
                          <TableCell>Average Accuracy (%)</TableCell>
                          <TableCell>Practice Sessions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {speedDevelopmentData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell>{data.week}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography>{data.speed}</Typography>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={(data.speed / 30) * 100} // Assuming 30 WPM target
                                  sx={{ width: 60, height: 4 }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography>{data.accuracy}%</Typography>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={data.accuracy} 
                                  sx={{ width: 60, height: 4 }}
                                  color={data.accuracy >= 95 ? 'success' : 'primary'}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>{data.records}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info">
                    Start practicing to see your speed development trends!
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Speed Targets
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Timer color={currentSpeed >= 5 ? 'success' : 'disabled'} />
                    </ListItemIcon>
                    <ListItemText
                      primary="5 WPM - Beginner"
                      secondary="Basic stroke formation"
                    />
                    {currentSpeed >= 5 && <CheckCircle color="success" />}
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Timer color={currentSpeed >= 15 ? 'success' : 'disabled'} />
                    </ListItemIcon>
                    <ListItemText
                      primary="15 WPM - Intermediate"
                      secondary="Smooth combinations"
                    />
                    {currentSpeed >= 15 && <CheckCircle color="success" />}
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Timer color={currentSpeed >= 30 ? 'success' : 'disabled'} />
                    </ListItemIcon>
                    <ListItemText
                      primary="30 WPM - Professional"
                      secondary="Examination ready"
                    />
                    {currentSpeed >= 30 && <CheckCircle color="success" />}
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Achievements Tab */}
      <TabPanel value={activeTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Achievements
                </Typography>
                
                {recentAchievements.length > 0 ? (
                  <List>
                    {recentAchievements.map((achievement, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {achievement.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={achievement.title}
                          secondary={
                            <Box>
                              <Typography variant="body2">{achievement.description}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {achievement.date.toLocaleDateString()}
                              </Typography>
                            </Box>
                          }
                        />
                        <Chip 
                          label={achievement.type}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Alert severity="info">
                    Complete modules and practice regularly to earn achievements!
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Achievement Categories
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <EmojiEvents color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Module Completion"
                      secondary="Complete theory checks"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Speed color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Speed Milestones"
                      secondary="Reach WPM targets"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <BarChart color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Accuracy Mastery"
                      secondary="Maintain high accuracy"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Consistency"
                      secondary="Daily practice streaks"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  )
}

export default Progress