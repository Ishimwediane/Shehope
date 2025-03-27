import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { FaUser } from "react-icons/fa";
import axios from "axios";



const Profile = ({ userId }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    email: "",
    emergency_contact: "",
    pregnancy_status: "",
    trimester: "",
    profile_picture: "",
  });

  useEffect(() => {
    // Fetch user data from backend when the component mounts
    axios
      .get(`/api/user/${userId}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Call API to save updated user data
    axios
      .put(`/api/user/${userId}`, userData)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        setIsEditing(false); // Turn off editing mode after saving
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode without saving
    // Refetch the data to reset changes
    axios
      .get(`/api/user/${userId}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  };

  const profilePic = userData.profile_picture || <FaUser className="w-20 h-20 text-gray-400" />;

  return (
    <div className="ml-50 mb-30 mt-25 max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Profile Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border">
            {typeof profilePic === "string" ? (
              <img src={profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              profilePic
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400"
                />
              ) : (
                userData.name
              )}{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400"
                />
              ) : (
                userData.last_name
              )}
            </h2>
            <p className="text-gray-500">Seeking Support - Kigali, Rwanda</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1 text-blue-500 hover:underline"
        >
          <Pencil className="w-5 h-5" /> {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Personal Information */}
      <div className="mt-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Personal Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
          <p>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="border-b-2 border-gray-400"
              />
            ) : (
              userData.email
            )}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="emergency_contact"
                value={userData.emergency_contact}
                onChange={handleChange}
                className="border-b-2 border-gray-400"
              />
            ) : (
              userData.emergency_contact || "Not provided"
            )}
          </p>
          <p>
            <strong>Pregnancy Status:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="pregnancy_status"
                value={userData.pregnancy_status}
                onChange={handleChange}
                className="border-b-2 border-gray-400"
              />
            ) : (
              userData.pregnancy_status || "Not provided"
            )}
          </p>
          <p>
            <strong>Trimester:</strong>{" "}
            {isEditing ? (
              <select
                name="trimester"
                value={userData.trimester}
                onChange={handleChange}
                className="border-b-2 border-gray-400"
              >
                <option value="first">First</option>
                <option value="second">Second</option>
                <option value="third">Third</option>
              </select>
            ) : (
              userData.trimester
            )}
          </p>
        </div>
      </div>

      {/* Address & Other Details */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Address & Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
          <p>
            <strong>Country:</strong> Rwanda
          </p>
          <p>
            <strong>City:</strong> Kigali
          </p>
          <p>
            <strong>Preferred Language:</strong> English
          </p>
          <p>
            <strong>Support Needed:</strong> Mental Health, Legal Advice
          </p>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 flex justify-end gap-4">
          <button onClick={handleCancel} className="bg-gray-300 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
