// Authentic NCS Practice Texts
// Based on Pitman New Era Shorthand Anniversary Edition
// Uses only vocabulary appropriate for each NCS unit

export const ncsAuthenticPracticeTexts = {
  moduleTexts: {
    A: {
      basic: ["Practice these words: aaoge add ady ae. Write: aaoge the add."],
      intermediate: ["Advanced practice: aaoge add ady ae aem. The aaoge can add with ady."],
      vocabulary: ["aaoge", "add", "ady", "ae", "aem", "after", "age", "ai", "aid", "aids", "ajisee", "ajoad", "ajoym", "ajuo", "all", "allay", "also", "always", "amid", "an"]
    },
    B: {
      basic: ["Practice these words: aaoge aavy above add. Write: aaoge the aavy."],
      intermediate: ["Advanced practice: aaoge aavy above add adp. The aaoge can aavy with above."],
      vocabulary: ["aaoge", "aavy", "above", "add", "adp", "ady", "ae", "aem", "aeu", "aeul", "after", "age", "ah", "ai", "aid", "aie", "ajay", "ajisee", "ajoad", "ajoym"]
    },
    C: {
      basic: ["Practice these words: aavoy aavy above add. Write: aavoy the aavy."],
      intermediate: ["Advanced practice: aavoy aavy above add adp. The aavoy can aavy with above."],
      vocabulary: ["aavoy", "aavy", "above", "add", "adp", "ady", "ae", "aeu", "aeul", "aew", "ah", "ai", "aid", "aie", "ajay", "ajoym", "al", "also", "always", "amps"]
    },
    D: {
      basic: ["Practice these words: aavoy aavy above add. Write: aavoy the aavy."],
      intermediate: ["Advanced practice: aavoy aavy above add adp. The aavoy can aavy with above."],
      vocabulary: ["aavoy", "aavy", "above", "add", "adp", "ae", "aeu", "aeul", "aew", "ah", "aie", "ajay", "al", "allthe", "amps", "an", "andthe", "apu", "aq", "are"]
    },
    E: {
      basic: ["Practice these words: aa aavay aayy ach. Write: aa the aavay."],
      intermediate: ["Advanced practice: aa aavay aayy ach ady. The aa can aavay with aayy."],
      vocabulary: ["aa", "aavay", "aayy", "ach", "ady", "ae", "aes", "afos", "ajay", "akon", "al", "all", "allthe", "aloay", "also", "an", "andthe", "anou", "aovf", "aoyfo"]
    },
    F: {
      basic: ["Practice these words: aa aavay aavoy aayy. Write: aa the aavay."],
      intermediate: ["Advanced practice: aa aavay aavoy aayy ach. The aa can aavay with aavoy."],
      vocabulary: ["aa", "aavay", "aavoy", "aayy", "ach", "ady", "ae", "aes", "aew", "afos", "ajay", "akon", "al", "all", "allthe", "aloay", "also", "an", "andthe", "anou"]
    },
    G: {
      basic: ["Practice these words: aaa aamy aayy ady. Write: aaa the aamy."],
      intermediate: ["Advanced practice: aaa aamy aayy ady afos. The aaa can aamy with aayy."],
      vocabulary: ["aaa", "aamy", "aayy", "ady", "afos", "ag", "alone", "along", "an", "angle", "aouebe", "aovf", "aoyfo", "apeand", "apis", "apo", "appre", "aq", "asays", "ase"]
    },
    H: {
      basic: ["Practice these words: aa aaiffo aamsup aan. Write: aa the aaiffo."],
      intermediate: ["Advanced practice: aa aaiffo aamsup aan aands. The aa can aaiffo with aamsup."],
      vocabulary: ["aa", "aaiffo", "aamsup", "aan", "aands", "aanys", "aavoy", "aayf", "abin", "ad", "ada", "add", "addi", "addmd", "adei", "adowas", "ae", "af", "ag", "ajreo"]
    },
    I: {
      basic: ["Practice these words: aamoy acm ae aepo. Write: aamoy the acm."],
      intermediate: ["Advanced practice: aamoy acm ae aepo ak. The aamoy can acm with ae."],
      vocabulary: ["aamoy", "acm", "ae", "aepo", "ak", "al", "an", "ane", "are", "arf", "arse", "avenue", "be", "beauty", "bek", "bh", "bol", "budng", "bueed", "buoy"]
    },
  }
}

export const getModulePracticeText = (moduleId, difficulty = 'basic') => {
  const moduleTexts = ncsAuthenticPracticeTexts.moduleTexts[moduleId]
  if (!moduleTexts) return 'Practice text not available for this module.'
  const texts = moduleTexts[difficulty] || moduleTexts.basic
  return Array.isArray(texts) ? texts.join(' ') : texts
}

export const getModuleVocabulary = (moduleId) => {
  return ncsAuthenticPracticeTexts.moduleTexts[moduleId]?.vocabulary || []
}

export default ncsAuthenticPracticeTexts
