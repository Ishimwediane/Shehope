import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Users, Calendar, FileText, Brain, Bell, Settings, HelpCircle } from "lucide-react";
import "../styles/Dashboard.css";

const Sidebar = () => {
  const [username, setUsername] = useState("User"); // Default value

  useEffect(() => {
    // Retrieve username from localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (  
    <div className="h-screen w-64 bg-gray-900 text-white p-5 flex flex-col fixed top-0 left-0 overflow-hidden">
      {/* Greeting */}
      <span className="text-lg font-medium">Hi, {username} 👋</span>

      {/* Navigation Links */}
      <nav className="flex-1 mt-8">
        <ul className="sidebar-links">
          <li>
            <Link to="/Dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Home size={14} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/Community" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Users size={14} /> Community Chat
            </Link>
          </li>
          <li>
            <Link to="/Calendary" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Calendar size={14} />  Activity Scheduler
            </Link>
          </li>
          <li>
            <Link to="/Resource" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <FileText size={14} /> Legal Resources
            </Link>
          </li>
          
          <li>
            <Link to="/notifications" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Bell size={14} /> Notifications
            </Link>
          </li>
          <li>
            <Link to="/Settings" className="flex items-center mt-36 gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Settings size={14} /> Settings
            </Link>
          </li>
          <li>
            <Link to="/Help" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <HelpCircle size={14} /> Help & Support
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
