import React, { useState } from 'react'
import './Contact.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
    const [Name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(
            "https://mern-stack-portfolio-6r58.onrender.com/api/v1/message/send",
            { Name, subject, message },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(() => {
                toast.success("Message Sent!")
                setName("")
                setSubject("")
                setMessage("")
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                setLoading(false)
            })
    }
    return (
        <div id='contact' className='contact'>
            <div className="contact-title">
                <h1>Get in Touch</h1>
            </div>
            <div className="contact-section">
                <div className="contact-left">
                    <h1>LET'S TALK</h1>
                    <p>I'm currently avaliable to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime.</p>
                    <div className="contact-details">
                        <div className="contact-detail">
                            <i className="fa-regular fa-envelope" />
                            <p>prasantrao917@gmail.com</p>
                        </div>
                        <div className="contact-detail">
                            <i className="fa-solid fa-phone" />
                            <p>+91-9692858292</p>
                        </div>
                        <div className="contact-detail">
                            <i className="fa-solid fa-location-dot" />
                            <p>Rourkela, Odisha</p>
                        </div>
                    </div>
                </div>
                <form className="contact-right" onSubmit={handleSendMessage}>
                    <label htmlFor="">Your Name</label>
                    <input type="text" placeholder='Enter Your Name' name='name' value={Name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="">Subject</label>
                    <input type="text" placeholder='Enter Subject' name='subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                    <label htmlFor="">Message</label>
                    <textarea type="text" placeholder='Enter Message' name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
                    {!loading ? (
                        <button type='submit' className='contact-btn'>Send Message</button>
                    ) : (
                        <div className='loading'>
                            <img src="Pulse@1x-1.0s-200px-200px.gif" alt="" />
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Contact
