import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom'
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

// GitHub Pages SPA redirect support
function GithubPagesRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    // If the path starts with '/?/', extract the route and redirect
    if (location.pathname === '/' && location.search.startsWith('?/')) {
      const newPath = location.search
        .replace(/^\?\//, '/') // remove leading ?/
        .replace(/~and~/g, '&'); // restore &
      navigate(newPath, { replace: true });
    }
  }, [location, navigate]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SubscriptionProvider>
          <UserProgressProvider>
            <LessonProvider>
            <Router 
              basename="/shorthand-tutor-app"
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}
            >
              <GithubPagesRedirectHandler />
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
                      <Route path="/" element={<WelcomeScreen />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/feedback" element={<LearnerFeedback />} />
                      <Route path="/analytics" element={<AnalyticsLite />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/reference" element={<SymbolReference />} />
                      <Route path="/lesson-module" element={<ProtectedRoute requireAuth={true}><LessonModule /></ProtectedRoute>} />
                      <Route path="/lesson/:moduleId" element={<ProtectedRoute requireAuth={true}><LessonModule /></ProtectedRoute>} />
                      <Route path="/dashboard" element={<SimpleDashboard />} />
                      <Route path="/practice" element={<SimplePractice />} />
                      <Route path="/practice/:lessonId" element={<SimplePractice />} />
                      <Route path="/assessment" element={<SimpleAssessment />} />
                      <Route path="/progress" element={<SimpleProgress />} />
                      <Route path="/speed-development" element={<SimpleSpeedDevelopment />} />
                      <Route path="/stroke-recognition" element={<AIStrokeRecognitionSystem />} />
                      <Route path="/stroke-assessment" element={<StrokeRecognitionAssessment />} />
                      <Route path="/ai-vowel-phrase" element={<AIVowelPhraseSystem />} />
                      <Route path="/outline-phrasing" element={<OutlinePhrasingSystem />} />
                      <Route path="/shortforms" element={<Suspense fallback={<LoadingSpinner />}><ProtectedRoute requireAuth={true}><ShortformLearningSystem /></ProtectedRoute></Suspense>} />
                      <Route path="/phrasing" element={<Suspense fallback={<LoadingSpinner />}><ProtectedRoute requireAuth={true}><PhrasingLearningSystem /></ProtectedRoute></Suspense>} />
                      <Route path="/qa-assistant" element={<QAAssistant />} />
                      <Route path="/billing" element={<AIBillingSystem />} />
                      <Route path="/payments" element={<AIPaymentSystem />} />
                      <Route path="/ai-system-manager" element={<AISystemManager />} />
                      <Route path="/deployment-readiness" element={<DeploymentReadiness />} />
                      {/* Add more routes as needed */}
                      <Route path="*" element={
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                          <Typography variant="h4" gutterBottom>
                            Sign In or Sign Up
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            The page you tried to visit does not exist or requires you to be signed in.<br /><br />
                            <strong>If you are a learner:</strong><br />
                            Please <Link to="/signin" style={{ color: '#1976d2' }}>sign in</Link> or <Link to="/signup" style={{ color: '#43a047' }}>create an account</Link> to continue.<br />
                            If you need help, contact your instructor or administrator.<br /><br />
                            <span style={{ color: '#ffc107' }}>This is not an error—just a helpful message to guide you!</span>
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Button variant="contained" component={Link} to="/signin" sx={{ mr: 2, backgroundColor: '#1976d2' }}>
                              Sign In
                            </Button>
                            <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: '#43a047' }}>
                              Sign Up
                            </Button>
                          </Box>
                        </Box>
                      } />
                    </Routes>
                  </Suspense>
                </Box>
              </Box>
              {/* ...existing code... */}
            </Router>
            </LessonProvider>
          </UserProgressProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App