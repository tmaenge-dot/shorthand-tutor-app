"""
Simple deterministic rule engine for Pitman shorthand (Unit 1 seed).
This engine maps ARPAbet/phoneme tokens to stroke token sequences using
rules derived from the Pitman Anniversary Edition (Unit 1).

Functions:
- phonemes_to_strokes(phonemes: List[str]) -> List[str]
- apply_positioning(strokes: List[str], word: str) -> List[str]

Note: This is a minimal, extensible implementation intended to bootstrap
training data. It currently supports Unit 1 consonant mappings and
simple vowel handling.
"""

from typing import List

# Minimal canonical stroke ids (Unit 1)
PHONEME_TO_STROKE = {
    # plosives: P (unvoiced) -> U1_P_light, B (voiced) -> U1_B_heavy
    'P': ['U1_P_light'],
    'B': ['U1_B_heavy'],
    # dental/alveolar: T (unvoiced) -> U1_T_light, D (voiced) -> U1_D_heavy
    'T': ['U1_T_light'],
    'D': ['U1_D_heavy'],
    # affricates: CH -> U1_CH_light, JH (J) -> U1_J_heavy (ARPAbet JH)
    'CH': ['U1_CH_light'],
    'JH': ['U1_J_heavy'],
    # fallback: represent other consonants as placeholder tokens
}

# Simple vowel markers for position decisions (placeholder tokens)
VOWEL_MARKERS = {
    'AA': 'V_AA', 'AE': 'V_AE', 'AH': 'V_AH', 'AO': 'V_AO',
    'AW': 'V_AW', 'AY': 'V_AY', 'EH': 'V_EH', 'ER': 'V_ER',
    'EY': 'V_EY', 'IH': 'V_IH', 'IY': 'V_IY', 'OW': 'V_OW',
    'OY': 'V_OY', 'UH': 'V_UH', 'UW': 'V_UW'
}

def phonemes_to_strokes(phonemes: List[str]) -> List[str]:
    """Convert a phoneme token list to a sequence of stroke ids using
    deterministic rules for Unit 1. This function is intentionally simple
    and intended to be extended as more units and rules are encoded.
    """
    strokes: List[str] = []

    for p in phonemes:
        p_upper = p.upper().strip()
        # ARPAbet sometimes includes stress markers on vowels (e.g., 'AH0'),
        # strip trailing digits
        if p_upper and p_upper[-1].isdigit():
            p_upper = p_upper[:-1]

        if p_upper in PHONEME_TO_STROKE:
            strokes.extend(PHONEME_TO_STROKE[p_upper])
        elif p_upper in VOWEL_MARKERS:
            # attach vowel marker token (informational only)
            strokes.append(VOWEL_MARKERS[p_upper])
        else:
            # unknown phoneme: append as RAW_<PHONEME> so downstream tooling
            # can handle or flag for human review
            strokes.append(f'RAW_{p_upper}')

    return strokes

def apply_positioning(strokes: List[str], word: str) -> List[str]:
    """Apply simple positioning rules (placeholder).
    For now this function returns strokes unchanged — it exists so we can
    later implement connection and positional adjustments (e.g., initial,
    medial, final positioning) based on Pitman rules.
    """
    return strokes

if __name__ == '__main__':
    # quick smoke test
    sample = ['P', 'EY']  # pay
    print('Phonemes:', sample)
    print('Strokes:', phonemes_to_strokes(sample))
