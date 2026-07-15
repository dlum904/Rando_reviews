import Button from './Button'

type HeaderProps = {
  onWriteReview: () => void
}

export default function Header({ onWriteReview }: HeaderProps) {
  return (
    <header className="sticky top-0 z-100 border-b border-border bg-bg-elevated">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 max-md:px-4">
        <a
          href="/"
          className="flex items-center gap-2 text-[22px] font-bold text-accent no-underline"
        >
          <span className="text-2xl" aria-hidden="true">
            ★
          </span>
          Rando Reviews
        </a>
        <Button onClick={onWriteReview}>Write a Review</Button>
      </div>
    </header>
  )
}
