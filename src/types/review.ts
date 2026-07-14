export type Review = {
  id: string
  subject: string
  category: string
  rating: number
  text: string
  author: string
  date: string
}

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
