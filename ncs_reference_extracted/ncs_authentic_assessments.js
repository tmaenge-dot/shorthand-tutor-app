// Authentic NCS Assessment Questions
// Based on Pitman New Era Shorthand Anniversary Edition
// Restructured to follow exact NCS unit progression

export const ncsAuthenticAssessmentQuestions = {
  A: [
    {
      id: 'A1_1',
      question: 'Which of the following represents the consonant P (Pay)?',
      options: ["Heavy downward stroke", "Light downward stroke", "Light upward stroke", "Heavy upward stroke"],
      correct: 1,
      explanation: 'P (Pay) is represented by a light downward stroke'
    },
    {
      id: 'A1_2',
      question: 'The difference between B and P strokes is:',
      options: ["Direction only", "Thickness only", "Both direction and thickness", "Position only"],
      correct: 1,
      explanation: 'B is heavy (thick) while P is light (thin), same downward direction'
    },
    {
      id: 'A1_3',
      question: 'Second-place dot vowels are positioned:',
      options: ["Above the stroke", "Below the stroke", "To the right of the stroke", "To the left of the stroke"],
      correct: 2,
      explanation: 'Second-place vowels are written to the right of consonant strokes'
    },
  ],

  B: [
    {
      id: 'A2_1',
      question: 'Curved strokes include all of the following EXCEPT:',
      options: ["F and V", "TH (ith) and TH (thee)", "S and Z", "P and B"],
      correct: 3,
      explanation: 'P and B are straight strokes, not curved strokes'
    },
    {
      id: 'A2_2',
      question: 'Second-place dash vowels represent:',
      options: ["Short vowel sounds", "Long vowel sounds like AW, E (day), I (eye)", "All vowel sounds", "No vowel sounds"],
      correct: 1,
      explanation: 'Second-place dash vowels represent long vowel sounds'
    },
  ],

  C: [
  ],

  D: [
  ],

  E: [
  ],

  F: [
  ],

  G: [
  ],

  H: [
  ],

  I: [
  ],

}

export const getModuleAssessmentQuestions = (moduleId, numberOfQuestions = 5) => {
  return ncsAuthenticAssessmentQuestions[moduleId] || []
}

export default ncsAuthenticAssessmentQuestions
