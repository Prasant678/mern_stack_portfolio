import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Projectview.css'

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`https://mern-stack-portfolio-6r58.onrender.com/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <>
      <div className="project-btn">
        <h3>Portfolio</h3>
        <button onClick={handleReturnToDashboard} className="return">
          Return to home
        </button>
      </div>
      <h5>{title}</h5>
      <div className="project">
        <div className="project-left">
          <div className="project-view">
            <img
              src={
                projectBanner
                  ? projectBanner
                  : ""
              }
              alt="projectBanner"
            />
          </div>
        </div>
        <div className="project-right">
          <div className="description">
            <p>Description :</p>
            <ul>
              {descriptionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="technology">
            <p>Technologies :</p>
            <ul>
              {technologiesList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="stack">
            <h4>Stack :</h4>
            <p>{stack}</p>
          </div>
          <div className="deployed">
            <h4>Deployed :</h4>
            <p>{deployed}</p>
          </div>
          <div className="git-link">
            <p>Github Repository Link :</p>
            <Link
              className='link'
              target="_blank"
              to={gitRepoLink}
            >
              {gitRepoLink}
            </Link>
          </div>
          <div className="project-link">
            <p>Project Link :</p>
            <Link
              className='link'
              target="_blank"
              to={projectLink}
            >
              {projectLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectView
