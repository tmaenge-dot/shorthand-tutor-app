import { LessonModule, ShorthandSymbol } from '../types/index'

// Shorthand symbols data for the first few modules
export const shorthandSymbols: Record<string, ShorthandSymbol> = {
  // Module B - Straight Strokes (First six consonants)
  'P': {
    id: 'P',
    character: 'P',
    strokeType: 'light',
    direction: 'downward',
    position: 'on-line',
    svgPath: 'M 50 20 L 50 80',
    phoneticName: 'Pay',
    category: 'consonant',
    commonWords: ['pay', 'pen', 'paper', 'people', 'cup', 'top']
  },
  'B': {
    id: 'B',
    character: 'B',
    strokeType: 'heavy',
    direction: 'downward',
    position: 'on-line',
    svgPath: 'M 50 20 L 50 80',
    phoneticName: 'Bee',
    category: 'consonant',
    relatedSymbols: ['P'],
    commonWords: ['be', 'boy', 'book', 'baby', 'job', 'table']
  },
  'T': {
    id: 'T',
    character: 'T',
    strokeType: 'light',
    direction: 'upward',
    position: 'on-line',
    svgPath: 'M 50 80 L 50 20',
    phoneticName: 'Tee',
    category: 'consonant',
    commonWords: ['to', 'time', 'take', 'ten', 'cat', 'it']
  },
  'D': {
    id: 'D',
    character: 'D',
    strokeType: 'heavy',
    direction: 'upward',
    position: 'on-line',
    svgPath: 'M 50 80 L 50 20',
    phoneticName: 'Dee',
    category: 'consonant',
    relatedSymbols: ['T'],
    commonWords: ['do', 'day', 'did', 'dog', 'good', 'old']
  },
  'CH': {
    id: 'CH',
    character: 'CH',
    strokeType: 'light',
    direction: 'upward',
    position: 'on-line',
    svgPath: 'M 30 80 L 70 20',
    phoneticName: 'Chay',
    category: 'consonant',
    commonWords: ['each', 'much', 'such', 'chair', 'child', 'church']
  },
  'J': {
    id: 'J',
    character: 'J',
    strokeType: 'heavy',
    direction: 'upward',
    position: 'on-line',
    svgPath: 'M 30 80 L 70 20',
    phoneticName: 'Jay',
    category: 'consonant',
    relatedSymbols: ['CH'],
    commonWords: ['just', 'job', 'judge', 'joy', 'edge', 'large']
  },
  // Circle S
  'S': {
    id: 'S',
    character: 'S',
    strokeType: 'circle',
    direction: 'clockwise',
    position: 'on-line',
    svgPath: 'M 60 50 A 10 10 0 1 1 40 50 A 10 10 0 1 1 60 50',
    phoneticName: 'Ess',
    category: 'consonant',
    commonWords: ['so', 'see', 'say', 'some', 'his', 'us']
  },
  
  // Module C - Curved Strokes
  'F': {
    id: 'F',
    character: 'F',
    strokeType: 'light',
    direction: 'upward',
    position: 'on-line',
    svgPath: 'M 20 80 Q 50 60 80 40',
    phoneticName: 'Ef',
    category: 'consonant',
    commonWords: ['if', 'of', 'for', 'from', 'office', 'staff']
  },
  'V': {
    id: 'V',
    character: 'V',
    strokeType: 'heavy',
    direction: 'upward',
    position: 'on-line',
    svgPath: 'M 20 80 Q 50 60 80 40',
    phoneticName: 'Vee',
    category: 'consonant',
    relatedSymbols: ['F'],
    commonWords: ['very', 'have', 'give', 'over', 'love', 'voice']
  },
  
  // Second place vowels (dots)
  'A_DOT': {
    id: 'A_DOT',
    character: 'A',
    strokeType: 'dot',
    direction: 'upward',
    position: 'second',
    svgPath: 'M 70 35 A 3 3 0 1 1 70 35',
    phoneticName: 'Ah',
    category: 'vowel',
    commonWords: ['cat', 'bat', 'hat', 'man', 'can', 'back']
  },
  'E_DOT': {
    id: 'E_DOT',
    character: 'E',
    strokeType: 'dot',
    direction: 'upward',
    position: 'second',
    svgPath: 'M 70 50 A 3 3 0 1 1 70 50',
    phoneticName: 'Eh',
    category: 'vowel',
    commonWords: ['men', 'pen', 'ten', 'get', 'let', 'bed']
  },
  'I_DOT': {
    id: 'I_DOT',
    character: 'I',
    strokeType: 'dot',
    direction: 'upward',
    position: 'second',
    svgPath: 'M 70 65 A 3 3 0 1 1 70 65',
    phoneticName: 'Ih',
    category: 'vowel',
    commonWords: ['it', 'in', 'big', 'him', 'will', 'think']
  }
}

