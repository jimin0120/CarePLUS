/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hanwha-orange': '#f37321',
        'bg-light': '#ffffff',
        'bg-gray-light': '#fafafa',
        'bg-gray': '#f5f5f5',
        'border-light': '#e5e5e5',
        'text-dark': '#000000',
        'text-gray-dark': '#333333',
        'text-muted': '#666666',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'subtle-lg': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'orange-glow': '0 4px 16px rgba(243, 115, 33, 0.2)',
      },
      transitionDuration: {
        'smooth': '300ms',
      },
    },
  },
  plugins: [],
}
