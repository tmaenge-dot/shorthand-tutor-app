// Comprehensive Stroke Formation Reference Guide
// Based on authentic NCS Pitman Shorthand stroke definitions

export const strokeFormationGuide = {
  formationRules: {
    direction_rules: {
      downward: 'Written from top to bottom',
      upward: 'Written from bottom to top',
      horizontal: 'Written from left to right',
      upward_slant: 'Written diagonally upward',
      upward_curve: 'Curved upward motion',
      circle: 'Small circle, written clockwise',
    },
    weight_rules: {
      light: 'Thin stroke for voiceless sounds',
      heavy: 'Thick stroke for voiced sounds',
    },
    pairing_rules: {
      voiced_voiceless: 'Most consonants form pairs based on voicing',
      same_formation: 'Paired consonants use same stroke direction',
      weight_differs: 'Only weight (thickness) distinguishes pairs',
    },
  },
  strokesByUnit: {
    unit_1_straight_downstrokes: {
      title: 'Straight Downstrokes - First Six Consonants',
      description: 'Light or heavy straight strokes written downwards',
      theoryPoints: ["All first six strokes written downwards (P, B, T, D, CH, J)", "Light strokes for voiceless sounds (P, T, CH)", "Heavy strokes for voiced sounds (B, D, J)", "Arrows indicate direction - all written from top to bottom", "Form pairs: P/B, T/D, CH/J based on voicing"]
    },
    unit_2_curved_strokes: {
      title: 'Curved Strokes',
      description: 'Light or heavy curved strokes for fricatives',
      theoryPoints: []
    },
    unit_3_horizontal_strokes: {
      title: 'Horizontal Strokes and Upward Strokes',
      description: 'Horizontal strokes written left to right, upward strokes',
      theoryPoints: []
    },
  }
}

export default strokeFormationGuide
