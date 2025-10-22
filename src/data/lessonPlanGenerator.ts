// Lesson Plan Generator for Shorthand Theory Course
// Based on Ministry of Employment, Labour Productivity & Skills Development format

export interface LessonPlanData {
  lessonNumber: number
  date: string
  topic: string
  objectives: string[]
  duration: string
  numberOfLearners: number
  healthSafetyAspects: string[]
  teachingMaterials: string[]
  writtenGraphicalMaterials: string[]
  resourceBooks: string[]
  facilitationStages: FacilitationStage[]
  lessonEvaluation: string
}

export interface FacilitationStage {
  stage: string
  time: string
  grouping: string
  facilitatorActivity: string[]
  learnerActivity: string[]
  contentResources: string[]
}

// Lesson plan templates for each module
export const lessonPlanTemplates: Record<string, LessonPlanData> = {
  'A': {
    lessonNumber: 1,
    date: '',
    topic: 'Introduction to Phonography',
    objectives: [
      'Explain Phonography principles',
      'Identify consonants and vowels',
      'Explain touch/penmanship, the "wheel"'
    ],
    duration: '2 hours',
    numberOfLearners: 20,
    healthSafetyAspects: [
      'Open windows for air circulation',
      'Adequate lighting',
      'Clean classroom',
      'Proper seating arrangement for writing practice'
    ],
    teachingMaterials: [
      'Markers',
      'Whiteboard',
      'Handouts with phonetic examples',
      'Demonstration cards'
    ],
    writtenGraphicalMaterials: [
      'Task from the handbook',
      'Phonetic sound charts',
      'Consonant and vowel identification worksheets'
    ],
    resourceBooks: [
      'Audrey O\'Dea et al. (2003) New Era Shorthand. London: Pitman Publishing.',
      'Canning, B.W. Pitman New Era Shorthand - Workbook 1'
    ],
    facilitationStages: [
      {
        stage: 'Introduction and Motivation of learners',
        time: '20 min',
        grouping: 'Whole group',
        facilitatorActivity: [
          'Introduce the topic of phonography',
          'Explain the importance of shorthand in secretarial work',
          'Show examples of shorthand writing',
          'Create interest by demonstrating speed of shorthand vs longhand'
        ],
        learnerActivity: [
          'Participate in the discussion',
          'Listen attentively and respond',
          'Ask questions about shorthand applications',
          'Observe demonstrations'
        ],
        contentResources: [
          'White board and marker',
          'Sample shorthand texts',
          'Real-world examples'
        ]
      },
      {
        stage: 'Development',
        time: '1 hr 30 mins',
        grouping: 'Whole group and individual work',
        facilitatorActivity: [
          'With the use of a handbook explain:',
          '1. Explain Phonography - the science of representing speech sounds',
          '2. Demonstrate difference between phonetic and alphabetic writing',
          '3. Identify consonants and vowels with examples',
          '4. Show proper pen grip and posture',
          '5. Demonstrate the "wheel" exercise for smooth strokes',
          '6. Give practical exercises for sound identification',
          'Give a task to gauge learners\' understanding',
          'While learners are attempting the task:',
          '• Monitor progress of each learner',
          '• React to non-verbal communication',
          '• Check learners\' progress',
          '• Provide individual guidance on pen technique'
        ],
        learnerActivity: [
          'Listen and ask questions for clarity',
          'Work at the same pace',
          'Practice proper pen grip',
          'Attempt the wheel exercise',
          'Identify sounds in given words',
          'Distinguish between consonants and vowels',
          'Complete assigned tasks'
        ],
        contentResources: [
          'Note pad',
          'Handbook',
          'Phonetic charts',
          'Practice worksheets',
          'Individual practice materials'
        ]
      },
      {
        stage: 'Conclusion and Social closure',
        time: '10 mins',
        grouping: 'Whole group',
        facilitatorActivity: [
          'Summarize key points covered',
          'Preview next lesson content',
          'Thank learners for their participation',
          'Explain feedback will be given in the next session',
          'Assign homework practice for wheel exercise'
        ],
        learnerActivity: [
          'Responding to feedback',
          'Listen and respond to social closure',
          'Note homework assignments',
          'Ask final questions'
        ],
        contentResources: [
          'Summary notes',
          'Homework sheets'
        ]
      }
    ],
    lessonEvaluation: 'Objective of the lesson was met as learners showed understanding of phonographic concepts through their participation during the lesson and successful completion of sound identification exercises.'
  },

  'B': {
    lessonNumber: 2,
    date: '',
    topic: 'Straight Strokes - First Six Consonants',
    objectives: [
      'Write the first six consonants (P, B, T, D, Ch, J)',
      'Apply light/dark stroke principles correctly',
      'Use proper positioning and joining techniques',
      'Write second place dot vowels',
      'Apply circle S to basic strokes'
    ],
    duration: '2 hours',
    numberOfLearners: 20,
    healthSafetyAspects: [
      'Open windows for air circulation',
      'Adequate lighting for detailed writing work',
      'Clean classroom',
      'Proper desk height for writing comfort',
      'Regular breaks for hand rest'
    ],
    teachingMaterials: [
      'Markers',
      'Whiteboard',
      'Shorthand practice paper',
      'Stroke demonstration cards',
      'Light and heavy stroke examples'
    ],
    writtenGraphicalMaterials: [
      'Stroke formation worksheets',
      'Light/dark discrimination exercises',
      'Vowel positioning practice sheets',
      'Circle S application exercises'
    ],
    resourceBooks: [
      'Audrey O\'Dea et al. (2003) New Era Shorthand. London: Pitman Publishing. Chapters 3-4',
      'Canning, B.W. Pitman New Era Shorthand - Workbook 1, Exercises 1-10'
    ],
    facilitationStages: [
      {
        stage: 'Introduction and Motivation',
        time: '15 min',
        grouping: 'Whole group',
        facilitatorActivity: [
          'Review previous lesson on phonography',
          'Introduce the concept of stroke writing',
          'Show the elegance and efficiency of shorthand strokes',
          'Demonstrate speed advantage of strokes over letters'
        ],
        learnerActivity: [
          'Recall phonographic principles',
          'Participate in discussion',
          'Observe stroke demonstrations',
          'Ask questions about stroke formation'
        ],
        contentResources: [
          'Whiteboard demonstrations',
          'Stroke comparison charts'
        ]
      },
      {
        stage: 'Development - Part 1: Stroke Formation',
        time: '45 mins',
        grouping: 'Whole group with individual practice',
        facilitatorActivity: [
          'Demonstrate formation of P (light downward)',
          'Show B (heavy downward) - emphasize thickness',
          'Teach T (light upward) and D (heavy upward)',
          'Introduce Ch (light slope) and J (heavy slope)',
          'Explain phonetic names: Pay, Bee, Tee, Dee, Chay, Jay',
          'Show direction and positioning rules',
          'Guide individual practice',
          'Correct stroke formation errors',
          'Emphasize light/dark distinction'
        ],
        learnerActivity: [
          'Practice each stroke formation',
          'Listen to phonetic names',
          'Follow direction instructions',
          'Practice light and heavy strokes',
          'Ask for individual help when needed',
          'Self-correct based on feedback'
        ],
        contentResources: [
          'Practice paper',
          'Stroke formation guides',
          'Individual practice sheets'
        ]
      },
      {
        stage: 'Development - Part 2: Vowels and Circle S',
        time: '45 mins',
        grouping: 'Whole group with individual practice',
        facilitatorActivity: [
          'Introduce second place dot vowels',
          'Show vowel positioning: beginning, middle, end of stroke',
          'Demonstrate A, E, I, O, U, OO dots',
          'Teach circle S formation and application',
          'Show joining of strokes with vowels',
          'Provide practice exercises',
          'Monitor individual progress',
          'Give immediate feedback on accuracy'
        ],
        learnerActivity: [
          'Practice vowel dot placement',
          'Learn vowel positioning rules',
          'Practice circle S formation',
          'Combine consonants with vowels',
          'Write simple words using learned elements',
          'Complete practice exercises'
        ],
        contentResources: [
          'Vowel positioning charts',
          'Circle S practice sheets',
          'Simple word exercises'
        ]
      },
      {
        stage: 'Conclusion and Assessment',
        time: '15 mins',
        grouping: 'Whole group',
        facilitatorActivity: [
          'Quick assessment of stroke formation',
          'Review light/dark principles',
          'Preview next lesson content',
          'Assign practice homework',
          'Provide encouragement for continued practice'
        ],
        learnerActivity: [
          'Demonstrate learned strokes',
          'Ask clarification questions',
          'Note homework assignments',
          'Commit to daily practice'
        ],
        contentResources: [
          'Assessment checklist',
          'Homework practice sheets'
        ]
      }
    ],
    lessonEvaluation: 'Lesson objectives were achieved as evidenced by learners\' ability to form the six basic consonant strokes with proper light/dark distinction and successfully apply second place vowels in simple combinations.'
  },

  'C': {
    lessonNumber: 3,
    date: '',
    topic: 'Curved (Shallow) Strokes',
    objectives: [
      'Write upright and slanting curved strokes (F, V, TH, THE, S, Z, SH, ZH)',
      'Apply second place dash vowels correctly',
      'Position outlines with vowel signs',
      'Distinguish between similar curved strokes'
    ],
    duration: '2 hours',
    numberOfLearners: 20,
    healthSafetyAspects: [
      'Open windows for air circulation',
      'Adequate lighting for detailed curved stroke work',
      'Clean classroom',
      'Comfortable writing surface',
      'Frequent hand exercises to prevent strain'
    ],
    teachingMaterials: [
      'Markers',
      'Whiteboard',
      'Curved stroke templates',
      'Practice paper with guidelines',
      'Stroke angle guides'
    ],
    writtenGraphicalMaterials: [
      'Curved stroke formation worksheets',
      'Dash vowel positioning exercises',
      'Stroke angle practice sheets',
      'Word formation exercises'
    ],
    resourceBooks: [
      'Audrey O\'Dea et al. (2003) New Era Shorthand. London: Pitman Publishing. Chapters 5-6',
      'Canning, B.W. Pitman New Era Shorthand - Workbook 1, Exercises 11-20'
    ],
    facilitationStages: [
      {
        stage: 'Introduction and Review',
        time: '15 min',
        grouping: 'Whole group',
        facilitatorActivity: [
          'Review straight strokes from previous lesson',
          'Introduce the concept of curved strokes',
          'Explain the difference between straight and curved',
          'Show real-world applications of curved strokes'
        ],
        learnerActivity: [
          'Demonstrate straight strokes',
          'Participate in discussion',
          'Observe curved stroke examples',
          'Ask questions about differences'
        ],
        contentResources: [
          'Stroke comparison charts',
          'Review materials'
        ]
      },
      {
        stage: 'Development - Curved Stroke Formation',
        time: '50 mins',
        grouping: 'Whole group with individual practice',
        facilitatorActivity: [
          'Demonstrate F (light upright curve)',
          'Show V (heavy upright curve)',
          'Teach TH as in "with" (light slanting)',
          'Show THE as in "the" (heavy slanting)',
          'Introduce S, Z (stroke forms)',
          'Demonstrate SH, ZH strokes',
          'Explain upright vs slanting positioning',
          'Guide formation practice',
          'Correct common errors in curve formation'
        ],
        learnerActivity: [
          'Practice curved stroke formation',
          'Follow curve direction carefully',
          'Distinguish upright from slanting',
          'Practice light and heavy curves',
          'Seek help for difficult formations',
          'Self-assess stroke quality'
        ],
        contentResources: [
          'Curved stroke guides',
          'Formation practice sheets',
          'Angle measurement tools'
        ]
      },
      {
        stage: 'Development - Dash Vowels',
        time: '45 mins',
        grouping: 'Individual and pair work',
        facilitatorActivity: [
          'Introduce second place dash vowels',
          'Show dash positioning rules',
          'Demonstrate AH, AW, E, I, O, OO dashes',
          'Teach combination with curved strokes',
          'Provide guided practice exercises',
          'Monitor pair work activities',
          'Give immediate feedback on accuracy'
        ],
        learnerActivity: [
          'Learn dash vowel formations',
          'Practice dash positioning',
          'Combine dashes with curved strokes',
          'Work in pairs for peer feedback',
          'Complete practice exercises',
          'Help classmates with difficulties'
        ],
        contentResources: [
          'Dash vowel charts',
          'Combination exercises',
          'Peer practice materials'
        ]
      },
      {
        stage: 'Conclusion and Practice',
        time: '10 mins',
        grouping: 'Whole group',
        facilitatorActivity: [
          'Summary of curved strokes learned',
          'Quick competency check',
          'Preview next lesson',
          'Assign practice homework',
          'Encourage daily practice routine'
        ],
        learnerActivity: [
          'Demonstrate learned skills',
          'Ask final questions',
          'Note homework requirements',
          'Plan practice schedule'
        ],
        contentResources: [
          'Summary charts',
          'Homework materials'
        ]
      }
    ],
    lessonEvaluation: 'Learning objectives were successfully met as demonstrated by learners\' accurate formation of curved strokes and proper application of dash vowels in various combinations.'
  }
}

