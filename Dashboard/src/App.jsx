import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './Screens/HomePage'
import Login from './Screens/Login'
import ForgotPassword from './Screens/ForgotPassword'
import Resetpassword from './Screens/Resetpassword'
import MangaeSkills from './Screens/MangaeSkills'
import ManageProjects from './Screens/ManageProjects'
import Managetimeline from './Screens/Managetimeline'
import UpdateProject from './Screens/UpdateProject'
import ViewProject from './Screens/ViewProject'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { getUser } from './store/Slice/userSlice'
import "./App.css"
import { getAllMessages } from './store/Slice/messageSlice'
import { getAllTimelines } from './store/Slice/timelineSlice'
import { getAllSkills } from './store/Slice/skillSlice'
import { getAllSoftwareApplications } from './store/Slice/SASlice'
import { getAllProjects } from './store/Slice/projectSlice'
import { getAllEmails } from './store/Slice/emailSlice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllEmails());
    dispatch(getAllTimelines());
    dispatch(getAllSkills());
    dispatch(getAllSoftwareApplications());
    dispatch(getAllProjects());
  },[])
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/password/reset/:token' element={<Resetpassword />} />
        <Route exact path='/manage/skills' element={<MangaeSkills />} />
        <Route exact path='/manage/projects' element={<ManageProjects />} />
        <Route exact path='/manage/timeline' element={<Managetimeline />} />
        <Route exact path='/view/project/:id' element={<ViewProject />} />
        <Route exact path='/update/project/:id' element={<UpdateProject />} />
      </Routes>
      <ToastContainer position='bottom-right' theme='dark'/>
    </Router>
  )
}

export default App
