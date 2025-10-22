import React, { useState } from 'react';
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
  LinearProgress
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Replay,
  VolumeUp,
  ArrowDownward,
  ArrowUpward,
  ArrowForward,
  RadioButtonUnchecked
} from '@mui/icons-material';

// Import stroke visualization data
const strokeVisualizationData = {
  unit_1_straight_downstrokes: {
    title: 'Straight Downstrokes - First Six Consonants',
    description: 'Light or heavy straight strokes written downwards',
    strokes: [
      {
        consonant: 'P',
        sound: 'Pay',
        formation: 'Light straight downstroke',
        direction: 'downward',
        weight: 'light',
        svg_path: 'M 50 20 L 50 80',
        examples: ['pay', 'tape', 'cup'],
        pairs_with: 'B'
      },
      {
        consonant: 'B',
        sound: 'Bee',
        formation: 'Heavy straight downstroke',
        direction: 'downward',
        weight: 'heavy',
        svg_path: 'M 50 20 L 50 80',
        examples: ['be', 'rebate', 'job'],
        pairs_with: 'P'
      },
      {
        consonant: 'T',
        sound: 'Tee',
        formation: 'Light straight downstroke',
        direction: 'downward',
        weight: 'light',
        svg_path: 'M 50 20 L 50 80',
        examples: ['take', 'ate', 'cat'],
        pairs_with: 'D'
      },
      {
        consonant: 'D',
        sound: 'Dee',
        formation: 'Heavy straight downstroke',
        direction: 'downward',
        weight: 'heavy',
        svg_path: 'M 50 20 L 50 80',
        examples: ['day', 'edit', 'had'],
        pairs_with: 'T'
      },
      {
        consonant: 'CH',
        sound: 'Chay',
        formation: 'Light slanted downstroke',
        direction: 'downward',
        weight: 'light',
        svg_path: 'M 30 20 L 70 80',
        examples: ['cheque', 'etch', 'much'],
        pairs_with: 'J'
      },
      {
        consonant: 'J',
        sound: 'Jay',
        formation: 'Heavy slanted downstroke',
        direction: 'downward',
        weight: 'heavy',
        svg_path: 'M 30 20 L 70 80',
        examples: ['jet', 'edge', 'large'],
        pairs_with: 'CH'
      }
    ]
  },
  unit_2_curved_strokes: {
    title: 'Curved Strokes',
    description: 'Light or heavy curved strokes for fricatives',
    strokes: [
      {
        consonant: 'F',
        sound: 'Ef',
        formation: 'Light curved stroke',
        direction: 'upward_curve',
        weight: 'light',
        svg_path: 'M 20 80 Q 50 50 80 20',
        examples: ['if', 'of', 'staff'],
        pairs_with: 'V'
      },
      {
        consonant: 'V',
        sound: 'Vee',
        formation: 'Heavy curved stroke',
        direction: 'upward_curve',
        weight: 'heavy',
        svg_path: 'M 20 80 Q 50 50 80 20',
        examples: ['have', 'give', 'voice'],
        pairs_with: 'F'
      },
      {
        consonant: 'TH(light)',
        sound: 'Ith',
        formation: 'Light curved stroke (voiceless TH)',
        direction: 'upward_curve_steep',
        weight: 'light',
        svg_path: 'M 15 80 Q 50 40 85 20',
        examples: ['think', 'with', 'path'],
        pairs_with: 'TH(heavy)'
      },
      {
        consonant: 'TH(heavy)',
        sound: 'Thee',
        formation: 'Heavy curved stroke (voiced TH)',
        direction: 'upward_curve_steep',
        weight: 'heavy',
        svg_path: 'M 15 80 Q 50 40 85 20',
        examples: ['the', 'that', 'this'],
        pairs_with: 'TH(light)'
      },
      {
        consonant: 'S',
        sound: 'Ess',
        formation: 'Small circle (clockwise)',
        direction: 'circle',
        weight: 'light',
        svg_path: 'M 60 50 A 10 10 0 1 1 40 50 A 10 10 0 1 1 60 50',
        examples: ['so', 'see', 'his'],
        pairs_with: 'Z'
      },
      {
        consonant: 'SH',
        sound: 'Esh',
        formation: 'Light curved stroke (shallow)',
        direction: 'downward_curve',
        weight: 'light',
        svg_path: 'M 20 20 Q 50 50 80 80',
        examples: ['she', 'shop', 'fish'],
        pairs_with: 'ZH'
      }
    ]
  }
};

