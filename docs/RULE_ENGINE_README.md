"""
Rule engine README

This directory contains a minimal deterministic rule engine for Pitman
shorthand (Unit 1) and a small generator script to produce a bootstrapped
outlines dataset.

How to run (example):

1. Create a Python virtual environment, activate it, and install dependencies:
   python -m venv .venv
   source .venv/bin/activate
   pip install pronouncing

2. Generate dataset:
   python scripts/generate_bootstrap_dataset.py --wordlist data/wordlists/wordlist_sample.txt --out data/outlines/bootstrap_sample.jsonl

Notes
- The rule engine is intentionally small; extend PHONEME_TO_STROKE and
  positioning rules as you encode more units from the reference book.
- For production-scale bootstrapping use a full 5k-10k wordlist (e.g., wordfreq or other corpus).
"""
