type HeroProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__inner">
        <h1 className="hero__title">Review anything. Find honest opinions.</h1>
        <p className="hero__subtitle">
          Discover what people really think — from restaurants to gadgets to movies and beyond.
        </p>
        <div className="hero__search">
          <svg className="hero__search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="search"
            className="hero__search-input"
            placeholder="Search reviews by subject, text, or author..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search reviews"
          />
        </div>
      </div>
    </section>
  )
}
