import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Users, Calendar, FileText, Settings,LogOut } from "lucide-react";

const Account = ({ isOpen, onClose, userName }) => {
    const navigate = useNavigate(); // Use navigate for redirection

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        onClose(); // Close the sidebar after logout
        navigate("/"); // Redirect to Home page
    };

    const handleLinkClick = () => {
        onClose(); // Close the sidebar when a link is clicked
    };

    return (
        <div
            className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            } z-50`}
        >
            <div className="flex items-center p-4 border-b">
                <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center">
                    {/* User avatar placeholder */}
                </div>
                <span className="ml-3 font-semibold">{userName || "User"}</span>
                <button onClick={onClose} className="ml-auto text-red-500 text-xl">✖</button>
            </div>
            <nav className="mt-4">
                <ul className="sidebar-links">
                    <li>
                        <Link
                            to="/Dashboard"
                            onClick={handleLinkClick} // Close sidebar on link click
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                        >
                            <Home size={14} /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Community"
                            onClick={handleLinkClick} // Close sidebar on link click
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                        >
                            <Users size={14} /> Community Chat
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Calendary"
                            onClick={handleLinkClick} // Close sidebar on link click
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                        >
                            <Calendar size={14} /> Activity Scheduler
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Support"
                            onClick={handleLinkClick} // Close sidebar on link click
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                        >
                            <FileText size={14} /> Legal Resources
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Settings"
                            onClick={handleLinkClick} // Close sidebar on link click
                            className="flex items-center mt-36 gap-3 p-3 rounded-lg hover:bg-gray-700"
                        >
                            <Settings size={14} /> Settings
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="flex items-center w-64 gap-3 p-3 mt-4 rounded-lg hover:bg-gray-700">
                            <LogOut size={14} /> Logout
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Logout Button */}
         
        </div>
    );
};

export default Account;