// Lesson modules data based on the syllabus
export const lessonModules: LessonModule[] = [
  {
    id: 'A',
    title: 'Introduction to Phonography',
    description: 'Master the fundamental principles of Pitman Shorthand: Phonography, consonants, vowels, and touch/penmanship including the wheel concept.',
    weekNumber: 1,
    semester: 1,
    duration: 12,
    objectives: [
      'Explain Phonography and its phonetic principles',
      'Identify consonants and vowels correctly',
      'Master touch/penmanship and the "wheel" writing technique',
      'Understand position writing and stroke formation'
    ],
    content: [
      {
        id: 'A1',
        type: 'text',
        title: 'What is Phonography?',
        content: `Phonography is the art of representing speech sounds by written symbols. In Pitman Shorthand, we write sounds as we hear them, not as they are spelled in longhand. This makes shorthand writing much faster and more efficient than traditional writing.

The key principle is: ONE SOUND = ONE SYMBOL

For example:
- The word "phone" has 3 sounds: F-O-N (we don't write the silent letters)
- The word "though" has 2 sounds: TH-O (not T-H-O-U-G-H)

This phonetic approach allows us to write at speaking speed once we master the system.`,
        order: 1
      },
      {
        id: 'A2',
        type: 'text',
        title: 'Consonants and Vowels',
        content: `In English, we have two main types of speech sounds:

**Consonants** - sounds made by blocking or restricting airflow:
- Examples: P, B, T, D, K, G, F, V, S, Z, etc.
- In shorthand, consonants are shown by strokes (lines and curves)

**Vowels** - sounds made with open airflow:
- Examples: A, E, I, O, U, and combinations like AI, OU, etc.
- In shorthand, vowels are shown by dots and dashes

The consonant strokes form the "skeleton" of words, while vowel signs add the details.`,
        order: 2
      },
      {
        id: 'A3',
        type: 'demonstration',
        title: 'Proper Pen Technique - The Wheel',
        content: `Good penmanship is essential for readable shorthand. The "wheel" exercise helps develop smooth, controlled strokes.

**The Wheel Exercise:**
1. Hold your pen lightly, about 2cm from the tip
2. Rest your hand on the little finger and side of hand
3. Draw circles using finger movement, not wrist movement
4. Practice clockwise and counterclockwise circles
5. Keep circles the same size and evenly spaced

Practice this exercise daily to develop muscle memory and smooth stroke formation.`,
        order: 3
      },
      {
        id: 'A4',
        type: 'text',
        title: 'Health and Safety in Shorthand Practice',
        content: `Proper workspace setup is essential for effective shorthand learning:

**Physical Environment:**
- Ensure adequate lighting for clear writing visibility
- Maintain proper ventilation with open windows for air circulation
- Keep workspace clean and organized
- Use proper seating arrangement for comfortable writing practice

**Ergonomic Considerations:**
- Sit upright with feet flat on the floor
- Keep writing surface at appropriate height
- Take regular breaks to prevent hand fatigue
- Maintain proper posture throughout practice sessions

**Writing Materials:**
- Use quality pens with smooth ink flow
- Keep extra writing materials readily available
- Ensure proper paper positioning for optimal writing angles`,
        order: 4
      },
      {
        id: 'A5',
        type: 'text',
        title: 'Introduction to Secretarial Work Context',
        content: `Shorthand is an essential skill for modern secretarial and administrative professionals:

**Professional Applications:**
- Meeting minutes and note-taking
- Telephone message recording
- Dictation transcription for correspondence
- Interview note-taking
- Conference and seminar documentation

**Career Benefits:**
- Increased employment opportunities in secretarial roles
- Enhanced productivity in administrative tasks
- Professional advancement in office environments
- Preparation for National Certificate in Secretarial Studies

**Speed Targets:**
- Beginner: 5-10 words per minute
- Intermediate: 15-25 words per minute
- Professional: 30+ words per minute

Regular practice and progressive skill development will prepare you for professional secretarial work.`,
        order: 5
      }
    ],
    activities: [
      {
        id: 'A_ACT1',
        type: 'practice',
        title: 'Phonetic Sound Recognition',
        description: 'Practice identifying the actual sounds in words',
        instructions: [
          'Listen to each word carefully',
          'Write down how many sounds you hear',
          'Identify each individual sound',
          'Compare with the spelling'
        ],
        practiceItems: [
          {
            id: 'A_P1',
            type: 'word',
            content: 'cat',
            shorthandSolution: '3 sounds: K-A-T',
            difficulty: 'beginner',
            hints: ['Listen to the sounds, not the letters']
          },
          {
            id: 'A_P2',
            type: 'word',
            content: 'phone',
            shorthandSolution: '3 sounds: F-O-N',
            difficulty: 'beginner',
            hints: ['The PH makes one F sound', 'The E is silent']
          },
          {
            id: 'A_P3',
            type: 'word',
            content: 'though',
            shorthandSolution: '2 sounds: TH-O',
            difficulty: 'intermediate',
            hints: ['TH is one sound', 'Many letters are silent']
          }
        ],
        targetAccuracy: 90,
        order: 1
      },
      {
        id: 'A_ACT2',
        type: 'drill',
        title: 'Wheel Exercise Practice',
        description: 'Develop smooth pen control with circle exercises',
        instructions: [
          'Hold pen correctly with light grip',
          'Draw circles using finger movement only',
          'Maintain consistent size and spacing',
          'Practice for 10 minutes daily'
        ],
        practiceItems: [
          {
            id: 'A_P4',
            type: 'symbol',
            content: 'clockwise circles',
            shorthandSolution: 'Smooth, even circles',
            difficulty: 'beginner'
          },
          {
            id: 'A_P5',
            type: 'symbol',
            content: 'counterclockwise circles',
            shorthandSolution: 'Smooth, even circles',
            difficulty: 'beginner'
          }
        ],
        targetAccuracy: 85,
        timeLimit: 600, // 10 minutes
        order: 2
      },
      {
        id: 'A_ACT3',
        type: 'exercise',
        title: 'Shorthand vs Longhand Demonstration',
        description: 'Compare the speed and efficiency of shorthand versus traditional writing',
        instructions: [
          'Write a simple sentence in longhand',
          'Time how long it takes',
          'Observe shorthand demonstration of same sentence',
          'Compare time and efficiency differences',
          'Discuss practical applications in secretarial work'
        ],
        practiceItems: [
          {
            id: 'A_P6',
            type: 'sentence',
            content: 'The meeting will begin at ten o\'clock this morning',
            shorthandSolution: 'Demonstrate significant time reduction with shorthand',
            difficulty: 'beginner',
            hints: ['Notice how shorthand captures sounds, not spelling']
          },
          {
            id: 'A_P7',
            type: 'sentence',
            content: 'Please take notes during the telephone conversation',
            shorthandSolution: 'Show practical secretarial application',
            difficulty: 'beginner',
            hints: ['Consider real-world office scenarios']
          }
        ],
        targetAccuracy: 90,
        timeLimit: 900, // 15 minutes
        order: 3
      },
      {
        id: 'A_ACT4',
        type: 'practice',
        title: 'Phonetic Sound Charts Practice',
        description: 'Use demonstration cards and sound charts to reinforce phonetic principles',
        instructions: [
          'Study consonant and vowel identification worksheets',
          'Practice with phonetic example handouts',
          'Use demonstration cards for sound recognition',
          'Complete consonant and vowel identification exercises'
        ],
        practiceItems: [
          {
            id: 'A_P8',
            type: 'word',
            content: 'Consonant identification exercise',
            shorthandSolution: 'Correctly identify all consonant sounds',
            difficulty: 'beginner'
          },
          {
            id: 'A_P9',
            type: 'word',
            content: 'Vowel identification exercise',
            shorthandSolution: 'Correctly identify all vowel sounds',
            difficulty: 'beginner'
          }
        ],
        targetAccuracy: 95,
        order: 4
      }
    ],
    resources: [
      {
        id: 'R_A1',
        type: 'textbook',
        title: 'Pitman New Era Shorthand - Anniversary Edition',
        description: 'Chapters 1-2: Introduction and Basic Principles',
        author: "O'DEA, A., et al",
        category: 'primary',
        moduleIds: ['A']
      }
    ],
    theoryCheck: {
      id: 'TC_A',
      moduleId: 'A',
      title: 'Introduction to Phonography - Theory Check 1',
      description: 'Assessment covering phonographic principles, sound identification, and basic concepts',
      questions: [
        {
          id: 'TC_A_Q1',
          type: 'multiple-choice',
          question: 'What is the main principle of phonography?',
          options: [
            'One letter = one symbol',
            'One sound = one symbol',
            'One word = one symbol',
            'One syllable = one symbol'
          ],
          correctAnswer: 'One sound = one symbol',
          points: 5,
          explanation: 'Phonography represents speech sounds, not spelling letters'
        },
        {
          id: 'TC_A_Q2',
          type: 'multiple-choice',
          question: 'How many sounds are in the word "phone"?',
          options: ['3', '4', '5', '6'],
          correctAnswer: '3',
          points: 5,
          explanation: 'F-O-N: the PH makes one F sound and E is silent'
        },
        {
          id: 'TC_A_Q3',
          type: 'identification',
          question: 'What type of movement should be used for the wheel exercise?',
          correctAnswer: 'finger movement',
          points: 5,
          explanation: 'Use finger movement, not wrist movement, for better control'
        },
        {
          id: 'TC_A_Q4',
          type: 'multiple-choice',
          question: 'Which of these is a health and safety consideration for shorthand practice?',
          options: [
            'Adequate lighting and ventilation',
            'Using any pen available',
            'Practicing in dim light',
            'Ignoring posture'
          ],
          correctAnswer: 'Adequate lighting and ventilation',
          points: 5,
          explanation: 'Proper lighting and air circulation are essential for comfortable practice'
        },
        {
          id: 'TC_A_Q5',
          type: 'multiple-choice',
          question: 'What is the professional speed target for competent shorthand writers?',
          options: ['10 WPM', '20 WPM', '30+ WPM', '50+ WPM'],
          correctAnswer: '30+ WPM',
          points: 5,
          explanation: 'Professional secretarial work requires 30+ words per minute for efficiency'
        },
        {
          id: 'TC_A_Q6',
          type: 'identification',
          question: 'Name two practical applications of shorthand in secretarial work.',
          correctAnswer: 'meeting minutes, telephone messages',
          points: 10,
          explanation: 'Shorthand is essential for note-taking and message recording in office work'
        }
      ],
      passingScore: 95,
      timeLimit: 15,
      attempts: 3
    },
    prerequisiteModules: [],
    speedTarget: 5
  },
  
  {
    id: 'B',
    title: 'Straight Strokes - First Six Consonants',
    description: 'Master the formation and application of the first six consonants (P, B, T, D, Ch, J) with their light/dark pairs, positioning rules, and second place dot vowels.',
    weekNumber: 3,
    semester: 1,
    duration: 12,
    objectives: [
      'Write the first six consonants with correct formation',
      'Apply light/dark stroke principles correctly',
      'Use proper positioning and direction for each stroke',
      'Combine consonants with second place dot vowels',
      'Apply circle S to basic strokes',
      'Write simple short forms and phrases'
    ],
    content: [
      {
        id: 'B1',
        type: 'demonstration',
        title: 'The First Six Consonants',
        content: `The first six consonants form three light/dark pairs:

**P (Pay) - Light downward stroke**
- Phonetic name: Pay
- Direction: Downward
- Formation: Light, straight stroke from top to bottom

**B (Bee) - Heavy downward stroke**
- Phonetic name: Bee  
- Direction: Downward
- Formation: Heavy (thick) stroke, same direction as P

**T (Tee) - Light upward stroke**
- Phonetic name: Tee
- Direction: Upward  
- Formation: Light stroke from bottom to top

**D (Dee) - Heavy upward stroke**
- Phonetic name: Dee
- Direction: Upward
- Formation: Heavy stroke, same direction as T

**Ch (Chay) - Light upward slope**
- Phonetic name: Chay
- Direction: Upward slope
- Formation: Light stroke, slanted upward

**J (Jay) - Heavy upward slope**
- Phonetic name: Jay
- Direction: Upward slope  
- Formation: Heavy stroke, same direction as Ch`,
        order: 1
      },
      {
        id: 'B2',
        type: 'text',
        title: 'Light and Dark Strokes',
        content: `The thickness of strokes is crucial in Pitman Shorthand:

**Light Strokes:**
- Thin lines (about 1mm wide)
- Usually represent voiceless sounds
- Examples: P, T, Ch, F, S, K

**Heavy (Dark) Strokes:**
- Thick lines (about 2-3mm wide)  
- Usually represent voiced sounds
- Examples: B, D, J, V, Z, G

**Memory Aid:**
- Light = Less voice (whispered sounds)
- Heavy = More voice (sounds with vocal cord vibration)

Practice distinguishing between light and heavy strokes as this affects meaning!`,
        order: 2
      },
      {
        id: 'B3',
        type: 'demonstration',
        title: 'Second Place Dot Vowels',
        content: `Vowels are written as dots and dashes positioned around consonant strokes:

**Second Place Dot Vowels (written to the right of strokes):**
- A (cat) - dot at beginning of stroke
- E (pet) - dot at middle of stroke  
- I (pit) - dot at end of stroke
- O (pot) - dot at beginning of stroke (heavy)
- U (put) - dot at middle of stroke (heavy)
- OO (boot) - dot at end of stroke (heavy)

**Positioning:** Always write vowel dots after completing the consonant stroke.`,
        order: 3
      },
      {
        id: 'B4',
        type: 'demonstration',
        title: 'Circle S',
        content: `The letter S is written as a small circle:

**Circle S Formation:**
- Small circle (about 3mm diameter)
- Written clockwise
- Joins to beginning or end of strokes
- Can be written inside angles between strokes

**Examples:**
- SIT = S circle + T stroke + I dot
- CAT = K stroke + A dot + T stroke  
- CATS = K stroke + A dot + T stroke + S circle

The S circle is one of the most common elements in shorthand writing.`,
        order: 4
      }
    ],
    activities: [
      {
        id: 'B_ACT1',
        type: 'practice',
        title: 'First Six Consonants Formation',
        description: 'Practice writing the basic consonant strokes',
        instructions: [
          'Write each stroke 10 times',
          'Focus on correct direction and thickness',
          'Maintain consistent size and angle',
          'Check light/heavy distinction'
        ],
        practiceItems: [
          {
            id: 'B_P1',
            type: 'symbol',
            content: 'P (Pay)',
            shorthandSolution: 'Light downward stroke',
            difficulty: 'beginner'
          },
          {
            id: 'B_P2',
            type: 'symbol',
            content: 'B (Bee)',
            shorthandSolution: 'Heavy downward stroke',
            difficulty: 'beginner'
          },
          {
            id: 'B_P3',
            type: 'symbol',
            content: 'T (Tee)',
            shorthandSolution: 'Light upward stroke',
            difficulty: 'beginner'
          },
          {
            id: 'B_P4',
            type: 'symbol',
            content: 'D (Dee)',
            shorthandSolution: 'Heavy upward stroke',
            difficulty: 'beginner'
          }
        ],
        targetAccuracy: 90,
        order: 1
      },
      {
        id: 'B_ACT2',
        type: 'practice',
        title: 'Simple Words with Vowels',
        description: 'Combine consonants with second place dot vowels',
        instructions: [
          'Write the consonant stroke first',
          'Add the appropriate vowel dot',
          'Check vowel position carefully',
          'Practice smooth, flowing movements'
        ],
        practiceItems: [
          {
            id: 'B_P5',
            type: 'word',
            content: 'pat',
            shorthandSolution: 'P stroke + A dot + T stroke',
            difficulty: 'beginner'
          },
          {
            id: 'B_P6',
            type: 'word',
            content: 'bet',
            shorthandSolution: 'B stroke + E dot + T stroke',
            difficulty: 'beginner'
          },
          {
            id: 'B_P7',
            type: 'word',
            content: 'bit',
            shorthandSolution: 'B stroke + I dot + T stroke',
            difficulty: 'beginner'
          }
        ],
        targetAccuracy: 85,
        order: 2
      }
    ],
    resources: [
      {
        id: 'R_B1',
        type: 'textbook',
        title: 'Pitman New Era Shorthand - Anniversary Edition',
        description: 'Chapters 3-4: Straight Strokes and Light/Dark Pairs',
        author: "O'DEA, A., et al",
        category: 'primary',
        moduleIds: ['B']
      },
      {
        id: 'R_B2',
        type: 'textbook',
        title: 'Pitman New Era Shorthand - Workbook 1',
        description: 'Practice exercises for straight strokes',
        author: 'CANNING, B.W.',
        category: 'primary',
        moduleIds: ['B']
      }
    ],
    theoryCheck: {
      id: 'TC_B',
      moduleId: 'B',
      title: 'Straight Strokes - Theory Check 2',
      description: 'Assessment of first six consonants, light/dark pairs, and basic vowel placement',
      questions: [
        {
          id: 'TC_B_Q1',
          type: 'shorthand-writing',
          question: 'Write the shorthand for the word "pat"',
          correctAnswer: 'P stroke + A dot + T stroke',
          points: 10
        },
        {
          id: 'TC_B_Q2',
          type: 'identification',
          question: 'Which stroke is heavy - B or P?',
          correctAnswer: 'B',
          points: 5,
          explanation: 'B is voiced and therefore uses a heavy stroke'
        },
        {
          id: 'TC_B_Q3',
          type: 'multiple-choice',
          question: 'In which direction is the T stroke written?',
          options: ['Downward', 'Upward', 'Horizontal', 'Slanted'],
          correctAnswer: 'Upward',
          points: 5
        }
      ],
      passingScore: 95,
      timeLimit: 20,
      attempts: 3
    },
    prerequisiteModules: ['A'],
    speedTarget: 8
  },
  
  // Module C - Curved Strokes (Part 1)
  {
    id: 'C',
    title: 'Curved (Shallow) Strokes',
    description: 'Master upright/slanting curved strokes: F, V, TH (ith), THE (thee), S, Z, SH, ZH with phonetic sounds, second place dash vowels, and position principles.',
    weekNumber: 3,
    semester: 1,
    duration: 12,
    objectives: [
      'Write curved strokes F, V, TH, THE, S, Z, SH, ZH with correct formation',
      'Apply upright and slanting curved stroke principles',
      'Master second place dash vowels and positioning',
      'Understand position rules for outlines and vowel signs',
      'Write related shortforms and phrases'
    ],
    content: [
      {
        id: 'C1',
        type: 'text',
        title: 'Introduction to Curved Strokes',
        content: 'Curved strokes represent consonants that require curved pen movements. Like straight strokes, they have light and heavy variations based on whether the consonant is voiced or voiceless.',
        order: 1
      }
    ],
    activities: [],
    resources: [],
    theoryCheck: {
      id: 'TC_C',
      moduleId: 'C',
      title: 'Curved Strokes Theory Check',
      description: 'Assessment of curved strokes F, V, TH, S, SH',
      questions: [],
      passingScore: 95,
      timeLimit: 20,
      attempts: 3
    },
    prerequisiteModules: ['A', 'B'],
    speedTarget: 10
  },

  // Module D - Curved Strokes (Part 2)
  {
    id: 'D',
    title: 'Horizontal Strokes',
    description: 'Master the next five consonants (K, G, M, N, ING) and upward strokes (L, RAY) with proper horizontal stroke formation and positioning.',
    weekNumber: 4,
    semester: 1,
    duration: 12,
    objectives: [
      'Write horizontal strokes K, G, M, N, ING correctly',
      'Master upward strokes L and RAY formation',
      'Apply proper horizontal stroke positioning',
      'Write related shortforms, phrases and intersections',
      'Combine with previously learned vowels and consonants'
    ],
    content: [
      {
        id: 'D1',
        type: 'text',
        title: 'Advanced Curved Strokes',
        content: 'Complete your knowledge of curved strokes with SH, J, N, M, L, R. These strokes form the foundation for most shorthand outlines.',
        order: 1
      }
    ],
    activities: [],
    resources: [],
    theoryCheck: {
      id: 'TC_D',
      moduleId: 'D',
      title: 'Advanced Curved Strokes Check',
      description: 'Assessment of all curved strokes',
      questions: [],
      passingScore: 95,
      timeLimit: 25,
      attempts: 3
    },
    prerequisiteModules: ['A', 'B', 'C'],
    speedTarget: 12
  },

  // Module E - Vowels (Part 1)
  {
    id: 'E',
    title: 'First Place Vowels',
    description: 'Master first place vowel positioning for outline and vowel sign placement, including two dot vowels and two dash vowels with proper position rules.',
    weekNumber: 5,
    semester: 1,
    duration: 12,
    objectives: [
      'Understand position rules for outline and vowel sign placement',
      'Write two dot vowels (AY, EE, I) correctly in first place',
      'Write two dash vowels (AH, E, I) correctly in first place', 
      'Apply first place positioning systematically',
      'Write related shortforms and phrases'
    ],
    content: [
      {
        id: 'E1',
        type: 'text',
        title: 'Light Vowel Signs',
        content: 'Light vowels (A, E, I) are shown by light dots and dashes. Their position relative to the consonant stroke indicates whether they come at the beginning, middle, or end of the stroke.',
        order: 1
      }
    ],
    activities: [],
    resources: [],
    theoryCheck: {
      id: 'TC_E',
      moduleId: 'E',
      title: 'Light Vowels Theory Check',
      description: 'Assessment of light vowel positioning and usage',
      questions: [],
      passingScore: 95,
      timeLimit: 25,
      attempts: 3
    },
    prerequisiteModules: ['A', 'B', 'C', 'D'],
    speedTarget: 15
  },

  // Continue with remaining modules F through V...
  // Module F
  {
    id: 'F',
    title: 'Third Place Vowels',
    description: 'Master third place vowel positioning, two dot vowels, two dash vowels, third place horizontal outlines, shortforms, phrases, intersections, and mnemonic sentences.',
    weekNumber: 6,
    semester: 1,
    duration: 12,
    objectives: [
      'Understand third place position rules for outlines and vowel signs',
      'Write two dot vowels (O, OO, U) correctly in third place',
      'Write two dash vowels (AW, O, OO) correctly in third place',
      'Apply third place horizontal outline positioning',
      'Write related shortforms, phrases and intersections',
      'Use mnemonic sentences for memory reinforcement'
    ],
    content: [
      {
        id: 'F1',
        type: 'text',
        title: 'Heavy Vowel Signs',
        content: 'Heavy vowels use thicker dots and dashes to represent O, U, and OO sounds.',
        order: 1
      }
    ],
    activities: [],
    resources: [],
    theoryCheck: {
      id: 'TC_F',
      moduleId: 'F',
      title: 'Heavy Vowels Check',
      description: 'Assessment of heavy vowel signs',
      questions: [],
      passingScore: 95,
      timeLimit: 25,
      attempts: 3
    },
    prerequisiteModules: ['A', 'B', 'C', 'D', 'E'],
    speedTarget: 15
  },

  // Add remaining modules G through V with similar structure
  {
    id: 'G',
    title: 'S Circle: Downward L',
    weekNumber: 7,
    semester: 1,
    description: 'Master S Circle in relation to curves and straight strokes, angles formed by straight strokes, S & Z strokes, downward L, related shortforms, phrases, intersections, and speed development.',
    duration: 12,
    objectives: [
      'Write S Circle in relation to curved strokes correctly',
      'Apply S Circle to straight strokes and understand angle formation',
      'Distinguish between S and Z strokes in context',
      'Master downward L formation and positioning',
      'Write related shortforms, phrases, and intersections',
      'Develop speed with S Circle combinations'
    ],
    content: [{ id: 'G1', type: 'text', title: 'S Circle Theory', content: 'The S Circle is one of the most important attachments in Pitman Shorthand, joining to both straight and curved strokes to represent the S sound efficiently.', order: 1 }],
    activities: [], resources: [],
    theoryCheck: { id: 'TC_G', moduleId: 'G', title: 'S Circle and Downward L Check', description: 'Assessment of S Circle usage and downward L formation', questions: [], passingScore: 95, timeLimit: 30, attempts: 3 },
    prerequisiteModules: ['A', 'B', 'C', 'D', 'E', 'F'],
    speedTarget: 18
  },

  // Continue pattern for remaining modules...
  { 
    id: 'H', 
    title: 'Consonant H', 
    weekNumber: 8, 
    semester: 1, 
    description: 'Master the consonant H sound and H combinations with related shortforms, phrases, intersections, and speed development from NCS Unit 9.', 
    duration: 12, 
    objectives: [
      'Write consonant H with correct formation and positioning',
      'Apply H sound in various word contexts and combinations',
      'Master H-initial words and H-combinations',
      'Practice business vocabulary with H sounds from authentic materials',
      'Write related shortforms, phrases and intersections with H',
      'Develop speed with H-containing words and phrases'
    ], 
    content: [
      { 
        id: 'H1', 
        type: 'text', 
        title: 'Consonant H Theory', 
        content: 'The consonant H represents the aspirated sound at the beginning of words like "he", "help", "house". It combines with other consonants and appears in many common business terms. Practice includes authentic business correspondence featuring furniture manufacturing and estate agency contexts.', 
        order: 1 
      },
      {
        id: 'H2',
        type: 'practice',
        title: 'H Business Vocabulary',
        content: 'Based on NCS Unit 9 materials: "Thank you for your help. I know the head of the firm which manufactures the benches, cushions, armchairs, sofas...tell us what you want. I am informed he strikes a hard bargain in your hunting area..." Practice authentic business terms with H sounds.',
        order: 2
      }
    ], 
    activities: [], 
    resources: [], 
    theoryCheck: { id: 'TC_H', moduleId: 'H', title: 'Consonant H Check', description: 'Assessment of consonant H formation, H-combinations, and business vocabulary usage', questions: [], passingScore: 95, timeLimit: 30, attempts: 3 }, 
    prerequisiteModules: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
    speedTarget: 18 
  },
  
  { 
    id: 'I', 
    title: 'Diphthongs, Triphones & Diphones', 
    weekNumber: 9, 
    semester: 1, 
    description: 'Master diphthongs (first place and third place), joined diphthongs, triphones and stroke S, diphones, related shortforms, phrases, intersections, mnemonic sentences, and speed development.', 
    duration: 12, 
    objectives: [
      'Write diphthongs in first place correctly (AI, EI, OI)', 
      'Write diphthongs in third place correctly (OW, OI, EW)',
      'Apply joined diphthongs in word construction',
      'Master triphones and stroke S combinations',
      'Use diphones effectively in shorthand outlines',
      'Write related shortforms, phrases and intersections',
      'Use mnemonic sentences for memory enhancement',
      'Develop speed with complex vowel combinations'
    ], 
    content: [{ id: 'I1', type: 'text', title: 'Complex Vowel Sounds', content: 'Diphthongs, triphones, and diphones represent complex vowel sounds that are common in English speech and essential for fluent shorthand writing.', order: 1 }], 
    activities: [], 
    resources: [], 
    theoryCheck: { id: 'TC_I', moduleId: 'I', title: 'Complex Vowels Check', description: 'Assessment of diphthongs, triphones and diphones', questions: [], passingScore: 95, timeLimit: 30, attempts: 3 }, 
    prerequisiteModules: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], 
    speedTarget: 20 
  },
  
  { id: 'J', title: 'Advanced Stroke Techniques', weekNumber: 10, semester: 1, description: 'Advanced stroke techniques and special positions', duration: 12, objectives: ['Master advanced techniques', 'Practice special positioning'], content: [{ id: 'J1', type: 'text', title: 'Advanced Techniques', content: 'Special stroke positions and advanced writing techniques.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_J', moduleId: 'J', title: 'Advanced Techniques Check', description: 'Advanced techniques assessment', questions: [], passingScore: 95, timeLimit: 35, attempts: 3 }, prerequisiteModules: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], speedTarget: 20 },
  
  { id: 'K', title: 'Circle and Hook Attachments', weekNumber: 11, semester: 1, description: 'Learn circle S and hook attachments', duration: 12, objectives: ['Master circle S', 'Practice hook attachments'], content: [{ id: 'K1', type: 'text', title: 'Circles and Hooks', content: 'Small circles and hooks that attach to main strokes.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_K', moduleId: 'K', title: 'Circles and Hooks Check', description: 'Circle and hook assessment', questions: [], passingScore: 95, timeLimit: 35, attempts: 3 }, prerequisiteModules: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], speedTarget: 22 },
  
  { id: 'L', title: 'Loop Attachments', weekNumber: 12, semester: 1, description: 'Learn loop attachments for ST and STR sounds', duration: 12, objectives: ['Master loop attachments', 'Practice ST combinations'], content: [{ id: 'L1', type: 'text', title: 'Loop Attachments', content: 'Loops that represent ST and STR sound combinations.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_L', moduleId: 'L', title: 'Loop Attachments Check', description: 'Loop attachments assessment', questions: [], passingScore: 95, timeLimit: 35, attempts: 3 }, prerequisiteModules: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'], speedTarget: 22 },

  // Semester 2 modules
  { id: 'M', title: 'Halving Principle', weekNumber: 13, semester: 2, description: 'Learn the halving principle for adding T or D', duration: 12, objectives: ['Master halving principle', 'Practice halved strokes'], content: [{ id: 'M1', type: 'text', title: 'Halving Principle', content: 'Shortening strokes to add T or D sounds efficiently.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_M', moduleId: 'M', title: 'Halving Principle Check', description: 'Halving principle assessment', questions: [], passingScore: 95, timeLimit: 40, attempts: 3 }, prerequisiteModules: ['L'], speedTarget: 24 },
  
  { id: 'N', title: 'Doubling Principle', weekNumber: 14, semester: 2, description: 'Learn doubling for TR and DR sounds', duration: 12, objectives: ['Master doubling principle', 'Practice doubled outlines'], content: [{ id: 'N1', type: 'text', title: 'Doubling Principle', content: 'Doubling stroke length to represent TR and DR sounds.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_N', moduleId: 'N', title: 'Doubling Check', description: 'Doubling principle assessment', questions: [], passingScore: 95, timeLimit: 40, attempts: 3 }, prerequisiteModules: ['M'], speedTarget: 24 },
  
  { id: 'O', title: 'Intersection Theory', weekNumber: 15, semester: 2, description: 'Learn intersection method for common word endings', duration: 12, objectives: ['Master intersections', 'Practice common endings'], content: [{ id: 'O1', type: 'text', title: 'Intersection Theory', content: 'Using stroke intersections for efficient word endings.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_O', moduleId: 'O', title: 'Intersection Check', description: 'Intersection theory assessment', questions: [], passingScore: 95, timeLimit: 40, attempts: 3 }, prerequisiteModules: ['N'], speedTarget: 25 },
  
  { id: 'P', title: 'Advanced Phonography Rules', weekNumber: 16, semester: 2, description: 'Advanced rules and exceptions in shorthand theory', duration: 12, objectives: ['Master advanced rules', 'Handle special cases'], content: [{ id: 'P1', type: 'text', title: 'Advanced Rules', content: 'Complex phonographic rules and their applications.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_P', moduleId: 'P', title: 'Advanced Rules Check', description: 'Advanced phonography assessment', questions: [], passingScore: 95, timeLimit: 45, attempts: 3 }, prerequisiteModules: ['O'], speedTarget: 25 },
  
  { id: 'Q', title: 'Business Correspondence Vocabulary', weekNumber: 17, semester: 2, description: 'Essential business terms and phrases in shorthand', duration: 12, objectives: ['Master business vocabulary', 'Practice professional terms'], content: [{ id: 'Q1', type: 'text', title: 'Business Terms', content: 'Common business and commercial vocabulary in shorthand.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_Q', moduleId: 'Q', title: 'Business Vocabulary Check', description: 'Business terms assessment', questions: [], passingScore: 95, timeLimit: 45, attempts: 3 }, prerequisiteModules: ['P'], speedTarget: 26 },
  
  { id: 'R', title: 'Reporting Style Techniques', weekNumber: 18, semester: 2, description: 'Advanced techniques for rapid note-taking and reporting', duration: 12, objectives: ['Master reporting techniques', 'Develop speed writing'], content: [{ id: 'R1', type: 'text', title: 'Reporting Style', content: 'Specialized techniques for high-speed shorthand writing.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_R', moduleId: 'R', title: 'Reporting Style Check', description: 'Reporting techniques assessment', questions: [], passingScore: 95, timeLimit: 45, attempts: 3 }, prerequisiteModules: ['Q'], speedTarget: 27 },
  
  { id: 'S', title: 'Dictation and Transcription Skills', weekNumber: 19, semester: 2, description: 'Practice taking dictation and transcribing shorthand notes', duration: 12, objectives: ['Master dictation skills', 'Perfect transcription accuracy'], content: [{ id: 'S1', type: 'text', title: 'Dictation Skills', content: 'Techniques for accurate dictation and clean transcription.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_S', moduleId: 'S', title: 'Dictation Skills Check', description: 'Dictation and transcription assessment', questions: [], passingScore: 95, timeLimit: 50, attempts: 3 }, prerequisiteModules: ['R'], speedTarget: 28 },
  
  { id: 'T', title: 'Speed Development Intensive', weekNumber: 20, semester: 2, description: 'Intensive speed building exercises and techniques', duration: 12, objectives: ['Achieve 25+ WPM', 'Maintain accuracy at speed'], content: [{ id: 'T1', type: 'text', title: 'Speed Building', content: 'Intensive exercises to build professional writing speed.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_T', moduleId: 'T', title: 'Speed Development Check', description: 'Speed and accuracy assessment', questions: [], passingScore: 95, timeLimit: 50, attempts: 3 }, prerequisiteModules: ['S'], speedTarget: 28 },
  
  { id: 'U', title: 'Professional Practice Integration', weekNumber: 21, semester: 2, description: 'Integrate all shorthand skills for professional use', duration: 12, objectives: ['Integrate all skills', 'Professional application'], content: [{ id: 'U1', type: 'text', title: 'Professional Integration', content: 'Combining all shorthand skills for professional applications.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_U', moduleId: 'U', title: 'Professional Practice Check', description: 'Comprehensive skills assessment', questions: [], passingScore: 95, timeLimit: 60, attempts: 3 }, prerequisiteModules: ['T'], speedTarget: 30 },
  
  { id: 'V', title: 'Examination Preparation and Mastery', weekNumber: 22, semester: 2, description: 'Final preparation for NCS shorthand certification', duration: 12, objectives: ['Achieve examination standard', 'Demonstrate mastery'], content: [{ id: 'V1', type: 'text', title: 'Examination Mastery', content: 'Final preparation for professional shorthand certification.', order: 1 }], activities: [], resources: [], theoryCheck: { id: 'TC_V', moduleId: 'V', title: 'Final Mastery Assessment', description: 'Comprehensive final examination', questions: [], passingScore: 95, timeLimit: 60, attempts: 3 }, prerequisiteModules: ['U'], speedTarget: 30 }
]

export default lessonModules