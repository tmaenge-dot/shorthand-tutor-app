import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert
} from '@mui/material'
import {
  School,
  PlayArrow,
  Assignment,
  CheckCircle,
  RadioButtonUnchecked,
  Gesture
} from '@mui/icons-material'
import { useLessons } from '../../hooks/useLessons'
import { useUserProgress } from '../../hooks/useUserProgress'
import ShorthandSymbol from '../../components/ShorthandSymbol/ShorthandSymbol'
import StrokePractice from '../../components/StrokePractice/StrokePractice'
import { shorthandSymbols } from '../../data/lessonData'

const LessonModule: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { lessons } = useLessons()
  const { state: userProgressState } = useUserProgress()
  
  // Stroke practice state
  const [practiceSymbol, setPracticeSymbol] = React.useState(null)
  const [isPracticeOpen, setIsPracticeOpen] = React.useState(false)

  // Practice handlers
  const handleStartPractice = (symbol: any) => {
    setPracticeSymbol(symbol)
    setIsPracticeOpen(true)
  }

  const handlePracticeComplete = (symbolId: string, accuracy: number) => {
    // Here you could update user progress
    setIsPracticeOpen(false)
    setPracticeSymbol(null)
  }

  const currentLesson = lessons.find(lesson => lesson.id === moduleId)
  
  if (!currentLesson) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Module not found. Please select a valid lesson module.
        </Alert>
      </Box>
    )
  }

  const moduleProgress = userProgressState.userProgress.find(p => p.moduleId === moduleId)
  const completedLessons = moduleProgress?.lessonProgress.filter(lp => lp.completed).length || 0

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Module {currentLesson.id}: {currentLesson.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Chip 
            label={`Week ${currentLesson.weekNumber}`} 
            color="primary" 
          />
          <Chip 
            label={`Semester ${currentLesson.semester}`} 
            color="secondary" 
          />
          <Chip 
            label={`${completedLessons}/${currentLesson.content.length} Lessons Complete`} 
            color={completedLessons === currentLesson.content.length ? 'success' : 'default'}
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          {currentLesson.description}
        </Typography>
      </Box>

      {/* Lesson Objectives */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Learning Objectives
          </Typography>
          <List dense>
            {currentLesson.objectives.map((objective, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={objective} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Shorthand Symbols for this Module */}
      {moduleId && ['B', 'C', 'D', 'E'].includes(moduleId) && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Gesture color="primary" />
              <Typography variant="h6">
                Shorthand Symbols
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Interactive demonstrations of the shorthand symbols introduced in this module
            </Typography>
            
            <Grid container spacing={2}>
              {Object.values(shorthandSymbols)
                .filter(symbol => {
                  // Show relevant symbols based on module
                  if (moduleId === 'B') return ['P', 'B', 'T', 'D', 'CH', 'J', 'S'].includes(symbol.id)
                  if (moduleId === 'C') return ['F', 'V'].includes(symbol.id)
                  if (moduleId === 'D') return ['S', 'A_DOT', 'E_DOT', 'I_DOT'].includes(symbol.id)
                  if (moduleId === 'E') return symbol.category === 'vowel'
                  return false
                })
                .map((symbol) => (
                  <Grid item xs={12} sm={6} md={4} key={symbol.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <ShorthandSymbol 
                          symbolData={symbol} 
                          showAnimation={true}
                          size="small"
                        />
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="outlined"
                          startIcon={<Gesture />}
                          onClick={() => handleStartPractice(symbol)}
                          size="small"
                          fullWidth
                        >
                          Practice Stroke
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Lesson Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lesson Content
              </Typography>
              
              <Stepper orientation="vertical">
                {currentLesson.content.map((lesson, index) => {
                  const isCompleted = moduleProgress?.lessonProgress.find(lp => lp.lessonId === `${moduleId}-${index + 1}`)?.completed || false
                  
                  return (
                    <Step key={index} active={true} completed={isCompleted}>
                      <StepLabel
                        StepIconComponent={() => (
                          isCompleted ? 
                            <CheckCircle color="success" /> : 
                            <RadioButtonUnchecked color="primary" />
                        )}
                      >
                        <Typography variant="h6">
                          {lesson.title}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {lesson.content}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Button
                            variant="contained"
                            startIcon={<PlayArrow />}
                            href={`/practice/${moduleId}`}
                            size="small"
                          >
                            Practice
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<Assignment />}
                            href={`/assessment/${moduleId}`}
                            size="small"
                          >
                            Assessment
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>
                  )
                })}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<School />}
                  href={`/practice/${moduleId}`}
                >
                  Start Practice
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Assignment />}
                  href={`/assessment/${moduleId}`}
                >
                  Take Assessment
                </Button>
                
                <Button
                  variant="text"
                  fullWidth
                  href="/dashboard"
                >
                  Back to Dashboard
                </Button>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Progress Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete all lessons and pass the theory check to unlock the next module.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Stroke Practice Dialog */}
      <StrokePractice
        symbolData={practiceSymbol}
        isOpen={isPracticeOpen}
        onClose={() => setIsPracticeOpen(false)}
        onComplete={handlePracticeComplete}
      />
    </Box>
  )
}

export default LessonModule