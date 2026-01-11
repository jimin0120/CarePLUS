import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    id: 'pain',
    question: '통증이 있으신가요?',
    options: [
      { value: 'none', label: '통증 없음' },
      { value: 'mild', label: '경미한 통증' },
      { value: 'moderate', label: '보통 통증' },
      { value: 'severe', label: '심한 통증' },
      { value: 'chronic', label: '만성 통증' },
    ],
  },
  {
    id: 'fatigue',
    question: '피로감이 있으신가요?',
    options: [
      { value: 'none', label: '피로감 없음' },
      { value: 'mild', label: '약간의 피로감' },
      { value: 'moderate', label: '보통 피로감' },
      { value: 'severe', label: '심한 피로감' },
      { value: 'constant', label: '지속적인 피로감' },
    ],
  },
  {
    id: 'mental',
    question: '정신건강 관련 증상이 있으신가요?',
    options: [
      { value: 'none', label: '없음' },
      { value: 'anxiety', label: '불안감' },
      { value: 'depression', label: '우울감' },
      { value: 'stress', label: '스트레스' },
      { value: 'mood-swings', label: '기분 변동' },
    ],
  },
  {
    id: 'duration',
    question: '증상의 지속 기간은 어느 정도인가요?',
    options: [
      { value: 'sudden', label: '갑작스러운 증상' },
      { value: 'days', label: '며칠 지속' },
      { value: 'weeks', label: '몇 주 지속' },
      { value: 'months', label: '몇 달 지속' },
      { value: 'chronic', label: '만성적 증상' },
    ],
  },
  {
    id: 'sleep',
    question: '수면 관련 문제가 있으신가요?',
    options: [
      { value: 'none', label: '없음' },
      { value: 'insomnia', label: '불면증' },
      { value: 'oversleeping', label: '과도한 수면' },
      { value: 'restless', label: '불안한 수면' },
      { value: 'frequent-waking', label: '자주 깸' },
    ],
  },
  {
    id: 'appetite',
    question: '식욕 변화가 있으신가요?',
    options: [
      { value: 'normal', label: '정상' },
      { value: 'decreased', label: '식욕 감소' },
      { value: 'increased', label: '식욕 증가' },
      { value: 'loss', label: '식욕 상실' },
      { value: 'nausea', label: '식욕 없음 (메스꺼움)' },
    ],
  },
  {
    id: 'breathing',
    question: '호흡 관련 증상이 있으신가요?',
    options: [
      { value: 'none', label: '없음' },
      { value: 'shortness', label: '호흡 곤란' },
      { value: 'wheezing', label: '천명음' },
      { value: 'chest-tightness', label: '가슴 답답함' },
      { value: 'cough', label: '기침' },
    ],
  },
  {
    id: 'other',
    question: '기타 증상이 있으신가요?',
    options: [
      { value: 'fever', label: '발열' },
      { value: 'headache', label: '두통' },
      { value: 'dizziness', label: '현기증' },
      { value: 'nausea', label: '메스꺼움' },
      { value: 'none', label: '없음' },
    ],
  },
]

function SymptomSurvey() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})
  
  // Calculate progress
  const answeredCount = Object.keys(answers).length
  const totalQuestions = questions.length
  const progress = (answeredCount / totalQuestions) * 100

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save answers to localStorage
    localStorage.setItem('symptoms', JSON.stringify(answers))
    
    // Set hasSeenIntro flag
    localStorage.setItem('hasSeenIntro', 'true')
    
    // Navigate to home
    navigate('/home')
  }

  const allAnswered = answeredCount === totalQuestions

  return (
    <div className="min-h-screen bg-bg-light py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-text-dark text-center">
            증상 설문
          </h1>
          <p className="text-text-muted text-center mb-6">
            현재 경험하시는 증상을 선택해주세요
          </p>
          
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-muted">
                진행률: {answeredCount} / {totalQuestions}
              </span>
              <span className="text-sm text-text-muted">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-bg-gray rounded-full h-2 shadow-subtle">
              <div
                className="bg-hanwha-orange h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 mb-8">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-white border border-border-light rounded-xl p-6 shadow-subtle"
              >
                <label className="block text-lg font-semibold text-text-dark mb-4">
                  {index + 1}. {question.question}
                </label>
                <div className="space-y-3">
                  {question.options.map((option) => {
                    const isSelected = answers[question.id] === option.value
                    return (
                      <label
                        key={option.value}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer hover-smooth ${
                          isSelected
                            ? 'bg-hanwha-orange border-hanwha-orange text-white shadow-orange-glow'
                            : 'bg-bg-gray border-border-light text-text-dark hover:border-hanwha-orange hover:bg-bg-gray-light'
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(question.id, option.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            isSelected
                              ? 'border-white'
                              : 'border-text-muted'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-3 h-3 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="flex-1">{option.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!allAnswered}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg hover-smooth ${
                !allAnswered
                  ? 'bg-bg-gray text-text-muted cursor-not-allowed border border-border-light'
                  : 'bg-hanwha-orange text-white hover:bg-opacity-90 hover:shadow-orange-glow'
              }`}
            >
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SymptomSurvey
