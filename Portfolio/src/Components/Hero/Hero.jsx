import React, { useEffect, useState } from 'react'
import './Hero.css'
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getMyProfile = async () => {
            const { data } = await axios.get(
                "https://mern-stack-portfolio-6r58.onrender.com/api/v1/user/me/portfolio",
                { withCredentials: true }
            );
            setUser(data.user);
        }
        getMyProfile();
    },[])
    return (
        <div id='home' className='hero'>
            <img src={user.avatar && user.avatar.url} alt="" />
            <h3>Hey, <span>I'm {user.Name}</span></h3>
            <h2>
                <div className='text-tubeLight-effect'>
                    <Typewriter words={["FULL STACK DEVELOPER", "FRONTEND DEVELOPER", "FREELANCER"]} loop={50} cursor typeSpeed={120} deleteSpeed={120} delaySpeed={100} />
                </div>
            </h2>
            <p>I am a fullStack web and frontend Developer from, India.</p>
            <div className='hero-icon'>
                <Link to={user.linkedInURL} target='_blank'><i className="fa-brands fa-linkedin-in" />
                </Link>
                <Link to={user.facebookURL} target='_blank'><i className="fa-brands fa-facebook-f" />
                </Link>
                <Link to={user.githubURL} target='_blank'><i className="fa-brands fa-github" />
                </Link>
                <Link to={user.instagramURL} target='_blank'><i className="fa-brands fa-instagram" />
                </Link>
                <Link to={user.twitterURL} target='_blank'><i className="fa-brands fa-x-twitter" />
                </Link>
            </div>
            <Link to={user.resume && user.resume.url} target='_blank'>
            <button type='submit' className="hero-resume">My Resume</button>
            </Link>
        </div>
    )
}

export default Hero
