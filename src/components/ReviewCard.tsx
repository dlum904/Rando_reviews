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
    <article className="review-card">
      <div className="review-card__header">
        <span className="review-card__category">{review.category}</span>
        <time className="review-card__date" dateTime={review.date}>
          {formatDate(review.date)}
        </time>
      </div>
      <h2 className="review-card__subject">{review.subject}</h2>
      <StarRating rating={review.rating} size="sm" />
      <p className="review-card__text">{review.text}</p>
      <p className="review-card__author">— {review.author}</p>
    </article>
  )
}
