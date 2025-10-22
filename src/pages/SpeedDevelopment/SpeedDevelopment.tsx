import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  LinearProgress,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  Stop,
  Timer,
  Speed,
  TrendingUp,
  CheckCircle,
  Warning,
  VolumeUp,
  Mic,
  Assignment
} from '@mui/icons-material'
import { useUserProgress } from '../../hooks/useUserProgress'
import ShorthandCanvas from '../../components/ShorthandCanvas/ShorthandCanvas'
import AudioDictation from '../../components/AudioDictation/AudioDictation'
import { dictationTexts } from '../../data/dictationTexts'

interface SpeedExercise {
  id: string
  title: string
  targetSpeed: number
  duration: number
  content: string
  audio?: string
  instructions: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface TimedSession {
  startTime: Date
  duration: number
  targetSpeed: number
  wordsWritten: number
  accuracy: number
  isActive: boolean
}

const SpeedDevelopment: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<SpeedExercise | null>(null)
  const [timedSession, setTimedSession] = useState<TimedSession | null>(null)
  const [targetSpeed, setTargetSpeed] = useState(15)
  const [sessionType, setSessionType] = useState<'practice' | 'dictation' | 'guided'>('practice')
  const [showInstructions, setShowInstructions] = useState(false)
  const [currentStroke, setCurrentStroke] = useState('')
  const [currentWord, setCurrentWord] = useState('')
  const [wordsCompleted, setWordsCompleted] = useState(0)
  const [totalWords, setTotalWords] = useState(0)
  const [sessionResults, setSessionResults] = useState<any>(null)
  
  // Audio dictation state
  const [selectedDictation, setSelectedDictation] = useState(null)
  const [isDictationOpen, setIsDictationOpen] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const canvasRef = useRef<any>(null)
  
  const { 
    state: userProgressState, 
    // updateSpeedDevelopment, // TODO: Fix this method
    getCurrentSpeed, 
    getCurrentAccuracy 
  } = useUserProgress()

  const currentSpeed = getCurrentSpeed()
  const currentAccuracy = getCurrentAccuracy()

  // Speed development exercises
  const speedExercises: SpeedExercise[] = [
    {
      id: 'basic-strokes',
      title: 'Basic Stroke Practice',
      targetSpeed: 10,
      duration: 5,
      content: 'the and but for you are was his her him them this that with from have been said what when where who how why',
      instructions: 'Practice basic strokes at a steady rhythm. Focus on consistent form rather than speed.',
      difficulty: 'beginner'
    },
    {
      id: 'common-words',
      title: 'Common Words',
      targetSpeed: 15,
      duration: 10,
      content: 'which would there their could should other after first never under might still where while these those about before against between during through without within myself yourself himself herself itself ourselves yourselves themselves something anything everything nothing somebody anybody everybody nobody someone anyone everyone',
      instructions: 'Write common words smoothly. Maintain consistent spacing and stroke thickness.',
      difficulty: 'intermediate'
    },
    {
      id: 'business-terms',
      title: 'Business Terminology',
      targetSpeed: 20,
      duration: 15,
      content: 'company business organization department management administration correspondence secretary assistant executive director manager supervisor employee committee meeting conference discussion decision agreement contract document report statement account invoice receipt payment delivery shipment customer client service quality standard procedure policy regulation requirement specification information communication',
      instructions: 'Practice business vocabulary at professional speed. Focus on clarity and accuracy.',
      difficulty: 'advanced'
    },
    {
      id: 'speed-building',
      title: 'Speed Building Exercise',
      targetSpeed: 25,
      duration: 20,
      content: 'The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet and is perfect for speed development. Practice writing this sentence repeatedly to build muscle memory and increase your writing speed while maintaining accuracy.',
      instructions: 'Rapid repetition exercise. Push your speed while maintaining legible strokes.',
      difficulty: 'advanced'
    },
    {
      id: 'exam-preparation',
      title: 'Exam Speed Target',
      targetSpeed: 30,
      duration: 30,
      content: 'Professional shorthand examination requires consistent speed of thirty words per minute with minimum ninety-five percent accuracy. Students must demonstrate competency across various text types including business correspondence technical documentation and general dictation materials. Regular practice sessions focusing on speed development accuracy maintenance and endurance building are essential for examination success.',
      instructions: 'Professional exam standard. Maintain 30 WPM with 95% accuracy for full duration.',
      difficulty: 'advanced'
    }
  ]

