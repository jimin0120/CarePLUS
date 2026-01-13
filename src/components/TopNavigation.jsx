import { useNavigate, useLocation } from 'react-router-dom'
import logoImage from '../../3_Symbol Mark.jpg'
import koreaFlag from '../../assets/korea_flag.svg'
import japanFlag from '../../assets/japan_flag.svg'
import vietnamFlag from '../../assets/vietnam_flag.svg'
import indonesiaFlag from '../../assets/indonesia_flag.svg'

function TopNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  // 현재 언어 감지
  const getCurrentLanguage = () => {
    if (location.pathname.startsWith('/id')) return 'id'
    if (location.pathname.startsWith('/vn')) return 'vn'
    if (location.pathname.startsWith('/jp')) return 'jp'
    return 'kr'
  }

  const currentLang = getCurrentLanguage()

  // 언어별 탭 텍스트
  const tabsByLanguage = {
    kr: [
      { label: '정보 라운지', path: '/caregiving-journal' },
      { label: '소통 라운지', path: '/communication-lounge' },
      { label: '힐링 라운지', path: '/healing-content' },
    ],
    id: [
      { label: 'Lounge Informasi', path: '/caregiving-journal' },
      { label: 'Lounge Komunikasi', path: '/communication-lounge' },
      { label: 'Lounge Healing', path: '/healing-content' },
    ],
    vn: [
      { label: 'Phòng Thông Tin', path: '/caregiving-journal' },
      { label: 'Phòng Giao Tiếp', path: '/communication-lounge' },
      { label: 'Phòng Chữa Lành', path: '/healing-content' },
    ],
    jp: [
      { label: '情報ラウンジ', path: '/caregiving-journal' },
      { label: 'コミュニケーションラウンジ', path: '/communication-lounge' },
      { label: 'ヒーリングラウンジ', path: '/healing-content' },
    ],
  }

  const tabs = tabsByLanguage[currentLang] || tabsByLanguage.kr

  const isActive = (path) => {
    if (path === '/communication-lounge') {
      return location.pathname === '/communication-lounge' || location.pathname.startsWith('/home/disease')
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="bg-white border-b border-border-light sticky top-0 z-50 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-20">
            <button
              type="button"
              onClick={() => {
                if (location.pathname.startsWith('/id')) {
                  navigate('/id/home')
                } else if (location.pathname.startsWith('/vn')) {
                  navigate('/vn/home')
                } else if (location.pathname.startsWith('/jp')) {
                  navigate('/jp/home')
                } else {
                  navigate('/home')
                }
              }}
              className="flex items-center gap-3 focus:outline-none hover-smooth"
            >
              <img
                src={logoImage}
                alt="CarePLUS 로고"
                className="h-12 w-auto rounded-lg"
              />
              <span className="text-2xl md:text-3xl font-extrabold text-text-dark tracking-tight">
                CarePLUS
              </span>
            </button>
            <nav className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`px-6 py-2 text-base font-semibold rounded-lg hover-smooth transition-all ${
                    isActive(tab.path)
                      ? 'bg-hanwha-orange text-white shadow-orange-glow'
                      : 'text-text-dark hover:bg-bg-gray'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={koreaFlag}
              alt="한국어"
              onClick={() => {
                if (location.pathname.startsWith('/id') || location.pathname.startsWith('/vn') || location.pathname.startsWith('/jp')) {
                  navigate('/home')
                }
              }}
              className="w-8 h-6 object-cover rounded cursor-pointer hover:opacity-80 hover-smooth shadow-subtle"
            />
            <img
              src={japanFlag}
              alt="일본어"
              onClick={() => {
                if (!location.pathname.startsWith('/jp')) {
                  navigate('/jp/home')
                }
              }}
              className="w-8 h-6 object-cover rounded cursor-pointer hover:opacity-80 hover-smooth shadow-subtle"
            />
            <img
              src={vietnamFlag}
              alt="베트남어"
              onClick={() => {
                if (!location.pathname.startsWith('/vn')) {
                  navigate('/vn/home')
                }
              }}
              className="w-8 h-6 object-cover rounded cursor-pointer hover:opacity-80 hover-smooth shadow-subtle"
            />
            <img
              src={indonesiaFlag}
              alt="인도네시아어"
              onClick={() => {
                if (!location.pathname.startsWith('/id')) {
                  navigate('/id/home')
                }
              }}
              className="w-8 h-6 object-cover rounded cursor-pointer hover:opacity-80 hover-smooth shadow-subtle"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNavigation
