import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAppStore from '../store/appStore'
import TopNavigation from '../components/TopNavigation'

function PostDetail() {
  const { diseaseId, postId } = useParams()
  const navigate = useNavigate()
  const { diseases, posts, addComment } = useAppStore()

  const disease = diseases.find((d) => d.id === diseaseId)
  const boardPosts = posts[diseaseId] || []
  const post = boardPosts.find((p) => p.id === postId)
  const countryIds = ['kr', 'jp', 'vn', 'id', 'sg']
  const diseaseBoards = diseases.filter((d) => !countryIds.includes(d.id))
  const countryBoards = diseases.filter((d) => countryIds.includes(d.id))

  const [commentContent, setCommentContent] = useState('')
  const [showOriginal, setShowOriginal] = useState(false)

  // 베트남어 번역 데이터
  const vietnameseTranslations = {
    '간병하면서 생긴 허리 통증, 어떻게 관리하세요?': {
      title: 'Đau lưng khi chăm sóc người bệnh, làm thế nào để quản lý?',
      content: 'Gần đây lưng tôi rất đau nên tôi đang điều trị vật lý trị liệu.\nXin hãy đề xuất các bài tập kéo giãn hoặc vận động có thể làm ở nhà.',
    },
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (commentContent.trim()) {
      addComment(diseaseId, postId, {
        content: commentContent,
        author: '익명',
      })
      setCommentContent('')
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

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-muted mb-4">게시글을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate(`/home/disease/${diseaseId}`)}
            className="text-hanwha-orange hover:underline hover-smooth"
          >
            게시판으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <TopNavigation />
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto flex gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white border border-border-light rounded-xl p-4 shadow-subtle sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-text-dark mb-4 pb-3 border-b border-border-light">
                    간병 게시판
                  </h2>
                  <nav className="space-y-1">
                    {diseaseBoards.map((d) => {
                      const isActive = d.id === diseaseId
                      const postCount = posts[d.id]?.length || 0
                      return (
                        <button
                          key={d.id}
                          onClick={() => navigate(`/home/disease/${d.id}`)}
                          className={`w-full text-left px-4 py-3 rounded-lg hover-smooth transition-all ${
                            isActive
                              ? 'bg-hanwha-orange text-white font-semibold shadow-orange-glow'
                              : 'text-text-dark hover:bg-bg-gray'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{d.name}</span>
                            {postCount > 0 && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  isActive
                                    ? 'bg-white bg-opacity-20 text-white'
                                    : 'bg-bg-gray text-text-muted'
                                }`}
                              >
                                {postCount}
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </nav>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-text-dark mb-4 pb-3 border-b border-border-light">
                    국가별 게시판
                  </h2>
                  <nav className="space-y-1">
                    {countryBoards.map((c) => {
                      const isActive = c.id === diseaseId
                      const postCount = posts[c.id]?.length || 0
                      return (
                        <button
                          key={c.id}
                          onClick={() => navigate(`/home/disease/${c.id}`)}
                          className={`w-full text-left px-4 py-3 rounded-lg hover-smooth transition-all ${
                            isActive
                              ? 'bg-hanwha-orange text-white font-semibold shadow-orange-glow'
                              : 'text-text-dark hover:bg-bg-gray'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{c.name}</span>
                            {postCount > 0 && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  isActive
                                    ? 'bg-white bg-opacity-20 text-white'
                                    : 'bg-bg-gray text-text-muted'
                                }`}
                              >
                                {postCount}
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <button
                onClick={() => navigate(`/home/disease/${diseaseId}`)}
                className="text-text-muted hover:text-text-dark mb-4 hover-smooth flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                목록으로
              </button>
            </div>

            <div className="bg-white border border-border-light rounded-xl p-6 mb-6 shadow-subtle">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-text-dark mb-3">
                  {showOriginal && vietnameseTranslations[post.title]
                    ? vietnameseTranslations[post.title].title
                    : post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
              <div className="border-t border-border-light pt-4">
                <p className="text-text-dark whitespace-pre-wrap leading-relaxed">
                  {showOriginal && vietnameseTranslations[post.title]
                    ? vietnameseTranslations[post.title].content
                    : post.content}
                </p>
              </div>
              {vietnameseTranslations[post.title] && (
                <div className="border-t border-border-light pt-4 mt-4">
                  <button
                    onClick={() => setShowOriginal(!showOriginal)}
                    className="text-xs text-text-muted hover:text-hanwha-orange hover-smooth flex items-center gap-1"
                  >
                    <span>{showOriginal ? '한국어로 보기' : '원문 보기'}</span>
                    <svg
                      className={`w-3 h-3 transform transition-transform ${showOriginal ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white border border-border-light rounded-xl p-6 shadow-subtle">
              <h2 className="text-lg font-semibold text-text-dark mb-6">
                댓글 ({post.comments?.length || 0})
              </h2>

              <form onSubmit={handleAddComment} className="mb-6">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="댓글을 입력하세요"
                  rows="4"
                  className="w-full mb-3 px-4 py-3 bg-bg-gray border border-border-light rounded-lg text-text-dark placeholder-text-muted focus:outline-none focus:border-hanwha-orange resize-none hover-smooth"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!commentContent.trim()}
                    className={`px-6 py-2 font-semibold rounded-lg hover-smooth ${
                      commentContent.trim()
                        ? 'bg-hanwha-orange text-white hover:bg-opacity-90 hover:shadow-orange-glow'
                        : 'bg-bg-gray text-text-muted cursor-not-allowed border border-border-light'
                    }`}
                  >
                    댓글 달기
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {post.comments?.length === 0 ? (
                  <p className="text-text-muted text-center py-8 opacity-70">댓글이 없습니다.</p>
                ) : (
                  post.comments?.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-bg-gray rounded-lg p-4 border border-border-light"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-text-dark">{comment.author}</span>
                        <span className="text-xs text-text-muted opacity-70">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-text-dark text-sm whitespace-pre-wrap leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
