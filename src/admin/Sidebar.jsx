import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  FileText,
  Brain,
  Bell,
  Settings,
  HelpCircle,
  DollarSign,
  BarChart3,
  UserCheck,
  ShieldCheck,
  LogOut 
} from "lucide-react";
import "../styles/Dashboard.css";

const Sidebar = () => {
  const [username, setUsername] = useState("Admin"); // Default value

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);
  const navigate = useNavigate(); // Use navigate for redirection

   // Logout function
   const handleLogout = () => {
    // Clear any stored data, e.g., user session, authentication tokens
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");


  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5 flex flex-col fixed top-0 left-0 overflow-hidden">
      {/* Title */}
      <h1 className="text-xl font-bold mb-5">SheHope Admin</h1>


      {/* Navigation Links */}
      <nav className="flex-1 mt-8">
        <ul className="sidebar-links">
          <li>
            <Link to="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Home size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/user" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Users size={18} /> User Management
            </Link>
          </li>
         
          <li>
            <Link to="/donation" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <UserCheck size={18} /> Support Requests
            </Link>
          </li>
          <li>
            <Link to="communitypage" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Users size={18} /> Community Moderation
            </Link>
          </li>
          <li>
            <Link to="/calendaryscheduler" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Calendar size={18} /> Activity Scheduler
            </Link>
          </li>
          <li>
            <Link to="/recommendation" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <FileText size={18} /> Recommendation
            </Link>
          </li>
          {/* <li>
            <Link to="/admin/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <BarChart3 size={18} /> Reports & Analytics
            </Link>
          </li>
          <li>
            <Link to="/admin/security" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <ShieldCheck size={18} /> Security & Access Control
            </Link>
          </li>
          <li>
            <Link to="/admin/notifications" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              <Bell size={18} /> Notifications
            </Link>
          </li> */}
          <li className="mt-35">
           <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 w-full"
            >
              <LogOut size={18} /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;