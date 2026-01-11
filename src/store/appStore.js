import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      // First-time visitor check
      hasVisited: false,
      setHasVisited: () => set({ hasVisited: true }),

      // User's selected disease
      selectedDisease: null,
      setSelectedDisease: (disease) => set({ selectedDisease: disease }),

      // Disease boards data
      diseases: [
        { id: 'diabetes', name: '당뇨', description: '당뇨 환자들의 정보 공유와 소통 커뮤니티' },
        { id: 'cancer', name: '암', description: '암 환자와 가족을 위한 지원 커뮤니티' },
        { id: 'depression', name: '우울증', description: '우울증 환자들의 치유와 회복을 위한 공간' },
        { id: 'hypertension', name: '고혈압', description: '고혈압 관리와 정보 공유 커뮤니티' },
        { id: 'rheumatoid', name: '류마티스', description: '류마티스 질환 환자 커뮤니티' },
        { id: 'rare-disease', name: '희귀질환', description: '희귀질환 환자들의 연대와 정보 교류' },
      ],

      // Posts by disease
      posts: {},
      
      // Add post to a disease board
      addPost: (diseaseId, post) => {
        const currentPosts = get().posts[diseaseId] || []
        const newPost = {
          id: Date.now().toString(),
          ...post,
          createdAt: new Date().toISOString(),
          comments: [],
        }
        set({
          posts: {
            ...get().posts,
            [diseaseId]: [newPost, ...currentPosts],
          },
        })
        return newPost
      },

      // Add comment to a post
      addComment: (diseaseId, postId, comment) => {
        const posts = get().posts[diseaseId] || []
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now().toString(),
                  ...comment,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          }
          return post
        })
        set({
          posts: {
            ...get().posts,
            [diseaseId]: updatedPosts,
          },
        })
      },
    }),
    {
      name: 'careplus-storage',
    }
  )
)

export default useAppStore
