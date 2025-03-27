import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../image/LOGO.jpg";
import { VscAccount } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import Account from "./Account";

const Navbar = () => {
    const [user, setUser] = useState("");
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // To track sidebar open/close state
    const navigate = useNavigate(); // Use navigate for redirection

    // Load user from localStorage and update the user state
    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        setUser(""); // Clear user state
        setIsAccountOpen(false);
        setIsSidebarOpen(false); // Close sidebar on logout
        navigate("/"); // Redirect to Home page
    };

    return (
        <>
            <div className="nav fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="nav-menu flex justify-between items-center px-6 py-3">
                    <div className="flex items-center">
                        <Link to="/">
                            <img src={logo} className="w-8 h-8 rounded-full" alt="Logo" />
                        </Link>
                        <span className="ml-2 logoname font-semibold text-lg text-[#106687]">SheHope</span>
                    </div>
                    <ul className="hidden md:flex space-x-6 text-sm ">
                        <li><Link to="/About" className="hover:text-[#106687]">About</Link></li>
                        <li><Link to="/Support" className="hover:text-[#106687]">Support</Link></li>
                        <li><Link to="/Community" className="hover:text-[#106687]">Community</Link></li>
                        <li><Link to="/Donate" className="hover:text-[#106687]">Donate</Link></li>
                    </ul>
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <IoMdNotificationsOutline className="text-xl cursor-pointer" />
                                <button onClick={() => setIsAccountOpen(!isAccountOpen)} className="text-xl">
                                    <VscAccount />
                                </button>
                                <span className="font-semibold">{user}</span>
                               
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link to="/SignIn" className="text-[#106687] font-medium hover:underline">Log in</Link>
                                <Link to="/Register" className="bg-[#106687] text-white px-4 py-1 rounded-full hover:bg-[#106687] transition">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay when Account Sidebar is open */}
            {isAccountOpen && (
                <div
                    className="fixed inset-0 bg-[rgba(10,10,10,0.9)] filter brightness(0.2) z-40"
                    onClick={() => setIsAccountOpen(false)}
                ></div>
            )}

            {/* Account Sidebar */}
            <Account
                isOpen={isAccountOpen}
                onClose={() => setIsAccountOpen(false)}
                userName={user}
                handleLogout={handleLogout} // Pass handleLogout to Account
                setIsSidebarOpen={setIsSidebarOpen} // To close sidebar on link click
            />
        </>
    );
};

export default Navbar;
