import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  Tab,
  Tabs,
  Paper,
  Alert
} from '@mui/material'
import {
  ExpandMore,
  MenuBook,
  Download,
  Visibility,
  School,
  Assignment,
  Speed,
  VideoLibrary,
  AudioFile,
  PictureAsPdf,
  Link as LinkIcon
} from '@mui/icons-material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`resources-tabpanel-${index}`}
      aria-labelledby={`resources-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  // Resource categories
  const shorthandAlphabet = [
    { letter: 'B', stroke: 'Light downward stroke', examples: ['bay', 'boy', 'buy'] },
    { letter: 'P', stroke: 'Heavy downward stroke', examples: ['pay', 'pot', 'put'] },
    { letter: 'T', stroke: 'Light horizontal stroke', examples: ['tea', 'tie', 'toy'] },
    { letter: 'D', stroke: 'Heavy horizontal stroke', examples: ['day', 'die', 'do'] },
    { letter: 'K', stroke: 'Light upward stroke', examples: ['key', 'cow', 'cut'] },
    { letter: 'G', stroke: 'Heavy upward stroke', examples: ['gay', 'go', 'guy'] }
  ]

  const referenceGuides = [
    {
      title: 'Shorthand Alphabet Reference',
      description: 'Complete guide to all shorthand strokes and their meanings',
      type: 'PDF',
      icon: <PictureAsPdf color="error" />
    },
    {
      title: 'Common Word Outlines',
      description: 'Frequently used words and their shorthand representations',
      type: 'PDF',
      icon: <PictureAsPdf color="error" />
    },
    {
      title: 'Speed Building Exercises',
      description: 'Progressive exercises for building writing speed',
      type: 'PDF',
      icon: <PictureAsPdf color="error" />
    },
    {
      title: 'Theory Check Practice',
      description: 'Sample questions and practice assessments',
      type: 'PDF',
      icon: <PictureAsPdf color="error" />
    }
  ]

  const audioResources = [
    {
      title: 'Dictation Exercise - 15 WPM',
      description: 'Business letter dictation at 15 words per minute',
      duration: '3:45',
      icon: <AudioFile color="primary" />
    },
    {
      title: 'Dictation Exercise - 20 WPM',
      description: 'Technical passage dictation at 20 words per minute',
      duration: '4:20',
      icon: <AudioFile color="primary" />
    },
    {
      title: 'Dictation Exercise - 25 WPM',
      description: 'Professional correspondence at 25 words per minute',
      duration: '5:15',
      icon: <AudioFile color="primary" />
    },
    {
      title: 'Dictation Exercise - 30 WPM',
      description: 'Examination standard dictation at 30 words per minute',
      duration: '6:00',
      icon: <AudioFile color="primary" />
    }
  ]

  const videoTutorials = [
    {
      title: 'Basic Stroke Formation',
      description: 'Learn the fundamental strokes of Pitman shorthand',
      duration: '12:30',
      level: 'Beginner'
    },
    {
      title: 'Joining Strokes Smoothly',
      description: 'Techniques for connecting shorthand strokes',
      duration: '15:45',
      level: 'Intermediate'
    },
    {
      title: 'Speed Writing Techniques',
      description: 'Advanced methods for increasing writing speed',
      duration: '18:20',
      level: 'Advanced'
    },
    {
      title: 'Common Mistakes and Corrections',
      description: 'Identify and fix common shorthand errors',
      duration: '10:15',
      level: 'All Levels'
    }
  ]

  const externalLinks = [
    {
      title: 'Pitman Shorthand Online Community',
      description: 'Connect with other shorthand learners worldwide',
      url: 'https://pitman-shorthand.com'
    },
    {
      title: 'NCS Official Resources',
      description: 'Official National Certificate Secretarial Studies materials',
      url: 'https://ncs-resources.edu'
    },
    {
      title: 'Professional Stenography Association',
      description: 'Career opportunities and professional development',
      url: 'https://stenography-association.org'
    }
  ]

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Learning Resources
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reference materials, guides, and additional learning content to support your shorthand journey
        </Typography>
      </Box>

      {/* Resource Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<MenuBook />} label="Reference Guides" />
          <Tab icon={<AudioFile />} label="Audio Dictation" />
          <Tab icon={<VideoLibrary />} label="Video Tutorials" />
          <Tab icon={<LinkIcon />} label="External Links" />
        </Tabs>
      </Paper>

      {/* Reference Guides Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  NCS Pitman Shorthand Syllabus Overview
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Complete 22-module curriculum aligned with National Certificate Secretarial Studies
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>Semester 1 (Modules A-L)</Typography>
                    <List dense>
                      <ListItem><ListItemText primary="A: Introduction to Phonography" secondary="Week 1 - Fundamentals" /></ListItem>
                      <ListItem><ListItemText primary="B: Straight Strokes" secondary="Week 2 - First consonants" /></ListItem>
                      <ListItem><ListItemText primary="C: Curved Strokes Part 1" secondary="Week 3 - F, V, TH, S, SH" /></ListItem>
                      <ListItem><ListItemText primary="D: Curved Strokes Part 2" secondary="Week 4 - J, N, M, L, R" /></ListItem>
                      <ListItem><ListItemText primary="E: Light Vowels" secondary="Week 5 - A, E, I positioning" /></ListItem>
                      <ListItem><ListItemText primary="F: Heavy Vowels" secondary="Week 6 - O, U, OO signs" /></ListItem>
                      <ListItem><ListItemText primary="G: Simple Word Construction" secondary="Week 7 - Building outlines" /></ListItem>
                      <ListItem><ListItemText primary="H: Diphthongs" secondary="Week 8 - Double vowels" /></ListItem>
                      <ListItem><ListItemText primary="I: Consonant Combinations" secondary="Week 9 - Basic clusters" /></ListItem>
                      <ListItem><ListItemText primary="J: Advanced Techniques" secondary="Week 10 - Special positions" /></ListItem>
                      <ListItem><ListItemText primary="K: Circle and Hook Attachments" secondary="Week 11 - S circles, hooks" /></ListItem>
                      <ListItem><ListItemText primary="L: Loop Attachments" secondary="Week 12 - ST loops" /></ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>Semester 2 (Modules M-V)</Typography>
                    <List dense>
                      <ListItem><ListItemText primary="M: Halving Principle" secondary="Week 13 - Adding T/D" /></ListItem>
                      <ListItem><ListItemText primary="N: Doubling Principle" secondary="Week 14 - TR/DR sounds" /></ListItem>
                      <ListItem><ListItemText primary="O: Intersection Theory" secondary="Week 15 - Word endings" /></ListItem>
                      <ListItem><ListItemText primary="P: Advanced Rules" secondary="Week 16 - Complex phonography" /></ListItem>
                      <ListItem><ListItemText primary="Q: Business Vocabulary" secondary="Week 17 - Professional terms" /></ListItem>
                      <ListItem><ListItemText primary="R: Reporting Style" secondary="Week 18 - Rapid techniques" /></ListItem>
                      <ListItem><ListItemText primary="S: Dictation Skills" secondary="Week 19 - Transcription practice" /></ListItem>
                      <ListItem><ListItemText primary="T: Speed Development" secondary="Week 20 - Intensive training" /></ListItem>
                      <ListItem><ListItemText primary="U: Professional Practice" secondary="Week 21 - Skills integration" /></ListItem>
                      <ListItem><ListItemText primary="V: Examination Mastery" secondary="Week 22 - Final preparation" /></ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Reference - Basic Strokes
                </Typography>
                
                <List>
                  {shorthandAlphabet.map((item, index) => (
                    <ListItem key={index} divider>
                      <ListItemIcon>
                        <Typography variant="h5" color="primary" fontWeight="bold">
                          {item.letter}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.stroke}
                        secondary={`Examples: ${item.examples.join(', ')}`}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  Light strokes are thinner, heavy strokes are thicker. Practice the distinction!
                </Alert>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Downloadable Resources
                </Typography>
                
                <List>
                  {referenceGuides.map((guide, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {guide.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={guide.title}
                        secondary={guide.description}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          startIcon={<Visibility />}
                          variant="outlined"
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          startIcon={<Download />}
                          variant="contained"
                        >
                          Download
                        </Button>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Audio Dictation Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          {audioResources.map((audio, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {audio.icon}
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                      <Typography variant="h6">{audio.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {audio.description}
                      </Typography>
                      <Chip 
                        label={`Duration: ${audio.duration}`} 
                        size="small" 
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button 
                      variant="contained" 
                      startIcon={<AudioFile />}
                      fullWidth
                    >
                      Play Audio
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<Download />}
                    >
                      Download
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Video Tutorials Tab */}
      <TabPanel value={activeTab} index={2}>
        <Grid container spacing={3}>
          {videoTutorials.map((video, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {video.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      label={video.duration} 
                      size="small" 
                      color="primary"
                    />
                    <Chip 
                      label={video.level} 
                      size="small" 
                      color="secondary"
                    />
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    startIcon={<VideoLibrary />}
                    fullWidth
                  >
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* External Links Tab */}
      <TabPanel value={activeTab} index={3}>
        <Grid container spacing={3}>
          {externalLinks.map((link, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {link.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {link.description}
                      </Typography>
                      <Typography variant="caption" color="primary">
                        {link.url}
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      startIcon={<LinkIcon />}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Site
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Alert severity="info" sx={{ mt: 3 }}>
          External links open in a new tab. Always verify the credibility of external resources.
        </Alert>
      </TabPanel>
    </Box>
  )
}

export default Resources