import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  // Effect to apply dark mode class to <html> and save theme preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Effect to store language preference in localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex ml-6 mt-15 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Settings</h2>

        {/* Settings Options - Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Settings</h3>
            <button
              onClick={() => navigate("/Profile")}
              className="w-32 p-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance</h3>
            <div className="flex items-center justify-between mb-6">
              <label className="text-lg text-gray-900 dark:text-white">Dark Mode</label>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 bg-gray-200 dark:bg-gray-600 rounded-full shadow hover:bg-gray-300 transition duration-300"
              >
                {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-500" />}
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center justify-between">
              <label className="text-lg text-gray-900 dark:text-white">Select Language</label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="p-2 rounded-md bg-gray-200 text-black dark:bg-gray-800 dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notifications</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Configure your notification preferences below.</p>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg text-gray-900 dark:text-white">Email Notifications</label>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg text-gray-900 dark:text-white">SMS Notifications</label>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-lg text-gray-900 dark:text-white">Push Notifications</label>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
          </div>
        </div>

        {/* Sign Out Section */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="px-5 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
