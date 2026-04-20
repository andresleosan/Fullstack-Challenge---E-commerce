import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppWrapper from './AppWrapper.tsx'
import './index.css'

// Initialize Firebase immediately on app start
import '@config/firebase'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
)
