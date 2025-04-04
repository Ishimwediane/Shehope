import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";  // Import axios
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarScheduler() {
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]); // Initialize as an empty array
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  // Refactor to use axios for fetching events
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found");
        return;
      }
  
      const response = await axios.get('https://shehope-server-1.onrender.com/api/admin/event', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Fetched events:', response.data);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error.response?.data || error.message);
    }
  };
  

  useEffect(() => {
    fetchEvents();  // Call the fetchEvents function to load the events
  }, [currentDate]);

  const handleNavigate = (action) => {
    const newDate = moment(currentDate);
    if (action === "prev") newDate.subtract(1, "month");
    if (action === "next") newDate.add(1, "month");
    if (action === "today") newDate.set({ year: new Date().getFullYear(), month: new Date().getMonth() });
    setCurrentDate(newDate.toDate());
  };

  const handleAddEvent = () => {
    axios
      .post("https://shehope-server-1.onrender.com/api/admin/event", newEvent, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEvents([...events, response.data]);
        setShowModal(false);
        setNewEvent({ title: "", start: "", end: "" });
      })
      .catch((error) => console.error("Error adding event:", error));
  };

  const filteredEvents = events.filter((event) =>
    moment(event.start).isSame(currentDate, "month")
  );
  console.log("Auth Token:", localStorage.getItem("authToken"));

  return (
    <div className="ml-64 mt-20 flex mb-20">
      {/* Sidebar for Events List */}
      <div className="w-64 p-4 bg-gray-100 min-h-screen border-r border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Events in {moment(currentDate).format("MMMM YYYY")}</h3>
        <ul>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <li key={index} className="mb-2 p-2 bg-blue-500 text-white rounded">
                {event.title} ({moment(event.start).format("MMM D")})
              </li>
            ))
          ) : (
            <p className="text-gray-500">No events this month.</p>
          )}
        </ul>
      </div>
      {/* Calendar Section */}
      <div className="flex-1 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button onClick={() => handleNavigate("prev")} className="px-4 py-2 bg-blue-500 text-white rounded">Prev</button>
            <button onClick={() => handleNavigate("next")} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
            <button onClick={() => handleNavigate("today")} className="px-4 py-2 bg-gray-300 text-gray-600 rounded">Today</button>
          </div>
          <h2 className="text-xl font-bold">{moment(currentDate).format("MMMM YYYY")}</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setView("month")}>Month</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setView("week")}>Week</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setView("day")}>Day</button>
          </div>
        </div>
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day"]}
          view={view}
          onView={setView}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          className="h-[600px] border border-gray-300 rounded-lg p-2"
        />
        <div className="mt-4 flex flex-col gap-2">
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-green-500 text-white rounded">+ Add New Event</button>
        </div>
      </div>
      {/* Modal for Adding New Event */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              className="border p-2 w-full mb-2"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
              type="datetime-local"
              className="border p-2 w-full mb-2"
              value={newEvent.start}
              onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            />
            <input
              type="datetime-local"
              className="border p-2 w-full mb-4"
              value={newEvent.end}
              onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              <button onClick={handleAddEvent} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
