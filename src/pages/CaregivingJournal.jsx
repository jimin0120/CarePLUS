import { useNavigate } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'

function CaregivingJournal() {
  const navigate = useNavigate()

  const infoItems = [
    {
      id: 'insurance',
      title: '간병 관련 보험 추천',
      description: '간병에 도움이 되는 보험 상품 정보를 확인할 수 있습니다.',
      icon: '🛡️',
    },
    {
      id: 'support-fund',
      title: '간병 지원금 정리',
      description: '간병 지원금 관련 정보를 확인하고 정리할 수 있습니다.',
      icon: '💰',
    },
    {
      id: 'support-system',
      title: '간병 관련 제도 정리',
      description: '간병 관련 제도와 정책 정보를 확인할 수 있습니다.',
      icon: '📋',
    },
    {
      id: 'hospital-finder',
      title: '주변 병의원 찾기',
      description: '주변 병원과 의원을 쉽게 찾아볼 수 있습니다.',
      icon: '🏥',
    },
    {
      id: 'reemployment',
      title: '재취업 지원 제도 정리',
      description: '재취업 지원 제도와 정보를 확인할 수 있습니다.',
      icon: '💼',
    },
    {
      id: 'consultation',
      title: '상담/지원 기관 정보',
      description: '간병 관련 상담 및 지원 기관 정보를 확인할 수 있습니다.',
      icon: '☎️',
    },
  ]

  const handleItemClick = (itemId) => {
    if (itemId === 'insurance') {
      window.open('https://www.hanwhalife.com/index.jsp', '_blank')
    } else if (itemId === 'hospital-finder') {
      window.open('https://www.google.co.kr/maps/search/%EC%A3%BC%EB%B3%80+%EB%B3%91%EC%9B%90/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D', '_blank')
    } else {
      // 각 항목 클릭 시 처리 (추후 구현)
      console.log(`Clicked: ${itemId}`)
    }
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <TopNavigation />
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-dark mb-2">정보 라운지</h1>
            <p className="text-text-muted text-lg">
              간병 관련 유용한 정보를 한눈에 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="group relative bg-white border-2 border-border-light rounded-xl p-6 text-left hover:border-hanwha-orange hover-smooth shadow-subtle hover:shadow-orange-glow transition-all h-full"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-text-dark group-hover:text-hanwha-orange hover-smooth mb-2">
                      {item.title}
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center text-hanwha-orange opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 hover-smooth"
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
        </div>
      </div>
    </div>
  )
}

export default CaregivingJournal
