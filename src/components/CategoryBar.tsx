import { CATEGORIES } from '../types/review'

type CategoryBarProps = {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryBar({
  activeCategory,
  onCategoryChange,
}: CategoryBarProps) {
  return (
    <nav
      className="border-b border-border bg-bg-elevated"
      aria-label="Filter by category"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-2 px-6 py-4 max-md:px-4">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'border-accent bg-accent text-white hover:border-accent-dark hover:bg-accent-dark'
                  : 'border-border bg-bg text-text hover:border-accent hover:text-accent'
              }`}
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
            >
              {category}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
