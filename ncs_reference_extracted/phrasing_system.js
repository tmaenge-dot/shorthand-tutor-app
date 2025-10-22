// Authentic NCS Phrasing System
// Based on NCS phrasing principles for speed writing

export const phrasingSystem = {
  "definition": "Joining shorthand outlines to increase writing speed",
  "core_rules": [
    "Outlines should only be phrased when they join easily and naturally",
    "The meaning must remain clear",
    "First word in phrase written in normal position",
    "Subsequent words adapt to maintain smooth joining"
  ],
  "common_phrase_types": {
    "article_noun_phrases": {
      "description": "Articles joined to nouns",
      "examples": [
        {
          "phrase": "a man",
          "formation": "a-outline + man-outline joined"
        },
        {
          "phrase": "the time",
          "formation": "the-tick + time-outline"
        },
        {
          "phrase": "an opportunity",
          "formation": "an-outline + opportunity joined"
        }
      ]
    },
    "preposition_phrases": {
      "description": "Prepositions joined to following words",
      "examples": [
        {
          "phrase": "to do",
          "formation": "to-stroke + do-stroke joined"
        },
        {
          "phrase": "of the",
          "formation": "of-outline + the-tick"
        },
        {
          "phrase": "in order",
          "formation": "in-stroke + order-outline"
        }
      ]
    },
    "auxiliary_verb_phrases": {
      "description": "Helper verbs joined to main verbs",
      "examples": [
        {
          "phrase": "should be",
          "formation": "should-outline + be-stroke"
        },
        {
          "phrase": "could do",
          "formation": "could-outline + do-stroke"
        },
        {
          "phrase": "would like",
          "formation": "would-outline + like-outline"
        }
      ]
    },
    "percentage_phrases": {
      "description": "Special percentage phrasing",
      "examples": [
        {
          "phrase": "5 per cent",
          "formation": "5 + per cent sign"
        },
        {
          "phrase": "20 per cent",
          "formation": "20 + per cent sign"
        },
        {
          "phrase": "per annum",
          "formation": "per cent + annum-outline"
        }
      ]
    }
  },
  "the_tick": {
    "description": "Light slanting tick representing \"the\"",
    "usage": "Added at end of words in phrases",
    "examples": [
      "to the",
      "do the",
      "is to the"
    ],
    "rule": "Tick written as light slanting mark at end of preceding outline"
  }
}

export default phrasingSystem
