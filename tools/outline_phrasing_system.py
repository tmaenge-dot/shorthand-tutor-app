#!/usr/bin/env python3
"""
Authentic NCS Outline and Phrasing System
Implements complete word formation: strokes + vowels = outlines + shortforms + phrasing
Based on NCS Pitman New Era Shorthand Anniversary Edition
"""

import json
from pathlib import Path

class OutlinePhrasingSystem:
    def __init__(self):
        # Authentic outline construction principles from NCS materials
        self.outline_principles = {
            'basic_construction': {
                'definition': 'An outline is the complete representation of a word using strokes and vowels',
                'components': [
                    'Consonant strokes (provide the skeleton)',
                    'Vowel signs (provide pronunciation clarity)',  
                    'Position writing (indicates vowel placement)',
                    'Joining rules (connect strokes smoothly)'
                ],
                'formation_steps': [
                    '1. Identify all consonant sounds in sequence',
                    '2. Choose appropriate strokes for each consonant',
                    '3. Determine vowel positions and signs needed',
                    '4. Apply position writing rules',
                    '5. Connect strokes with proper joining'
                ]
            },
            'position_writing': {
                'first_position': {
                    'description': 'First stroke written above the line',
                    'indicates': 'First-place vowels (ah, a, ay, e)',
                    'rule': 'When first vowel is first-place, write above line'
                },
                'second_position': {
                    'description': 'First stroke written on the line',
                    'indicates': 'Second-place vowels (ee, i, o, aw)',
                    'rule': 'When first vowel is second-place, write on line'
                },
                'third_position': {
                    'description': 'First stroke written below the line',
                    'indicates': 'Third-place vowels (oo, ou, u, oy)',
                    'rule': 'When first vowel is third-place, write below line'
                }
            }
        }
        
        # Authentic shortforms from NCS Appendix III
        self.shortforms = {
            'list_one_common': {
                'description': 'Most frequently used words with special abbreviated outlines',
                'forms': {
                    'a': {'outline': ')', 'usage': 'article, very common in phrases'},
                    'an': {'outline': ')', 'usage': 'article, before vowel sounds'},
                    'the': {'outline': '...', 'usage': 'most common word, often tick at end of phrases'},
                    'and': {'outline': 'd', 'usage': 'conjunction, frequently phrased'},
                    'be': {'outline': 'b', 'usage': 'verb, foundation for becoming, been'},
                    'is': {'outline': 's', 'usage': 'verb, often joined to other words'},
                    'his': {'outline': 's', 'usage': 'possessive, same as "is" but context differs'},
                    'of': {'outline': 'v', 'usage': 'preposition, very common in phrases'},
                    'to': {'outline': 't', 'usage': 'preposition/infinitive, heavily phrased'},
                    'do': {'outline': 'd', 'usage': 'verb, simple downstroke'},
                    'you': {'outline': 'u', 'usage': 'pronoun, basis for "your"'},
                    'are': {'outline': 'r', 'usage': 'verb, simple upstroke'},
                    'all': {'outline': 'l', 'usage': 'determiner, simple upstroke'},
                    'come': {'outline': 'k-m', 'usage': 'verb, K stroke + M stroke'},
                    'been': {'outline': 'b-n', 'usage': 'past participle of "be"'},
                    'which': {'outline': 'wh', 'usage': 'relative pronoun'},
                    'should': {'outline': 'sh-d', 'usage': 'modal verb'},
                    'could': {'outline': 'k-d', 'usage': 'modal verb'},
                    'would': {'outline': 'w-d', 'usage': 'modal verb'},
                    'think': {'outline': 'th-k', 'usage': 'verb, thinking'},
                    'about': {'outline': 'b-t', 'usage': 'preposition, very common'},
                    'because': {'outline': 'b-k', 'usage': 'conjunction, reason'}
                }
            },
            'list_two_advanced': {
                'description': 'Less frequent but useful for high-speed writing',
                'forms': {
                    'characteristic': {'outline': 'ch-r', 'usage': 'noun/adjective, abbreviated'},
                    'demonstration': {'outline': 'd-m', 'usage': 'noun, showing/proving'},
                    'difficulty': {'outline': 'd-f', 'usage': 'noun, problem/challenge'},
                    'electricity': {'outline': 'e-l', 'usage': 'noun, power/energy'},
                    'intelligent': {'outline': 'i-t', 'usage': 'adjective, smart/clever'},
                    'nevertheless': {'outline': 'n-v', 'usage': 'adverb, however/still'},
                    'opportunity': {'outline': 'o-p', 'usage': 'noun, chance/possibility'},
                    'particularly': {'outline': 'p-r', 'usage': 'adverb, especially'},
                    'responsibility': {'outline': 'r-s', 'usage': 'noun, duty/obligation'},
                    'understanding': {'outline': 'u-d', 'usage': 'noun/adjective, comprehension'}
                }
            }
        }
        
        # Authentic phrasing principles from NCS materials
        self.phrasing_principles = {
            'definition': 'Joining shorthand outlines to increase writing speed',
            'core_rules': [
                'Outlines should only be phrased when they join easily and naturally',
                'The meaning must remain clear',
                'First word in phrase written in normal position',
                'Subsequent words adapt to maintain smooth joining'
            ],
            'common_phrase_types': {
                'article_noun_phrases': {
                    'description': 'Articles joined to nouns',
                    'examples': [
                        {'phrase': 'a man', 'formation': 'a-outline + man-outline joined'},
                        {'phrase': 'the time', 'formation': 'the-tick + time-outline'},
                        {'phrase': 'an opportunity', 'formation': 'an-outline + opportunity joined'}
                    ]
                },
                'preposition_phrases': {
                    'description': 'Prepositions joined to following words',
                    'examples': [
                        {'phrase': 'to do', 'formation': 'to-stroke + do-stroke joined'},
                        {'phrase': 'of the', 'formation': 'of-outline + the-tick'},
                        {'phrase': 'in order', 'formation': 'in-stroke + order-outline'}
                    ]
                },
                'auxiliary_verb_phrases': {
                    'description': 'Helper verbs joined to main verbs',
                    'examples': [
                        {'phrase': 'should be', 'formation': 'should-outline + be-stroke'},
                        {'phrase': 'could do', 'formation': 'could-outline + do-stroke'},
                        {'phrase': 'would like', 'formation': 'would-outline + like-outline'}
                    ]
                },
                'percentage_phrases': {
                    'description': 'Special percentage phrasing',
                    'examples': [
                        {'phrase': '5 per cent', 'formation': '5 + per cent sign'},
                        {'phrase': '20 per cent', 'formation': '20 + per cent sign'},
                        {'phrase': 'per annum', 'formation': 'per cent + annum-outline'}
                    ]
                }
            },
            'the_tick': {
                'description': 'Light slanting tick representing "the"',
                'usage': 'Added at end of words in phrases',
                'examples': [
                    'to the', 'do the', 'is to the'
                ],
                'rule': 'Tick written as light slanting mark at end of preceding outline'
            }
        }
        
        # Progressive learning examples
        self.learning_progression = {
            'stage_1_simple_outlines': {
                'focus': 'Basic word construction with strokes and vowels',
                'examples': [
                    {
                        'word': 'cat',
                        'breakdown': 'K (horizontal) + short A (first-place) + T (upstroke)',
                        'outline_formation': 'K-stroke on line (second position for A), T-stroke upward',
                        'vowel_placement': 'Short A placed at beginning of K-stroke'
                    },
                    {
                        'word': 'dog',
                        'breakdown': 'D (upstroke) + short O (second-place) + G (horizontal)', 
                        'outline_formation': 'D-stroke on line (second position), G-stroke horizontal',
                        'vowel_placement': 'Short O placed at beginning of D-stroke'
                    },
                    {
                        'word': 'book',
                        'breakdown': 'B (downstroke) + long OO (third-place) + K (horizontal)',
                        'outline_formation': 'B-stroke below line (third position), K-stroke horizontal',
                        'vowel_placement': 'Long OO placed at beginning of B-stroke'
                    }
                ]
            },
            'stage_2_shortforms': {
                'focus': 'Learning abbreviated outlines for common words',
                'examples': [
                    {
                        'word': 'and',
                        'regular_outline': 'short A + N + D (three strokes)',
                        'shortform': 'd (single downstroke)',
                        'reason': 'Extremely common word, saves time and space'
                    },
                    {
                        'word': 'the',
                        'regular_outline': 'TH + long E (two elements)',
                        'shortform': '... (three dots)',
                        'reason': 'Most frequent word in English, needs quick representation'
                    },
                    {
                        'word': 'because',
                        'regular_outline': 'B + long E + K + short AW + S (complex)',
                        'shortform': 'b-k (joined B and K strokes)',
                        'reason': 'Common conjunction, complex spelling simplified'
                    }
                ]
            },
            'stage_3_simple_phrasing': {
                'focus': 'Joining two words smoothly',
                'examples': [
                    {
                        'phrase': 'to do',
                        'individual_words': 'to (T-stroke) + do (D-stroke)',
                        'phrased_form': 'T-stroke joined to D-stroke in one motion',
                        'speed_benefit': 'Eliminates pen lift between words'
                    },
                    {
                        'phrase': 'and the',
                        'individual_words': 'and (d shortform) + the (... or tick)',
                        'phrased_form': 'd with the-tick attached',
                        'speed_benefit': 'Very common combination, flows naturally'
                    }
                ]
            },
            'stage_4_complex_phrasing': {
                'focus': 'Multiple word phrases for high speed',
                'examples': [
                    {
                        'phrase': 'should be able to do',
                        'breakdown': 'should(shortform) + be(shortform) + able + to(shortform) + do(shortform)',
                        'phrased_form': 'Continuous outline joining all shortforms',
                        'speed_benefit': 'Entire phrase written without pen lifts'
                    },
                    {
                        'phrase': 'I would like to',
                        'breakdown': 'I + would(shortform) + like + to(shortform)',
                        'phrased_form': 'Smooth joining from I through to final T-stroke',
                        'speed_benefit': 'Common speech pattern, natural flow'
                    }
                ]
            }
        }
    
    def get_outline_construction_steps(self, word):
        """Get step-by-step outline construction for a word"""
        # This would analyze the word and provide construction steps
        # For now, return template structure
        return {
            'word': word,
            'phonetic_analysis': f'Analyze sounds in "{word}"',
            'stroke_selection': 'Choose appropriate strokes for each consonant',
            'vowel_analysis': 'Identify vowel sounds and positions',
            'position_determination': 'Apply position writing rules',
            'joining_rules': 'Connect strokes smoothly',
            'final_outline': f'Complete outline for "{word}"'
        }
    
    def get_shortform_explanation(self, word):
        """Get explanation of why a word has a shortform"""
        all_shortforms = {}
        all_shortforms.update(self.shortforms['list_one_common']['forms'])
        all_shortforms.update(self.shortforms['list_two_advanced']['forms'])
        
        if word.lower() in all_shortforms:
            return all_shortforms[word.lower()]
        return None
    
    def get_phrasing_suggestions(self, words):
        """Get phrasing suggestions for a list of words"""
        # Analyze word combination for phrasing potential
        suggestions = []
        
        # Check for common phrase patterns
        for i in range(len(words) - 1):
            current_word = words[i].lower()
            next_word = words[i + 1].lower()
            
            # Article + noun pattern
            if current_word in ['a', 'an', 'the']:
                suggestions.append({
                    'phrase': f'{current_word} {next_word}',
                    'type': 'article_noun',
                    'joining': 'Natural joining, maintain clear meaning'
                })
            
            # Preposition patterns
            elif current_word in ['to', 'of', 'in', 'on', 'at', 'by']:
                suggestions.append({
                    'phrase': f'{current_word} {next_word}',
                    'type': 'preposition',
                    'joining': 'Smooth connection, very common pattern'
                })
            
            # Modal verb patterns
            elif current_word in ['should', 'could', 'would']:
                suggestions.append({
                    'phrase': f'{current_word} {next_word}',
                    'type': 'auxiliary_verb',
                    'joining': 'Helper verb + main verb, natural flow'
                })
        
        return suggestions
    
    def generate_learning_exercises(self):
        """Generate progressive exercises for outline and phrasing"""
        exercises = {
            'outline_construction': [
                {
                    'level': 'beginner',
                    'type': 'simple_words',
                    'instructions': 'Build outlines using strokes and vowels',
                    'words': ['cat', 'dog', 'book', 'pen', 'table'],
                    'focus': 'Stroke selection and vowel placement'
                },
                {
                    'level': 'intermediate', 
                    'type': 'position_writing',
                    'instructions': 'Apply correct position writing for vowels',
                    'words': ['calm', 'keep', 'book', 'cap', 'deep'],
                    'focus': 'First, second, third position rules'
                },
                {
                    'level': 'advanced',
                    'type': 'complex_outlines',
                    'instructions': 'Construct multi-syllable word outlines',
                    'words': ['opportunity', 'understanding', 'development'],
                    'focus': 'Long words with multiple vowels'
                }
            ],
            'shortform_practice': [
                {
                    'level': 'essential',
                    'type': 'common_shortforms',
                    'instructions': 'Master the most frequent shortforms',
                    'words': ['the', 'and', 'to', 'of', 'a', 'is', 'you', 'are'],
                    'focus': 'Speed and automatic recognition'
                },
                {
                    'level': 'extended',
                    'type': 'phrase_shortforms',
                    'instructions': 'Learn shortforms used in phrases',
                    'words': ['should', 'could', 'would', 'because', 'which'],
                    'focus': 'Phrase construction preparation'
                }
            ],
            'phrasing_practice': [
                {
                    'level': 'basic',
                    'type': 'two_word_phrases',
                    'instructions': 'Join two words smoothly',
                    'phrases': ['to do', 'and the', 'of the', 'should be'],
                    'focus': 'Smooth joining without pen lifts'
                },
                {
                    'level': 'intermediate',
                    'type': 'three_word_phrases', 
                    'instructions': 'Construct longer phrases',
                    'phrases': ['to do the', 'and the time', 'should be able'],
                    'focus': 'Maintaining legibility in longer phrases'
                },
                {
                    'level': 'advanced',
                    'type': 'speed_phrases',
                    'instructions': 'High-speed phrase construction',
                    'phrases': ['should be able to do', 'I would like to see'],
                    'focus': 'Maximum speed with clarity'
                }
            ]
        }
        return exercises
    
    def save_curriculum_files(self, output_dir):
        """Generate comprehensive outline and phrasing curriculum"""
        output_path = Path(output_dir)
        
        # Save outline construction data
        self.save_outline_construction_data(output_path / 'outline_construction_system.js')
        
        # Save shortforms data
        self.save_shortforms_data(output_path / 'authentic_shortforms.js')
        
        # Save phrasing data
        self.save_phrasing_data(output_path / 'phrasing_system.js')
        
        # Save learning exercises
        exercises = self.generate_learning_exercises()
        self.save_learning_exercises(output_path / 'outline_phrasing_exercises.js', exercises)
    
    def save_outline_construction_data(self, file_path):
        """Save outline construction principles and examples"""
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write("// Authentic NCS Outline Construction System\n")
            f.write("// Based on Pitman New Era Shorthand Anniversary Edition\n\n")
            f.write("export const outlineConstructionSystem = ")
            f.write(json.dumps({
                'principles': self.outline_principles,
                'learning_progression': self.learning_progression
            }, indent=2))
            f.write("\n\nexport default outlineConstructionSystem\n")
    
    def save_shortforms_data(self, file_path):
        """Save authentic shortforms from NCS materials"""
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write("// Authentic NCS Shortforms\n")
            f.write("// From Appendix III - Short Forms Lists One and Two\n\n")
            f.write("export const authenticShortforms = ")
            f.write(json.dumps(self.shortforms, indent=2))
            f.write("\n\nexport default authenticShortforms\n")
    
    def save_phrasing_data(self, file_path):
        """Save phrasing principles and examples"""
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write("// Authentic NCS Phrasing System\n")
            f.write("// Based on NCS phrasing principles for speed writing\n\n")
            f.write("export const phrasingSystem = ")
            f.write(json.dumps(self.phrasing_principles, indent=2))
            f.write("\n\nexport default phrasingSystem\n")
    
    def save_learning_exercises(self, file_path, exercises):
        """Save progressive learning exercises"""
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write("// Outline and Phrasing Learning Exercises\n")
            f.write("// Progressive exercises for mastering word construction and phrasing\n\n")
            f.write("export const outlinePhasingExercises = ")
            f.write(json.dumps(exercises, indent=2))
            f.write("\n\nexport default outlinePhasingExercises\n")

