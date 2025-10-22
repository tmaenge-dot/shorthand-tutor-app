import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material'
import {
  Search,
  ExpandMore,
  Gesture
} from '@mui/icons-material'

interface ShorthandSymbol {
  symbol: string
  sound: string
  category: string
  examples: string[]
  description: string
  strokeType: 'straight' | 'curved' | 'circle' | 'hook' | 'loop'
  direction: 'up' | 'down' | 'horizontal' | 'clockwise' | 'counterclockwise'
}

const SymbolReference: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const shorthandSymbols: ShorthandSymbol[] = [
    // Straight Strokes
    { symbol: 'P', sound: 'P', category: 'Straight Strokes', examples: ['pay', 'pot', 'put'], description: 'Heavy downward stroke', strokeType: 'straight', direction: 'down' },
    { symbol: 'B', sound: 'B', category: 'Straight Strokes', examples: ['bay', 'boy', 'buy'], description: 'Light downward stroke', strokeType: 'straight', direction: 'down' },
    { symbol: 'T', sound: 'T', category: 'Straight Strokes', examples: ['tea', 'tie', 'toy'], description: 'Light horizontal stroke', strokeType: 'straight', direction: 'horizontal' },
    { symbol: 'D', sound: 'D', category: 'Straight Strokes', examples: ['day', 'die', 'do'], description: 'Heavy horizontal stroke', strokeType: 'straight', direction: 'horizontal' },
    { symbol: 'CH', sound: 'CH', category: 'Straight Strokes', examples: ['chay', 'chew', 'choose'], description: 'Light downward stroke (longer than B)', strokeType: 'straight', direction: 'down' },
    { symbol: 'J', sound: 'J', category: 'Straight Strokes', examples: ['jay', 'jew', 'joy'], description: 'Heavy downward stroke (longer than P)', strokeType: 'straight', direction: 'down' },
    { symbol: 'K', sound: 'K', category: 'Straight Strokes', examples: ['key', 'cow', 'cut'], description: 'Light upward stroke', strokeType: 'straight', direction: 'up' },
    { symbol: 'G', sound: 'G', category: 'Straight Strokes', examples: ['gay', 'go', 'guy'], description: 'Heavy upward stroke', strokeType: 'straight', direction: 'up' },

    // Curved Strokes
    { symbol: 'F', sound: 'F', category: 'Curved Strokes', examples: ['fee', 'foe', 'few'], description: 'Light curve upward', strokeType: 'curved', direction: 'up' },
    { symbol: 'V', sound: 'V', category: 'Curved Strokes', examples: ['vee', 'view', 'vow'], description: 'Heavy curve upward', strokeType: 'curved', direction: 'up' },
    { symbol: 'TH', sound: 'TH', category: 'Curved Strokes', examples: ['thee', 'though', 'thick'], description: 'Light curve upward (steeper than F)', strokeType: 'curved', direction: 'up' },
    { symbol: 'S', sound: 'S', category: 'Curved Strokes', examples: ['see', 'say', 'so'], description: 'Light curve downward', strokeType: 'curved', direction: 'down' },
    { symbol: 'SH', sound: 'SH', category: 'Curved Strokes', examples: ['she', 'show', 'shoe'], description: 'Heavy curve downward', strokeType: 'curved', direction: 'down' },
    { symbol: 'M', sound: 'M', category: 'Curved Strokes', examples: ['me', 'may', 'my'], description: 'Heavy curve right-to-left', strokeType: 'curved', direction: 'horizontal' },
    { symbol: 'N', sound: 'N', category: 'Curved Strokes', examples: ['no', 'new', 'now'], description: 'Light curve right-to-left', strokeType: 'curved', direction: 'horizontal' },
    { symbol: 'L', sound: 'L', category: 'Curved Strokes', examples: ['lay', 'low', 'lieu'], description: 'Light curve left-to-right', strokeType: 'curved', direction: 'horizontal' },
    { symbol: 'R', sound: 'R', category: 'Curved Strokes', examples: ['ray', 'row', 'rue'], description: 'Heavy curve left-to-right', strokeType: 'curved', direction: 'horizontal' },

    // Circles and Hooks
    { symbol: 'S Circle', sound: 'S', category: 'Circles & Hooks', examples: ['sits', 'sat', 'soon'], description: 'Small circle for S sound', strokeType: 'circle', direction: 'clockwise' },
    { symbol: 'SW Circle', sound: 'SW', category: 'Circles & Hooks', examples: ['sweet', 'swift', 'swoon'], description: 'Large circle for SW sound', strokeType: 'circle', direction: 'clockwise' },
    { symbol: 'N Hook', sound: 'N', category: 'Circles & Hooks', examples: ['pen', 'can', 'run'], description: 'Hook for final N', strokeType: 'hook', direction: 'clockwise' },
    { symbol: 'F/V Hook', sound: 'F/V', category: 'Circles & Hooks', examples: ['half', 'have', 'give'], description: 'Hook for final F or V', strokeType: 'hook', direction: 'counterclockwise' },

    // Loops
    { symbol: 'ST Loop', sound: 'ST', category: 'Loops', examples: ['rest', 'fast', 'best'], description: 'Small loop for ST combination', strokeType: 'loop', direction: 'clockwise' },
    { symbol: 'STR Loop', sound: 'STR', category: 'Loops', examples: ['street', 'strong', 'strap'], description: 'Large loop for STR combination', strokeType: 'loop', direction: 'clockwise' },

    // Vowels
    { symbol: '•', sound: 'A', category: 'Vowels', examples: ['cat', 'hat', 'bat'], description: 'Heavy dot for A sound', strokeType: 'circle', direction: 'clockwise' },
    { symbol: '˙', sound: 'E', category: 'Vowels', examples: ['bet', 'pet', 'get'], description: 'Light dot for E sound', strokeType: 'circle', direction: 'clockwise' },
    { symbol: '⌐', sound: 'I', category: 'Vowels', examples: ['bit', 'pit', 'hit'], description: 'Light dash for I sound', strokeType: 'straight', direction: 'horizontal' },
    { symbol: '‾', sound: 'O', category: 'Vowels', examples: ['cot', 'pot', 'got'], description: 'Heavy dash for O sound', strokeType: 'straight', direction: 'horizontal' },
    { symbol: '⌒', sound: 'U', category: 'Vowels', examples: ['cut', 'put', 'but'], description: 'Light tick for U sound', strokeType: 'curved', direction: 'up' },
    { symbol: '⌓', sound: 'OO', category: 'Vowels', examples: ['book', 'look', 'took'], description: 'Heavy tick for OO sound', strokeType: 'curved', direction: 'up' }
  ]

  const categories = ['all', ...Array.from(new Set(shorthandSymbols.map(s => s.category)))]

  const filteredSymbols = shorthandSymbols.filter(symbol => {
    const matchesSearch = symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symbol.sound.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symbol.examples.some(example => example.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         symbol.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || symbol.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const groupedSymbols = categories.slice(1).reduce((acc, category) => {
    acc[category] = filteredSymbols.filter(symbol => symbol.category === category)
    return acc
  }, {} as Record<string, ShorthandSymbol[]>)

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Symbol Reference
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quick lookup for Pitman shorthand symbols, strokes, and their meanings
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search symbols, sounds, or example words..."
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
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map(category => (
                  <Chip
                    key={category}
                    label={category === 'all' ? 'All Categories' : category}
                    onClick={() => setSelectedCategory(category)}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Results */}
      <Typography variant="h6" gutterBottom>
        {filteredSymbols.length} symbols found
      </Typography>

      {/* Symbol Categories */}
      {Object.entries(groupedSymbols).map(([category, symbols]) => (
        symbols.length > 0 && (
          <Accordion key={category} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Gesture color="primary" />
                <Typography variant="h6">{category}</Typography>
                <Chip label={symbols.length} size="small" />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {symbols.map((symbol, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card variant="outlined">
                      <CardContent sx={{ pb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Typography variant="h4" color="primary" fontWeight="bold">
                            {symbol.symbol}
                          </Typography>
                          <Box>
                            <Typography variant="h6">
                              {symbol.sound}
                            </Typography>
                            <Chip 
                              label={`${symbol.strokeType} - ${symbol.direction}`} 
                              size="small" 
                              color="secondary"
                            />
                          </Box>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {symbol.description}
                        </Typography>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <Typography variant="body2" fontWeight="500" gutterBottom>
                          Examples:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {symbol.examples.map((example, idx) => (
                            <Chip 
                              key={idx} 
                              label={example} 
                              size="small" 
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )
      ))}

      {filteredSymbols.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No symbols found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search terms or selecting a different category
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default SymbolReference