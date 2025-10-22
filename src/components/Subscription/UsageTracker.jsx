import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Grid,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  TrendingUp,
  Speed,
  RecordVoiceOver,
  School,
  Timeline,
  InfoOutlined
} from '@mui/icons-material'
import { useSubscription } from '../../hooks/useSubscription'

const UsageTracker = ({ variant = 'compact' }) => {
  const { 
    currentPlan, 
    getRemainingUsage 
  } = useSubscription()

  // Mock usage stats for now
  const usageStats = {
    weeklySpeedExercises: 15,
    weeklyDictationMinutes: 120,
    weeklyModulesAccessed: 3,
    totalDaysActive: 12
  }

  if (currentPlan.id === 'premium' || currentPlan.id === 'premium-yearly' || currentPlan.id === 'institutional') {
    if (variant === 'compact') {
      return (
        <Card sx={{ bgcolor: 'primary.main', color: 'white', mb: 2 }}>
          <CardContent sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2">
                ⭐ {currentPlan.name} - Unlimited Access
              </Typography>
              <Chip 
                label="Premium" 
                size="small" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            </Box>
          </CardContent>
        </Card>
      )
    }
    return null
  }

  const speedRemaining = getRemainingUsage('speedExercise')
  const dictationRemaining = getRemainingUsage('dictation')
  
  const speedTotal = currentPlan.features.speedExercisesPerDay === -1 ? 100 : currentPlan.features.speedExercisesPerDay
  const dictationTotal = currentPlan.features.dictationMinutesPerDay === -1 ? 100 : currentPlan.features.dictationMinutesPerDay
  
  const speedProgress = speedTotal === -1 ? 0 : ((speedTotal - speedRemaining) / speedTotal) * 100
  const dictationProgress = dictationTotal === -1 ? 0 : ((dictationTotal - dictationRemaining) / dictationTotal) * 100

  if (variant === 'compact') {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Daily Usage
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                icon={<Speed />}
                label={`${speedRemaining} speed`}
                size="small"
                color={speedRemaining === 0 ? 'error' : 'default'}
              />
              <Chip 
                icon={<RecordVoiceOver />}
                label={`${dictationRemaining}min dictation`}
                size="small"
                color={dictationRemaining === 0 ? 'error' : 'default'}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Timeline sx={{ mr: 1 }} />
          Daily Usage ({currentPlan.name})
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Speed sx={{ mr: 1, fontSize: 16 }} />
                  Speed Exercises
                  <Tooltip title="Practice typing shorthand outlines at increasing speeds">
                    <IconButton size="small">
                      <InfoOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {speedTotal - speedRemaining}/{speedTotal}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={speedProgress} 
                sx={{ height: 8, borderRadius: 4 }}
                color={speedRemaining === 0 ? 'error' : 'primary'}
              />
              {speedRemaining === 0 && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  Daily limit reached. Upgrade for unlimited practice!
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <RecordVoiceOver sx={{ mr: 1, fontSize: 16 }} />
                  Dictation Minutes
                  <Tooltip title="Listen to audio dictation passages and practice note-taking">
                    <IconButton size="small">
                      <InfoOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dictationTotal - dictationRemaining}/{dictationTotal}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={dictationProgress} 
                sx={{ height: 8, borderRadius: 4 }}
                color={dictationRemaining === 0 ? 'error' : 'primary'}
              />
              {dictationRemaining === 0 && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  Daily limit reached. Upgrade for unlimited dictation!
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Weekly/Monthly Stats */}
        <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUp sx={{ mr: 1 }} />
            Your Progress This Week
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {usageStats.weeklySpeedExercises}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Speed Exercises
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {Math.round(usageStats.weeklyDictationMinutes)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Dictation Minutes
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {usageStats.weeklyModulesAccessed}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Modules Studied
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {usageStats.totalDaysActive}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Days Active
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Upgrade CTA for free users */}
        {currentPlan.id === 'free' && (speedRemaining <= 2 || dictationRemaining <= 5) && (
          <Box sx={{ 
            mt: 3, 
            p: 2, 
            bgcolor: 'primary.light', 
            borderRadius: 1,
            textAlign: 'center' 
          }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              🚀 Running low on daily practice time?
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Upgrade to Premium for unlimited exercises and accelerated learning
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <Chip 
                label="Unlimited Speed Practice" 
                size="small" 
                sx={{ bgcolor: 'white', color: 'primary.main' }}
              />
              <Chip 
                label="Full Dictation Library" 
                size="small" 
                sx={{ bgcolor: 'white', color: 'primary.main' }}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default UsageTracker