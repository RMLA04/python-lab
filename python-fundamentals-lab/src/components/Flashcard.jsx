import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ card, onHard, onLearned, onReview }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleHard = (e) => {
        e.stopPropagation();
        onHard(card.id);
        setIsFlipped(false);
    };

    const handleLearned = (e) => {
        e.stopPropagation();
        onLearned(card.id);
        setIsFlipped(false);
    };

    const handleReview = (quality) => (e) => {
        e.stopPropagation();
        onReview(card.id, quality);
        setIsFlipped(false);
    };

    const getStatusBadge = () => {
        const badges = {
            new: { label: 'New', color: 'var(--accent-primary)' },
            learning: { label: 'Learning', color: 'var(--warning)' },
            learned: { label: 'Learned', color: 'var(--success)' },
            hard: { label: 'Hard', color: 'var(--error)' }
        };
        return badges[card.status] || badges.new;
    };

    const badge = getStatusBadge();

    return (
        <div className="flashcard-wrapper">
            <div
                className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                onClick={handleFlip}
            >
                <div className="flashcard-inner">
                    {/* Front */}
                    <div className="flashcard-face flashcard-front">
                        <div className="flashcard-header">
                            <span
                                className="status-badge"
                                style={{ background: badge.color }}
                            >
                                {badge.label}
                            </span>
                            <span className="flip-hint">Click to flip</span>
                        </div>
                        <div className="flashcard-content">
                            <p className="flashcard-text">{card.front}</p>
                        </div>
                        <div className="flashcard-footer">
                        </div>
                    </div>

                    {/* Back */}
                    <div className="flashcard-face flashcard-back">
                        <div className="flashcard-header">
                            <span className="topic-tag">{card.topic}</span>
                        </div>
                        <div className="flashcard-content">
                            <p className="flashcard-text">{card.back}</p>
                        </div>
                        <div className="flashcard-actions">
                            <button
                                className="action-btn hard-btn"
                                onClick={handleHard}
                                title="Mark as hard"
                            >
                                Hard
                            </button>
                            <button
                                className="action-btn again-btn"
                                onClick={handleReview(2)}
                                title="Review again"
                            >
                                Again
                            </button>
                            <button
                                className="action-btn good-btn"
                                onClick={handleReview(4)}
                                title="Got it"
                            >
                                Good
                            </button>
                            <button
                                className="action-btn learned-btn"
                                onClick={handleLearned}
                                title="Mark as learned"
                            >
                                Learned
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
