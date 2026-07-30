import type { Comment } from '../types/review'

const STORAGE_KEY = 'rando-reviews:comments'
const TTL_MS = 30 * 24 * 60 * 60 * 1000

type StoredComment = Comment & { expiresAt: number }

function readStored(): StoredComment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: StoredComment[] = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStored(comments: StoredComment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
}

function pruneExpired(stored: StoredComment[]): StoredComment[] {
  const now = Date.now()
  return stored.filter((c) => c.expiresAt > now)
}

export function loadComments(reviewId: string): Comment[] {
  const valid = pruneExpired(readStored())
  writeStored(valid)

  return valid
    .filter((c) => c.reviewId === reviewId)
    .map(({ expiresAt: _expiresAt, ...comment }) => comment)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function saveComment(comment: Comment) {
  const valid = pruneExpired(readStored())
  const stored: StoredComment = {
    ...comment,
    expiresAt: Date.now() + TTL_MS,
  }
  writeStored([stored, ...valid])
}
