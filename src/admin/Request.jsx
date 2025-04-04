import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Request = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          alert("No token found");
          navigate('/login');
          return;
        }

        const response = await fetch('https://shehope-server-1.onrender.com/api/admin/donations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDonations(data);
        } else {
          alert('Error fetching donations.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching donations.');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [navigate]);

  const handleStatusChange = async (donationId, status) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`https://shehope-server-1.onrender.com/api/admin/donations/${donationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success('Donation status updated successfully!');
        setDonations(prevDonations =>
          prevDonations.map(donation =>
            donation._id === donationId ? { ...donation, status } : donation
          )
        );
      } else {
        alert('Failed to update donation status');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating status.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20 ml-64 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Manage Donation Requests</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm font-semibold">
              <th className="px-4 py-3 text-left">Donation Type</th>
              <th className="px-4 py-3 text-left">Amount Needed</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Phone Number</th>
              <th className="px-4 py-3 text-left">User Name</th>
              <th className="px-4 py-3 text-left">User Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-600">No donation requests found.</td>
              </tr>
            ) : (
              donations.map(donation => (
                <tr key={donation._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-3">{donation.donationType}</td>
                  <td className="px-4 py-3">{donation.amountNeeded}</td>
                  <td className="px-4 py-3">{donation.address}</td>
                  <td className="px-4 py-3">{donation.phoneNumber}</td>
                  <td className="px-4 py-3">{donation.user?.name || "Unknown"}</td>
                  <td className="px-4 py-3">{donation.user?.email || "Unknown"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        donation.status === 'pending' ? 'bg-blue-400' :
                        donation.status === 'approved' ? 'bg-blue-700' : 'bg-red-400'
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      {donation.status !== 'approved' && (
                        <button
                          className="px-4 py-2 bg-blue-400 text-white rounded-md shadow-md hover:bg-blue-500 transition-all duration-300"
                          onClick={() => handleStatusChange(donation._id, 'approved')}
                        >
                          Approve
                        </button>
                      )}
                      {donation.status !== 'rejected' && (
                        <button
                          className="px-4 py-2 bg-red-400 text-white rounded-md shadow-md hover:bg-red-500 transition-all duration-300"
                          onClick={() => handleStatusChange(donation._id, 'rejected')}
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Request;
