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

// Import stroke recognition components
import AIStrokeRecognitionSystem from './components/AIStrokeRecognitionSystem.jsx'
import StrokeRecognitionAssessment from './components/StrokeRecognitionAssessment.jsx'

// Import AI vowel and phrase system
import AIVowelPhraseSystem from './components/AIVowelPhraseSystem.jsx'

// Import outline and phrasing components
import OutlinePhrasingSystem from './components/OutlinePhrasingSystem.jsx'
import ShortformLearningSystem from './components/ShortformLearningSystem.jsx'
import PhrasingLearningSystem from './components/PhrasingLearningSystem.jsx'

// Import Q&A Assistant
import QAAssistant from './components/QAAssistant/QAAssistant.jsx'

// Import AI-powered billing and payment systems
import AIBillingSystem from './components/AIBillingSystem.jsx'
import AIPaymentSystem from './components/AIPaymentSystem.jsx'

// Import AI System Manager
import AISystemManager from './components/AISystemManager.jsx'

// Import Deployment Readiness
import DeploymentReadiness from './components/DeploymentReadiness.jsx'

// Import Analytics component
import AnalyticsLite from './components/Analytics/AnalyticsLite.jsx'

// Import Resources component
import Resources from './pages/Resources/Resources.tsx'

// Import Symbol Reference component
import SymbolReference from './pages/Reference/SymbolReference.tsx'

// Import LessonModule component
import LessonModule from './pages/LessonModule/LessonModule.tsx'

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
                <Box component="main" sx={{ 
                  flexGrow: 1, 
                  p: { xs: 1, sm: 2, md: 3 },
                  ml: { md: '280px' },
                  width: { md: `calc(100% - 280px)` },
                  mt: 8 // Account for AppBar height
                }}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      {/* Welcome/Auth Routes */}
                      <Route path="/" element={<WelcomeScreen />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/signup" element={<SignUp />} />
                      
                      {/* Core Learning Routes - STABLE SIMPLE COMPONENTS ONLY */}
                      <Route path="/dashboard" element={<ProtectedRoute><SimpleDashboard /></ProtectedRoute>} />
                      <Route path="/lesson/:moduleId" element={<ProtectedRoute><LessonModule /></ProtectedRoute>} />
                      <Route path="/practice" element={<ProtectedRoute><SimplePractice /></ProtectedRoute>} />
                      <Route path="/practice/:lessonId" element={<ProtectedRoute><SimplePractice /></ProtectedRoute>} />
                      <Route path="/assessment" element={<ProtectedRoute><SimpleAssessment /></ProtectedRoute>} />
                      <Route path="/assessment/:moduleId" element={<ProtectedRoute><SimpleAssessment /></ProtectedRoute>} />
                      <Route path="/progress" element={<ProtectedRoute><SimpleProgress /></ProtectedRoute>} />
                      <Route path="/speed-development" element={<ProtectedRoute><SimpleSpeedDevelopment /></ProtectedRoute>} />
                      <Route path="/speed-development/:moduleId" element={<ProtectedRoute><SimpleSpeedDevelopment /></ProtectedRoute>} />
                      
                      {/* Stroke Recognition System */}
                      <Route path="/stroke-recognition" element={<ProtectedRoute><AIStrokeRecognitionSystem /></ProtectedRoute>} />
                      <Route path="/stroke-assessment" element={<ProtectedRoute><StrokeRecognitionAssessment /></ProtectedRoute>} />
                      
                      {/* AI Vowel and Phrase System */}
                      <Route path="/ai-vowel-phrase" element={<ProtectedRoute><AIVowelPhraseSystem /></ProtectedRoute>} />
                      
                      {/* Outline and Phrasing System */}
                      <Route path="/outline-phrasing" element={<ProtectedRoute><OutlinePhrasingSystem /></ProtectedRoute>} />
                      <Route path="/shortforms" element={<ProtectedRoute><ShortformLearningSystem /></ProtectedRoute>} />
                      <Route path="/phrasing" element={<ProtectedRoute><PhrasingLearningSystem /></ProtectedRoute>} />
                      
                      {/* Q&A Assistant */}
                      <Route path="/qa-assistant" element={<ProtectedRoute><QAAssistant /></ProtectedRoute>} />
                      
                      {/* AI-Powered Billing and Payments */}
                      <Route path="/billing" element={<ProtectedRoute><AIBillingSystem /></ProtectedRoute>} />
                      <Route path="/payments" element={<ProtectedRoute><AIPaymentSystem /></ProtectedRoute>} />
                      
                      {/* AI System Manager */}
                      <Route path="/ai-system-manager" element={<ProtectedRoute><AISystemManager /></ProtectedRoute>} />
                      
                      {/* Deployment Readiness */}
                      <Route path="/deployment" element={<ProtectedRoute><DeploymentReadiness /></ProtectedRoute>} />
                      
                      {/* Analytics */}
                      <Route path="/analytics" element={<ProtectedRoute><AnalyticsLite /></ProtectedRoute>} />
                      
                      {/* Resources */}
                      <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
                      
                      {/* Symbol Reference */}
                      <Route path="/reference" element={<ProtectedRoute><SymbolReference /></ProtectedRoute>} />
                      
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