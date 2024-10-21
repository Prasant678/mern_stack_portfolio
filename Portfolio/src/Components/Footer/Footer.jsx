import React, { useEffect, useState } from 'react'
import './Footer.css'
import { toast } from 'react-toastify';
import axios from 'axios';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(
            "https://mern-stack-portfolio-6r58.onrender.com/api/v1/email/send",
            { email },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(() => {
                toast.success("SUBSCRIBED!")
                setEmail("")
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                setLoading(false)
            })
    }
    return (
        <div className='footer'>
            <div className="footer-top">
                <div className="footer-top-left">
                    <h3>Portfolio</h3>
                    <p>I am a fullStack web and frontend Developer from, India.</p>
                </div>
                <div className="footer-top-right">
                    <div className="footer-email-input">
                        <i className="fa-regular fa-user" />
                        <input type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {!loading ? (
                        <button type='submit' className='footer-btn' onClick={handleSendEmail}>Subscribe</button>
                    ) : (
                        <div className='loading'>
                            <img src="Pulse@1x-1.0s-200px-200px.gif" alt="" />
                        </div>
                    )}
                </div>
            </div>
            <hr />
            <div className="footer-bottom">
                <p className="footer-bottom-left">@ 2024 Prasant Rao All Rights Reseved.</p>
                <div className="footer-bottom-right">
                    <p>Terms of Services</p>
                    <p>Privacy Policy</p>
                    <p>Contact with me</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
