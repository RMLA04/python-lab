import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/localStorage';
import { initializeCard, calculateNextReview, markAsHard, markAsLearned } from '../utils/spacedRepetition';
import flashcardsData from '../data/flashcards.json';

const ProgressContext = createContext();

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

const getDefaultProgress = () => ({
    xp: 0,
    completedLessons: [],
    quizScores: {},
    flashcardProgress: {},
    streak: 0,
    lastVisit: new Date().toISOString(),
    achievements: []
});

export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(() => {
        return loadFromStorage(STORAGE_KEYS.PROGRESS, getDefaultProgress());
    });

    const [flashcards, setFlashcards] = useState(() => {
        const saved = loadFromStorage(STORAGE_KEYS.FLASHCARDS);
        if (saved) return saved;

        // Initialize flashcards with spaced repetition data
        return flashcardsData.map(card => initializeCard(card));
    });

    // Update streak on mount
    useEffect(() => {
        updateStreak();
    }, []);

    // Save progress whenever it changes
    useEffect(() => {
        saveToStorage(STORAGE_KEYS.PROGRESS, progress);
    }, [progress]);

    // Save flashcards whenever they change
    useEffect(() => {
        saveToStorage(STORAGE_KEYS.FLASHCARDS, flashcards);
    }, [flashcards]);

    const updateStreak = () => {
        const lastVisit = new Date(progress.lastVisit);
        const today = new Date();
        const diffTime = Math.abs(today - lastVisit);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        setProgress(prev => {
            let newStreak = prev.streak;

            if (diffDays === 0) {
                // Same day, no change
                newStreak = prev.streak;
            } else if (diffDays === 1) {
                // Consecutive day, increment
                newStreak = prev.streak + 1;
            } else {
                // Streak broken, reset to 1
                newStreak = 1;
            }

            return {
                ...prev,
                streak: newStreak,
                lastVisit: today.toISOString()
            };
        });
    };

    const addXP = (amount) => {
        setProgress(prev => ({
            ...prev,
            xp: prev.xp + amount
        }));
    };

    const completeLesson = (lessonId) => {
        if (!progress.completedLessons.includes(lessonId)) {
            setProgress(prev => ({
                ...prev,
                completedLessons: [...prev.completedLessons, lessonId],
                xp: prev.xp + 50 // 50 XP for completing a lesson
            }));
        }
    };

    const saveQuizScore = (topic, score, totalQuestions) => {
        const percentage = (score / totalQuestions) * 100;
        const xpEarned = Math.round(percentage); // 1 XP per percentage point

        setProgress(prev => ({
            ...prev,
            quizScores: {
                ...prev.quizScores,
                [topic]: {
                    score,
                    totalQuestions,
                    percentage,
                    date: new Date().toISOString()
                }
            },
            xp: prev.xp + xpEarned
        }));
    };

    const updateFlashcard = (cardId, quality) => {
        setFlashcards(prev => {
            return prev.map(card => {
                if (card.id === cardId) {
                    const updated = calculateNextReview(
                        card.easeFactor,
                        card.interval,
                        card.repetitions,
                        quality
                    );

                    return {
                        ...card,
                        ...updated,
                        status: quality >= 4 ? 'learning' : quality >= 3 ? 'learning' : 'hard'
                    };
                }
                return card;
            });
        });

        // Award XP for reviewing flashcard
        addXP(5);
    };

    const markFlashcardAsHard = (cardId) => {
        setFlashcards(prev => {
            return prev.map(card => {
                if (card.id === cardId) {
                    return markAsHard(card);
                }
                return card;
            });
        });
    };

    const markFlashcardAsLearned = (cardId) => {
        setFlashcards(prev => {
            return prev.map(card => {
                if (card.id === cardId) {
                    return markAsLearned(card);
                }
                return card;
            });
        });

        // Award bonus XP for mastering a flashcard
        addXP(20);
    };

    const getFlashcardsByStatus = (status) => {
        if (status === 'all') return flashcards;
        return flashcards.filter(card => card.status === status);
    };

    const getTopicProgress = (topic) => {
        const lessonCompleted = progress.completedLessons.includes(topic);
        const quizTaken = progress.quizScores[topic] !== undefined;
        const quizScore = quizTaken ? progress.quizScores[topic].percentage : 0;

        return {
            lessonCompleted,
            quizTaken,
            quizScore,
            mastered: lessonCompleted && quizScore >= 80
        };
    };

    const getMasteredTopics = () => {
        return Object.keys(progress.quizScores).filter(topic => {
            const score = progress.quizScores[topic].percentage;
            return score >= 80 && progress.completedLessons.includes(topic);
        });
    };

    const resetProgress = () => {
        setProgress(getDefaultProgress());
        setFlashcards(flashcardsData.map(card => initializeCard(card)));
    };

    const value = {
        progress,
        flashcards,
        addXP,
        completeLesson,
        saveQuizScore,
        updateFlashcard,
        markFlashcardAsHard,
        markFlashcardAsLearned,
        getFlashcardsByStatus,
        getTopicProgress,
        getMasteredTopics,
        resetProgress
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
