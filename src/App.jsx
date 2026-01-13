import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import EntryPage from './pages/EntryPage'
import MainPage from './pages/MainPage'
import MainPageId from './pages/MainPageId'
import MainPageVn from './pages/MainPageVn'
import MainPageJp from './pages/MainPageJp'
import CommunicationLounge from './pages/CommunicationLounge'
import DiseaseBoard from './pages/DiseaseBoard'
import PostDetail from './pages/PostDetail'
import CaregivingJournal from './pages/CaregivingJournal'
import HealingContent from './pages/HealingContent'

// Protected Route Component - checks if user has seen intro
function ProtectedRoute({ children }) {
  const [hasSeenIntro, setHasSeenIntro] = useState(null)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check localStorage synchronously on mount
    const seenIntro = localStorage.getItem('hasSeenIntro') === 'true'
    setHasSeenIntro(seenIntro)
    setIsChecking(false)
  }, [])

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-text-dark">Loading...</div>
      </div>
    )
  }

  // Redirect to entry page if not seen intro
  if (!hasSeenIntro) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const [hasSeenIntro, setHasSeenIntro] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage on mount
    const checkIntro = () => {
      try {
        const seenIntro = localStorage.getItem('hasSeenIntro') === 'true'
        setHasSeenIntro(seenIntro)
        setIsLoading(false)
      } catch (error) {
        console.error('Error checking localStorage:', error)
        setHasSeenIntro(false)
        setIsLoading(false)
      }
    }
    
    checkIntro()
    
    // Listen for storage changes (in case user clears localStorage in another tab)
    window.addEventListener('storage', checkIntro)
    return () => window.removeEventListener('storage', checkIntro)
  }, [])

  // Show loading while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-text-dark">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-bg-light">
        <Routes>
          <Route
            path="/"
            element={
              hasSeenIntro ? (
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              ) : (
                <EntryPage 
                  onSeenIntro={() => {
                    localStorage.setItem('hasSeenIntro', 'true')
                    setHasSeenIntro(true)
                  }} 
                />
              )
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/id/home"
            element={
              <ProtectedRoute>
                <MainPageId />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vn/home"
            element={
              <ProtectedRoute>
                <MainPageVn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jp/home"
            element={
              <ProtectedRoute>
                <MainPageJp />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/communication-lounge" 
            element={
              <ProtectedRoute>
                <CommunicationLounge />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/home/disease/:diseaseId" 
            element={
              <ProtectedRoute>
                <DiseaseBoard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/home/disease/:diseaseId/post/:postId" 
            element={
              <ProtectedRoute>
                <PostDetail />
              </ProtectedRoute>
            } 
          />
          <Route path="/main" element={<Navigate to="/home" replace />} />
          <Route 
            path="/board/:diseaseId" 
            element={
              <ProtectedRoute>
                <DiseaseBoard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/caregiving-journal" 
            element={
              <ProtectedRoute>
                <CaregivingJournal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/healing-content" 
            element={
              <ProtectedRoute>
                <HealingContent />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
