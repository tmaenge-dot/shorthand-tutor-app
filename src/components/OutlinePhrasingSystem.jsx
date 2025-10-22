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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress
} from '@mui/material';
import {
  ExpandMore,
  Create,
  Speed,
  Link as LinkIcon,
  School,
  Psychology,
  Timeline,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Group
} from '@mui/icons-material';

// Import the generated outline construction data
const outlineConstructionSystem = {
  principles: {
    basic_construction: {
      definition: 'An outline is the complete representation of a word using strokes and vowels',
      components: [
        'Consonant strokes (provide the skeleton)',
        'Vowel signs (provide pronunciation clarity)',  
        'Position writing (indicates vowel placement)',
        'Joining rules (connect strokes smoothly)'
      ],
      formation_steps: [
        '1. Identify all consonant sounds in sequence',
        '2. Choose appropriate strokes for each consonant',
        '3. Determine vowel positions and signs needed',
        '4. Apply position writing rules',
        '5. Connect strokes with proper joining'
      ]
    },
    position_writing: {
      first_position: {
        description: 'First stroke written above the line',
        indicates: 'First-place vowels (ah, a, ay, e)',
        rule: 'When first vowel is first-place, write above line'
      },
      second_position: {
        description: 'First stroke written on the line',
        indicates: 'Second-place vowels (ee, i, o, aw)',
        rule: 'When first vowel is second-place, write on line'
      },
      third_position: {
        description: 'First stroke written below the line',
        indicates: 'Third-place vowels (oo, ou, u, oy)',
        rule: 'When first vowel is third-place, write below line'
      }
    }
  },
  learning_progression: {
    stage_1_simple_outlines: {
      focus: 'Basic word construction with strokes and vowels',
      examples: [
        {
          word: 'cat',
          breakdown: 'K (horizontal) + short A (first-place) + T (upstroke)',
          outline_formation: 'K-stroke on line (second position for A), T-stroke upward',
          vowel_placement: 'Short A placed at beginning of K-stroke'
        },
        {
          word: 'dog',
          breakdown: 'D (upstroke) + short O (second-place) + G (horizontal)', 
          outline_formation: 'D-stroke on line (second position), G-stroke horizontal',
          vowel_placement: 'Short O placed at beginning of D-stroke'
        },
        {
          word: 'book',
          breakdown: 'B (downstroke) + long OO (third-place) + K (horizontal)',
          outline_formation: 'B-stroke below line (third position), K-stroke horizontal',
          vowel_placement: 'Long OO placed at beginning of B-stroke'
        }
      ]
    },
    stage_2_shortforms: {
      focus: 'Learning abbreviated outlines for common words',
      examples: [
        {
          word: 'and',
          regular_outline: 'short A + N + D (three strokes)',
          shortform: 'd (single downstroke)',
          reason: 'Extremely common word, saves time and space'
        },
        {
          word: 'the',
          regular_outline: 'TH + long E (two elements)',
          shortform: '... (three dots)',
          reason: 'Most frequent word in English, needs quick representation'
        },
        {
          word: 'because',
          regular_outline: 'B + long E + K + short AW + S (complex)',
          shortform: 'b-k (joined B and K strokes)',
          reason: 'Common conjunction, complex spelling simplified'
        }
      ]
    },
    stage_3_simple_phrasing: {
      focus: 'Joining two words smoothly',
      examples: [
        {
          phrase: 'to do',
          individual_words: 'to (T-stroke) + do (D-stroke)',
          phrased_form: 'T-stroke joined to D-stroke in one motion',
          speed_benefit: 'Eliminates pen lift between words'
        },
        {
          phrase: 'and the',
          individual_words: 'and (d shortform) + the (... or tick)',
          phrased_form: 'd with the-tick attached',
          speed_benefit: 'Very common combination, flows naturally'
        }
      ]
    },
    stage_4_complex_phrasing: {
      focus: 'Multiple word phrases for high speed',
      examples: [
        {
          phrase: 'should be able to do',
          breakdown: 'should(shortform) + be(shortform) + able + to(shortform) + do(shortform)',
          phrased_form: 'Continuous outline joining all shortforms',
          speed_benefit: 'Entire phrase written without pen lifts'
        },
        {
          phrase: 'I would like to',
          breakdown: 'I + would(shortform) + like + to(shortform)',
          phrased_form: 'Smooth joining from I through to final T-stroke',
          speed_benefit: 'Common speech pattern, natural flow'
        }
      ]
    }
  }
};

