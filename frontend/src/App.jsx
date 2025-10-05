import React from 'react'
import { Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ErrorPage from './pages/ErrorPage'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const {isLoggedIn,login}= useAuthStore();
  console.log(isLoggedIn)  
  return (
    <div onClick={()=>login()} className='min-h-screen flex overflow-hidden bg-slate-900 relative items-center justify-center p-4'>
       {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />


      <Routes>
        <Route path="/" element={<ChatPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App