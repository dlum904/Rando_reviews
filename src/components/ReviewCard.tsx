import type { Review } from '../types/review'
import StarRating from './StarRating'

type ReviewCardProps = {
  review: Review
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="rounded-lg border border-border bg-bg-elevated p-5 text-left transition-[box-shadow,border-color] duration-200 hover:border-accent hover:shadow-card">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="rounded bg-accent-bg px-2 py-0.5 text-xs font-semibold tracking-wide text-accent uppercase">
          {review.category}
        </span>
        <time className="text-[13px] text-text-muted" dateTime={review.date}>
          {formatDate(review.date)}
        </time>
      </div>
      <h2 className="mb-2 text-lg leading-snug">{review.subject}</h2>
      <StarRating rating={review.rating} size="sm" />
      <p className="my-3 line-clamp-4 text-[15px] leading-[1.55] text-text-muted">
        {review.text}
      </p>
      <p className="text-sm font-semibold text-text">— {review.author}</p>
    </article>
  )
}
