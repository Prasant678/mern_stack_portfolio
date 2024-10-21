import React, { useRef, useState } from 'react'
import './Navbar.css'
import AnchorLink from "react-anchor-link-smooth-scroll"

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.right = "0";
  }

  const closeMenu = () => {
    menuRef.current.style.right = "-500px";
  }
  return (
    <div className='navbar-main'>
      <div className="navbar">
        <h3>Portfolio</h3>
        <img src="Untitled-removebg-preview.png" alt="" className='nav-mob-open' onClick={openMenu} />
        <ul ref={menuRef} className="nav-menu">
          <img src="[CITYPNG.COM]PNG Close X Logo White Icon - 1000x1000.png" alt="" className='nav-mob-close' onClick={closeMenu}/>
          <li><AnchorLink className="anchor-link" href="#home"><p onClick={() => setMenu("home")}>Home</p></AnchorLink>{menu === "home" ? <i className="fa-solid fa-minus" /> : <></>}</li>
          <li><AnchorLink className="anchor-link" offset={20} href="#about"><p onClick={() => setMenu("about")}>About</p></AnchorLink>{menu === "about" ? <i className="fa-solid fa-minus" /> : <></>}</li>
          <li><AnchorLink className="anchor-link" offset={20} href="#timeline"><p onClick={() => setMenu("timeline")}>Timeline</p></AnchorLink>{menu === "timeline" ? <i className="fa-solid fa-minus" /> : <></>}</li>
          <li><AnchorLink className="anchor-link" offset={20} href="#services"><p onClick={() => setMenu("services")}>Services</p></AnchorLink>{menu === "services" ? <i className="fa-solid fa-minus" /> : <></>}</li>
          <li><AnchorLink className="anchor-link" offset={20} href="#skills"><p onClick={() => setMenu("skills")}>Skills</p></AnchorLink>{menu === "skills" ? <i className="fa-solid fa-minus" /> : <></>}</li>
          <li><AnchorLink className="anchor-link" offset={20} href="#portfolio"><p onClick={() => setMenu("portfolio")}>Portfolio</p></AnchorLink>{menu === "portfolio" ? <i className="fa-solid fa-minus" /> : <></>}</li>
          <li><AnchorLink className="anchor-link" offset={20} href="#contact"><p onClick={() => setMenu("contact")}>Contact</p></AnchorLink>{menu === "contact" ? <i className="fa-solid fa-minus" /> : <></>}</li>
        </ul>
        <div className="nav-connect"><AnchorLink className="anchor-link-btn" offset={20} href="#contact">Connect with me</AnchorLink></div>
      </div>
    </div>
  )
}

export default Navbar
