import React from "react";
import { Link } from "react-router-dom";
import '../styles/Footer.css'
const Footer =() =>{
    return(
        <>
      <div className="footer  bg-gray-200 text-white p-8">
    <div className="column-footer ml-30 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Footer - About */}
        <div className="left-footer">
            <span className="text-lg font-bold">SheHope</span>
            <p className="mt-2 text-sm">Empowering women through support, 
                guidance, and hope during unplanned pregnancies.
            </p>
        </div>

        {/* Quick Links */}
        <div className="link-footer ml-8">
            <span className="text-lg font-bold">Quick Links</span>
            <ul className="mt-2 space-y-2 text-sm">
            <li><Link to="/About" className="hover:text-[#106687]">About</Link></li>
                        <li><Link to="/Support" className="hover:text-[#106687]">Support</Link></li>
                        <li><Link to="/Community" className="hover:text-[#106687]">Community</Link></li>
                        <li><Link to="/Donate" className="hover:text-[#106687]">Donate</Link></li>
            </ul>
        </div>

        {/* Get Involved */}
        <div className="right-footer">
            <span className="text-lg font-bold">Get Involved</span>
            <ul className="mt-2 space-y-2 text-sm">
                <li>Join Our Community</li>
                <li>Share Your Story</li>
                <li>FAQ</li>
            </ul>
        </div>

        {/* Social Media Section */}
        <div className="social-footer">
            <span className="text-lg font-bold">Follow Us</span>
            <ul className="mt-2 space-y-2 text-sm">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
            </ul>
        </div>
    </div>
</div>

        </>
    )
}
export default Footer