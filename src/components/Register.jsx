import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import login from "../image/login.jpg";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const onSubmit = async (data) => {
    try {
      const { email, password, name, last_name, trimester, date_of_birth } = data;
  
      const formData = {
        email,
        password,
        name,
        last_name,
        trimester,
        date_of_birth,
      };
  
      const response = await axios.post("http://localhost:5000/api/user/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("userName", name);
        localStorage.setItem("trimester", trimester);  // Store trimester in localStorage
        toast.success("Registration successful!");
        navigate("/Dashboard");
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };
  

  const password = watch("password");

  return (
    <div className="mt-12 flex h-screen bg-gradient-to-r from-[#106687] to-white">
      {/* Main Form Container */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
        <p className="text-xs text-gray-600 mt-2">Sign up and get personalized pregnancy care</p>

        <form className="mt-6 w-3/4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First Name"
                {...register("name", { required: "First name is required" })}
                className={`w-full p-2 bg-white rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                {...register("last_name", { required: "Last name is required" })}
                className={`w-full p-2 bg-white rounded-lg border ${errors.last_name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
            </div>
          </div>

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`w-full p-2 bg-white rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className={`w-full p-2 bg-white rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match"
            })}
            className={`w-full p-2 bg-white rounded-lg border ${errors.confirm_password ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>}

          <select
            {...register("trimester", { required: "Please select your trimester" })}
            className={`w-full p-2 bg-white rounded-lg border ${errors.trimester ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select Pregnancy Status</option>
            <option value="first">First Trimester</option>
            <option value="second">Second Trimester</option>
            <option value="third">Third Trimester</option>
          </select>
          {errors.trimester && <p className="text-red-500 text-sm mt-1">{errors.trimester.message}</p>}

          <input
            type="date"
            {...register("date_of_birth", { required: "Date of Birth is required" })}
            className={`w-full p-2 bg-white rounded-lg border ${errors.date_of_birth ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth.message}</p>}

          <button
            type="submit"
            className="w-full bg-[#106687] text-white py-3 rounded-full hover:bg-blue-800 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Already have an account? <Link to= "/SignIn" className="text-[#106687]">Sign in</Link>
        </p>
      </div>

      <div className="w-1/2 relative flex justify-center items-center">
        <img src={login} alt="Sign Up" className="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  );
};

export default Register;