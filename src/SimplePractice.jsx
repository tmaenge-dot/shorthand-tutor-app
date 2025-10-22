import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Tab,
  Tabs,
  Paper
} from '@mui/material'
import {
  School,
  PlayArrow,
  Assignment
} from '@mui/icons-material'
import { useLessons } from '@hooks/useLessons'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`practice-tabpanel-${index}`}
      aria-labelledby={`practice-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const SimplePractice = () => {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const { lessons } = useLessons()

  // Find the specific lesson if lessonId is provided
  const currentLesson = lessonId ? lessons.find(lesson => lesson.id === lessonId) : null
  
  // If lesson is not found, show error
  if (lessonId && !currentLesson) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" color="error" gutterBottom>
          Lesson Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The lesson with ID "{lessonId}" could not be found.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/practice')}>
          Back to Modules
        </Button>
      </Box>
    )
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleModuleClick = (lessonId) => {
    navigate(`/practice/${lessonId}`)
  }

  return (
    <Box sx={{ p: 3 }}>
      {currentLesson ? (
        // Specific Lesson View
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="600">
            Module {currentLesson.id} - {currentLesson.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Semester {currentLesson.semester} • Week {currentLesson.weekNumber} • Target Speed: {currentLesson.speedTarget} WPM
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lesson Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {currentLesson.description}
              </Typography>
              
              {currentLesson.content && currentLesson.content.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Lesson Content
                  </Typography>
                  {currentLesson.content.slice(0, 2).map((contentItem, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="subtitle2">{contentItem.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contentItem.content.substring(0, 200)}...
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Learning Objectives
              </Typography>
              {currentLesson.objectives && currentLesson.objectives.length > 0 ? (
                currentLesson.objectives.map((objective, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    • {objective}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No specific objectives listed for this module.
                </Typography>
              )}

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Activities & Exercises
              </Typography>
              {currentLesson.activities && currentLesson.activities.length > 0 ? (
                currentLesson.activities.map((activity, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">{activity.title}:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Type: {activity.type} • Target Accuracy: {activity.targetAccuracy}%
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Activities are being prepared for this module.
                </Typography>
              )}

              <Box sx={{ mt: 3 }}>
                <Button 
                  variant="contained" 
                  sx={{ mr: 2 }}
                  onClick={() => {
                    // Navigate to practice session for this specific module
                    navigate(`/speed-development/${currentLesson.id}`);
                  }}
                >
                  Start Practice
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{ mr: 2 }}
                  onClick={() => {
                    // Navigate to assessment for this module
                    navigate(`/assessment/${currentLesson.id}`);
                  }}
                >
                  Take Assessment
                </Button>
                <Button variant="text" onClick={() => navigate('/practice')}>
                  Back to Modules
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        // Module Selection View
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="600">
            Practice Sessions
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Interactive shorthand exercises and activities
          </Typography>

          {/* Practice Type Selection */}
          <Paper sx={{ mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
              <Tab icon={<School />} label="Module Practice" />
              <Tab icon={<Assignment />} label="Stroke Practice" />
              <Tab icon={<PlayArrow />} label="Interactive Canvas" />
            </Tabs>
          </Paper>

      {/* Module Practice Tab */}
      <TabPanel value={activeTab} index={0}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          NCS Pitman Shorthand Curriculum - All {lessons.length} Modules
        </Typography>
        
        {/* Semester 1 Modules */}
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 3, mb: 2 }}>
          Semester 1 (Weeks 1-12)
        </Typography>
        <Grid container spacing={2}>
          {lessons.filter(lesson => lesson.semester === 1).map((lesson) => (
            <Grid item xs={12} sm={6} md={3} key={lesson.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Module {lesson.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem' }}>
                    {lesson.title}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                    Week {lesson.weekNumber} • Target: {lesson.speedTarget} WPM
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<School />}
                    size="small"
                    onClick={() => handleModuleClick(lesson.id)}
                  >
                    Practice Module
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Semester 2 Modules */}
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Semester 2 (Weeks 13-22)
        </Typography>
        <Grid container spacing={2}>
          {lessons.filter(lesson => lesson.semester === 2).map((lesson) => (
            <Grid item xs={12} sm={6} md={3} key={lesson.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Module {lesson.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem' }}>
                    {lesson.title}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                    Week {lesson.weekNumber} • Target: {lesson.speedTarget} WPM
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<School />}
                    size="small"
                    color="secondary"
                    onClick={() => handleModuleClick(lesson.id)}
                  >
                    Practice Module
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Stroke Practice Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Basic Strokes
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Practice fundamental shorthand strokes
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => navigate('/speed-development')}
                >
                  Start Basic Practice
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Advanced Combinations
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Practice complex stroke combinations
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => navigate('/speed-development')}
                >
                  Start Advanced Practice
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Interactive Canvas Tab */}
      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Interactive Drawing Canvas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Practice shorthand strokes with our interactive canvas
            </Typography>
            
            <Box 
              sx={{ 
                border: 2, 
                borderColor: 'grey.300', 
                borderStyle: 'dashed',
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Canvas Loading... (Interactive drawing area)
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained">Clear Canvas</Button>
              <Button variant="outlined">Undo</Button>
              <Button variant="outlined">Redo</Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
        </Box>
      )}
    </Box>
  )
}

export default SimplePractice