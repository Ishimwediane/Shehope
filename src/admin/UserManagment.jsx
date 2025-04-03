import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaSave } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedTrimester, setEditedTrimester] = useState("");
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    userGrowth: [],
  });

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Admin token is missing. Please log in as an admin.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);

        // Calculate user statistics
        setUserStats({
          totalUsers: data.length,
          activeUsers: data.filter(user => user.active).length,
          userGrowth: calculateUserGrowth(data),
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate user growth per month for chart
  const calculateUserGrowth = (users) => {
    const growthData = [];
    const userCountPerMonth = {};

    users.forEach((user) => {
      const month = new Date(user.createdAt).toLocaleString("default", { month: "long", year: "numeric" });
      userCountPerMonth[month] = (userCountPerMonth[month] || 0) + 1;
    });

    for (let month in userCountPerMonth) {
      growthData.push({ month, count: userCountPerMonth[month] });
    }

    return growthData;
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle trimester update
  const handleEdit = (id, currentTrimester) => {
    setEditingUserId(id);
    setEditedTrimester(currentTrimester);
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("You need to be logged in as an admin.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trimester: editedTrimester }),
      });

      if (!response.ok) {
        throw new Error("Failed to update trimester");
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user._id === id ? updatedUser : user)));
      setEditingUserId(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Chart Data for User Growth
  const chartData = {
    labels: userStats.userGrowth.map((item) => item.month),
    datasets: [
      {
        label: "Users Registered",
        data: userStats.userGrowth.map((item) => item.count),
        borderColor: "#106687",
        backgroundColor: "rgba(16, 103, 135, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="ml-64 mt-20 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Management</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded-lg shadow-md bg-gray-100">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-xl">{userStats.totalUsers}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-md bg-gray-100">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-xl">{userStats.activeUsers}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-md bg-gray-100">
          <h3 className="text-lg font-semibold">User Growth</h3>
          <p className="text-xl">{userStats.userGrowth.length} months</p>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">User Registration Growth</h3>
        <Line data={chartData} />
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search users..."
          className="border p-2 rounded-lg w-1/4 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">First Name</th>
                <th className="border p-3 text-left">Last Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Date of Birth</th>
                <th className="border p-3 text-left">Trimester</th>
                <th className="border p-3 text-left">Created Date</th>
                <th className="border p-3 text-left">Last Updated</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border p-3">{user.name || "N/A"}</td>
                  <td className="border p-3">{user.last_name || "N/A"}</td>
                  <td className="border p-3">{user.email || "N/A"}</td>
                  <td className="border p-3">{new Date(user.date_of_birth).toLocaleDateString() || "N/A"}</td>
                  <td className="border p-3">
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editedTrimester}
                        onChange={(e) => setEditedTrimester(e.target.value)}
                        className="border p-1 rounded-lg"
                      />
                    ) : (
                      user.trimester || "N/A"
                    )}
                  </td>
                  <td className="border p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="border p-3">{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td className="border p-3 text-center">
                    {editingUserId === user._id ? (
                      <button onClick={() => handleSave(user._id)} className="text-green-500">
                        <FaSave />
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(user._id, user.trimester)} className="text-blue-500">
                        <FaEdit />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="ml-2 text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
