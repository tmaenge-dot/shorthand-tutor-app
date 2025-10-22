// Stroke Recognition Assessment Questions
// Based on authentic NCS stroke formations from Units 1-20

export const strokeRecognitionAssessments = {
  unit_1_formation: [
    {
      type: 'stroke_identification',
      question: 'Which consonant is represented by a light straight downstroke?',
      options: ["P (Pay)", "B (Bee)", "T (Tee)", "D (Dee)"],
      correct: 0,
      explanation: 'P (Pay) is written as a light straight downstroke'
    },
    {
      type: 'direction_practice',
      question: 'In which direction is the T stroke written?',
      options: ["Downward", "Upward", "Horizontal", "Curved"],
      correct: 0,
      explanation: 'T is written as a downward stroke from top to bottom'
    },
    {
      type: 'weight_distinction',
      question: 'What makes B different from P in stroke formation?',
      options: ["Direction", "Weight (thickness)", "Length", "Curvature"],
      correct: 1,
      explanation: 'B is heavy (thick), P is light (thin) - same downward direction'
    },
  ],
  unit_2_formation: [
    {
      type: 'curve_recognition',
      question: 'How is the F sound represented in shorthand?',
      options: ["Light curved stroke", "Heavy curved stroke", "Straight stroke", "Circle"],
      correct: 0,
      explanation: 'F is written as a light curved stroke (voiceless)'
    },
    {
      type: 'th_distinction',
      question: 'The difference between TH in "think" and TH in "the" is:',
      options: ["No difference", "Light vs heavy stroke", "Different directions", "Different lengths"],
      correct: 1,
      explanation: 'Think=voiceless TH (light), The=voiced TH (heavy)'
    },
  ],
  unit_3_formation: [
    {
      type: 'horizontal_practice',
      question: 'Horizontal strokes are written in which direction?',
      options: ["Top to bottom", "Bottom to top", "Left to right", "Right to left"],
      correct: 2,
      explanation: 'All horizontal strokes (K, G, M, N, NG) are written left to right'
    },
  ],
}

export default strokeRecognitionAssessments
