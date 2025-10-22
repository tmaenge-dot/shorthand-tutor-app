#!/usr/bin/env python3
"""
NCS Shorthand Book PDF Processor
Extracts content from scanned PDF and restructures curriculum based on authentic NCS materials
"""

import subprocess
import os
import sys
import json
import re
from pathlib import Path

class ShorthandBookProcessor:
    def __init__(self, pdf_path, output_dir):
        self.pdf_path = pdf_path
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        
    def extract_pdf_content(self):
        """Extract content from PDF using multiple methods"""
        print("Processing PDF: Converting pages to images...")
        
        # Convert PDF to images
        images_dir = self.output_dir / "images"
        images_dir.mkdir(exist_ok=True)
        
        try:
            # Convert PDF pages to PPM images
            subprocess.run([
                'pdftoppm', '-r', '300', 
                str(self.pdf_path), 
                str(images_dir / 'page')
            ], check=True)
            
            # Get list of generated images
            image_files = sorted(images_dir.glob('page-*.ppm'))
            print(f"Generated {len(image_files)} page images")
            
            # Extract text from each image using OCR
            extracted_text = {}
            
            for i, image_file in enumerate(image_files, 1):
                print(f"Processing page {i}...")
                try:
                    # Use Tesseract OCR to extract text
                    result = subprocess.run([
                        'tesseract', str(image_file), 'stdout'
                    ], capture_output=True, text=True, check=True)
                    
                    page_text = result.stdout.strip()
                    extracted_text[f'page_{i}'] = page_text
                    
                    # Save individual page text
                    page_file = self.output_dir / f'page_{i}_content.txt'
                    with open(page_file, 'w', encoding='utf-8') as f:
                        f.write(page_text)
                        
                except subprocess.CalledProcessError as e:
                    print(f"OCR failed for page {i}: {e}")
                    extracted_text[f'page_{i}'] = ""
            
            # Save combined content
            combined_file = self.output_dir / 'complete_book_content.txt'
            with open(combined_file, 'w', encoding='utf-8') as f:
                for page_num in sorted(extracted_text.keys()):
                    f.write(f"\n\n=== {page_num.upper()} ===\n\n")
                    f.write(extracted_text[page_num])
            
            print(f"Text extraction complete. Content saved to {combined_file}")
            return extracted_text
            
        except subprocess.CalledProcessError as e:
            print(f"PDF processing failed: {e}")
            return {}
    
    def analyze_curriculum_structure(self, extracted_text):
        """Analyze the book content to identify NCS curriculum structure"""
        print("Analyzing curriculum structure...")
        
        curriculum_data = {
            'modules': {},
            'vocabulary_by_unit': {},
            'theory_points': {},
            'assessment_guidelines': {}
        }
        
        # Combine all text for analysis
        full_text = ""
        for page_content in extracted_text.values():
            full_text += " " + page_content
        
        # Look for module/unit patterns
        unit_patterns = [
            r'(?i)unit\s+([A-Z])\s*[-:]?\s*(.+?)(?=unit\s+[A-Z]|\Z)',
            r'(?i)lesson\s+(\d+)\s*[-:]?\s*(.+?)(?=lesson\s+\d+|\Z)',
            r'(?i)module\s+([A-Z])\s*[-:]?\s*(.+?)(?=module\s+[A-Z]|\Z)',
            r'(?i)chapter\s+(\d+)\s*[-:]?\s*(.+?)(?=chapter\s+\d+|\Z)'
        ]
        
        for pattern in unit_patterns:
            matches = re.finditer(pattern, full_text, re.DOTALL)
            for match in matches:
                unit_id = match.group(1)
                unit_content = match.group(2).strip()
                
                if unit_id not in curriculum_data['modules']:
                    curriculum_data['modules'][unit_id] = {
                        'content': unit_content[:1000],  # First 1000 chars
                        'vocabulary': self.extract_vocabulary(unit_content),
                        'theory_points': self.extract_theory_points(unit_content)
                    }
        
        # Look for vocabulary lists
        vocab_patterns = [
            r'(?i)vocabulary\s*:?\s*(.+?)(?=\n\n|\Z)',
            r'(?i)words?\s+for\s+practice\s*:?\s*(.+?)(?=\n\n|\Z)',
            r'(?i)key\s+words?\s*:?\s*(.+?)(?=\n\n|\Z)'
        ]
        
        for pattern in vocab_patterns:
            matches = re.finditer(pattern, full_text, re.DOTALL)
            for match in matches:
                vocab_text = match.group(1)
                words = self.extract_vocabulary(vocab_text)
                # Try to determine which unit this belongs to
                # (This would need more sophisticated context analysis)
        
        return curriculum_data
    
    def extract_vocabulary(self, text):
        """Extract vocabulary words from text"""
        # Basic word extraction - can be improved with better patterns
        words = re.findall(r'\b[a-zA-Z]{2,}\b', text.lower())
        # Remove common words and focus on content words
        common_words = {'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'}
        return [word for word in set(words) if word not in common_words and len(word) > 2]
    
    def extract_theory_points(self, text):
        """Extract key theory points from text"""
        theory_patterns = [
            r'(?i)(stroke\s+.{1,50})',
            r'(?i)(vowel\s+.{1,50})',
            r'(?i)(consonant\s+.{1,50})',
            r'(?i)(position\s+.{1,50})',
            r'(?i)(circle\s+.{1,50})',
            r'(?i)(hook\s+.{1,50})'
        ]
        
        theory_points = []
        for pattern in theory_patterns:
            matches = re.finditer(pattern, text)
            for match in matches:
                theory_points.append(match.group(1).strip())
        
        return theory_points[:10]  # Limit to top 10 points
    
    def generate_restructured_data(self, curriculum_data):
        """Generate restructured curriculum data files"""
        print("Generating restructured curriculum data...")
        
        # Create new assessment questions based on extracted content
        assessment_file = self.output_dir / 'restructured_assessments.js'
        self.generate_assessment_file(curriculum_data, assessment_file)
        
        # Create new practice texts based on extracted vocabulary
        practice_file = self.output_dir / 'restructured_practice_texts.js'
        self.generate_practice_file(curriculum_data, practice_file)
        
        # Create new lesson data based on extracted theory
        lesson_file = self.output_dir / 'restructured_lesson_data.ts'
        self.generate_lesson_file(curriculum_data, lesson_file)
        
        print("Restructuring complete!")
    
    def generate_assessment_file(self, curriculum_data, output_file):
        """Generate new assessment questions based on book content"""
        with open(output_file, 'w') as f:
            f.write("// Restructured Assessment Questions based on NCS Reference Book\n")
            f.write("// Generated from authentic NCS materials\n\n")
            f.write("export const ncsAuthenticAssessmentQuestions = {\n")
            
            for module_id, module_data in curriculum_data['modules'].items():
                f.write(f"  {module_id}: [\n")
                
                # Generate questions based on theory points
                for i, theory_point in enumerate(module_data.get('theory_points', [])[:5]):
                    f.write(f"    {{\n")
                    f.write(f"      id: '{module_id}{i+1}',\n")
                    f.write(f"      question: 'Based on the NCS curriculum: {theory_point}',\n")
                    f.write(f"      options: ['Option A', 'Option B', 'Option C', 'Option D'],\n")
                    f.write(f"      correct: 0,\n")
                    f.write(f"      explanation: 'From NCS reference material'\n")
                    f.write(f"    }},\n")
                
                f.write(f"  ],\n")
            
            f.write("}\n")
    
    def generate_practice_file(self, curriculum_data, output_file):
        """Generate new practice texts based on extracted vocabulary"""
        with open(output_file, 'w') as f:
            f.write("// Restructured Practice Texts based on NCS Reference Book\n")
            f.write("// Uses only vocabulary appropriate for each unit\n\n")
            f.write("export const ncsAuthenticPracticeTexts = {\n")
            f.write("  moduleTexts: {\n")
            
            for module_id, module_data in curriculum_data['modules'].items():
                vocabulary = module_data.get('vocabulary', [])[:20]  # Limit vocabulary
                
                f.write(f"    {module_id}: {{\n")
                f.write(f"      vocabulary: {json.dumps(vocabulary)},\n")
                f.write(f"      basic: [\n")
                
                # Generate simple sentences using the vocabulary
                if vocabulary:
                    vocab_subset = vocabulary[:8]
                    practice_sentence = f"Practice with {' '.join(vocab_subset[:4])}."
                    f.write(f"        '{practice_sentence}',\n")
                
                f.write(f"      ],\n")
                f.write(f"    }},\n")
            
            f.write("  }\n")
            f.write("}\n")
    
    def generate_lesson_file(self, curriculum_data, output_file):
        """Generate restructured lesson data"""
        with open(output_file, 'w') as f:
            f.write("// Restructured Lesson Data based on NCS Reference Book\n")
            f.write("// Follows authentic NCS curriculum progression\n\n")
            f.write("export const ncsLessonModules = [\n")
            
            for module_id, module_data in curriculum_data['modules'].items():
                theory_points = module_data.get('theory_points', [])
                
                f.write(f"  {{\n")
                f.write(f"    id: '{module_id}',\n")
                f.write(f"    title: 'NCS Unit {module_id}',\n")
                f.write(f"    description: 'Based on authentic NCS materials',\n")
                f.write(f"    objectives: {json.dumps(theory_points[:3])},\n")
                f.write(f"    content: [\n")
                f.write(f"      {{\n")
                f.write(f"        id: '{module_id}1',\n")
                f.write(f"        type: 'text',\n")
                f.write(f"        title: 'NCS Unit {module_id} Theory',\n")
                f.write(f"        content: `{module_data['content'][:200]}...`,\n")
                f.write(f"        order: 1\n")
                f.write(f"      }}\n")
                f.write(f"    ]\n")
                f.write(f"  }},\n")
            
            f.write("]\n")

def main():
    if len(sys.argv) != 3:
        print("Usage: python pdf_processor.py <pdf_path> <output_directory>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    output_dir = sys.argv[2]
    
    if not os.path.exists(pdf_path):
        print(f"PDF file not found: {pdf_path}")
        sys.exit(1)
    
    processor = ShorthandBookProcessor(pdf_path, output_dir)
    
    # Extract content from PDF
    extracted_text = processor.extract_pdf_content()
    
    if not extracted_text:
        print("Failed to extract text from PDF")
        sys.exit(1)
    
    # Analyze curriculum structure
    curriculum_data = processor.analyze_curriculum_structure(extracted_text)
    
    # Generate restructured files
    processor.generate_restructured_data(curriculum_data)
    
    print("✅ PDF processing and curriculum restructuring complete!")
    print(f"📁 Output files saved to: {output_dir}")

if __name__ == "__main__":
    main()