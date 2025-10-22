import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Alert,
  LinearProgress,
  Chip,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Lightbulb,
  Replay,
  Assessment,
  TrendingUp
} from '@mui/icons-material';

// Stroke Recognition Assessment Questions
const strokeRecognitionAssessments = {
  unit_1_formation: [
    {
      type: 'stroke_identification',
      question: 'Which consonant is represented by a light straight downstroke?',
      options: ['P (Pay)', 'B (Bee)', 'T (Tee)', 'D (Dee)'],
      correct: 0,
      explanation: 'P (Pay) is written as a light straight downstroke',
      visual_hint: 'Think: Light = voiceless sound, Downward = from top to bottom'
    },
    {
      type: 'direction_practice',
      question: 'In which direction is the T stroke written?',
      options: ['Downward', 'Upward', 'Horizontal', 'Curved'],
      correct: 0,
      explanation: 'T is written as a downward stroke from top to bottom',
      visual_hint: 'Remember: All first six strokes (P, B, T, D, CH, J) are downward'
    },
    {
      type: 'weight_distinction',
      question: 'What makes B different from P in stroke formation?',
      options: ['Direction', 'Weight (thickness)', 'Length', 'Curvature'],
      correct: 1,
      explanation: 'B is heavy (thick), P is light (thin) - same downward direction',
      visual_hint: 'Voiced sounds = heavy strokes, Voiceless sounds = light strokes'
    },
    {
      type: 'pairing_practice',
      question: 'Which consonant pairs with CH (Chay)?',
      options: ['SH', 'J (Jay)', 'TH', 'K'],
      correct: 1,
      explanation: 'CH and J form a pair - same slanted downstroke formation, different weights',
      visual_hint: 'Both use slanted downward strokes - CH is light, J is heavy'
    },
    {
      type: 'formation_understanding',
      question: 'Why are some strokes written upward and others downward?',
      options: [
        'Random assignment',
        'Based on sound frequency',
        'Systematic formation rules for different consonant types',
        'Personal preference'
      ],
      correct: 2,
      explanation: 'Each consonant has a specific formation rule based on phonetic properties',
      visual_hint: 'P/B downward, T/D upward, CH/J slanted - systematic patterns'
    }
  ],
  unit_2_formation: [
    {
      type: 'curve_recognition',
      question: 'How is the F sound represented in shorthand?',
      options: ['Light curved stroke', 'Heavy curved stroke', 'Straight stroke', 'Circle'],
      correct: 0,
      explanation: 'F is written as a light curved stroke (voiceless fricative)',
      visual_hint: 'Fricatives use curved strokes - light for voiceless (F), heavy for voiced (V)'
    },
    {
      type: 'th_distinction',
      question: 'The difference between TH in "think" and TH in "the" is:',
      options: ['No difference', 'Light vs heavy stroke', 'Different directions', 'Different lengths'],
      correct: 1,
      explanation: 'Think=voiceless TH (light), The=voiced TH (heavy)',
      visual_hint: 'Same curved formation, weight shows voicing: light=voiceless, heavy=voiced'
    },
    {
      type: 'circle_stroke',
      question: 'Which consonant is represented by a small circle?',
      options: ['S', 'Z', 'SH', 'TH'],
      correct: 0,
      explanation: 'S is written as a small circle, written clockwise',
      visual_hint: 'Only S uses the circle - unique formation for this common sound'
    },
    {
      type: 'curve_direction',
      question: 'Curved strokes for F and V are written in which direction?',
      options: ['Downward curve', 'Upward curve', 'Horizontal curve', 'Circular'],
      correct: 1,
      explanation: 'F and V use upward curved strokes - light for F, heavy for V',
      visual_hint: 'Curve goes up and forward - like a gentle arc'
    }
  ],
  unit_3_formation: [
    {
      type: 'horizontal_practice',
      question: 'Horizontal strokes are written in which direction?',
      options: ['Top to bottom', 'Bottom to top', 'Left to right', 'Right to left'],
      correct: 2,
      explanation: 'All horizontal strokes (K, G, M, N, NG) are written left to right',
      visual_hint: 'Think of writing a line across the page - always left to right'
    },
    {
      type: 'nasal_recognition',
      question: 'Which consonants use horizontal strokes?',
      options: ['P, B, T, D', 'F, V, TH, S', 'K, G, M, N, NG', 'CH, J, SH, Z'],
      correct: 2,
      explanation: 'K, G (velars), M, N, NG (nasals) all use horizontal strokes',
      visual_hint: 'Horizontal strokes for velars (K,G) and nasals (M,N,NG)'
    }
  ]
};

