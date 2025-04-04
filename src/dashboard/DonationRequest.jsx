import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DonationRequest = () => {
  const [donationType, setDonationType] = useState('Medical');
  const [amountNeeded, setAmountNeeded] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId"); // Retrieve userId
  
    if (!token) {
        toast.success("Donation request submitted successfully!");
      return;
    }
  
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
  
    const formData = new FormData();
    formData.append("user", userId); // Include userId
    formData.append("donationType", donationType.trim());
    formData.append("amountNeeded", amountNeeded.trim());
    formData.append("address", address.trim());
    formData.append("phoneNumber", phoneNumber.trim());
    formData.append("description", description.trim());
    if (file) formData.append("file", file);
  
    try {
      setLoading(true);
      const response = await fetch("https://shehope-server-1.onrender.com/api/donations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Send token
        },
        body: formData,
      });
  
      if (response.ok) {
        alert("Donation request submitted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to submit request."}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="mt-20 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Request a Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="donationType" className="block text-sm font-medium text-gray-700">Donation Type</label>
            <select
              id="donationType"
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="Medical">Medical</option>
              <option value="Legal">Legal</option>
              <option value="Counseling">Counseling</option>
              <option value="Money">Money</option>
            </select>
          </div>

          <div>
            <label htmlFor="amountNeeded" className="block text-sm font-medium text-gray-700">Amount Needed (Optional)</label>
            <input
              type="number"
              id="amountNeeded"
              value={amountNeeded}
              onChange={(e) => setAmountNeeded(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Provide a brief description of your need"
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File (Optional)</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-20 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DonationRequest;
