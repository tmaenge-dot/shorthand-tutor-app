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

// Lazy load major components for better performance
const SimpleDashboard = lazy(() => import('./SimpleDashboard.jsx'))
const SimplePractice = lazy(() => import('./SimplePractice.jsx'))
const SimpleAssessment = lazy(() => import('./SimpleAssessment.jsx'))
const SimpleProgress = lazy(() => import('./SimpleProgress.jsx'))
const SimpleSpeedDevelopment = lazy(() => import('./SimpleSpeedDevelopment.jsx'))
const LessonModule = lazy(() => import('./pages/LessonModule/LessonModule'))
const Resources = lazy(() => import('./pages/Resources/Resources'))
const SignIn = lazy(() => import('./components/Auth/SignIn'))
const SignUp = lazy(() => import('./components/Auth/SignUp'))
const ProtectedRoute = lazy(() => import('./components/Auth/ProtectedRoute'))
const BillingPage = lazy(() => import('./components/Billing/InteractiveBillingPage'))
const WelcomeScreen = lazy(() => import('./components/Auth/WelcomeScreen'))
const Account = lazy(() => import('./pages/Account/Account'))
const ShorthandReference = lazy(() => import('./pages/ShorthandReference/ShorthandReference'))
const AnalyticsLite = lazy(() => import('./components/Analytics/AnalyticsLite'))

// Lazy load new advanced components
const AdvancedProgressTracker = lazy(() => import('./components/Progress/AdvancedProgressTracker'))
const InteractiveSymbolLibrary = lazy(() => import('./components/Library/InteractiveSymbolLibrary'))
const AdaptiveLearningEngine = lazy(() => import('./components/Learning/AdaptiveLearningEngine'))
const GamificationCenter = lazy(() => import('./components/Gamification/GamificationCenter'))
const AdvancedAssessmentSystem = lazy(() => import('./components/Assessment/AdvancedAssessmentSystem'))

// Import feedback component (not lazy loaded as it's a floating component)
import LearnerFeedback from './components/Feedback/LearnerFeedback'

// Lazy load feedback analytics for testing phase
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
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8, // Account for top navigation
                    backgroundColor: 'background.default',
                  }}
                >
                  <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
                    <Routes>
                      <Route path="/welcome" element={<WelcomeScreen />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/signup" element={<SignUp />} />
                      
                      <Route path="/" element={<SimpleDashboard />} />
                      <Route path="/dashboard" element={<SimpleDashboard />} />
                      
                      <Route path="/practice" element={<ProtectedRoute><SimplePractice /></ProtectedRoute>} />
                      <Route path="/practice/:lessonId" element={<ProtectedRoute><SimplePractice /></ProtectedRoute>} />
                      <Route path="/lesson/:moduleId" element={<ProtectedRoute><LessonModule /></ProtectedRoute>} />
                      <Route path="/assessment" element={<ProtectedRoute><SimpleAssessment /></ProtectedRoute>} />
                      <Route path="/assessment/:checkId" element={<ProtectedRoute><SimpleAssessment /></ProtectedRoute>} />
                      <Route path="/progress" element={<ProtectedRoute><SimpleProgress /></ProtectedRoute>} />
                      <Route path="/analytics" element={<ProtectedRoute><AnalyticsLite /></ProtectedRoute>} />
                      <Route path="/speed-development" element={<ProtectedRoute><SimpleSpeedDevelopment /></ProtectedRoute>} />
                      <Route path="/speed-development/:moduleId" element={<ProtectedRoute><SimpleSpeedDevelopment /></ProtectedRoute>} />
                      
                      {/* Advanced Features */}
                      <Route path="/advanced-progress" element={<ProtectedRoute><AdvancedProgressTracker /></ProtectedRoute>} />
                      <Route path="/symbol-library" element={<ProtectedRoute><InteractiveSymbolLibrary /></ProtectedRoute>} />
                      <Route path="/adaptive-learning" element={<ProtectedRoute><AdaptiveLearningEngine /></ProtectedRoute>} />
                      <Route path="/gamification" element={<ProtectedRoute><GamificationCenter /></ProtectedRoute>} />
                      <Route path="/advanced-assessment" element={<ProtectedRoute><AdvancedAssessmentSystem /></ProtectedRoute>} />
                      
                      <Route path="/resources" element={<Resources />} />
                    <Route path="/reference" element={<ProtectedRoute><ShorthandReference /></ProtectedRoute>} />
                    <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
                    <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                    
                    {/* Testing Phase Routes */}
                    <Route path="/feedback-analytics" element={<FeedbackAnalytics />} />
                    
                    <Route path="/test" element={
                      <Box sx={{ p: 3 }}>
                        <Typography variant="h4" gutterBottom>
                          🎉 Shorthand App is Working!
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          All features restored successfully!
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                          Test Button
                        </Button>
                        <Button variant="outlined" color="secondary">
                          Secondary Button
                        </Button>
                      </Box>
                    } />
                  </Routes>
                  </Suspense>
                </Box>
              </Box>
              
              {/* Floating Feedback Component for Learner Testing */}
              <LearnerFeedback />
              
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