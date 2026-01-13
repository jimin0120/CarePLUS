import { useNavigate } from 'react-router-dom'
import useAppStore from '../store/appStore'
import TopNavigation from '../components/TopNavigation'

function CommunicationLounge() {
  const navigate = useNavigate()
  const { diseases, posts } = useAppStore()

  const countryIds = ['kr', 'jp', 'vn', 'id', 'sg']
  const diseaseBoards = diseases.filter((d) => !countryIds.includes(d.id))
  const countryBoards = diseases.filter((d) => countryIds.includes(d.id))

  const handleDiseaseClick = (diseaseId) => {
    navigate(`/home/disease/${diseaseId}`)
  }

  const getPostCount = (diseaseId) => {
    return posts[diseaseId]?.length || 0
  }

  const getRecentPosts = (diseaseId, limit = 5) => {
    const boardPosts = posts[diseaseId] || []
    // 최신순으로 정렬 (createdAt 기준)
    const sortedPosts = [...boardPosts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    return sortedPosts.slice(0, limit)
  }

  const handlePostClick = (e, diseaseId, postId) => {
    e.stopPropagation() // 게시판 클릭 이벤트 방지
    navigate(`/home/disease/${diseaseId}/post/${postId}`)
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <TopNavigation />
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-dark mb-2">소통 라운지</h1>
            <p className="text-text-muted text-lg">
              질병별, 국가별 게시판에서 정보를 공유하고 소통할 수 있는 공간입니다.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-text-dark mb-6">
              간병 게시판
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {diseaseBoards.map((disease) => {
                const postCount = getPostCount(disease.id)
                const recentPosts = getRecentPosts(disease.id, 5)
                return (
                  <div
                    key={disease.id}
                    className="group relative bg-white border-2 border-border-light rounded-xl p-6 hover:border-hanwha-orange hover-smooth shadow-subtle hover:shadow-orange-glow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => handleDiseaseClick(disease.id)}
                        className="text-xl font-bold text-text-dark group-hover:text-hanwha-orange hover-smooth"
                      >
                        {disease.name}
                      </button>
                      <span className="px-3 py-1 bg-bg-gray text-text-muted text-sm rounded-full border border-border-light group-hover:border-hanwha-orange group-hover:text-hanwha-orange hover-smooth">
                        {postCount}개
                      </span>
                    </div>
                    <div className="border-2 border-border-light rounded-lg p-3 space-y-2">
                      {recentPosts.length > 0 ? (
                        recentPosts.map((post) => (
                          <button
                            key={post.id}
                            onClick={(e) => handlePostClick(e, disease.id, post.id)}
                            className="w-full text-left text-sm text-text-dark hover:text-hanwha-orange hover-smooth py-1 px-2 rounded hover:bg-bg-gray transition-colors"
                          >
                            <span className="line-clamp-1">{post.title}</span>
                          </button>
                        ))
                      ) : (
                        <p className="text-text-muted text-sm py-2">아직 게시물이 없습니다.</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDiseaseClick(disease.id)}
                      className="mt-4 flex items-center text-text-muted text-xs group-hover:text-hanwha-orange hover-smooth"
                    >
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
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-text-dark mb-6">
              국가별 게시판
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {countryBoards.map((country) => {
                const postCount = getPostCount(country.id)
                const recentPosts = getRecentPosts(country.id, 5)
                return (
                  <div
                    key={country.id}
                    className="group relative bg-white border-2 border-border-light rounded-xl p-6 hover:border-hanwha-orange hover-smooth shadow-subtle hover:shadow-orange-glow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => handleDiseaseClick(country.id)}
                        className="text-xl font-bold text-text-dark group-hover:text-hanwha-orange hover-smooth"
                      >
                        {country.name}
                      </button>
                      <span className="px-3 py-1 bg-bg-gray text-text-muted text-sm rounded-full border border-border-light group-hover:border-hanwha-orange group-hover:text-hanwha-orange hover-smooth">
                        {postCount}개
                      </span>
                    </div>
                    <div className="border-2 border-border-light rounded-lg p-3 space-y-2">
                      {recentPosts.length > 0 ? (
                        recentPosts.map((post) => (
                          <button
                            key={post.id}
                            onClick={(e) => handlePostClick(e, country.id, post.id)}
                            className="w-full text-left text-sm text-text-dark hover:text-hanwha-orange hover-smooth py-1 px-2 rounded hover:bg-bg-gray transition-colors"
                          >
                            <span className="line-clamp-1">{post.title}</span>
                          </button>
                        ))
                      ) : (
                        <p className="text-text-muted text-sm py-2">아직 게시물이 없습니다.</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDiseaseClick(country.id)}
                      className="mt-4 flex items-center text-text-muted text-xs group-hover:text-hanwha-orange hover-smooth"
                    >
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
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunicationLounge
