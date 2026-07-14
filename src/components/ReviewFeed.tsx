import type { Review } from '../types/review'
import ReviewCard from './ReviewCard'

type ReviewFeedProps = {
  reviews: Review[]
  onWriteReview: () => void
}

export default function ReviewFeed({ reviews, onWriteReview }: ReviewFeedProps) {
  if (reviews.length === 0) {
    return (
      <section className="review-feed review-feed--empty">
        <p className="review-feed__empty-text">No reviews match your search.</p>
        <button type="button" className="btn btn--primary" onClick={onWriteReview}>
          Write the first review
        </button>
      </section>
    )
  }

  return (
    <section className="review-feed">
      <div className="review-feed__header">
        <h2 className="review-feed__title">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </h2>
      </div>
      <div className="review-feed__grid">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
