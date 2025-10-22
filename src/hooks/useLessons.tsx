import React, { createContext, useContext, useState, useEffect } from 'react'
import { LessonModule } from '../types/index'
import lessonModules from '../data/lessonData'

interface LessonContextType {
  lessons: LessonModule[]
  currentLesson: LessonModule | null
  setCurrentLesson: (lesson: LessonModule) => void
  getLessonById: (id: string) => LessonModule | null
  getNextLesson: (currentId: string) => LessonModule | null
  getPreviousLesson: (currentId: string) => LessonModule | null
  getLessonsBySemester: (semester: 1 | 2) => LessonModule[]
  isLoading: boolean
}

const LessonContext = createContext<LessonContextType | null>(null)

export function LessonProvider({ children }: { children: React.ReactNode }) {
  const [lessons] = useState<LessonModule[]>(lessonModules)
  const [currentLesson, setCurrentLesson] = useState<LessonModule | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getLessonById = (id: string): LessonModule | null => {
    return lessons.find(lesson => lesson.id === id) || null
  }

  const getNextLesson = (currentId: string): LessonModule | null => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentId)
    if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
      return lessons[currentIndex + 1]
    }
    return null
  }

  const getPreviousLesson = (currentId: string): LessonModule | null => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentId)
    if (currentIndex > 0) {
      return lessons[currentIndex - 1]
    }
    return null
  }

  const getLessonsBySemester = (semester: 1 | 2): LessonModule[] => {
    return lessons.filter(lesson => lesson.semester === semester)
  }

  const contextValue: LessonContextType = {
    lessons,
    currentLesson,
    setCurrentLesson,
    getLessonById,
    getNextLesson,
    getPreviousLesson,
    getLessonsBySemester,
    isLoading
  }

  return (
    <LessonContext.Provider value={contextValue}>
      {children}
    </LessonContext.Provider>
  )
}

export function useLessons() {
  const context = useContext(LessonContext)
  if (!context) {
    throw new Error('useLessons must be used within a LessonProvider')
  }
  return context
}

export default useLessons