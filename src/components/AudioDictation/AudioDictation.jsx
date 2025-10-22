import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  Stop,
  Mic,
  MicOff,
  VolumeUp,
  Speed,
  Replay,
  CheckCircle,
  Close
} from '@mui/icons-material'

const AudioDictation = ({ dictationData, isOpen, onClose, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [userTranscription, setUserTranscription] = useState('')
  const [accuracy, setAccuracy] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  
  const audioRef = useRef(null)
  const recognitionRef = useRef(null)
  const intervalRef = useRef(null)

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if (!isOpen || !dictationData) return

    // Speech recognition setup
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setUserTranscription(prev => prev + finalTranscript + ' ')
        }
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isOpen, dictationData])

  const generateSpeech = (text, rate = 1) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = rate
      utterance.volume = 0.8
      utterance.lang = 'en-US'
      
      utterance.onstart = () => {
        setIsPlaying(true)
        setIsPaused(false)
        startProgressTracking(text, rate)
      }
      
      utterance.onend = () => {
        setIsPlaying(false)
        setIsPaused(false)
        setCurrentPosition(100)
        clearInterval(intervalRef.current)
      }
      
      utterance.onpause = () => {
        setIsPaused(true)
        clearInterval(intervalRef.current)
      }
      
      return utterance
    }
    return null
  }

  const startProgressTracking = (text, rate) => {
    const duration = (text.length / (rate * 10)) * 1000 // Rough estimate
    const increment = 100 / (duration / 100)
    
    intervalRef.current = setInterval(() => {
      setCurrentPosition(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current)
          return 100
        }
        return prev + increment
      })
    }, 100)
  }

  const handlePlay = () => {
    if (!dictationData?.text) return
    
    if (isPaused && speechSynthesis.paused) {
      speechSynthesis.resume()
      setIsPaused(false)
      setIsPlaying(true)
    } else {
      const utterance = generateSpeech(dictationData.text, playbackSpeed)
      if (utterance) {
        setCurrentPosition(0)
        speechSynthesis.speak(utterance)
      }
    }
  }

  const handlePause = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause()
      setIsPaused(true)
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentPosition(0)
    clearInterval(intervalRef.current)
  }

  const handleSpeedChange = (newSpeed) => {
    setPlaybackSpeed(newSpeed)
    if (isPlaying) {
      handleStop()
    }
  }

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setUserTranscription('')
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const analyzeTranscription = () => {
    if (!dictationData?.text || !userTranscription.trim()) {
      setFeedback('Please provide a transcription first.')
      return
    }

    const originalWords = dictationData.text.toLowerCase().split(/\s+/)
    const userWords = userTranscription.toLowerCase().trim().split(/\s+/)
    
    let correctWords = 0
    const maxLength = Math.max(originalWords.length, userWords.length)
    
    // Simple word-by-word comparison
    for (let i = 0; i < Math.min(originalWords.length, userWords.length); i++) {
      const original = originalWords[i].replace(/[^\w]/g, '')
      const user = userWords[i].replace(/[^\w]/g, '')
      if (original === user) {
        correctWords++
      }
    }
    
    const accuracyPercent = Math.round((correctWords / originalWords.length) * 100)
    setAccuracy(accuracyPercent)
    
    if (accuracyPercent >= 90) {
      setFeedback('Excellent work! Your transcription is highly accurate.')
    } else if (accuracyPercent >= 75) {
      setFeedback('Good job! A few minor errors to work on.')
    } else if (accuracyPercent >= 60) {
      setFeedback('Not bad, but practice will help improve accuracy.')
    } else {
      setFeedback('Keep practicing! Focus on listening carefully to each word.')
    }
    
    if (accuracyPercent >= 75) {
      setIsCompleted(true)
      setTimeout(() => {
        onComplete && onComplete(dictationData.id, accuracyPercent)
      }, 2000)
    }
  }

  const resetDictation = () => {
    handleStop()
    setUserTranscription('')
    setAccuracy(null)
    setFeedback('')
    setIsCompleted(false)
    setCurrentPosition(0)
  }

  if (!dictationData) return null

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5]

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VolumeUp color="primary" />
            <Typography variant="h6">
              Dictation Exercise: {dictationData.title}
            </Typography>
            {isCompleted && <CheckCircle color="success" />}
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {dictationData.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip 
              label={`${dictationData.wordCount} words`} 
              size="small" 
              variant="outlined"
            />
            <Chip 
              label={`${dictationData.difficulty} difficulty`} 
              size="small" 
              color={dictationData.difficulty === 'beginner' ? 'success' : dictationData.difficulty === 'intermediate' ? 'warning' : 'error'}
            />
            <Chip 
              label={`${dictationData.estimatedTime}`} 
              size="small" 
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Audio Controls */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Audio Playback
            </Typography>
            
            {/* Progress Bar */}
            <Box sx={{ mb: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={currentPosition} 
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                {Math.round(currentPosition)}% complete
              </Typography>
            </Box>
            
            {/* Playback Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Button
                variant={isPlaying ? "outlined" : "contained"}
                onClick={isPlaying ? handlePause : handlePlay}
                startIcon={isPlaying ? <Pause /> : <PlayArrow />}
                disabled={!dictationData?.text}
              >
                {isPlaying ? 'Pause' : isPaused ? 'Resume' : 'Play'}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleStop}
                startIcon={<Stop />}
                disabled={!isPlaying && !isPaused}
              >
                Stop
              </Button>
              
              <Button
                variant="outlined"
                onClick={resetDictation}
                startIcon={<Replay />}
              >
                Reset
              </Button>
            </Box>
            
            {/* Speed Control */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed fontSize="small" />
              <Typography variant="body2">Speed:</Typography>
              {speedOptions.map(speed => (
                <Chip
                  key={speed}
                  label={`${speed}x`}
                  size="small"
                  variant={playbackSpeed === speed ? "filled" : "outlined"}
                  onClick={() => handleSpeedChange(speed)}
                  clickable
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Speech Recognition */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Your Transcription
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Button
                variant={isRecording ? "contained" : "outlined"}
                onClick={isRecording ? stopRecording : startRecording}
                startIcon={isRecording ? <MicOff /> : <Mic />}
                color={isRecording ? "error" : "primary"}
                disabled={!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
              >
                {isRecording ? 'Stop Recording' : 'Start Voice Input'}
              </Button>
              
              {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  Speech recognition not supported in this browser
                </Typography>
              )}
            </Box>
            
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              placeholder="Type or speak your transcription here..."
              value={userTranscription}
              onChange={(e) => setUserTranscription(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <Button
              variant="contained"
              onClick={analyzeTranscription}
              disabled={!userTranscription.trim()}
            >
              Check Accuracy
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {accuracy !== null && (
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Results
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Accuracy: {accuracy}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={accuracy} 
                  color={accuracy >= 90 ? 'success' : accuracy >= 75 ? 'info' : accuracy >= 60 ? 'warning' : 'error'}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              {feedback && (
                <Alert 
                  severity={accuracy >= 90 ? 'success' : accuracy >= 75 ? 'info' : 'warning'}
                  sx={{ mb: 2 }}
                >
                  {feedback}
                </Alert>
              )}
              
              {/* Original Text Reference */}
              <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Original Text:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dictationData.text}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {isCompleted ? 'Done' : 'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AudioDictation