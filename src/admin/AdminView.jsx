import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registering the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminView = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0); 
  const [totalReports, setTotalReports] = useState(0); 
  const [donationsData, setDonationsData] = useState([]); // Holds donation data for graph

  // Fetch total users from API with Authorization
  const fetchTotalUsers = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch("https://shehope-server-1.onrender.com/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();
      setTotalUsers(data.length); 
    } catch (error) {
      console.error("Error fetching total users:", error);
      if (error.message === "Unauthorized") {
        alert("You are not authorized. Please log in.");
      }
    }
  };

  // Fetch total donations from API with Authorization
  const fetchTotalDonations = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch("https://shehope-server-1.onrender.com/api/admin/donations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();
      setTotalDonations(data.length); 

      // Set donation data for the chart (count of donations per type or other criteria)
      setDonationsData(data); // You can update this to reflect a structure for the chart
    } catch (error) {
      console.error("Error fetching total donations:", error);
      if (error.message === "Unauthorized") {
        alert("You are not authorized. Please log in.");
      }
    }
  };

  // Fetch total reports from API with Authorization
  const fetchTotalReports = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch("https://shehope-server-1.onrender.com/api/admin/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();
      setTotalReports(data.length); 
    } catch (error) {
      console.error("Error fetching total reports:", error);
      if (error.message === "Unauthorized") {
        alert("You are not authorized. Please log in.");
      }
    }
  };

  // Fetch all data when the component mounts
  useEffect(() => {
    fetchTotalUsers();
    fetchTotalDonations();
    fetchTotalReports();
  }, []);

  // Prepare data for the bar chart (you can customize this)
  const donationTypes = donationsData.reduce((acc, donation) => {
    acc[donation.donationType] = acc[donation.donationType] ? acc[donation.donationType] + 1 : 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(donationTypes), // Donation types (e.g., Money, Medical)
    datasets: [
      {
        label: "Donation Requests",
        data: Object.values(donationTypes), // Number of requests per type
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex ml-64 mt-20 h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-medium">Total Users</h2>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-medium">Total Donation Requests</h2>
            <p className="text-2xl font-bold">{totalDonations}</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-medium">Total Posts</h2>
            <p className="text-2xl font-bold">{totalReports} </p>
          </div>
        </div>

        {/* Bar Chart for Donation Requests */}
        <div className="bg-white p-5 rounded-lg shadow mt-6" style={{ height: "400px" }}>
          <h2 className="text-lg font-medium">Donation Requests by Type</h2>
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={400} />
        </div>
      </div>
    </div>
  );
};

export default AdminView;
