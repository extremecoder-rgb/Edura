import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Landing from './pages/Landing';
import ForgetPassword from './pages/ForgetPassword'
import Dashboard from './pages/Educator/Dashboard'
import Courses from "./pages/Educator/Courses"
import {ToastContainer} from "react-toastify"
import useGetCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'

export const serverUrl = "http://localhost:8000"

function App() { 
  useGetCurrentUser()
  
  const {userData} = useSelector(state=>state.user)
  
  return (
    <>
    <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={!userData ? <SignUp />: <Navigate to={"/home"} />} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/profile" element={userData ? <Profile /> :<Navigate to={"/signup"}/>} />
          <Route path="/forget" element={userData ? <ForgetPassword /> : <Navigate to={"/signup"} />}/>
          <Route path="/editprofile" element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}/>

          <Route path="/dashboard" element={userData ?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />}/>

          <Route path="/courses" element={userData ?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />}/>
          
          
        </Routes>
    </>
  )
}

export default App