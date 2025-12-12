import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import quizData from '../data/quizQuestions.json';
import lessonsData from '../data/pythonLessons.json';
import './QuizPage.css';

const QuizPage = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const { saveQuizScore } = useProgress();

    const [selectedTopic, setSelectedTopic] = useState(topic || null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);

    const questions = selectedTopic ? quizData[selectedTopic] || [] : [];
    const currentQ = questions[currentQuestion];

    const handleTopicSelect = (topicSlug) => {
        setSelectedTopic(topicSlug);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setAnsweredQuestions([]);
        setQuizComplete(false);
    };

    const handleAnswerSelect = (index) => {
        if (showExplanation) return;
        setSelectedAnswer(index);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === currentQ.correctAnswer;
        const newAnsweredQuestions = [...answeredQuestions, {
            question: currentQ.question,
            selectedAnswer: selectedAnswer,
            correctAnswer: currentQ.correctAnswer,
            isCorrect: isCorrect,
            explanation: currentQ.explanation
        }];

        setAnsweredQuestions(newAnsweredQuestions);
        setShowExplanation(true);

        if (isCorrect) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            // Quiz complete
            setQuizComplete(true);
            saveQuizScore(selectedTopic, score + (selectedAnswer === currentQ.correctAnswer ? 1 : 0), questions.length);
        }
    };

    const handleRetake = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setAnsweredQuestions([]);
        setQuizComplete(false);
    };

    const handleBackToTopics = () => {
        setSelectedTopic(null);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setAnsweredQuestions([]);
        setQuizComplete(false);
    };

    // Topic Selection View
    if (!selectedTopic) {
        return (
            <div className="quiz-page">
                <div className="quiz-header">
                    <h1 className="page-title">Practice Quizzes</h1>
                    <p className="page-description">
                        Test your knowledge with interactive quizzes for each topic
                    </p>
                </div>

                <div className="topics-grid">
                    {lessonsData.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="topic-card"
                            onClick={() => handleTopicSelect(lesson.slug)}
                        >
                            <h3 className="topic-title">{lesson.title}</h3>
                            <p className="topic-questions">
                                {quizData[lesson.slug]?.length || 0} questions
                            </p>
                            <div className="topic-arrow">→</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Quiz Complete View
    if (quizComplete) {
        const finalScore = score;
        const percentage = Math.round((finalScore / questions.length) * 100);
        const passed = percentage >= 70;

        return (
            <div className="quiz-page">
                <div className="quiz-results">
                    <h1 className="results-title">
                        {passed ? 'Great Job!' : 'Keep Learning!'}
                    </h1>
                    <div className="results-score">
                        <span className="score-value">{finalScore}</span>
                        <span className="score-divider">/</span>
                        <span className="score-total">{questions.length}</span>
                    </div>
                    <div className="results-percentage">{percentage}%</div>

                    <div className="results-message">
                        {percentage >= 90 && "Outstanding! You've mastered this topic!"}
                        {percentage >= 70 && percentage < 90 && "Well done! You have a solid understanding!"}
                        {percentage >= 50 && percentage < 70 && "Good effort! Review the material and try again."}
                        {percentage < 50 && "Keep practicing! Review the lesson and try again."}
                    </div>

                    <div className="results-actions">
                        <button className="btn btn-primary" onClick={handleRetake}>
                            <span>Retake Quiz</span>
                        </button>
                        <button className="btn btn-secondary" onClick={handleBackToTopics}>
                            <span>Choose Another Topic</span>
                            <span className="btn-icon">→</span>
                        </button>
                    </div>

                    {/* Review Incorrect Answers */}
                    {answeredQuestions.some(q => !q.isCorrect) && (
                        <div className="review-section">
                            <h2 className="review-title">Review Incorrect Answers</h2>
                            {answeredQuestions.filter(q => !q.isCorrect).map((q, index) => (
                                <div key={index} className="review-item">
                                    <p className="review-question">{q.question}</p>
                                    <p className="review-explanation">{q.explanation}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Quiz Question View
    return (
        <div className="quiz-page">
            <button className="back-button" onClick={handleBackToTopics}>
                ← Back to Topics
            </button>

            <div className="quiz-container">
                <div className="quiz-progress">
                    <div className="progress-info">
                        <span className="progress-text">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="progress-score">Score: {score}/{questions.length}</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="question-card">
                    <h2 className="question-text">{currentQ.question}</h2>

                    <div className="options-list">
                        {currentQ.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === currentQ.correctAnswer;
                            const showCorrect = showExplanation && isCorrect;
                            const showIncorrect = showExplanation && isSelected && !isCorrect;

                            return (
                                <button
                                    key={index}
                                    className={`option-button ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showIncorrect ? 'incorrect' : ''}`}
                                    onClick={() => handleAnswerSelect(index)}
                                    disabled={showExplanation}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                    <span className="option-text">{option}</span>
                                    {showCorrect && <span className="option-icon">✓</span>}
                                    {showIncorrect && <span className="option-icon">✗</span>}
                                </button>
                            );
                        })}
                    </div>

                    {showExplanation && (
                        <div className="explanation-box">
                            <h3 className="explanation-title">
                                {selectedAnswer === currentQ.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                            </h3>
                            <p className="explanation-text">{currentQ.explanation}</p>
                        </div>
                    )}

                    <div className="question-actions">
                        {!showExplanation ? (
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmitAnswer}
                                disabled={selectedAnswer === null}
                            >
                                <span>Submit Answer</span>
                                <span className="btn-icon">→</span>
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleNextQuestion}>
                                <span>{currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                                <span className="btn-icon">→</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
