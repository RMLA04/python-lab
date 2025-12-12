import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import CodeBlock from '../components/CodeBlock';
import lessonsData from '../data/pythonLessons.json';
import './Lessons.css';

const Lessons = () => {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const { completeLesson, getTopicProgress } = useProgress();
    const navigate = useNavigate();

    const handleLessonClick = (lesson) => {
        setSelectedLesson(lesson);
    };

    const handleComplete = () => {
        if (selectedLesson) {
            completeLesson(selectedLesson.slug);
        }
    };

    const handleStartQuiz = () => {
        if (selectedLesson) {
            navigate(`/quiz/${selectedLesson.slug}`);
        }
    };

    if (selectedLesson) {
        const progress = getTopicProgress(selectedLesson.slug);

        return (
            <div className="lesson-detail">
                <button className="back-button" onClick={() => setSelectedLesson(null)}>
                    ← Back to Lessons
                </button>

                <div className="lesson-header">
                    <h1 className="lesson-title">{selectedLesson.title}</h1>
                    <p className="lesson-description">{selectedLesson.description}</p>
                    {progress.lessonCompleted && (
                        <span className="completed-badge">✓ Completed</span>
                    )}
                </div>

                <div className="lesson-content-section">
                    <h2 className="content-heading">Overview</h2>
                    <p className="content-text">{selectedLesson.content}</p>
                </div>

                <div className="lesson-content-section">
                    <h2 className="content-heading">Key Points</h2>
                    <ul className="key-points-list">
                        {selectedLesson.keyPoints.map((point, index) => (
                            <li key={index} className="key-point">
                                <span className="point-icon">✓</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lesson-content-section">
                    <h2 className="content-heading">Code Examples</h2>
                    {selectedLesson.codeExamples.map((example, index) => (
                        <div key={index} className="code-example">
                            <h3 className="example-title">{example.title}</h3>
                            <CodeBlock code={example.code} />
                        </div>
                    ))}
                </div>

                <div className="lesson-actions">
                    {!progress.lessonCompleted && (
                        <button className="btn btn-primary" onClick={handleComplete}>
                            <span>Mark as Complete</span>
                            <span className="btn-icon">✓</span>
                        </button>
                    )}
                    <button className="btn btn-secondary" onClick={handleStartQuiz}>
                        <span>Start Quiz</span>
                        <span className="btn-icon">→</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="lessons-page">
            <div className="lessons-header">
                <h1 className="page-title">Python Fundamentals</h1>
                <p className="page-description">
                    Master Python through 9 comprehensive lessons covering all the basics
                </p>
            </div>

            <div className="lessons-grid">
                {lessonsData.map((lesson) => {
                    const progress = getTopicProgress(lesson.slug);

                    return (
                        <div
                            key={lesson.id}
                            className={`lesson-card ${progress.lessonCompleted ? 'completed' : ''}`}
                            onClick={() => handleLessonClick(lesson)}
                        >
                            <div className="lesson-card-header">
                                <span className="lesson-number">Lesson {lesson.id}</span>
                                {progress.lessonCompleted && (
                                    <span className="lesson-check">✓</span>
                                )}
                            </div>
                            <h3 className="lesson-card-title">{lesson.title}</h3>
                            <p className="lesson-card-description">{lesson.description}</p>

                            <div className="lesson-card-footer">
                                <div className="lesson-topics">
                                    {lesson.keyPoints.slice(0, 2).map((point, index) => (
                                        <span key={index} className="topic-pill">
                                            {point.split(' ')[0]}
                                        </span>
                                    ))}
                                </div>
                                {progress.quizTaken && (
                                    <div className="quiz-score">
                                        Quiz: {Math.round(progress.quizScore)}%
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Lessons;
