import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox
} from '@mui/material'
import { AppIcons } from '../../utils/iconManager'

const AdvancedAssessmentSystem = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [assessments, setAssessments] = useState([])
  const [activeAssessment, setActiveAssessment] = useState(null)
  const [assessmentResults, setAssessmentResults] = useState([])
  const [certifications, setCertifications] = useState([])
  const [benchmarkData, setBenchmarkData] = useState({
    userRank: 0,
    totalUsers: 0,
    percentile: 0,
    averageScores: {},
    industryBenchmarks: {},
    skillComparison: {
      accuracy: { user: 0, average: 0, target: 0 },
      speed: { user: 0, average: 0, target: 0 },
      theory: { user: 0, average: 0, target: 0 },
      consistency: { user: 0, average: 0, target: 0 }
    },
    improvementTrends: {}
  })
  const [assessmentDialogOpen, setAssessmentDialogOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isAssessmentActive, setIsAssessmentActive] = useState(false)

  useEffect(() => {
    generateAssessments()
    generateAssessmentResults()
    generateCertifications()
    generateBenchmarkData()
  }, [])

  const generateAssessments = () => {
    const assessmentList = [
      {
        id: 'module_a_assessment',
        title: 'Module A Comprehensive Assessment',
        description: 'Test your knowledge of basic strokes and fundamental principles',
        type: 'comprehensive',
        difficulty: 'beginner',
        duration: 30, // minutes
        totalQuestions: 25,
        passingScore: 70,
        topics: ['Straight Strokes', 'Basic Consonants', 'Writing Position', 'Theory Fundamentals'],
        availableFrom: '2025-10-15',
        availableUntil: '2025-12-31',
        attempts: 2,
        maxAttempts: 3,
        bestScore: 85,
        lastAttempt: '2025-10-18',
        status: 'available',
        certification: 'Module A Certificate',
        skillsAssessed: ['accuracy', 'theory_knowledge', 'basic_strokes'],
        estimatedCompletion: 25
      },
      {
        id: 'speed_assessment_40',
        title: 'Speed Assessment - 40 WPM',
        description: 'Timed dictation test to measure writing speed and accuracy',
        type: 'speed',
        difficulty: 'intermediate',
        duration: 10,
        totalQuestions: 1,
        passingScore: 95,
        topics: ['Speed Writing', 'Dictation', 'Accuracy Under Pressure'],
        availableFrom: '2025-10-20',
        availableUntil: '2025-12-31',
        attempts: 0,
        maxAttempts: 5,
        bestScore: null,
        lastAttempt: null,
        status: 'locked',
        certification: 'Speed Certificate - 40 WPM',
        skillsAssessed: ['speed', 'accuracy', 'fluency'],
        estimatedCompletion: 8,
        prerequisite: 'Module A Assessment'
      },
      {
        id: 'accuracy_master_test',
        title: 'Accuracy Master Test',
        description: 'Precision-focused assessment testing symbol accuracy and consistency',
        type: 'accuracy',
        difficulty: 'advanced',
        duration: 45,
        totalQuestions: 50,
        passingScore: 90,
        topics: ['Symbol Precision', 'Vowel Placement', 'Stroke Quality', 'Consistency'],
        availableFrom: '2025-11-01',
        availableUntil: '2025-12-31',
        attempts: 0,
        maxAttempts: 2,
        bestScore: null,
        lastAttempt: null,
        status: 'coming_soon',
        certification: 'Accuracy Master Certificate',
        skillsAssessed: ['accuracy', 'precision', 'consistency'],
        estimatedCompletion: 40,
        prerequisite: 'Speed Assessment - 40 WPM'
      },
      {
        id: 'professional_certification',
        title: 'Professional Shorthand Certification',
        description: 'Comprehensive evaluation for professional shorthand competency',
        type: 'certification',
        difficulty: 'expert',
        duration: 120,
        totalQuestions: 100,
        passingScore: 85,
        topics: ['All Modules', 'Speed', 'Accuracy', 'Professional Standards'],
        availableFrom: '2025-12-01',
        availableUntil: '2025-12-31',
        attempts: 0,
        maxAttempts: 1,
        bestScore: null,
        lastAttempt: null,
        status: 'locked',
        certification: 'Professional Shorthand Certificate',
        skillsAssessed: ['comprehensive', 'professional_competency'],
        estimatedCompletion: 115,
        prerequisite: 'All previous assessments'
      }
    ]

    setAssessments(assessmentList)
  }

  const generateAssessmentResults = () => {
    const results = [
      {
        id: 'result_1',
        assessmentId: 'module_a_assessment',
        assessmentTitle: 'Module A Comprehensive Assessment',
        completedAt: '2025-10-18T14:30:00Z',
        score: 85,
        passingScore: 70,
        totalQuestions: 25,
        correctAnswers: 21,
        timeSpent: 22, // minutes
        accuracy: 84,
        speed: null,
        strengths: ['Straight Strokes', 'Theory Knowledge'],
        weaknesses: ['Curved Strokes', 'Speed'],
        recommendations: [
          'Focus on curved stroke practice',
          'Increase practice session frequency',
          'Review vowel placement rules'
        ],
        skillBreakdown: {
          accuracy: 88,
          theory_knowledge: 92,
          basic_strokes: 80
        },
        questionAnalysis: [
          { category: 'Straight Strokes', correct: 8, total: 10, percentage: 80 },
          { category: 'Curved Strokes', correct: 6, total: 8, percentage: 75 },
          { category: 'Theory', correct: 7, total: 7, percentage: 100 }
        ],
        certificateEarned: true,
        certificateId: 'CERT_MA_001'
      }
    ]

    setAssessmentResults(results)
  }

  const generateCertifications = () => {
    const certs = [
      {
        id: 'CERT_MA_001',
        title: 'Module A Certificate',
        description: 'Fundamental Shorthand Skills',
        earnedDate: '2025-10-18',
        expiryDate: '2027-10-18',
        issuer: 'Shorthand Learning Academy',
        credentialId: 'SLA-MA-2025-001',
        skills: ['Basic Strokes', 'Theory Fundamentals', 'Writing Position'],
        level: 'Beginner',
        score: 85,
        isValid: true,
        canDownload: true,
        canShare: true,
        verificationUrl: 'https://verify.shorthand-academy.com/CERT_MA_001'
      }
    ]

    setCertifications(certs)
  }

  const generateBenchmarkData = () => {
    const data = {
      userRank: 15,
      totalUsers: 1250,
      percentile: 88,
      averageScores: {
        beginner: 75,
        intermediate: 68,
        advanced: 62,
        expert: 55
      },
      industryBenchmarks: {
        studentAverage: 72,
        professionalMinimum: 85,
        expertLevel: 95
      },
      skillComparison: {
        accuracy: { user: 84, average: 78, target: 90 },
        speed: { user: 28, average: 32, target: 40 },
        theory: { user: 92, average: 75, target: 85 },
        consistency: { user: 78, average: 70, target: 85 }
      },
      improvementTrends: {
        lastMonth: 8,
        lastWeek: 3,
        overall: 'improving'
      }
    }

    setBenchmarkData(data)
  }

  const handleStartAssessment = (assessmentId) => {
    const assessment = assessments.find(a => a.id === assessmentId)
    if (assessment && assessment.status === 'available') {
      setActiveAssessment(assessment)
      setCurrentQuestion(0)
      setUserAnswers({})
      setTimeRemaining(assessment.duration * 60) // Convert to seconds
      setAssessmentDialogOpen(true)
      setIsAssessmentActive(true)
    }
  }

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmitAssessment = () => {
    // Process assessment submission
    setIsAssessmentActive(false)
    setAssessmentDialogOpen(false)
    
    // Generate results (simulation)
    const mockResult = {
      id: `result_${Date.now()}`,
      assessmentId: activeAssessment.id,
      assessmentTitle: activeAssessment.title,
      completedAt: new Date().toISOString(),
      score: Math.floor(Math.random() * 20) + 75, // 75-95
      passingScore: activeAssessment.passingScore,
      timeSpent: activeAssessment.duration - Math.floor(timeRemaining / 60),
      // ... other result properties
    }
    
    setAssessmentResults(prev => [...prev, mockResult])
  }

  const getStatusColor = (status) => {
    const colors = {
      available: 'success',
      locked: 'error',
      coming_soon: 'warning',
      completed: 'info'
    }
    return colors[status] || 'default'
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'error',
      expert: 'secondary'
    }
    return colors[difficulty] || 'default'
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Show loading state until data is initialized
  if (!benchmarkData?.skillComparison?.accuracy) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography variant="h6" color="text.secondary">Loading assessment data...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Assessment color="primary" />
        Advanced Assessment System
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Comprehensive testing, certification tracking, and performance benchmarking
      </Typography>

      {/* Performance Overview */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {benchmarkData.percentile}%
              </Typography>
              <Typography variant="h6">Percentile Rank</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                #{benchmarkData.userRank} of {benchmarkData.totalUsers} users
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{benchmarkData?.skillComparison?.accuracy?.user || 0}%</Typography>
                  <Typography variant="body2">Accuracy</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{benchmarkData?.skillComparison?.speed?.user || 0}</Typography>
                  <Typography variant="body2">WPM</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{benchmarkData?.skillComparison?.theory?.user || 0}%</Typography>
                  <Typography variant="body2">Theory</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{benchmarkData.improvementTrends.lastMonth}%</Typography>
                  <Typography variant="body2">Monthly Growth</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab icon={<Quiz />} label="Assessments" />
          <Tab icon={<BarChart />} label="Results" />
          <Tab icon={<CardMembership />} label="Certifications" />
          <Tab icon={<CompareArrows />} label="Benchmarks" />
        </Tabs>
      </Paper>

      {/* Assessments Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {assessments.map((assessment) => (
            <Grid item xs={12} md={6} key={assessment.id}>
              <Card sx={{ height: '100%', position: 'relative' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {assessment.title}
                    </Typography>
                    <Chip 
                      label={assessment.status.replace('_', ' ')} 
                      color={getStatusColor(assessment.status)}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {assessment.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      label={assessment.difficulty} 
                      size="small" 
                      color={getDifficultyColor(assessment.difficulty)}
                    />
                    <Chip 
                      label={`${assessment.duration} min`} 
                      size="small" 
                      variant="outlined"
                      icon={<Timer />}
                    />
                    <Chip 
                      label={`${assessment.totalQuestions} questions`} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Pass Score:</strong> {assessment.passingScore}%
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Attempts:</strong> {assessment.attempts}/{assessment.maxAttempts}
                    </Typography>
                    {assessment.bestScore && (
                      <Typography variant="body2" gutterBottom>
                        <strong>Best Score:</strong> {assessment.bestScore}%
                      </Typography>
                    )}
                    {assessment.prerequisite && (
                      <Typography variant="body2" color="warning.main">
                        <strong>Prerequisite:</strong> {assessment.prerequisite}
                      </Typography>
                    )}
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                      Topics Covered:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {assessment.topics.map((topic, index) => (
                        <Chip 
                          key={index} 
                          label={topic} 
                          size="small" 
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Est. {assessment.estimatedCompletion} min
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<PlayArrow />}
                      onClick={() => handleStartAssessment(assessment.id)}
                      disabled={assessment.status !== 'available'}
                    >
                      {assessment.attempts > 0 ? 'Retake' : 'Start'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Results Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          {assessmentResults.map((result) => (
            <Grid item xs={12} key={result.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" gutterBottom>
                        {result.assessmentTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Completed: {new Date(result.completedAt).toLocaleDateString()}
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4" color={result.score >= result.passingScore ? 'success.main' : 'error.main'}>
                              {result.score}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Final Score
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4">{result.correctAnswers}/{result.totalQuestions}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Correct Answers
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4">{result.timeSpent}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Minutes
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4">{result.accuracy}%</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Accuracy
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                        Strengths:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {result.strengths.map((strength, index) => (
                          <Chip key={index} label={strength} size="small" color="success" />
                        ))}
                      </Box>
                      
                      <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                        Areas for Improvement:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {result.weaknesses.map((weakness, index) => (
                          <Chip key={index} label={weakness} size="small" color="warning" />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                    Detailed Breakdown:
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell align="right">Correct</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="right">Percentage</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.questionAnalysis.map((category, index) => (
                          <TableRow key={index}>
                            <TableCell>{category.category}</TableCell>
                            <TableCell align="right">{category.correct}</TableCell>
                            <TableCell align="right">{category.total}</TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {category.percentage}%
                                <LinearProgress 
                                  variant="determinate" 
                                  value={category.percentage} 
                                  sx={{ flexGrow: 1, height: 4 }}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Certifications Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          {certifications.map((cert) => (
            <Grid item xs={12} md={6} key={cert.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                      <CardMembership />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {cert.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {cert.description}
                      </Typography>
                      <Chip label={cert.level} size="small" color="primary" />
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Earned Date
                      </Typography>
                      <Typography variant="body1">
                        {new Date(cert.earnedDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Score Achieved
                      </Typography>
                      <Typography variant="body1" color="success.main">
                        {cert.score}%
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Credential ID
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {cert.credentialId}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Valid Until
                      </Typography>
                      <Typography variant="body1">
                        {new Date(cert.expiryDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button size="small" startIcon={<Download />}>
                      Download
                    </Button>
                    <Button size="small" startIcon={<Share />}>
                      Share
                    </Button>
                    <Button size="small" startIcon={<Info />}>
                      Verify
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Benchmarks Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Comparison
                </Typography>
                
                {Object.entries(benchmarkData?.skillComparison || {}).map(([skill, data]) => (
                  <Box key={skill} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                        {skill.replace('_', ' ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        You: {data.user} | Avg: {data.average} | Target: {data.target}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ position: 'relative', height: 20, bgcolor: 'action.hover', borderRadius: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(data.user / data.target) * 100}
                        sx={{ 
                          height: '100%', 
                          borderRadius: 1,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: data.user >= data.target ? 'success.main' : 
                                   data.user >= data.average ? 'warning.main' : 'error.main'
                          }
                        }}
                      />
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          left: `${(data.average / data.target) * 100}%`, 
                          top: 0, 
                          height: '100%', 
                          width: 2, 
                          bgcolor: 'text.secondary' 
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Industry Benchmarks
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <School color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Student Average"
                      secondary={`${benchmarkData.industryBenchmarks.studentAverage}%`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Assignment color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Professional Minimum"
                      secondary={`${benchmarkData.industryBenchmarks.professionalMinimum}%`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EmojiEvents color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Expert Level"
                      secondary={`${benchmarkData.industryBenchmarks.expertLevel}%`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Assessment Dialog */}
      <Dialog open={assessmentDialogOpen} onClose={() => setAssessmentDialogOpen(false)} maxWidth="md" fullWidth>
        {activeAssessment && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{activeAssessment.title}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip 
                    icon={<Timer />} 
                    label={formatTime(timeRemaining)} 
                    color={timeRemaining < 300 ? 'error' : 'primary'}
                  />
                  <Typography variant="body2">
                    Question {currentQuestion + 1} of {activeAssessment.totalQuestions}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Alert severity="info" sx={{ mb: 3 }}>
                This is a simulated assessment interface. In a real implementation, 
                questions would be loaded dynamically based on the assessment type.
              </Alert>
              
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Sample Question: Identify the correct stroke
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Which stroke correctly represents the consonant "P"?
                </Typography>
                
                <FormControl component="fieldset">
                  <RadioGroup>
                    <FormControlLabel value="a" control={<Radio />} label="Heavy downward stroke" />
                    <FormControlLabel value="b" control={<Radio />} label="Light downward stroke" />
                    <FormControlLabel value="c" control={<Radio />} label="Light upward stroke" />
                    <FormControlLabel value="d" control={<Radio />} label="Heavy upward stroke" />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setAssessmentDialogOpen(false)}>
                Exit Assessment
              </Button>
              <Button variant="outlined">
                Previous
              </Button>
              <Button variant="outlined">
                Next
              </Button>
              <Button variant="contained" onClick={handleSubmitAssessment}>
                Submit Assessment
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default AdvancedAssessmentSystem