import React from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  Typography,
  LinearProgress,
  Collapse
} from '@mui/material'
import {
  Person,
  Star,
  Lock,
  Upgrade
} from '@mui/icons-material'
import { useAuth } from '../../hooks/useAuthMock'
import { useNavigate } from 'react-router-dom'

const GuestUserBanner = ({ usage = {} }) => {
  const { currentUser, userType } = useAuth()
  const navigate = useNavigate()
  const [expanded, setExpanded] = React.useState(false)

  if (!currentUser?.isGuest) return null

  const speedExercisesUsed = usage.speedExercises || 0
  const dictationMinutesUsed = usage.dictationMinutes || 0
  const maxSpeedExercises = 5
  const maxDictationMinutes = 10

  const speedPercentage = (speedExercisesUsed / maxSpeedExercises) * 100
  const dictationPercentage = (dictationMinutesUsed / maxDictationMinutes) * 100

  return (
    <Box sx={{ mb: 3 }}>
      <Alert 
        severity="info" 
        icon={<Person />}
        sx={{ 
          '& .MuiAlert-message': { width: '100%' },
          cursor: 'pointer'
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Welcome, Guest User! 
              <Chip label="Limited Access" size="small" color="warning" sx={{ ml: 1 }} />
            </Typography>
            <Typography variant="body2">
              You're exploring with limited features. Upgrade to unlock the full shorthand mastery experience.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Upgrade />}
            onClick={(e) => {
              e.stopPropagation()
              navigate('/billing')
            }}
            size="small"
          >
            Upgrade Now
          </Button>
        </Box>
      </Alert>

      <Collapse in={expanded}>
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          border: '1px solid', 
          borderColor: 'info.main', 
          borderRadius: 1,
          bgcolor: 'info.50'
        }}>
          <Typography variant="h6" gutterBottom>
            Daily Usage Limits
          </Typography>

          {/* Speed Exercises Usage */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">
                Speed Exercises Today
              </Typography>
              <Typography variant="body2" color={speedPercentage >= 100 ? 'error.main' : 'text.secondary'}>
                {speedExercisesUsed} / {maxSpeedExercises}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(speedPercentage, 100)} 
              color={speedPercentage >= 100 ? 'error' : 'info'}
              sx={{ height: 6, borderRadius: 3 }}
            />
            {speedPercentage >= 100 && (
              <Typography variant="caption" color="error.main">
                Daily limit reached. Upgrade for unlimited access.
              </Typography>
            )}
          </Box>

          {/* Dictation Usage */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">
                Dictation Minutes Today
              </Typography>
              <Typography variant="body2" color={dictationPercentage >= 100 ? 'error.main' : 'text.secondary'}>
                {dictationMinutesUsed} / {maxDictationMinutes}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(dictationPercentage, 100)} 
              color={dictationPercentage >= 100 ? 'error' : 'info'}
              sx={{ height: 6, borderRadius: 3 }}
            />
            {dictationPercentage >= 100 && (
              <Typography variant="caption" color="error.main">
                Daily limit reached. Upgrade for unlimited access.
              </Typography>
            )}
          </Box>

          {/* Locked Features */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              Unlock with Premium:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                icon={<Lock />} 
                label="Modules D-V" 
                size="small" 
                variant="outlined" 
                color="warning"
              />
              <Chip 
                icon={<Lock />} 
                label="Unlimited Practice" 
                size="small" 
                variant="outlined" 
                color="warning"
              />
              <Chip 
                icon={<Lock />} 
                label="Certificates" 
                size="small" 
                variant="outlined" 
                color="warning"
              />
              <Chip 
                icon={<Lock />} 
                label="Offline Mode" 
                size="small" 
                variant="outlined" 
                color="warning"
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Star />}
              onClick={() => navigate('/billing')}
              size="small"
            >
              View Plans
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/signup')}
              size="small"
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default GuestUserBanner