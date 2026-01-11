import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import EntryPage from './pages/EntryPage'
import SymptomSurvey from './pages/SymptomSurvey'
import MainPage from './pages/MainPage'
import DiseaseBoard from './pages/DiseaseBoard'
import PostDetail from './pages/PostDetail'

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
                <Navigate to="/home" replace />
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
          <Route path="/survey" element={<SymptomSurvey />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <MainPage />
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
        </Routes>
      </div>
    </Router>
  )
}

export default App
