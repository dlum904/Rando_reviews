import { useState, type FormEvent } from 'react'
import { CATEGORIES } from '../types/review'
import StarRating from './StarRating'

export type ReviewFormData = {
  subject: string
  category: string
  rating: number
  text: string
  author: string
}

type ReviewFormProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ReviewFormData) => void
}

const initialForm: ReviewFormData = {
  subject: '',
  category: 'Products',
  rating: 0,
  text: '',
  author: '',
}

export default function ReviewForm({ isOpen, onClose, onSubmit }: ReviewFormProps) {
  const [form, setForm] = useState<ReviewFormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormData, string>>>({})

  if (!isOpen) return null

  function validate() {
    const next: Partial<Record<keyof ReviewFormData, string>> = {}
    if (!form.subject.trim()) next.subject = 'Subject is required'
    if (!form.author.trim()) next.author = 'Author name is required'
    if (form.rating === 0) next.rating = 'Please select a rating'
    if (!form.text.trim()) next.text = 'Review text is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
    setForm(initialForm)
    setErrors({})
  }

  function handleClose() {
    setForm(initialForm)
    setErrors({})
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="review-form-title" className="modal__title">Write a Review</h2>
          <button
            type="button"
            className="modal__close"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="subject">What are you reviewing?</label>
            <input
              id="subject"
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="e.g. Sony Headphones, Joe's Pizza..."
            />
            {errors.subject && <span className="form-error">{errors.subject}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Rating</label>
            <StarRating
              rating={form.rating}
              interactive
              onChange={(rating) => setForm({ ...form, rating })}
            />
            {errors.rating && <span className="form-error">{errors.rating}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="text">Your review</label>
            <textarea
              id="text"
              rows={4}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="Share your honest opinion..."
            />
            {errors.text && <span className="form-error">{errors.text}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="author">Your name</label>
            <input
              id="author"
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="How should we display your name?"
            />
            {errors.author && <span className="form-error">{errors.author}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn--secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
