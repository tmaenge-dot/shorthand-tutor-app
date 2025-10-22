import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Paper,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Alert,
  LinearProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Replay,
  VolumeUp,
  ArrowDownward,
  ArrowUpward,
  ArrowForward,
  RadioButtonUnchecked,
  CheckCircle,
  Cancel,
  Psychology,
  AutoAwesome,
  Feedback,
  TrendingUp
} from '@mui/icons-material';

// Import authentic stroke data from uploaded book
const authenticStrokeData = {
  unit_1_straight_downstrokes: {
    title: 'Straight Downstrokes - First Six Consonants',
    description: 'Light or heavy straight strokes written downwards',
    theory: [
      "All first six strokes written downwards (P, B, T, D, CH, J)",
      "Light strokes for voiceless sounds (P, T, CH)",
      "Heavy strokes for voiced sounds (B, D, J)",
      "Arrows indicate direction - all written from top to bottom",
      "Form pairs: P/B, T/D, CH/J based on voicing"
    ],
    strokes: [
      {
        consonant: 'P',
        sound: 'Pay',
        formation: 'Light straight downstroke',
        direction: 'downward',
        weight: 'light',
        voicing: 'voiceless',
        svg_path: 'M 50 20 L 50 80',
        strokeWidth: 2,
        examples: ['pay', 'tape', 'cup', 'wrap'],
        pairs_with: 'B',
        errors_fixed: 'Was incorrectly marked as heavy - now correctly light for voiceless P'
      },
      {
        consonant: 'B',
        sound: 'Bee',
        formation: 'Heavy straight downstroke',
        direction: 'downward',
        weight: 'heavy',
        voicing: 'voiced',
        svg_path: 'M 50 20 L 50 80',
        strokeWidth: 6,
        examples: ['be', 'rebate', 'job', 'grab'],
        pairs_with: 'P',
        errors_fixed: 'Was incorrectly marked as light - now correctly heavy for voiced B'
      },
      {
        consonant: 'T',
        sound: 'Tee',
        formation: 'Light straight downstroke',
        direction: 'downward',
        weight: 'light',
        voicing: 'voiceless',
        svg_path: 'M 50 20 L 50 80',
        strokeWidth: 2,
        examples: ['take', 'ate', 'cat', 'sit'],
        pairs_with: 'D'
      },
      {
        consonant: 'D',
        sound: 'Dee',
        formation: 'Heavy straight downstroke',
        direction: 'downward',
        weight: 'heavy',
        voicing: 'voiced',
        svg_path: 'M 50 20 L 50 80',
        strokeWidth: 6,
        examples: ['day', 'edit', 'had', 'read'],
        pairs_with: 'T'
      },
      {
        consonant: 'CH',
        sound: 'Chay',
        formation: 'Light straight downstroke (longer)',
        direction: 'downward',
        weight: 'light',
        voicing: 'voiceless',
        svg_path: 'M 50 15 L 50 85',
        strokeWidth: 2,
        examples: ['cheque', 'etch', 'much', 'teach'],
        pairs_with: 'J'
      },
      {
        consonant: 'J',
        sound: 'Jay',
        formation: 'Heavy straight downstroke (longer)',
        direction: 'downward',
        weight: 'heavy',
        voicing: 'voiced',
        svg_path: 'M 50 15 L 50 85',
        strokeWidth: 6,
        examples: ['jet', 'edge', 'large', 'judge'],
        pairs_with: 'CH'
      }
    ]
  }
};

// AI-powered stroke analysis system
class StrokeAI {
  constructor() {
    this.strokeDatabase = authenticStrokeData;
    this.commonErrors = {
      'P_B_confusion': {
        error: 'Confusing P (light) with B (heavy)',
        fix: 'Remember: P=voiceless=light, B=voiced=heavy',
        frequency: 'Very Common'
      },
      'T_D_confusion': {
        error: 'Confusing T (light) with D (heavy)',
        fix: 'Remember: T=voiceless=light, D=voiced=heavy',
        frequency: 'Common'
      },
      'direction_errors': {
        error: 'Writing strokes in wrong direction',
        fix: 'All first six strokes go downward (top to bottom)',
        frequency: 'Common'
      }
    };
  }

