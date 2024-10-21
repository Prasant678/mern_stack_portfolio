import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Screens/Home'
import Projectview from './Screens/Projectview'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/project/:id' element={<Projectview />} />
        </Routes>
        <Footer />
        <ToastContainer position='top-right' theme='dark'/>
      </Router>
    </>
  )
}

export default App
