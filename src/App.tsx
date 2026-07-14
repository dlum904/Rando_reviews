import { useMemo, useState } from 'react'
import CategoryBar from './components/CategoryBar'
import Header from './components/Header'
import Hero from './components/Hero'
import ReviewFeed from './components/ReviewFeed'
import ReviewForm, { type ReviewFormData } from './components/ReviewForm'
import { seedReviews } from './data/seedReviews'
import type { Review } from './types/review'
import { loadUserReviews, saveUserReviews } from './utils/reviewStorage'
import './App.css'
import Footer from './components/Footer'

function App() {
  const [userReviews, setUserReviews] = useState<Review[]>(loadUserReviews)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const reviews = useMemo(
    () => [...userReviews, ...seedReviews],
    [userReviews],
  )

  const filteredReviews = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()

    return reviews.filter((review) => {
      const matchesCategory =
        activeCategory === 'All' || review.category === activeCategory

      const matchesSearch =
        !query ||
        review.subject.toLowerCase().includes(query) ||
        review.text.toLowerCase().includes(query) ||
        review.author.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [reviews, searchQuery, activeCategory])

  function handleSubmitReview(data: ReviewFormData) {
    const newReview: Review = {
      id: crypto.randomUUID(),
      subject: data.subject.trim(),
      category: data.category,
      rating: data.rating,
      text: data.text.trim(),
      author: data.author.trim(),
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newReview, ...userReviews]
    saveUserReviews(updated)
    setUserReviews(updated)
    setIsFormOpen(false)
    setToast('Review submitted successfully!')
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="app">
      <Header onWriteReview={() => setIsFormOpen(true)} />
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CategoryBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="main">
        <ReviewFeed
          reviews={filteredReviews}
          onWriteReview={() => setIsFormOpen(true)}
        />
      </main>
      <ReviewForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitReview}
      />
      {toast && <div className="toast" role="status">{toast}</div>}
      <Footer />
    </div>
  )
}

export default App
