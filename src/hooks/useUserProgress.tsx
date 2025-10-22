import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { UserProgress, User, LessonProgress, TheoryCheckResult, PracticeStats } from '../types/index'
import localforage from 'localforage'

// User Progress Context Types
interface UserProgressState {
  user: User | null
  userProgress: UserProgress[]
  currentModule: string
  isLoading: boolean
  error: string | null
}

type UserProgressAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_PROGRESS'; payload: UserProgress[] }
  | { type: 'UPDATE_LESSON_PROGRESS'; payload: { moduleId: string; lessonProgress: LessonProgress } }
  | { type: 'ADD_THEORY_CHECK_RESULT'; payload: { moduleId: string; result: TheoryCheckResult } }
  | { type: 'UPDATE_PRACTICE_STATS'; payload: { moduleId: string; stats: Partial<PracticeStats> } }
  | { type: 'SET_CURRENT_MODULE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

// Initial state
const initialState: UserProgressState = {
  user: null,
  userProgress: [],
  currentModule: 'A',
  isLoading: false,
  error: null
}

// Reducer
function userProgressReducer(state: UserProgressState, action: UserProgressAction): UserProgressState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'SET_PROGRESS':
      return { ...state, userProgress: action.payload }
    
    case 'UPDATE_LESSON_PROGRESS':
      return {
        ...state,
        userProgress: state.userProgress.map(progress =>
          progress.moduleId === action.payload.moduleId
            ? {
                ...progress,
                lessonProgress: [
                  ...progress.lessonProgress.filter(lp => lp.lessonId !== action.payload.lessonProgress.lessonId),
                  action.payload.lessonProgress
                ],
                lastAccessed: new Date()
              }
            : progress
        )
      }
    
    case 'ADD_THEORY_CHECK_RESULT':
      return {
        ...state,
        userProgress: state.userProgress.map(progress =>
          progress.moduleId === action.payload.moduleId
            ? {
                ...progress,
                theoryCheckResults: [...progress.theoryCheckResults, action.payload.result],
                lastAccessed: new Date()
              }
            : progress
        )
      }
    
    case 'UPDATE_PRACTICE_STATS':
      return {
        ...state,
        userProgress: state.userProgress.map(progress =>
          progress.moduleId === action.payload.moduleId
            ? {
                ...progress,
                practiceStats: { ...progress.practiceStats, ...action.payload.stats },
                lastAccessed: new Date()
              }
            : progress
        )
      }
    
    case 'SET_CURRENT_MODULE':
      return { ...state, currentModule: action.payload }
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    default:
      return state
  }
}

// Context
const UserProgressContext = createContext<{
  state: UserProgressState
  dispatch: React.Dispatch<UserProgressAction>
  // Helper functions
  initializeUser: (userData: Partial<User>) => Promise<void>
  updateLessonProgress: (moduleId: string, lessonProgress: LessonProgress) => Promise<void>
  completeTheoryCheck: (moduleId: string, result: TheoryCheckResult) => Promise<void>
  updatePracticeStats: (moduleId: string, stats: Partial<PracticeStats>) => Promise<void>
  getUserProgressForModule: (moduleId: string) => UserProgress | null
  getOverallProgress: () => { completed: number; total: number; percentage: number }
  getCurrentSpeed: () => number
  getCurrentAccuracy: () => number
} | null>(null)

