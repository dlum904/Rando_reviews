import { useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryBar from './components/CategoryBar';
import Footer from './components/Footer';
import ReviewFeed from './components/ReviewFeed';
import ReviewForm, { type ReviewFormData } from './components/ReviewForm';
import ReviewDetailModal from './components/ReviewDetailModal';
import { seedReviews } from './data/seedReviews';
import type { Review } from './types/review';
import { loadUserReviews, saveUserReviews } from './utils/reviewStorage';

function App() {

  // State variables for the app
  const [userReviews, setUserReviews] = useState<Review[]>(loadUserReviews); // Load user reviews from local storage
  const [searchQuery, setSearchQuery] = useState(''); // Search query for reviews
  const [activeCategory, setActiveCategory] = useState('All'); // Active category for displayed reviews
  const [isFormOpen, setIsFormOpen] = useState(false); // Whether the review form is open
  const [selectedReview, setSelectedReview] = useState<Review | null>(null) // Selected review for the detail modal
  const [toast, setToast] = useState<string | null>(null); // Toast message for reviews

  // Combine user reviews and seed reviews to get all reviews
  // Use useMemo so we only re-compute when the user reviews change
  const reviews = useMemo(
    () => [...userReviews, ...seedReviews],
    [userReviews],
  )

  // Filter the reviews based on the search query and active category
  const filteredReviews = useMemo(
    () => {
      
      const query = searchQuery.toLowerCase().trim();

      // Filter the reviews based on the search query and active category
      return reviews.filter((review) => {

        // Check if the review matches the active category
        const matchesCategory =
          activeCategory === 'All' || review.category === activeCategory

        // Check if the review matches the search query
        const matchesSearch =
          !query ||
          review.subject.toLowerCase().includes(query) ||
          review.text.toLowerCase().includes(query) ||
          review.author.toLowerCase().includes(query)

        // Return true only if the review matches the active category and search query
        return matchesCategory && matchesSearch;

      });
    },
    [reviews, searchQuery, activeCategory] // Only re-compute when the reviews, search query, or active category change
  )

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
    <div className="flex min-h-svh flex-col">
      <Header onWriteReview={() => setIsFormOpen(true)} />
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CategoryBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-8 pb-16 max-md:px-4">
        <ReviewFeed
          reviews={filteredReviews}
          onWriteReview={() => setIsFormOpen(true)}
          onSelectReview={setSelectedReview}
        />
      </main>
      <ReviewForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitReview}
      />
      <ReviewDetailModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
        onCommentAdded={() => {
          setToast('Comment posted!')
          setTimeout(() => setToast(null), 3000)
        }}
      />
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-300 -translate-x-1/2 animate-toast-in rounded-lg bg-accent px-6 py-3 text-[15px] font-medium text-white shadow-modal"
          role="status"
        >
          {toast}
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
