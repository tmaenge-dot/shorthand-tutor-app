// Authentic NCS Lesson Data
// Based on Pitman New Era Shorthand Anniversary Edition
// Follows exact NCS unit progression and content

import { LessonModule } from '../src/types/index'

export const ncsAuthenticLessonModules: LessonModule[] = [
  {
    id: 'A',
    title: 'NCS Unit 1: Straight Downstrokes',
    description: 'Strokes P, B, T, D, CH, J; second-place dot vowels',
    weekNumber: 1,
    semester: 1,
    duration: 12,
    objectives: [
      'Master straight strokes, light/heavy pairs',
      'Practice with unit-appropriate vocabulary',
      'Apply theory in practical exercises'
    ],
    content: [/* Unit 1 content */],
    activities: [/* Unit 1 activities */],
    resources: [/* Unit 1 resources */],
    prerequisiteModules: [],
    speedTarget: 7
  },
  {
    id: 'B',
    title: 'NCS Unit 2: Curved Strokes',
    description: 'Strokes F, V, Th, TH, S, Z, Sh, ZH; second-place dash vowels',
    weekNumber: 2,
    semester: 1,
    duration: 12,
    objectives: [
      'Master curved strokes, dash vowels',
      'Practice with unit-appropriate vocabulary',
      'Apply theory in practical exercises'
    ],
    content: [/* Unit 2 content */],
    activities: [/* Unit 2 activities */],
    resources: [/* Unit 2 resources */],
    prerequisiteModules: ["A"],
    speedTarget: 9
  },
  {
    id: 'C',
    title: 'NCS Unit 3: Horizontal Strokes',
    description: 'Horizontal strokes K, G, M, N, NG; upward strokes L, W, Y',
    weekNumber: 3,
    semester: 1,
    duration: 12,
    objectives: [
      'Master horizontal strokes, upward strokes',
      'Practice with unit-appropriate vocabulary',
      'Apply theory in practical exercises'
    ],
    content: [/* Unit 3 content */],
    activities: [/* Unit 3 activities */],
    resources: [/* Unit 3 resources */],
    prerequisiteModules: ["A", "B"],
    speedTarget: 11
  },
  {
    id: 'D',
    title: 'NCS Unit 4: First-place Vowels',
    description: 'First-place vowel positioning and signs',
    weekNumber: 4,
    semester: 1,
    duration: 12,
    objectives: [
      'Master position writing, first-place vowels',
      'Practice with unit-appropriate vocabulary',
      'Apply theory in practical exercises'
    ],
    content: [/* Unit 4 content */],
    activities: [/* Unit 4 activities */],
    resources: [/* Unit 4 resources */],
    prerequisiteModules: ["A", "B", "C"],
    speedTarget: 13
  },
  {
    id: 'E',
    title: 'NCS Unit 5: Third-place Vowels',
    description: 'Third-place vowel positioning and signs',
    weekNumber: 5,
    semester: 1,
    duration: 12,
    objectives: [
      'Master third-place vowels, position writing',
      'Practice with unit-appropriate vocabulary',
      'Apply theory in practical exercises'
    ],
    content: [/* Unit 5 content */],
    activities: [/* Unit 5 activities */],
    resources: [/* Unit 5 resources */],
    prerequisiteModules: ["A", "B", "C", "D"],
    speedTarget: 15
  },
  {
    id: 'F',
    title: 'NCS Unit 6: S Circle and Downward L',
    description: 'S circle; downward L stroke',
    weekNumber: 6,
    semester: 1,
    duration: 12,
    objectives: [
      'Master S circle attachment, downward L',
      'Practice with unit-appropriate vocabulary',
      'Apply theory in practical exercises'
    ],
    content: [/* Unit 6 content */],
    activities: [/* Unit 6 activities */],
    resources: [/* Unit 6 resources */],
    prerequisiteModules: ["A", "B", "C", "D", "E"],
    speedTarget: 17
  },
  {
    id: 'G',
    title: 'NCS Unit 7: Stroke R',
    description: 'Stroke R formation and usage',
    weekNumber: 7,
    semester: 1,
    duration: 12,
    objectives: [
      'Master R stroke formation',
      'Practice with unit-appropriate vocabulary',
      'Apply theory in practical exercises'
    ],
    content: [/* Unit 7 content */],
    activities: [/* Unit 7 activities */],
    resources: [/* Unit 7 resources */],
    prerequisiteModules: ["A", "B", "C", "D", "E", "F"],
    speedTarget: 19
  },
  {
    id: 'H',
    title: 'NCS Unit 8: Complex Vowels',
    description: 'Diphthongs, triphones and diphones',
    weekNumber: 8,
    semester: 1,
    duration: 12,
    objectives: [
      'Master complex vowel sounds',
      'Practice with unit-appropriate vocabulary',
      'Apply theory in practical exercises'
    ],
    content: [/* Unit 8 content */],
    activities: [/* Unit 8 activities */],
    resources: [/* Unit 8 resources */],
    prerequisiteModules: ["A", "B", "C", "D", "E", "F", "G"],
    speedTarget: 21
  },
  {
    id: 'I',
    title: 'NCS Unit 9: Consonant H',
    description: 'Consonant H formation and combinations',
    weekNumber: 9,
    semester: 1,
    duration: 12,
    objectives: [
      'Master H consonant, H combinations',
      'Practice with unit-appropriate vocabulary',
      'Apply theory in practical exercises'
    ],
    content: [/* Unit 9 content */],
    activities: [/* Unit 9 activities */],
    resources: [/* Unit 9 resources */],
    prerequisiteModules: ["A", "B", "C", "D", "E", "F", "G", "H"],
    speedTarget: 23
  },
]

export default ncsAuthenticLessonModules
