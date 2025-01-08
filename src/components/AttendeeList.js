// src/components/AttendeeList.js
import React from "react";
import "./AttendeeList.css";

function AttendeeList({ attendees }) {
  if (!attendees || attendees.length === 0) {
    return <p>No attendees registered yet.</p>;
  }

  return (
    <div className="attendee-list-container">
      <h2>Attendee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Ticket Type</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee, index) => (
            <tr key={index}>
              <td>{attendee.name}</td>
              <td>{attendee.email}</td>
              <td>{attendee.phone}</td>
              <td>{attendee.ticketType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendeeList;
