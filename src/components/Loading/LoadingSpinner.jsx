import React, { Suspense } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

// Loading component for lazy loaded routes
const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh',
        gap: 2
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}

// Higher order component for lazy loading with custom loading message
export const withLazyLoading = (LazyComponent, loadingMessage) => {
  return (props) => (
    <Suspense fallback={<LoadingSpinner message={loadingMessage} />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export default LoadingSpinner