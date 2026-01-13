import { useState, useEffect } from 'react'
import TopNavigation from '../components/TopNavigation'

function HealingContent() {
  const [activeTab, setActiveTab] = useState('healing')
  const [musicVideos, setMusicVideos] = useState([])
  const [petVideos, setPetVideos] = useState([])

  const tabs = [
    { id: 'healing', label: '힐링 콘텐츠' },
    { id: 'culture', label: '문화생활 게시판' },
    { id: 'restaurant', label: '맛집 게시판' },
  ]

  const musicVideoUrls = [
    'https://www.youtube.com/watch?v=PBkQjQivkvg',
    'https://www.youtube.com/watch?v=NqAvmjytdxE',
    'https://www.youtube.com/watch?v=-307rmW_KJQ',
    'https://www.youtube.com/watch?v=Zxx0Jv0QnbE',
    'https://www.youtube.com/watch?v=EkjRoXld39Y',
  ]

  const petVideoUrls = [
    'https://www.youtube.com/watch?v=Gg2WQKSb1QY',
    'https://www.youtube.com/watch?v=w0E9-Bir664',
    'https://www.youtube.com/watch?v=3gIhZlHWRk4',
    'https://www.youtube.com/watch?v=6mDB8-7HvaM',
    'https://www.youtube.com/watch?v=spiHw2VYbK4',
  ]

  // YouTube 영상 ID 추출
  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  // YouTube 썸네일 URL 생성
  const getThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  // YouTube 제목 가져오기 (oEmbed API 사용)
  useEffect(() => {
    const fetchVideoTitles = async (urls, setVideos) => {
      const videos = await Promise.all(
        urls.map(async (url) => {
          const videoId = getVideoId(url)
          if (!videoId) return null

          try {
            const response = await fetch(
              `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
            )
            const data = await response.json()
            return {
              id: videoId,
              url,
              title: data.title,
              thumbnail: getThumbnailUrl(videoId),
            }
          } catch (error) {
            console.error(`Error fetching video ${videoId}:`, error)
            return {
              id: videoId,
              url,
              title: '영상 제목을 불러올 수 없습니다',
              thumbnail: getThumbnailUrl(videoId),
            }
          }
        })
      )
      setVideos(videos.filter((v) => v !== null))
    }

    fetchVideoTitles(musicVideoUrls, setMusicVideos)
    fetchVideoTitles(petVideoUrls, setPetVideos)
  }, [])

  const handleVideoClick = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <TopNavigation />
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-dark mb-2">힐링 라운지</h1>
            <p className="text-text-muted text-lg">
              힐링 콘텐츠를 통해 마음을 치유하고 위로받을 수 있는 공간입니다.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 border-b border-border-light">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold text-base border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-hanwha-orange text-hanwha-orange'
                      : 'border-transparent text-text-muted hover:text-text-dark'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'healing' && (
            <div className="space-y-12">
              {/* 음악 섹션 */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-text-dark mb-6">음악</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {musicVideos.length > 0 ? (
                    musicVideos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => handleVideoClick(video.url)}
                        className="flex-shrink-0 w-64 group"
                      >
                        <div className="bg-white border-2 border-border-light rounded-xl overflow-hidden hover:border-hanwha-orange hover-smooth shadow-subtle hover:shadow-orange-glow transition-all">
                          <div className="relative aspect-video bg-bg-gray">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                              <svg
                                className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-hanwha-orange hover-smooth">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="flex gap-4">
                      {musicVideoUrls.map((url, index) => {
                        const videoId = getVideoId(url)
                        if (!videoId) return null
                        return (
                          <div
                            key={index}
                            className="flex-shrink-0 w-64 bg-white border-2 border-border-light rounded-xl overflow-hidden shadow-subtle"
                          >
                            <div className="relative aspect-video bg-bg-gray">
                              <img
                                src={getThumbnailUrl(videoId)}
                                alt="로딩 중..."
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                                }}
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="text-sm font-semibold text-text-muted">로딩 중...</h3>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* 반려동물 섹션 */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-text-dark mb-6">반려동물</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {petVideos.length > 0 ? (
                    petVideos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => handleVideoClick(video.url)}
                        className="flex-shrink-0 w-64 group"
                      >
                        <div className="bg-white border-2 border-border-light rounded-xl overflow-hidden hover:border-hanwha-orange hover-smooth shadow-subtle hover:shadow-orange-glow transition-all">
                          <div className="relative aspect-video bg-bg-gray">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                              <svg
                                className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-hanwha-orange hover-smooth">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="flex gap-4">
                      {petVideoUrls.map((url, index) => {
                        const videoId = getVideoId(url)
                        if (!videoId) return null
                        return (
                          <div
                            key={index}
                            className="flex-shrink-0 w-64 bg-white border-2 border-border-light rounded-xl overflow-hidden shadow-subtle"
                          >
                            <div className="relative aspect-video bg-bg-gray">
                              <img
                                src={getThumbnailUrl(videoId)}
                                alt="로딩 중..."
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                                }}
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="text-sm font-semibold text-text-muted">로딩 중...</h3>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'culture' && (
            <div className="bg-white border border-border-light rounded-xl p-8 shadow-subtle">
              <p className="text-text-muted text-lg">
                문화생활 게시판 기능이 곧 추가될 예정입니다.
              </p>
            </div>
          )}

          {activeTab === 'restaurant' && (
            <div className="bg-white border border-border-light rounded-xl p-8 shadow-subtle">
              <p className="text-text-muted text-lg">
                맛집 게시판 기능이 곧 추가될 예정입니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HealingContent
