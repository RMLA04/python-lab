import React from 'react';
import { useProgress } from '../context/ProgressContext';
import './Dashboard.css';

const Dashboard = () => {
    const { progress, flashcards, getMasteredTopics } = useProgress();

    const masteredTopics = getMasteredTopics();
    const hardCards = flashcards.filter(card => card.status === 'hard');
    const learnedCards = flashcards.filter(card => card.status === 'learned');
    const totalCards = flashcards.length;

    const xpToNextLevel = 500;
    const currentLevel = Math.floor(progress.xp / xpToNextLevel) + 1;
    const xpInCurrentLevel = progress.xp % xpToNextLevel;
    const xpProgress = (xpInCurrentLevel / xpToNextLevel) * 100;

    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Your Progress</h2>

            <div className="stats-grid">
                {/* Streak Card */}
                <div className="stat-card streak-card">
                    <div className="stat-content">
                        <div className="stat-value">{progress.streak}</div>
                        <div className="stat-label">Day Streak</div>
                    </div>
                </div>

                {/* XP Card */}
                <div className="stat-card xp-card">
                    <div className="stat-content">
                        <div className="stat-value">{progress.xp}</div>
                        <div className="stat-label">Total XP</div>
                    </div>
                </div>

                {/* Level Card */}
                <div className="stat-card level-card">
                    <div className="stat-content">
                        <div className="stat-value">Level {currentLevel}</div>
                        <div className="stat-label">Current Level</div>
                    </div>
                </div>

                {/* Lessons Card */}
                <div className="stat-card lessons-card">
                    <div className="stat-content">
                        <div className="stat-value">{progress.completedLessons.length}/9</div>
                        <div className="stat-label">Lessons Done</div>
                    </div>
                </div>
            </div>

            {/* XP Progress Bar */}
            <div className="xp-progress-section">
                <div className="xp-progress-header">
                    <span className="xp-progress-label">Level {currentLevel} Progress</span>
                    <span className="xp-progress-value">{xpInCurrentLevel} / {xpToNextLevel} XP</span>
                </div>
                <div className="xp-progress-bar">
                    <div
                        className="xp-progress-fill"
                        style={{ width: `${xpProgress}%` }}
                    />
                </div>
            </div>

            {/* Mastered Topics */}
            <div className="mastered-section">
                <h3 className="section-title">
                    Mastered Topics ({masteredTopics.length})
                </h3>
                {masteredTopics.length > 0 ? (
                    <div className="mastered-list">
                        {masteredTopics.map(topic => (
                            <div key={topic} className="mastered-item">
                                <span className="mastered-check">✓</span>
                                <span className="mastered-name">{topic}</span>
                                <span className="mastered-score">
                                    {Math.round(progress.quizScores[topic].percentage)}%
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">Complete lessons and score 80%+ on quizzes to master topics!</p>
                )}
            </div>

            {/* Flashcard Stats */}
            <div className="flashcard-stats">
                <h3 className="section-title">
                    Flashcard Progress
                </h3>
                <div className="flashcard-stats-grid">
                    <div className="flashcard-stat">
                        <div className="flashcard-stat-value">{totalCards}</div>
                        <div className="flashcard-stat-label">Total Cards</div>
                    </div>
                    <div className="flashcard-stat learned">
                        <div className="flashcard-stat-value">{learnedCards.length}</div>
                        <div className="flashcard-stat-label">Learned</div>
                    </div>
                    <div className="flashcard-stat hard">
                        <div className="flashcard-stat-value">{hardCards.length}</div>
                        <div className="flashcard-stat-label">Need Practice</div>
                    </div>
                    <div className="flashcard-stat progress">
                        <div className="flashcard-stat-value">
                            {Math.round((learnedCards.length / totalCards) * 100)}%
                        </div>
                        <div className="flashcard-stat-label">Mastery</div>
                    </div>
                </div>
            </div>

            {/* Hard Cards List */}
            {hardCards.length > 0 && (
                <div className="hard-cards-section">
                    <h3 className="section-title">
                        Cards Needing Practice ({hardCards.length})
                    </h3>
                    <div className="hard-cards-list">
                        {hardCards.slice(0, 5).map(card => (
                            <div key={card.id} className="hard-card-item">
                                <span className="hard-card-topic">{card.topic}</span>
                                <span className="hard-card-question">{card.front}</span>
                            </div>
                        ))}
                    </div>
                    {hardCards.length > 5 && (
                        <p className="more-cards">+ {hardCards.length - 5} more cards</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
