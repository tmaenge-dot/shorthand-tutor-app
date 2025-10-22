import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  Replay,
  ExpandMore,
  Lightbulb
} from '@mui/icons-material'

const ShorthandSymbol = ({ symbolData, showAnimation = true, size = 'medium' }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  // Symbol size configurations
  const sizeConfig = {
    small: { width: 80, height: 60, strokeWidth: 2 },
    medium: { width: 120, height: 90, strokeWidth: 3 },
    large: { width: 160, height: 120, strokeWidth: 4 }
  }

  const config = sizeConfig[size]

  // Animation control
  useEffect(() => {
    let animationFrame
    let startTime

    if (isAnimating) {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const duration = 2000 // 2 seconds for full animation
        
        const progress = Math.min(elapsed / duration, 1)
        setAnimationProgress(progress)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
          setAnimationProgress(1)
        }
      }
      
      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isAnimating])

  const startAnimation = () => {
    setAnimationProgress(0)
    setIsAnimating(true)
  }

  const resetAnimation = () => {
    setIsAnimating(false)
    setAnimationProgress(0)
  }

  // Generate SVG path with animation
  const getAnimatedPath = () => {
    if (!symbolData?.svgPath) return ''
    
    const pathLength = symbolData.svgPath.length
    const visibleLength = pathLength * animationProgress
    
    return symbolData.svgPath.substring(0, Math.floor(visibleLength))
  }

  // Stroke styles based on symbol type
  const getStrokeStyle = () => {
    const baseStyle = {
      fill: 'none',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }

    switch (symbolData?.strokeType) {
      case 'light':
        return {
          ...baseStyle,
          stroke: '#2196F3',
          strokeWidth: config.strokeWidth
        }
      case 'heavy':
        return {
          ...baseStyle,
          stroke: '#1976D2',
          strokeWidth: config.strokeWidth * 1.8
        }
      case 'circle':
        return {
          ...baseStyle,
          stroke: '#4CAF50',
          strokeWidth: config.strokeWidth * 1.2
        }
      case 'dot':
        return {
          ...baseStyle,
          fill: '#FF9800',
          stroke: '#FF9800',
          strokeWidth: 1
        }
      default:
        return {
          ...baseStyle,
          stroke: '#666',
          strokeWidth: config.strokeWidth
        }
    }
  }

  // Direction arrow for stroke direction
  const getDirectionArrow = () => {
    if (!symbolData?.direction || !showAnimation) return null

    const arrowPaths = {
      downward: 'M 60 20 L 60 40 M 55 35 L 60 40 L 65 35',
      upward: 'M 60 70 L 60 50 M 55 55 L 60 50 L 65 55',
      'upward-slope': 'M 30 70 L 50 50 M 45 52 L 50 50 L 48 55'
    }

    return (
      <path
        d={arrowPaths[symbolData.direction]}
        stroke="#FF5722"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity={isAnimating ? 0.7 : 0.3}
      />
    )
  }

  if (!symbolData) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No symbol data available
        </Typography>
      </Box>
    )
  }

  return (
    <Card sx={{ maxWidth: 400, m: 1 }}>
      <CardContent>
        {/* Symbol Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {symbolData.character} ({symbolData.phoneticName})
          </Typography>
          <Chip 
            label={symbolData.strokeType} 
            size="small" 
            color={symbolData.strokeType === 'heavy' ? 'primary' : 'default'}
          />
        </Box>

        {/* SVG Symbol Display */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 2,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 1
        }}>
          <svg 
            width={config.width} 
            height={config.height} 
            viewBox="0 0 120 90"
            style={{ border: '1px solid #e0e0e0', borderRadius: '4px', background: 'white' }}
          >
            {/* Guidelines */}
            <defs>
              <pattern id="guidelines" patternUnits="userSpaceOnUse" width="120" height="90">
                <line x1="0" y1="30" x2="120" y2="30" stroke="#e0e0e0" strokeWidth="0.5" />
                <line x1="0" y1="45" x2="120" y2="45" stroke="#e0e0e0" strokeWidth="1" />
                <line x1="0" y1="60" x2="120" y2="60" stroke="#e0e0e0" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="120" height="90" fill="url(#guidelines)" />
            
            {/* Direction Arrow */}
            {getDirectionArrow()}
            
            {/* Main Symbol */}
            <path
              d={symbolData.svgPath}
              style={getStrokeStyle()}
              strokeDasharray={isAnimating ? `${animationProgress * 200} 200` : 'none'}
            />

            {/* Starting point indicator */}
            <circle
              cx="50" cy="20"
              r="2"
              fill="#4CAF50"
              opacity={showAnimation ? 0.6 : 0}
            />
          </svg>
        </Box>

        {/* Animation Controls */}
        {showAnimation && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Button
                size="small"
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={startAnimation}
                disabled={isAnimating}
              >
                Animate
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<Replay />}
                onClick={resetAnimation}
              >
                Reset
              </Button>
            </Box>
            
            {isAnimating && (
              <LinearProgress 
                variant="determinate" 
                value={animationProgress * 100} 
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        )}

        {/* Symbol Information */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Direction:</strong> {symbolData.direction} • 
            <strong> Position:</strong> {symbolData.position} • 
            <strong> Category:</strong> {symbolData.category}
          </Typography>
        </Box>

        {/* Common Words */}
        {symbolData.commonWords && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Common words:</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {symbolData.commonWords.slice(0, 6).map((word, index) => (
                <Chip
                  key={index}
                  label={word}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Learning Tips */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="primary" fontSize="small" />
              <Typography variant="body2">Learning Tips</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              • Practice the {symbolData.direction} stroke direction consistently<br/>
              • {symbolData.strokeType === 'heavy' ? 'Apply more pressure for thick strokes' : 'Use light pressure for thin strokes'}<br/>
              • Position on the {symbolData.position === 'on-line' ? 'writing line' : symbolData.position}<br/>
              {symbolData.relatedSymbols && (
                <>• Related to: {symbolData.relatedSymbols.join(', ')}<br/></>
              )}
              • Remember the phonetic sound: "{symbolData.phoneticName}"
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default ShorthandSymbol