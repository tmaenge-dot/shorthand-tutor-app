import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Rating,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Alert,
  Fab,
  Slide,
  IconButton
} from '@mui/material'
import {
  Feedback as FeedbackIcon,
  Close,
  Send,
  Star,
  ThumbUp,
  ThumbDown,
  School,
  Speed,
  Assessment
} from '@mui/icons-material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const LearnerFeedback = () => {
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState({
    overallRating: 0,
    effectiveness: '',
    easeOfUse: 0,
    features: [],
    improvements: '',
    wouldRecommend: '',
    learningProgress: '',
    mostHelpful: '',
    comments: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const effectivenessOptions = [
    { value: 'very-effective', label: 'Very Effective - Significantly improved my shorthand skills' },
    { value: 'effective', label: 'Effective - Noticeable improvement in my learning' },
    { value: 'somewhat-effective', label: 'Somewhat Effective - Minor improvement' },
    { value: 'not-effective', label: 'Not Effective - No noticeable improvement' }
  ]

  const featureOptions = [
    { label: 'Speed Development', icon: <Speed />, key: 'speed' },
    { label: 'Practice Exercises', icon: <School />, key: 'practice' },
    { label: 'Assessment System', icon: <Assessment />, key: 'assessment' },
    { label: 'Progress Tracking', icon: <ThumbUp />, key: 'progress' },
    { label: 'Symbol Library', icon: <Star />, key: 'symbols' },
    { label: 'Gamification', icon: <ThumbUp />, key: 'gamification' }
  ]

  const handleFeatureToggle = (feature) => {
    setFeedback(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleSubmit = async () => {
    try {
      // Store feedback locally for testing phase
      const feedbackData = {
        ...feedback,
        timestamp: new Date().toISOString(),
        sessionId: Date.now()
      }
      
      // Save to localStorage for now (in production, this would go to a database)
      const existingFeedback = JSON.parse(localStorage.getItem('learner_feedback') || '[]')
      existingFeedback.push(feedbackData)
      localStorage.setItem('learner_feedback', JSON.stringify(existingFeedback))
      
      setSubmitted(true)
      setTimeout(() => {
        setOpen(false)
        setSubmitted(false)
        // Reset form
        setFeedback({
          overallRating: 0,
          effectiveness: '',
          easeOfUse: 0,
          features: [],
          improvements: '',
          wouldRecommend: '',
          learningProgress: '',
          mostHelpful: '',
          comments: ''
        })
      }, 2000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
    }
  }

  return (
    <>
      {/* Floating Feedback Button */}
      <Fab
        color="secondary"
        aria-label="feedback"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000
        }}
        onClick={() => setOpen(true)}
      >
        <FeedbackIcon />
      </Fab>

      {/* Feedback Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Share Your Learning Experience</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {submitted ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Thank you for your feedback! Your insights help us improve the learning experience.
            </Alert>
          ) : (
            <Box sx={{ py: 2 }}>
              {/* Overall Rating */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Overall Experience
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography>Rate your overall experience:</Typography>
                  <Rating
                    value={feedback.overallRating}
                    onChange={(event, newValue) => 
                      setFeedback(prev => ({ ...prev, overallRating: newValue || 0 }))
                    }
                    size="large"
                  />
                </Box>
              </Box>

              {/* Learning Effectiveness */}
              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    <Typography variant="h6">How effective has this app been for your shorthand learning?</Typography>
                  </FormLabel>
                  <RadioGroup
                    value={feedback.effectiveness}
                    onChange={(e) => setFeedback(prev => ({ ...prev, effectiveness: e.target.value }))}
                  >
                    {effectivenessOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* Ease of Use */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Ease of Use
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography>How easy is the app to navigate and use?</Typography>
                  <Rating
                    value={feedback.easeOfUse}
                    onChange={(event, newValue) => 
                      setFeedback(prev => ({ ...prev, easeOfUse: newValue || 0 }))
                    }
                    size="large"
                  />
                </Box>
              </Box>

              {/* Most Helpful Features */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Which features have been most helpful? (Select all that apply)
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {featureOptions.map((feature) => (
                    <Chip
                      key={feature.key}
                      icon={feature.icon}
                      label={feature.label}
                      onClick={() => handleFeatureToggle(feature.key)}
                      color={feedback.features.includes(feature.key) ? 'primary' : 'default'}
                      variant={feedback.features.includes(feature.key) ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Box>

              {/* Learning Progress */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Describe your learning progress since using this app"
                  multiline
                  rows={3}
                  value={feedback.learningProgress}
                  onChange={(e) => setFeedback(prev => ({ ...prev, learningProgress: e.target.value }))}
                  placeholder="e.g., I've improved my speed from 20 WPM to 35 WPM..."
                />
              </Box>

              {/* Most Helpful Feature */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="What specific feature or exercise has been most helpful?"
                  value={feedback.mostHelpful}
                  onChange={(e) => setFeedback(prev => ({ ...prev, mostHelpful: e.target.value }))}
                  placeholder="e.g., Speed development exercises, Symbol practice..."
                />
              </Box>

              {/* Recommendation */}
              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    <Typography variant="h6">Would you recommend this app to other shorthand learners?</Typography>
                  </FormLabel>
                  <RadioGroup
                    value={feedback.wouldRecommend}
                    onChange={(e) => setFeedback(prev => ({ ...prev, wouldRecommend: e.target.value }))}
                    row
                  >
                    <FormControlLabel value="definitely" control={<Radio />} label="Definitely" />
                    <FormControlLabel value="probably" control={<Radio />} label="Probably" />
                    <FormControlLabel value="maybe" control={<Radio />} label="Maybe" />
                    <FormControlLabel value="probably-not" control={<Radio />} label="Probably Not" />
                    <FormControlLabel value="definitely-not" control={<Radio />} label="Definitely Not" />
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* Improvements */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="What improvements would make this app more effective for learning?"
                  multiline
                  rows={3}
                  value={feedback.improvements}
                  onChange={(e) => setFeedback(prev => ({ ...prev, improvements: e.target.value }))}
                  placeholder="Suggest features, content, or changes that would enhance your learning experience..."
                />
              </Box>

              {/* Additional Comments */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Additional Comments"
                  multiline
                  rows={3}
                  value={feedback.comments}
                  onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
                  placeholder="Any other thoughts about your experience with the app..."
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        {!submitted && (
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={<Send />}
              disabled={!feedback.overallRating || !feedback.effectiveness}
            >
              Submit Feedback
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  )
}

export default LearnerFeedback