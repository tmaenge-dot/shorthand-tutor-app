import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress
} from '@mui/material'
import {
  Analytics,
  Feedback,
  Download,
  Refresh,
  Star,
  TrendingUp,
  People,
  ThumbUp
} from '@mui/icons-material'

const FeedbackAnalytics = () => {
  const [feedback, setFeedback] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)

  useEffect(() => {
    loadFeedback()
  }, [])

  const loadFeedback = () => {
    try {
      const data = JSON.parse(localStorage.getItem('learner_feedback') || '[]')
      setFeedback(data)
    } catch (error) {
      console.error('Error loading feedback:', error)
    }
  }

  const calculateStats = () => {
    if (feedback.length === 0) return null

    const avgOverallRating = feedback.reduce((sum, f) => sum + f.overallRating, 0) / feedback.length
    const avgEaseOfUse = feedback.reduce((sum, f) => sum + f.easeOfUse, 0) / feedback.length
    
    const effectivenessCount = feedback.reduce((acc, f) => {
      acc[f.effectiveness] = (acc[f.effectiveness] || 0) + 1
      return acc
    }, {})

    const recommendationCount = feedback.reduce((acc, f) => {
      acc[f.wouldRecommend] = (acc[f.wouldRecommend] || 0) + 1
      return acc
    }, {})

    const topFeatures = feedback.reduce((acc, f) => {
      f.features.forEach(feature => {
        acc[feature] = (acc[feature] || 0) + 1
      })
      return acc
    }, {})

    return {
      avgOverallRating,
      avgEaseOfUse,
      effectivenessCount,
      recommendationCount,
      topFeatures,
      totalResponses: feedback.length
    }
  }

  const exportFeedback = () => {
    const dataStr = JSON.stringify(feedback, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `learner_feedback_${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const stats = calculateStats()

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" display="flex" alignItems="center" gap={1}>
          <Analytics color="primary" />
          Learner Feedback Analytics
        </Typography>
        <Box>
          <Button
            startIcon={<Refresh />}
            onClick={loadFeedback}
            sx={{ mr: 1 }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={exportFeedback}
            disabled={feedback.length === 0}
          >
            Export Data
          </Button>
        </Box>
      </Box>

      {feedback.length === 0 ? (
        <Alert severity="info">
          No feedback collected yet. The feedback system is active and waiting for learner responses.
        </Alert>
      ) : (
        <>
          {/* Summary Stats */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <People color="primary" />
                    <Typography variant="h6">Total Responses</Typography>
                  </Box>
                  <Typography variant="h3" color="primary">
                    {stats.totalResponses}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Star color="primary" />
                    <Typography variant="h6">Avg Rating</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h3" color="primary">
                      {stats.avgOverallRating.toFixed(1)}
                    </Typography>
                    <Rating value={stats.avgOverallRating} readOnly size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <ThumbUp color="primary" />
                    <Typography variant="h6">Ease of Use</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h3" color="primary">
                      {stats.avgEaseOfUse.toFixed(1)}
                    </Typography>
                    <Rating value={stats.avgEaseOfUse} readOnly size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <TrendingUp color="primary" />
                    <Typography variant="h6">Would Recommend</Typography>
                  </Box>
                  <Typography variant="h3" color="primary">
                    {Math.round(((stats.recommendationCount.definitely || 0) + (stats.recommendationCount.probably || 0)) / stats.totalResponses * 100)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Effectiveness Breakdown */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Learning Effectiveness</Typography>
                {Object.entries(stats.effectivenessCount).map(([key, count]) => (
                  <Box key={key} mb={1}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {key.replace('-', ' ')}
                      </Typography>
                      <Typography variant="body2">{count} responses</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(count / stats.totalResponses) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Most Helpful Features</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {Object.entries(stats.topFeatures)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 6)
                    .map(([feature, count]) => (
                      <Chip
                        key={feature}
                        label={`${feature} (${count})`}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Individual Feedback */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Individual Responses</Typography>
            <List>
              {feedback.map((item, index) => (
                <React.Fragment key={item.sessionId || index}>
                  <ListItem
                    button
                    onClick={() => {
                      setSelectedFeedback(item)
                      setOpen(true)
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box display="flex" alignItems="center" gap={2}>
                            <Rating value={item.overallRating} readOnly size="small" />
                            <Chip
                              label={item.effectiveness?.replace('-', ' ') || 'N/A'}
                              size="small"
                              color={
                                item.effectiveness?.includes('very-effective') ? 'success' :
                                item.effectiveness?.includes('effective') ? 'primary' : 'default'
                              }
                            />
                          </Box>
                          <Typography variant="caption">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        item.mostHelpful && item.mostHelpful.length > 0
                          ? `Most helpful: ${item.mostHelpful.substring(0, 100)}...`
                          : 'No specific feedback provided'
                      }
                    />
                  </ListItem>
                  {index < feedback.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </>
      )}

      {/* Detailed Feedback Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Detailed Feedback</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <Box sx={{ py: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Overall Rating:</Typography>
                  <Rating value={selectedFeedback.overallRating} readOnly />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Ease of Use:</Typography>
                  <Rating value={selectedFeedback.easeOfUse} readOnly />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Learning Effectiveness:</Typography>
                  <Typography>{selectedFeedback.effectiveness?.replace('-', ' ')}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Helpful Features:</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {selectedFeedback.features?.map((feature) => (
                      <Chip key={feature} label={feature} size="small" />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Learning Progress:</Typography>
                  <Typography>{selectedFeedback.learningProgress || 'Not provided'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Most Helpful Feature:</Typography>
                  <Typography>{selectedFeedback.mostHelpful || 'Not provided'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Would Recommend:</Typography>
                  <Typography>{selectedFeedback.wouldRecommend?.replace('-', ' ')}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Suggested Improvements:</Typography>
                  <Typography>{selectedFeedback.improvements || 'None provided'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Additional Comments:</Typography>
                  <Typography>{selectedFeedback.comments || 'None provided'}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FeedbackAnalytics