import React from 'react'
import './Services.css'
import ServicesData from '../../../Service_Data.json'

const Services = () => {
    return (
        <div id='services' className='services'>
            <div className="services-title">
                <h1>My Services</h1>
            </div>
            <div className="services-items">
                {ServicesData.map((element, index) => {
                    return <div key={index} className="services-format">
                        <h2>{element.S_name}</h2>
                        <p>{element.S_Desc}</p>
                        <button type='submit' className='services-btn'>
                            Read More
                            <i className="fa-solid fa-arrow-right" />
                        </button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Services
