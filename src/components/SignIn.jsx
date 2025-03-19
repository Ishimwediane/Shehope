import React, { useState } from "react";
import '../styles/signin.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Notify} from "notiflix"


const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      console.log("Attempting to login...");
  
      const response = await axios.post("http://localhost:5000/api/user/login", { email, password });
  
      console.log("Response received:", response.data);
  
      // Extract user data
      const user = response.data.user;
      const token = user?.tokens?.accessToken;
      const userID=response.data
      localStorage.setItem("userID", JSON.stringify(userID));
  
      if (user && token) {
        // Store token, user ID, and user name in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", user._id);  // Store user ID
        localStorage.setItem("userName", user.name); // Store user name
        localStorage.setItem("trimester", user.trimester);  // Store trimester in localStorage
  
       Notify.success("user Login successfull");
  
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000);
      } else {
        setError("Invalid response from the server. Token not found.");
      }
    } catch (err) {
      console.error("Login error:", err);
  
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid login credentials");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };
  

  return (
    <div className="signin flex h-screen bg-gradient-to-r from-blue-900 to-blue-200">
      <div className="signin-form w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Sign In</h1>
        <p className="text-gray-600 mt-2 text-center">Access your personalized pregnancy care</p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="w-full py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign In
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
