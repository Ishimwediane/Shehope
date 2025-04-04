import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalendaryPage = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  const userId = localStorage.getItem('userId');

  // Fetch events when the component mounts
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`https://shehope-server-1.onrender.com/api/events/${userId}`);
      const updatedEvents = response.data.map(event => {
        const eventDate = new Date(event.date);
        return {
          ...event,
          status: eventDate < new Date() ? 'Completed' : 'Upcoming',
        };
      });
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events on component mount
  }, []);

  // Submit new or edited event
  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { title, description, date, time, userId };

    try {
      if (editingEventId) {
        // Update existing event
        await axios.put(`https://shehope-server-1.onrender.com/api/events/${editingEventId}`, eventData);
      } else {
        // Create new event
        await axios.post('https://shehope-server-1.onrender.com/api/events', eventData);
      }

      resetForm(); // Reset form after submission
      fetchEvents(); // Fetch updated events
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  // Reset form state
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setShowForm(false);
    setEditingEventId(null);
  };

  // Edit an event
  const handleEdit = (event) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    setTime(event.time);
    setEditingEventId(event._id); // Set the ID of the event being edited
    setShowForm(true); // Show the form for editing
  };

  // Delete an event
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`https://shehope-server-1.onrender.com/api/events/${eventId}`);
      fetchEvents(); // Fetch events after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="ml-12 mt-20 container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Activities</h1>
      
      <button 
        onClick={() => setShowForm(true)} 
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 mb-4"
      >
        Create Activity
      </button>

      {showForm && (
        <div className="fixed inset-0 flex bg-gray-500 bg-opacity-50  justify-center items-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{editingEventId ? 'Edit Event' : 'Create Activity'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border rounded w-full p-2 mb-2" required />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border rounded w-full p-2 mb-2" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded w-full p-2 mb-2" required />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border rounded w-full p-2 mb-2" />
              <div className="flex justify-end">
                <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-3 py-2 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded">{editingEventId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-10 mb-20 overflow-x-auto w-full">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Description</th>
              <th className="border border-gray-200 p-2">Date</th>
              <th className="border border-gray-200 p-2">Time</th>
              <th className="border border-gray-200 p-2">Status</th>
              <th className="border border-gray-200 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-2">{event.title}</td>
                <td className="border border-gray-200 p-2">{event.description}</td>
                <td className="border border-gray-200 p-2">{new Date(event.date).toLocaleDateString()}</td>
                <td className="border border-gray-200 p-2">{event.time}</td>
                <td className="border border-gray-200 p-2">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${event.status === 'Completed' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                    {event.status}
                  </span>
                </td>
                <td className="border border-gray-200 p-2">
                  <button onClick={() => handleEdit(event)} className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 mr-2">Edit</button>
                  <button onClick={() => handleDelete(event._id)} className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendaryPage;
