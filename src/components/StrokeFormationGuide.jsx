import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import {
  ExpandMore,
  ArrowDownward,
  ArrowUpward,
  ArrowForward,
  RadioButtonUnchecked,
  Info,
  School,
  Psychology,
  Lightbulb
} from '@mui/icons-material';

const StrokeFormationGuide = () => {
  const [expandedSection, setExpandedSection] = useState('formation-basics');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedSection(isExpanded ? panel : false);
  };

  const formationRules = {
    directionRules: {
      downward: 'Written from top to bottom',
      upward: 'Written from bottom to top',
      horizontal: 'Written from left to right',
      upward_slant: 'Written diagonally upward',
      upward_curve: 'Curved upward motion',
      circle: 'Small circle, written clockwise'
    },
    weightRules: {
      light: 'Thin stroke for voiceless sounds',
      heavy: 'Thick stroke for voiced sounds'
    },
    pairingRules: {
      voiced_voiceless: 'Most consonants form pairs based on voicing',
      same_formation: 'Paired consonants use same stroke direction',
      weight_differs: 'Only weight (thickness) distinguishes pairs'
    }
  };

  const strokeExamples = {
    straightStrokes: [
      {
        consonant: 'P',
        sound: 'Pay',
        formation: 'Light straight downstroke',
        example: 'pay, tape, cup',
        phoneticNote: 'Voiceless bilabial plosive'
      },
      {
        consonant: 'B',
        sound: 'Bee',
        formation: 'Heavy straight downstroke',
        example: 'be, rebate, job',
        phoneticNote: 'Voiced bilabial plosive'
      },
      {
        consonant: 'T',
        sound: 'Tee',
        formation: 'Light straight upstroke',
        example: 'take, ate, cat',
        phoneticNote: 'Voiceless alveolar plosive'
      },
      {
        consonant: 'D',
        sound: 'Dee',
        formation: 'Heavy straight upstroke',
        example: 'day, edit, had',
        phoneticNote: 'Voiced alveolar plosive'
      }
    ],
    curvedStrokes: [
      {
        consonant: 'F',
        sound: 'Ef',
        formation: 'Light curved stroke',
        example: 'if, of, staff',
        phoneticNote: 'Voiceless labiodental fricative'
      },
      {
        consonant: 'V',
        sound: 'Vee',
        formation: 'Heavy curved stroke',
        example: 'have, give, voice',
        phoneticNote: 'Voiced labiodental fricative'
      },
      {
        consonant: 'TH(light)',
        sound: 'Ith',
        formation: 'Light curved stroke (steep)',
        example: 'think, with, path',
        phoneticNote: 'Voiceless dental fricative'
      },
      {
        consonant: 'TH(heavy)',
        sound: 'Thee',
        formation: 'Heavy curved stroke (steep)',
        example: 'the, that, this',
        phoneticNote: 'Voiced dental fricative'
      }
    ],
    horizontalStrokes: [
      {
        consonant: 'K',
        sound: 'Kay',
        formation: 'Light horizontal stroke',
        example: 'key, make, back',
        phoneticNote: 'Voiceless velar plosive'
      },
      {
        consonant: 'G',
        sound: 'Gay',
        formation: 'Heavy horizontal stroke',
        example: 'go, big, bag',
        phoneticNote: 'Voiced velar plosive'
      },
      {
        consonant: 'M',
        sound: 'Em',
        formation: 'Heavy horizontal stroke',
        example: 'my, me, some',
        phoneticNote: 'Voiced bilabial nasal'
      },
      {
        consonant: 'N',
        sound: 'En',
        formation: 'Light horizontal stroke',
        example: 'no, one, can',
        phoneticNote: 'Voiced alveolar nasal'
      }
    ]
  };

  const theoryPoints = [
    'Straight strokes written downwards (P, B) or upwards (T, D, CH, J)',
    'Light strokes for voiceless sounds (P, T, CH, F, K)',
    'Heavy strokes for voiced sounds (B, D, J, V, G)',
    'Arrows indicate direction - never written in other directions',
    'Form pairs: P/B, T/D, CH/J, F/V, K/G based on voicing',
    'Horizontal strokes always written left to right',
    'Curved strokes follow specific patterns for fricatives'
  ];

  const commonMistakes = [
    {
      mistake: 'Confusing stroke weight',
      explanation: 'Remember: Light = voiceless, Heavy = voiced',
      solution: 'Practice pairs together: P/B, T/D, F/V'
    },
    {
      mistake: 'Wrong stroke direction',
      explanation: 'Each consonant has a fixed direction',
      solution: 'Use arrows: ↓ for P/B, ↑ for T/D, ← → for K/G/M/N'
    },
    {
      mistake: 'Inconsistent formations',
      explanation: 'Stroke formation must be identical for recognition',
      solution: 'Practice regular, consistent movements'
    }
  ];

  const StudyTips = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        🎯 Study Tips for Stroke Mastery
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon><School /></ListItemIcon>
          <ListItemText 
            primary="Learn in Pairs"
            secondary="Study P/B together, then T/D, then CH/J - this helps understand the light/heavy pattern"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><Psychology /></ListItemIcon>
          <ListItemText 
            primary="Voice vs Voiceless"
            secondary="Put your hand on your throat: 'P' (no vibration) vs 'B' (vibration) = light vs heavy stroke"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><Lightbulb /></ListItemIcon>
          <ListItemText 
            primary="Direction Memory"
            secondary="P/B fall down (↓), T/D go up (↑), K/G/M/N go across (→)"
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Complete Stroke Formation Guide
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Based on Authentic NCS Material:</strong> This guide uses the exact stroke formations 
          from the Pitman New Era Shorthand Anniversary Edition. Master these fundamental patterns 
          to build your shorthand foundation.
        </Typography>
      </Alert>

      {/* Formation Basics */}
      <Accordion 
        expanded={expandedSection === 'formation-basics'} 
        onChange={handleAccordionChange('formation-basics')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Formation Basics & Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Direction Rules
                </Typography>
                {Object.entries(formationRules.directionRules).map(([key, value]) => (
                  <Box key={key} sx={{ mb: 1 }}>
                    <Chip size="small" label={key.replace('_', ' ')} sx={{ mr: 1 }} />
                    <Typography variant="body2">{value}</Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Weight Rules
                </Typography>
                {Object.entries(formationRules.weightRules).map(([key, value]) => (
                  <Box key={key} sx={{ mb: 1 }}>
                    <Chip 
                      size="small" 
                      label={key} 
                      color={key === 'heavy' ? 'primary' : 'default'}
                      sx={{ mr: 1 }} 
                    />
                    <Typography variant="body2">{value}</Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Pairing Rules
                </Typography>
                {Object.entries(formationRules.pairingRules).map(([key, value]) => (
                  <Box key={key} sx={{ mb: 1 }}>
                    <Typography variant="body2">• {value}</Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Straight Strokes */}
      <Accordion 
        expanded={expandedSection === 'straight-strokes'} 
        onChange={handleAccordionChange('straight-strokes')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Unit 1: Straight Strokes (P, B, T, D, CH, J)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {strokeExamples.straightStrokes.map((stroke, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" color="primary" gutterBottom>
                      {stroke.consonant}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Sound:</strong> {stroke.sound}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Formation:</strong> {stroke.formation}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Examples:</strong> {stroke.example}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stroke.phoneticNote}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Curved Strokes */}
      <Accordion 
        expanded={expandedSection === 'curved-strokes'} 
        onChange={handleAccordionChange('curved-strokes')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Unit 2: Curved Strokes (F, V, TH, S, SH)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {strokeExamples.curvedStrokes.map((stroke, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" color="primary" gutterBottom>
                      {stroke.consonant}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Sound:</strong> {stroke.sound}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Formation:</strong> {stroke.formation}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Examples:</strong> {stroke.example}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stroke.phoneticNote}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Horizontal Strokes */}
      <Accordion 
        expanded={expandedSection === 'horizontal-strokes'} 
        onChange={handleAccordionChange('horizontal-strokes')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Unit 3: Horizontal Strokes (K, G, M, N, NG, L)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {strokeExamples.horizontalStrokes.map((stroke, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" color="primary" gutterBottom>
                      {stroke.consonant}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Sound:</strong> {stroke.sound}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Formation:</strong> {stroke.formation}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Examples:</strong> {stroke.example}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stroke.phoneticNote}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Theory Points */}
      <Accordion 
        expanded={expandedSection === 'theory-points'} 
        onChange={handleAccordionChange('theory-points')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Essential Theory Points</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {theoryPoints.map((point, index) => (
              <ListItem key={index}>
                <ListItemIcon><Info color="primary" /></ListItemIcon>
                <ListItemText primary={point} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Common Mistakes */}
      <Accordion 
        expanded={expandedSection === 'common-mistakes'} 
        onChange={handleAccordionChange('common-mistakes')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Common Mistakes & Solutions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {commonMistakes.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" color="error" gutterBottom>
                      ❌ {item.mistake}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.explanation}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="success.main">
                      ✅ {item.solution}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Study Tips */}
      <Accordion 
        expanded={expandedSection === 'study-tips'} 
        onChange={handleAccordionChange('study-tips')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Study Tips & Memory Aids</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StudyTips />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default StrokeFormationGuide;