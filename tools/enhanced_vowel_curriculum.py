#!/usr/bin/env python3
"""
Enhanced NCS Curriculum with Authentic Vowel Differentiation
Updates the curriculum to properly teach vowel distinctions as per NCS standards
"""

import json
from pathlib import Path

class EnhancedVowelCurriculum:
    def __init__(self):
        # Authentic vowel-based vocabulary progression
        self.unit_vocabulary_with_vowels = {
            1: {  # Unit 1: Straight Downstrokes + Second-place dot vowels
                'title': 'Straight Downstrokes with Second-place Dot Vowels',
                'consonants': ['P', 'B', 'T', 'D', 'CH', 'J'],
                'vowels_taught': {
                    'second_place_dots': {
                        'short_a': {'symbol': 'light dot', 'examples': ['pat', 'bat', 'cat', 'hat', 'mat', 'rat']},
                        'short_e': {'symbol': 'light dot', 'examples': ['pet', 'bet', 'get', 'set', 'let', 'met']},
                        'short_i': {'symbol': 'light dot', 'examples': ['pit', 'bit', 'hit', 'sit', 'fit', 'kit']}
                    }
                },
                'practice_words': [
                    # Only words using P, B, T, D, CH, J + second-place dots
                    'pat', 'bat', 'cat', 'pet', 'bet', 'get', 'pit', 'bit', 'hit',
                    'top', 'pot', 'dot', 'job', 'jab', 'chip', 'chop', 'chat',
                    'tip', 'tap', 'cup', 'cut', 'but', 'put', 'got', 'hot'
                ],
                'theory_focus': [
                    'Light downward stroke for P (voiceless)',
                    'Heavy downward stroke for B (voiced)', 
                    'Light upward stroke for T (voiceless)',
                    'Heavy upward stroke for D (voiced)',
                    'Second-place dot vowels: short A, E, I sounds only'
                ]
            },
            
            2: {  # Unit 2: Curved Strokes + Second-place dash vowels
                'title': 'Curved Strokes with Second-place Dash Vowels',
                'consonants': ['F', 'V', 'TH_light', 'TH_heavy', 'S', 'Z', 'SH', 'ZH'],
                'vowels_taught': {
                    'second_place_dashes': {
                        'long_a': {'symbol': 'heavy dash', 'examples': ['face', 'safe', 'age', 'page', 'sage']},
                        'long_e': {'symbol': 'heavy dash', 'examples': ['these', 'theme', 'fee', 'see', 'she']},
                        'long_i': {'symbol': 'heavy dash', 'examples': ['five', 'file', 'while', 'size', 'wise']}
                    }
                },
                'practice_words': [
                    # Previous unit words + new curved stroke words with appropriate vowels
                    'if', 'of', 'safe', 'face', 'staff', 'five', 'file', 'have', 'give',
                    'this', 'that', 'these', 'those', 'with', 'see', 'she', 'shop', 'fish'
                ] + [
                    # Include appropriate words from Unit 1
                    'pat', 'bat', 'pet', 'bit', 'top', 'job', 'chat'
                ],
                'theory_focus': [
                    'Light curved strokes for voiceless sounds (F, TH)',
                    'Heavy curved strokes for voiced sounds (V, TH)',
                    'Second-place dash vowels: long A, E, I sounds',
                    'Distinction between short dots and long dashes'
                ]
            },
            
            3: {  # Unit 3: Horizontal Strokes + Position Writing
                'title': 'Horizontal Strokes with Position Writing',
                'consonants': ['K', 'G', 'M', 'N', 'NG', 'L', 'W', 'Y'],
                'vowels_taught': {
                    'position_writing': {
                        'first_place_rule': 'Outline above line for first-place vowels',
                        'second_place_rule': 'Outline on line for second-place vowels', 
                        'third_place_rule': 'Outline through line for third-place vowels'
                    }
                },
                'practice_words': [
                    # Horizontal stroke words with clear position writing examples
                    'make', 'take', 'cake', 'game', 'name', 'came', 'same',  # First place
                    'man', 'can', 'get', 'let', 'big', 'dig',  # Second place  
                    'go', 'so', 'home', 'come', 'long', 'song', 'king'  # Third place
                ],
                'theory_focus': [
                    'Horizontal strokes K, G, M, N, NG written left to right',
                    'Upward strokes L, W, Y formation',
                    'Position writing: first vowel determines outline position',
                    'Clear distinction between vowel positions'
                ]
            },
            
            4: {  # Unit 4: First-place Vowels
                'title': 'First-place Vowels - Above the Line',
                'vowels_taught': {
                    'first_place_dots': {
                        'long_ah': {'symbol': 'heavy dot', 'examples': ['pa', 'calm', 'palm', 'pass', 'father'], 'sound': 'AH as in father'},
                        'short_a': {'symbol': 'light dot', 'examples': ['fact', 'at', 'add', 'attach', 'bank'], 'sound': 'A as in cat'}
                    },
                    'first_place_dashes': {
                        'long_ay': {'symbol': 'heavy dash', 'examples': ['may', 'day', 'take', 'make', 'late'], 'sound': 'AY as in day'},
                        'short_e': {'symbol': 'light dash', 'examples': ['pen', 'get', 'let', 'net', 'set'], 'sound': 'E as in pen'}
                    }
                },
                'practice_words': [
                    # First-place vowel words (outline above line)
                    'may', 'day', 'take', 'make', 'late', 'gate', 'date', 'mate',  # Long AY
                    'pa', 'calm', 'palm', 'pass', 'father', 'rather', 'half',  # Long AH
                    'fact', 'at', 'add', 'attach', 'bank', 'cash', 'catch',  # Short A
                    'pen', 'get', 'let', 'net', 'set', 'bed', 'red'  # Short E
                ],
                'theory_focus': [
                    'First-place vowels position outline above the line',
                    'Heavy dot for long AH (as in father)',
                    'Light dot for short A (as in cat)', 
                    'Heavy dash for long AY (as in day)',
                    'Light dash for short E (as in pen)',
                    'Vowel at beginning of stroke'
                ]
            },
            
            5: {  # Unit 5: Third-place Vowels  
                'title': 'Third-place Vowels - Through the Line',
                'vowels_taught': {
                    'third_place_dots': {
                        'long_ee': {'symbol': 'heavy dot', 'examples': ['see', 'fee', 'teach', 'theme', 'deal'], 'sound': 'EE as in see'},
                        'short_i': {'symbol': 'light dot', 'examples': ['if', 'big', 'ship', 'live', 'ill'], 'sound': 'I as in bit'}
                    },
                    'third_place_dashes': {
                        'long_o': {'symbol': 'heavy dash', 'examples': ['go', 'so', 'home', 'hope', 'note'], 'sound': 'O as in go'},
                        'short_u': {'symbol': 'light dash', 'examples': ['but', 'cut', 'much', 'such', 'run'], 'sound': 'U as in but'}
                    }
                },
                'practice_words': [
                    # Third-place vowel words (outline through line)
                    'see', 'fee', 'teach', 'theme', 'deal', 'leave', 'team',  # Long EE
                    'if', 'big', 'ship', 'live', 'ill', 'bill', 'thick',  # Short I
                    'go', 'so', 'home', 'hope', 'note', 'vote', 'quote',  # Long O
                    'but', 'cut', 'much', 'such', 'run', 'sun', 'fun'  # Short U
                ],
                'theory_focus': [
                    'Third-place vowels position outline through the line',
                    'Heavy dot for long EE (as in see)',
                    'Light dot for short I (as in bit)',
                    'Heavy dash for long O (as in go)', 
                    'Light dash for short U (as in but)',
                    'Vowel at end of stroke'
                ]
            }
        }
    
    def generate_vowel_differentiation_assessments(self):
        """Generate assessment questions focusing on vowel differentiation"""
        assessments = {
            'A': [  # Unit 1 - Focus on second-place dots only
                {
                    'id': 'A1',
                    'question': 'The word "bat" uses which vowel sound and symbol?',
                    'options': ['Short A - light dot in second place', 'Long A - heavy dot in first place', 'Short E - light dot', 'Long AY - heavy dash'],
                    'correct': 0,
                    'explanation': 'Bat has the short A sound, written as a light dot in second place (middle of stroke)'
                },
                {
                    'id': 'A2', 
                    'question': 'In Unit 1, which vowel positions are taught?',
                    'options': ['First place only', 'Second place dots only', 'Third place only', 'All positions'],
                    'correct': 1,
                    'explanation': 'Unit 1 teaches only second-place dot vowels: short A, E, I'
                },
                {
                    'id': 'A3',
                    'question': 'The difference between P and B strokes is:',
                    'options': ['Direction only', 'Thickness (light vs heavy)', 'Position only', 'No difference'],
                    'correct': 1,
                    'explanation': 'P is light (voiceless), B is heavy (voiced) - same downward direction'
                }
            ],
            
            'B': [  # Unit 2 - Add second-place dashes
                {
                    'id': 'B1',
                    'question': 'The word "face" contains which type of A vowel?',
                    'options': ['Short A (light dot)', 'Long A (heavy dash)', 'Long AH (heavy dot)', 'Same as "cat"'],
                    'correct': 1, 
                    'explanation': 'Face has the long AY sound, written as a heavy dash in second place'
                },
                {
                    'id': 'B2',
                    'question': 'What is the difference between dots and dashes in vowel symbols?',
                    'options': ['No difference', 'Dots for consonants, dashes for vowels', 'Dots for short sounds, dashes for long sounds', 'Dots for first place, dashes for second'],
                    'correct': 2,
                    'explanation': 'Generally, dots represent shorter vowel sounds, dashes represent longer vowel sounds'
                },
                {
                    'id': 'B3',
                    'question': 'Which stroke type represents the F sound?',
                    'options': ['Heavy curved stroke', 'Light curved stroke', 'Straight stroke', 'Circle'],
                    'correct': 1,
                    'explanation': 'F is voiceless, so uses a light curved stroke'
                }
            ],
            
            'C': [  # Unit 3 - Position writing
                {
                    'id': 'C1',
                    'question': 'Where would you write the outline for the word "make"?',
                    'options': ['Above the line', 'On the line', 'Through the line', 'Below the line'],
                    'correct': 0,
                    'explanation': 'Make begins with long AY sound, which is a first-place vowel, so outline goes above the line'
                },
                {
                    'id': 'C2',
                    'question': 'The word "man" would be written:',
                    'options': ['Above the line (first place)', 'On the line (second place)', 'Through the line (third place)', 'Position doesn\'t matter'],
                    'correct': 1,
                    'explanation': 'Man has short A, which is a second-place vowel, so outline stays on the line'
                },
                {
                    'id': 'C3',
                    'question': 'Horizontal strokes include:',
                    'options': ['P, B, T, D', 'F, V, TH, S', 'K, G, M, N, NG', 'All consonants'],
                    'correct': 2,
                    'explanation': 'K, G, M, N, NG are the horizontal strokes, written left to right'
                }
            ],
            
            'D': [  # Unit 4 - First-place vowels
                {
                    'id': 'D1',
                    'question': 'The A sound in "father" is represented by:',
                    'options': ['Light dot in first place', 'Heavy dot in first place', 'Light dot in second place', 'Heavy dash in first place'],
                    'correct': 1,
                    'explanation': 'Father has long AH sound - heavy dot in first place'
                },
                {
                    'id': 'D2',
                    'question': 'What\'s the difference between the A in "cat" and "father"?',
                    'options': ['Same vowel', 'Cat=short A (light), Father=long AH (heavy)', 'Different positions only', 'No difference'],
                    'correct': 1,
                    'explanation': 'Cat has short A (light dot), Father has long AH (heavy dot), different sounds'
                },
                {
                    'id': 'D3',
                    'question': 'First-place vowels are written:',
                    'options': ['At end of stroke', 'In middle of stroke', 'At beginning of stroke', 'Anywhere on stroke'],
                    'correct': 2,
                    'explanation': 'First-place vowels are always written at the beginning of the stroke'
                }
            ],
            
            'E': [  # Unit 5 - Third-place vowels
                {
                    'id': 'E1',
                    'question': 'The word "see" uses which vowel and position?',
                    'options': ['Short E in second place', 'Long EE in third place', 'Short I in first place', 'Long AY in third place'],
                    'correct': 1,
                    'explanation': 'See has long EE sound - heavy dot in third place (end of stroke)'
                },
                {
                    'id': 'E2',
                    'question': 'How do you write the outline for a word starting with a third-place vowel?',
                    'options': ['Above the line', 'On the line', 'Through the line', 'Below the line'],
                    'correct': 2,
                    'explanation': 'Third-place vowels require the outline to be written through the line'
                },
                {
                    'id': 'E3',
                    'question': 'The U sound in "but" is:',
                    'options': ['Long U - heavy dash', 'Short U - light dash', 'Short I - light dot', 'Long O - heavy dash'],
                    'correct': 1,
                    'explanation': 'But has short U sound - light dash in third place'
                }
            ]
        }
        return assessments
    
    def generate_vowel_focused_practice_texts(self):
        """Generate practice texts that emphasize vowel differentiation"""
        practice_texts = {
            'A': {
                'basic': [
                    'Practice second-place dots: pat bat pet bet pit bit.',
                    'Write: The cat sat. Get the pet. Put it up.'
                ],
                'intermediate': [
                    'The big dog can jump. Pat the pet cat. Get the job done today.'
                ],
                'vocabulary': ['pat', 'bat', 'cat', 'pet', 'bet', 'get', 'pit', 'bit', 'hit', 'top', 'pot', 'job', 'put', 'but', 'cut'],
                'vowel_focus': 'Second-place dot vowels only: short A, E, I sounds'
            },
            
            'B': {
                'basic': [
                    'Compare vowels: bat (short A dot) vs face (long AY dash).',
                    'Practice: safe face have give see she these.'
                ],
                'intermediate': [
                    'The staff have a safe office. She can see the five files on this page.'
                ],
                'vocabulary': ['face', 'safe', 'have', 'give', 'five', 'file', 'see', 'she', 'these', 'if', 'of', 'this', 'that'],
                'vowel_focus': 'Add second-place dash vowels: long A, E, I sounds'
            },
            
            'C': {
                'basic': [
                    'Position writing: make (above line), man (on line), go (through line).',
                    'Practice: The young man can make a good game.'
                ],
                'intermediate': [
                    'Make way for the long line. The young king can sing a song at home.'
                ],
                'vocabulary': ['make', 'take', 'game', 'name', 'man', 'can', 'go', 'home', 'long', 'song', 'king', 'young'],
                'vowel_focus': 'Position writing based on first vowel sound'
            },
            
            'D': {
                'basic': [
                    'First-place vowels: father (long AH), cat (short A), day (long AY), pen (short E).',
                    'All first-place words go above the line.'
                ],
                'intermediate': [
                    'Father may take the late date. Add cash to the bank each day.'
                ],
                'vocabulary': ['father', 'may', 'day', 'take', 'make', 'late', 'date', 'fact', 'add', 'cash', 'bank', 'pen', 'get'],
                'vowel_focus': 'Four first-place vowels: long AH, short A, long AY, short E'
            },
            
            'E': {
                'basic': [
                    'Third-place vowels: see (long EE), big (short I), go (long O), but (short U).',
                    'All third-place words go through the line.'
                ],
                'intermediate': [
                    'We can see the big ship go home. Much of the fun run is not yet done.'
                ],
                'vocabulary': ['see', 'fee', 'big', 'ship', 'live', 'go', 'home', 'hope', 'but', 'much', 'run', 'fun'],
                'vowel_focus': 'Four third-place vowels: long EE, short I, long O, short U'
            }
        }
        return practice_texts
    
    def create_enhanced_curriculum_files(self, output_dir):
        """Create enhanced curriculum files with proper vowel differentiation"""
        output_path = Path(output_dir)
        
        # Generate enhanced assessments
        assessments = self.generate_vowel_differentiation_assessments()
        self.save_enhanced_assessments(output_path / 'enhanced_vowel_assessments.js', assessments)
        
        # Generate vowel-focused practice texts
        practice_texts = self.generate_vowel_focused_practice_texts()
        self.save_enhanced_practice_texts(output_path / 'enhanced_vowel_practice_texts.js', practice_texts)
        
        # Generate vowel reference guide
        self.save_vowel_reference_guide(output_path / 'vowel_differentiation_guide.js')
    
    def save_enhanced_assessments(self, file_path, assessments):
        """Save enhanced assessment questions with vowel focus"""
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write("// Enhanced NCS Assessment Questions with Vowel Differentiation\n")
            f.write("// Focuses on teaching proper vowel distinctions and usage\n\n")
            f.write("export const enhancedVowelAssessments = {\n")
            
            for module_id, questions in assessments.items():
                f.write(f"  {module_id}: [\n")
                for q in questions:
                    f.write(f"    {{\n")
                    f.write(f"      id: '{q['id']}',\n")
                    f.write(f"      question: '{q['question']}',\n")
                    f.write(f"      options: {json.dumps(q['options'])},\n")
                    f.write(f"      correct: {q['correct']},\n")
                    f.write(f"      explanation: '{q['explanation']}'\n")
                    f.write(f"    }},\n")
                f.write(f"  ],\n")
            
            f.write("}\n\n")
            f.write("export default enhancedVowelAssessments\n")
    
    def save_enhanced_practice_texts(self, file_path, practice_texts):
        """Save practice texts with vowel focus"""
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write("// Enhanced Practice Texts with Vowel Differentiation Focus\n")
            f.write("// Each unit emphasizes specific vowel types and their usage\n\n")
            f.write("export const enhancedVowelPracticeTexts = {\n")
            f.write("  moduleTexts: {\n")
            
            for module_id, module_data in practice_texts.items():
                f.write(f"    {module_id}: {{\n")
                f.write(f"      basic: {json.dumps(module_data['basic'])},\n")
                f.write(f"      intermediate: {json.dumps(module_data['intermediate'])},\n")
                f.write(f"      vocabulary: {json.dumps(module_data['vocabulary'])},\n")
                f.write(f"      vowelFocus: '{module_data['vowel_focus']}'\n")
                f.write(f"    }},\n")
            
            f.write("  }\n")
            f.write("}\n\n")
            f.write("export default enhancedVowelPracticeTexts\n")
    
    def save_vowel_reference_guide(self, file_path):
        """Save comprehensive vowel reference guide"""
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write("// Comprehensive Vowel Differentiation Reference Guide\n")
            f.write("// Based on authentic NCS Pitman Shorthand principles\n\n")
            f.write("export const vowelDifferentiationGuide = {\n")
            
            f.write("  positions: {\n")
            f.write("    first_place: {\n")
            f.write("      rule: 'Outline above the line, vowel at beginning of stroke',\n")
            f.write("      vowels: {\n")
            f.write("        long_ah: { symbol: 'heavy dot', sound: 'AH as in father', examples: ['father', 'palm', 'calm'] },\n")
            f.write("        short_a: { symbol: 'light dot', sound: 'A as in cat', examples: ['cat', 'bat', 'hat'] },\n")
            f.write("        long_ay: { symbol: 'heavy dash', sound: 'AY as in day', examples: ['day', 'may', 'take'] },\n")
            f.write("        short_e: { symbol: 'light dash', sound: 'E as in pen', examples: ['pen', 'get', 'let'] }\n")
            f.write("      }\n")
            f.write("    },\n")
            
            f.write("    second_place: {\n")
            f.write("      rule: 'Outline on the line, vowel in middle of stroke',\n")
            f.write("      vowels: {\n")
            f.write("        long_ar: { symbol: 'heavy dot', sound: 'AR as in car', examples: ['car', 'part', 'hard'] },\n")
            f.write("        short_a: { symbol: 'light dot', sound: 'A as in man', examples: ['man', 'can', 'had'] },\n")
            f.write("        long_ay: { symbol: 'heavy dash', sound: 'AY as in say', examples: ['say', 'way', 'face'] },\n")
            f.write("        short_e: { symbol: 'light dash', sound: 'E as in bet', examples: ['bet', 'set', 'net'] }\n")
            f.write("      }\n")
            f.write("    },\n")
            
            f.write("    third_place: {\n")
            f.write("      rule: 'Outline through the line, vowel at end of stroke',\n")
            f.write("      vowels: {\n")
            f.write("        long_ee: { symbol: 'heavy dot', sound: 'EE as in see', examples: ['see', 'fee', 'tree'] },\n")
            f.write("        short_i: { symbol: 'light dot', sound: 'I as in bit', examples: ['bit', 'big', 'ship'] },\n")
            f.write("        long_o: { symbol: 'heavy dash', sound: 'O as in go', examples: ['go', 'so', 'home'] },\n")
            f.write("        short_u: { symbol: 'light dash', sound: 'U as in but', examples: ['but', 'cut', 'run'] }\n")
            f.write("      }\n")
            f.write("    }\n")
            f.write("  },\n")
            
            f.write("  mnemonics: {\n")
            f.write("    authentic_ncs: ['Pa may we', 'All go too', 'That pen is', 'Not much good'],\n")
            f.write("    explanation: 'From NCS textbook - helps remember vowel order and position'\n")
            f.write("  },\n")
            
            f.write("  commonConfusions: [\n")
            f.write("    { confusion: 'A in cat vs A in car', solution: 'Cat=short A (light dot, first), Car=long AR (heavy dot, second)' },\n")
            f.write("    { confusion: 'A in day vs A in say', solution: 'Both long AY but different positions: Day=first place, Say=second place' },\n")
            f.write("    { confusion: 'Heavy vs light symbols', solution: 'Heavy=long sounds, Light=short sounds' }\n")
            f.write("  ]\n")
            
            f.write("}\n\n")
            f.write("export default vowelDifferentiationGuide\n")

def main():
    curriculum = EnhancedVowelCurriculum()
    curriculum.create_enhanced_curriculum_files('/home/oem/Desktop/Shorthand/ncs_reference_extracted')
    print("✅ Enhanced vowel differentiation curriculum created!")
    print("📚 Files generated:")
    print("   - enhanced_vowel_assessments.js")
    print("   - enhanced_vowel_practice_texts.js") 
    print("   - vowel_differentiation_guide.js")

if __name__ == "__main__":
    main()