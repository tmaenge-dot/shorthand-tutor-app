# Shorthand Tutor App - Pitman Shorthand Learning System

A comprehensive web-based application for learning Pitman Shorthand based on the NCS (National Certificate in Secretarial Studies) syllabus. This interactive learning system provides structured lessons, practice exercises, assessments, and progress tracking.

## 🎯 Features

### 📚 **Curriculum Integration**
- **22 Learning Modules** (A-V) following the official NCS syllabus
- **44-week course structure** across 2 semesters
- **Institutional lesson plan generator** matching Ministry format
- **Progressive skill building** from phonography to advanced techniques

### 🖊️ **Interactive Practice**
- **Digital shorthand canvas** for stroke practice
- **Real-time drawing feedback** and stroke recognition
- **Guided exercises** with hints and demonstrations
- **Speed development tracking** with WPM measurements

### 📊 **Assessment System**
- **20 Theory checks** with 95% accuracy requirements
- **Plate shorthand transcription** exercises
- **Dictation practice** at progressive speeds (5-30 WPM)
- **Automatic grading** and progress tracking

### 📈 **Progress Tracking**
- **Individual student progress** across all modules
- **Speed and accuracy analytics** with historical charts
- **Achievement badges** and milestone recognition
- **Detailed performance reports** for instructors

### 🎓 **Educational Tools**
- **Symbol library** with stroke formation guides
- **Phonetic sound recognition** exercises
- **Short forms and phrases** practice
- **Reference materials** and resource integration

## 🏗️ Project Structure

```
shorthand-tutor-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation/      # App navigation and sidebar
│   │   └── ShorthandCanvas/ # Interactive drawing canvas
│   ├── pages/              # Main application pages
│   │   ├── Dashboard/      # Student overview and progress
│   │   ├── LessonModule/   # Individual lesson content
│   │   ├── Practice/       # Interactive practice exercises
│   │   ├── Assessment/     # Theory checks and tests
│   │   ├── Progress/       # Analytics and tracking
│   │   └── Resources/      # Reference materials
│   ├── hooks/              # Custom React hooks
│   │   ├── useUserProgress.tsx  # Progress state management
│   │   └── useLessons.tsx       # Lesson data management
│   ├── data/               # Data structures and content
│   │   ├── lessonData.ts        # Learning module definitions
│   │   └── lessonPlanGenerator.ts # Institutional format generator
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Core application types
│   └── utils/              # Utility functions
├── docs/                   # Documentation and lesson plans
│   ├── BRIGADES_SCHEME_BOOK_2025-26.md
│   └── LESSON_PLANS_MODULES_A-C.md
└── package.json           # Dependencies and scripts
```

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18** with TypeScript for type safety
- **Material-UI (MUI)** for consistent design system
- **React Router** for navigation
- **React Konva** for interactive canvas drawing

### **State Management**
- **React Context** for global state
- **Local Storage** for data persistence
- **Custom hooks** for business logic

### **Drawing & Canvas**
- **Konva.js** for 2D canvas manipulation
- **SVG path support** for shorthand symbols
- **Touch/mouse input** for cross-platform compatibility

### **Development Tools**
- **Vite** for fast development and building
- **ESLint** for code quality
- **Prettier** for code formatting
- **Vitest** for unit testing

## 📋 Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with HTML5 Canvas support

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd shorthand-tutor-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to `http://localhost:3000`
   - The app will auto-reload on code changes

### Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

## 📖 Usage Guide

### For Students

1. **Getting Started**
   - Open the app and create your student profile
   - Start with Module A (Introduction to Phonography)
   - Complete lessons sequentially for best results

2. **Practice Workflow**
   - Study lesson content and objectives
   - Practice stroke formation on the canvas
   - Complete guided exercises with hints
   - Take theory checks when ready (95% required)

3. **Progress Tracking**
   - Monitor your completion percentage
   - Track speed development (WPM)
   - Review accuracy trends over time
   - Earn achievement badges

### For Instructors

1. **Course Management**
   - Use the scheme of work for semester planning
   - Generate lesson plans in institutional format
   - Monitor student progress across all modules
   - Access detailed analytics and reports

2. **Assessment Tools**
   - Set up theory checks with customizable questions
   - Review student submissions and accuracy
   - Track class-wide performance metrics
   - Generate progress reports for administration

## 📚 Curriculum Overview

### **Semester 1 (Weeks 1-18)**
- **Module A**: Introduction to Phonography
- **Module B**: Straight Strokes (P, B, T, D, Ch, J)
- **Module C**: Curved Strokes (F, V, TH, S, Z, SH)
- **Module D**: Horizontal Strokes (K, G, M, N, ING)
- **Module E**: First Place Vowels
- **Module F**: Third Place Vowels
- **Module G**: S Circle & Downward L
- **Module H**: Stroke R

### **Semester 2 (Weeks 19-44)**
- **Modules I-V**: Advanced techniques including diphthongs, hooks, principles, affixes, and numerals
- **Speed Development**: Progressive targets from 5-30 WPM
- **Complex Combinations**: Advanced shorthand writing techniques

## 🎯 Learning Objectives

Students completing this course will be able to:

1. **Write legible, accurate shorthand outlines** suitable for transcription
2. **Read back accurately** from both plate shorthand and personal notes
3. **Achieve 30 WPM writing speed** with 95% accuracy
4. **Apply all shorthand principles** including hooks, loops, and special forms
5. **Take dictation effectively** in professional secretarial contexts

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run lint` - Check code quality
- `npm run format` - Format code with Prettier

### Contributing
1. Fork the repository
2. Create a feature branch
3. Follow TypeScript and ESLint guidelines
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- Use TypeScript for all new code
- Follow Material-UI design patterns
- Write comprehensive JSDoc comments
- Maintain 80%+ test coverage
- Use semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏫 Institutional Information

**Developed for:**
- Ministry of Employment, Labour Productivity & Skills Development
- Department of Skills Development (DSD)
- Tswapong Bokone Brigade

**Course:** National Certificate in Secretarial Studies  
**Subject:** Shorthand Theory  
**Academic Year:** 2025/26  
**Tutor:** Mr T. Maenge

## 📞 Support

For technical support or educational inquiries:
- Create an issue in the GitHub repository
- Contact the development team
- Refer to the comprehensive documentation

---

**Note**: This application follows the official NCS syllabus and institutional standards for shorthand education in Botswana. All lesson plans and assessments align with Ministry requirements and professional secretarial training standards.