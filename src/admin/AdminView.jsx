import React from "react";
import Sidebar from "./Sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DashboardView = () => {
  const userStats = [
    { name: "Jan", users: 200 },
    { name: "Feb", users: 300 },
    { name: "Mar", users: 400 },
    { name: "Apr", users: 600 },
    { name: "May", users: 800 },
  ];

  return (
    <div className="flex ml-64 mt-20 h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
      

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-medium">Total Users</h2>
            <p className="text-2xl font-bold">1,250</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-medium">Total Donations</h2>
            <p className="text-2xl font-bold">$12,450</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-medium">Support Requests</h2>
            <p className="text-2xl font-bold">320 Pending</p>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white p-5 rounded-lg shadow mb-6">
          <h2 className="text-lg font-medium mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#106687" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