const StrokeVisualization = ({ stroke, isAnimating, showDirection }) => {
  const getDirectionIcon = (direction) => {
    switch (direction) {
      case 'downward':
        return <ArrowDownward fontSize="small" />;
      case 'upward':
      case 'upward_slant':
        return <ArrowUpward fontSize="small" />;
      case 'horizontal':
        return <ArrowForward fontSize="small" />;
      case 'circle':
        return <RadioButtonUnchecked fontSize="small" />;
      default:
        return <ArrowUpward fontSize="small" />;
    }
  };

  const getStrokeColor = (weight) => {
    return weight === 'heavy' ? '#1976d2' : '#757575';
  };

  const getStrokeWidth = (weight) => {
    return weight === 'heavy' ? '4' : '2';
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" color="primary">
            {stroke.consonant}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip 
              size="small" 
              label={stroke.weight}
              color={stroke.weight === 'heavy' ? 'primary' : 'default'}
            />
            {showDirection && (
              <Tooltip title={`Direction: ${stroke.direction}`}>
                <Box>{getDirectionIcon(stroke.direction)}</Box>
              </Tooltip>
            )}
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" mb={2}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
              <style>
                {`
                  .stroke-path {
                    stroke: ${getStrokeColor(stroke.weight)};
                    stroke-width: ${getStrokeWidth(stroke.weight)};
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                  }
                  .stroke-animated {
                    stroke-dasharray: 100;
                    stroke-dashoffset: ${isAnimating ? '0' : '100'};
                    transition: stroke-dashoffset 1.5s ease-in-out;
                  }
                `}
              </style>
            </defs>
            
            {/* Grid lines for reference */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3" />
            
            {/* Main stroke */}
            <path 
              d={stroke.svg_path}
              className={`stroke-path ${isAnimating ? 'stroke-animated' : ''}`}
            />
            
            {/* Direction indicator */}
            {showDirection && stroke.direction !== 'circle' && (
              <polygon 
                points="45,15 50,5 55,15" 
                fill={getStrokeColor(stroke.weight)}
                transform={`rotate(${stroke.direction === 'downward' ? 180 : 0} 50 50)`}
              />
            )}
          </svg>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center" mb={1}>
          {stroke.formation}
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" mb={2}>
          Sound: <strong>{stroke.sound}</strong>
        </Typography>

        {stroke.pairs_with && (
          <Alert severity="info" sx={{ mb: 2, fontSize: '0.75rem' }}>
            Pairs with <strong>{stroke.pairs_with}</strong> (same formation, different weight)
          </Alert>
        )}

        <Box>
          <Typography variant="body2" fontWeight="bold" mb={1}>
            Examples:
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {stroke.examples.map((example, index) => (
              <Chip 
                key={index}
                size="small" 
                label={example}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const StrokeRecognitionSystem = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [animatingStrokes, setAnimatingStrokes] = useState(new Set());
  const [showDirections, setShowDirections] = useState(true);
  const [practiceMode, setPracticeMode] = useState(false);

  const units = Object.values(strokeVisualizationData);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setAnimatingStrokes(new Set()); // Reset animations
  };

  const animateStroke = (strokeIndex) => {
    setAnimatingStrokes(prev => new Set(prev).add(strokeIndex));
    setTimeout(() => {
      setAnimatingStrokes(prev => {
        const newSet = new Set(prev);
        newSet.delete(strokeIndex);
        return newSet;
      });
    }, 1500);
  };

  const animateAllStrokes = () => {
    const currentUnit = units[currentTab];
    currentUnit.strokes.forEach((_, index) => {
      setTimeout(() => animateStroke(index), index * 300);
    });
  };

  const currentUnit = units[currentTab];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Stroke Recognition System
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Authentic NCS Stroke Formation:</strong> Learn how different consonant sounds are represented 
          by specific stroke formations. Notice how <strong>light strokes</strong> represent voiceless sounds 
          while <strong>heavy strokes</strong> represent voiced sounds.
        </Typography>
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {units.map((unit, index) => (
            <Tab 
              key={index}
              label={`Unit ${index + 1}`}
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Box>

      <Box mb={3}>
        <Typography variant="h5" gutterBottom>
          {currentUnit.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {currentUnit.description}
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={animateAllStrokes}
          >
            Animate All Strokes
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowDirections(!showDirections)}
          >
            {showDirections ? 'Hide' : 'Show'} Directions
          </Button>
          <Button
            variant="outlined"
            onClick={() => setPracticeMode(!practiceMode)}
          >
            {practiceMode ? 'Learning' : 'Practice'} Mode
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {currentUnit.strokes.map((stroke, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box position="relative">
              <StrokeVisualization
                stroke={stroke}
                isAnimating={animatingStrokes.has(index)}
                showDirection={showDirections}
              />
              <IconButton
                sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8,
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
                size="small"
                onClick={() => animateStroke(index)}
              >
                <Replay fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {practiceMode && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Practice Exercise
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Can you identify which strokes go together as pairs? Remember: paired consonants 
            use the same formation but different weights (light vs heavy).
          </Typography>
          
          <Box display="flex" gap={2} flexWrap="wrap">
            {currentUnit.strokes.map((stroke, index) => (
              <Chip
                key={index}
                label={`${stroke.consonant} (${stroke.weight})`}
                color={stroke.weight === 'heavy' ? 'primary' : 'default'}
                variant="outlined"
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default StrokeRecognitionSystem;