const OutlineConstructionSteps = ({ word, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const constructionSteps = [
    {
      label: 'Phonetic Analysis',
      description: `Break "${word}" into individual sounds`,
      content: (
        <Box>
          <Typography variant="body2" paragraph>
            Listen carefully to how "{word}" is pronounced. Identify each separate sound (phoneme).
          </Typography>
          <Alert severity="info">
            <Typography variant="body2">
              Example: "thinking" = TH + I + N + K + I + NG (6 sounds)
            </Typography>
          </Alert>
        </Box>
      )
    },
    {
      label: 'Stroke Selection',
      description: 'Choose the correct stroke for each consonant sound',
      content: (
        <Box>
          <Typography variant="body2" paragraph>
            Match each consonant sound to its corresponding shorthand stroke.
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="TH → Curved stroke (light for voiceless)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="N → Horizontal stroke (light)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="K → Horizontal stroke (light)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="NG → Horizontal stroke (heavy)" />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      label: 'Vowel Analysis',
      description: 'Identify vowel sounds and their positions',
      content: (
        <Box>
          <Typography variant="body2" paragraph>
            Determine which vowels need to be shown and their position classification.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper sx={{ p: 1, bgcolor: 'primary.light' }}>
                <Typography variant="caption" color="white">First-place</Typography>
                <Typography variant="body2" color="white">ah, a, ay, e</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 1, bgcolor: 'secondary.light' }}>
                <Typography variant="caption" color="white">Second-place</Typography>
                <Typography variant="body2" color="white">ee, i, o, aw</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 1, bgcolor: 'success.light' }}>
                <Typography variant="caption" color="white">Third-place</Typography>
                <Typography variant="body2" color="white">oo, ou, u, oy</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )
    },
    {
      label: 'Position Writing',
      description: 'Apply position writing rules based on first vowel',
      content: (
        <Box>
          <Typography variant="body2" paragraph>
            The first vowel determines where the outline sits relative to the line.
          </Typography>
          <Alert severity="success">
            <Typography variant="body2">
              <strong>Rule:</strong> First vowel "I" is second-place → write outline ON the line
            </Typography>
          </Alert>
        </Box>
      )
    },
    {
      label: 'Stroke Joining',
      description: 'Connect strokes smoothly without pen lifts',
      content: (
        <Box>
          <Typography variant="body2" paragraph>
            Join strokes in sequence, maintaining proper angles and proportions.
          </Typography>
          <Typography variant="body2">
            TH-curve → N-horizontal → K-horizontal → NG-horizontal (all connected)
          </Typography>
        </Box>
      )
    },
    {
      label: 'Complete Outline',
      description: 'Finalize the complete word representation',
      content: (
        <Box>
          <Typography variant="body2" paragraph>
            Your outline for "{word}" is now complete!
          </Typography>
          <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
            <Typography variant="h6" color="success.main">
              ✓ {word} outline constructed
            </Typography>
          </Box>
        </Box>
      )
    }
  ];

  const handleNext = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(activeStep);
    setCompletedSteps(newCompleted);
    
    if (activeStep < constructionSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onComplete && onComplete();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        Outline Construction: "{word}"
      </Typography>
      
      <Stepper activeStep={activeStep} orientation="vertical">
        {constructionSteps.map((step, index) => (
          <Step key={index} completed={completedSteps.has(index)}>
            <StepLabel 
              onClick={() => handleStepClick(index)}
              sx={{ cursor: 'pointer' }}
              icon={completedSteps.has(index) ? <CheckCircle color="success" /> : index + 1}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {step.description}
              </Typography>
              {step.content}
              <Box sx={{ mt: 2, mb: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                >
                  {index === constructionSteps.length - 1 ? 'Complete' : 'Next'}
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
    </Box>
  );
};

const ProgressionStageCard = ({ stage, stageData, isActive, onClick }) => {
  const getStageIcon = (stageName) => {
    switch (stageName) {
      case 'stage_1_simple_outlines':
        return <Create />;
      case 'stage_2_shortforms':
        return <Speed />;
      case 'stage_3_simple_phrasing':
        return <LinkIcon />;
      case 'stage_4_complex_phrasing':
        return <Group />;
      default:
        return <School />;
    }
  };

  const getStageNumber = (stageName) => {
    return stageName.match(/stage_(\d+)/)?.[1] || '1';
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        border: isActive ? '2px solid' : '1px solid',
        borderColor: isActive ? 'primary.main' : 'divider',
        '&:hover': { 
          boxShadow: 3,
          borderColor: 'primary.light'
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box sx={{ mr: 2, color: 'primary.main' }}>
            {getStageIcon(stage)}
          </Box>
          <Box>
            <Typography variant="h6">
              Stage {getStageNumber(stage)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stageData.focus}
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body2" paragraph>
          {stageData.examples.length} examples included
        </Typography>
        
        {isActive && (
          <Chip 
            label="Active" 
            color="primary" 
            size="small"
            icon={<ArrowRight />}
          />
        )}
      </CardContent>
    </Card>
  );
};

export const OutlinePhrasingSystem = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [activeStage, setActiveStage] = useState('stage_1_simple_outlines');
  const [selectedWord, setSelectedWord] = useState('thinking');
  const [showConstruction, setShowConstruction] = useState(false);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleStageChange = (stage) => {
    setActiveStage(stage);
  };

  const handleConstructionComplete = () => {
    setShowConstruction(false);
    // Could track completion, show next word, etc.
  };

  const tabs = [
    { label: 'Outline Construction', icon: <Create /> },
    { label: 'Learning Progression', icon: <Timeline /> },
    { label: 'Position Writing', icon: <Psychology /> }
  ];

  const currentStageData = outlineConstructionSystem.learning_progression[activeStage];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Outline & Phrasing System
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Complete Word Formation:</strong> Learn how shorthand represents complete words through 
          <strong> outlines</strong> (strokes + vowels), <strong>shortforms</strong> (abbreviated outlines), 
          and <strong>phrasing</strong> (joining words for speed).
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

      {/* Outline Construction Tab */}
      {currentTab === 0 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    What is an Outline?
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {outlineConstructionSystem.principles.basic_construction.definition}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Components:
                  </Typography>
                  <List dense>
                    {outlineConstructionSystem.principles.basic_construction.components.map((component, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><CheckCircle color="primary" fontSize="small" /></ListItemIcon>
                        <ListItemText primary={component} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Construction Process
                  </Typography>
                  <List dense>
                    {outlineConstructionSystem.principles.basic_construction.formation_steps.map((step, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><Lightbulb color="secondary" fontSize="small" /></ListItemIcon>
                        <ListItemText 
                          primary={step}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Button
                    variant="contained"
                    startIcon={<Create />}
                    onClick={() => setShowConstruction(true)}
                    sx={{ mt: 2 }}
                  >
                    Try Interactive Construction
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {showConstruction && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <OutlineConstructionSteps 
                  word={selectedWord}
                  onComplete={handleConstructionComplete}
                />
              </CardContent>
            </Card>
          )}
        </Box>
      )}

      {/* Learning Progression Tab */}
      {currentTab === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Progressive Learning Stages
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Master shorthand systematically through these four progressive stages.
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {Object.entries(outlineConstructionSystem.learning_progression).map(([stage, stageData]) => (
              <Grid item xs={12} sm={6} md={3} key={stage}>
                <ProgressionStageCard 
                  stage={stage}
                  stageData={stageData}
                  isActive={activeStage === stage}
                  onClick={() => handleStageChange(stage)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Active Stage Content */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {currentStageData.focus}
              </Typography>
              
              <Grid container spacing={2}>
                {currentStageData.examples.map((example, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper sx={{ p: 2 }}>
                      {example.word && (
                        <>
                          <Typography variant="h6" color="primary">
                            {example.word}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            <strong>Breakdown:</strong> {example.breakdown}
                          </Typography>
                          {example.outline_formation && (
                            <Typography variant="body2" paragraph>
                              <strong>Formation:</strong> {example.outline_formation}
                            </Typography>
                          )}
                          {example.reason && (
                            <Alert severity="info" sx={{ mt: 1 }}>
                              <Typography variant="body2">{example.reason}</Typography>
                            </Alert>
                          )}
                        </>
                      )}
                      
                      {example.phrase && (
                        <>
                          <Typography variant="h6" color="primary">
                            "{example.phrase}"
                          </Typography>
                          <Typography variant="body2" paragraph>
                            <strong>Individual words:</strong> {example.individual_words || example.breakdown}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            <strong>Phrased form:</strong> {example.phrased_form}
                          </Typography>
                          <Alert severity="success" sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              <strong>Speed benefit:</strong> {example.speed_benefit}
                            </Typography>
                          </Alert>
                        </>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Position Writing Tab */}
      {currentTab === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Position Writing System
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            The position of your outline on the line indicates the first vowel sound in the word.
          </Typography>

          <Grid container spacing={3}>
            {Object.entries(outlineConstructionSystem.principles.position_writing).map(([position, data]) => (
              <Grid item xs={12} md={4} key={position}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      {position.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Position:</strong> {data.description}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Indicates:</strong> {data.indicates}
                    </Typography>
                    
                    <Alert severity="info">
                      <Typography variant="body2">
                        <strong>Rule:</strong> {data.rule}
                      </Typography>
                    </Alert>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Position Writing Example */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Position Writing Examples
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                    <Typography variant="h6" color="white">Above Line</Typography>
                    <Typography variant="body2" color="white">calm, day, pen</Typography>
                    <Typography variant="caption" color="white">First-place vowels</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                    <Typography variant="h6" color="white">On Line</Typography>
                    <Typography variant="body2" color="white">keep, big, dog</Typography>
                    <Typography variant="caption" color="white">Second-place vowels</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                    <Typography variant="h6" color="white">Below Line</Typography>
                    <Typography variant="body2" color="white">book, put, toy</Typography>
                    <Typography variant="caption" color="white">Third-place vowels</Typography>
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

export default OutlinePhrasingSystem;