import React, { useState, useEffect } from "react";
import { Bell, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  
  

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 
 

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex  p-4 shadow-md fixed w-full  top-0 z-50">
      <div className="flex  w-full">
        <div className="flex ml-68 w-full">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg bg-gray-200 text-pink-600 focus:outline-none"
          />
        </div>

        <div className=" flex gap-12 -ml-120">
          <button className="relative">
            <Bell size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
              3
            </span>
          </button>

          


          <div className="relative">
            <img
              src="https://res.cloudinary.com/dfe7ue90j/image/upload/v1737268420/cld-sample.jpg"
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />

            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg"
                onClick={closeDropdown}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Account
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Edit Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
