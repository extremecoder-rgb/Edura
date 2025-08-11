import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Landing from './pages/Landing';

import {ToastContainer} from "react-toastify"
import getCurrentUser from './customHooks/getCurrentUser'
export const serverUrl = "http://localhost:8000"
function App() { 
  getCurrentUser()
  return (
    <>
    <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </>
  )
}

export default App