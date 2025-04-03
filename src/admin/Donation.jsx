import React, { useState } from 'react';
import { FaMoneyBillWave, FaChartBar, FaCalendarAlt, FaFileExport, FaSearch } from 'react-icons/fa';

const Donation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [donations, setDonations] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', amount: 100, type: 'Monthly', method: 'Credit Card', date: 'March 28, 2025', status: 'Processed' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', amount: 200, type: 'One-Time', method: 'PayPal', date: 'March 27, 2025', status: 'Pending' },
  ]);

  const stats = [
    { label: 'Total Donations', value: '$12,500', icon: <FaMoneyBillWave /> },
    { label: 'Active Campaigns', value: '5', icon: <FaChartBar /> },
    { label: 'Recurring Donations', value: '250', icon: <FaCalendarAlt /> },
  ];

  const filteredDonations = donations.filter(donation => 
    donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to toggle the status between 'Processed' and 'Pending'
  const toggleDonationStatus = (id) => {
    setDonations(donations.map(donation =>
      donation.id === id
        ? { ...donation, status: donation.status === 'Processed' ? 'Pending' : 'Processed' }
        : donation
    ));
  };

  return (
    <div className="mt-20 ml-64 p-6">
      {/* Admin Donations Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Admin Donations Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
            <div className="text-3xl text-blue-600 mr-3">{stat.icon}</div>
            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FaSearch className="mr-2 text-gray-600" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="p-2 border rounded-lg" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
          <FaFileExport className="mr-2" /> Export Data
        </button>
      </div>
      
      <table className="w-full border rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Donor Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Type</th>
            <th className="p-3">Payment Method</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonations.map((donation) => (
            <tr key={donation.id} className="border-t">
              <td className="p-3">{donation.name}</td>
              <td className="p-3">{donation.email}</td>
              <td className="p-3">${donation.amount}</td>
              <td className="p-3">{donation.type}</td>
              <td className="p-3">{donation.method}</td>
              <td className="p-3">{donation.date}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-lg text-white ${donation.status === 'Processed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  {donation.status}
                </span>
              </td>
              <td className="p-3 flex items-center space-x-2">
                {/* View Button */}
                <button className="text-blue-600 hover:underline">View</button>
                
                {/* Toggle Status Button */}
                <button
                  onClick={() => toggleDonationStatus(donation.id)}
                  className="text-blue-600 hover:underline"
                >
                  Toggle Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donation;
