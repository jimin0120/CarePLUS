import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Clear localStorage in development mode on app start
if (import.meta.env.DEV) {
  localStorage.clear()
  console.log('🧹 Development mode: localStorage cleared')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
