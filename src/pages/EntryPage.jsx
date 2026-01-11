import { useNavigate } from 'react-router-dom'

function EntryPage({ onSeenIntro }) {
  const navigate = useNavigate()

  const handleYes = () => {
    // Set localStorage flag
    localStorage.setItem('hasSeenIntro', 'true')
    // Update parent state
    if (onSeenIntro) {
      onSeenIntro()
    }
    // Navigate to home
    navigate('/home')
  }

  const handleNo = () => {
    // Navigate to survey (don't set hasSeenIntro yet)
    navigate('/survey')
  }

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center px-4 fixed inset-0 z-50">
      <div className="max-w-md w-full text-center">
        <div className="bg-white border border-border-light rounded-xl p-8 shadow-subtle-lg">
          <p className="text-2xl mb-8 text-text-dark font-medium">
            병명을 아십니까?
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleYes}
              className="w-full py-4 px-6 bg-hanwha-orange text-white font-semibold rounded-lg hover:bg-opacity-90 hover-smooth hover:shadow-orange-glow text-lg"
            >
              네
            </button>
            <button
              onClick={handleNo}
              className="w-full py-4 px-6 bg-bg-gray text-text-dark font-semibold rounded-lg border border-border-light hover:bg-bg-gray-light hover-smooth text-lg"
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
