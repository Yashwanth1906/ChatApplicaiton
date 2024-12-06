import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChatApp from './App.tsx'
import LoginPage from './pages/login.tsx'
import SignupPage from './pages/signup.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatApp/>
  </StrictMode>,
)
