/**
 * Review storage utilities
 * Manages the storage and retrieval of user reviews in local storage
 */

import type { Review } from '../types/review'

const STORAGE_KEY = 'rando-reviews:user-reviews'; // Key for the user reviews in local storage
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // Time to live for the user reviews in local storage

// Stored review type - Review with an expiration date
type StoredReview = Review & { expiresAt: number }

/**
 * Read the user reviews from local storage
 * @returns The user reviews
 */
const readStored = ():StoredReview[] => {

  try {

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return []

    // Parse the raw data into an array of stored reviews
    const parsed: StoredReview[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];

  } catch {

    return [];

  }
}

/**
 * Write the user reviews to local storage
 * @param reviews Array of stored reviews to write
 */
const writeStored = (reviews: StoredReview[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

/**
 * Prune expired user reviews from the stored reviews
 * @param stored The stored reviews
 * @returns Array of pruned reviews
 */
const pruneExpired = (stored: StoredReview[]): StoredReview[] => {
  const now = Date.now();
  return stored.filter((review) => review.expiresAt > now);
}

/**
 * Load the user reviews from local storage
 * @returns The user reviews
 */
export const loadUserReviews = (): Review[] => {

  // Prune expired reviews and write the valid reviews to local storage
  const valid = pruneExpired(readStored());
  writeStored(valid);

  // Map the valid reviews to an array of reviews without the expiration date
  // Example: [{ id: '123', subject: 'Review 1', comment: 'This is a review' }, ..]
  return valid.map(({ expiresAt: _, ...review }) => review); // The _ means we're removing the expiresAt property

}

/**
 * Save the user reviews to local storage
 * @param reviews The user reviews to save
 */
export const saveUserReviews = (reviews: Review[]): void => {

  // Create a map of review IDs and their expiration dates
  // Example: { '123': 1717171717171, '456': 1717171717171, .. }
  const expiryById = new Map(
    // Prune expired reviews and map the remaining reviews to an array of [id, expiresAt]
    pruneExpired(readStored()).map((review) => [review.id, review.expiresAt]),
  );

  // Create an array of stored reviews with an added expiration date
  // Example: [{ id: '123', subject: 'Review 1', comment: 'This is a review', expiresAt: 1717171717171 }, ..]
  const stored: StoredReview[] = reviews.map((review) => {

    // If the review is not found in the map, add the TTL to the current time
    const expiresAt = expiryById.get(review.id) || Date.now() + TTL_MS;
    return {...review, expiresAt}; // Return the review with the added expiration date

  });

  // Write the stored reviews to local storage
  writeStored(stored);
}
