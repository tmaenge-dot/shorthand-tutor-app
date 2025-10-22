import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Divider,
  Rating,
  LinearProgress,
  Tooltip,
  Badge,
  Avatar,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import {
  Search,
  FilterList,
  Gesture,
  PlayArrow,
  Bookmark,
  BookmarkBorder,
  Info,
  Speed,
  School,
  Assessment,
  Star,
  TrendingUp,
  History,
  ViewModule,
  ViewList,
  Sort,
  CheckCircle,
  RadioButtonUnchecked,
  Timer,
  BarChart
} from '@mui/icons-material'

const InteractiveSymbolLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('alphabetical')
  const [selectedSymbol, setSelectedSymbol] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [bookmarkedSymbols, setBookmarkedSymbols] = useState(new Set())
  const [symbolData, setSymbolData] = useState([])

  useEffect(() => {
    generateSymbolData()
  }, [])

  const generateSymbolData = () => {
    const symbols = [
      // Consonants
      {
        id: 'p',
        symbol: 'P',
        name: 'P - Pay',
        category: 'consonants',
        subcategory: 'light',
        difficulty: 'easy',
        strokeDirection: 'downward',
        description: 'Light downward stroke',
        examples: ['pay', 'pen', 'paper', 'people'],
        practiceCount: 25,
        averageAccuracy: 85,
        lastPracticed: '2025-10-19',
        isNew: false,
        svg: `<svg viewBox="0 0 100 100"><path d="M20 20 L20 80" stroke="#1976d2" stroke-width="3" fill="none"/></svg>`,
        instructions: ['Start at the top', 'Draw straight down', 'Light pressure throughout'],
        tips: 'Keep the stroke perfectly vertical for best results',
        module: 'A',
        estimatedPracticeTime: 5
      },
      {
        id: 'b',
        symbol: 'B',
        name: 'B - Bay',
        category: 'consonants',
        subcategory: 'heavy',
        difficulty: 'easy',
        strokeDirection: 'downward',
        description: 'Heavy downward stroke',
        examples: ['bay', 'book', 'big', 'business'],
        practiceCount: 22,
        averageAccuracy: 82,
        lastPracticed: '2025-10-18',
        isNew: false,
        svg: `<svg viewBox="0 0 100 100"><path d="M20 20 L20 80" stroke="#1976d2" stroke-width="6" fill="none"/></svg>`,
        instructions: ['Start at the top', 'Draw straight down', 'Heavy pressure throughout'],
        tips: 'Press firmly to distinguish from P stroke',
        module: 'A',
        estimatedPracticeTime: 5
      },
      {
        id: 't',
        symbol: 'T',
        name: 'T - Tea',
        category: 'consonants',
        subcategory: 'light',
        difficulty: 'easy',
        strokeDirection: 'upward',
        description: 'Light upward stroke',
        examples: ['tea', 'take', 'time', 'think'],
        practiceCount: 30,
        averageAccuracy: 88,
        lastPracticed: '2025-10-20',
        isNew: false,
        svg: `<svg viewBox="0 0 100 100"><path d="M20 80 L20 20" stroke="#1976d2" stroke-width="3" fill="none"/></svg>`,
        instructions: ['Start at the bottom', 'Draw straight up', 'Light pressure throughout'],
        tips: 'Ensure clean upward movement',
        module: 'A',
        estimatedPracticeTime: 5
      },
      {
        id: 'd',
        symbol: 'D',
        name: 'D - Day',
        category: 'consonants',
        subcategory: 'heavy',
        difficulty: 'easy',
        strokeDirection: 'upward',
        description: 'Heavy upward stroke',
        examples: ['day', 'do', 'dear', 'during'],
        practiceCount: 18,
        averageAccuracy: 79,
        lastPracticed: '2025-10-17',
        isNew: false,
        svg: `<svg viewBox="0 0 100 100"><path d="M20 80 L20 20" stroke="#1976d2" stroke-width="6" fill="none"/></svg>`,
        instructions: ['Start at the bottom', 'Draw straight up', 'Heavy pressure throughout'],
        tips: 'Press firmly to distinguish from T stroke',
        module: 'A',
        estimatedPracticeTime: 5
      },
      // Curved strokes
      {
        id: 'r',
        symbol: 'R',
        name: 'R - Ray',
        category: 'consonants',
        subcategory: 'curved',
        difficulty: 'medium',
        strokeDirection: 'curved',
        description: 'Light curved stroke',
        examples: ['ray', 'run', 'read', 'right'],
        practiceCount: 15,
        averageAccuracy: 68,
        lastPracticed: '2025-10-16',
        isNew: false,
        svg: `<svg viewBox="0 0 100 100"><path d="M20 50 Q50 20 80 50" stroke="#1976d2" stroke-width="3" fill="none"/></svg>`,
        instructions: ['Start on the left', 'Curve smoothly upward', 'End on the right'],
        tips: 'Practice smooth curve motion - this is a challenging stroke',
        module: 'B',
        estimatedPracticeTime: 10
      },
      {
        id: 'l',
        symbol: 'L',
        name: 'L - Lay',
        category: 'consonants',
        subcategory: 'curved',
        difficulty: 'medium',
        strokeDirection: 'curved',
        description: 'Heavy curved stroke',
        examples: ['lay', 'like', 'long', 'little'],
        practiceCount: 12,
        averageAccuracy: 65,
        lastPracticed: '2025-10-15',
        isNew: false,
        svg: `<svg viewBox="0 0 100 100"><path d="M20 50 Q50 20 80 50" stroke="#1976d2" stroke-width="6" fill="none"/></svg>`,
        instructions: ['Start on the left', 'Curve smoothly upward', 'End on the right'],
        tips: 'Heavier pressure than R - practice curve control',
        module: 'B',
        estimatedPracticeTime: 10
      },
      // Vowels
      {
        id: 'a',
        symbol: 'A',
        name: 'A - Dot',
        category: 'vowels',
        subcategory: 'light',
        difficulty: 'easy',
        strokeDirection: 'dot',
        description: 'Light dot placed next to consonant',
        examples: ['at', 'an', 'as', 'add'],
        practiceCount: 20,
        averageAccuracy: 75,
        lastPracticed: '2025-10-19',
        isNew: false,
        svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="5" fill="#1976d2"/></svg>`,
        instructions: ['Place dot close to consonant', 'Light touch', 'Proper positioning is key'],
        tips: 'Position determines vowel sound - practice placement accuracy',
        module: 'C',
        estimatedPracticeTime: 8
      },
      // Special forms
      {
        id: 'the',
        symbol: 'THE',
        name: 'THE - Special Form',
        category: 'special',
        subcategory: 'common-words',
        difficulty: 'medium',
        strokeDirection: 'special',
        description: 'Thick stroke representing "the"',
        examples: ['the', 'they', 'them', 'their'],
        practiceCount: 8,
        averageAccuracy: 72,
        lastPracticed: '2025-10-14',
        isNew: true,
        svg: `<svg viewBox="0 0 100 100"><path d="M20 40 L80 40" stroke="#1976d2" stroke-width="8" fill="none"/></svg>`,
        instructions: ['Draw thick horizontal line', 'Consistent thickness', 'Represents complete word'],
        tips: 'Most common word in English - master this early',
        module: 'E',
        estimatedPracticeTime: 12
      }
    ]

    setSymbolData(symbols)
  }

  const categories = [
    { value: 'all', label: 'All Symbols' },
    { value: 'consonants', label: 'Consonants' },
    { value: 'vowels', label: 'Vowels' },
    { value: 'special', label: 'Special Forms' }
  ]

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]

  const filteredSymbols = symbolData.filter(symbol => {
    const matchesSearch = symbol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symbol.examples.some(ex => ex.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || symbol.category === selectedCategory
    const matchesDifficulty = difficultyFilter === 'all' || symbol.difficulty === difficultyFilter
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const sortedSymbols = [...filteredSymbols].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name)
      case 'difficulty':
        const diffOrder = { easy: 1, medium: 2, hard: 3 }
        return diffOrder[a.difficulty] - diffOrder[b.difficulty]
      case 'accuracy':
        return b.averageAccuracy - a.averageAccuracy
      case 'recent':
        return new Date(b.lastPracticed) - new Date(a.lastPracticed)
      default:
        return 0
    }
  })

  const handleSymbolClick = (symbol) => {
    setSelectedSymbol(symbol)
    setDialogOpen(true)
  }

  const toggleBookmark = (symbolId) => {
    const newBookmarks = new Set(bookmarkedSymbols)
    if (newBookmarks.has(symbolId)) {
      newBookmarks.delete(symbolId)
    } else {
      newBookmarks.add(symbolId)
    }
    setBookmarkedSymbols(newBookmarks)
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'success',
      medium: 'warning', 
      hard: 'error'
    }
    return colors[difficulty] || 'default'
  }

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return 'success'
    if (accuracy >= 60) return 'warning'
    return 'error'
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Gesture color="primary" />
        Interactive Symbol Library
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Explore, practice, and master shorthand symbols with detailed guidance
      </Typography>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search symbols or words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <TextField
              select
              fullWidth
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              SelectProps={{ native: true }}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              select
              fullWidth
              label="Difficulty"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              SelectProps={{ native: true }}
            >
              {difficulties.map(diff => (
                <option key={diff.value} value={diff.value}>{diff.label}</option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              select
              fullWidth
              label="Sort by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="difficulty">Difficulty</option>
              <option value="accuracy">Accuracy</option>
              <option value="recent">Recent Practice</option>
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newMode) => newMode && setViewMode(newMode)}
              fullWidth
            >
              <ToggleButton value="grid">
                <ViewModule />
              </ToggleButton>
              <ToggleButton value="list">
                <ViewList />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {sortedSymbols.length} symbols
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            icon={<Bookmark />} 
            label={`${bookmarkedSymbols.size} bookmarked`} 
            variant="outlined" 
            size="small"
          />
        </Box>
      </Box>

      {/* Symbol Grid/List */}
      {viewMode === 'grid' ? (
        <Grid container spacing={2}>
          {sortedSymbols.map((symbol) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={symbol.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  },
                  position: 'relative'
                }}
                onClick={() => handleSymbolClick(symbol)}
              >
                {symbol.isNew && (
                  <Chip 
                    label="NEW" 
                    color="primary" 
                    size="small" 
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                  />
                )}
                
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="div">
                      {symbol.name}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(symbol.id)
                      }}
                    >
                      {bookmarkedSymbols.has(symbol.id) ? <Bookmark color="primary" /> : <BookmarkBorder />}
                    </IconButton>
                  </Box>

                  {/* Symbol SVG */}
                  <Box 
                    sx={{ 
                      height: 80, 
                      mb: 2, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: 'action.hover',
                      borderRadius: 1
                    }}
                    dangerouslySetInnerHTML={{ __html: symbol.svg }}
                  />

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {symbol.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      label={symbol.difficulty} 
                      size="small" 
                      color={getDifficultyColor(symbol.difficulty)}
                    />
                    <Chip 
                      label={`${symbol.averageAccuracy}%`} 
                      size="small" 
                      color={getAccuracyColor(symbol.averageAccuracy)}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Module {symbol.module}
                    </Typography>
                    <Button size="small" startIcon={<PlayArrow />}>
                      Practice
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper>
          <List>
            {sortedSymbols.map((symbol, index) => (
              <React.Fragment key={symbol.id}>
                <ListItem 
                  button 
                  onClick={() => handleSymbolClick(symbol)}
                  sx={{ py: 2 }}
                >
                  <Box sx={{ width: 60, height: 40, mr: 2, display: 'flex', alignItems: 'center' }}>
                    <div dangerouslySetInnerHTML={{ __html: symbol.svg }} />
                  </Box>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {symbol.name}
                        {symbol.isNew && <Chip label="NEW" size="small" color="primary" />}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {symbol.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip label={symbol.difficulty} size="small" color={getDifficultyColor(symbol.difficulty)} />
                          <Chip label={`${symbol.averageAccuracy}% accuracy`} size="small" />
                          <Chip label={`${symbol.practiceCount} practices`} size="small" variant="outlined" />
                        </Box>
                      </Box>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(symbol.id)
                      }}>
                        {bookmarkedSymbols.has(symbol.id) ? <Bookmark color="primary" /> : <BookmarkBorder />}
                      </IconButton>
                      <Button size="small" startIcon={<PlayArrow />}>
                        Practice
                      </Button>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < sortedSymbols.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Symbol Detail Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedSymbol && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5">{selectedSymbol.name}</Typography>
                <IconButton onClick={() => toggleBookmark(selectedSymbol.id)}>
                  {bookmarkedSymbols.has(selectedSymbol.id) ? <Bookmark color="primary" /> : <BookmarkBorder />}
                </IconButton>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
                <Tab label="Overview" />
                <Tab label="Instructions" />
                <Tab label="Practice Stats" />
                <Tab label="Examples" />
              </Tabs>

              {/* Overview Tab */}
              {activeTab === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box 
                      sx={{ 
                        height: 200, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: 'action.hover',
                        borderRadius: 2,
                        mb: 2
                      }}
                      dangerouslySetInnerHTML={{ __html: selectedSymbol.svg }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {selectedSymbol.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedSymbol.tips}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip label={`Module ${selectedSymbol.module}`} color="primary" />
                      <Chip label={selectedSymbol.difficulty} color={getDifficultyColor(selectedSymbol.difficulty)} />
                      <Chip label={selectedSymbol.category} variant="outlined" />
                    </Box>
                    
                    <Typography variant="body2" gutterBottom>
                      <strong>Stroke Direction:</strong> {selectedSymbol.strokeDirection}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Practice Time:</strong> ~{selectedSymbol.estimatedPracticeTime} minutes
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Last Practiced:</strong> {selectedSymbol.lastPracticed}
                    </Typography>
                  </Grid>
                </Grid>
              )}

              {/* Instructions Tab */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Step-by-Step Instructions
                  </Typography>
                  <List>
                    {selectedSymbol.instructions.map((instruction, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.875rem' }}>
                            {index + 1}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={instruction} />
                      </ListItem>
                    ))}
                  </List>
                  <Paper sx={{ p: 2, mt: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                    <Typography variant="body2">
                      💡 <strong>Pro Tip:</strong> {selectedSymbol.tips}
                    </Typography>
                  </Paper>
                </Box>
              )}

              {/* Practice Stats Tab */}
              {activeTab === 2 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        {selectedSymbol.practiceCount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Practice Sessions
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color={getAccuracyColor(selectedSymbol.averageAccuracy)}>
                        {selectedSymbol.averageAccuracy}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Average Accuracy
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                      Accuracy Progress
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={selectedSymbol.averageAccuracy} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Grid>
                </Grid>
              )}

              {/* Examples Tab */}
              {activeTab === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Common Words Using This Symbol
                  </Typography>
                  <Grid container spacing={2}>
                    {selectedSymbol.examples.map((example, index) => (
                      <Grid item xs={6} md={3} key={index}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {example}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button variant="contained" startIcon={<PlayArrow />}>
                Start Practice
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default InteractiveSymbolLibrary