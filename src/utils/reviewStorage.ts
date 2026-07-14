import type { Review } from '../types/review'

const STORAGE_KEY = 'rando-reviews:user-reviews'
const TTL_MS = 30 * 24 * 60 * 60 * 1000

type StoredReview = Review & { expiresAt: number }

function readStored(): StoredReview[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: StoredReview[] = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStored(reviews: StoredReview[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
}

function pruneExpired(stored: StoredReview[]): StoredReview[] {
  const now = Date.now()
  return stored.filter((r) => r.expiresAt > now)
}

export function loadUserReviews(): Review[] {
  const valid = pruneExpired(readStored())
  writeStored(valid)
  return valid.map(({ expiresAt: _, ...review }) => review)
}

export function saveUserReviews(reviews: Review[]) {
  const now = Date.now()
  const expiryById = new Map(
    pruneExpired(readStored()).map((r) => [r.id, r.expiresAt]),
  )

  const stored: StoredReview[] = reviews.map((review) => ({
    ...review,
    expiresAt: expiryById.get(review.id) ?? now + TTL_MS,
  }))

  writeStored(stored)
}
