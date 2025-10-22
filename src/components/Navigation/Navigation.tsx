import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Badge,
  Chip,
  Button
} from '@mui/material'
import {
  School,
  Assignment,
  Speed,
  Timeline,
  MenuBook,
  Assessment,
  Home,
  CheckCircle,
  RadioButtonUnchecked,
  AccountCircle,
  Login,
  Logout,
  Gesture,
  Analytics,
  Psychology,
  EmojiEvents,
  LibraryBooks,
  AutoAwesome,
  TrendingUp,
  Draw,
  Edit,
  Create,
  Link as LinkIcon,
  Group,
  QuestionAnswer,
  CreditCard,
  Rocket
} from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useUserProgress } from '../../hooks/useUserProgress'
import { useLessons } from '../../hooks/useLessons'
import { useAuth } from '../../hooks/useAuthMock'

const drawerWidth = 280

const Navigation: React.FC = () => {
  const location = useLocation()
  const { currentUser, logout, userType } = useAuth()
  const { state: userProgressState, getOverallProgress, getCurrentSpeed, getCurrentAccuracy } = useUserProgress()
  const { lessons } = useLessons()
  
  const overallProgress = getOverallProgress()
  const currentSpeed = getCurrentSpeed()
  const currentAccuracy = getCurrentAccuracy()

  const navigationItems = [
    {
      text: 'Dashboard',
      icon: <Home />,
      path: '/',
      description: 'Overview and progress'
    },
    {
      text: 'Practice',
      icon: <School />,
      path: '/practice',
      description: 'Interactive exercises'
    },
    {
      text: 'Assessment',
      icon: <Assessment />,
      path: '/assessment',
      description: 'Theory checks & tests'
    },
    {
      text: 'Stroke Assessment',
      icon: <Edit />,
      path: '/stroke-assessment',
      description: 'Test stroke knowledge'
    },
    {
      text: 'Outline & Phrasing',
      icon: <Create />,
      path: '/outline-phrasing',
      description: 'Word construction & joining'
    },
    {
      text: 'Shortforms',
      icon: <Speed />,
      path: '/shortforms',
      description: 'Abbreviated outlines'
    },
    {
      text: 'Phrasing',
      icon: <Group />,
      path: '/phrasing',
      description: 'Speed through joining'
    },
    {
      text: 'Progress',
      icon: <Timeline />,
      path: '/progress',
      description: 'Track your development'
    }
  ]

  // Advanced components temporarily disabled for stability
  const advancedNavigationItems = [
    {
      text: 'AI System Manager',
      icon: <Psychology />,
      path: '/ai-system-manager',
      description: 'AI-powered error elimination & monitoring',
      badge: 'AI+'
    },
    {
      text: 'AI Stroke Recognition',
      icon: <Draw />,
      path: '/stroke-recognition',
      description: 'AI-powered stroke analysis',
      badge: 'AI'
    },
    {
      text: 'AI Vowel & Phrases',
      icon: <Psychology />,
      path: '/ai-vowel-phrase',
      description: 'Intelligent vowel/phrase learning',
      badge: 'AI'
    },
    {
      text: 'Q&A Assistant',
      icon: <QuestionAnswer />,
      path: '/qa-assistant',
      description: 'AI-powered shorthand help',
      badge: 'AI'
    },
    {
      text: 'Analytics',
      icon: <Analytics />,
      path: '/analytics',
      description: 'Advanced learning insights',
      badge: 'PRO'
    },
    {
      text: 'Speed Development',
      icon: <TrendingUp />,
      path: '/speed-development',
      description: 'Advanced speed training',
      badge: 'PRO'
    }
  ]

  const resourceNavigationItems = [
    {
      text: 'Deployment Ready',
      icon: <Rocket />,
      path: '/deployment',
      description: 'Production deployment configuration',
      badge: 'PROD'
    },
    {
      text: 'Resources',
      icon: <MenuBook />,
      path: '/resources',
      description: 'Reference materials'
    },
    {
      text: 'Symbol Reference',
      icon: <Gesture />,
      path: '/reference',
      description: 'Quick symbol lookup'
    },
    {
      text: 'AI Billing System',
      icon: <Assignment />,
      path: '/billing',
      description: 'AI-powered billing management',
      badge: 'AI'
    },
    {
      text: 'AI Payment System',
      icon: <CreditCard />,
      path: '/payments',
      description: 'Secure AI payment processing',
      badge: 'AI'
    }
  ]

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Top App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Shorthand Tutor - Pitman Shorthand Learning System
          </Typography>
          
          {/* Current Stats & Auth */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {currentUser && (
              <>
                <Chip 
                  label={`Speed: ${currentSpeed} WPM`}
                  icon={<Speed />}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                />
                <Chip 
                  label={`Accuracy: ${currentAccuracy}%`}
                  icon={<CheckCircle />}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                />
                <Chip 
                  label={`Progress: ${overallProgress.percentage}%`}
                  icon={<Timeline />}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                />
              </>
            )}
            
            {/* Authentication */}
            {currentUser ? (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {currentUser.isGuest && (
                  <Chip 
                    label="Guest" 
                    size="small" 
                    color="warning" 
                    sx={{ mr: 1 }}
                  />
                )}
                <Button 
                  component={Link} 
                  to="/account" 
                  startIcon={<AccountCircle />}
                  sx={{ color: 'white' }}
                >
                  {currentUser.isGuest ? 'Guest User' : (currentUser.displayName || currentUser.email)}
                </Button>
                {currentUser.isGuest && (
                  <Button 
                    component={Link}
                    to="/billing"
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Upgrade
                  </Button>
                )}
                <Button 
                  onClick={logout}
                  startIcon={<Logout />}
                  sx={{ color: 'white' }}
                >
                  {currentUser.isGuest ? 'Exit' : 'Logout'}
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  component={Link} 
                  to="/signin" 
                  startIcon={<Login />}
                  sx={{ color: 'white' }}
                >
                  Sign In
                </Button>
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            mt: 8, // Account for AppBar height
            background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
          },
        }}
      >
        {/* User Info Section */}
        <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h6" gutterBottom>
            {currentUser ? (currentUser.displayName || currentUser.email) : 'Guest User'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {currentUser ? `Module ${userProgressState.currentModule} • Week ${lessons.find(l => l.id === userProgressState.currentModule)?.weekNumber || 1}` : 'Sign in to track progress'}
          </Typography>
        </Box>

        <Divider />

        {/* Main Navigation */}
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActivePath(item.path)}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActivePath(item.path) ? 'white' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  secondary={item.description}
                  secondaryTypographyProps={{
                    sx: { 
                      color: isActivePath(item.path) ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                      fontSize: '0.75rem'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Advanced Features Section */}
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Advanced Features
          </Typography>
        </Box>

        <List>
          {advancedNavigationItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActivePath(item.path)}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'secondary.light',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActivePath(item.path) ? 'white' : 'inherit' }}>
                  <Badge 
                    badgeContent={item.badge} 
                    color={item.badge === 'AI' ? 'info' : item.badge === 'PRO' ? 'warning' : 'error'}
                    sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: '16px', minWidth: '16px' } }}
                  >
                    {item.icon}
                  </Badge>
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  secondary={item.description}
                  secondaryTypographyProps={{
                    sx: { 
                      color: isActivePath(item.path) ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                      fontSize: '0.75rem'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Resources Section */}
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Resources & Settings
          </Typography>
        </Box>

        <List>
          {resourceNavigationItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActivePath(item.path)}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActivePath(item.path) ? 'white' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  secondary={item.description}
                  secondaryTypographyProps={{
                    sx: { 
                      color: isActivePath(item.path) ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                      fontSize: '0.75rem'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Lesson Modules */}
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Learning Modules
          </Typography>
        </Box>

        <List dense>
          {lessons.slice(0, 8).map((lesson) => { // Show first 8 modules in sidebar
            const moduleProgress = userProgressState.userProgress.find(p => p.moduleId === lesson.id)
            const isCompleted = moduleProgress?.theoryCheckResults.some(result => result.passed) || false
            const isCurrent = lesson.id === userProgressState.currentModule

            return (
              <ListItem key={lesson.id} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/practice/${lesson.id}`}
                  selected={isCurrent}
                  sx={{
                    mx: 1,
                    mb: 0.5,
                    borderRadius: 1,
                    minHeight: 'auto',
                    py: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: 'secondary.light',
                      color: 'white'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    {isCompleted ? (
                      <CheckCircle sx={{ fontSize: 20, color: 'success.main' }} />
                    ) : (
                      <RadioButtonUnchecked sx={{ fontSize: 20 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText 
                    primary={`Module ${lesson.id}`}
                    secondary={lesson.title}
                    primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                    secondaryTypographyProps={{ 
                      fontSize: '0.75rem',
                      sx: { 
                        color: isCurrent ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }
                    }}
                  />
                  {lesson.semester === 2 && (
                    <Chip 
                      label="S2" 
                      size="small" 
                      sx={{ 
                        height: 16, 
                        fontSize: '0.65rem',
                        bgcolor: 'warning.light',
                        color: 'white'
                      }} 
                    />
                  )}
                </ListItemButton>
              </ListItem>
            )
          })}
          
          {lessons.length > 8 && (
            <ListItem>
              <ListItemButton
                component={Link}
                to="/progress"
                sx={{ mx: 1, borderRadius: 1 }}
              >
                <ListItemText 
                  primary={`+${lessons.length - 8} more modules`}
                  primaryTypographyProps={{ 
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    textAlign: 'center'
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>

        {/* Quick Stats */}
        <Box sx={{ mt: 'auto', p: 2, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" gutterBottom display="block">
            Quick Stats
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Completed:</Typography>
            <Typography variant="body2" fontWeight="500">
              {overallProgress.completed}/{overallProgress.total}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Current Speed:</Typography>
            <Typography variant="body2" fontWeight="500">
              {currentSpeed} WPM
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Accuracy:</Typography>
            <Typography variant="body2" fontWeight="500">
              {currentAccuracy}%
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default Navigation