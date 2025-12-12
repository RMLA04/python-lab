// Spaced Repetition Algorithm (SM-2 simplified)

/**
 * Calculate the next review date for a flashcard based on performance
 * @param {number} easeFactor - Current ease factor (2.5 is default)
 * @param {number} interval - Current interval in days
 * @param {number} repetitions - Number of successful repetitions
 * @param {number} quality - Quality of recall (0-5, where 3+ is correct)
 * @returns {Object} Updated card data with new interval, easeFactor, and nextReview
 */
export const calculateNextReview = (easeFactor = 2.5, interval = 0, repetitions = 0, quality) => {
  let newEaseFactor = easeFactor;
  let newInterval = interval;
  let newRepetitions = repetitions;

  // Update ease factor based on quality
  newEaseFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  // If quality is less than 3, reset repetitions
  if (quality < 3) {
    newRepetitions = 0;
    newInterval = 1; // Review again tomorrow
  } else {
    newRepetitions += 1;
    
    // Calculate new interval
    if (newRepetitions === 1) {
      newInterval = 1; // 1 day
    } else if (newRepetitions === 2) {
      newInterval = 6; // 6 days
    } else {
      newInterval = Math.round(interval * newEaseFactor);
    }
  }

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReview: nextReview.toISOString(),
    lastReviewed: new Date().toISOString()
  };
};

/**
 * Get flashcards that are due for review
 * @param {Array} flashcards - Array of flashcard objects with nextReview dates
 * @returns {Array} Flashcards that are due for review
 */
export const getDueFlashcards = (flashcards) => {
  const now = new Date();
  return flashcards.filter(card => {
    if (!card.nextReview) return true; // New cards are always due
    const reviewDate = new Date(card.nextReview);
    return reviewDate <= now;
  });
};

/**
 * Initialize a new flashcard with default spaced repetition values
 * @param {Object} card - Flashcard object
 * @returns {Object} Card with spaced repetition properties
 */
export const initializeCard = (card) => {
  return {
    ...card,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString(),
    lastReviewed: null,
    status: 'new' // 'new', 'learning', 'learned', 'hard'
  };
};

/**
 * Mark a card as hard (needs more practice)
 * @param {Object} card - Flashcard object
 * @returns {Object} Updated card marked as hard
 */
export const markAsHard = (card) => {
  return {
    ...card,
    status: 'hard',
    easeFactor: Math.max(1.3, card.easeFactor - 0.2),
    interval: 1,
    nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Review tomorrow
  };
};

/**
 * Mark a card as learned (mastered)
 * @param {Object} card - Flashcard object
 * @returns {Object} Updated card marked as learned
 */
export const markAsLearned = (card) => {
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + 30); // Review in 30 days
  
  return {
    ...card,
    status: 'learned',
    easeFactor: Math.min(3.0, card.easeFactor + 0.1),
    interval: 30,
    nextReview: nextReview.toISOString()
  };
};
