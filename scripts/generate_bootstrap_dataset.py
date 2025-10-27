"""
Generate a bootstrapped outlines dataset by applying the deterministic
rule engine to a wordlist. The script attempts to obtain phonemes using
the 'pronouncing' package (CMUdict). If that package is not available,
users can provide a phoneme mapping file or extend the script.

Outputs a JSONL file with entries:
{ "word": ..., "phonemes": [...], "rule_outlines": [...], "source": "rule_engine" }

Usage:
  python scripts/generate_bootstrap_dataset.py --wordlist data/wordlists/wordlist_sample.txt \
      --out data/outlines/bootstrap_sample.jsonl

"""
import argparse
import json
import sys
from pathlib import Path

try:
    import pronouncing
except Exception:
    pronouncing = None

from src.rule_engine.rule_engine import phonemes_to_strokes

def word_to_phonemes(word: str):
    word = word.lower()
    if pronouncing:
        phones = pronouncing.phones_for_word(word)
        if phones:
            # take first pronunciation and split into ARPAbet tokens
            return phones[0].split()
        else:
            return []
    else:
        # fallback: naive letter-to-phoneme placeholder — empty to trigger
        # RAW tokens in rule engine
        return []

def generate(wordlist_path: Path, out_path: Path):
    with wordlist_path.open('r', encoding='utf-8') as f:
        words = [w.strip() for w in f if w.strip()]

    with out_path.open('w', encoding='utf-8') as out_f:
        for w in words:
            phonemes = word_to_phonemes(w)
            strokes = phonemes_to_strokes(phonemes if phonemes else [ch.upper() for ch in w])
            entry = {
                'word': w,
                'phonemes': phonemes,
                'rule_outlines': strokes,
                'source': 'rule_engine'
            }
            out_f.write(json.dumps(entry) + '\n')

    print(f'Wrote {out_path} ({len(words)} entries)')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--wordlist', type=str, required=True)
    parser.add_argument('--out', type=str, required=True)
    args = parser.parse_args()

    generate(Path(args.wordlist), Path(args.out))
