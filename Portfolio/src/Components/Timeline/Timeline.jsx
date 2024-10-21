import React, { useEffect, useState } from 'react'
import './Timeline.css'
import axios from 'axios';

const Timeline = () => {
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        const getAllTimeline = async () => {
            const { data } = await axios.get(
                "https://mern-stack-portfolio-6r58.onrender.com/api/v1/timeline/getall",
                { withCredentials: true }
            )
            setTimeline(data.timelines)
        }
        getAllTimeline();
    }, [])
    return (
        <div id='timeline'>
            <div className="timeline-title">
                <h1>Timeline</h1>
            </div>
            <ul className="timeline">
                {timeline && timeline.map(element => {
                    return (
                        <li className="timeline-event" key={element._id}>
                            <label className="timeline-event-icon"></label>
                            <div className="timeline-event-copy">
                                <p className="timeline-event-thumbnail">{element.timeline.from} - {element.timeline.to}</p>
                                <h3>{element.title}</h3>
                                <h4>{element.description}</h4>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default Timeline
