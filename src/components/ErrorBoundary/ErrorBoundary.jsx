import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Alert
} from '@mui/material'
import { Error, Refresh } from '@mui/icons-material'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 3
        }}>
          <Card sx={{ maxWidth: 600, width: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Error sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
              
              <Typography variant="h4" gutterBottom>
                Oops! Something went wrong
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We encountered an unexpected error. This has been logged and we'll work to fix it.
              </Typography>

              {import.meta.env.DEV && this.state.error && (
                <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Error Details (Development):
                  </Typography>
                  <Typography variant="body2" component="pre" sx={{ 
                    fontSize: '0.75rem',
                    overflow: 'auto',
                    maxHeight: 200
                  }}>
                    {this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </Typography>
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<Refresh />}
                  onClick={this.handleReload}
                >
                  Reload Page
                </Button>
                <Button
                  variant="outlined"
                  onClick={this.handleReset}
                >
                  Try Again
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary