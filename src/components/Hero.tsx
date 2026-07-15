type HeroProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section className="bg-bg-hero px-6 pt-12 pb-14 max-md:px-4 max-md:pt-8 max-md:pb-10">
      <div className="mx-auto max-w-[720px] text-center">
        <h1 className="mb-3 text-[42px] leading-[1.15] tracking-[-0.5px] max-md:text-[28px]">
          Review anything. Find honest opinions.
        </h1>
        <p className="mb-8 text-lg text-text-muted max-md:text-base">
          Discover what people really think — from restaurants to gadgets to movies
          and beyond.
        </p>
        <div className="relative mx-auto max-w-[560px]">
          <svg
            className="pointer-events-none absolute top-1/2 left-4 h-[22px] w-[22px] -translate-y-1/2 fill-text-muted"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="search"
            className="w-full rounded-3xl border border-border bg-bg-elevated py-3.5 pr-4 pl-12 text-base shadow-card outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]"
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