// Provider component
export function UserProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userProgressReducer, initialState)

  // Initialize user and load saved progress
  const initializeUser = async (userData: Partial<User>) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Create or update user
      const user: User = {
        id: userData.id || `user_${Date.now()}`,
        name: userData.name || 'Student',
        email: userData.email,
        registrationDate: userData.registrationDate || new Date(),
        currentModule: userData.currentModule || 'A',
        totalLessonsCompleted: userData.totalLessonsCompleted || 0,
        averageSpeed: userData.averageSpeed || 0,
        averageAccuracy: userData.averageAccuracy || 0
      }

      // Save user to storage
      await localforage.setItem('shorthand_user', user)
      dispatch({ type: 'SET_USER', payload: user })

      // Load existing progress or create initial progress
      let userProgress = await localforage.getItem<UserProgress[]>('shorthand_progress')
      if (!userProgress) {
        // Create initial progress for all modules
        userProgress = Array.from({ length: 22 }, (_, i) => {
          const moduleId = String.fromCharCode(65 + i) // A, B, C, etc.
          return {
            userId: user.id,
            moduleId,
            lessonProgress: [],
            theoryCheckResults: [],
            practiceStats: {
              totalPracticeTime: 0,
              wordsWritten: 0,
              averageSpeed: 0,
              averageAccuracy: 0,
              streakDays: 0,
              lastPracticeDate: new Date()
            },
            speedDevelopment: [],
            lastAccessed: new Date()
          }
        })
        await localforage.setItem('shorthand_progress', userProgress)
      }

      dispatch({ type: 'SET_PROGRESS', payload: userProgress })
      dispatch({ type: 'SET_CURRENT_MODULE', payload: user.currentModule })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize user data' })
      console.error('Error initializing user:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // Update lesson progress
  const updateLessonProgress = async (moduleId: string, lessonProgress: LessonProgress) => {
    dispatch({ type: 'UPDATE_LESSON_PROGRESS', payload: { moduleId, lessonProgress } })
    await localforage.setItem('shorthand_progress', state.userProgress)
  }

  // Complete theory check
  const completeTheoryCheck = async (moduleId: string, result: TheoryCheckResult) => {
    dispatch({ type: 'ADD_THEORY_CHECK_RESULT', payload: { moduleId, result } })
    await localforage.setItem('shorthand_progress', state.userProgress)
  }

  // Update practice statistics
  const updatePracticeStats = async (moduleId: string, stats: Partial<PracticeStats>) => {
    dispatch({ type: 'UPDATE_PRACTICE_STATS', payload: { moduleId, stats } })
    await localforage.setItem('shorthand_progress', state.userProgress)
  }

  // Get progress for specific module
  const getUserProgressForModule = (moduleId: string): UserProgress | null => {
    return state.userProgress.find(progress => progress.moduleId === moduleId) || null
  }

  // Calculate overall progress
  const getOverallProgress = () => {
    const totalModules = state.userProgress.length
    const completedModules = state.userProgress.filter(progress => 
      progress.theoryCheckResults.some(result => result.passed)
    ).length
    
    return {
      completed: completedModules,
      total: totalModules,
      percentage: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0
    }
  }

  // Get current typing speed
  const getCurrentSpeed = (): number => {
    const recentRecords = state.userProgress
      .flatMap(progress => progress.speedDevelopment)
      .filter(record => record.date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
      .sort((a, b) => b.date.getTime() - a.date.getTime())
    
    if (recentRecords.length === 0) return 0
    
    const average = recentRecords.slice(0, 10).reduce((sum, record) => sum + record.speed, 0) / Math.min(10, recentRecords.length)
    return Math.round(average)
  }

  // Get current accuracy
  const getCurrentAccuracy = (): number => {
    const recentRecords = state.userProgress
      .flatMap(progress => progress.speedDevelopment)
      .filter(record => record.date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
      .sort((a, b) => b.date.getTime() - a.date.getTime())
    
    if (recentRecords.length === 0) return 0
    
    const average = recentRecords.slice(0, 10).reduce((sum, record) => sum + record.accuracy, 0) / Math.min(10, recentRecords.length)
    return Math.round(average)
  }

  // Load saved data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedUser = await localforage.getItem<User>('shorthand_user')
        if (savedUser) {
          await initializeUser(savedUser)
        }
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
    
    loadSavedData()
  }, [])

  const contextValue = {
    state,
    dispatch,
    initializeUser,
    updateLessonProgress,
    completeTheoryCheck,
    updatePracticeStats,
    getUserProgressForModule,
    getOverallProgress,
    getCurrentSpeed,
    getCurrentAccuracy
  }

  return (
    <UserProgressContext.Provider value={contextValue}>
      {children}
    </UserProgressContext.Provider>
  )
}

// Custom hook to use the context
export function useUserProgress() {
  const context = useContext(UserProgressContext)
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider')
  }
  return context
}

export default useUserProgress