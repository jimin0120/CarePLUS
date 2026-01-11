import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAppStore from '../store/appStore'

function DiseaseBoard() {
  const { diseaseId } = useParams()
  const navigate = useNavigate()
  const { diseases, posts, addPost } = useAppStore()

  const disease = diseases.find((d) => d.id === diseaseId)
  const boardPosts = posts[diseaseId] || []

  const [showPostForm, setShowPostForm] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  const handleCreatePost = (e) => {
    e.preventDefault()
    if (postTitle.trim() && postContent.trim()) {
      addPost(diseaseId, {
        title: postTitle,
        content: postContent,
        author: '익명',
      })
      setPostTitle('')
      setPostContent('')
      setShowPostForm(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 7) {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    if (days > 0) return `${days}일 전`
    if (hours > 0) return `${hours}시간 전`
    if (minutes > 0) return `${minutes}분 전`
    return '방금 전'
  }

  if (!disease) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-muted mb-4">게시판을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/home')}
            className="text-hanwha-orange hover:underline hover-smooth"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-light py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/home')}
            className="text-text-muted hover:text-text-dark mb-4 hover-smooth flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            뒤로가기
          </button>
          <h1 className="text-3xl font-bold text-text-dark mb-2">{disease.name}</h1>
          <p className="text-text-muted">{disease.description}</p>
        </div>

        {/* Write Post Button */}
        <div className="mb-6">
          {!showPostForm ? (
            <button
              onClick={() => setShowPostForm(true)}
              className="w-full py-3 px-4 bg-hanwha-orange text-white font-semibold rounded-lg hover:bg-opacity-90 hover-smooth hover:shadow-orange-glow"
            >
              글쓰기
            </button>
          ) : (
            <div className="bg-white border border-border-light rounded-xl p-6 mb-4 shadow-subtle">
              <form onSubmit={handleCreatePost}>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="제목"
                  className="w-full mb-4 px-4 py-3 bg-bg-gray border border-border-light rounded-lg text-text-dark placeholder-text-muted focus:outline-none focus:border-hanwha-orange hover-smooth"
                />
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="내용"
                  rows="8"
                  className="w-full mb-4 px-4 py-3 bg-bg-gray border border-border-light rounded-lg text-text-dark placeholder-text-muted focus:outline-none focus:border-hanwha-orange resize-none hover-smooth"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-hanwha-orange text-white font-semibold rounded-lg hover:bg-opacity-90 hover-smooth hover:shadow-orange-glow"
                  >
                    작성
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPostForm(false)
                      setPostTitle('')
                      setPostContent('')
                    }}
                    className="px-6 py-2 bg-bg-gray text-text-dark font-semibold rounded-lg border border-border-light hover:bg-bg-gray-light hover-smooth"
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Posts List - DCInside style */}
        <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-subtle">
          {boardPosts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-text-muted text-lg">아직 글이 없습니다.</p>
              <p className="text-text-muted text-sm mt-2 opacity-70">첫 글을 작성해보세요.</p>
            </div>
          ) : (
            <div className="divide-y divide-border-light">
              {boardPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => navigate(`/home/disease/${diseaseId}/post/${post.id}`)}
                  className="w-full text-left p-4 hover:bg-bg-gray hover-smooth"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text-dark font-semibold mb-2 truncate hover:text-hanwha-orange hover-smooth">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-text-muted">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                        {post.comments && post.comments.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-hanwha-orange">
                              댓글 {post.comments.length}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-text-muted"
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
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DiseaseBoard
