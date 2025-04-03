// src/dashboard/DashboardNavbar.jsx
import React, { useState, useEffect } from "react";
import { Bell, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from '../LanguageContext'; // Import the language context

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage(); // Use the language context

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

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
    <div className="flex justify-between items-center p-1 shadow-md fixed w-full left-24 top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex ml-45 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg bg-gray-200 text-pink-600 focus:outline-none"
          />
        </div>

        <div className="ml-120 flex items-center gap-8">
          <button className="relative">
            <Bell size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
              3
            </span>
          </button>

          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 rounded-lg bg-gray-200 text-[10px] dark:bg-gray-800 text-pink-400 dark:text-white focus:outline-none"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          <div className="relative">
            <img
              src="https://res.cloudinary.com/dfe7ue90j/image/upload/v1737268420/cld-sample.jpg"
              alt="User  "
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