  analyzeStroke(userStroke, targetStroke) {
    const analysis = {
      correct: false,
      confidence: 0,
      feedback: '',
      suggestions: [],
      aiInsights: []
    };

    // AI analysis of stroke characteristics
    const weightMatch = userStroke.weight === targetStroke.weight;
    const directionMatch = userStroke.direction === targetStroke.direction;
    const consonantMatch = userStroke.consonant === targetStroke.consonant;

    // Calculate confidence based on multiple factors
    let confidence = 0;
    if (consonantMatch) confidence += 40;
    if (weightMatch) confidence += 30;
    if (directionMatch) confidence += 30;

    analysis.confidence = confidence;
    analysis.correct = confidence >= 90;

    // Generate AI feedback
    if (!weightMatch && !directionMatch) {
      analysis.feedback = `Incorrect stroke weight and direction. ${targetStroke.consonant} should be ${targetStroke.weight} and ${targetStroke.direction}.`;
      analysis.suggestions.push(`Practice the ${targetStroke.weight} stroke pressure`);
      analysis.suggestions.push(`Remember ${targetStroke.direction} direction`);
    } else if (!weightMatch) {
      analysis.feedback = `Correct direction but wrong weight. ${targetStroke.consonant} is ${targetStroke.voicing}, so it should be ${targetStroke.weight}.`;
      analysis.suggestions.push(`${targetStroke.consonant} is ${targetStroke.voicing} = ${targetStroke.weight} stroke`);
      analysis.aiInsights.push(`AI detected: Common P/B or T/D confusion. Focus on voicing differences.`);
    } else if (!directionMatch) {
      analysis.feedback = `Correct weight but wrong direction. All first six strokes go ${targetStroke.direction}.`;
      analysis.suggestions.push('Practice downward stroke motion');
    } else if (consonantMatch && weightMatch && directionMatch) {
      analysis.feedback = 'Perfect! Correct consonant, weight, and direction.';
      analysis.aiInsights.push('AI detected: Excellent stroke formation understanding');
    }

    return analysis;
  }

  getPersonalizedExercises(userPerformance) {
    const exercises = [];
    
    // AI-generated exercises based on user's weak areas
    if (userPerformance.pBConfusion > 2) {
      exercises.push({
        type: 'voiced_voiceless_pairs',
        title: 'P/B Voicing Practice',
        description: 'Focus on feeling the difference between voiceless P and voiced B',
        strokes: ['P', 'B'],
        aiReason: 'Detected frequent P/B confusion - practicing voicing distinction'
      });
    }

    if (userPerformance.directionErrors > 1) {
      exercises.push({
        type: 'direction_practice',
        title: 'Downward Stroke Direction',
        description: 'Practice writing all first six strokes downward',
        strokes: ['P', 'B', 'T', 'D', 'CH', 'J'],
        aiReason: 'Detected direction inconsistencies - reinforcing downward motion'
      });
    }

    return exercises;
  }

  generateFeedback(sessionData) {
    const insights = [];
    
    // AI analysis of session patterns
    const accuracy = (sessionData.correct / sessionData.total) * 100;
    
    if (accuracy >= 90) {
      insights.push('🎉 Excellent mastery of stroke formation!');
      insights.push('✨ AI suggests moving to next unit');
    } else if (accuracy >= 70) {
      insights.push('👍 Good progress on stroke recognition');
      insights.push('🎯 Focus on weight distinction for improvement');
    } else {
      insights.push('📚 Review theory: voiceless=light, voiced=heavy');
      insights.push('🔄 Practice more with P/B and T/D pairs');
    }

    return insights;
  }
}

