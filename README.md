# CarePLUS - 질병 커뮤니티 플랫폼

DCInside 스타일의 질병 기반 커뮤니티 플랫폼입니다.

## 기술 스택

- **Frontend**: React 18 (Vite)
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Data Storage**: localStorage (현재)
- **Font**: Pretendard

## 디자인 테마

- **기본 모드**: 라이트 모드 (흰색 + 밝은 회색 배경)
- **텍스트**: 검정색 / 진한 회색
- **강조 색상**: 한화 오렌지 (#f37321)
- **UI 컨셉**: 진지하고 안전한 의료 커뮤니티 느낌
- **특징**: 둥근 모서리, 미묘한 그림자, 부드러운 호버 애니메이션

## 주요 기능

### 초기 진입 흐름
- 첫 방문자에게 **"병명을 아십니까?"** 질문 표시
  - **네**: 메인 페이지로 이동
  - **아니오**: 증상 설문 페이지로 이동 → 설문 완료 후 메인 페이지

### 증상 설문
- 8개의 증상 질문 (통증, 피로감, 정신건강, 지속기간, 수면, 식욕, 호흡, 기타)
- 진행률 표시
- 선택한 답변 localStorage에 저장

### 메인 페이지 (`/home`)
- 질병 게시판 그리드 표시
- 각 게시판에 게시글 수 표시
- 클릭 시 해당 질병 게시판으로 이동

### 질병 게시판 (`/home/disease/:id`)
- 게시글 리스트 (DCInside 스타일)
- 게시글 작성 기능
- 클릭 시 게시글 상세 페이지로 이동

### 게시글 상세 (`/home/disease/:id/post/:postId`)
- 게시글 제목, 내용, 작성자, 작성 시간 표시
- 댓글 목록
- 댓글 작성 기능

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (개발 모드에서는 localStorage 자동 초기화)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 프로젝트 구조

```
CarePLUS/
├── src/
│   ├── pages/
│   │   ├── EntryPage.jsx          # 초기 진입 페이지 ("병명을 아십니까?")
│   │   ├── SymptomSurvey.jsx      # 증상 설문 페이지
│   │   ├── MainPage.jsx           # 메인 페이지 (질병 게시판 목록)
│   │   ├── DiseaseBoard.jsx       # 질병 게시판 (게시글 리스트)
│   │   └── PostDetail.jsx         # 게시글 상세 페이지
│   ├── store/
│   │   └── appStore.js            # Zustand 상태 관리 (localStorage 자동 저장)
│   ├── App.jsx                    # 라우팅 설정 및 Route Guard
│   ├── main.jsx                   # 진입점 (개발 모드에서 localStorage 자동 초기화)
│   └── index.css                  # 전역 스타일
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## 주요 질병 커뮤니티

- 당뇨 (Diabetes)
- 암 (Cancer)
- 우울증 (Depression)
- 고혈압 (Hypertension)
- 류마티스 (Rheumatoid)
- 희귀질환 (Rare Disease)

## 라우팅 구조

- `/` - EntryPage (초기 진입 페이지)
- `/survey` - SymptomSurvey (증상 설문)
- `/home` - MainPage (질병 게시판 목록)
- `/home/disease/:diseaseId` - DiseaseBoard (질병 게시판)
- `/home/disease/:diseaseId/post/:postId` - PostDetail (게시글 상세)

## 개발 모드 특성

- 개발 모드(`npm run dev`)에서는 앱 시작 시 localStorage가 자동으로 초기화됩니다
- 매번 처음 상태에서 테스트할 수 있습니다

## 향후 개발 계획

- [ ] 사용자 인증 시스템
- [ ] 백엔드 API 연동
- [ ] 더 많은 질병 커뮤니티 추가
- [ ] 검색 기능
- [ ] 좋아요/공감 기능
- [ ] 이미지 업로드
- [ ] 알림 시스템
- [ ] 다크 모드 토글

## 라이센스

MIT
