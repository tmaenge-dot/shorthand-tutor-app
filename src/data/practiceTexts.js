// Enhanced Practice Texts with Vowel Differentiation Focus
// Each unit emphasizes specific vowel types and their usage

export const authenticPracticeTexts = {
  moduleTexts: {
    A: {
      basic: ["Practice second-place dots: pat bat pet bet pit bit.", "Write: The cat sat. Get the pet. Put it up."],
      intermediate: ["The big dog can jump. Pat the pet cat. Get the job done today."],
      vocabulary: ["pat", "bat", "cat", "pet", "bet", "get", "pit", "bit", "hit", "top", "pot", "job", "put", "but", "cut"],
      vowelFocus: 'Second-place dot vowels only: short A, E, I sounds'
    },
    B: {
      basic: ["Compare vowels: bat (short A dot) vs face (long AY dash).", "Practice: safe face have give see she these."],
      intermediate: ["The staff have a safe office. She can see the five files on this page."],
      vocabulary: ["face", "safe", "have", "give", "five", "file", "see", "she", "these", "if", "of", "this", "that"],
      vowelFocus: 'Add second-place dash vowels: long A, E, I sounds'
    },
    C: {
      basic: ["Position writing: make (above line), man (on line), go (through line).", "Practice: The young man can make a good game."],
      intermediate: ["Make way for the long line. The young king can sing a song at home."],
      vocabulary: ["make", "take", "game", "name", "man", "can", "go", "home", "long", "song", "king", "young"],
      vowelFocus: 'Position writing based on first vowel sound'
    },
    D: {
      basic: ["First-place vowels: father (long AH), cat (short A), day (long AY), pen (short E).", "All first-place words go above the line."],
      intermediate: ["Father may take the late date. Add cash to the bank each day."],
      vocabulary: ["father", "may", "day", "take", "make", "late", "date", "fact", "add", "cash", "bank", "pen", "get"],
      vowelFocus: 'Four first-place vowels: long AH, short A, long AY, short E'
    },
    E: {
      basic: ["Third-place vowels: see (long EE), big (short I), go (long O), but (short U).", "All third-place words go through the line."],
      intermediate: ["We can see the big ship go home. Much of the fun run is not yet done."],
      vocabulary: ["see", "fee", "big", "ship", "live", "go", "home", "hope", "but", "much", "run", "fun"],
      vowelFocus: 'Four third-place vowels: long EE, short I, long O, short U'
    },
  }
}

// Function to get module-appropriate practice text
export const getModulePracticeText = (moduleId, difficulty = 'basic') => {
  const moduleTexts = authenticPracticeTexts.moduleTexts[moduleId]
  
  if (!moduleTexts) {
    return 'Practice text not available for this module.'
  }

  const texts = moduleTexts[difficulty] || moduleTexts.basic
  
  if (Array.isArray(texts)) {
    return texts.join(' ')
  }
  
  return texts || 'No practice text available.'
}

// Function to get module-specific vocabulary
export const getModuleVocabulary = (moduleId) => {
  const moduleTexts = authenticPracticeTexts.moduleTexts[moduleId]
  return moduleTexts?.vocabulary || []
}

export default authenticPracticeTexts