const StrokeAssessmentQuestion = ({ 
  question, 
  onAnswer, 
  showResult, 
  userAnswer, 
  isCorrect 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setSelectedAnswer('');
    setShowHint(false);
  }, [question]);

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== '') {
      onAnswer(parseInt(selectedAnswer));
    }
  };

  const getQuestionIcon = (type) => {
    switch (type) {
      case 'stroke_identification':
        return '✏️';
      case 'direction_practice':
        return '↗️';
      case 'weight_distinction':
        return '⚖️';
      case 'pairing_practice':
        return '🔗';
      case 'formation_understanding':
        return '🧠';
      case 'curve_recognition':
        return '〰️';
      case 'th_distinction':
        return '👅';
      case 'circle_stroke':
        return '⭕';
      case 'horizontal_practice':
        return '↔️';
      case 'nasal_recognition':
        return '👃';
      default:
        return '❓';
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Typography variant="h2" component="span">
            {getQuestionIcon(question.type)}
          </Typography>
          <Box>
            <Typography variant="h6">
              {question.question}
            </Typography>
            <Chip 
              size="small" 
              label={question.type.replace('_', ' ')}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>

        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          >
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index.toString()}
                control={<Radio />}
                label={option}
                disabled={showResult}
                sx={{
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: 
                    showResult && index === question.correct 
                      ? '#e8f5e8' 
                      : showResult && index === userAnswer && !isCorrect
                      ? '#ffebee'
                      : 'transparent',
                  border: 
                    showResult && index === question.correct
                      ? '2px solid #4caf50'
                      : showResult && index === userAnswer && !isCorrect
                      ? '2px solid #f44336'
                      : '1px solid transparent'
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box display="flex" gap={2} mt={2}>
          {!showResult && (
            <Button
              variant="contained"
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === ''}
            >
              Submit Answer
            </Button>
          )}
          
          <Button
            variant="outlined"
            startIcon={<Lightbulb />}
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? 'Hide' : 'Show'} Hint
          </Button>
        </Box>

        {showHint && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              💡 <strong>Hint:</strong> {question.visual_hint}
            </Typography>
          </Alert>
        )}

        {showResult && (
          <Alert 
            severity={isCorrect ? 'success' : 'error'} 
            sx={{ mt: 2 }}
            icon={isCorrect ? <CheckCircle /> : <Cancel />}
          >
            <Typography variant="body2">
              <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {question.explanation}
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export const StrokeRecognitionAssessment = () => {
  const [currentUnit, setCurrentUnit] = useState('unit_1_formation');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState([]);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestions = strokeRecognitionAssessments[currentUnit];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswer = (answerIndex) => {
    const isCorrect = answerIndex === currentQuestion.correct;
    const newUserAnswers = [...userAnswers];
    const newShowResults = [...showResults];
    
    newUserAnswers[currentQuestionIndex] = answerIndex;
    newShowResults[currentQuestionIndex] = true;
    
    setUserAnswers(newUserAnswers);
    setShowResults(newShowResults);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Auto-advance after 3 seconds
    setTimeout(() => {
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setAssessmentComplete(true);
      }
    }, 3000);
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults([]);
    setAssessmentComplete(false);
    setScore(0);
  };

  const switchUnit = (unitKey) => {
    setCurrentUnit(unitKey);
    resetAssessment();
  };

  const progressPercentage = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

  if (assessmentComplete) {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Assessment sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          
          <Typography variant="h4" gutterBottom>
            Assessment Complete!
          </Typography>
          
          <Typography variant="h2" color="primary" gutterBottom>
            {percentage}%
          </Typography>
          
          <Typography variant="h6" color="text.secondary" paragraph>
            You scored {score} out of {currentQuestions.length} questions correctly
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} mb={3}>
            <Chip 
              label={percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Needs Practice'}
              color={percentage >= 80 ? 'success' : percentage >= 60 ? 'primary' : 'warning'}
              size="large"
            />
          </Box>

          <Alert 
            severity={percentage >= 80 ? 'success' : percentage >= 60 ? 'info' : 'warning'}
            sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}
          >
            {percentage >= 80 ? 
              'Great work! You have a solid understanding of stroke formations.' :
              percentage >= 60 ?
              'Good progress! Review the concepts you missed and try again.' :
              'Keep practicing! Stroke recognition is fundamental to shorthand success.'
            }
          </Alert>

          <Box display="flex" gap={2} justifyContent="center">
            <Button
              variant="contained"
              startIcon={<Replay />}
              onClick={resetAssessment}
            >
              Retake Assessment
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<TrendingUp />}
              onClick={() => switchUnit(
                currentUnit === 'unit_1_formation' ? 'unit_2_formation' : 'unit_1_formation'
              )}
            >
              Try Different Unit
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Stroke Recognition Assessment
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        {Object.keys(strokeRecognitionAssessments).map((unitKey) => (
          <Button
            key={unitKey}
            variant={currentUnit === unitKey ? 'contained' : 'outlined'}
            onClick={() => switchUnit(unitKey)}
            size="small"
          >
            {unitKey.replace('unit_', 'Unit ').replace('_', ' ')}
          </Button>
        ))}
      </Box>

      <Box mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestionIndex + 1} of {currentQuestions.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Score: {score}/{currentQuestions.length}
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progressPercentage}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      <StrokeAssessmentQuestion
        question={currentQuestion}
        onAnswer={handleAnswer}
        showResult={showResults[currentQuestionIndex]}
        userAnswer={userAnswers[currentQuestionIndex]}
        isCorrect={userAnswers[currentQuestionIndex] === currentQuestion.correct}
      />

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          variant="outlined"
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <Button
          variant="outlined"
          onClick={() => setCurrentQuestionIndex(Math.min(currentQuestions.length - 1, currentQuestionIndex + 1))}
          disabled={currentQuestionIndex === currentQuestions.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default StrokeRecognitionAssessment;