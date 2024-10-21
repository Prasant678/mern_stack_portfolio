import React, { useEffect, useState } from 'react'
import './Skills.css'
import axios from 'axios';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const getAllSkills = async () => {
            const { data } = await axios.get(
                "https://mern-stack-portfolio-6r58.onrender.com/api/v1/skill/getall",
                { withCredentials: true }
            )
            setSkills(data.skills);
        }
        getAllSkills();
    }, [])
    return (
        <div id='skills' className='skills'>
            <div className="skills-title">
                <h1>Skills</h1>
            </div>
            <div className="skills-container">
                {skills && skills.map(element => {
                    return (<div className="skills-card" key={element._id}>
                        <img src={element.svg && element.svg.url} alt={element.title} />
                        <p>{element.title}</p>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default Skills
