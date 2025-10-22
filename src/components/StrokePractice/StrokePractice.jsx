import React, { useRef, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  Gesture,
  Replay,
  CheckCircle,
  TouchApp,
  Lightbulb
} from '@mui/icons-material'

const StrokePractice = ({ symbolData, onComplete, isOpen, onClose }) => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPath, setCurrentPath] = useState([])
  const [completedStrokes, setCompletedStrokes] = useState([])
  const [feedback, setFeedback] = useState('')
  const [accuracy, setAccuracy] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Canvas setup
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = 300
    canvas.height = 200
    
    // Clear and set up guidelines
    setupCanvas(ctx)
  }, [isOpen])

  const setupCanvas = (ctx) => {
    // Clear canvas
    ctx.clearRect(0, 0, 300, 200)
    
    // Draw guidelines
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    
    // Horizontal guidelines
    ctx.beginPath()
    ctx.moveTo(0, 50)  // Upper line
    ctx.lineTo(300, 50)
    ctx.moveTo(0, 100) // Main line
    ctx.lineTo(300, 100)
    ctx.moveTo(0, 150) // Lower line
    ctx.lineTo(300, 150)
    ctx.stroke()
    
    ctx.setLineDash([])
    
    // Draw target symbol lightly
    if (symbolData?.svgPath) {
      drawTargetSymbol(ctx)
    }
  }

  const drawTargetSymbol = (ctx) => {
    ctx.strokeStyle = '#e3f2fd'
    ctx.lineWidth = 8
    ctx.globalAlpha = 0.3
    
    // Convert SVG path to canvas coordinates (simplified)
    // This is a basic implementation - would need full SVG path parser for production
    ctx.beginPath()
    
    if (symbolData.id === 'P' || symbolData.id === 'B') {
      // Downward stroke
      ctx.moveTo(150, 50)
      ctx.lineTo(150, 150)
    } else if (symbolData.id === 'T' || symbolData.id === 'D') {
      // Upward stroke
      ctx.moveTo(150, 150)
      ctx.lineTo(150, 50)
    } else if (symbolData.id === 'CH' || symbolData.id === 'J') {
      // Upward slope
      ctx.moveTo(100, 150)
      ctx.lineTo(200, 50)
    }
    
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  // Mouse/touch events
  const startDrawing = (e) => {
    setIsDrawing(true)
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX || e.touches[0].clientX) - rect.left
    const y = (e.clientY || e.touches[0].clientY) - rect.top
    
    setCurrentPath([{ x, y }])
  }

  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX || e.touches[0].clientX) - rect.left
    const y = (e.clientY || e.touches[0].clientY) - rect.top
    
    // Draw line
    ctx.strokeStyle = symbolData?.strokeType === 'heavy' ? '#1976D2' : '#2196F3'
    ctx.lineWidth = symbolData?.strokeType === 'heavy' ? 6 : 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    if (currentPath.length > 0) {
      const lastPoint = currentPath[currentPath.length - 1]
      ctx.beginPath()
      ctx.moveTo(lastPoint.x, lastPoint.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
    
    setCurrentPath(prev => [...prev, { x, y }])
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    
    setIsDrawing(false)
    
    if (currentPath.length > 5) { // Minimum stroke length
      analyzeStroke()
      setCompletedStrokes(prev => [...prev, currentPath])
    }
    
    setCurrentPath([])
  }

  const analyzeStroke = () => {
    // Simple stroke analysis
    if (currentPath.length < 5) {
      setFeedback('Stroke too short. Try a longer, more confident stroke.')
      setAccuracy(20)
      return
    }
    
    const firstPoint = currentPath[0]
    const lastPoint = currentPath[currentPath.length - 1]
    const deltaY = lastPoint.y - firstPoint.y
    const deltaX = lastPoint.x - firstPoint.x
    
    let expectedDirection = symbolData?.direction
    let accuracyScore = 50 // Base score
    
    // Check direction
    if (expectedDirection === 'downward' && deltaY > 30) {
      accuracyScore += 30
      setFeedback('Good downward stroke direction!')
    } else if (expectedDirection === 'upward' && deltaY < -30) {
      accuracyScore += 30
      setFeedback('Excellent upward stroke!')
    } else if (expectedDirection === 'upward-slope' && deltaY < -20 && deltaX > 20) {
      accuracyScore += 30
      setFeedback('Nice upward slope!')
    } else {
      setFeedback(`Try to follow the ${expectedDirection} direction more closely.`)
    }
    
    // Check stroke length
    const strokeLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    if (strokeLength > 70) {
      accuracyScore += 20
    }
    
    setAccuracy(Math.min(accuracyScore, 100))
    
    // Check completion
    if (accuracyScore >= 80) {
      setIsCompleted(true)
      setTimeout(() => {
        onComplete && onComplete(symbolData.id, accuracyScore)
      }, 1500)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    setupCanvas(ctx)
    setCompletedStrokes([])
    setCurrentPath([])
    setFeedback('')
    setAccuracy(0)
    setIsCompleted(false)
  }

  const getInstructions = () => {
    switch (symbolData?.direction) {
      case 'downward':
        return 'Draw a straight line from top to bottom'
      case 'upward':
        return 'Draw a straight line from bottom to top'
      case 'upward-slope':
        return 'Draw a slanted line going up and to the right'
      default:
        return 'Follow the target stroke shown in light blue'
    }
  }

  if (!symbolData) return null

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '70vh' }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Gesture color="primary" />
          <Typography variant="h6">
            Practice: {symbolData.character} ({symbolData.phoneticName})
          </Typography>
          {isCompleted && <CheckCircle color="success" />}
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {getInstructions()}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip 
              label={`${symbolData.strokeType} stroke`} 
              size="small" 
              color={symbolData.strokeType === 'heavy' ? 'primary' : 'default'}
            />
            <Chip 
              label={symbolData.direction} 
              size="small" 
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Practice Canvas */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                <TouchApp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Trace over the light blue guide with your mouse or finger
              </Typography>
            </Box>
            
            <canvas
              ref={canvasRef}
              style={{
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'crosshair',
                backgroundColor: 'white'
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </CardContent>
        </Card>

        {/* Feedback */}
        {feedback && (
          <Alert 
            severity={accuracy >= 80 ? 'success' : accuracy >= 60 ? 'info' : 'warning'}
            sx={{ mb: 2 }}
          >
            {feedback}
          </Alert>
        )}

        {/* Accuracy Score */}
        {accuracy > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Accuracy: {accuracy}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={accuracy} 
              color={accuracy >= 80 ? 'success' : accuracy >= 60 ? 'info' : 'warning'}
            />
          </Box>
        )}

        {/* Tips */}
        <Card sx={{ bgcolor: 'info.50' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Lightbulb color="info" fontSize="small" />
              <Typography variant="subtitle2">Tips</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              • {symbolData.strokeType === 'heavy' ? 'Press firmly for thick strokes' : 'Use light pressure for thin strokes'}<br/>
              • Keep your stroke smooth and continuous<br/>
              • Follow the {symbolData.direction} direction consistently<br/>
              • Practice makes perfect - try multiple times!
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions>
        <Button onClick={clearCanvas} startIcon={<Replay />}>
          Clear & Retry
        </Button>
        <Button onClick={onClose}>
          {isCompleted ? 'Done' : 'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StrokePractice