#!/usr/bin/env python3
"""
Authentic NCS Vowel Classification System
Based on Pitman New Era Shorthand Anniversary Edition
Extracts and implements the correct vowel usage and differentiation
"""

class AuthenticVowelSystem:
    def __init__(self):
        # Authentic NCS vowel classification from the reference book
        self.vowel_system = {
            'first_place': {
                'position_rule': 'Outline written above the line, vowel at beginning of stroke',
                'vowels': {
                    'long_ah': {
                        'symbol': 'heavy dot',
                        'sound': 'ah as in father, palm, pass',
                        'examples': ['pa', 'calm', 'palm', 'pass', 'father', 'rather', 'half'],
                        'phonetic_description': 'Long AH sound',
                        'position': 'first place - beginning of stroke'
                    },
                    'short_a': {
                        'symbol': 'light dot', 
                        'sound': 'a as in cat, add, fact',
                        'examples': ['fact', 'at', 'add', 'attach', 'bank', 'catch', 'cash', 'cab', 'ask', 'attack', 'back', 'manage'],
                        'phonetic_description': 'Short A sound as in cat',
                        'position': 'first place - beginning of stroke'
                    },
                    'long_a': {
                        'symbol': 'heavy dash',
                        'sound': 'a as in day, may, take',
                        'examples': ['may', 'day', 'take', 'make', 'date', 'mate', 'late', 'gate'],
                        'phonetic_description': 'Long A sound as in day',
                        'position': 'first place - beginning of stroke'
                    },
                    'short_e': {
                        'symbol': 'light dash',
                        'sound': 'e as in pen, get, let',
                        'examples': ['pen', 'get', 'let', 'net', 'set', 'bed', 'red'],
                        'phonetic_description': 'Short E sound as in pen',
                        'position': 'first place - beginning of stroke'
                    }
                }
            },
            'second_place': {
                'position_rule': 'Vowel in middle of stroke, to the right of consonants',
                'vowels': {
                    'long_a_second': {
                        'symbol': 'heavy dot',
                        'sound': 'a as in part, art, car', 
                        'examples': ['part', 'art', 'car', 'far', 'hard', 'yard', 'card'],
                        'phonetic_description': 'Long A in second place - as in part',
                        'position': 'second place - middle of stroke'
                    },
                    'short_a_second': {
                        'symbol': 'light dot',
                        'sound': 'a as in man, can, had',
                        'examples': ['man', 'can', 'had', 'bad', 'sad', 'mad', 'ran'],
                        'phonetic_description': 'Short A in second place',
                        'position': 'second place - middle of stroke'
                    },
                    'long_ay': {
                        'symbol': 'heavy dash',
                        'sound': 'ay as in say, way, play',
                        'examples': ['say', 'way', 'play', 'stay', 'pay', 'bay', 'lay'],
                        'phonetic_description': 'Long AY diphthong',
                        'position': 'second place - middle of stroke'
                    },
                    'short_e_second': {
                        'symbol': 'light dash',
                        'sound': 'e as in bet, met, set',
                        'examples': ['bet', 'met', 'set', 'wet', 'yet', 'net', 'pet'],
                        'phonetic_description': 'Short E in second place',
                        'position': 'second place - middle of stroke'
                    }
                }
            },
            'third_place': {
                'position_rule': 'Outline through the line, vowel at end of stroke',
                'vowels': {
                    'long_ee': {
                        'symbol': 'heavy dot',
                        'sound': 'ee as in see, fee, teach',
                        'examples': ['each', 'see', 'fee', 'teach', 'theme', 'deal', 'leave', 'team'],
                        'phonetic_description': 'Long EE sound',
                        'position': 'third place - end of stroke'
                    },
                    'short_i': {
                        'symbol': 'light dot',
                        'sound': 'i as in bit, big, ship',
                        'examples': ['if', 'big', 'ships', 'live', 'ill', 'bill', 'thick', 'width'],
                        'phonetic_description': 'Short I sound',
                        'position': 'third place - end of stroke'
                    },
                    'long_o': {
                        'symbol': 'heavy dash',
                        'sound': 'o as in go, so, home',
                        'examples': ['go', 'so', 'home', 'hope', 'note', 'vote', 'quote'],
                        'phonetic_description': 'Long O sound',
                        'position': 'third place - end of stroke'
                    },
                    'short_u': {
                        'symbol': 'light dash',
                        'sound': 'u as in but, cut, much',
                        'examples': ['but', 'cut', 'much', 'such', 'run', 'sun', 'fun'],
                        'phonetic_description': 'Short U sound',
                        'position': 'third place - end of stroke'
                    }
                }
            },
            'mnemonic_sentences': {
                'authentic_ncs': [
                    "Pa may we",      # First place vowels  
                    "All go too",     # Second place vowels
                    "That pen is",    # Third place vowels (short)
                    "Not much good"   # Additional vowels
                ],
                'explanation': 'These mnemonic sentences from the NCS book help remember vowel positions and sounds'
            }
        }
    
    def get_vowel_by_sound_and_position(self, sound_example, position=None):
        """Find the correct vowel classification based on example word"""
        for place_name, place_data in self.vowel_system.items():
            if place_name == 'mnemonic_sentences':
                continue
                
            for vowel_name, vowel_data in place_data['vowels'].items():
                if sound_example.lower() in vowel_data['examples']:
                    return {
                        'place': place_name,
                        'vowel_type': vowel_name,
                        'symbol': vowel_data['symbol'],
                        'sound_description': vowel_data['sound'],
                        'phonetic_description': vowel_data['phonetic_description'],
                        'position_rule': vowel_data['position']
                    }
        return None
    
    def get_words_for_vowel_type(self, place, vowel_type):
        """Get example words for a specific vowel type"""
        try:
            return self.vowel_system[place]['vowels'][vowel_type]['examples']
        except KeyError:
            return []
    
    def generate_vowel_differentiation_exercises(self):
        """Generate exercises that teach vowel differentiation"""
        exercises = {
            'vowel_discrimination': [
                {
                    'title': 'A Sound Differentiation',
                    'instructions': 'Learn to distinguish between different A sounds and their positions',
                    'examples': [
                        {'word': 'cat', 'vowel': 'short_a (first place)', 'sound': 'a as in cat'},
                        {'word': 'car', 'vowel': 'long_a_second (second place)', 'sound': 'a as in car'}, 
                        {'word': 'day', 'vowel': 'long_a (first place)', 'sound': 'ay as in day'},
                        {'word': 'part', 'vowel': 'long_a_second (second place)', 'sound': 'ar as in part'}
                    ]
                },
                {
                    'title': 'Position Writing Practice',
                    'instructions': 'Practice writing outlines in correct positions based on first vowel sound',
                    'examples': [
                        {'word': 'take', 'position': 'first place (above line)', 'reason': 'long A is first-place vowel'},
                        {'word': 'man', 'position': 'second place (on line)', 'reason': 'short A is second-place vowel'},
                        {'word': 'see', 'position': 'third place (through line)', 'reason': 'long EE is third-place vowel'}
                    ]
                }
            ],
            'theory_reinforcement': [
                {
                    'concept': 'Heavy vs Light Symbols',
                    'explanation': 'Heavy dots/dashes for long vowels, light dots/dashes for short vowels',
                    'practice_pairs': [
                        ('long AH (heavy dot)', 'short A (light dot)'),
                        ('long A (heavy dash)', 'short E (light dash)'),
                        ('long EE (heavy dot)', 'short I (light dot)')
                    ]
                }
            ]
        }
        return exercises
    
    def create_authentic_vocabulary_by_vowel_type(self):
        """Create vocabulary lists organized by specific vowel types"""
        vocab_by_vowel = {}
        
        for place_name, place_data in self.vowel_system.items():
            if place_name == 'mnemonic_sentences':
                continue
                
            vocab_by_vowel[place_name] = {}
            for vowel_name, vowel_data in place_data['vowels'].items():
                vocab_by_vowel[place_name][vowel_name] = {
                    'symbol': vowel_data['symbol'],
                    'sound': vowel_data['sound'],
                    'examples': vowel_data['examples'],
                    'description': vowel_data['phonetic_description']
                }
        
        return vocab_by_vowel
    
    def generate_enhanced_assessment_questions(self):
        """Generate assessment questions that test vowel differentiation"""
        questions = []
        
        # Vowel discrimination questions
        questions.extend([
            {
                'id': 'VOW_001',
                'question': 'Which vowel symbol represents the A sound in "part"?',
                'options': ['Light dot in first place', 'Heavy dot in second place', 'Light dot in second place', 'Heavy dash in first place'],
                'correct': 1,
                'explanation': 'The A in "part" is a long A sound written as a heavy dot in second place'
            },
            {
                'id': 'VOW_002', 
                'question': 'The word "day" contains which type of A vowel?',
                'options': ['Short A (light dot)', 'Long A (heavy dash)', 'Long AH (heavy dot)', 'Short E (light dash)'],
                'correct': 1,
                'explanation': 'The AY sound in "day" is represented by a heavy dash in first place'
            },
            {
                'id': 'VOW_003',
                'question': 'In position writing, where would you write the outline for "see"?',
                'options': ['Above the line (first place)', 'On the line (second place)', 'Through the line (third place)', 'Below the line'],
                'correct': 2,
                'explanation': 'The EE sound in "see" is a third-place vowel, so the outline goes through the line'
            },
            {
                'id': 'VOW_004',
                'question': 'What is the difference between the A in "cat" and the A in "car"?',
                'options': ['Same vowel, different position', 'Cat=light dot, Car=heavy dot, different positions', 'No difference', 'Different consonants only'],
                'correct': 1,
                'explanation': 'Cat has short A (light dot, first place), Car has long A (heavy dot, second place)'
            },
            {
                'id': 'VOW_005',
                'question': 'The mnemonic sentence "Pa may we" helps remember which vowels?',
                'options': ['All vowels', 'First-place vowels only', 'Second-place vowels only', 'Third-place vowels only'],
                'correct': 1,
                'explanation': 'Pa may we contains the four first-place vowels in order'
            }
        ])
        
        return questions

def main():
    vowel_system = AuthenticVowelSystem()
    
    # Test the system with different A sounds
    print("Testing vowel differentiation:")
    
    test_words = ['cat', 'car', 'day', 'part', 'man', 'take']
    for word in test_words:
        result = vowel_system.get_vowel_by_sound_and_position(word)
        if result:
            print(f"{word}: {result['phonetic_description']} - {result['symbol']} ({result['place']})")
    
    # Generate vocabulary by vowel type
    vocab = vowel_system.create_authentic_vocabulary_by_vowel_type()
    
    # Generate enhanced assessment questions
    questions = vowel_system.generate_enhanced_assessment_questions()
    
    print(f"\nGenerated {len(questions)} vowel differentiation assessment questions")
    print("Vowel system analysis complete!")

if __name__ == "__main__":
    main()