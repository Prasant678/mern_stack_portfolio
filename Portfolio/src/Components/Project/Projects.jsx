import React, { useEffect, useState } from 'react'
import './Projects.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Projects = () => {
    const [project, setProject] = useState([]);

    useEffect(()=>{
        const getAllProjects = async()=>{
            const { data } = await axios.get(
                "https://mern-stack-portfolio-6r58.onrender.com/api/v1/project/getall",
            {withCredentials: true})
            setProject(data.projects)
        }
        getAllProjects();
    },[])
    const [viewAll, setViewAll] = useState(false);
  return (
    <div id='portfolio' className='projects'>
      <div className="projects-title">
        <h1>My Latest Work</h1>
      </div>
      <div className="projects-container">
        {viewAll ? project && project.map(element=>{
            return (
                <Link to={`/project/${element._id}`} key={element._id}>
                <img src={element.projectBanner && element.projectBanner.url} alt="Project Banner" />
                </Link>
            )
        }): project && project.slice(0, 6).map(element=>{
            return (
                <Link to={`/project/${element._id}`} key={element._id}>
                <img src={element.projectBanner && element.projectBanner.url} alt="Project Banner" />
                </Link>
            )
        })}
      </div>
      {project && project.length > 6 && (
            <button className='btn' onClick={()=>setViewAll(!viewAll)}>
                {viewAll ? "show less" : "show more"}
                <i className="fa-solid fa-arrow-right"/>
            </button>
      )}
    </div>
  )
}

export default Projects
