import React, { useEffect, useState } from 'react'
import './MyApps.css'
import axios from 'axios';

const MyApps = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const getAllApps = async () => {
            const { data } = await axios.get(
                "https://mern-stack-portfolio-6r58.onrender.com/api/v1/softwareapplication/getall",
                { withCredentials: true }
            )
            setApps(data.softwareApplications);
        }
        getAllApps();
    }, [])
    return (
        <div className='apps'>
            <div className="apps-title">
                <h1>Software Apps</h1>
            </div>
            <div className="apps-container">
                {apps && apps.map(element => {
                    return (<div className="apps-card" key={element._id}>
                        <img src={element.svg && element.svg.url} alt={element.name} />
                        <p>{element.name}</p>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default MyApps
