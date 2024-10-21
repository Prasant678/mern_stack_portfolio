import React from 'react'
import Hero from '../Components/Hero/Hero'
import About from '../Components/About/About'
import Services from '../Components/Services/Services'
import Timeline from '../Components/Timeline/Timeline'
import Skills from '../Components/Skills/Skills'
import Projects from '../Components/Project/Projects'
import Contact from '../Components/Contact/Contact'
import Navbar from '../Components/Navbar/Navbar'
// import MyApps from '../Components/MyApps/MyApps'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Services />
      <Skills />
      <Projects />
      {/* <MyApps /> */}
      <Contact />
    </>
  )
}

export default Home
