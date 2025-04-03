import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  { title: "All Day Event", start: new Date(2025, 2, 12), end: new Date(2025, 2, 12), color: "bg-blue-500" },
  { title: "Long Event", start: new Date(2025, 2, 14), end: new Date(2025, 2, 17), color: "bg-purple-500" },
  { title: "Repeating Event", start: new Date(2025, 2, 18), end: new Date(2025, 2, 18), color: "bg-green-500" },
  { title: "Meeting", start: new Date(2025, 2, 24), end: new Date(2025, 2, 24), color: "bg-yellow-500" },
  { title: "Birthday Party", start: new Date(2025, 2, 25), end: new Date(2025, 2, 25), color: "bg-red-500" },
];

const CustomEvent = ({ event }) => (
  <div className={`p-1 text-white rounded ${event.color}`}>{event.title}</div>
);

export default function CalendaryScheduler() {
  const [view, setView] = useState("month");

  return (
    <div className="ml-64 mt-20 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Prev</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
          <button className="px-4 py-2 bg-gray-300 text-gray-600 rounded" disabled>Today</button>
        </div>
        <h2 className="text-xl font-bold">March 2025</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setView("month")}>Month</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setView("week")}>Week</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setView("day")}>Day</button>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        view={view}
        onView={setView}
        components={{ event: CustomEvent }}
        className="h-[600px] border border-gray-300 rounded-lg p-2"
      />
      <div className="mt-4 flex flex-col gap-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded">+ Add New Event</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">Create New</button>
      </div>
    </div>
  );
}
