import React, { useState } from 'react';
import axios from 'axios';

const EventModal = ({ userId, selectedDate, onClose, onEventCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(selectedDate); // Default to selected date

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      date, // Send the selected date with event data
      userId, // Associate event with userId
    };

    try {
      const response = await axios.post('/api/events', eventData);
      console.log('Event created:', response.data);
      onEventCreated(); // Notify parent component that the event was created
      onClose(); // Close the modal after event creation
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="modal mt-100 mt-10">
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Create Event</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default EventModal;
