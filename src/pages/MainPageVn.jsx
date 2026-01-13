import { useNavigate } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'

function MainPageVn() {
  const navigate = useNavigate()

  const lounges = [
    {
      id: 'info',
      name: 'Phòng Thông Tin',
      description: 'Xem thông tin hữu ích về chăm sóc người bệnh trong một cái nhìn.',
      path: '/caregiving-journal',
      icon: '📋',
    },
    {
      id: 'communication',
      name: 'Phòng Giao Tiếp',
      description: 'Không gian để chia sẻ thông tin và giao tiếp trên các diễn đàn theo bệnh và quốc gia.',
      path: '/communication-lounge',
      icon: '💬',
    },
    {
      id: 'healing',
      name: 'Phòng Chữa Lành',
      description: 'Không gian để chữa lành tâm hồn và nhận được sự an ủi thông qua nội dung chữa lành.',
      path: '/healing-content',
      icon: '🌿',
    },
  ]

  const handleLoungeClick = (path) => {
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <TopNavigation />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-text-dark mb-4">CarePLUS</h1>
            <p className="text-text-muted text-lg">Nền tảng tích hợp cho người chăm sóc và gia đình bệnh nhân</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lounges.map((lounge) => (
              <button
                key={lounge.id}
                onClick={() => handleLoungeClick(lounge.path)}
                className="group relative bg-white border-2 border-border-light rounded-2xl p-10 text-left hover:border-hanwha-orange hover-smooth shadow-subtle hover:shadow-orange-glow transition-all h-full flex flex-col min-h-[400px]"
              >
                <div className="text-6xl mb-8 flex-shrink-0">{lounge.icon}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-text-dark group-hover:text-hanwha-orange hover-smooth mb-6">
                    {lounge.name}
                  </h2>
                  <p className="text-text-muted text-lg leading-relaxed mb-8">
                    {lounge.description}
                  </p>
                </div>
                <div className="flex items-center text-hanwha-orange opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                  <span className="text-base font-semibold mr-2">Vào Phòng</span>
                  <svg
                    className="w-6 h-6 transform group-hover:translate-x-2 hover-smooth"
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPageVn
