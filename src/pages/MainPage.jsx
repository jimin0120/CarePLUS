import { useNavigate } from 'react-router-dom'
import useAppStore from '../store/appStore'

function MainPage() {
  const navigate = useNavigate()
  const { diseases, posts } = useAppStore()

  const handleDiseaseClick = (diseaseId) => {
    navigate(`/home/disease/${diseaseId}`)
  }

  // Get post count for each disease
  const getPostCount = (diseaseId) => {
    return posts[diseaseId]?.length || 0
  }

  return (
    <div className="min-h-screen bg-bg-light py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 pb-6 border-b border-border-light">
          <h1 className="text-4xl font-bold text-text-dark mb-2">CarePLUS</h1>
          <p className="text-text-muted text-lg">질병 커뮤니티</p>
        </header>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-text-dark mb-6">
            질병 게시판
          </h2>
          
          {/* Grid Layout - DCInside gallery style but modern */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {diseases.map((disease) => {
              const postCount = getPostCount(disease.id)
              return (
                <button
                  key={disease.id}
                  onClick={() => handleDiseaseClick(disease.id)}
                  className="group relative bg-white border-2 border-border-light rounded-xl p-6 text-left hover:border-hanwha-orange hover-smooth shadow-subtle hover:shadow-orange-glow"
                >
                  {/* Disease Name */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-text-dark group-hover:text-hanwha-orange hover-smooth">
                      {disease.name}
                    </h3>
                    {/* Post Count Badge */}
                    <span className="px-3 py-1 bg-bg-gray text-text-muted text-sm rounded-full border border-border-light group-hover:border-hanwha-orange group-hover:text-hanwha-orange hover-smooth">
                      {postCount}개
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                    {disease.description}
                  </p>
                  
                  {/* Hover Indicator */}
                  <div className="flex items-center text-text-muted text-xs group-hover:text-hanwha-orange hover-smooth">
                    <span>게시판 보기</span>
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 hover-smooth"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
