// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalendaryPage = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [editingEventId, setEditingEventId] = useState(null); // State to track which event is being edited

  // Retrieve userId from local storage
  const userId = localStorage.getItem('userId'); // Ensure this is set during sign-in

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${userId}`);
      const updatedEvents = response.data.map(event => {
        const eventDate = new Date(event.date);
        const today = new Date();
        // Set status based on the event date
        return {
          ...event,
          status: eventDate < today ? 'Completed' : 'Upcoming',
        };
      });
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEventId) {
        // Update existing event
        const response = await axios.put(`http://localhost:5000/api/events/${editingEventId}`, {
          title,
          description,
          date,
          time,
        });
        // Update the event in the state
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === editingEventId ? { ...event, ...response.data.event } : event))
        );
      } else {
        // Create new event
        const response = await axios.post('http://localhost:5000/api/events', {
          userId,
          title,
          description,
          date,
          time,
        });
        // Automatically set the status based on the date
        const newEvent = {
          ...response.data.event,
          status: new Date(date) < new Date() ? 'Completed' : 'Upcoming',
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleEdit = (event) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date.split('T')[0]); // Format date for input
    setTime(event.time);
    setEditingEventId(event._id);
    setShowForm(true); // Show the form for editing
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setEditingEventId(null);
    setShowForm(false); // Hide the form after submission
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="ml-70 mt-20 container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Activities</h1>
      
      {/* Button to toggle form visibility */}
      <button 
        onClick={() => setShowForm(!showForm)} 
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 mb-4"
      >
        {showForm ? 'Cancel' : 'Create Activity'}
      </button>

      {/* Event Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingEventId ? 'Edit Event' : 'Create Activity'}</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
            {editingEventId ? 'Update Event' : 'Create Activity'}
          </button>
        </form>
      )}

      {/* Event List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Description</th>
              <th className="border border-gray-200 p-2">Date</th>
              <th className="border border-gray-200 p-2">Time</th>
              <th className="border border-gray-200 p-2">Status</th>
              <th className="border border-gray-200 p-2">Actions </th>
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
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${event.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {event.status}
                  </span>
                </td>
                <td className="border border-gray-200 p-2">
                  <button onClick={() => handleEdit(event)} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition duration-200 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition duration-200">
                    Delete
                  </button>
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