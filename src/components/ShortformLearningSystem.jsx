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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  LinearProgress
} from '@mui/material';
import {
  Speed,
  QuestionMark,
  CheckCircle,
  Cancel,
  Visibility,
  VisibilityOff,
  School,
  TrendingUp,
  Star,
  Info,
  PlayArrow,
  Pause,
  Refresh
} from '@mui/icons-material';

// Authentic shortforms from NCS materials
const authenticShortforms = {
  list_one_common: {
    description: 'Most frequently used words with special abbreviated outlines',
    forms: {
      'a': { outline: ')', usage: 'article, very common in phrases', frequency: 'very_high' },
      'an': { outline: ')', usage: 'article, before vowel sounds', frequency: 'very_high' },
      'the': { outline: '...', usage: 'most common word, often tick at end of phrases', frequency: 'very_high' },
      'and': { outline: 'd', usage: 'conjunction, frequently phrased', frequency: 'very_high' },
      'be': { outline: 'b', usage: 'verb, foundation for becoming, been', frequency: 'very_high' },
      'is': { outline: 's', usage: 'verb, often joined to other words', frequency: 'very_high' },
      'his': { outline: 's', usage: 'possessive, same as "is" but context differs', frequency: 'high' },
      'of': { outline: 'v', usage: 'preposition, very common in phrases', frequency: 'very_high' },
      'to': { outline: 't', usage: 'preposition/infinitive, heavily phrased', frequency: 'very_high' },
      'do': { outline: 'd', usage: 'verb, simple downstroke', frequency: 'high' },
      'you': { outline: 'u', usage: 'pronoun, basis for "your"', frequency: 'very_high' },
      'are': { outline: 'r', usage: 'verb, simple upstroke', frequency: 'very_high' },
      'all': { outline: 'l', usage: 'determiner, simple upstroke', frequency: 'high' },
      'come': { outline: 'k-m', usage: 'verb, K stroke + M stroke', frequency: 'medium' },
      'been': { outline: 'b-n', usage: 'past participle of "be"', frequency: 'medium' },
      'which': { outline: 'wh', usage: 'relative pronoun', frequency: 'medium' },
      'should': { outline: 'sh-d', usage: 'modal verb', frequency: 'high' },
      'could': { outline: 'k-d', usage: 'modal verb', frequency: 'high' },
      'would': { outline: 'w-d', usage: 'modal verb', frequency: 'high' },
      'think': { outline: 'th-k', usage: 'verb, thinking', frequency: 'medium' },
      'about': { outline: 'b-t', usage: 'preposition, very common', frequency: 'high' },
      'because': { outline: 'b-k', usage: 'conjunction, reason', frequency: 'medium' }
    }
  },
  list_two_advanced: {
    description: 'Less frequent but useful for high-speed writing',
    forms: {
      'characteristic': { outline: 'ch-r', usage: 'noun/adjective, abbreviated', frequency: 'low' },
      'demonstration': { outline: 'd-m', usage: 'noun, showing/proving', frequency: 'low' },
      'difficulty': { outline: 'd-f', usage: 'noun, problem/challenge', frequency: 'medium' },
      'electricity': { outline: 'e-l', usage: 'noun, power/energy', frequency: 'low' },
      'intelligent': { outline: 'i-t', usage: 'adjective, smart/clever', frequency: 'low' },
      'nevertheless': { outline: 'n-v', usage: 'adverb, however/still', frequency: 'low' },
      'opportunity': { outline: 'o-p', usage: 'noun, chance/possibility', frequency: 'medium' },
      'particularly': { outline: 'p-r', usage: 'adverb, especially', frequency: 'medium' },
      'responsibility': { outline: 'r-s', usage: 'noun, duty/obligation', frequency: 'medium' },
      'understanding': { outline: 'u-d', usage: 'noun/adjective, comprehension', frequency: 'medium' }
    }
  }
};

