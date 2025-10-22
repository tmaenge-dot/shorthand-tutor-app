// Authentic NCS Outline Construction System
// Based on Pitman New Era Shorthand Anniversary Edition

export const outlineConstructionSystem = {
  "principles": {
    "basic_construction": {
      "definition": "An outline is the complete representation of a word using strokes and vowels",
      "components": [
        "Consonant strokes (provide the skeleton)",
        "Vowel signs (provide pronunciation clarity)",
        "Position writing (indicates vowel placement)",
        "Joining rules (connect strokes smoothly)"
      ],
      "formation_steps": [
        "1. Identify all consonant sounds in sequence",
        "2. Choose appropriate strokes for each consonant",
        "3. Determine vowel positions and signs needed",
        "4. Apply position writing rules",
        "5. Connect strokes with proper joining"
      ]
    },
    "position_writing": {
      "first_position": {
        "description": "First stroke written above the line",
        "indicates": "First-place vowels (ah, a, ay, e)",
        "rule": "When first vowel is first-place, write above line"
      },
      "second_position": {
        "description": "First stroke written on the line",
        "indicates": "Second-place vowels (ee, i, o, aw)",
        "rule": "When first vowel is second-place, write on line"
      },
      "third_position": {
        "description": "First stroke written below the line",
        "indicates": "Third-place vowels (oo, ou, u, oy)",
        "rule": "When first vowel is third-place, write below line"
      }
    }
  },
  "learning_progression": {
    "stage_1_simple_outlines": {
      "focus": "Basic word construction with strokes and vowels",
      "examples": [
        {
          "word": "cat",
          "breakdown": "K (horizontal) + short A (first-place) + T (upstroke)",
          "outline_formation": "K-stroke on line (second position for A), T-stroke upward",
          "vowel_placement": "Short A placed at beginning of K-stroke"
        },
        {
          "word": "dog",
          "breakdown": "D (upstroke) + short O (second-place) + G (horizontal)",
          "outline_formation": "D-stroke on line (second position), G-stroke horizontal",
          "vowel_placement": "Short O placed at beginning of D-stroke"
        },
        {
          "word": "book",
          "breakdown": "B (downstroke) + long OO (third-place) + K (horizontal)",
          "outline_formation": "B-stroke below line (third position), K-stroke horizontal",
          "vowel_placement": "Long OO placed at beginning of B-stroke"
        }
      ]
    },
    "stage_2_shortforms": {
      "focus": "Learning abbreviated outlines for common words",
      "examples": [
        {
          "word": "and",
          "regular_outline": "short A + N + D (three strokes)",
          "shortform": "d (single downstroke)",
          "reason": "Extremely common word, saves time and space"
        },
        {
          "word": "the",
          "regular_outline": "TH + long E (two elements)",
          "shortform": "... (three dots)",
          "reason": "Most frequent word in English, needs quick representation"
        },
        {
          "word": "because",
          "regular_outline": "B + long E + K + short AW + S (complex)",
          "shortform": "b-k (joined B and K strokes)",
          "reason": "Common conjunction, complex spelling simplified"
        }
      ]
    },
    "stage_3_simple_phrasing": {
      "focus": "Joining two words smoothly",
      "examples": [
        {
          "phrase": "to do",
          "individual_words": "to (T-stroke) + do (D-stroke)",
          "phrased_form": "T-stroke joined to D-stroke in one motion",
          "speed_benefit": "Eliminates pen lift between words"
        },
        {
          "phrase": "and the",
          "individual_words": "and (d shortform) + the (... or tick)",
          "phrased_form": "d with the-tick attached",
          "speed_benefit": "Very common combination, flows naturally"
        }
      ]
    },
    "stage_4_complex_phrasing": {
      "focus": "Multiple word phrases for high speed",
      "examples": [
        {
          "phrase": "should be able to do",
          "breakdown": "should(shortform) + be(shortform) + able + to(shortform) + do(shortform)",
          "phrased_form": "Continuous outline joining all shortforms",
          "speed_benefit": "Entire phrase written without pen lifts"
        },
        {
          "phrase": "I would like to",
          "breakdown": "I + would(shortform) + like + to(shortform)",
          "phrased_form": "Smooth joining from I through to final T-stroke",
          "speed_benefit": "Common speech pattern, natural flow"
        }
      ]
    }
  }
}

export default outlineConstructionSystem
