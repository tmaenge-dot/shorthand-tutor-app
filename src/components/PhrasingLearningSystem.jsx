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
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  ExpandMore,
  Link as LinkIcon,
  Speed,
  Group,
  CheckCircle,
  PlayArrow,
  Pause,
  Edit,
  Visibility,
  TrendingUp,
  School,
  Psychology,
  Info,
  Timer,
  Assessment
} from '@mui/icons-material';

// Authentic phrasing system from NCS materials
const phrasingSystem = {
  definition: 'Joining shorthand outlines to increase writing speed',
  core_rules: [
    'Outlines should only be phrased when they join easily and naturally',
    'The meaning must remain clear',
    'First word in phrase written in normal position',
    'Subsequent words adapt to maintain smooth joining'
  ],
  common_phrase_types: {
    article_noun_phrases: {
      description: 'Articles joined to nouns',
      examples: [
        { phrase: 'a man', formation: 'a-outline + man-outline joined', frequency: 'very_high' },
        { phrase: 'the time', formation: 'the-tick + time-outline', frequency: 'very_high' },
        { phrase: 'an opportunity', formation: 'an-outline + opportunity joined', frequency: 'medium' }
      ]
    },
    preposition_phrases: {
      description: 'Prepositions joined to following words',
      examples: [
        { phrase: 'to do', formation: 'to-stroke + do-stroke joined', frequency: 'very_high' },
        { phrase: 'of the', formation: 'of-outline + the-tick', frequency: 'very_high' },
        { phrase: 'in order', formation: 'in-stroke + order-outline', frequency: 'medium' }
      ]
    },
    auxiliary_verb_phrases: {
      description: 'Helper verbs joined to main verbs',
      examples: [
        { phrase: 'should be', formation: 'should-outline + be-stroke', frequency: 'high' },
        { phrase: 'could do', formation: 'could-outline + do-stroke', frequency: 'high' },
        { phrase: 'would like', formation: 'would-outline + like-outline', frequency: 'high' }
      ]
    },
    percentage_phrases: {
      description: 'Special percentage phrasing',
      examples: [
        { phrase: '5 per cent', formation: '5 + per cent sign', frequency: 'medium' },
        { phrase: '20 per cent', formation: '20 + per cent sign', frequency: 'medium' },
        { phrase: 'per annum', formation: 'per cent + annum-outline', frequency: 'low' }
      ]
    }
  },
  the_tick: {
    description: 'Light slanting tick representing "the"',
    usage: 'Added at end of words in phrases',
    examples: ['to the', 'do the', 'is to the'],
    rule: 'Tick written as light slanting mark at end of preceding outline'
  }
};

