type HeaderProps = {
  onWriteReview: () => void
}

export default function Header({ onWriteReview }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo">
          <span className="header__logo-icon" aria-hidden="true">★</span>
          Rando Reviews
        </a>
        <button type="button" className="btn btn--primary" onClick={onWriteReview}>
          Write a Review
        </button>
      </div>
    </header>
  )
}
