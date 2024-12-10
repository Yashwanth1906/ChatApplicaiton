import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import MainScreen from './pages/mainScreen'
import SignupPage from './pages/signup'

export default function ChatApp() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainScreen/>}/>
          <Route path='/signin' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}
