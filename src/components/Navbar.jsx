import React from "react";
import '../styles/Navbar.css'
import { Link } from "react-router-dom";
import logo from '../image/LOGO.jpg'
const Navbar =() => {
    return(
        <>
        <div className="nav ">
           
            <div className="nav-menu flex justify-between ">
                <logo className="flex"><img src={logo} className="w-8 h-8 rounded-full mt-2"/><span className="mt-2 ml-2 logoname">SheHope</span></logo>
                <ul className="  flex mt-3  menu-list">
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/Support">Support</Link></li>
                    <li><Link to="/Community">Community</Link></li>
                    <li><Link to="/Donate">Donate</Link></li>
                </ul>


                <div className="flex mt-3  text-[14px]"> 
                <label >Help</label>
                <div>
  <Link to="/SignIn">
    <button className="-mt-2 ml-8">Log in</button>
  </Link>
  <Link to="/Register">
    <button className="-mt-2 ml-8 nav-button">Sign up</button>
  </Link>
</div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Navbar