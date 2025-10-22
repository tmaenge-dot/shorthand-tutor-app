// Comprehensive Vowel Differentiation Reference Guide
// Based on authentic NCS Pitman Shorthand principles

export const vowelDifferentiationGuide = {
  positions: {
    first_place: {
      rule: 'Outline above the line, vowel at beginning of stroke',
      vowels: {
        long_ah: { symbol: 'heavy dot', sound: 'AH as in father', examples: ['father', 'palm', 'calm'] },
        short_a: { symbol: 'light dot', sound: 'A as in cat', examples: ['cat', 'bat', 'hat'] },
        long_ay: { symbol: 'heavy dash', sound: 'AY as in day', examples: ['day', 'may', 'take'] },
        short_e: { symbol: 'light dash', sound: 'E as in pen', examples: ['pen', 'get', 'let'] }
      }
    },
    second_place: {
      rule: 'Outline on the line, vowel in middle of stroke',
      vowels: {
        long_ar: { symbol: 'heavy dot', sound: 'AR as in car', examples: ['car', 'part', 'hard'] },
        short_a: { symbol: 'light dot', sound: 'A as in man', examples: ['man', 'can', 'had'] },
        long_ay: { symbol: 'heavy dash', sound: 'AY as in say', examples: ['say', 'way', 'face'] },
        short_e: { symbol: 'light dash', sound: 'E as in bet', examples: ['bet', 'set', 'net'] }
      }
    },
    third_place: {
      rule: 'Outline through the line, vowel at end of stroke',
      vowels: {
        long_ee: { symbol: 'heavy dot', sound: 'EE as in see', examples: ['see', 'fee', 'tree'] },
        short_i: { symbol: 'light dot', sound: 'I as in bit', examples: ['bit', 'big', 'ship'] },
        long_o: { symbol: 'heavy dash', sound: 'O as in go', examples: ['go', 'so', 'home'] },
        short_u: { symbol: 'light dash', sound: 'U as in but', examples: ['but', 'cut', 'run'] }
      }
    }
  },
  mnemonics: {
    authentic_ncs: ['Pa may we', 'All go too', 'That pen is', 'Not much good'],
    explanation: 'From NCS textbook - helps remember vowel order and position'
  },
  commonConfusions: [
    { confusion: 'A in cat vs A in car', solution: 'Cat=short A (light dot, first), Car=long AR (heavy dot, second)' },
    { confusion: 'A in day vs A in say', solution: 'Both long AY but different positions: Day=first place, Say=second place' },
    { confusion: 'Heavy vs light symbols', solution: 'Heavy=long sounds, Light=short sounds' }
  ]
}

export default vowelDifferentiationGuide
