import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAppStore from '../store/appStore'

function PostDetail() {
  const { diseaseId, postId } = useParams()
  const navigate = useNavigate()
  const { diseases, posts, addComment } = useAppStore()

  const disease = diseases.find((d) => d.id === diseaseId)
  const boardPosts = posts[diseaseId] || []
  const post = boardPosts.find((p) => p.id === postId)

  const [commentContent, setCommentContent] = useState('')

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
    <div className="min-h-screen bg-bg-light py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/home/disease/${diseaseId}`)}
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
            목록으로
          </button>
        </div>

        {/* Post Detail */}
        <div className="bg-white border border-border-light rounded-xl p-6 mb-6 shadow-subtle">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-text-dark mb-3">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
              <span>{post.author}</span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <div className="border-t border-border-light pt-4">
            <p className="text-text-dark whitespace-pre-wrap leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white border border-border-light rounded-xl p-6 shadow-subtle">
          <h2 className="text-lg font-semibold text-text-dark mb-6">
            댓글 ({post.comments?.length || 0})
          </h2>

          {/* Add Comment Form */}
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

          {/* Comments List */}
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
                    <span className="text-sm font-medium text-text-dark">
                      {comment.author}
                    </span>
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
  )
}

export default PostDetail
