"""
Extended deterministic rule engine for Pitman shorthand (Units 1-3).
Maps ARPAbet phoneme tokens to stroke token sequences and applies simple
positioning (initial/medial/final) markers. Intended for bootstrapping
training data and as a baseline generator.
"""

from typing import List

# Extended canonical stroke ids (Units 1-3 sample)
PHONEME_TO_STROKE = {
    # Unit 1 - straight strokes
    'P': ['U1_P_light'], 'B': ['U1_B_heavy'],
    'T': ['U1_T_light'], 'D': ['U1_D_heavy'],
    'CH': ['U1_CH_light'], 'JH': ['U1_J_heavy'],
    # Unit 2 - curved/fricatives
    'F': ['U2_F_light'], 'V': ['U2_V_heavy'],
    'TH': ['U2_TH_light'], 'DH': ['U2_DH_heavy'],
    'S': ['U2_S_circle'], 'SH': ['U2_SH_curve'],
    # Unit 3 - horizontals/velars and nasals
    'K': ['U3_K_light'], 'G': ['U3_G_heavy'],
    'M': ['U3_M_short'], 'N': ['U3_N_short'], 'NG': ['U3_NG_connect']
}

VOWEL_MARKERS = {
    'AA': 'V_AA', 'AE': 'V_AE', 'AH': 'V_AH', 'AO': 'V_AO',
    'AW': 'V_AW', 'AY': 'V_AY', 'EH': 'V_EH', 'ER': 'V_ER',
    'EY': 'V_EY', 'IH': 'V_IH', 'IY': 'V_IY', 'OW': 'V_OW',
    'OY': 'V_OY', 'UH': 'V_UH', 'UW': 'V_UW'
}

POSITION_TOKENS = {
    'initial': 'POS_INITIAL',
    'medial': 'POS_MEDIAL',
    'final': 'POS_FINAL'
}

def phonemes_to_strokes(phonemes: List[str]) -> List[str]:
    """Convert phoneme list to stroke id sequence using deterministic rules.
    Unknown phonemes produce RAW_<PHONEME> tokens for later review.
    """
    strokes: List[str] = []

    for p in phonemes:
        p_upper = p.upper().strip()
        # strip stress digits for vowels (e.g., AH0 -> AH)
        if p_upper and p_upper[-1].isdigit():
            p_upper = p_upper[:-1]

        if p_upper in PHONEME_TO_STROKE:
            strokes.extend(PHONEME_TO_STROKE[p_upper])
        elif p_upper in VOWEL_MARKERS:
            strokes.append(VOWEL_MARKERS[p_upper])
        else:
            strokes.append(f'RAW_{p_upper}')

    return strokes

def apply_positioning(strokes: List[str], idx: int, total: int) -> List[str]:
    """Annotate stroke sequence with a simple position token depending on
    whether it occurs at the initial, medial, or final position in the word.
    For now we prepend a position token to each stroke token.
    idx: the index of the current token (0-based)
    total: total number of tokens (phoenemes)
    """
    if total <= 1:
        pos = POSITION_TOKENS['initial']
    elif idx == 0:
        pos = POSITION_TOKENS['initial']
    elif idx == total - 1:
        pos = POSITION_TOKENS['final']
    else:
        pos = POSITION_TOKENS['medial']

    # Prepend the position token to each stroke in this simple scheme
    return [f"{pos}|{s}" for s in strokes]

if __name__ == '__main__':
    # quick smoke test
    sample = ['CH', 'EH', 'R']  # chair
    base = phonemes_to_strokes(sample)
    combined = []
    for i, p in enumerate(sample):
        strokes = phonemes_to_strokes([p])
        combined.extend(apply_positioning(strokes, i, len(sample)))
    print('Phonemes:', sample)
    print('Strokes:', combined)