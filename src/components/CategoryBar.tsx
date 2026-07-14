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
    <nav className="category-bar" aria-label="Filter by category">
      <div className="category-bar__inner">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-chip${activeCategory === category ? ' category-chip--active' : ''}`}
            onClick={() => onCategoryChange(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  )
}
