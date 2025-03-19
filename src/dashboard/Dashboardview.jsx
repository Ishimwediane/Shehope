import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardView = () => {
  const [blogs, setBlogs] = useState([]);
  const [tips, setTips] = useState([]);
  const [trimester, setTrimester] = useState(null); // State to store trimester info
  const [tipError, setTipError] = useState(null);

  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  useEffect(() => {
    if (!userId) {
      console.error("No userId found in localStorage");
      return; // Stop execution if no userId
    }

    // Fetch user data (which contains trimester information)
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setTrimester(userResponse.data.trimester); // Set trimester information
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
      }
    };

    // Fetch blogs based on userId
    const fetchBlogs = async () => {
      try {
        console.log(`Fetching blogs for userId: ${userId}`);
        const response = await axios.get(`http://localhost:5000/api/blogs?userId=${userId}`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error.response?.data || error.message);
      }
    };

    // Fetch tips based on userId
    const fetchTips = async () => {
      try {
        console.log(`Fetching tips for userId: ${userId}`);
        const response = await axios.get(`http://localhost:5000/api/tips?userId=${userId}`);
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching tips:", error.response?.data || error.message);
      }
    };

    fetchUserData(); // Get user data and trimester info
    fetchBlogs(); // Fetch blogs
    fetchTips(); // Fetch tips
  }, [userId]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex">
      <div className="flex-1 p-6 ml-64 mt-16">
        <div className="p-6 bg-white">
          <p className="text-gray-500 text-sm">{today}</p>
          <h1 className="text-3xl font-bold text-blue-500 mt-2">Hello, Courtney</h1>
          <p className="text-2xl font-medium text-black">How can I help you today?</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold">Pregnancy Overview</h2>
          <p className="text-gray-600 mt-1">Helpful updates for your journey</p>

          {/* Display trimester title */}
          {trimester && (
            <p className="text-lg font-medium text-blue-500 mt-2">You're in your {trimester} trimester.</p>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Display tips */}
            {tips.length === 0 ? (
              <p>No tips available.</p>
            ) : (
              tips.map((tipItem) => (
                <div key={tipItem._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <span className="text-3xl">📚</span>
                  <h3 className="text-lg font-semibold mt-2">{tipItem.message}</h3>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Blog Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Recommended for You</h2>

          {blogs.length === 0 ? (
            <p>No blogs available for this trimester.</p>
          ) : (
            <div>
              {blogs.map((blog) => (
                <div key={blog._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <img src={blog.image} alt={blog.title} className="w-full h-32 object-cover rounded-lg" />
                  <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm">{blog.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">View More</button>
      </div>
    </div>
  );
};

export default DashboardView;