  // Start a timed session
  const startTimedSession = (exercise: SpeedExercise) => {
    if (timedSession?.isActive) {
      stopTimedSession()
    }

    const words = exercise.content.split(' ')
    setTotalWords(words.length)
    setWordsCompleted(0)
    setCurrentWord(words[0] || '')
    
    const newSession: TimedSession = {
      startTime: new Date(),
      duration: exercise.duration * 60, // Convert to seconds
      targetSpeed: exercise.targetSpeed,
      wordsWritten: 0,
      accuracy: 100,
      isActive: true
    }
    
    setTimedSession(newSession)
    setSelectedExercise(exercise)
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimedSession(prev => {
        if (!prev || !prev.isActive) return prev
        
        const elapsed = (Date.now() - prev.startTime.getTime()) / 1000
        if (elapsed >= prev.duration) {
          finishTimedSession(prev)
          return { ...prev, isActive: false }
        }
        
        return prev
      })
    }, 1000)
  }

  // Stop the current session
  const stopTimedSession = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    if (timedSession) {
      finishTimedSession(timedSession)
    }
    
    setTimedSession(null)
    setSelectedExercise(null)
  }

  // Finish and save session results
  const finishTimedSession = (session: TimedSession) => {
    const elapsed = (Date.now() - session.startTime.getTime()) / 1000
    const actualSpeed = Math.round((wordsCompleted / elapsed) * 60)
    const accuracy = Math.min(100, Math.max(0, 100 - (totalWords - wordsCompleted) * 2))
    
    const results = {
      exerciseId: selectedExercise?.id || '',
      targetSpeed: session.targetSpeed,
      actualSpeed,
      accuracy,
      duration: elapsed,
      wordsCompleted,
      totalWords,
      date: new Date()
    }
    
    setSessionResults(results)
    
    // Update user progress
    // TODO: Fix updateSpeedDevelopment method
    // updateSpeedDevelopment({
    //   speed: actualSpeed,
    //   accuracy,
    //   date: new Date(),
    //   duration: elapsed
    // })
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Dictation handlers
  const handleStartDictation = (dictationText: any) => {
    setSelectedDictation(dictationText)
    setIsDictationOpen(true)
  }

  const handleDictationComplete = (dictationId: string, accuracy: number) => {
    // Update user progress with dictation results
    setIsDictationOpen(false)
    setSelectedDictation(null)
  }

  // Handle word completion
  const handleWordCompleted = () => {
    if (!selectedExercise || !timedSession?.isActive) return
    
    const words = selectedExercise.content.split(' ')
    const nextIndex = wordsCompleted + 1
    
    setWordsCompleted(nextIndex)
    
    if (nextIndex < words.length) {
      setCurrentWord(words[nextIndex])
    } else {
      // All words completed
      finishTimedSession(timedSession)
    }
  }

  // Calculate current session stats
  const getCurrentSessionStats = () => {
    if (!timedSession?.isActive) return null
    
    const elapsed = (Date.now() - timedSession.startTime.getTime()) / 1000
    const currentSpeed = elapsed > 0 ? Math.round((wordsCompleted / elapsed) * 60) : 0
    const progress = (elapsed / timedSession.duration) * 100
    const remainingTime = Math.max(0, timedSession.duration - elapsed)
    
    return {
      currentSpeed,
      progress: Math.min(100, progress),
      remainingTime: Math.ceil(remainingTime),
      wordsRemaining: totalWords - wordsCompleted
    }
  }

  const sessionStats = getCurrentSessionStats()

  // Get recommended exercises based on current skill level
  const getRecommendedExercises = () => {
    if (currentSpeed < 10) {
      return speedExercises.filter(ex => ex.difficulty === 'beginner')
    } else if (currentSpeed < 20) {
      return speedExercises.filter(ex => ex.difficulty === 'beginner' || ex.difficulty === 'intermediate')
    } else {
      return speedExercises
    }
  }

  const recommendedExercises = getRecommendedExercises()

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Speed Development
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Build your shorthand writing speed with timed exercises and guided practice
        </Typography>
      </Box>

      {/* Current Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Speed color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="600" color="primary">
                {currentSpeed} WPM
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Speed
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(currentSpeed / 30) * 100} 
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Timer color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="600" color="success.main">
                {Math.round((userProgressState.userProgress.reduce((sum, p) => sum + p.practiceStats.totalPracticeTime, 0)) / 60)}h
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Practice Time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="600" color="info.main">
                {currentAccuracy}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Accuracy
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={currentAccuracy} 
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
                color={currentAccuracy >= 95 ? 'success' : 'primary'}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Active Session */}
      {timedSession?.isActive && sessionStats && (
        <Card sx={{ mb: 4, border: 2, borderColor: 'primary.main' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Active Session: {selectedExercise?.title}
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={stopTimedSession}
                startIcon={<Stop />}
              >
                Stop Session
              </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">Current Speed</Typography>
                <Typography variant="h5" color="primary">{sessionStats.currentSpeed} WPM</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">Target Speed</Typography>
                <Typography variant="h5">{timedSession.targetSpeed} WPM</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">Time Remaining</Typography>
                <Typography variant="h5">{Math.floor(sessionStats.remainingTime / 60)}:{(sessionStats.remainingTime % 60).toString().padStart(2, '0')}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">Words Progress</Typography>
                <Typography variant="h5">{wordsCompleted}/{totalWords}</Typography>
              </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Session Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={sessionStats.progress} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            <Paper sx={{ p: 2, mb: 2, backgroundColor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                Current Word: <strong>{currentWord}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Write this word in shorthand, then click "Next Word" when complete
              </Typography>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                onClick={handleWordCompleted}
                disabled={!currentWord}
              >
                Next Word
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Exercise Selection */}
      {!timedSession?.isActive && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Speed Development Exercises
                </Typography>
                
                <List>
                  {recommendedExercises.map((exercise) => (
                    <ListItem key={exercise.id} sx={{ border: 1, borderColor: 'grey.200', borderRadius: 1, mb: 2 }}>
                      <ListItemIcon>
                        <Assignment color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6">{exercise.title}</Typography>
                            <Chip 
                              label={`${exercise.targetSpeed} WPM`} 
                              size="small" 
                              color="primary"
                            />
                            <Chip 
                              label={exercise.difficulty} 
                              size="small" 
                              color={exercise.difficulty === 'beginner' ? 'success' : exercise.difficulty === 'intermediate' ? 'warning' : 'error'}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {exercise.instructions}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Duration: {exercise.duration} minutes | Words: {exercise.content.split(' ').length}
                            </Typography>
                          </Box>
                        }
                      />
                      <Button
                        variant="contained"
                        startIcon={<PlayArrow />}
                        onClick={() => startTimedSession(exercise)}
                        disabled={currentSpeed < exercise.targetSpeed - 10}
                      >
                        Start
                      </Button>
                    </ListItem>
                  ))}
                </List>

                {currentSpeed < 10 && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Start with basic stroke practice to build your foundation. Advanced exercises will unlock as your speed improves.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Speed Development Guide
                </Typography>
                
                <Stepper orientation="vertical">
                  <Step completed={currentSpeed >= 5}>
                    <StepLabel>
                      <Typography variant="body2">
                        <strong>5 WPM</strong> - Basic Strokes
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="caption">
                        Master basic stroke formation and simple words
                      </Typography>
                    </StepContent>
                  </Step>
                  
                  <Step completed={currentSpeed >= 15}>
                    <StepLabel>
                      <Typography variant="body2">
                        <strong>15 WPM</strong> - Smooth Writing
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="caption">
                        Develop fluent stroke combinations
                      </Typography>
                    </StepContent>
                  </Step>
                  
                  <Step completed={currentSpeed >= 25}>
                    <StepLabel>
                      <Typography variant="body2">
                        <strong>25 WPM</strong> - Professional Level
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="caption">
                        Business correspondence speed
                      </Typography>
                    </StepContent>
                  </Step>
                  
                  <Step completed={currentSpeed >= 30}>
                    <StepLabel>
                      <Typography variant="body2">
                        <strong>30 WPM</strong> - Examination Ready
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="caption">
                        Professional certification standard
                      </Typography>
                    </StepContent>
                  </Step>
                </Stepper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Dictation Exercises */}
      {!timedSession?.isActive && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Audio Dictation Exercises
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Practice listening and transcription skills with our audio dictation exercises
                </Typography>
                
                <Grid container spacing={2}>
                  {Object.values(dictationTexts).slice(0, 3).map((unit: any) => 
                    unit.practices?.slice(0, 2).map((practice: any) => (
                      <Grid item xs={12} sm={6} md={4} key={practice.id}>
                        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                              {practice.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {practice.text.substring(0, 100)}...
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                              <Chip 
                                label={`${practice.words?.length || practice.text.split(' ').length} words`} 
                                size="small" 
                                variant="outlined"
                              />
                              <Chip 
                                label={practice.difficulty} 
                                size="small" 
                                color={practice.difficulty === 'beginner' ? 'success' : 'warning'}
                              />
                            </Box>
                          </CardContent>
                          <Box sx={{ p: 2, pt: 0 }}>
                            <Button
                              variant="contained"
                              startIcon={<VolumeUp />}
                              onClick={() => handleStartDictation({
                                id: practice.id,
                                title: practice.title,
                                text: practice.text,
                                wordCount: practice.words?.length || practice.text.split(' ').length,
                                difficulty: practice.difficulty,
                                description: 'Listen carefully and transcribe what you hear',
                                estimatedTime: '5-10 minutes'
                              })}
                              fullWidth
                            >
                              Start Dictation
                            </Button>
                          </Box>
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Session Results Dialog */}
      <Dialog open={!!sessionResults} onClose={() => setSessionResults(null)} maxWidth="md" fullWidth>
        <DialogTitle>Session Complete!</DialogTitle>
        <DialogContent>
          {sessionResults && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Speed color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" color="primary">
                      {sessionResults.actualSpeed} WPM
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your Speed
                    </Typography>
                    <Typography variant="caption">
                      Target: {sessionResults.targetSpeed} WPM
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" color="success.main">
                      {sessionResults.accuracy}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Accuracy
                    </Typography>
                    <Typography variant="caption">
                      Target: 95%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Alert 
                  severity={sessionResults.actualSpeed >= sessionResults.targetSpeed && sessionResults.accuracy >= 95 ? 'success' : 'info'}
                  sx={{ mt: 2 }}
                >
                  {sessionResults.actualSpeed >= sessionResults.targetSpeed && sessionResults.accuracy >= 95
                    ? '🎉 Excellent! You met both speed and accuracy targets!'
                    : sessionResults.actualSpeed >= sessionResults.targetSpeed
                    ? '✓ Good speed! Focus on improving accuracy next time.'
                    : sessionResults.accuracy >= 95
                    ? '✓ Great accuracy! Keep practicing to increase speed.'
                    : 'Keep practicing! Both speed and accuracy will improve with regular sessions.'
                  }
                </Alert>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSessionResults(null)} variant="contained">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Audio Dictation Dialog */}
      <AudioDictation
        dictationData={selectedDictation}
        isOpen={isDictationOpen}
        onClose={() => setIsDictationOpen(false)}
        onComplete={handleDictationComplete}
      />
    </Box>
  )
}

export default SpeedDevelopment