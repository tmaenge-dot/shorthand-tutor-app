import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Tab,
  Tabs,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  Edit,
  Speed,
  Hearing,
  CheckCircle,
  PlayArrow,
  Stop,
  Refresh,
  Timer,
  TrendingUp
} from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import ShorthandCanvas from '../../components/ShorthandCanvas/ShorthandCanvas'
import { useUserProgress } from '../../hooks/useUserProgress'
import { useLessons } from '../../hooks/useLessons'
import { PracticeItem, DrawingStroke, CanvasState } from '../../types/index'

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
      id={`practice-tabpanel-${index}`}
      aria-labelledby={`practice-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const Practice: React.FC = () => {
  const { type } = useParams<{ type?: string }>()
  const [activeTab, setActiveTab] = useState(0)
  const [currentExercise, setCurrentExercise] = useState<PracticeItem | null>(null)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [userDrawing, setUserDrawing] = useState<CanvasState | null>(null)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [accuracy, setAccuracy] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])

  const { state: userProgressState, updatePracticeStats } = useUserProgress()
  const { lessons, currentLesson } = useLessons()

  // Sample practice exercises based on current module
  const getCurrentModuleExercises = (): PracticeItem[] => {
    const currentModule = userProgressState.currentModule || 'A'
    
    // This would normally come from the lesson data
    // For now, return sample exercises based on module
    switch (currentModule) {
      case 'A':
        return [
          {
            id: 'A_EX1',
            type: 'word',
            content: 'cat',
            shorthandSolution: 'K stroke + A dot + T stroke',
            difficulty: 'beginner',
            hints: ['Listen to the sounds: K-A-T', 'Use light strokes for K and T']
          },
          {
            id: 'A_EX2',
            type: 'word',
            content: 'phone',
            shorthandSolution: 'F curve + O dot + N stroke',
            difficulty: 'beginner',
            hints: ['PH makes one F sound', 'Silent E at the end']
          }
        ]
      case 'B':
        return [
          {
            id: 'B_EX1',
            type: 'word',
            content: 'pat',
            shorthandSolution: 'P stroke + A dot + T stroke',
            difficulty: 'beginner',
            hints: ['P is light downward', 'T is light upward', 'A dot at beginning']
          },
          {
            id: 'B_EX2',
            type: 'word',
            content: 'bit',
            shorthandSolution: 'B stroke + I dot + T stroke',
            difficulty: 'beginner',
            hints: ['B is heavy downward', 'I dot at end of stroke']
          }
        ]
      default:
        return [
          {
            id: 'SAMPLE_1',
            type: 'word',
            content: 'practice',
            shorthandSolution: 'Sample shorthand outline',
            difficulty: 'beginner',
            hints: ['Focus on stroke formation']
          }
        ]
    }
  }

  const practiceExercises = getCurrentModuleExercises()

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Initialize first exercise
  useEffect(() => {
    if (practiceExercises.length > 0 && !currentExercise) {
      setCurrentExercise(practiceExercises[0])
    }
  }, [practiceExercises, currentExercise])

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  // Start practice session
  const startPractice = () => {
    setTimer(0)
    setIsTimerRunning(true)
    setShowResults(false)
    setCompletedExercises([])
  }

  // Stop practice session
  const stopPractice = () => {
    setIsTimerRunning(false)
    evaluateDrawing()
  }

  // Evaluate user's drawing (simplified)
  const evaluateDrawing = () => {
    // This would implement actual stroke recognition
    // For now, generate a random accuracy score
    const randomAccuracy = Math.floor(Math.random() * 30) + 70 // 70-100%
    setAccuracy(randomAccuracy)
    setShowResults(true)
    
    // Update practice stats
    if (currentExercise) {
      updatePracticeStats(userProgressState.currentModule || 'A', {
        totalPracticeTime: (userProgressState.userProgress.find(p => p.moduleId === userProgressState.currentModule)?.practiceStats.totalPracticeTime || 0) + timer,
        wordsWritten: (userProgressState.userProgress.find(p => p.moduleId === userProgressState.currentModule)?.practiceStats.wordsWritten || 0) + 1,
        averageAccuracy: randomAccuracy,
        lastPracticeDate: new Date()
      })
      
      setCompletedExercises([...completedExercises, currentExercise.id])
    }
  }

  // Next exercise
  const nextExercise = () => {
    if (exerciseIndex < practiceExercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1)
      setCurrentExercise(practiceExercises[exerciseIndex + 1])
      setUserDrawing(null)
      setShowResults(false)
      setTimer(0)
    }
  }

  // Previous exercise
  const previousExercise = () => {
    if (exerciseIndex > 0) {
      setExerciseIndex(exerciseIndex - 1)
      setCurrentExercise(practiceExercises[exerciseIndex - 1])
      setUserDrawing(null)
      setShowResults(false)
      setTimer(0)
    }
  }

  // Handle canvas drawing
  const handleCanvasChange = (canvasState: CanvasState) => {
    setUserDrawing(canvasState)
  }

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Practice Exercises
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Improve your shorthand skills with interactive practice sessions
        </Typography>
      </Box>

      {/* Practice Type Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<Edit />} label="Stroke Practice" />
          <Tab icon={<Speed />} label="Speed Building" />
          <Tab icon={<Hearing />} label="Dictation" />
        </Tabs>
      </Paper>

      {/* Stroke Practice Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          {/* Exercise Selection */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Module {userProgressState.currentModule} Exercises
                </Typography>
                
                <List>
                  {practiceExercises.map((exercise, index) => (
                    <ListItem 
                      key={exercise.id}
                      button
                      selected={index === exerciseIndex}
                      onClick={() => {
                        setExerciseIndex(index)
                        setCurrentExercise(exercise)
                        setUserDrawing(null)
                        setShowResults(false)
                      }}
                    >
                      <ListItemIcon>
                        {completedExercises.includes(exercise.id) ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Edit />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={exercise.content}
                        secondary={`${exercise.type} - ${exercise.difficulty}`}
                      />
                      <Chip 
                        label={exercise.difficulty}
                        size="small"
                        color={exercise.difficulty === 'beginner' ? 'success' : 
                               exercise.difficulty === 'intermediate' ? 'warning' : 'error'}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Practice Area */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                {currentExercise && (
                  <>
                    {/* Exercise Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Write: "{currentExercise.content}"
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip 
                          icon={<Timer />}
                          label={formatTime(timer)}
                          color={isTimerRunning ? 'primary' : 'default'}
                        />
                        {isTimerRunning ? (
                          <Button
                            variant="outlined"
                            startIcon={<Stop />}
                            onClick={stopPractice}
                            color="error"
                            size="small"
                          >
                            Stop
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            startIcon={<PlayArrow />}
                            onClick={startPractice}
                            size="small"
                          >
                            Start
                          </Button>
                        )}
                      </Box>
                    </Box>

                    {/* Hints */}
                    {currentExercise.hints && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="500">Hints:</Typography>
                        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                          {currentExercise.hints.map((hint, index) => (
                            <li key={index}>
                              <Typography variant="body2">{hint}</Typography>
                            </li>
                          ))}
                        </ul>
                      </Alert>
                    )}

                    {/* Drawing Canvas */}
                    <ShorthandCanvas
                      width={550}
                      height={300}
                      onCanvasChange={handleCanvasChange}
                      showGrid={true}
                      comparisonMode={showResults}
                      className="practice-canvas"
                    />

                    {/* Navigation */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={previousExercise}
                        disabled={exerciseIndex === 0}
                      >
                        Previous
                      </Button>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          startIcon={<Refresh />}
                          onClick={() => {
                            setUserDrawing(null)
                            setShowResults(false)
                            setTimer(0)
                          }}
                        >
                          Reset
                        </Button>
                        
                        {!showResults && userDrawing && userDrawing.strokes.length > 0 && (
                          <Button
                            variant="contained"
                            onClick={evaluateDrawing}
                          >
                            Check
                          </Button>
                        )}
                      </Box>

                      <Button
                        variant="outlined"
                        onClick={nextExercise}
                        disabled={exerciseIndex === practiceExercises.length - 1}
                      >
                        Next
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Speed Building Tab */}
      <TabPanel value={activeTab} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Speed Building Exercises
            </Typography>
            <Alert severity="info">
              Speed building exercises coming soon! Focus on accuracy first, then gradually increase your writing speed.
            </Alert>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Dictation Tab */}
      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Dictation Exercises
            </Typography>
            <Alert severity="info">
              Dictation exercises will be available once audio functionality is implemented.
            </Alert>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Results Dialog */}
      <Dialog open={showResults} onClose={() => setShowResults(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp color="primary" />
            Practice Results
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h3" color="primary" gutterBottom>
              {accuracy}%
            </Typography>
            <Typography variant="h6" gutterBottom>
              Accuracy Score
            </Typography>
            
            <Box sx={{ my: 3 }}>
              <LinearProgress 
                variant="determinate" 
                value={accuracy} 
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">{formatTime(timer)}</Typography>
                  <Typography variant="body2" color="text.secondary">Time Taken</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">
                    {currentExercise?.difficulty || 'Beginner'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Difficulty</Typography>
                </Paper>
              </Grid>
            </Grid>

            {accuracy >= 90 && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Excellent work! You've mastered this exercise.
              </Alert>
            )}
            {accuracy >= 70 && accuracy < 90 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Good progress! Keep practicing to improve accuracy.
              </Alert>
            )}
            {accuracy < 70 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                More practice needed. Review the stroke formation and try again.
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResults(false)}>Close</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setShowResults(false)
              nextExercise()
            }}
            disabled={exerciseIndex === practiceExercises.length - 1}
          >
            Next Exercise
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Practice