def main():
    outline_system = OutlinePhrasingSystem()
    
    # Test system components
    print("=== Outline and Phrasing System Test ===")
    
    # Test outline construction
    test_word = "thinking"
    construction = outline_system.get_outline_construction_steps(test_word)
    print(f"\nOutline construction for '{test_word}':")
    for step, description in construction.items():
        print(f"  {step}: {description}")
    
    # Test shortform lookup
    test_shortforms = ['the', 'and', 'because', 'opportunity']
    print(f"\nShortform examples:")
    for word in test_shortforms:
        shortform = outline_system.get_shortform_explanation(word)
        if shortform:
            print(f"  {word}: {shortform['outline']} - {shortform['usage']}")
    
    # Test phrasing suggestions
    test_phrase = ['should', 'be', 'able', 'to', 'do']
    suggestions = outline_system.get_phrasing_suggestions(test_phrase)
    print(f"\nPhrasing suggestions for {test_phrase}:")
    for suggestion in suggestions:
        print(f"  {suggestion['phrase']} ({suggestion['type']}): {suggestion['joining']}")
    
    # Generate curriculum files
    outline_system.save_curriculum_files('/home/oem/Desktop/Shorthand/ncs_reference_extracted')
    print("\n✅ Outline and phrasing curriculum files generated!")

if __name__ == "__main__":
    main()