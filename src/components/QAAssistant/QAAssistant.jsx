import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fade,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Send as SendIcon,
  QuestionAnswer as QAIcon,
  Lightbulb as LightbulbIcon,
  School as SchoolIcon,
  Speed as SpeedIcon,
  Create as CreateIcon,
  History as HistoryIcon,
  Clear as ClearIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon
} from '@mui/icons-material';

// Comprehensive shorthand knowledge base
const shorthandKnowledge = {
  // Common words and their shorthand representations
  commonWords: {
    'should': {
      outline: 'SH-D',
      formation: 'SH stroke followed by D stroke',
      svg: '<svg width="80" height="40"><path d="M10 15 Q25 5 40 15" stroke="black" stroke-width="2" fill="none"/><path d="M40 10 L40 30" stroke="black" stroke-width="3" fill="none"/></svg>',
      difficulty: 'Basic',
      tips: 'SH is a curved stroke, D is a heavy downward stroke'
    },
    'would': {
      outline: 'W-D',
      formation: 'W stroke followed by D stroke',
      svg: '<svg width="80" height="40"><path d="M10 20 L20 10 L30 20 L40 10" stroke="black" stroke-width="2" fill="none"/><path d="M40 10 L40 30" stroke="black" stroke-width="3" fill="none"/></svg>',
      difficulty: 'Basic',
      tips: 'W is written as a wavy horizontal stroke'
    },
    'could': {
      outline: 'K-D',
      formation: 'K stroke followed by D stroke',
      svg: '<svg width="80" height="40"><path d="M10 10 L10 30 M10 15 L25 5 M10 20 L25 30" stroke="black" stroke-width="2" fill="none"/><path d="M30 10 L30 30" stroke="black" stroke-width="3" fill="none"/></svg>',
      difficulty: 'Basic',
      tips: 'K is formed with vertical line and two diagonal strokes'
    },
    'the': {
      outline: 'TH',
      formation: 'Single TH stroke (voiced)',
      svg: '<svg width="80" height="40"><path d="M 15 30 Q 40 15 65 5" stroke="black" stroke-width="3" fill="none"/></svg>',
      difficulty: 'Easy',
      tips: 'Heavy upward curved stroke for voiced TH sound - steeper than F/V curves'
    },
    'and': {
      outline: 'N-D',
      formation: 'N stroke with D attached',
      svg: '<svg width="80" height="40"><path d="M10 25 Q25 10 40 25" stroke="black" stroke-width="2" fill="none"/><path d="M40 10 L40 30" stroke="black" stroke-width="3" fill="none"/></svg>',
      difficulty: 'Basic',
      tips: 'Common conjunction - N curve plus heavy D'
    },
    'have': {
      outline: 'V special form',
      formation: 'Special shortened form for "have"',
      svg: '<svg width="60" height="40"><path d="M10 30 Q30 10 50 30" stroke="black" stroke-width="3" fill="none"/></svg>',
      difficulty: 'Easy',
      tips: 'Common word with special short form'
    },
    'will': {
      outline: 'W-L',
      formation: 'W stroke with L attached',
      svg: '<svg width="80" height="40"><path d="M10 20 L20 10 L30 20 L40 10" stroke="black" stroke-width="2" fill="none"/><path d="M40 15 Q50 25 60 15" stroke="black" stroke-width="2" fill="none"/></svg>',
      difficulty: 'Basic',
      tips: 'W followed by curved L stroke'
    },
    'that': {
      outline: 'TH-T',
      formation: 'TH stroke followed by T stroke',
      svg: '<svg width="80" height="40"><path d="M 15 30 Q 30 15 45 5" stroke="black" stroke-width="3" fill="none"/><path d="M45 10 L45 30" stroke="black" stroke-width="2" fill="none"/></svg>',
      difficulty: 'Basic',
      tips: 'Voiced TH (heavy upward curve) plus light T downstroke'
    },
    'with': {
      outline: 'W-TH',
      formation: 'W stroke with TH',
      svg: '<svg width="80" height="40"><path d="M10 20 L20 10 L30 20 L40 10" stroke="black" stroke-width="2" fill="none"/><path d="M45 25 Q55 15 65 5" stroke="black" stroke-width="2" fill="none"/></svg>',
      difficulty: 'Basic',
      tips: 'W followed by voiceless TH (light upward curve)'
    },
    'for': {
      outline: 'F shortform',
      formation: 'Single F stroke (shortform)',
      svg: '<svg width="60" height="40"><path d="M10 30 Q30 10 50 30" stroke="black" stroke-width="2" fill="none"/></svg>',
      difficulty: 'Easy',
      tips: 'Simple F stroke used as shortform for "for"'
    },
    'are': {
      outline: 'R shortform',
      formation: 'Single R stroke (shortform)',
      svg: '<svg width="60" height="40"><path d="M10 10 L10 30 M10 15 Q25 5 40 15" stroke="black" stroke-width="2" fill="none"/></svg>',
      difficulty: 'Easy',
      tips: 'R stroke used as shortform for "are"'
    },
    'you': {
      outline: 'U shortform',
      formation: 'Single U stroke (shortform)',
      svg: '<svg width="60" height="40"><path d="M10 10 Q30 30 50 10" stroke="black" stroke-width="2" fill="none"/></svg>',
      difficulty: 'Easy',
      tips: 'Curved U stroke as shortform for "you"'
    }
  },

  // Grammar and theory concepts
  concepts: {
    'vowels': {
      explanation: 'Vowels in Pitman shorthand are represented by dots and dashes placed in different positions relative to consonant strokes.',
      examples: ['A - light dot before stroke', 'E - light dot after stroke', 'I - light dash through stroke', 'O - heavy dot before stroke', 'U - heavy dot after stroke'],
      difficulty: 'Intermediate'
    },
    'phrasing': {
      explanation: 'Phrasing involves joining common word combinations into single outlines to increase writing speed.',
      examples: ['as soon as', 'in order to', 'I should be able to', 'thank you very much', 'ladies and gentlemen'],
      difficulty: 'Advanced'
    },
    'shortforms': {
      explanation: 'Shortened versions of common words that use special abbreviated outlines to save time.',
      examples: ['I = single dot', 'you = U stroke', 'for = F stroke', 'the = TH stroke', 'and = N-D joined'],
      difficulty: 'Intermediate'
    },
    'strokes': {
      explanation: 'Pitman shorthand uses different types of strokes: straight, curved, and loops. Each represents specific consonant sounds.',
      examples: ['Straight strokes: P, B, T, D, CH, J', 'Curved strokes: F, V, TH, S, Z', 'Loops: W, WH'],
      difficulty: 'Basic'
    },
    'direction': {
      explanation: 'Stroke direction is crucial in Pitman shorthand. The first six strokes are all written downward.',
      examples: ['Downward: P, B, T, D, CH, J', 'Upward: K, G, M, N', 'Horizontal: L, R'],
      difficulty: 'Basic'
    },
    'th sounds': {
      explanation: 'TH has two sounds in English: voiceless (as in "think") and voiced (as in "the"). Both use steep upward curved strokes.',
      examples: ['Voiceless TH (light): think, with, path', 'Voiced TH (heavy): the, that, this'],
      difficulty: 'Intermediate'
    },
    'weight': {
      explanation: 'Stroke weight (thickness) distinguishes between voiced and voiceless sounds.',
      examples: ['Light (voiceless): P, T, CH, F, TH (think), S', 'Heavy (voiced): B, D, J, V, TH (the), Z'],
      difficulty: 'Basic'
    }
  },

  // Stroke formation help
  strokes: {
    'p': { formation: 'Light straight downstroke', direction: 'downward', weight: 'light', sound: 'voiceless' },
    'b': { formation: 'Heavy straight downstroke', direction: 'downward', weight: 'heavy', sound: 'voiced' },
    't': { formation: 'Light straight downstroke', direction: 'downward', weight: 'light', sound: 'voiceless' },
    'd': { formation: 'Heavy straight downstroke', direction: 'downward', weight: 'heavy', sound: 'voiced' },
    'ch': { formation: 'Light slanted downstroke', direction: 'downward', weight: 'light', sound: 'voiceless' },
    'j': { formation: 'Heavy slanted downstroke', direction: 'downward', weight: 'heavy', sound: 'voiced' },
    'f': { formation: 'Light curved stroke', direction: 'upward curve', weight: 'light', sound: 'voiceless' },
    'v': { formation: 'Heavy curved stroke', direction: 'upward curve', weight: 'heavy', sound: 'voiced' },
    'th': { formation: 'Steep upward curved stroke (light for voiceless "think", heavy for voiced "the")', direction: 'upward curve steep', weight: 'varies', sound: 'varies' },
    's': { formation: 'Light curved stroke', direction: 'downward curve', weight: 'light', sound: 'voiceless' },
    'z': { formation: 'Heavy curved stroke', direction: 'downward curve', weight: 'heavy', sound: 'voiced' }
  }
};

