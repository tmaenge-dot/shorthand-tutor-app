import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button
} from '@mui/material'
import {
  School,
  Gesture,
  VolumeUp,
  FilterList
} from '@mui/icons-material'
import ShorthandSymbol from '../../components/ShorthandSymbol/ShorthandSymbol'
import { shorthandSymbols } from '../../data/lessonData'

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
)

const ShorthandReference = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [strokeTypeFilter, setStrokeTypeFilter] = useState('all')
  const [showAnimation, setShowAnimation] = useState(true)

  // Organize symbols by category
  const symbolsByCategory = {
    consonants: Object.values(shorthandSymbols).filter(s => s.category === 'consonant'),
    vowels: Object.values(shorthandSymbols).filter(s => s.category === 'vowel'),
    all: Object.values(shorthandSymbols)
  }

  // Filter symbols based on current filters
  const getFilteredSymbols = (category) => {
    let symbols = symbolsByCategory[category] || []
    
    if (strokeTypeFilter !== 'all') {
      symbols = symbols.filter(s => s.strokeType === strokeTypeFilter)
    }
    
    return symbols
  }

  // Get unique stroke types for filter
  const strokeTypes = [...new Set(Object.values(shorthandSymbols).map(s => s.strokeType))]

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Quick practice function (placeholder)
  const startQuickPractice = (symbolId) => {
    // This could navigate to a practice page or open a practice modal
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Pitman Shorthand Symbol Reference
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Interactive guide to all shorthand symbols with animations and practice tips
        </Typography>
        
        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 3 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Stroke Type</InputLabel>
            <Select
              value={strokeTypeFilter}
              onChange={(e) => setStrokeTypeFilter(e.target.value)}
              label="Stroke Type"
            >
              <MenuItem value="all">All Types</MenuItem>
              {strokeTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button
            variant={showAnimation ? "contained" : "outlined"}
            startIcon={<Gesture />}
            onClick={() => setShowAnimation(!showAnimation)}
            size="small"
          >
            {showAnimation ? 'Hide' : 'Show'} Animations
          </Button>
        </Box>
      </Box>

      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab 
            label={`All Symbols (${getFilteredSymbols('all').length})`} 
            icon={<School />} 
          />
          <Tab 
            label={`Consonants (${getFilteredSymbols('consonants').length})`} 
            icon={<VolumeUp />} 
          />
          <Tab 
            label={`Vowels (${getFilteredSymbols('vowels').length})`} 
            icon={<FilterList />} 
          />
        </Tabs>
      </Box>

      {/* All Symbols Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          {getFilteredSymbols('all').map((symbol) => (
            <Grid item xs={12} sm={6} md={4} key={symbol.id}>
              <Box sx={{ position: 'relative' }}>
                <ShorthandSymbol 
                  symbolData={symbol} 
                  showAnimation={showAnimation}
                  size="medium"
                />
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => startQuickPractice(symbol.id)}
                    sx={{ minWidth: 'auto', p: 0.5 }}
                  >
                    Practice
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Consonants Tab */}
      <TabPanel value={activeTab} index={1}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Consonant Strokes
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Consonants form the skeleton of shorthand words. Master the stroke direction and thickness.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {getFilteredSymbols('consonants').map((symbol) => (
            <Grid item xs={12} sm={6} md={4} key={symbol.id}>
              <ShorthandSymbol 
                symbolData={symbol} 
                showAnimation={showAnimation}
                size="medium"
              />
            </Grid>
          ))}
        </Grid>

        {/* Learning Tips for Consonants */}
        <Card sx={{ mt: 4, bgcolor: 'primary.50' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              Consonant Learning Tips
            </Typography>
            <Typography variant="body2">
              • <strong>Light vs Heavy:</strong> Light strokes for voiceless sounds (P, T, K), heavy for voiced (B, D, G)<br/>
              • <strong>Direction matters:</strong> Downward strokes (P, B), upward strokes (T, D)<br/>
              • <strong>Practice pairs:</strong> Learn related symbols together (P/B, T/D, Ch/J)<br/>
              • <strong>Muscle memory:</strong> Repeat each stroke until it becomes automatic
            </Typography>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Vowels Tab */}
      <TabPanel value={activeTab} index={2}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Vowel Signs
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Vowels are shown by dots and dashes positioned around consonant strokes.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {getFilteredSymbols('vowels').map((symbol) => (
            <Grid item xs={12} sm={6} md={4} key={symbol.id}>
              <ShorthandSymbol 
                symbolData={symbol} 
                showAnimation={showAnimation}
                size="medium"
              />
            </Grid>
          ))}
        </Grid>

        {/* Vowel Position Guide */}
        <Card sx={{ mt: 4, bgcolor: 'secondary.50' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="secondary">
              Vowel Position Guide
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>First Place</Typography>
                <Typography variant="body2">
                  Written at the beginning of strokes
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>Second Place</Typography>
                <Typography variant="body2">
                  Written at the middle of strokes
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>Third Place</Typography>
                <Typography variant="body2">
                  Written at the end of strokes
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Quick Reference */}
      <Card sx={{ mt: 4, bgcolor: 'warning.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Reference
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Light Stroke = Voiceless" size="small" />
            <Chip label="Heavy Stroke = Voiced" size="small" />
            <Chip label="↓ Downward" size="small" />
            <Chip label="↑ Upward" size="small" />
            <Chip label="● Dot Vowels" size="small" />
            <Chip label="— Dash Vowels" size="small" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ShorthandReference