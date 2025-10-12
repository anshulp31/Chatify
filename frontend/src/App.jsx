import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ErrorPage from './pages/ErrorPage'
import { useAuthStore } from './store/useAuthStore.js'
import PageLoader from './components/PageLoader.jsx'
import {Toaster} from "react-hot-toast"

const App = () => {
  const {isBusy, authUser, checkAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[])

  if(isBusy) return <PageLoader/>
  return (
    <div className='min-h-screen flex overflow-hidden bg-slate-900 relative items-center justify-center p-4'>
       {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />


      <Routes>
        <Route path="/" element={authUser ? <ChatPage/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/login" element={authUser ? <Navigate to={"/"}/> :<LoginPage/>}></Route>
        <Route path="/signup" element={authUser ? <Navigate to={"/"}/> :<SignUpPage/>}></Route>
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App