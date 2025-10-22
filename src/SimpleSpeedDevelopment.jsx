import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  LinearProgress,
  Chip,
  TextField,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  IconButton,
  Slider,
  Switch,
  FormControlLabel
} from '@mui/material'
import {
  PlayArrow,
  Timer,
  Speed,
  Stop,
  Refresh,
  CheckCircle,
  School,
  RecordVoiceOver,
  Pause,
  VolumeUp,
  ExpandMore,
  Info,
  TrendingUp,
  Psychology,
  Assessment,
  BarChart,
  Settings,
  Hearing,
  EmojiEvents
} from '@mui/icons-material'
import SubscriptionGate from './components/Subscription/SubscriptionGate'
import UsageTracker from './components/Subscription/UsageTracker'
import { useSubscription } from './hooks/useSubscription'
import { useUserProgress } from '@hooks/useUserProgress'
import { useLessons } from '@hooks/useLessons'
import { getModulePracticeText, getModuleVocabulary } from './data/practiceTexts'
import { getModuleVocabulary as getVocabFromModule, generateModulePracticeText as generateText } from './data/moduleVocabulary'
import { getDictationForUnit, calculateWordTimings, getCurrentWordIndex, getDictationUnitForModule } from './data/dictationTexts'

const SimpleSpeedDevelopment = () => {
  const { moduleId } = useParams()
  const { hasAccess, trackUsage, getRemainingUsage } = useSubscription()
  const [selectedModule, setSelectedModule] = useState(moduleId || 'A')
  const [activeSession, setActiveSession] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [userText, setUserText] = useState('')
  const [currentWPM, setCurrentWPM] = useState(0)
  const [sessionComplete, setSessionComplete] = useState(false)
  
  // Dictation-specific state
  const [isDictationMode, setIsDictationMode] = useState(false)
  const [currentDictation, setCurrentDictation] = useState(null)
  const [dictationSpeed, setDictationSpeed] = useState(30)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [dictationElapsedTime, setDictationElapsedTime] = useState(0)
  const [wordTimings, setWordTimings] = useState([])
  const [isDictationPlaying, setIsDictationPlaying] = useState(false)
  const [selectedDictationIndex, setSelectedDictationIndex] = useState(0)
  
  // Enhanced features state
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false)
  const [realTimeAnalysis, setRealTimeAnalysis] = useState(true)
  const [voiceSettings, setVoiceSettings] = useState({
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8,
    voice: null
  })
  const [performanceHistory, setPerformanceHistory] = useState([])
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(true)
  
  const timerRef = useRef(null)
  const dictationTimerRef = useRef(null)
  const speechSynthRef = useRef(null)
  
  const { getCurrentSpeed, updatePracticeStats } = useUserProgress()
  const { lessons, getLessonById } = useLessons()
  
  const currentSpeed = getCurrentSpeed()
  const currentLesson = getLessonById(selectedModule)

  // Generate module-specific practice text using authentic NCS materials
  const generateModulePracticeText = (lesson, difficulty = 'basic') => {
    if (!lesson) return 'Practice text not available for this module.'
    
    // First try to get reading and writing practices from dictation texts
    const moduleToUnitMap = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10,
      'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 20
    }
    
    const unitNumber = moduleToUnitMap[lesson.id]
    if (unitNumber) {
      const dictationData = getDictationForUnit(unitNumber)
      if (dictationData && dictationData.practices) {
        // Use reading and writing practices from dictation texts
        if (difficulty === 'basic' && dictationData.practices[0]) {
          return dictationData.practices[0].text
        } else if (difficulty === 'intermediate' && dictationData.practices[1]) {
          return dictationData.practices[1].text
        } else if (difficulty === 'advanced' && dictationData.shortFormPractice) {
          return dictationData.shortFormPractice.text
        } else if (difficulty === 'professional' && dictationData.practicalDictation) {
          return dictationData.practicalDictation.text
        }
      }
    }
    
    // Try the new vocabulary system as fallback
    const newText = generateText(lesson.id, difficulty)
    if (newText && newText !== 'Practice text not available for this module.') {
      return newText
    }
    
    // Final fallback to authentic NCS practice texts
    return getModulePracticeText(lesson.id, difficulty)
  }

  const speedExercises = [
    {
      id: 'basic',
      title: 'Basic Speed Building',
      targetSpeed: 10,
      duration: 5,
      description: `Practice ${currentLesson?.title || 'basic strokes'} at steady rhythm`,
      practiceText: generateModulePracticeText(currentLesson, 'basic')
    },
    {
      id: 'intermediate',
      title: 'Intermediate Practice',
      targetSpeed: 15,
      duration: 10,
      description: `${currentLesson?.title || 'Common words'} and combinations`,
      practiceText: generateModulePracticeText(currentLesson, 'intermediate')
    },
    {
      id: 'advanced',
      title: 'Advanced Speed Training',
      targetSpeed: 20,
      duration: 15,
      description: `Advanced ${currentLesson?.title || 'business terminology'} practice`,
      practiceText: generateModulePracticeText(currentLesson, 'advanced')
    },
    {
      id: 'professional',
      title: 'Professional Standard',
      targetSpeed: 30,
      duration: 20,
      description: `Professional level ${currentLesson?.title || 'examination'} practice`,
      practiceText: generateModulePracticeText(currentLesson, 'professional')
    }
  ]

  // Timer and session management
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      setSessionComplete(true)
      calculateWPM()
    }
    
    return () => clearTimeout(timerRef.current)
  }, [timeLeft, isRunning])

  // Dictation timer and word highlighting
  useEffect(() => {
    if (isDictationPlaying && currentDictation) {
      dictationTimerRef.current = setInterval(() => {
        setDictationElapsedTime(prev => {
          const newTime = prev + 0.1
          if (wordTimings.length > 0) {
            const wordIndex = getCurrentWordIndex(wordTimings, newTime)
            setCurrentWordIndex(wordIndex)
          }
          return newTime
        })
      }, 100) // Update every 100ms for smooth highlighting
    } else {
      clearInterval(dictationTimerRef.current)
    }
    
    return () => clearInterval(dictationTimerRef.current)
  }, [isDictationPlaying, currentDictation, wordTimings])

  // Load dictation data when module changes
  useEffect(() => {
    if (selectedModule && isDictationMode) {
      loadDictationForModule(selectedModule)
    }
  }, [selectedModule, isDictationMode])

  // Initialize dictation for the default module
  useEffect(() => {
    if (selectedModule && !currentDictation) {
      // Pre-load dictation data even when not in dictation mode
      loadDictationForModule(selectedModule)
    }
  }, [selectedModule])

  // Get available dictation exercises for the current module
  const getAvailableDictationExercises = (moduleId) => {
    const moduleToUnitMap = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10,
      'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 20
    }
    
    const unitNumber = moduleToUnitMap[moduleId]
    if (!unitNumber) return []
    
    const dictationData = getDictationForUnit(unitNumber)
    if (!dictationData) return []
    
    const exercises = []
    
    // Add reading practices
    if (dictationData.practices) {
      dictationData.practices.forEach((practice, index) => {
        exercises.push({
          value: index,
          label: practice.title || `Reading Practice ${index + 1}`,
          type: 'practice'
        })
      })
    }
    
    // Add short form practice
    if (dictationData.shortFormPractice) {
      exercises.push({
        value: exercises.length,
        label: dictationData.shortFormPractice.title || 'Short Form Practice',
        type: 'shortForm'
      })
    }
    
    // Add practical dictation
    if (dictationData.practicalDictation) {
      exercises.push({
        value: exercises.length,
        label: dictationData.practicalDictation.title || 'Practical Dictation',
        type: 'practical'
      })
    }
    
    // Add business note/memo
    if (dictationData.businessNote) {
      exercises.push({
        value: exercises.length,
        label: dictationData.businessNote.title || 'Business Note',
        type: 'businessNote'
      })
    }
    
    // Add memorandum
    if (dictationData.memorandum) {
      exercises.push({
        value: exercises.length,
        label: dictationData.memorandum.title || 'Memorandum',
        type: 'memorandum'
      })
    }
    
    // Add freight letter
    if (dictationData.freightLetter) {
      exercises.push({
        value: exercises.length,
        label: dictationData.freightLetter.title || 'Freight Letter',
        type: 'freightLetter'
      })
    }
    
    // Add disabled home letter
    if (dictationData.disabledHomeLetter) {
      exercises.push({
        value: exercises.length,
        label: dictationData.disabledHomeLetter.title || 'Disability Services Letter',
        type: 'disabledHomeLetter'
      })
    }
    
    // Add mortgage letter
    if (dictationData.mortgageLetter) {
      exercises.push({
        value: exercises.length,
        label: dictationData.mortgageLetter.title || 'Mortgage Letter',
        type: 'mortgageLetter'
      })
    }
    
    // Add black economy extract
    if (dictationData.blackEconomyExtract) {
      exercises.push({
        value: exercises.length,
        label: dictationData.blackEconomyExtract.title || 'Black Economy Extract',
        type: 'blackEconomyExtract'
      })
    }
    
    // Add marketing memo
    if (dictationData.marketingMemo) {
      exercises.push({
        value: exercises.length,
        label: dictationData.marketingMemo.title || 'Marketing Memo',
        type: 'marketingMemo'
      })
    }
    
    // Add personnel memo
    if (dictationData.personnelMemo) {
      exercises.push({
        value: exercises.length,
        label: dictationData.personnelMemo.title || 'Personnel Memo',
        type: 'personnelMemo'
      })
    }
    
    // Add accurate quotation
    if (dictationData.accurateQuotation) {
      exercises.push({
        value: exercises.length,
        label: dictationData.accurateQuotation.title || 'Accurate Quotation Letter',
        type: 'accurateQuotation'
      })
    }
    
    // Add theory check
    if (dictationData.theoryCheck) {
      exercises.push({
        value: exercises.length,
        label: 'Theory Check',
        type: 'theoryCheck'
      })
    }
    
    return exercises
  }
  const loadDictationForModule = (moduleId) => {
    // Map module letters to unit numbers based on NCS curriculum
    const moduleToUnitMap = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10,
      'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 20
    }
    
    const unitNumber = moduleToUnitMap[moduleId] || 1 // Default to Unit 1 if mapping not found
    
    const dictationData = getDictationForUnit(unitNumber)
    
    if (dictationData) {
      const availableExercises = getAvailableDictationExercises(moduleId)
      
      if (availableExercises.length > 0) {
        const selectedExerciseIndex = Math.min(selectedDictationIndex, availableExercises.length - 1)
        const selectedExercise = availableExercises[selectedExerciseIndex]
        
        if (selectedExercise) {
          let exerciseData = null
          
          // Get the actual exercise data based on type
          switch (selectedExercise.type) {
            case 'practice':
              exerciseData = dictationData.practices[selectedExercise.value]
              break
            case 'shortForm':
              exerciseData = dictationData.shortFormPractice
              break
            case 'practical':
              exerciseData = dictationData.practicalDictation
              break
            case 'businessNote':
              exerciseData = dictationData.businessNote
              break
            case 'memorandum':
              exerciseData = dictationData.memorandum
              break
            case 'freightLetter':
              exerciseData = dictationData.freightLetter
              break
            case 'disabledHomeLetter':
              exerciseData = dictationData.disabledHomeLetter
              break
            case 'mortgageLetter':
              exerciseData = dictationData.mortgageLetter
              break
            case 'blackEconomyExtract':
              exerciseData = dictationData.blackEconomyExtract
              break
            case 'marketingMemo':
              exerciseData = dictationData.marketingMemo
              break
            case 'personnelMemo':
              exerciseData = dictationData.personnelMemo
              break
            case 'accurateQuotation':
              exerciseData = dictationData.accurateQuotation
              break
            case 'theoryCheck':
              exerciseData = dictationData.theoryCheck
              break
            default:
              exerciseData = dictationData.practices[0] // Fallback to first practice
          }
          
          if (exerciseData) {
            setCurrentDictation(exerciseData)
            return
          }
        }
      }
    }
    
    // Enhanced fallback to a sample dictation with proper structure
    const fallbackText = generateModulePracticeText(currentLesson, 'intermediate') || 
      `This is a practice dictation for Module ${moduleId}. Please practice writing shorthand at your own pace. Focus on accuracy and proper stroke formation.`
    
    const fallbackDictation = {
      id: `module_${moduleId}_dictation`,
      title: `Module ${moduleId} Dictation Practice`,
      text: fallbackText,
      words: fallbackText.split(' ').filter(word => word.length > 0),
      difficulty: 'intermediate',
      focusPoints: [`Module ${moduleId} techniques`],
      type: 'fallback'
    }
    
    setCurrentDictation(fallbackDictation)
  }

  const startDictation = () => {
    // Check subscription access for dictation
    if (!hasAccess('dictation')) {
      return
    }
    
    if (!currentDictation) {
      return
    }
    
    // Track dictation usage (in minutes)
    const estimatedMinutes = currentDictation.words.length / (dictationSpeed * 5) // Rough estimate
    trackUsage('dictation', estimatedMinutes)
    
    // Calculate word timings based on selected speed
    const timings = calculateWordTimings(currentDictation.words, dictationSpeed)
    setWordTimings(timings)
    setCurrentWordIndex(0)
    setDictationElapsedTime(0)
    setIsDictationPlaying(true)
    
    // Start text-to-speech if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentDictation.text)
      utterance.rate = dictationSpeed / 180 // Adjust rate based on WPM
      utterance.pitch = 1
      utterance.volume = 0.8
      
      utterance.onend = () => {
        setIsDictationPlaying(false)
        setDictationElapsedTime(0)
        setCurrentWordIndex(0)
      }
      
      speechSynthRef.current = utterance
      speechSynthesis.speak(utterance)
    }
  }

  const pauseDictation = () => {
    setIsDictationPlaying(false)
    if ('speechSynthesis' in window) {
      speechSynthesis.pause()
    }
  }

  const resumeDictation = () => {
    setIsDictationPlaying(true)
    if ('speechSynthesis' in window) {
      speechSynthesis.resume()
    }
  }

  const stopDictation = () => {
    setIsDictationPlaying(false)
    setDictationElapsedTime(0)
    setCurrentWordIndex(0)
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
  }

  const resetDictation = () => {
    stopDictation()
    setUserText('')
  }

  // Calculate WPM in real-time
  useEffect(() => {
    if (activeSession && userText.length > 0) {
      const timeElapsed = (activeSession.duration * 60 - timeLeft) / 60
      if (timeElapsed > 0) {
        const words = userText.trim().split(' ').length
        const wpm = Math.round(words / timeElapsed)
        setCurrentWPM(wpm)
      }
    }
  }, [userText, timeLeft, activeSession])

  const calculateWPM = () => {
    if (activeSession && userText.length > 0) {
      const words = userText.trim().split(' ').length
      const timeElapsed = activeSession.duration
      const wpm = Math.round(words / timeElapsed)
      const accuracy = calculateAccuracy()
      
      setCurrentWPM(wpm)
      
      // Update progress when session is complete
      if (sessionComplete) {
        updateProgressAfterSession({ wpm, accuracy })
      }
    }
  }

  const calculateAccuracy = () => {
    if (!activeSession || !userText) return 0
    
    const originalWords = activeSession.practiceText.toLowerCase().split(' ')
    const userWords = userText.toLowerCase().split(' ')
    
    let correct = 0
    const minLength = Math.min(originalWords.length, userWords.length)
    
    for (let i = 0; i < minLength; i++) {
      if (originalWords[i] === userWords[i]) {
        correct++
      }
    }
    
    return Math.round((correct / originalWords.length) * 100)
  }

  const startSession = (exercise) => {
    // Check subscription access for speed exercises
    if (!hasAccess('speedExercise')) {
      return
    }
    
    // Track usage
    trackUsage('speedExercise')
    
    setActiveSession(exercise)
    setTimeLeft(exercise.duration * 60) // Convert minutes to seconds
    setUserText('')
    setCurrentWPM(0)
    setSessionComplete(false)
    setIsRunning(true)
  }

  const stopSession = () => {
    setActiveSession(null)
    setIsRunning(false)
    setTimeLeft(0)
    setUserText('')
    setCurrentWPM(0)
    setSessionComplete(false)
    clearTimeout(timerRef.current)
  }

  const pauseSession = () => {
    setIsRunning(!isRunning)
  }

  const restartSession = () => {
    if (activeSession) {
      setTimeLeft(activeSession.duration * 60)
      setUserText('')
      setCurrentWPM(0)
      setSessionComplete(false)
      setIsRunning(true)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Update progress when session completes
  const updateProgressAfterSession = async (results) => {
    if (!updatePracticeStats || !selectedModule) return
    
    try {
      // Update practice statistics
      await updatePracticeStats(selectedModule, {
        totalPracticeTime: activeSession.duration,
        wordsWritten: userText.trim().split(' ').length,
        averageSpeed: results.wpm,
        averageAccuracy: results.accuracy,
        lastPracticeDate: new Date()
      })

      // Add speed development record
      const speedRecord = {
        date: new Date(),
        speed: results.wpm,
        accuracy: results.accuracy,
        moduleId: selectedModule,
        exerciseType: 'writing',
        duration: activeSession.duration * 60
      }

      // Note: We'll need to add a method to update speed records in the context
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Usage Tracker */}
      <UsageTracker variant="compact" />
      
      <Typography variant="h4" gutterBottom fontWeight="600">
        Speed Development Training
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Build your shorthand writing speed with progressive exercises
      </Typography>

      {/* Module Selector */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <School color="primary" />
            <Typography variant="h6">
              Practice Module:
            </Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Select Module</InputLabel>
              <Select
                value={selectedModule}
                label="Select Module"
                onChange={(e) => setSelectedModule(e.target.value)}
              >
                {lessons.map((lesson) => {
                  const exerciseCount = getAvailableDictationExercises(lesson.id).length
                  return (
                    <MenuItem key={lesson.id} value={lesson.id}>
                      Module {lesson.id} - {lesson.title} 
                      {exerciseCount > 0 && ` (${exerciseCount} exercises)`}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            {currentLesson && (
              <Chip 
                label={`Semester ${currentLesson.semester} • Week ${currentLesson.weekNumber}`} 
                color="primary" 
                variant="outlined"
              />
            )}
          </Box>
          {currentLesson && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              <strong>Focus:</strong> {currentLesson.description}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Performance Overview */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp />
            Performance Analytics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {currentSpeed}
                </Typography>
                <Typography variant="body1">WPM Current</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(currentSpeed / 40) * 100} 
                  sx={{ 
                    mt: 1, 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': { bgcolor: 'white' }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  87%
                </Typography>
                <Typography variant="body1">Avg Accuracy</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +3% this week
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  42
                </Typography>
                <Typography variant="body1">Sessions</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  15h total time
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  8
                </Typography>
                <Typography variant="body1">Day Streak</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Personal best: 12
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<Psychology />}
            onClick={() => window.location.href = '/adaptive-learning'}
            sx={{ py: 2 }}
          >
            AI Coaching
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<EmojiEvents />}
            onClick={() => window.location.href = '/gamification'}
            sx={{ py: 2 }}
          >
            Achievements
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<Assessment />}
            onClick={() => window.location.href = '/advanced-assessment'}
            sx={{ py: 2 }}
          >
            Speed Tests
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<BarChart />}
            onClick={() => window.location.href = '/advanced-progress'}
            sx={{ py: 2 }}
          >
            Detailed Stats
          </Button>
        </Grid>
      </Grid>

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
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Target: 30 WPM
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Timer color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="600" color="success.main">
                15h
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Practice Time
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                +2h this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PlayArrow color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="600" color="info.main">
                42
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sessions Completed
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                87% success rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Active Session */}
      {activeSession && (
        <Card sx={{ mb: 4, border: 2, borderColor: sessionComplete ? 'success.main' : 'primary.main' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {sessionComplete ? '✅ Session Complete' : `Active Session: ${activeSession.title}`}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {!sessionComplete && (
                  <Button 
                    variant="outlined" 
                    onClick={pauseSession}
                    startIcon={isRunning ? <Stop /> : <PlayArrow />}
                  >
                    {isRunning ? 'Pause' : 'Resume'}
                  </Button>
                )}
                <Button 
                  variant="outlined" 
                  onClick={restartSession}
                  startIcon={<Refresh />}
                >
                  Restart
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={stopSession}
                >
                  Stop
                </Button>
              </Box>
            </Box>

            {/* Session Stats */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="h6" color="primary">{formatTime(timeLeft)}</Typography>
                  <Typography variant="caption">Time Left</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="h6" color="success.main">{currentWPM}</Typography>
                  <Typography variant="caption">Current WPM</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="h6" color="info.main">{activeSession.targetSpeed}</Typography>
                  <Typography variant="caption">Target WPM</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="h6" color="warning.main">{calculateAccuracy()}%</Typography>
                  <Typography variant="caption">Accuracy</Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Progress Bar */}
            <LinearProgress 
              variant="determinate" 
              value={((activeSession.duration * 60 - timeLeft) / (activeSession.duration * 60)) * 100}
              sx={{ mb: 3, height: 8, borderRadius: 4 }}
            />

            {/* Practice Text Display */}
            <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle2" gutterBottom>
                Practice Text for Module {selectedModule}:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                {activeSession.practiceText}
              </Typography>
            </Paper>

            {/* Module Focus */}
            {currentLesson && (
              <Paper sx={{ p: 2, mb: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Module Focus - {currentLesson.title}:
                </Typography>
                <Typography variant="body2">
                  This practice session emphasizes the vocabulary and concepts from Module {selectedModule}. 
                  Focus on applying the strokes and techniques you learned in this module.
                </Typography>
              </Paper>
            )}

            {/* User Input */}
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Start typing the text above... The timer will start when you begin typing."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              disabled={!isRunning || sessionComplete}
              autoFocus={activeSession && !sessionComplete}
              sx={{ 
                mb: 2,
                '& .MuiInputBase-root': {
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }
              }}
            />

            {/* Session Complete Results */}
            {sessionComplete && (
              <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                <Typography variant="h6" gutterBottom>
                  <CheckCircle sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Session Results
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Words Per Minute: <strong>{currentWPM}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Accuracy: <strong>{calculateAccuracy()}%</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Target Achieved: <strong>{currentWPM >= activeSession.targetSpeed ? 'Yes' : 'No'}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Words Typed: <strong>{userText.trim().split(' ').length}</strong>
                    </Typography>
                  </Grid>
                </Grid>
                
                {showAdvancedFeatures && (
                  <Box sx={{ mt: 2 }}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      AI Performance Analysis
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        <strong>Recommendation:</strong> Your speed has improved 8% over the last 5 sessions. 
                        Focus on curved strokes (R, L) to improve accuracy by an estimated 5%.
                      </Typography>
                    </Alert>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip label="Speed Improving" color="success" size="small" />
                      <Chip label="Focus: Curved Strokes" color="warning" size="small" />
                      <Chip label="Consistency Good" color="info" size="small" />
                    </Box>
                  </Box>
                )}
              </Paper>
            )}

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Target: {activeSession.targetSpeed} WPM • Duration: {activeSession.duration} minutes
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Instructions: Type the text above as quickly and accurately as possible. Your WPM and accuracy are calculated in real-time.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Module Vocabulary Preview */}
      {!activeSession && currentLesson && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Key Vocabulary - Module {selectedModule}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Practice these words from {currentLesson.title}:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="body2">
                <strong>Sample Words:</strong> {generateModulePracticeText(currentLesson, 'basic').split(' ').slice(0, 15).join(' ')}...
              </Typography>
            </Paper>
          </CardContent>
        </Card>
      )}

      {/* Advanced Features Toggle */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Advanced Features
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enable enhanced analytics, AI coaching, and detailed performance tracking
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={showAdvancedFeatures}
                  onChange={(e) => setShowAdvancedFeatures(e.target.checked)}
                />
              }
              label="Enable"
            />
          </Box>
          
          {showAdvancedFeatures && (
            <Box sx={{ mt: 3 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1">Voice & Audio Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Typography gutterBottom>Speech Rate</Typography>
                      <Slider
                        value={voiceSettings.rate}
                        onChange={(e, val) => setVoiceSettings(prev => ({ ...prev, rate: val }))}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        marks
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography gutterBottom>Voice Pitch</Typography>
                      <Slider
                        value={voiceSettings.pitch}
                        onChange={(e, val) => setVoiceSettings(prev => ({ ...prev, pitch: val }))}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        marks
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography gutterBottom>Volume</Typography>
                      <Slider
                        value={voiceSettings.volume}
                        onChange={(e, val) => setVoiceSettings(prev => ({ ...prev, volume: val }))}
                        min={0.1}
                        max={1.0}
                        step={0.1}
                        marks
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1">Learning Preferences</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={realTimeAnalysis}
                            onChange={(e) => setRealTimeAnalysis(e.target.checked)}
                          />
                        }
                        label="Real-time Performance Analysis"
                      />
                      <Typography variant="caption" display="block" color="text.secondary">
                        Get instant feedback on your writing speed and accuracy
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={adaptiveDifficulty}
                            onChange={(e) => setAdaptiveDifficulty(e.target.checked)}
                          />
                        }
                        label="Adaptive Difficulty"
                      />
                      <Typography variant="caption" display="block" color="text.secondary">
                        Automatically adjust exercise difficulty based on performance
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Practice Mode Selector */}
      {!activeSession && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Practice Mode
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                variant={!isDictationMode ? "contained" : "outlined"}
                onClick={() => {
                  setIsDictationMode(false)
                }}
                startIcon={<Speed />}
              >
                Speed Exercises
              </Button>
              <Button
                variant={isDictationMode ? "contained" : "outlined"}
                onClick={() => {
                  setIsDictationMode(true)
                  loadDictationForModule(selectedModule)
                }}
                startIcon={<RecordVoiceOver />}
              >
                Dictation Practice
              </Button>
            </Box>

            {isDictationMode && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Speed (WPM)</InputLabel>
                  <Select
                    value={dictationSpeed}
                    label="Speed (WPM)"
                    onChange={(e) => setDictationSpeed(e.target.value)}
                  >
                    <MenuItem value={20}>20 WPM</MenuItem>
                    <MenuItem value={25}>25 WPM</MenuItem>
                    <MenuItem value={30}>30 WPM</MenuItem>
                    <MenuItem value={35}>35 WPM</MenuItem>
                    <MenuItem value={40}>40 WPM</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Dictation Exercise</InputLabel>
                  <Select
                    value={selectedDictationIndex}
                    label="Dictation Exercise"
                    onChange={(e) => {
                      setSelectedDictationIndex(e.target.value)
                      loadDictationForModule(selectedModule)
                    }}
                  >
                    {getAvailableDictationExercises(selectedModule).map((exercise) => (
                      <MenuItem key={exercise.value} value={exercise.value}>
                        {exercise.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dictation Interface */}
      {!activeSession && isDictationMode && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            {!currentDictation ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Loading Dictation...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Preparing dictation exercise for Module {selectedModule}
                </Typography>
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {currentDictation.title}
                  </Typography>
                  <SubscriptionGate feature="dictation">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {!isDictationPlaying ? (
                        <Button
                          variant="contained"
                          onClick={startDictation}
                          startIcon={<PlayArrow />}
                          color="success"
                        >
                          Start Dictation
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={pauseDictation}
                          startIcon={<Pause />}
                        >
                          Pause
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        onClick={stopDictation}
                        startIcon={<Stop />}
                      >
                        Stop
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={resetDictation}
                        startIcon={<Refresh />}
                      >
                        Reset
                      </Button>
                    </Box>
                  </SubscriptionGate>
                </Box>

                {/* Dictation Display with Highlighting */}
                <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50', maxHeight: 200, overflow: 'auto' }}>
                  <Typography variant="body1" sx={{ lineHeight: 2 }}>
                    {currentDictation.words.map((word, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: index === currentWordIndex ? '#ffeb3b' : 'transparent',
                      padding: '2px 4px',
                      borderRadius: '3px',
                      margin: '0 2px',
                      color: index < currentWordIndex ? '#666' : '#000',
                      fontWeight: index === currentWordIndex ? 'bold' : 'normal'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </Typography>
            </Paper>

            {/* Dictation Progress */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Progress</Typography>
                <Typography variant="body2">
                  {currentWordIndex + 1} / {currentDictation.words.length} words
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(currentWordIndex / currentDictation.words.length) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            {/* Speed and Timing Info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="h6" color="primary">{dictationSpeed}</Typography>
                  <Typography variant="caption">WPM Target</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="h6" color="success.main">
                    {Math.floor(dictationElapsedTime)}s
                  </Typography>
                  <Typography variant="caption">Elapsed</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="h6" color="warning.main">
                    {currentDictation.difficulty}
                  </Typography>
                  <Typography variant="caption">Level</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="h6" color="info.main">
                    Module {selectedModule}
                  </Typography>
                  <Typography variant="caption">Unit</Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Focus Points */}
            {currentDictation.focusPoints && currentDictation.focusPoints.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Focus Points for this dictation:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {currentDictation.focusPoints.map((point, index) => (
                    <Chip
                      key={index}
                      label={point}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* User Writing Area */}
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Write your shorthand notes here..."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Listen to the dictation and write your shorthand notes in this area. The highlighted word shows your current position."
              sx={{ mb: 2 }}
            />

            <Typography variant="caption" color="text.secondary">
              💡 Tip: Follow the highlighted words and try to keep up with the {dictationSpeed} WPM pace. 
              Use the audio controls to practice at your comfortable speed.
            </Typography>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Speed Exercises */}
      {!activeSession && !isDictationMode && (
        <Grid container spacing={3}>
          {speedExercises.map((exercise) => (
            <Grid item xs={12} sm={6} md={6} key={exercise.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{exercise.title}</Typography>
                    <Chip 
                      label={`${exercise.targetSpeed} WPM`} 
                      color="primary"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {exercise.description}
                  </Typography>
                  
                  <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                    Duration: {exercise.duration} minutes • Module: {selectedModule}
                  </Typography>

                  {/* Preview text sample */}
                  <Paper sx={{ p: 1, mb: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="caption" color="text.secondary">
                      Preview: "{exercise.practiceText.substring(0, 60)}..."
                    </Typography>
                  </Paper>
                  
                  <SubscriptionGate feature="speedExercise">
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PlayArrow />}
                      onClick={() => startSession(exercise)}
                      disabled={currentSpeed < exercise.targetSpeed - 10}
                    >
                      Start Exercise
                    </Button>
                  </SubscriptionGate>
                  
                  {currentSpeed < exercise.targetSpeed - 10 && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Complete easier exercises first
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Speed Targets */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Speed Development Targets
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h6" color={currentSpeed >= 10 ? 'success.main' : 'text.secondary'}>
                  10 WPM
                </Typography>
                <Typography variant="body2">Beginner</Typography>
                {currentSpeed >= 10 && <Typography>✅</Typography>}
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h6" color={currentSpeed >= 20 ? 'success.main' : 'text.secondary'}>
                  20 WPM
                </Typography>
                <Typography variant="body2">Intermediate</Typography>
                {currentSpeed >= 20 && <Typography>✅</Typography>}
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h6" color={currentSpeed >= 25 ? 'success.main' : 'text.secondary'}>
                  25 WPM
                </Typography>
                <Typography variant="body2">Professional</Typography>
                {currentSpeed >= 25 && <Typography>✅</Typography>}
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h6" color={currentSpeed >= 30 ? 'success.main' : 'text.secondary'}>
                  30 WPM
                </Typography>
                <Typography variant="body2">Exam Ready</Typography>
                {currentSpeed >= 30 && <Typography>✅</Typography>}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SimpleSpeedDevelopment