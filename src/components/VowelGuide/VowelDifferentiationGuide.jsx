import React from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Divider,
  Grid,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

const VowelDifferentiationGuide = () => {
  const vowelPositions = {
    first_place: {
      rule: 'Outline above the line, vowel at beginning of stroke',
      vowels: {
        long_ah: { symbol: 'heavy dot', sound: 'AH as in father', examples: ['father', 'palm', 'calm'] },
        short_a: { symbol: 'light dot', sound: 'A as in cat', examples: ['cat', 'bat', 'hat'] },
        long_ay: { symbol: 'heavy dash', sound: 'AY as in day', examples: ['day', 'may', 'take'] },
        short_e: { symbol: 'light dash', sound: 'E as in pen', examples: ['pen', 'get', 'let'] }
      }
    },
    second_place: {
      rule: 'Outline on the line, vowel in middle of stroke',
      vowels: {
        long_ar: { symbol: 'heavy dot', sound: 'AR as in car', examples: ['car', 'part', 'hard'] },
        short_a: { symbol: 'light dot', sound: 'A as in man', examples: ['man', 'can', 'had'] },
        long_ay: { symbol: 'heavy dash', sound: 'AY as in say', examples: ['say', 'way', 'face'] },
        short_e: { symbol: 'light dash', sound: 'E as in bet', examples: ['bet', 'set', 'net'] }
      }
    },
    third_place: {
      rule: 'Outline through the line, vowel at end of stroke',
      vowels: {
        long_ee: { symbol: 'heavy dot', sound: 'EE as in see', examples: ['see', 'fee', 'tree'] },
        short_i: { symbol: 'light dot', sound: 'I as in bit', examples: ['bit', 'big', 'ship'] },
        long_o: { symbol: 'heavy dash', sound: 'O as in go', examples: ['go', 'so', 'home'] },
        short_u: { symbol: 'light dash', sound: 'U as in but', examples: ['but', 'cut', 'run'] }
      }
    }
  }

  const mnemonics = {
    authentic_ncs: ['Pa may we', 'All go too', 'That pen is', 'Not much good'],
    explanation: 'From NCS textbook - helps remember vowel order and position'
  }

  const commonConfusions = [
    { confusion: 'A in cat vs A in car', solution: 'Cat=short A (light dot, first), Car=long AR (heavy dot, second)' },
    { confusion: 'A in day vs A in say', solution: 'Both long AY but different positions: Day=first place, Say=second place' },
    { confusion: 'Heavy vs light symbols', solution: 'Heavy=long sounds, Light=short sounds' }
  ]

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom color="primary">
        🎯 Vowel Differentiation Guide
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Key Principle:</strong> In Pitman Shorthand, the same letter (like "A") can represent different sounds 
        and use different symbols depending on the specific sound and position. This guide helps you distinguish between them.
      </Alert>

      {/* Mnemonic Sentences */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            📝 NCS Memory Sentences
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {mnemonics.explanation}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {mnemonics.authentic_ncs.map((sentence, index) => (
              <Chip 
                key={index}
                label={sentence} 
                color="primary" 
                variant="outlined"
                size="large"
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Vowel Positions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(vowelPositions).map(([positionName, positionData]) => (
          <Grid item xs={12} md={4} key={positionName}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {positionName.replace('_', ' ').toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {positionData.rule}
                </Typography>
                
                {Object.entries(positionData.vowels).map(([vowelName, vowelData]) => (
                  <Box key={vowelName} sx={{ mb: 2, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {vowelData.sound}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Symbol: {vowelData.symbol}
                    </Typography>
                    <Typography variant="body2">
                      Examples: {vowelData.examples.join(', ')}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Common Confusions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            ⚠️ Common Vowel Confusions & Solutions
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Common Confusion</strong></TableCell>
                  <TableCell><strong>Solution</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commonConfusions.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.confusion}</TableCell>
                    <TableCell>{item.solution}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            📊 Quick Symbol Reference
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">Heavy Symbols (Long Sounds)</Typography>
              <Box sx={{ mt: 1 }}>
                <Chip label="Heavy Dot: Long AH, EE" sx={{ m: 0.5 }} />
                <Chip label="Heavy Dash: Long AY, O" sx={{ m: 0.5 }} />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">Light Symbols (Short Sounds)</Typography>
              <Box sx={{ mt: 1 }}>
                <Chip label="Light Dot: Short A, I" sx={{ m: 0.5 }} />
                <Chip label="Light Dash: Short E, U" sx={{ m: 0.5 }} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default VowelDifferentiationGuide