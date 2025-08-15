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
import CreateCourses from './pages/Educator/CreateCourses.jsx'
import getCreatorCourse from './customHooks/getCreatorCourse.js'
import EditCourse from './pages/Educator/EditCourse'
import getPublishedCourse from './customHooks/getPublishedCourse.js'
import AllCourses from './pages/AllCourses.jsx'

export const serverUrl = "http://localhost:8000"

function App() { 
  useGetCurrentUser()
  getCreatorCourse()
  getPublishedCourse()
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

          <Route path="/allcourses" element={userData ? <AllCourses /> : <Navigate to={"/signup"} />}/>

          <Route path="/dashboard" element={userData ?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />}/>

          <Route path="/courses" element={userData ?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />}/>

          <Route path="/createcourse" element={userData ?.role === "educator" ? <CreateCourses /> : <Navigate to={"/signup"} />}/>

          <Route path="/editcourse/:courseId" element={userData ?.role === "educator" ? <EditCourse /> : <Navigate to={"/signup"} />}/>
          
          
        </Routes>
    </>
  )
}

export default App