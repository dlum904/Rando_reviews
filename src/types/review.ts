// Review type
// Represents a review of a product, place, service, etc.
export type Review = {
  id: string
  subject: string
  category: string
  rating: number
  text: string
  author: string
  date: string
}

// Comment type
// Represents a comment on a review
export type Comment = {
  id: string
  reviewId: string
  author: string
  text: string
  date: string
}

// Categories for reviews
// Represents the categories of reviews
export const CATEGORIES = [
  'All',
  'Products',
  'Places',
  'Services',
  'Food',
  'Movies',
  'Other',
] as const

export type Category = (typeof CATEGORIES)[number]