const ShortformCard = ({ word, data, showOutline, onToggleOutline, onQuiz }) => {
  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'very_high': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getFrequencyText = (frequency) => {
    switch (frequency) {
      case 'very_high': return 'Essential';
      case 'high': return 'Important';
      case 'medium': return 'Useful';
      case 'low': return 'Advanced';
      default: return 'Standard';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" color="primary">
            {word}
          </Typography>
          <Box>
            <Chip 
              size="small" 
              label={getFrequencyText(data.frequency)}
              color={getFrequencyColor(data.frequency)}
            />
            <Tooltip title="Quiz this shortform">
              <IconButton size="small" onClick={() => onQuiz(word)} sx={{ ml: 1 }}>
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Shortform Outline:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', textAlign: 'center' }}>
            {showOutline ? (
              <Typography variant="h5" color="primary" fontFamily="monospace">
                {data.outline}
              </Typography>
            ) : (
              <Button
                startIcon={<Visibility />}
                onClick={() => onToggleOutline(word)}
                size="small"
              >
                Show Outline
              </Button>
            )}
            {showOutline && (
              <IconButton 
                size="small" 
                onClick={() => onToggleOutline(word)}
                sx={{ ml: 1 }}
              >
                <VisibilityOff />
              </IconButton>
            )}
          </Paper>
        </Box>

        <Typography variant="body2" color="text.secondary">
          <strong>Usage:</strong> {data.usage}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ShortformQuiz = ({ open, onClose, shortforms }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const startNewQuestion = () => {
    const words = Object.keys(shortforms);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setUserAnswer('');
    setShowResult(false);
  };

  const checkAnswer = () => {
    const correct = shortforms[currentWord]?.outline.toLowerCase() === userAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    setAttempts(attempts + 1);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !showResult) {
      checkAnswer();
    }
  };

  React.useEffect(() => {
    if (open && !currentWord) {
      startNewQuestion();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Shortform Quiz</Typography>
          <Typography variant="body2" color="text.secondary">
            Score: {score}/{attempts}
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {currentWord && (
          <Box>
            <Typography variant="h5" color="primary" gutterBottom textAlign="center">
              {currentWord}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom textAlign="center">
              What is the shortform outline for this word?
            </Typography>

            <TextField
              fullWidth
              label="Your Answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={showResult}
              sx={{ my: 2 }}
              placeholder="Enter the shortform outline..."
            />

            {showResult && (
              <Alert severity={isCorrect ? 'success' : 'error'} sx={{ mb: 2 }}>
                <Typography variant="body2">
                  {isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${shortforms[currentWord].outline}`}
                </Typography>
                <Typography variant="body2">
                  <strong>Usage:</strong> {shortforms[currentWord].usage}
                </Typography>
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {showResult ? (
          <Button variant="contained" onClick={startNewQuestion}>
            Next Question
          </Button>
        ) : (
          <Button 
            variant="contained" 
            onClick={checkAnswer}
            disabled={!userAnswer.trim()}
          >
            Check Answer
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const ShortformPracticeSession = ({ shortforms, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOutline, setShowOutline] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [studiedWords, setStudiedWords] = useState(new Set());

  const words = Object.keys(shortforms);
  const currentWord = words[currentIndex];
  const currentData = shortforms[currentWord];
  const progress = ((studiedWords.size / words.length) * 100);

  const startSession = () => {
    setSessionActive(true);
    setCurrentIndex(0);
    setStudiedWords(new Set());
    setShowOutline(false);
  };

  const nextWord = () => {
    const newStudied = new Set(studiedWords);
    newStudied.add(currentWord);
    setStudiedWords(newStudied);
    
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowOutline(false);
    } else {
      setSessionActive(false);
      onComplete && onComplete();
    }
  };

  const prevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowOutline(false);
    }
  };

  if (!sessionActive) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <School sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Practice Session
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Review all {words.length} shortforms in this set systematically.
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={startSession}
            size="large"
          >
            Start Practice Session
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box mb={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6">
              Practice Session
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentIndex + 1} of {words.length}
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" color="text.secondary">
            {studiedWords.size} words studied
          </Typography>
        </Box>

        <Box textAlign="center" mb={3}>
          <Typography variant="h4" color="primary" gutterBottom>
            {currentWord}
          </Typography>
          
          <Paper sx={{ p: 3, bgcolor: 'grey.50', mb: 2 }}>
            {showOutline ? (
              <Typography variant="h3" color="primary" fontFamily="monospace">
                {currentData.outline}
              </Typography>
            ) : (
              <Button
                variant="contained"
                startIcon={<Visibility />}
                onClick={() => setShowOutline(true)}
              >
                Show Shortform
              </Button>
            )}
          </Paper>

          <Typography variant="body2" color="text.secondary">
            {currentData.usage}
          </Typography>
        </Box>

        <Box display="flex" gap={2} justifyContent="center">
          <Button
            onClick={prevWord}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          
          <Button
            variant="contained"
            onClick={nextWord}
            disabled={!showOutline}
          >
            {currentIndex === words.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export const ShortformLearningSystem = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [visibleOutlines, setVisibleOutlines] = useState(new Set());
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedQuizSet, setSelectedQuizSet] = useState('list_one_common');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const toggleOutline = (word) => {
    const newVisible = new Set(visibleOutlines);
    if (newVisible.has(word)) {
      newVisible.delete(word);
    } else {
      newVisible.add(word);
    }
    setVisibleOutlines(newVisible);
  };

  const startQuiz = (word) => {
    setQuizOpen(true);
  };

  const currentSet = currentTab === 0 ? 'list_one_common' : 'list_two_advanced';
  const currentShortforms = authenticShortforms[currentSet].forms;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Shortform Learning System
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Authentic NCS Shortforms:</strong> These abbreviated outlines are from the official 
          Pitman shorthand curriculum. Master these for significant speed improvements in your writing.
        </Typography>
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab 
            label="Essential Shortforms" 
            icon={<Star />}
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab 
            label="Advanced Shortforms" 
            icon={<TrendingUp />}
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
        </Tabs>
      </Box>

      {/* Current Set Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" gutterBottom>
                {authenticShortforms[currentSet].description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Object.keys(currentShortforms).length} shortforms in this set
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                startIcon={<QuestionMark />}
                onClick={() => {
                  setSelectedQuizSet(currentSet);
                  setQuizOpen(true);
                }}
                sx={{ mr: 1 }}
              >
                Quiz Mode
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => setVisibleOutlines(new Set())}
              >
                Hide All
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Practice Session */}
      <Box mb={3}>
        <ShortformPracticeSession 
          shortforms={currentShortforms}
          onComplete={() => {
            // Handle completion
          }}
        />
      </Box>

      {/* Shortforms Grid */}
      <Grid container spacing={2}>
        {Object.entries(currentShortforms).map(([word, data]) => (
          <Grid item xs={12} sm={6} md={4} key={word}>
            <ShortformCard
              word={word}
              data={data}
              showOutline={visibleOutlines.has(word)}
              onToggleOutline={toggleOutline}
              onQuiz={startQuiz}
            />
          </Grid>
        ))}
      </Grid>

      {/* Quiz Dialog */}
      <ShortformQuiz
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        shortforms={authenticShortforms[selectedQuizSet].forms}
      />

      {/* Learning Tips */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💡 Learning Tips for Shortforms
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><Info color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Start with Essential"
                secondary="Master the red 'Essential' shortforms first - these appear in almost every sentence"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><Speed color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Practice Daily"
                secondary="Use the practice session to review 5-10 shortforms each day until automatic"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Context Matters"
                secondary="Some shortforms like 'is/his' look identical - context determines meaning"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ShortformLearningSystem;