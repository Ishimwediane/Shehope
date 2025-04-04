import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiPen } from "react-icons/ti";

const DashboardView = () => {
  const [blogs, setBlogs] = useState([]);
  const [tips, setTips] = useState([]);
  const [trimester, setTrimester] = useState(null);
  const [tipError, setTipError] = useState(null);
  const [userName, setUserName] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://shehope-server-1.onrender.com/api/user/${userId}`);
        setTrimester(userResponse.data.trimester);
        setUserName(userResponse.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`https://shehope-server-1.onrender.com/api/blogs?userId=${userId}`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error.response?.data || error.message);
      }
    };

    const fetchTips = async () => {
      try {
        const response = await axios.get(`https://shehope-server-1.onrender.com/api/tips?userId=${userId}`);
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching tips:", error.response?.data || error.message);
      }
    };

    fetchUserData();
    fetchBlogs();
    fetchTips();
  }, [userId]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex">
      <div className="flex-1 p-6 ml-12 mt-16">
        
        <div className="p-6 bg-white">
          <p className="text-gray-500 text-sm -mt-10">{today}</p>
          <h2 className="text-3xl font-bold text-blue-500 mt-2">Hello, {userName}</h2>
          <p className="text-2xl font-medium text-black">How can I help you today?</p>
        </div>

        <div className="p-6 bg-white rounded-xl">
          <h2 className="text-xl font-bold">Pregnancy Overview</h2>
          <p className="text-gray-600 mt-1">Helpful updates for your journey</p>

          {trimester && (
            <p className="text-lg font-medium text-blue-500 mt-2">You're in your {trimester} trimester.</p>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.length === 0 ? (
              <p>No tips available.</p>
            ) : (
              tips.map((tipItem) => (
                <div key={tipItem._id} className="p-4 bg-gray-100 rounded-lg">
                  <span className="text-3xl"><TiPen className="text-blue-300"/></span>
                  <h3 className="text-lg font-semibold mt-2">{tipItem.message}</h3>
                </div>
              ))
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8">Recommended for You</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length === 0 ? (
            <p>No blogs available for this trimester.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-gray-100 p-4 rounded-lg">
                <img src={blog.image} alt={blog.title} className="w-full h-32 object-cover rounded-lg" />
                <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm">{blog.content}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">View More</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;