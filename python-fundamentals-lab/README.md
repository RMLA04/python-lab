# Python Fundamentals Lab 🐍

A complete interactive learning platform for mastering Python fundamentals. Built with React, featuring lessons, flashcards with spaced repetition, quizzes, and comprehensive progress tracking.

![Python Fundamentals Lab](https://img.shields.io/badge/Python-Learning-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📚 Interactive Lessons
- 9 comprehensive lessons covering Python fundamentals
- Topics include: Variables, Data Types, Operators, Conditionals, Loops, Functions, Data Structures, Modules, and File Operations
- Syntax-highlighted code examples with copy-to-clipboard functionality
- Progress tracking for each lesson

### 🎴 Smart Flashcards
- 30 carefully crafted flashcards covering key Python concepts
- **Spaced Repetition Algorithm (SM-2)** for optimal learning
- Mark cards as "Hard" or "Learned" for personalized study
- Filter cards by status: New, Learning, Hard, Learned, or Due for Review
- Beautiful 3D flip animations

### ✍️ Interactive Quizzes
- 10 multiple-choice questions per topic (90 total questions)
- Instant feedback with detailed explanations
- Score tracking and performance analytics
- Review incorrect answers after completion

### 📊 Progress Dashboard
- **Daily Streak Tracking** with fire emoji 🔥
- **XP Points System** with level progression
- Visual progress bars and statistics
- Topics mastered overview
- Flashcard mastery statistics
- Identify cards needing more practice

### 🎨 Modern UI/UX
- **Glassmorphic Design** with smooth animations
- **Light/Dark Theme Toggle** with persistent preference
- Fully responsive layout for mobile, tablet, and desktop
- Smooth transitions and micro-interactions
- Beautiful gradient accents

### 💾 Data Persistence
- All progress saved to localStorage
- Streak tracking across sessions
- Flashcard learning states preserved
- Quiz scores and lesson completion tracked

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd python-fundamentals-lab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
python-fundamentals-lab/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── NavBar.jsx       # Navigation bar with theme toggle
│   │   ├── ThemeToggle.jsx  # Theme switcher component
│   │   ├── CodeBlock.jsx    # Syntax-highlighted code display
│   │   ├── Flashcard.jsx    # Interactive flashcard with flip animation
│   │   └── Dashboard.jsx    # Progress dashboard component
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Lessons.jsx      # Lessons list and detail view
│   │   ├── FlashcardsPage.jsx  # Flashcard study interface
│   │   ├── QuizPage.jsx     # Quiz interface with scoring
│   │   └── Progress.jsx     # Progress tracking page
│   ├── context/             # React Context providers
│   │   ├── ThemeContext.jsx # Theme management
│   │   └── ProgressContext.jsx  # Progress and state management
│   ├── data/                # JSON data files
│   │   ├── pythonLessons.json   # Lesson content
│   │   ├── flashcards.json      # Flashcard data
│   │   └── quizQuestions.json   # Quiz questions
│   ├── utils/               # Utility functions
│   │   ├── localStorage.js  # localStorage helpers
│   │   └── spacedRepetition.js  # SM-2 algorithm
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🎯 Learning Topics Covered

1. **Variables & Assignment** - Learn to store and manipulate data
2. **Data Types** - Master int, float, str, and bool
3. **Operators** - Arithmetic, comparison, and logical operations
4. **Conditionals** - Decision-making with if/elif/else
5. **Loops** - Automate tasks with for and while loops
6. **Functions** - Create reusable code blocks
7. **Data Structures** - Work with lists, tuples, and dictionaries
8. **Modules** - Extend functionality (includes `import antigravity` Easter egg!)
9. **File Operations** - Read and write files

## 🧠 Spaced Repetition System

The flashcard system uses the **SM-2 algorithm** for optimal learning:
- Cards are scheduled for review based on your performance
- Correctly answered cards appear less frequently
- Difficult cards are reviewed more often
- "Learned" cards are reviewed after 30 days
- "Hard" cards are reviewed the next day

## 🎨 Theme System

Toggle between light and dark themes:
- Preference saved to localStorage
- Smooth transitions between themes
- Optimized for both daytime and nighttime learning

## 📱 Responsive Design

Fully responsive layout that works beautifully on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1200px+)

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS custom properties
- **LocalStorage API** - Data persistence
- **Google Fonts** - Inter & Fira Code fonts

## 🎓 Educational Features

- **Progressive Learning** - Start with basics, advance to complex topics
- **Immediate Feedback** - Learn from mistakes with detailed explanations
- **Gamification** - XP points, levels, and streaks keep you motivated
- **Self-Paced** - Learn at your own speed
- **Comprehensive Coverage** - All Python fundamentals in one place

## 📈 Future Enhancements

Potential features for future versions:
- User accounts and cloud sync
- Code playground for live Python execution
- More advanced topics (OOP, decorators, generators)
- Community features (share progress, compete with friends)
- Mobile app version
- Additional programming languages

## 🤝 Contributing

This is an educational project. Feel free to fork and customize for your own learning needs!

## 📄 License

MIT License - feel free to use this project for learning and teaching purposes.

## 🙏 Acknowledgments

- Python community for the amazing language
- XKCD for the antigravity Easter egg inspiration
- All learners on their coding journey

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure localStorage is enabled in your browser
3. Try clearing browser cache and localStorage
4. Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)

---

**Happy Learning! 🚀🐍**

Start your Python journey today and build a strong foundation in programming!
