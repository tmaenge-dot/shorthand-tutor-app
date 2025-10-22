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
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider
} from '@mui/material'
import {
  Assignment,
  Timer,
  CheckCircle,
  Cancel,
  PlayArrow,
  Stop,
  Refresh,
  TrendingUp,
  Warning,
  School,
  Speed,
  Hearing,
  Edit,
  Assessment as AssessmentIcon
} from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import ShorthandCanvas from '../../components/ShorthandCanvas/ShorthandCanvas'
import { useUserProgress } from '../../hooks/useUserProgress'
import { useLessons } from '../../hooks/useLessons'
import { 
  TheoryCheck, 
  AssessmentQuestion, 
  TheoryCheckResult, 
  UserAnswer,
  TranscriptionExercise,
  DictationExercise,
  CanvasState 
} from '../../types/index'

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
      id={`assessment-tabpanel-${index}`}
      aria-labelledby={`assessment-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

const Assessment: React.FC = () => {
  const { checkId } = useParams<{ checkId?: string }>()
  const [activeTab, setActiveTab] = useState(0)
  const [currentTheoryCheck, setCurrentTheoryCheck] = useState<TheoryCheck | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isTestActive, setIsTestActive] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [testResults, setTestResults] = useState<TheoryCheckResult | null>(null)
  const [canvasDrawing, setCanvasDrawing] = useState<CanvasState | null>(null)

  const { 
    state: userProgressState, 
    completeTheoryCheck,
    getUserProgressForModule 
  } = useUserProgress()
  const { lessons, getLessonById } = useLessons()

  // Sample theory check data
  const getTheoryCheckForModule = (moduleId: string): TheoryCheck => {
    switch (moduleId) {
      case 'A':
        return {
          id: 'TC_A',
          moduleId: 'A',
          title: 'Introduction to Phonography - Theory Check 1',
          description: 'Assessment covering phonographic principles, sound identification, and basic concepts',
          questions: [
            {
              id: 'TC_A_Q1',
              type: 'multiple-choice',
              question: 'What is the main principle of phonography?',
              options: [
                'One letter = one symbol',
                'One sound = one symbol',
                'One word = one symbol',
                'One syllable = one symbol'
              ],
              correctAnswer: 'One sound = one symbol',
              points: 5,
              explanation: 'Phonography represents speech sounds, not spelling letters'
            },
            {
              id: 'TC_A_Q2',
              type: 'multiple-choice',
              question: 'How many sounds are in the word "phone"?',
              options: ['2', '3', '4', '5'],
              correctAnswer: '3',
              points: 5,
              explanation: 'F-O-N: the PH makes one F sound and E is silent'
            },
            {
              id: 'TC_A_Q3',
              type: 'identification',
              question: 'What type of movement should be used for the wheel exercise?',
              correctAnswer: 'finger movement',
              points: 5,
              explanation: 'Use finger movement, not wrist movement, for better control'
            },
            {
              id: 'TC_A_Q4',
              type: 'multiple-choice',
              question: 'In phonography, vowels are represented by:',
              options: ['Strokes', 'Dots and dashes', 'Circles', 'Loops'],
              correctAnswer: 'Dots and dashes',
              points: 5,
              explanation: 'Vowels are shown as dots and dashes positioned around consonant strokes'
            }
          ],
          passingScore: 95,
          timeLimit: 15,
          attempts: 3
        }

      case 'B':
        return {
          id: 'TC_B',
          moduleId: 'B',
          title: 'Straight Strokes - Theory Check 2',
          description: 'Assessment of first six consonants, light/dark pairs, and basic vowel placement',
          questions: [
            {
              id: 'TC_B_Q1',
              type: 'shorthand-writing',
              question: 'Write the shorthand for the word "pat"',
              correctAnswer: 'P stroke + A dot + T stroke',
              points: 10,
              explanation: 'P (light downward) + A dot (beginning) + T (light upward)'
            },
            {
              id: 'TC_B_Q2',
              type: 'multiple-choice',
              question: 'Which stroke is heavy - B or P?',
              options: ['B', 'P', 'Both', 'Neither'],
              correctAnswer: 'B',
              points: 5,
              explanation: 'B is voiced and therefore uses a heavy stroke'
            },
            {
              id: 'TC_B_Q3',
              type: 'multiple-choice',
              question: 'In which direction is the T stroke written?',
              options: ['Downward', 'Upward', 'Horizontal', 'Slanted'],
              correctAnswer: 'Upward',
              points: 5,
              explanation: 'T is written as a light upward stroke'
            },
            {
              id: 'TC_B_Q4',
              type: 'identification',
              question: 'Where is the A dot placed in relation to a stroke?',
              correctAnswer: 'at the beginning',
              points: 5,
              explanation: 'The A dot is placed at the beginning of the stroke'
            }
          ],
          passingScore: 95,
          timeLimit: 20,
          attempts: 3
        }

      default:
        return {
          id: `TC_${moduleId}`,
          moduleId,
          title: `Module ${moduleId} - Theory Check`,
          description: `Assessment for Module ${moduleId}`,
          questions: [
            {
              id: `TC_${moduleId}_Q1`,
              type: 'multiple-choice',
              question: `Sample question for Module ${moduleId}`,
              options: ['Option A', 'Option B', 'Option C', 'Option D'],
              correctAnswer: 'Option A',
              points: 10,
              explanation: 'Sample explanation'
            }
          ],
          passingScore: 95,
          timeLimit: 15,
          attempts: 3
        }
    }
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTestActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsTestActive(false)
            submitTest()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTestActive, timeRemaining])

  // Load theory check on component mount
  useEffect(() => {
    const moduleId = checkId || userProgressState.currentModule || 'A'
    const theoryCheck = getTheoryCheckForModule(moduleId)
    setCurrentTheoryCheck(theoryCheck)
    setTimeRemaining(theoryCheck.timeLimit * 60) // Convert minutes to seconds
  }, [checkId, userProgressState.currentModule])

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  // Start theory check
  const startTheoryCheck = () => {
    if (!currentTheoryCheck) return
    
    setIsTestActive(true)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setShowResults(false)
    setTimeRemaining(currentTheoryCheck.timeLimit * 60)
  }

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answer: string) => {
    const newAnswer: UserAnswer = {
      questionId,
      userAnswer: answer,
      isCorrect: false, // Will be calculated on submission
      timeSpent: 0 // Would track time per question
    }

    setUserAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== questionId)
      return [...filtered, newAnswer]
    })
  }

  // Handle shorthand drawing answer
  const handleShorthandAnswer = (questionId: string, canvasState: CanvasState) => {
    setCanvasDrawing(canvasState)
    
    // Convert canvas drawing to answer format
    const drawingData = JSON.stringify(canvasState.strokes)
    handleAnswerSelect(questionId, drawingData)
  }

  // Move to next question
  const nextQuestion = () => {
    if (currentTheoryCheck && currentQuestionIndex < currentTheoryCheck.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // Move to previous question
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Submit theory check
  const submitTest = () => {
    if (!currentTheoryCheck) return

    setIsTestActive(false)

    // Calculate results
    let totalPoints = 0
    let earnedPoints = 0

    const gradedAnswers = userAnswers.map(userAnswer => {
      const question = currentTheoryCheck.questions.find(q => q.id === userAnswer.questionId)
      if (!question) return userAnswer

      totalPoints += question.points
      const isCorrect = userAnswer.userAnswer.toLowerCase().trim() === 
                       question.correctAnswer.toLowerCase().trim()
      
      if (isCorrect) {
        earnedPoints += question.points
      }

      return {
        ...userAnswer,
        isCorrect
      }
    })

    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0
    const passed = score >= currentTheoryCheck.passingScore

    const result: TheoryCheckResult = {
      checkId: currentTheoryCheck.id,
      attempt: 1, // Would track actual attempt number
      score,
      passed,
      completedAt: new Date(),
      answers: gradedAnswers,
      timeSpent: (currentTheoryCheck.timeLimit * 60) - timeRemaining
    }

    setTestResults(result)
    setShowResults(true)

    // Save to user progress
    completeTheoryCheck(currentTheoryCheck.moduleId, result)
  }

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Get available theory checks
  const getAvailableTheoryChecks = () => {
    return lessons.map(lesson => ({
      moduleId: lesson.id,
      title: lesson.title,
      completed: getUserProgressForModule(lesson.id)?.theoryCheckResults.some(r => r.passed) || false,
      weekNumber: lesson.weekNumber
    }))
  }

  const availableChecks = getAvailableTheoryChecks()

  // Render question content
  const renderQuestion = (question: AssessmentQuestion) => {
    const userAnswer = userAnswers.find(a => a.questionId === question.id)

    switch (question.type) {
      case 'multiple-choice':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Question {currentQuestionIndex + 1} ({question.points} points)
            </Typography>
            <Typography variant="body1" paragraph>
              {question.question}
            </Typography>
            
            <RadioGroup
              value={userAnswer?.userAnswer || ''}
              onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
            >
              {question.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={!isTestActive}
                />
              ))}
            </RadioGroup>
          </Box>
        )

      case 'shorthand-writing':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Question {currentQuestionIndex + 1} ({question.points} points)
            </Typography>
            <Typography variant="body1" paragraph>
              {question.question}
            </Typography>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              Draw your shorthand answer in the canvas below. Write clearly and ensure all strokes are visible.
            </Alert>

            <ShorthandCanvas
              width={500}
              height={200}
              onCanvasChange={(canvasState) => handleShorthandAnswer(question.id, canvasState)}
              readonly={!isTestActive}
              showGrid={true}
            />
          </Box>
        )

      case 'identification':
      case 'transcription':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Question {currentQuestionIndex + 1} ({question.points} points)
            </Typography>
            <Typography variant="body1" paragraph>
              {question.question}
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={3}
              value={userAnswer?.userAnswer || ''}
              onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
              placeholder="Type your answer here..."
              disabled={!isTestActive}
              variant="outlined"
            />
          </Box>
        )

      default:
        return <Typography>Question type not supported</Typography>
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Assessment Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Take theory checks and track your progress toward certification
        </Typography>
      </Box>

      {/* Assessment Type Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<AssessmentIcon />} label="Theory Checks" />
          <Tab icon={<Edit />} label="Transcription" />
          <Tab icon={<Hearing />} label="Dictation" />
        </Tabs>
      </Paper>

      {/* Theory Checks Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          {/* Available Theory Checks */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Available Theory Checks
                </Typography>
                
                <List>
                  {availableChecks.slice(0, 8).map((check) => (
                    <ListItem 
                      key={check.moduleId}
                      button
                      onClick={() => {
                        const theoryCheck = getTheoryCheckForModule(check.moduleId)
                        setCurrentTheoryCheck(theoryCheck)
                        setTimeRemaining(theoryCheck.timeLimit * 60)
                      }}
                      selected={currentTheoryCheck?.moduleId === check.moduleId}
                    >
                      <ListItemIcon>
                        {check.completed ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Assignment />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={`Module ${check.moduleId}`}
                        secondary={check.title}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Chip 
                          label={`Week ${check.weekNumber}`}
                          size="small"
                          color="info"
                          variant="outlined"
                        />
                        {check.completed && (
                          <Chip 
                            label="Passed"
                            size="small"
                            color="success"
                            sx={{ mt: 0.5 }}
                          />
                        )}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Theory Check Content */}
          <Grid item xs={12} md={8}>
            {currentTheoryCheck ? (
              <Card>
                <CardContent>
                  {!isTestActive && !showResults ? (
                    // Test Start Screen
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        {currentTheoryCheck.title}
                      </Typography>
                      <Typography variant="body1" paragraph color="text.secondary">
                        {currentTheoryCheck.description}
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={6} sm={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6">{currentTheoryCheck.questions.length}</Typography>
                            <Typography variant="caption">Questions</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6">{currentTheoryCheck.timeLimit}</Typography>
                            <Typography variant="caption">Minutes</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6">{currentTheoryCheck.passingScore}%</Typography>
                            <Typography variant="caption">Pass Score</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6">{currentTheoryCheck.attempts}</Typography>
                            <Typography variant="caption">Attempts</Typography>
                          </Paper>
                        </Grid>
                      </Grid>

                      <Alert severity="warning" sx={{ mb: 3 }}>
                        <Typography variant="body2" fontWeight="500">
                          Important Instructions:
                        </Typography>
                        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                          <li>You have {currentTheoryCheck.timeLimit} minutes to complete this assessment</li>
                          <li>You need {currentTheoryCheck.passingScore}% to pass</li>
                          <li>Read each question carefully before answering</li>
                          <li>For shorthand questions, draw clearly on the canvas</li>
                          <li>You can review and change answers before submitting</li>
                        </ul>
                      </Alert>

                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrow />}
                        onClick={startTheoryCheck}
                        fullWidth
                      >
                        Start Theory Check
                      </Button>
                    </Box>
                  ) : isTestActive ? (
                    // Test in Progress
                    <Box>
                      {/* Test Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">
                          {currentTheoryCheck.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Chip 
                            icon={<Timer />}
                            label={formatTime(timeRemaining)}
                            color={timeRemaining < 300 ? 'error' : 'primary'} // Red if less than 5 minutes
                            variant="filled"
                          />
                          <Button
                            variant="outlined"
                            startIcon={<Stop />}
                            onClick={submitTest}
                            color="error"
                            size="small"
                          >
                            Submit
                          </Button>
                        </Box>
                      </Box>

                      {/* Progress Indicator */}
                      <Box sx={{ mb: 3 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={(currentQuestionIndex + 1) / currentTheoryCheck.questions.length * 100}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          Question {currentQuestionIndex + 1} of {currentTheoryCheck.questions.length}
                        </Typography>
                      </Box>

                      {/* Current Question */}
                      <Paper sx={{ p: 3, mb: 3 }}>
                        {renderQuestion(currentTheoryCheck.questions[currentQuestionIndex])}
                      </Paper>

                      {/* Navigation */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          variant="outlined"
                          onClick={previousQuestion}
                          disabled={currentQuestionIndex === 0}
                        >
                          Previous
                        </Button>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {currentQuestionIndex === currentTheoryCheck.questions.length - 1 ? (
                            <Button
                              variant="contained"
                              onClick={submitTest}
                              color="success"
                            >
                              Submit Test
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={nextQuestion}
                            >
                              Next Question
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    // Test Results
                    showResults && testResults && (
                      <Box>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                          <Typography variant="h4" color={testResults.passed ? 'success.main' : 'error.main'} gutterBottom>
                            {testResults.score}%
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            {testResults.passed ? 'Congratulations! You Passed!' : 'Assessment Not Passed'}
                          </Typography>
                          <Chip 
                            label={testResults.passed ? 'PASSED' : 'FAILED'}
                            color={testResults.passed ? 'success' : 'error'}
                            size="medium"
                            sx={{ mb: 2 }}
                          />
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                          <Grid item xs={4}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                              <Typography variant="h6">{testResults.score}%</Typography>
                              <Typography variant="caption">Final Score</Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                              <Typography variant="h6">{formatTime(testResults.timeSpent)}</Typography>
                              <Typography variant="caption">Time Used</Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                              <Typography variant="h6">
                                {testResults.answers.filter(a => a.isCorrect).length}/{testResults.answers.length}
                              </Typography>
                              <Typography variant="caption">Correct Answers</Typography>
                            </Paper>
                          </Grid>
                        </Grid>

                        {!testResults.passed && (
                          <Alert severity="info" sx={{ mb: 2 }}>
                            You need {currentTheoryCheck.passingScore}% to pass. Review the material and try again.
                            You have {currentTheoryCheck.attempts - 1} attempts remaining.
                          </Alert>
                        )}

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setShowResults(false)
                              setIsTestActive(false)
                              setCurrentQuestionIndex(0)
                              setUserAnswers([])
                            }}
                          >
                            Review Questions
                          </Button>
                          {!testResults.passed && (
                            <Button
                              variant="contained"
                              startIcon={<Refresh />}
                              onClick={() => {
                                setShowResults(false)
                                setTestResults(null)
                                startTheoryCheck()
                              }}
                            >
                              Retake Assessment
                            </Button>
                          )}
                        </Box>
                      </Box>
                    )
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Select a Theory Check
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose a module from the list to start your theory check assessment.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      {/* Transcription Tab */}
      <TabPanel value={activeTab} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Plate Shorthand Transcription
            </Typography>
            <Alert severity="info">
              Transcription exercises will display shorthand plates for you to transcribe into longhand.
              This feature is being developed and will include image recognition capabilities.
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
              Dictation exercises will play audio at controlled speeds (5-30 WPM) for you to write in shorthand.
              Audio functionality and speech recognition will be implemented in the next phase.
            </Alert>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  )
}

export default Assessment