import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { Toaster } from 'react-hot-toast'

// Import providers
import { UserProgressProvider } from './hooks/useUserProgress'
import { LessonProvider } from './hooks/useLessons'
import { SubscriptionProvider } from './hooks/useSubscription'
import { AuthProvider } from './hooks/useAuthMock'

// Import components
import Navigation from './components/Navigation/Navigation'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LoadingSpinner from './components/Loading/LoadingSpinner'

// Import ONLY stable simple components (no lazy loading to avoid module issues)
import SimpleDashboard from './SimpleDashboard.jsx'
import SimplePractice from './SimplePractice.jsx'
import SimpleAssessment from './SimpleAssessment.jsx'
import SimpleProgress from './SimpleProgress.jsx'
import SimpleSpeedDevelopment from './SimpleSpeedDevelopment.jsx'

// Keep essential auth components
const SignIn = lazy(() => import('./components/Auth/SignIn'))
const SignUp = lazy(() => import('./components/Auth/SignUp'))
const ProtectedRoute = lazy(() => import('./components/Auth/ProtectedRoute'))
const WelcomeScreen = lazy(() => import('./components/Auth/WelcomeScreen'))

// Import feedback component for testing phase
import LearnerFeedback from './components/Feedback/LearnerFeedback'
const FeedbackAnalytics = lazy(() => import('./components/Feedback/FeedbackAnalytics'))

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SubscriptionProvider>
          <UserProgressProvider>
            <LessonProvider>
            <Router 
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}
            >
              <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <Navigation />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      {/* Welcome/Auth Routes */}
                      <Route path="/" element={<WelcomeScreen />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/signup" element={<SignUp />} />
                      
                      {/* Core Learning Routes - STABLE SIMPLE COMPONENTS ONLY */}
                      <Route path="/dashboard" element={<ProtectedRoute><SimpleDashboard /></ProtectedRoute>} />
                      <Route path="/practice" element={<ProtectedRoute><SimplePractice /></ProtectedRoute>} />
                      <Route path="/assessment" element={<ProtectedRoute><SimpleAssessment /></ProtectedRoute>} />
                      <Route path="/progress" element={<ProtectedRoute><SimpleProgress /></ProtectedRoute>} />
                      <Route path="/speed-development" element={<ProtectedRoute><SimpleSpeedDevelopment /></ProtectedRoute>} />
                      <Route path="/speed-development/:moduleId" element={<ProtectedRoute><SimpleSpeedDevelopment /></ProtectedRoute>} />
                      
                      {/* Testing Phase Analytics */}
                      <Route path="/feedback-analytics" element={<FeedbackAnalytics />} />
                      
                      {/* Fallback Route */}
                      <Route path="*" element={
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                          <Typography variant="h4" gutterBottom>
                            Page Not Found
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            The page you're looking for doesn't exist.
                          </Typography>
                          <Button variant="contained" href="/dashboard">
                            Go to Dashboard
                          </Button>
                        </Box>
                      } />
                    </Routes>
                  </Suspense>
                </Box>
              </Box>
              
              {/* Floating Feedback Component for Testing Phase */}
              <LearnerFeedback />
              
              {/* Toast Notifications */}
              <Toaster position="top-right" />
            </Router>
            </LessonProvider>
          </UserProgressProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App