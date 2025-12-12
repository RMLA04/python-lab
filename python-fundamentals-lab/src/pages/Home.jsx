import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import './Home.css';

const Home = () => {
    const { progress } = useProgress();

    const features = [
        {
            title: 'Interactive Lessons',
            description: 'Learn Python fundamentals through bite-sized, easy-to-understand lessons',
            path: '/lessons',
            color: 'var(--accent-primary)'
        },
        {
            title: 'Smart Flashcards',
            description: 'Master concepts with spaced repetition and adaptive learning',
            path: '/flashcards',
            color: 'var(--accent-secondary)'
        },
        {
            title: 'Practice Quizzes',
            description: 'Test your knowledge with detailed explanations for every answer',
            path: '/quiz',
            color: 'var(--success)'
        },
        {
            title: 'Track Progress',
            description: 'Monitor your learning journey with XP, streaks, and achievements',
            path: '/progress',
            color: 'var(--warning)'
        }
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-text">Learn Python Fundamentals</span>
                    </div>
                    <h1 className="hero-title">
                        Master Python with
                        <span className="hero-highlight"> Interactive Learning</span>
                    </h1>
                    <p className="hero-description">
                        A complete learning platform designed to teach you Python fundamentals through
                        interactive lessons, smart flashcards, and engaging quizzes. Track your progress
                        and build a strong foundation in programming.
                    </p>
                    <div className="hero-actions">
                        <Link to="/lessons" className="btn btn-primary">
                            <span>Start Learning</span>
                            <span className="btn-icon">→</span>
                        </Link>
                        <Link to="/progress" className="btn btn-secondary">
                            <span>View Progress</span>
                        </Link>
                    </div>

                    {/* Quick Stats */}
                    {progress.xp > 0 && (
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <span className="hero-stat-value">{progress.xp}</span>
                                <span className="hero-stat-label">XP Earned</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">{progress.streak}</span>
                                <span className="hero-stat-label">Day Streak</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">{progress.completedLessons.length}/9</span>
                                <span className="hero-stat-label">Lessons</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="hero-visual">
                    <div className="code-window">
                        <div className="code-window-header">
                            <div className="code-dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <span className="code-title">hello_python.py</span>
                        </div>
                        <div className="code-window-body">
                            <pre className="code-preview">
                                {`# Welcome to Python!
def greet(name):
    return f"Hello, {name}!"

# Python makes coding fun
import antigravity

print(greet("World"))
# Output: Hello, World!`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2 className="section-title">Everything You Need to Learn Python</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <Link
                            to={feature.path}
                            key={index}
                            className="feature-card"
                            style={{ '--feature-color': feature.color }}
                        >
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                            <div className="feature-arrow">→</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Topics Preview */}
            <section className="topics-preview">
                <h2 className="section-title">What You'll Learn</h2>
                <div className="topics-grid">
                    {['Variables', 'Data Types', 'Operators', 'Conditionals', 'Loops', 'Functions', 'Data Structures', 'Modules', 'File Operations'].map((topic, index) => (
                        <div key={index} className="topic-tag">
                            <span className="topic-check">✓</span>
                            <span className="topic-name">{topic}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start Your Python Journey?</h2>
                    <p className="cta-description">
                        Join thousands of learners mastering Python fundamentals
                    </p>
                    <Link to="/lessons" className="btn btn-large btn-primary">
                        <span>Begin Learning Now</span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
