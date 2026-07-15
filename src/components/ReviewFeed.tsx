import type { Review } from '../types/review'
import Button from './Button'
import ReviewCard from './ReviewCard'

type ReviewFeedProps = {
  reviews: Review[]
  onWriteReview: () => void
}

export default function ReviewFeed({ reviews, onWriteReview }: ReviewFeedProps) {
  if (reviews.length === 0) {
    return (
      <section className="px-6 py-16 text-center max-md:px-4">
        <p className="mb-5 text-lg text-text-muted">No reviews match your search.</p>
        <Button onClick={onWriteReview}>Write the first review</Button>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
