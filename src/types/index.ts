// Core types for the Shorthand Tutor App

export interface User {
  id: string
  name: string
  email?: string
  registrationDate: Date
  currentModule: string
  totalLessonsCompleted: number
  averageSpeed: number // words per minute
  averageAccuracy: number // percentage
}

export interface LessonModule {
  id: string // A, B, C, etc.
  title: string
  description: string
  weekNumber: number
  semester: 1 | 2
  duration: number // hours
  objectives: string[]
  content: LessonContent[]
  activities: Activity[]
  resources: Resource[]
  theoryCheck: TheoryCheck
  prerequisiteModules: string[]
  speedTarget: number // words per minute
}

export interface LessonContent {
  id: string
  type: 'text' | 'demonstration' | 'practice' | 'example'
  title: string
  content: string
  mediaUrl?: string
  shorthandSymbols?: ShorthandSymbol[]
  order: number
}

export interface ShorthandSymbol {
  id: string
  character: string // The letter(s) it represents
  strokeType: 'light' | 'heavy' | 'circle' | 'loop' | 'hook' | 'dot' | 'dash'
  direction: 'upward' | 'downward' | 'horizontal' | 'clockwise' | 'counterclockwise'
  position: 'first' | 'second' | 'third' | 'on-line' | 'above-line' | 'below-line'
  svgPath: string // SVG path data for drawing the symbol
  phoneticName: string
  category: 'consonant' | 'vowel' | 'diphthong' | 'compound' | 'special'
  relatedSymbols?: string[] // IDs of related symbols
  commonWords: string[] // Common words using this symbol
}

export interface Activity {
  id: string
  type: 'practice' | 'drill' | 'exercise' | 'assessment'
  title: string
  description: string
  instructions: string[]
  practiceItems: PracticeItem[]
  timeLimit?: number // seconds
  targetAccuracy: number // percentage
  order: number
}

export interface PracticeItem {
  id: string
  type: 'word' | 'phrase' | 'sentence' | 'symbol'
  content: string // The word/phrase to write
  shorthandSolution: string // SVG or path data for correct shorthand
  hints?: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  speedTarget?: number // words per minute for this item
}

export interface TheoryCheck {
  id: string
  moduleId: string
  title: string
  description: string
  questions: AssessmentQuestion[]
  passingScore: number // percentage (usually 95%)
  timeLimit: number // minutes
  attempts: number // number of attempts allowed
}

export interface AssessmentQuestion {
  id: string
  type: 'multiple-choice' | 'shorthand-writing' | 'transcription' | 'identification'
  question: string
  options?: string[] // for multiple choice
  correctAnswer: string
  shorthandPrompt?: string // SVG or path data to display
  points: number
  explanation?: string
}

export interface UserProgress {
  userId: string
  moduleId: string
  lessonProgress: LessonProgress[]
  theoryCheckResults: TheoryCheckResult[]
  practiceStats: PracticeStats
  speedDevelopment: SpeedRecord[]
  lastAccessed: Date
}

export interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt?: Date
  timeSpent: number // minutes
  activitiesCompleted: string[] // activity IDs
  accuracy: number // percentage
}

export interface TheoryCheckResult {
  checkId: string
  attempt: number
  score: number // percentage
  passed: boolean
  completedAt: Date
  answers: UserAnswer[]
  timeSpent: number // minutes
}

export interface UserAnswer {
  questionId: string
  userAnswer: string
  isCorrect: boolean
  shorthandDrawing?: string // SVG path data if user drew shorthand
  timeSpent: number // seconds
}

export interface PracticeStats {
  totalPracticeTime: number // minutes
  wordsWritten: number
  averageSpeed: number // words per minute
  averageAccuracy: number // percentage
  streakDays: number
  lastPracticeDate: Date
}

export interface SpeedRecord {
  date: Date
  speed: number // words per minute
  accuracy: number // percentage
  moduleId: string
  exerciseType: 'dictation' | 'transcription' | 'writing'
  duration: number // seconds
}

export interface Resource {
  id: string
  type: 'textbook' | 'video' | 'audio' | 'worksheet' | 'reference'
  title: string
  description: string
  url?: string
  filePath?: string
  author?: string
  category: 'primary' | 'revision' | 'reference'
  moduleIds: string[] // which modules this resource supports
}

export interface DictationExercise {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  targetSpeed: number // words per minute
  content: string // text to be dictated
  audioUrl?: string
  estimatedDuration: number // seconds
  moduleId: string
  vocabulary: string[] // key words used
}

export interface TranscriptionExercise {
  id: string
  title: string
  description: string
  plateShorthand: string // SVG or image data of shorthand to transcribe
  correctTranscription: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  hints?: string[]
  moduleId: string
}

// Canvas and drawing types
export interface DrawingStroke {
  id: string
  type: 'line' | 'curve' | 'circle' | 'dot'
  points: Point[]
  strokeWidth: number
  color: string
  timestamp: number
}

export interface Point {
  x: number
  y: number
  pressure?: number
}

export interface CanvasState {
  strokes: DrawingStroke[]
  currentStroke?: DrawingStroke
  canvasSize: { width: number; height: number }
  zoom: number
  offset: { x: number; y: number }
}

// App state types
export interface AppState {
  user: User | null
  currentModule: LessonModule | null
  userProgress: UserProgress[]
  isLoading: boolean
  error: string | null
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

// Settings and preferences
export interface UserSettings {
  userId: string
  theme: 'light' | 'dark' | 'auto'
  fontSize: 'small' | 'medium' | 'large'
  audioEnabled: boolean
  speedUnits: 'wpm' | 'cpm' // words or characters per minute
  reminderEnabled: boolean
  reminderTime?: string
  autoSave: boolean
  language: 'en' | 'tn' // English or Setswana
}

// All types are exported individually above with export interface declarations