const AIStrokeRecognitionSystem = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [sessionResults, setSessionResults] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [strokeAI] = useState(() => new StrokeAI());
  const [userPerformance, setUserPerformance] = useState({
    total: 0,
    correct: 0,
    pBConfusion: 0,
    tDConfusion: 0,
    directionErrors: 0
  });

  const strokes = authenticStrokeData.unit_1_straight_downstrokes.strokes;
  const currentStrokeData = strokes[currentStroke];

  const handleStrokeResponse = (selectedWeight, selectedDirection) => {
    const userStroke = {
      consonant: currentStrokeData.consonant,
      weight: selectedWeight,
      direction: selectedDirection
    };

    // AI analysis
    const analysis = strokeAI.analyzeStroke(userStroke, currentStrokeData);
    setAiAnalysis(analysis);

    // Update performance tracking
    const newPerformance = { ...userPerformance };
    newPerformance.total += 1;
    if (analysis.correct) {
      newPerformance.correct += 1;
    } else {
      // Track specific error types
      if (currentStrokeData.consonant === 'P' || currentStrokeData.consonant === 'B') {
        if (selectedWeight !== currentStrokeData.weight) {
          newPerformance.pBConfusion += 1;
        }
      }
      if (selectedDirection !== currentStrokeData.direction) {
        newPerformance.directionErrors += 1;
      }
    }
    setUserPerformance(newPerformance);

    // Add to session results
    setSessionResults(prev => [...prev, {
      stroke: currentStrokeData.consonant,
      correct: analysis.correct,
      userAnswer: `${selectedWeight} ${selectedDirection}`,
      correctAnswer: `${currentStrokeData.weight} ${currentStrokeData.direction}`,
      analysis
    }]);

    setShowAIFeedback(true);
  };

  const nextStroke = () => {
    setCurrentStroke((prev) => (prev + 1) % strokes.length);
    setAiAnalysis(null);
    setShowAIFeedback(false);
  };

  const resetSession = () => {
    setCurrentStroke(0);
    setSessionResults([]);
    setAiAnalysis(null);
    setShowAIFeedback(false);
    setUserPerformance({
      total: 0,
      correct: 0,
      pBConfusion: 0,
      tDConfusion: 0,
      directionErrors: 0
    });
  };

  const renderStrokeSVG = (stroke) => (
    <svg width="100" height="100" viewBox="0 0 100 100" style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
        </marker>
      </defs>
      <path
        d={stroke.svg_path}
        stroke="#1976d2"
        strokeWidth={stroke.strokeWidth}
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <text x="50" y="95" textAnchor="middle" fontSize="12" fill="#666">
        {stroke.consonant}
      </text>
    </svg>
  );

  const getAIInsights = () => {
    if (userPerformance.total === 0) return [];
    return strokeAI.generateFeedback(userPerformance);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with AI Badge */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h4" gutterBottom fontWeight="600">
            AI-Powered Stroke Recognition
          </Typography>
          <Chip 
            icon={<Psychology />} 
            label="AI Enhanced" 
            color="primary" 
            variant="outlined"
          />
          <Chip 
            icon={<AutoAwesome />} 
            label="Authentic NCS Data" 
            color="secondary" 
            variant="outlined"
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Learn authentic Pitman shorthand strokes with AI-powered feedback from the NCS reference book
        </Typography>
      </Box>

      {/* Performance Overview */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            AI Performance Analysis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {userPerformance.total > 0 ? Math.round((userPerformance.correct / userPerformance.total) * 100) : 0}%
                </Typography>
                <Typography variant="body2">Accuracy</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="secondary">
                  {userPerformance.total}
                </Typography>
                <Typography variant="body2">Total Attempts</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="body2" gutterBottom>AI Insights:</Typography>
                <List dense>
                  {getAIInsights().map((insight, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={insight} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Current Stroke Challenge */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Identify This Stroke
              </Typography>
              
              <Box sx={{ textAlign: 'center', my: 3 }}>
                {renderStrokeSVG(currentStrokeData)}
              </Box>

              <Typography variant="body1" gutterBottom>
                <strong>Sound:</strong> {currentStrokeData.sound}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Examples: {currentStrokeData.examples.join(', ')}
              </Typography>

              {currentStrokeData.errors_fixed && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>AI Correction:</strong> {currentStrokeData.errors_fixed}
                  </Typography>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Stroke Properties
              </Typography>

              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Weight:</Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleStrokeResponse('light', 'downward')}
                    disabled={showAIFeedback}
                  >
                    Light (Thin)
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleStrokeResponse('heavy', 'downward')}
                    disabled={showAIFeedback}
                  >
                    Heavy (Thick)
                  </Button>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Remember: Voiceless sounds = Light, Voiced sounds = Heavy
                </Typography>
              </Box>

              {aiAnalysis && (
                <Alert 
                  severity={aiAnalysis.correct ? 'success' : 'error'} 
                  sx={{ mt: 2 }}
                  action={
                    <Button color="inherit" size="small" onClick={nextStroke}>
                      Next Stroke
                    </Button>
                  }
                >
                  <Typography variant="body2">
                    <strong>AI Analysis ({aiAnalysis.confidence}% confidence):</strong>
                  </Typography>
                  <Typography variant="body2">
                    {aiAnalysis.feedback}
                  </Typography>
                  {aiAnalysis.suggestions.length > 0 && (
                    <List dense>
                      {aiAnalysis.suggestions.map((suggestion, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <TrendingUp fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={suggestion} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {aiAnalysis.aiInsights.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {aiAnalysis.aiInsights.map((insight, index) => (
                        <Typography key={index} variant="body2" sx={{ fontStyle: 'italic' }}>
                          💡 {insight}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Theory Reference */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Authentic NCS Theory Reference
          </Typography>
          <List>
            {authenticStrokeData.unit_1_straight_downstrokes.theory.map((point, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary={point} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Session Controls */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={resetSession}>
          Reset Session
        </Button>
        <Button variant="contained" onClick={nextStroke} disabled={!showAIFeedback}>
          Next Stroke
        </Button>
      </Box>
    </Box>
  );
};

export default AIStrokeRecognitionSystem;