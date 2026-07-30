import { useEffect, useState, type FormEvent } from 'react'
import type { Comment, Review } from '../types/review'
import { loadComments, saveComment } from '../utils/commentStorage'
import Button from './Button'
import StarRating from './StarRating'

type ReviewDetailModalProps = {
  review: Review | null
  onClose: () => void
  onCommentAdded?: () => void
}

const fieldInputClasses =
  'rounded border border-border px-3 py-2.5 outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ReviewDetailModal({
  review,
  onClose,
  onCommentAdded,
}: ReviewDetailModalProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState<{ author?: string; text?: string }>({})

  useEffect(() => {
    if (review) {
      setComments(loadComments(review.id))
      setAuthor('')
      setText('')
      setErrors({})
    }
  }, [review])

  if (!review) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!review) return

    const next: { author?: string; text?: string } = {}
    if (!author.trim()) next.author = 'Name is required'
    if (!text.trim()) next.text = 'Comment is required'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const comment: Comment = {
      id: crypto.randomUUID(),
      reviewId: review.id,
      author: author.trim(),
      text: text.trim(),
      date: new Date().toISOString().split('T')[0],
    }

    saveComment(comment)
    setComments((prev) => [...prev, comment])
    setAuthor('')
    setText('')
    setErrors({})
    onCommentAdded?.()
  }

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-lg border border-border bg-bg-elevated shadow-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-detail-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div className="min-w-0 pr-4">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="rounded bg-accent-bg px-2 py-0.5 text-xs font-semibold tracking-wide text-accent uppercase">
                {review.category}
              </span>
              <time className="text-[13px] text-text-muted" dateTime={review.date}>
                {formatDate(review.date)}
              </time>
            </div>
            <h2 id="review-detail-title" className="text-xl leading-snug">
              {review.subject}
            </h2>
          </div>
          <button
            type="button"
            className="shrink-0 border-none bg-transparent px-1 text-[28px] leading-none text-text-muted hover:text-text"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5">
          <StarRating rating={review.rating} />
          <p className="mt-4 text-[15px] leading-[1.55] text-text-muted">{review.text}</p>
          <p className="mt-4 text-sm font-semibold text-text">— {review.author}</p>
        </div>

        <div className="border-t border-border px-6 py-5">
          <h3 className="mb-4 text-base font-semibold">
            Comments{comments.length > 0 ? ` (${comments.length})` : ''}
          </h3>

          {comments.length === 0 ? (
            <p className="mb-5 text-sm text-text-muted">
              No comments yet. Be the first to share your thoughts.
            </p>
          ) : (
            <ul className="mb-5 flex flex-col gap-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="rounded-lg border border-border bg-bg px-4 py-3"
                >
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-text">
                      {comment.author}
                    </span>
                    <time
                      className="shrink-0 text-[13px] text-text-muted"
                      dateTime={comment.date}
                    >
                      {formatDate(comment.date)}
                    </time>
                  </div>
                  <p className="text-[15px] leading-[1.55] text-text-muted">
                    {comment.text}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="comment-author" className="text-sm font-semibold">
                Your name
              </label>
              <input
                id="comment-author"
                type="text"
                className={fieldInputClasses}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="How should we display your name?"
              />
              {errors.author && (
                <span className="text-[13px] text-accent">{errors.author}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="comment-text" className="text-sm font-semibold">
                Add a comment
              </label>
              <textarea
                id="comment-text"
                rows={3}
                className={`${fieldInputClasses} resize-y`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts on this review..."
              />
              {errors.text && (
                <span className="text-[13px] text-accent">{errors.text}</span>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit">Post Comment</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
