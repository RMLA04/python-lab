import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import FlashcardsPage from './pages/FlashcardsPage';
import QuizPage from './pages/QuizPage';
import Progress from './pages/Progress';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <Router>
          <div className="app">
            <NavBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/flashcards" element={<FlashcardsPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/quiz/:topic" element={<QuizPage />} />
                <Route path="/progress" element={<Progress />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
