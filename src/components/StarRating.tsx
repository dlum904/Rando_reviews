type StarRatingProps = {
  rating: number
  max?: number
  interactive?: boolean
  onChange?: (rating: number) => void
  size?: 'sm' | 'md'
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`star-icon ${filled ? 'star-icon--filled' : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export default function StarRating({
  rating,
  max = 5,
  interactive = false,
  onChange,
  size = 'md',
}: StarRatingProps) {
  return (
    <div
      className={`star-rating star-rating--${size}${interactive ? ' star-rating--interactive' : ''}`}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={interactive ? 'Rating' : `${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const filled = starValue <= rating

        if (interactive) {
          return (
            <button
              key={starValue}
              type="button"
              className="star-button"
              role="radio"
              aria-checked={filled}
              aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
              onClick={() => onChange?.(starValue)}
            >
              <StarIcon filled={filled} />
            </button>
          )
        }

        return <StarIcon key={starValue} filled={filled} />
      })}
    </div>
  )
}
