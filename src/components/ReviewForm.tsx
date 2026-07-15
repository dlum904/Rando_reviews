import { useState, type FormEvent } from 'react'
import { CATEGORIES } from '../types/review'
import Button from './Button'
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

const fieldInputClasses =
  'rounded border border-border px-3 py-2.5 outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]'

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
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 p-6"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-lg border border-border bg-bg-elevated shadow-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 id="review-form-title" className="text-xl">
            Write a Review
          </h2>
          <button
            type="button"
            className="border-none bg-transparent px-1 text-[28px] leading-none text-text-muted hover:text-text"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className="flex flex-col gap-[18px] p-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="subject" className="text-sm font-semibold">
              What are you reviewing?
            </label>
            <input
              id="subject"
              type="text"
              className={fieldInputClasses}
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="e.g. Sony Headphones, Joe's Pizza..."
            />
            {errors.subject && (
              <span className="text-[13px] text-accent">{errors.subject}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="category" className="text-sm font-semibold">
              Category
            </label>
            <select
              id="category"
              className={fieldInputClasses}
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

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-semibold">Rating</label>
            <StarRating
              rating={form.rating}
              interactive
              onChange={(rating) => setForm({ ...form, rating })}
            />
            {errors.rating && (
              <span className="text-[13px] text-accent">{errors.rating}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="text" className="text-sm font-semibold">
              Your review
            </label>
            <textarea
              id="text"
              rows={4}
              className={`${fieldInputClasses} resize-y`}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="Share your honest opinion..."
            />
            {errors.text && (
              <span className="text-[13px] text-accent">{errors.text}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="author" className="text-sm font-semibold">
              Your name
            </label>
            <input
              id="author"
              type="text"
              className={fieldInputClasses}
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="How should we display your name?"
            />
            {errors.author && (
              <span className="text-[13px] text-accent">{errors.author}</span>
            )}
          </div>

          <div className="mt-1 flex justify-end gap-3 max-md:flex-col-reverse">
            <Button variant="secondary" onClick={handleClose} className="max-md:w-full">
              Cancel
            </Button>
            <Button type="submit" className="max-md:w-full">
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
