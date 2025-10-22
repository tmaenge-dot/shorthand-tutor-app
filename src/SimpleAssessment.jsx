import React, { useState, useEffect } from 'react'
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
  Paper,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Alert,
  Chip,
  FormLabel,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material'
import {
  Assignment,
  Timer,
  CheckCircle,
  School,
  PlayArrow,
  Stop
} from '@mui/icons-material'
import { useLessons } from '@hooks/useLessons'
import { useUserProgress } from '@hooks/useUserProgress'
import { getModuleAssessmentQuestions } from './data/assessmentQuestions'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`assessment-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const SimpleAssessment = () => {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const [selectedModule, setSelectedModule] = useState(moduleId || 'A')
  const [activeTab, setActiveTab] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isAssessmentStarted, setIsAssessmentStarted] = useState(false)
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [assessmentResults, setAssessmentResults] = useState(null)
  const { lessons, getLessonById } = useLessons()
  const { updateModuleProgress, completeTheoryCheck } = useUserProgress()
  
  const currentLesson = getLessonById(selectedModule)

  // Timer effect
  useEffect(() => {
    let timer
    if (isAssessmentStarted && timeLeft > 0 && !isAssessmentComplete) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isAssessmentStarted) {
      handleSubmitAssessment()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, isAssessmentStarted, isAssessmentComplete])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const generateAssessmentQuestions = (lesson) => {
    if (!lesson) return []

    // Use authentic NCS assessment questions
    const ncsQuestions = getModuleAssessmentQuestions(lesson.id, 5)
    if (ncsQuestions && ncsQuestions.length > 0) {
      return ncsQuestions
    }
    
    // Legacy module questions (keeping as backup)
    const moduleQuestions = {
      'A': [
        {
          id: 'A1',
          question: 'What is the fundamental principle of Phonography?',
          options: [
            'One sound = one symbol',
            'One letter = one stroke', 
            'One word = one symbol',
            'One syllable = one stroke'
          ],
          correct: 0,
          explanation: 'Phonography represents speech sounds, not letters.'
        },
        {
          id: 'A2',
          question: 'In shorthand, consonants are represented by:',
          options: [
            'Dots and dashes',
            'Strokes (lines and curves)',
            'Circles only',
            'Numbers'
          ],
          correct: 1,
          explanation: 'Consonants form the skeleton of words using strokes.'
        },
        {
          id: 'A3',
          question: 'The "wheel" exercise helps develop:',
          options: [
            'Speed writing',
            'Smooth, controlled strokes',
            'Memory skills',
            'Reading ability'
          ],
          correct: 1,
          explanation: 'The wheel exercise builds muscle memory for smooth strokes.'
        }
      ],
      'B': [
        {
          id: 'B1',
          question: 'Which stroke represents the letter "P" in Pitman shorthand?',
          options: [
            'Heavy downward stroke',
            'Light downward stroke',
            'Light upward stroke',
            'Heavy upward stroke'
          ],
          correct: 1,
          explanation: 'P is represented by a light downward stroke.'
        },
        {
          id: 'B2',
          question: 'The difference between light and heavy strokes is:',
          options: [
            'Length of the stroke',
            'Direction of the stroke',
            'Thickness of the stroke',
            'Position of the stroke'
          ],
          correct: 2,
          explanation: 'Heavy strokes are thicker than light strokes.'
        },
        {
          id: 'B3',
          question: 'Which letters form the first three pairs of straight strokes?',
          options: [
            'P-B, T-D, K-G',
            'P-B, T-D, Ch-J',
            'S-Z, F-V, Th-Th',
            'M-N, L-R, W-Y'
          ],
          correct: 1,
          explanation: 'The first six consonants are P-B, T-D, Ch-J.'
        }
      ],
      'C': [
        {
          id: 'C1',
          question: 'The letter "S" is represented by:',
          options: [
            'A straight stroke',
            'A small circle',
            'A large circle',
            'A dot'
          ],
          correct: 1,
          explanation: 'S is represented by a small circle.'
        },
        {
          id: 'C2',
          question: 'Circle S can be added to:',
          options: [
            'Vowels only',
            'Consonant strokes',
            'Numbers only',
            'Special signs only'
          ],
          correct: 1,
          explanation: 'Circle S combines with consonant strokes for speed.'
        }
      ]
    }

    // Use module-specific questions or generate generic ones
    const moduleQs = moduleQuestions[lesson.id] || []
    
    // Add generic questions based on lesson objectives
    lesson.objectives?.forEach((objective, index) => {
      if (moduleQs.length < 10) {
        moduleQs.push({
          id: `${lesson.id}_OBJ${index}`,
          question: `Which objective relates to: "${objective}"?`,
          options: [
            'Module content understanding',
            'Practical application',
            'Theory knowledge',
            'All of the above'
          ],
          correct: 3,
          explanation: `This objective covers comprehensive understanding of ${lesson.title}.`
        })
      }
    })

    return moduleQs.slice(0, 10) // Limit to 10 questions
  }

  const currentQuestions = generateAssessmentQuestions(currentLesson)

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleStartAssessment = () => {
    setIsAssessmentStarted(true)
    setAnswers({})
    setTimeLeft(1800) // Reset timer
    setIsAssessmentComplete(false)
    setAssessmentResults(null)
  }

  const handleSubmitAssessment = async () => {
    setIsAssessmentStarted(false)
    setIsAssessmentComplete(true)
    
    // Calculate score
    let correctAnswers = 0
    const totalQuestions = currentQuestions.length
    
    currentQuestions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correctAnswers++
      }
    })
    
    const score = Math.round((correctAnswers / totalQuestions) * 100)
    const passed = score >= 95
    
    const results = {
      score,
      correctAnswers,
      totalQuestions,
      passed,
      timeSpent: 1800 - timeLeft,
      moduleId: selectedModule,
      moduleTitle: currentLesson?.title || 'Unknown Module'
    }
    
    setAssessmentResults(results)
    
    // Update progress with theory check result
    if (completeTheoryCheck) {
      try {
        const theoryCheckResult = {
          checkId: `${selectedModule}_theory_${Date.now()}`,
          attempt: 1, // We could track this properly
          score,
          passed,
          completedAt: new Date(),
          answers: currentQuestions.map(question => ({
            questionId: question.id,
            userAnswer: String(answers[question.id] ?? -1),
            isCorrect: answers[question.id] === question.correct,
            timeSpent: 30 // Could track individual question time
          })),
          timeSpent: 1800 - timeLeft
        }
        
        await completeTheoryCheck(selectedModule, theoryCheckResult)
      } catch (error) {
        console.error('Error updating theory check progress:', error)
      }
    }
  }

  const resetAssessment = () => {
    setIsAssessmentStarted(false)
    setIsAssessmentComplete(false)
    setAnswers({})
    setAssessmentResults(null)
    setTimeLeft(1800)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Assessment Center
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Test your shorthand knowledge and skills
      </Typography>

      {/* Assessment Type Selection */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<Assignment />} label="Theory Check" />
          <Tab icon={<Timer />} label="Speed Test" />
          <Tab icon={<CheckCircle />} label="Results" />
        </Tabs>
      </Paper>

      {/* Module Selector */}
      {!isAssessmentStarted && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <School color="primary" />
              <Typography variant="h6">Assessment Module:</Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Select Module</InputLabel>
                <Select
                  value={selectedModule}
                  label="Select Module"
                  onChange={(e) => setSelectedModule(e.target.value)}
                >
                  {lessons.map((lesson) => (
                    <MenuItem key={lesson.id} value={lesson.id}>
                      Module {lesson.id} - {lesson.title}
                    </MenuItem>
                  ))}
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
          </CardContent>
        </Card>
      )}

      {/* Theory Check Tab */}
      <TabPanel value={activeTab} index={0}>
        {!isAssessmentStarted && !isAssessmentComplete && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Module {selectedModule} - Theory Check
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {currentLesson?.title || 'Select a module to begin'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Test your understanding of the concepts and techniques covered in this module.
                  </Typography>

                  {currentLesson && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Module Objectives:
                      </Typography>
                      {currentLesson.objectives?.map((objective, index) => (
                        <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                          • {objective}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  <Alert severity="info" sx={{ mb: 3 }}>
                    This assessment contains {currentQuestions.length} questions. You need 95% or higher to pass.
                  </Alert>

                  <Button 
                    variant="contained" 
                    size="large"
                    startIcon={<PlayArrow />}
                    onClick={handleStartAssessment}
                    disabled={!currentLesson || currentQuestions.length === 0}
                  >
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Assessment Info
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Questions"
                        secondary={`${currentQuestions.length} multiple choice`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Time Limit"
                        secondary="30 minutes"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Pass Mark"
                        secondary="95% (19/20 or 9/10)"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Attempts"
                        secondary="Unlimited retakes"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {isAssessmentStarted && !isAssessmentComplete && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">
                      Module {selectedModule} Assessment - In Progress
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Timer color="primary" />
                      <Typography variant="h6" color="primary">
                        {formatTime(timeLeft)}
                      </Typography>
                    </Box>
                  </Box>

                  <LinearProgress 
                    variant="determinate" 
                    value={(Object.keys(answers).length / currentQuestions.length) * 100}
                    sx={{ mb: 3, height: 8, borderRadius: 4 }}
                  />

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Progress: {Object.keys(answers).length} of {currentQuestions.length} questions answered
                  </Typography>

                  {currentQuestions.map((question, index) => (
                    <Box key={question.id} sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom>
                        Question {index + 1}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {question.question}
                      </Typography>
                      
                      <FormControl component="fieldset">
                        <RadioGroup
                          value={answers[question.id] ?? ''}
                          onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                        >
                          {question.options.map((option, optIndex) => (
                            <FormControlLabel
                              key={optIndex}
                              value={optIndex}
                              control={<Radio />}
                              label={option}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  ))}

                  <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                    <Button 
                      variant="contained" 
                      size="large"
                      onClick={handleSubmitAssessment}
                      disabled={Object.keys(answers).length !== currentQuestions.length}
                    >
                      Submit Assessment
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large"
                      startIcon={<Stop />}
                      onClick={resetAssessment}
                    >
                      Cancel
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Assessment Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Questions completed: {Object.keys(answers).length}/{currentQuestions.length}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    {currentQuestions.map((question, index) => (
                      <Chip
                        key={question.id}
                        label={index + 1}
                        color={answers[question.id] !== undefined ? 'success' : 'default'}
                        size="small"
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Box>

                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Time remaining: {formatTime(timeLeft)}
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {isAssessmentComplete && assessmentResults && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <CheckCircle 
                      sx={{ 
                        fontSize: 60, 
                        color: assessmentResults.passed ? 'success.main' : 'error.main',
                        mb: 2 
                      }} 
                    />
                    <Typography variant="h4" gutterBottom>
                      {assessmentResults.passed ? 'Congratulations!' : 'Assessment Complete'}
                    </Typography>
                    <Typography variant="h6" color={assessmentResults.passed ? 'success.main' : 'error.main'}>
                      {assessmentResults.passed ? 'You Passed!' : 'Keep Practicing!'}
                    </Typography>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="h4" color="primary">
                          {assessmentResults.score}%
                        </Typography>
                        <Typography variant="body2">Final Score</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="h4" color="info.main">
                          {assessmentResults.correctAnswers}/{assessmentResults.totalQuestions}
                        </Typography>
                        <Typography variant="body2">Correct Answers</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {assessmentResults.passed ? (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Excellent! You have mastered the concepts in Module {selectedModule}. 
                      You can now proceed to the next module.
                    </Alert>
                  ) : (
                    <Alert severity="info" sx={{ mb: 3 }}>
                      You need 95% to pass. Review the module content and try again. 
                      Focus on the areas where you had incorrect answers.
                    </Alert>
                  )}

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      onClick={resetAssessment}
                    >
                      Take Again
                    </Button>
                    <Button 
                      variant="outlined"
                      onClick={() => navigate(`/practice/${selectedModule}`)}
                    >
                      Review Module
                    </Button>
                    <Button 
                      variant="outlined"
                      onClick={() => navigate('/dashboard')}
                    >
                      Back to Dashboard
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </TabPanel>

      {/* Speed Test Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Speed Development Tests
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Official timed shorthand writing assessments for certification
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                          15 WPM Test
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          5 minute duration • Beginner Level
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                          Module {selectedModule} content
                        </Typography>
                        <Button 
                          variant="contained" 
                          fullWidth
                          onClick={() => navigate(`/speed-development/${selectedModule}`)}
                        >
                          Start Test
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                          20 WPM Test
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          7 minute duration • Intermediate Level
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                          Module {selectedModule} content
                        </Typography>
                        <Button 
                          variant="contained" 
                          fullWidth
                          onClick={() => navigate(`/speed-development/${selectedModule}`)}
                        >
                          Start Test
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                          30 WPM Test
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          10 minute duration • Professional Level
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                          Module {selectedModule} content
                        </Typography>
                        <Button 
                          variant="contained" 
                          fullWidth
                          onClick={() => navigate(`/speed-development/${selectedModule}`)}
                        >
                          Start Test
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Alert severity="info" sx={{ mt: 3 }}>
                  Speed tests use vocabulary and content from the selected module. 
                  Make sure you're comfortable with the module material before taking the test.
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Results Tab */}
      <TabPanel value={activeTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Assessment Results History
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Your recent assessment results and progress across all modules
                </Typography>

                {assessmentResults ? (
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Latest Result - Module {assessmentResults.moduleId}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {assessmentResults.moduleTitle}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Typography variant="h4" color={assessmentResults.passed ? 'success.main' : 'error.main'}>
                              {assessmentResults.score}%
                            </Typography>
                            <Chip 
                              label={assessmentResults.passed ? 'PASSED' : 'FAILED'}
                              color={assessmentResults.passed ? 'success' : 'error'}
                            />
                          </Box>
                          
                          <Typography variant="body2">
                            Correct: {assessmentResults.correctAnswers}/{assessmentResults.totalQuestions} questions
                          </Typography>
                          <Typography variant="body2">
                            Time: {Math.floor(assessmentResults.timeSpent / 60)}m {assessmentResults.timeSpent % 60}s
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                ) : (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Complete an assessment to view your results here.
                  </Alert>
                )}

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                  Module Progress Overview
                </Typography>
                
                <Grid container spacing={2}>
                  {lessons.slice(0, 12).map((lesson) => (
                    <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6">Module {lesson.id}</Typography>
                            <Chip 
                              label="Not Started"
                              size="small"
                              color="default"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {lesson.title}
                          </Typography>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            fullWidth
                            onClick={() => {
                              setSelectedModule(lesson.id)
                              setActiveTab(0)
                            }}
                          >
                            Take Assessment
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  )
}

export default SimpleAssessment