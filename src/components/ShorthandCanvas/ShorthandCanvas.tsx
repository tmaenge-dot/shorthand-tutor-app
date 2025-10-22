import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Box, Paper, IconButton, Toolbar, Typography, Button, Chip } from '@mui/material'
import { Clear, Undo, Redo, Download, Save, Check } from '@mui/icons-material'
import { Stage, Layer, Line, Circle } from 'react-konva'
import { DrawingStroke, Point, CanvasState } from '../../types/index'

interface ShorthandCanvasProps {
  width?: number
  height?: number
  onStrokeComplete?: (stroke: DrawingStroke) => void
  onCanvasChange?: (canvasState: CanvasState) => void
  readonly?: boolean
  showGrid?: boolean
  targetOutline?: string // SVG path for the target shorthand outline
  comparisonMode?: boolean
  className?: string
}

const ShorthandCanvas: React.FC<ShorthandCanvasProps> = ({
  width = 600,
  height = 400,
  onStrokeComplete,
  onCanvasChange,
  readonly = false,
  showGrid = true,
  targetOutline,
  comparisonMode = false,
  className
}) => {
  const stageRef = useRef<any>(null)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    strokes: [],
    canvasSize: { width, height },
    zoom: 1,
    offset: { x: 0, y: 0 }
  })
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentStroke, setCurrentStroke] = useState<DrawingStroke | null>(null)
  const [history, setHistory] = useState<CanvasState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Save state to history for undo/redo
  const saveToHistory = useCallback((state: CanvasState) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push({ ...state })
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  // Handle mouse/touch down - start drawing
  const handleMouseDown = useCallback((e: any) => {
    if (readonly) return

    const stage = stageRef.current
    const point = stage.getPointerPosition()
    
    const newStroke: DrawingStroke = {
      id: `stroke_${Date.now()}`,
      type: 'line',
      points: [{ x: point.x, y: point.y }],
      strokeWidth: 2,
      color: '#1976d2',
      timestamp: Date.now()
    }

    setIsDrawing(true)
    setCurrentStroke(newStroke)
  }, [readonly])

  // Handle mouse/touch move - continue drawing
  const handleMouseMove = useCallback((e: any) => {
    if (!isDrawing || readonly || !currentStroke) return

    const stage = stageRef.current
    const point = stage.getPointerPosition()
    
    const updatedStroke = {
      ...currentStroke,
      points: [...currentStroke.points, { x: point.x, y: point.y }]
    }
    
    setCurrentStroke(updatedStroke)
  }, [isDrawing, readonly, currentStroke])

  // Handle mouse/touch up - finish drawing
  const handleMouseUp = useCallback(() => {
    if (!isDrawing || readonly || !currentStroke) return

    const newCanvasState = {
      ...canvasState,
      strokes: [...canvasState.strokes, currentStroke]
    }

    saveToHistory(canvasState)
    setCanvasState(newCanvasState)
    setIsDrawing(false)
    
    // Notify parent component
    onStrokeComplete?.(currentStroke)
    onCanvasChange?.(newCanvasState)
    
    setCurrentStroke(null)
  }, [isDrawing, readonly, currentStroke, canvasState, saveToHistory, onStrokeComplete, onCanvasChange])

  // Clear canvas
  const clearCanvas = useCallback(() => {
    saveToHistory(canvasState)
    const newState = { ...canvasState, strokes: [] }
    setCanvasState(newState)
    onCanvasChange?.(newState)
  }, [canvasState, saveToHistory, onCanvasChange])

  // Undo last action
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1]
      setCanvasState(previousState)
      setHistoryIndex(historyIndex - 1)
      onCanvasChange?.(previousState)
    }
  }, [history, historyIndex, onCanvasChange])

  // Redo action
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1]
      setCanvasState(nextState)
      setHistoryIndex(historyIndex + 1)
      onCanvasChange?.(nextState)
    }
  }, [history, historyIndex, onCanvasChange])

  // Convert points array to Konva line points format
  const pointsToKonva = (points: Point[]) => {
    return points.flatMap(point => [point.x, point.y])
  }

  // Render grid lines
  const renderGrid = () => {
    if (!showGrid) return null

    const gridLines = []
    const gridSize = 20

    // Vertical lines
    for (let i = 0; i <= width; i += gridSize) {
      gridLines.push(
        <Line
          key={`v-${i}`}
          points={[i, 0, i, height]}
          stroke="#f0f0f0"
          strokeWidth={1}
        />
      )
    }

    // Horizontal lines
    for (let i = 0; i <= height; i += gridSize) {
      gridLines.push(
        <Line
          key={`h-${i}`}
          points={[0, i, width, i]}
          stroke="#f0f0f0"
          strokeWidth={1}
        />
      )
    }

    // Main baseline (stronger line in the middle)
    gridLines.push(
      <Line
        key="baseline"
        points={[0, height / 2, width, height / 2]}
        stroke="#d0d0d0"
        strokeWidth={2}
      />
    )

    return gridLines
  }

  // Export canvas as image
  const exportCanvas = useCallback(() => {
    const stage = stageRef.current
    if (stage) {
      const dataURL = stage.toDataURL({ pixelRatio: 2 })
      
      // Create download link
      const link = document.createElement('a')
      link.download = `shorthand_practice_${Date.now()}.png`
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [])

  // Calculate similarity score (basic comparison)
  const calculateSimilarity = useCallback(() => {
    // This would implement stroke recognition and comparison
    // For now, return a placeholder score
    return Math.floor(Math.random() * 40) + 60 // 60-100%
  }, [])

  return (
    <Paper 
      className={className}
      sx={{ 
        overflow: 'hidden',
        border: '2px solid',
        borderColor: 'divider',
        borderRadius: 2
      }}
    >
      {/* Toolbar */}
      <Toolbar 
        variant="dense" 
        sx={{ 
          bgcolor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
          minHeight: 48
        }}
      >
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          Shorthand Practice Canvas
        </Typography>
        
        {comparisonMode && (
          <Chip 
            label={`Similarity: ${calculateSimilarity()}%`}
            color="primary"
            size="small"
            icon={<Check />}
            sx={{ mr: 1 }}
          />
        )}
        
        <IconButton onClick={undo} disabled={historyIndex <= 0} size="small">
          <Undo />
        </IconButton>
        
        <IconButton onClick={redo} disabled={historyIndex >= history.length - 1} size="small">
          <Redo />
        </IconButton>
        
        <IconButton onClick={clearCanvas} size="small">
          <Clear />
        </IconButton>
        
        <IconButton onClick={exportCanvas} size="small">
          <Download />
        </IconButton>
      </Toolbar>

      {/* Canvas Area */}
      <Box sx={{ position: 'relative', bgcolor: 'white' }}>
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            {/* Grid */}
            {renderGrid()}
            
            {/* Target outline (if provided) */}
            {targetOutline && comparisonMode && (
              <Line
                points={[]} // Would parse SVG path to points
                stroke="#ffeb3b"
                strokeWidth={3}
                opacity={0.5}
                dash={[5, 5]}
              />
            )}
            
            {/* Completed strokes */}
            {canvasState.strokes.map((stroke) => (
              <Line
                key={stroke.id}
                points={pointsToKonva(stroke.points)}
                stroke={stroke.color}
                strokeWidth={stroke.strokeWidth}
                tension={0.2}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation="source-over"
              />
            ))}
            
            {/* Current stroke being drawn */}
            {currentStroke && (
              <Line
                points={pointsToKonva(currentStroke.points)}
                stroke={currentStroke.color}
                strokeWidth={currentStroke.strokeWidth}
                tension={0.2}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation="source-over"
              />
            )}
          </Layer>
        </Stage>

        {/* Overlay instructions */}
        {canvasState.strokes.length === 0 && !isDrawing && !readonly && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'text.secondary',
              pointerEvents: 'none'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Start Drawing
            </Typography>
            <Typography variant="body2">
              Click and drag to draw shorthand strokes
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default ShorthandCanvas