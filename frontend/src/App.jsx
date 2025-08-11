import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Landing from './pages/Landing';

import {ToastContainer} from "react-toastify"
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
export const serverUrl = "http://localhost:8000"
function App() { 
  getCurrentUser()
  const {userData} = useSelector(state=>state.user)
  return (
    <>
    <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={!userData ? <SignUp />: <Navigate to={"/"} />} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/profile" element={userData ? <Profile /> :<Navigate to={"/signup"}/>} />
        </Routes>
    </>
  )
}

export default App