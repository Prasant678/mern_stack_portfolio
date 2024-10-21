import React, { useEffect, useState } from 'react'
import './About.css'
import axios from 'axios';

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "https://mern-stack-portfolio-6r58.onrender.com/api/v1/user/me/portfolio",
        { withCredentials: true })
      setUser(data.user)
    }
    getMyProfile();
  }, [])
  return (
    <div id='about' className='about'>
      <div className="about-title">
        <h1>About Me</h1>
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img src={user.avatar && user.avatar.url} alt="" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>{user.aboutMe}</p>
          </div>
          <div className="about-skills">
            <div className="about-skill"><p>Leadership</p><hr style={{ width: "80%" }} /></div>
            <div className="about-skill"><p>Problem Solving</p><hr style={{ width: "60%" }} /></div>
            <div className="about-skill"><p>Strong Analytics</p><hr style={{ width: "70%" }} /></div>
          </div>
        </div>
      </div>
      <div className="about-achievements">
        <div className="about-achievement">
          <h1>7+</h1>
          <p>PROJECT COMPLETED</p>
        </div>
        <hr />
        <div className="about-achievement">
          <h1>15+</h1>
          <p>ACHIVED SKILLS</p>
        </div>
      </div>
    </div>
  )
}

export default About
