import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import MainScreen from './pages/mainScreen'
import React from 'react'
import SignupPage from './pages/signup'

export default function ChatApp() {
  return (
    // <div className="flex flex-col h-screen bg-[#0a0a1f] text-[#7af3ff] font-mono">
    //   <TopBar />
    //   <div className="flex flex-1 overflow-hidden">
    //     <SidebarNav />
    //     <div className="w-80 border-r border-[#3a3a5a] bg-[#0f0f2a]">
    //       <SearchBar />
    //       <DMList />
    //     </div>
    //     <div className="flex-1 flex flex-col bg-[#0a0a1f]">
    //       <MessageTopBar />
    //       <MessageList />
    //       <MessageBar />
    //     </div>
    //   </div>
    // </div>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainScreen/>}/>
          <Route path='/signin' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}
