// Stroke Visualization Data
// SVG paths and formation data for interactive stroke learning

export const strokeVisualizationData = {
  "unit_1_straight_downstrokes": {
    "title": "Straight Downstrokes - First Six Consonants",
    "description": "Light or darker straight strokes written downwards",
    "strokes": [
      {
        "consonant": "P",
        "sound": "Pay",
        "formation": "Light straight downstroke",
        "direction": "downward",
        "weight": "light",
        "svg_path": "M 50 20 L 50 80",
        "examples": [
          "pay",
          "tape",
          "cup"
        ],
        "pairs_with": "B"
      },
      {
        "consonant": "B",
        "sound": "Bee",
        "formation": "Heavy straight downstroke",
        "direction": "downward",
        "weight": "heavy",
        "svg_path": "M 50 20 L 50 80",
        "examples": [
          "be",
          "rebate",
          "job"
        ],
        "pairs_with": "P"
      },
      {
        "consonant": "T",
        "sound": "Tee",
        "formation": "Light straight downstroke",
        "direction": "downward",
        "weight": "light",
        "svg_path": "M 50 20 L 50 80",
        "examples": [
          "take",
          "ate",
          "cat"
        ],
        "pairs_with": "D"
      },
      {
        "consonant": "D",
        "sound": "Dee",
        "formation": "Heavy straight downstroke",
        "direction": "downward",
        "weight": "heavy",
        "svg_path": "M 50 20 L 50 80",
        "examples": [
          "day",
          "edit",
          "had"
        ],
        "pairs_with": "T"
      },
      {
        "consonant": "CH",
        "sound": "Chay",
        "formation": "Light slanted downstroke",
        "direction": "downward",
        "weight": "light",
        "svg_path": "M 30 20 L 70 80",
        "examples": [
          "cheque",
          "etch",
          "much"
        ],
        "pairs_with": "J"
      },
      {
        "consonant": "J",
        "sound": "Jay",
        "formation": "Heavy slanted downstroke",
        "direction": "downward",
        "weight": "heavy",
        "svg_path": "M 30 20 L 70 80",
        "examples": [
          "jet",
          "edge",
          "large"
        ],
        "pairs_with": "CH"
      }
    ]
  },
  "unit_2_curved_strokes": {
    "title": "Curved Strokes",
    "description": "Light or heavy curved strokes for fricatives",
    "strokes": [
      {
        "consonant": "F",
        "sound": "Ef",
        "formation": "Light curved stroke",
        "direction": "upward_curve",
        "weight": "light",
        "svg_path": "M 20 80 Q 50 50 80 20",
        "examples": [
          "if",
          "of",
          "staff"
        ],
        "pairs_with": "V"
      },
      {
        "consonant": "V",
        "sound": "Vee",
        "formation": "Heavy curved stroke",
        "direction": "upward_curve",
        "weight": "heavy",
        "svg_path": "M 20 80 Q 50 50 80 20",
        "examples": [
          "have",
          "give",
          "voice"
        ],
        "pairs_with": "F"
      },
      {
        "consonant": "TH_light",
        "sound": "Ith",
        "formation": "Light curved stroke (voiceless TH)",
        "direction": "upward_curve_steep",
        "weight": "light",
        "svg_path": "M 15 80 Q 50 40 85 20",
        "examples": [
          "think",
          "with",
          "path"
        ],
        "pairs_with": "TH_heavy"
      },
      {
        "consonant": "TH_heavy",
        "sound": "Thee",
        "formation": "Heavy curved stroke (voiced TH)",
        "direction": "upward_curve_steep",
        "weight": "heavy",
        "svg_path": "M 15 80 Q 50 40 85 20",
        "examples": [
          "the",
          "that",
          "this"
        ],
        "pairs_with": "TH_light"
      },
      {
        "consonant": "S",
        "sound": "Ess",
        "formation": "Small circle (clockwise)",
        "direction": "circle",
        "weight": "light",
        "svg_path": "M 60 50 A 10 10 0 1 1 40 50 A 10 10 0 1 1 60 50",
        "examples": [
          "so",
          "see",
          "his"
        ],
        "pairs_with": "Z"
      },
      {
        "consonant": "SH",
        "sound": "Esh",
        "formation": "Light curved stroke (shallow)",
        "direction": "downward_curve",
        "weight": "light",
        "svg_path": "M 20 20 Q 50 50 80 80",
        "examples": [
          "she",
          "shop",
          "fish"
        ],
        "pairs_with": "ZH"
      }
    ]
  },
  "unit_3_horizontal_strokes": {
    "title": "Horizontal Strokes and Upward Strokes",
    "description": "Horizontal strokes written left to right, upward strokes",
    "strokes": [
      {
        "consonant": "K",
        "sound": "Kay",
        "formation": "Light horizontal stroke",
        "direction": "horizontal",
        "weight": "light",
        "svg_path": "M 20 50 L 80 50",
        "examples": [
          "key",
          "make",
          "back"
        ],
        "pairs_with": "G"
      },
      {
        "consonant": "G",
        "sound": "Gay",
        "formation": "Heavy horizontal stroke",
        "direction": "horizontal",
        "weight": "heavy",
        "svg_path": "M 20 50 L 80 50",
        "examples": [
          "go",
          "big",
          "bag"
        ],
        "pairs_with": "K"
      },
      {
        "consonant": "M",
        "sound": "Em",
        "formation": "Heavy horizontal stroke",
        "direction": "horizontal",
        "weight": "heavy",
        "svg_path": "M 20 50 L 80 50",
        "examples": [
          "my",
          "me",
          "some"
        ],
        "pairs_with": "N"
      },
      {
        "consonant": "N",
        "sound": "En",
        "formation": "Light horizontal stroke",
        "direction": "horizontal",
        "weight": "light",
        "svg_path": "M 20 50 L 80 50",
        "examples": [
          "no",
          "one",
          "can"
        ],
        "pairs_with": "M"
      },
      {
        "consonant": "NG",
        "sound": "Ing",
        "formation": "Heavy horizontal stroke",
        "direction": "horizontal",
        "weight": "heavy",
        "svg_path": "M 20 50 L 80 50",
        "examples": [
          "going",
          "coming",
          "working"
        ],
        "pairs_with": null
      },
      {
        "consonant": "L",
        "sound": "El",
        "formation": "Light upward stroke",
        "direction": "upward",
        "weight": "light",
        "svg_path": "M 50 80 L 50 20",
        "examples": [
          "let",
          "all",
          "will"
        ],
        "pairs_with": null
      }
    ]
  }
}

export default strokeVisualizationData
