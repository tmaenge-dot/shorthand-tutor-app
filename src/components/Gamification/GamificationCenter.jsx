import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Badge,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stepper,
  Step,
  StepLabel
} from '@mui/material'
import {
  EmojiEvents,
  Star,
  LocalFireDepartment,
  Timer,
  Speed,
  TrendingUp,
  Celebration,
  WorkspacePremium,
  School,
  Psychology,
  MyLocation,
  Bolt,
  Diamond,
  Timeline,
  Leaderboard,
  Assignment,
  CardGiftcard,
  Notifications,
  Share,
  Close,
  CheckCircle,
  Lock,
  PlayArrow,
  Refresh
} from '@mui/icons-material'

const GamificationCenter = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [achievements, setAchievements] = useState([])
  const [userStats, setUserStats] = useState({})
  const [leaderboard, setLeaderboard] = useState([])
  const [dailyChallenges, setDailyChallenges] = useState([])
  const [streaks, setStreaks] = useState({})
  const [celebrationDialogOpen, setCelebrationDialogOpen] = useState(false)
  const [newAchievement, setNewAchievement] = useState(null)
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false)

  useEffect(() => {
    generateAchievements()
    generateUserStats()
    generateLeaderboard()
    generateDailyChallenges()
    generateStreaks()
  }, [])

  const generateAchievements = () => {
    const achievementsList = [
      {
        id: 'first_steps',
        title: 'First Steps',
        description: 'Complete your first practice session',
        category: 'beginner',
        rarity: 'common',
        icon: <School />,
        unlockedAt: '2025-10-15',
        progress: 100,
        maxProgress: 100,
        points: 10,
        isUnlocked: true,
        requirements: 'Complete 1 practice session'
      },
      {
        id: 'consistent_learner',
        title: 'Consistent Learner',
        description: 'Practice for 7 consecutive days',
        category: 'dedication',
        rarity: 'uncommon',
        icon: <LocalFireDepartment />,
        unlockedAt: '2025-10-20',
        progress: 7,
        maxProgress: 7,
        points: 50,
        isUnlocked: true,
        requirements: '7-day practice streak'
      },
      {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Achieve 40 WPM in shorthand',
        category: 'speed',
        rarity: 'rare',
        icon: <Speed />,
        unlockedAt: null,
        progress: 28,
        maxProgress: 40,
        points: 100,
        isUnlocked: false,
        requirements: 'Reach 40 WPM writing speed'
      },
      {
        id: 'accuracy_master',
        title: 'Accuracy Master',
        description: 'Maintain 95% accuracy for 10 sessions',
        category: 'precision',
        rarity: 'rare',
        icon: <MyLocation />,
        unlockedAt: null,
        progress: 3,
        maxProgress: 10,
        points: 150,
        isUnlocked: false,
        requirements: '95% accuracy in 10 consecutive sessions'
      },
      {
        id: 'symbol_collector',
        title: 'Symbol Collector',
        description: 'Master all consonant symbols',
        category: 'knowledge',
        rarity: 'epic',
        icon: <Psychology />,
        unlockedAt: null,
        progress: 15,
        maxProgress: 24,
        points: 200,
        isUnlocked: false,
        requirements: 'Achieve 85% accuracy on all consonant symbols'
      },
      {
        id: 'legendary_scribe',
        title: 'Legendary Scribe',
        description: 'Complete the entire course with excellence',
        category: 'mastery',
        rarity: 'legendary',
        icon: <WorkspacePremium />,
        unlockedAt: null,
        progress: 2,
        maxProgress: 5,
        points: 500,
        isUnlocked: false,
        requirements: 'Complete all modules with 90%+ average'
      }
    ]

    setAchievements(achievementsList)
  }

  const generateUserStats = () => {
    const stats = {
      totalPoints: 1250,
      level: 8,
      experienceToNext: 150,
      maxExperience: 400,
      rank: 'Silver Scribe',
      totalPracticeTime: '24h 30m',
      averageAccuracy: 82,
      bestSpeed: 28,
      perfectSessions: 12,
      currentStreak: 7,
      longestStreak: 12,
      achievementsUnlocked: 8,
      totalAchievements: 25,
      challengesCompleted: 15,
      symbolsMastered: 15,
      totalSymbols: 43
    }

    setUserStats(stats)
  }

  const generateLeaderboard = () => {
    const board = [
      { rank: 1, name: 'Sarah M.', points: 2850, level: 15, avatar: '👩‍💼', streak: 25, badge: 'Gold Master' },
      { rank: 2, name: 'David L.', points: 2340, level: 12, avatar: '👨‍🎓', streak: 18, badge: 'Speed Champion' },
      { rank: 3, name: 'Emily R.', points: 2100, level: 11, avatar: '👩‍🔬', streak: 22, badge: 'Accuracy Expert' },
      { rank: 4, name: 'You', points: 1250, level: 8, avatar: '🧑‍💻', streak: 7, badge: 'Silver Scribe', isUser: true },
      { rank: 5, name: 'James K.', points: 1180, level: 7, avatar: '👨‍💼', streak: 5, badge: 'Rising Star' },
      { rank: 6, name: 'Lisa P.', points: 1050, level: 7, avatar: '👩‍🏫', streak: 9, badge: 'Dedicated Learner' },
      { rank: 7, name: 'Mike T.', points: 890, level: 6, avatar: '👨‍💻', streak: 3, badge: 'Quick Learner' },
      { rank: 8, name: 'Anna B.', points: 750, level: 5, avatar: '👩‍🎨', streak: 12, badge: 'Consistent Writer' }
    ]

    setLeaderboard(board)
  }

  const generateDailyChallenges = () => {
    const challenges = [
      {
        id: 'accuracy_boost',
        title: 'Accuracy Boost',
        description: 'Complete 3 practice sessions with 85%+ accuracy',
        difficulty: 'medium',
        timeRemaining: '18h 30m',
        progress: 1,
        maxProgress: 3,
        reward: '+100 XP, Accuracy Badge',
        icon: <MyLocation />,
        category: 'accuracy',
        isCompleted: false
      },
      {
        id: 'speed_burst',
        title: 'Speed Burst',
        description: 'Write 50 words in under 2 minutes',
        difficulty: 'hard',
        timeRemaining: '18h 30m',
        progress: 0,
        maxProgress: 1,
        reward: '+150 XP, Speed Boost',
        icon: <Bolt />,
        category: 'speed',
        isCompleted: false
      },
      {
        id: 'symbol_master',
        title: 'Symbol Master',
        description: 'Practice curved strokes for 15 minutes',
        difficulty: 'easy',
        timeRemaining: '18h 30m',
        progress: 15,
        maxProgress: 15,
        reward: '+50 XP, Progress Badge',
        icon: <Psychology />,
        category: 'practice',
        isCompleted: true
      }
    ]

    setDailyChallenges(challenges)
  }

  const generateStreaks = () => {
    const streakData = {
      current: 7,
      longest: 12,
      thisWeek: [true, true, true, true, true, true, true],
      thisMonth: 22,
      streakRewards: [
        { days: 3, reward: '10 XP Bonus', unlocked: true },
        { days: 7, reward: 'Fire Badge', unlocked: true },
        { days: 14, reward: '50 XP Bonus', unlocked: false },
        { days: 30, reward: 'Consistency Crown', unlocked: false },
        { days: 100, reward: 'Legend Status', unlocked: false }
      ]
    }

    setStreaks(streakData)
  }

  const handleChallengeStart = (challengeId) => {
    // Navigate to appropriate practice section
    // Challenge implementation would go here
  }

  const handleAchievementClaim = (achievementId) => {
    const achievement = achievements.find(a => a.id === achievementId)
    if (achievement && achievement.isUnlocked) {
      setNewAchievement(achievement)
      setCelebrationDialogOpen(true)
    }
  }

  const getRarityColor = (rarity) => {
    const colors = {
      common: '#9e9e9e',
      uncommon: '#4caf50',
      rare: '#2196f3',
      epic: '#9c27b0',
      legendary: '#ff9800'
    }
    return colors[rarity] || '#9e9e9e'
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'success',
      medium: 'warning',
      hard: 'error'
    }
    return colors[difficulty] || 'default'
  }

  const getLevelProgress = () => {
    return (userStats.experienceToNext / userStats.maxExperience) * 100
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EmojiEvents color="primary" />
        Gamification Center
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Track achievements, compete with others, and celebrate your learning journey
      </Typography>

      {/* User Level Card */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <Typography variant="h4">{userStats.level}</Typography>
              </Avatar>
              <Typography variant="h6">{userStats.rank}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {userStats.totalPoints} XP
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              Level {userStats.level} Progress
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={getLevelProgress()} 
              sx={{ 
                height: 12, 
                borderRadius: 6, 
                mb: 1,
                bgcolor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': { bgcolor: 'white' }
              }}
            />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {userStats.experienceToNext} XP to Level {userStats.level + 1}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <LocalFireDepartment sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="h6">{userStats.currentStreak}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Day Streak</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <MyLocation sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="h6">{userStats.averageAccuracy}%</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Accuracy</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab icon={<EmojiEvents />} label="Achievements" />
          <Tab icon={<Leaderboard />} label="Leaderboard" />
          <Tab icon={<Assignment />} label="Daily Challenges" />
          <Tab icon={<LocalFireDepartment />} label="Streaks" />
        </Tabs>
      </Paper>

      {/* Achievements Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {achievements.map((achievement) => (
            <Grid item xs={12} md={6} lg={4} key={achievement.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  opacity: achievement.isUnlocked ? 1 : 0.7,
                  transform: achievement.isUnlocked ? 'none' : 'grayscale(100%)'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: getRarityColor(achievement.rarity) }}>
                      {achievement.isUnlocked ? achievement.icon : <Lock />}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {achievement.description}
                      </Typography>
                      <Chip 
                        label={achievement.rarity} 
                        size="small" 
                        sx={{ 
                          bgcolor: getRarityColor(achievement.rarity), 
                          color: 'white',
                          textTransform: 'uppercase',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2">
                        {achievement.progress}/{achievement.maxProgress}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.points} XP
                    </Typography>
                    {achievement.isUnlocked && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        onClick={() => handleAchievementClaim(achievement.id)}
                      >
                        Claim
                      </Button>
                    )}
                  </Box>
                  
                  {achievement.unlockedAt && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Weekly Leaderboard
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Points</TableCell>
                    <TableCell>Streak</TableCell>
                    <TableCell>Badge</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard.map((user) => (
                    <TableRow 
                      key={user.rank}
                      sx={{ 
                        bgcolor: user.isUser ? 'primary.light' : 'inherit',
                        '&:hover': { bgcolor: user.isUser ? 'primary.light' : 'action.hover' }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {user.rank <= 3 && (
                            <EmojiEvents 
                              sx={{ 
                                color: user.rank === 1 ? '#FFD700' : user.rank === 2 ? '#C0C0C0' : '#CD7F32' 
                              }}
                            />
                          )}
                          #{user.rank}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography sx={{ fontSize: '1.5rem' }}>{user.avatar}</Typography>
                          <Typography sx={{ fontWeight: user.isUser ? 600 : 400 }}>
                            {user.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{user.level}</TableCell>
                      <TableCell>{user.points.toLocaleString()}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocalFireDepartment sx={{ color: 'orange', fontSize: 16 }} />
                          {user.streak}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={user.badge} size="small" variant="outlined" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Daily Challenges Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          {dailyChallenges.map((challenge) => (
            <Grid item xs={12} md={6} key={challenge.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {challenge.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6">
                          {challenge.title}
                        </Typography>
                        <Chip 
                          label={challenge.difficulty} 
                          size="small" 
                          color={getDifficultyColor(challenge.difficulty)}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {challenge.description}
                      </Typography>
                      <Typography variant="caption" color="warning.main">
                        ⏰ {challenge.timeRemaining} remaining
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2">
                        {challenge.progress}/{challenge.maxProgress}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(challenge.progress / challenge.maxProgress) * 100}
                      color={challenge.isCompleted ? 'success' : 'primary'}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText', mb: 2 }}>
                    <Typography variant="body2">
                      🎁 <strong>Reward:</strong> {challenge.reward}
                    </Typography>
                  </Paper>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {challenge.isCompleted ? (
                      <Button variant="contained" color="success" startIcon={<CheckCircle />}>
                        Completed
                      </Button>
                    ) : (
                      <Button 
                        variant="contained" 
                        startIcon={<PlayArrow />}
                        onClick={() => handleChallengeStart(challenge.id)}
                      >
                        Start Challenge
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Streaks Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalFireDepartment color="primary" />
                  Practice Streak
                </Typography>
                
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
                    {streaks.current}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Days Current Streak
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Personal best: {streaks.longest} days
                  </Typography>
                </Box>
                
                <Typography variant="body1" gutterBottom>
                  This Week
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <Box 
                      key={day}
                      sx={{ 
                        textAlign: 'center',
                        p: 1,
                        borderRadius: 1,
                        bgcolor: streaks.thisWeek[index] ? 'success.light' : 'action.hover',
                        color: streaks.thisWeek[index] ? 'success.contrastText' : 'text.secondary',
                        minWidth: 60
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {day}
                      </Typography>
                      {streaks.thisWeek[index] ? <CheckCircle sx={{ fontSize: 16 }} /> : <div style={{ height: 16 }} />}
                    </Box>
                  ))}
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  You've practiced {streaks.thisMonth} days this month! Keep up the great work! 🔥
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Streak Rewards
                </Typography>
                
                <List>
                  {streaks.streakRewards.map((reward, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {reward.unlocked ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Lock color="disabled" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={`${reward.days} Days`}
                        secondary={reward.reward}
                        sx={{ 
                          opacity: reward.unlocked ? 1 : 0.6,
                          textDecoration: reward.unlocked ? 'none' : 'none'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Achievement Celebration Dialog */}
      <Dialog open={celebrationDialogOpen} onClose={() => setCelebrationDialogOpen(false)} maxWidth="sm" fullWidth>
        {newAchievement && (
          <>
            <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
              <Celebration sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Achievement Unlocked!
              </Typography>
            </DialogTitle>
            
            <DialogContent sx={{ textAlign: 'center' }}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mx: 'auto', 
                  mb: 2, 
                  bgcolor: getRarityColor(newAchievement.rarity) 
                }}
              >
                {newAchievement.icon}
              </Avatar>
              
              <Typography variant="h5" gutterBottom>
                {newAchievement.title}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {newAchievement.description}
              </Typography>
              
              <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                <Typography variant="h6">
                  +{newAchievement.points} XP Earned!
                </Typography>
              </Paper>
            </DialogContent>
            
            <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => setCelebrationDialogOpen(false)}
                startIcon={<Share />}
              >
                Share Achievement
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => setCelebrationDialogOpen(false)}
              >
                Continue Learning
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default GamificationCenter