const PhrasingExercise = ({ phrase, type, onComplete, showHint = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);

  const steps = [
    {
      label: 'Identify Components',
      description: `Break down "${phrase}" into individual words`,
      action: 'Identify each word in the phrase'
    },
    {
      label: 'Check Joining',
      description: 'Determine if words can join naturally',
      action: 'Verify smooth connection is possible'
    },
    {
      label: 'Form Phrase',
      description: 'Write the complete phrased outline',
      action: 'Create the joined outline'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete && onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Phrasing Exercise: "{phrase}"
        </Typography>
        
        <Chip 
          label={type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          color="primary"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Stepper activeStep={currentStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography variant="body2" paragraph>
                  {step.description}
                </Typography>
                
                {showHint && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      💡 <strong>Hint:</strong> {step.action}
                    </Typography>
                  </Alert>
                )}

                <Box sx={{ mt: 2, mb: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Complete' : 'Next'}
                  </Button>
                  {index > 0 && (
                    <Button onClick={handleBack}>
                      Back
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </CardContent>
    </Card>
  );
};

const PhraseTypeCard = ({ type, typeData, isExpanded, onToggle }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'article_noun_phrases':
        return <School />;
      case 'preposition_phrases':
        return <LinkIcon />;
      case 'auxiliary_verb_phrases':
        return <Speed />;
      case 'percentage_phrases':
        return <Assessment />;
      default:
        return <Group />;
    }
  };

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'very_high': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  return (
    <Accordion expanded={isExpanded} onChange={onToggle}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box display="flex" alignItems="center" gap={2}>
          {getTypeIcon(type)}
          <Box>
            <Typography variant="h6">
              {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {typeData.description}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      
      <AccordionDetails>
        <Grid container spacing={2}>
          {typeData.examples.map((example, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ p: 2 }}>
                <Box display="flex" justifyContent="between" alignItems="center" mb={1}>
                  <Typography variant="h6" color="primary">
                    "{example.phrase}"
                  </Typography>
                  <Chip 
                    size="small"
                    label={example.frequency.replace('_', ' ')}
                    color={getFrequencyColor(example.frequency)}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  <strong>Formation:</strong> {example.formation}
                </Typography>
                
                <Box mt={2}>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    variant="outlined"
                  >
                    Practice This Phrase
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const PhrasingSpeedTest = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [completedPhrases, setCompletedPhrases] = useState([]);
  const [userInputs, setUserInputs] = useState({});

  const testPhrases = [
    'to do the work',
    'should be able',
    'and the time',
    'of the people',
    'would like to see',
    'in order to',
    'because of the',
    'should have been'
  ];

  React.useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      onComplete && onComplete({
        completed: completedPhrases.length,
        total: testPhrases.length,
        inputs: userInputs
      });
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, completedPhrases.length, onComplete, userInputs]);

  const startTest = () => {
    setIsActive(true);
    setCurrentPhrase(0);
    setTimeRemaining(60);
    setCompletedPhrases([]);
    setUserInputs({});
  };

  const nextPhrase = () => {
    if (currentPhrase < testPhrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
    }
  };

  const markComplete = () => {
    const newCompleted = [...completedPhrases, currentPhrase];
    setCompletedPhrases(newCompleted);
    nextPhrase();
  };

  if (!isActive && completedPhrases.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Timer sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Phrasing Speed Test
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Write as many phrases as possible in 60 seconds
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={startTest}
            size="large"
          >
            Start Speed Test
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!isActive && completedPhrases.length > 0) {
    const wpm = Math.round((completedPhrases.length * 60) / (60 - timeRemaining));
    
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Test Complete!
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            {completedPhrases.length} phrases
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Estimated {wpm} phrases per minute
          </Typography>
          <Button
            variant="contained"
            onClick={startTest}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            Phrasing Speed Test
          </Typography>
          <Typography variant="h6" color="primary">
            {timeRemaining}s
          </Typography>
        </Box>

        <LinearProgress 
          variant="determinate" 
          value={(completedPhrases.length / testPhrases.length) * 100}
          sx={{ mb: 3 }}
        />

        <Box textAlign="center" mb={3}>
          <Typography variant="h4" color="primary" gutterBottom>
            "{testPhrases[currentPhrase]}"
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            Write this phrase as quickly as possible
          </Typography>

          <TextField
            fullWidth
            label="Your phrased outline"
            value={userInputs[currentPhrase] || ''}
            onChange={(e) => setUserInputs({
              ...userInputs,
              [currentPhrase]: e.target.value
            })}
            sx={{ mb: 2 }}
          />
        </Box>

        <Box display="flex" gap={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={markComplete}
          >
            Complete & Next
          </Button>
          
          <Button
            variant="outlined"
            onClick={nextPhrase}
          >
            Skip
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
          Completed: {completedPhrases.length}/{testPhrases.length}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const PhrasingLearningSystem = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [expandedType, setExpandedType] = useState('article_noun_phrases');
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleTypeToggle = (type) => {
    setExpandedType(expandedType === type ? null : type);
  };

  const tabs = [
    { label: 'Phrase Types', icon: <Group /> },
    { label: 'Practice Exercises', icon: <Edit /> },
    { label: 'Speed Development', icon: <Speed /> }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Phrasing Learning System
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Phrasing for Speed:</strong> Master the art of joining shorthand outlines to achieve 
          high-speed writing. {phrasingSystem.definition}
        </Typography>
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {tabs.map((tab, index) => (
            <Tab 
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Phrase Types Tab */}
      {currentTab === 0 && (
        <Box>
          {/* Core Rules */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🎯 Core Phrasing Rules
              </Typography>
              <List>
                {phrasingSystem.core_rules.map((rule, index) => (
                  <ListItem key={index}>
                    <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                    <ListItemText primary={rule} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* The Tick Special Case */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="secondary">
                Special: The "The" Tick
              </Typography>
              <Typography variant="body2" paragraph>
                {phrasingSystem.the_tick.description}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Usage:</strong> {phrasingSystem.the_tick.usage}
              </Typography>
              <Typography variant="body2">
                <strong>Examples:</strong> {phrasingSystem.the_tick.examples.join(', ')}
              </Typography>
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Rule:</strong> {phrasingSystem.the_tick.rule}
                </Typography>
              </Alert>
            </CardContent>
          </Card>

          {/* Phrase Types */}
          <Typography variant="h6" gutterBottom>
            Common Phrase Types
          </Typography>
          
          {Object.entries(phrasingSystem.common_phrase_types).map(([type, typeData]) => (
            <PhraseTypeCard
              key={type}
              type={type}
              typeData={typeData}
              isExpanded={expandedType === type}
              onToggle={() => handleTypeToggle(type)}
            />
          ))}
        </Box>
      )}

      {/* Practice Exercises Tab */}
      {currentTab === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Interactive Phrasing Practice
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PhrasingExercise
                phrase="to do the work"
                type="preposition_phrases"
                showHint={true}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <PhrasingExercise
                phrase="should be able"
                type="auxiliary_verb_phrases"
                showHint={true}
              />
            </Grid>
          </Grid>

          {/* Practice Tips */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💡 Phrasing Practice Tips
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Psychology color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Think in Speech Patterns"
                    secondary="Phrase words that naturally flow together in speech"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Speed color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Maintain Legibility"
                    secondary="Never sacrifice clarity for speed - good phrasing is readable phrasing"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><TrendingUp color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Start Simple"
                    secondary="Begin with 2-word phrases, gradually build to longer combinations"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Speed Development Tab */}
      {currentTab === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Phrasing Speed Development
          </Typography>
          
          <PhrasingSpeedTest
            onComplete={(results) => {
              console.log('Speed test results:', results);
            }}
          />

          {/* Speed Development Tips */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🚀 Speed Development Strategy
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      Stage 1: Foundation
                    </Typography>
                    <Typography variant="body2">
                      Master 2-word phrases with high-frequency shortforms
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      Stage 2: Building
                    </Typography>
                    <Typography variant="body2">
                      Expand to 3-4 word phrases with complex combinations
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      Stage 3: Mastery
                    </Typography>
                    <Typography variant="body2">
                      Achieve automatic phrasing of common speech patterns
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default PhrasingLearningSystem;