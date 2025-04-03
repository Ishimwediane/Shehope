import React, { useState } from "react";
import { FaFileExport, FaSearch, FaEye, FaEnvelope } from "react-icons/fa";

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      type: "Financial Aid",
      status: "Pending",
      details: "Needs urgent support for housing rent.",
      attachments: ["document1.pdf", "receipt.jpg"],
    },
    {
      id: 2,
      name: "Mark Brown",
      email: "mark@example.com",
      type: "Resource Support",
      status: "Approved",
      details: "Requested medical supplies for treatment.",
      attachments: [],
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [emailMessage, setEmailMessage] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const openModal = (request) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setEmailMessage("");
  };

  const sendEmail = () => {
    alert(`Email sent to ${selectedRequest.email}: ${emailMessage}`);
    closeModal();
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-20 ml-64 p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Admin Support Requests
      </h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FaSearch className="mr-2 text-gray-600" />
          <input
            type="text"
            placeholder="Search by name, email, or type..."
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
            <th className="p-3">Requester Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Request Type</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id} className="border-t">
              <td className="p-3">{request.name}</td>
              <td className="p-3">{request.email}</td>
              <td className="p-3">{request.type}</td>
              <td className="p-3">
                <select
                  value={request.status}
                  onChange={(e) =>
                    handleStatusChange(request.id, e.target.value)
                  }
                  className="border p-2 rounded-lg"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </td>
              <td className="p-3">
                <button
                  className="text-blue-600 hover:underline flex items-center"
                  onClick={() => openModal(request)}
                >
                  <FaEye className="mr-1" /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              Support Request Details
            </h3>
            <p>
              <strong>Name:</strong> {selectedRequest.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRequest.email}
            </p>
            <p>
              <strong>Type:</strong> {selectedRequest.type}
            </p>
            <p>
              <strong>Details:</strong> {selectedRequest.details}
            </p>

            {selectedRequest.attachments.length > 0 && (
              <div className="mt-4">
                <strong>Attachments:</strong>
                <ul className="list-disc list-inside">
                  {selectedRequest.attachments.map((file, index) => (
                    <li key={index}>
                      <a
                        href={`/uploads/${file}`} // This assumes a backend serves files
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {file}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Send Email Response</h3>
              <textarea
                className="w-full border p-2 rounded-lg mt-2"
                rows="4"
                placeholder="Write your response here..."
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              ></textarea>
              <button
                onClick={sendEmail}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3 flex items-center hover:bg-blue-700"
              >
                <FaEnvelope className="mr-2" /> Send Email
              </button>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;