// Function to generate a lesson plan for any module
export function generateLessonPlan(moduleId: string, date: string, customizations?: Partial<LessonPlanData>): string {
  const template = lessonPlanTemplates[moduleId]
  if (!template) {
    throw new Error(`No lesson plan template found for module ${moduleId}`)
  }

  // Merge customizations if provided
  const lessonPlan = { ...template, date, ...customizations }

  return formatLessonPlan(lessonPlan)
}

// Function to format lesson plan into the institutional format
export function formatLessonPlan(data: LessonPlanData): string {
  return `MINISTRY OF EMPLOYMENT, LABOUR PRODUCTIVITY & SKILLS DEVELOPMENT
DEPARTMENT OF SKILLS DEVELOPMENT
_____________________________________________________________________________________________________

Lesson Plan 

Subject: Shorthand                                              Lesson No: ${data.lessonNumber}                                     
Class: National Certificate in Secretarial Studies        Number of learners: ${data.numberOfLearners}   
Date: ${data.date}                                                Duration: ${data.duration}

TOPIC: ${data.topic}

OBJECTIVE: Learners should be able to:
${data.objectives.map((obj, index) => `    ${index + 1}. ${obj}`).join('\n')}

Health and safety aspects to consider:
${data.healthSafetyAspects.map(aspect => ` (${String.fromCharCode(97 + data.healthSafetyAspects.indexOf(aspect))}) ${aspect}`).join('\n')}

TEACHING MATERIALS REQUIRED: 
${data.teachingMaterials.map((material, index) => `    ${['i', 'ii', 'iii', 'iv', 'v'][index] || (index + 1)}. ${material}`).join('\n')}

Written / Graphical Materials required: 
${data.writtenGraphicalMaterials.map(material => `    (${String.fromCharCode(97 + data.writtenGraphicalMaterials.indexOf(material))}) ${material}`).join('\n')}

Books / web pages used as resources in preparing session:
${data.resourceBooks.map(book => `${book}`).join('\n')}

Facilitation of learning session

${data.facilitationStages.map(stage => `
${stage.stage}
${stage.time}
${stage.grouping}

Facilitator Activity:
${stage.facilitatorActivity.map(activity => `    • ${activity}`).join('\n')}

Learner Activity:
${stage.learnerActivity.map(activity => `    • ${activity}`).join('\n')}

Content/Resources:
${stage.contentResources.map(resource => `    • ${resource}`).join('\n')}
`).join('\n')}

LESSON EVALUATION:
${data.lessonEvaluation}

---
This lesson plan follows the institutional format and can be adapted for specific class needs and circumstances.
`
}

// Export lesson plan for all modules A-V
export function generateAllLessonPlans(startDate: Date): Record<string, string> {
  const lessonPlans: Record<string, string> = {}
  const modules = 'ABCDEFGHIJKLMNOPQRSTUV'.split('')
  
  modules.forEach((moduleId, index) => {
    const lessonDate = new Date(startDate)
    lessonDate.setDate(lessonDate.getDate() + (index * 7)) // Weekly lessons
    
    try {
      lessonPlans[moduleId] = generateLessonPlan(
        moduleId, 
        lessonDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      )
    } catch (error) {
      // For modules without templates, create basic structure
      lessonPlans[moduleId] = `Lesson plan template for Module ${moduleId} - To be developed`
    }
  })
  
  return lessonPlans
}

export default generateLessonPlan