const QAAssistant = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm your Shorthand Q&A Assistant. Ask me about writing any word in shorthand, stroke formations, or shorthand theory. For example, try asking 'How do I write should?' or 'What is phrasing?'",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions] = useState([
    "How do I write 'should'?",
    "What is the difference between P and B strokes?",
    "How do I write 'the'?",
    "What are shortforms?",
    "How does phrasing work?",
    "How do I write vowels?",
    "How do I write 'will'?",
    "What is stroke weight?",
    "How do I write 'you'?",
    "What are TH sounds?"
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeQuestion = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Check for specific word requests
    for (const [word, data] of Object.entries(shorthandKnowledge.commonWords)) {
      if (lowerQuestion.includes(word) && (lowerQuestion.includes('write') || lowerQuestion.includes('how'))) {
        return {
          type: 'word',
          word: word,
          data: data
        };
      }
    }
    
    // Check for concept questions
    for (const [concept, data] of Object.entries(shorthandKnowledge.concepts)) {
      if (lowerQuestion.includes(concept) || 
          (concept === 'vowels' && lowerQuestion.includes('vowel')) ||
          (concept === 'th sounds' && (lowerQuestion.includes('th') || lowerQuestion.includes('think') || lowerQuestion.includes('the')))) {
        return {
          type: 'concept',
          concept: concept,
          data: data
        };
      }
    }
    
    // Check for stroke formation questions
    if (lowerQuestion.includes('stroke') || lowerQuestion.includes('formation')) {
      for (const [stroke, data] of Object.entries(shorthandKnowledge.strokes)) {
        if (lowerQuestion.includes(stroke)) {
          return {
            type: 'stroke',
            stroke: stroke,
            data: data
          };
        }
      }
    }
    
    // General stroke questions
    if (lowerQuestion.includes('difference') && (lowerQuestion.includes('p') && lowerQuestion.includes('b'))) {
      return {
        type: 'comparison',
        strokes: ['p', 'b'],
        answer: 'P and B are both straight downstrokes. The difference is weight: P is light (thin) for the voiceless sound, while B is heavy (thick) for the voiced sound. Both are written in the same downward direction.'
      };
    }
    
    // TH sound comparison
    if (lowerQuestion.includes('th') && (lowerQuestion.includes('think') || lowerQuestion.includes('the') || lowerQuestion.includes('difference'))) {
      return {
        type: 'comparison',
        strokes: ['th_light', 'th_heavy'],
        answer: 'TH has two sounds: voiceless (as in "think") uses a light steep upward curve, while voiced (as in "the") uses a heavy steep upward curve. Both are steeper than F/V curves and go upward, not downward like the first six strokes.'
      };
    }
    
    return { type: 'general' };
  };

  const generateResponse = (analysis) => {
    switch (analysis.type) {
      case 'word':
        return {
          content: `To write "${analysis.word}" in shorthand:`,
          details: {
            outline: analysis.data.outline,
            formation: analysis.data.formation,
            svg: analysis.data.svg,
            tips: analysis.data.tips,
            difficulty: analysis.data.difficulty
          }
        };
        
      case 'concept':
        return {
          content: `**${analysis.concept.toUpperCase()}**\n\n${analysis.data.explanation}`,
          examples: analysis.data.examples,
          difficulty: analysis.data.difficulty
        };
        
      case 'stroke':
        return {
          content: `**${analysis.stroke.toUpperCase()} Stroke**\n\nFormation: ${analysis.data.formation}\nDirection: ${analysis.data.direction}\nWeight: ${analysis.data.weight}`
        };
        
      case 'comparison':
        return {
          content: analysis.answer
        };
        
      default:
        return {
          content: "I can help you with:\n• Writing specific words in shorthand\n• Stroke formations and directions\n• Shorthand theory concepts\n• Differences between similar strokes\n\nTry asking something like 'How do I write [word]?' or 'What is [concept]?'"
        };
    }
  };

  const handleSendMessage = async () => {
    if (!question.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate thinking time
    setTimeout(() => {
      const analysis = analyzeQuestion(question);
      const response = generateResponse(analysis);
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response.content,
        details: response.details,
        examples: response.examples,
        difficulty: response.difficulty,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
    
    setQuestion('');
  };

  const handleSuggestedQuestion = (suggestedQ) => {
    setQuestion(suggestedQ);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'assistant',
      content: "Chat cleared! Ask me anything about shorthand.",
      timestamp: new Date()
    }]);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={1} sx={{ p: 2, borderRadius: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <QAIcon color="primary" fontSize="large" />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Shorthand Q&A Assistant
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ask me anything about Pitman shorthand
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={clearChat} color="primary">
            <ClearIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Suggested Questions */}
      <Paper sx={{ p: 2, m: 2, mb: 0 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Try asking:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {suggestedQuestions.map((q, index) => (
            <Chip
              key={index}
              label={q}
              variant="outlined"
              size="small"
              onClick={() => handleSuggestedQuestion(q)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Paper>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Fade in={true} key={message.id}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                mb: 2
              }}
            >
              <Card
                sx={{
                  maxWidth: '80%',
                  bgcolor: message.type === 'user' ? 'primary.main' : 'white',
                  color: message.type === 'user' ? 'white' : 'text.primary'
                }}
              >
                <CardContent sx={{ pb: '16px !important' }}>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {message.content}
                  </Typography>
                  
                  {message.details && (
                    <Box sx={{ mt: 2 }}>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle2" fontWeight="bold">
                        Outline: {message.details.outline}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {message.details.formation}
                      </Typography>
                      {message.details.svg && (
                        <Box 
                          sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}
                          dangerouslySetInnerHTML={{ __html: message.details.svg }}
                        />
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        💡 {message.details.tips}
                      </Typography>
                      <Chip 
                        label={message.details.difficulty} 
                        size="small" 
                        color="primary" 
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  )}
                  
                  {message.examples && (
                    <Box sx={{ mt: 2 }}>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle2" fontWeight="bold">
                        Examples:
                      </Typography>
                      <List dense>
                        {message.examples.map((example, index) => (
                          <ListItem key={index} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <LightbulbIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={example} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        ))}
        
        {isTyping && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  Assistant is typing...
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Paper elevation={3} sx={{ p: 2, m: 2, mt: 0 }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me about shorthand... (e.g., 'How do I write should?')"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={handleSendMessage}
                  disabled={!question.trim()}
                  color="primary"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Paper>
    </Box>
  );
};

export default QAAssistant;