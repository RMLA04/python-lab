import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import Flashcard from '../components/Flashcard';
import { getDueFlashcards } from '../utils/spacedRepetition';
import './FlashcardsPage.css';

const FlashcardsPage = () => {
    const { flashcards, updateFlashcard, markFlashcardAsHard, markFlashcardAsLearned } = useProgress();
    const [filter, setFilter] = useState('all');
    const [currentIndex, setCurrentIndex] = useState(0);

    const getFilteredCards = () => {
        switch (filter) {
            case 'new':
                return flashcards.filter(card => card.status === 'new');
            case 'learning':
                return flashcards.filter(card => card.status === 'learning');
            case 'hard':
                return flashcards.filter(card => card.status === 'hard');
            case 'learned':
                return flashcards.filter(card => card.status === 'learned');
            case 'due':
                return getDueFlashcards(flashcards);
            default:
                return flashcards;
        }
    };

    const filteredCards = getFilteredCards();
    const currentCard = filteredCards[currentIndex];

    const handleNext = () => {
        if (currentIndex < filteredCards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(filteredCards.length - 1);
        }
    };

    const handleHard = (cardId) => {
        markFlashcardAsHard(cardId);
        handleNext();
    };

    const handleLearned = (cardId) => {
        markFlashcardAsLearned(cardId);
        handleNext();
    };

    const handleReview = (cardId, quality) => {
        updateFlashcard(cardId, quality);
        handleNext();
    };

    const filterOptions = [
        { value: 'all', label: 'All Cards', count: flashcards.length },
        { value: 'due', label: 'Due for Review', count: getDueFlashcards(flashcards).length },
        { value: 'new', label: 'New', count: flashcards.filter(c => c.status === 'new').length },
        { value: 'learning', label: 'Learning', count: flashcards.filter(c => c.status === 'learning').length },
        { value: 'hard', label: 'Hard', count: flashcards.filter(c => c.status === 'hard').length },
        { value: 'learned', label: 'Learned', count: flashcards.filter(c => c.status === 'learned').length }
    ];

    return (
        <div className="flashcards-page">
            <div className="flashcards-header">
                <h1 className="page-title">Flashcards</h1>
                <p className="page-description">
                    Master Python concepts with spaced repetition learning
                </p>
            </div>

            <div className="filter-section">
                <div className="filter-buttons">
                    {filterOptions.map(option => (
                        <button
                            key={option.value}
                            className={`filter-btn ${filter === option.value ? 'active' : ''}`}
                            onClick={() => {
                                setFilter(option.value);
                                setCurrentIndex(0);
                            }}
                        >
                            <span className="filter-label">{option.label}</span>
                            <span className="filter-count">{option.count}</span>
                        </button>
                    ))}
                </div>
            </div>

            {filteredCards.length > 0 ? (
                <div className="flashcard-container">
                    <div className="card-progress">
                        <span className="progress-text">
                            Card {currentIndex + 1} of {filteredCards.length}
                        </span>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <Flashcard
                        key={currentCard.id}
                        card={currentCard}
                        onHard={handleHard}
                        onLearned={handleLearned}
                        onReview={handleReview}
                    />

                    <div className="navigation-buttons">
                        <button className="nav-btn" onClick={handlePrevious}>
                            <span className="nav-icon">←</span>
                            <span>Previous</span>
                        </button>
                        <button className="nav-btn" onClick={handleNext}>
                            <span>Next</span>
                            <span className="nav-icon">→</span>
                        </button>
                    </div>

                    <div className="session-stats">
                        <div className="stat">
                            <span className="stat-label">Session Progress</span>
                            <span className="stat-value">
                                {Math.round(((currentIndex + 1) / filteredCards.length) * 100)}%
                            </span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Cards Remaining</span>
                            <span className="stat-value">{filteredCards.length - currentIndex - 1}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="empty-state">
                    <h2 className="empty-title">No cards in this category!</h2>
                    <p className="empty-description">
                        {filter === 'due'
                            ? "You're all caught up! Come back later for more reviews."
                            : `Try selecting a different filter to see more cards.`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FlashcardsPage;
