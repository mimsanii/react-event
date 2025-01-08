import React, { useState } from "react";

// Event Prices
const eventPrices = {
  "event1": 5000,
  "event2": 7500,
  "event3": 10000,
};

function TicketSelection({ eventRequiresRooms, onConfirmBooking }) {
  const [ticketType, setTicketType] = useState("individual");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState("event1");
  const [totalPrice, setTotalPrice] = useState(0);
  const [roomsNeeded, setRoomsNeeded] = useState(0);
  const [roomsAvailable, setRoomsAvailable] = useState(30); // Max 30 rooms
  const ticketPrice = eventPrices[selectedEvent];

  const handleTicketTypeChange = (event) => {
    const type = event.target.value;
    setTicketType(type);
    if (type === "group") {
      setNumberOfPeople(1); // Reset the people count when switching to group
    } else {
      setNumberOfPeople(1);
    }
  };

  const handleEventChange = (event) => {
    const eventName = event.target.value;
    setSelectedEvent(eventName);
  };

  const handlePeopleCountChange = (event) => {
    const peopleCount = parseInt(event.target.value);
    setNumberOfPeople(peopleCount);
    if (ticketType === "group") {
      const rooms = Math.ceil(peopleCount / 5); // Rooms needed for groups
      setRoomsNeeded(rooms);
      setTotalPrice(rooms * ticketPrice);
    }
  };

  const handleBooking = () => {
    if (ticketType === "individual") {
      setRoomsNeeded(1);
      setTotalPrice(ticketPrice * numberOfPeople);
    }
    if (roomsNeeded > roomsAvailable) {
      alert("Not enough rooms available!");
    } else {
      alert(`You have successfully booked ${roomsNeeded} room(s)! Total: $${totalPrice}`);
      setRoomsAvailable(roomsAvailable - roomsNeeded);
      onConfirmBooking({ roomsNeeded, totalPrice, numberOfPeople });
    }
  };

  return (
    <div className="ticket-selection">
      <h3>Select Event</h3>
      <select value={selectedEvent} onChange={handleEventChange}>
        <option value="event1">Event 1</option>
        <option value="event2">Event 2</option>
        <option value="event3">Event 3</option>
      </select>

      <h3>Select Ticket Type</h3>
      <label>
        Individual Ticket:
        <input
          type="radio"
          name="ticketType"
          value="individual"
          checked={ticketType === "individual"}
          onChange={handleTicketTypeChange}
        />
      </label>
      <label>
        Group Ticket:
        <input
          type="radio"
          name="ticketType"
          value="group"
          checked={ticketType === "group"}
          onChange={handleTicketTypeChange}
        />
      </label>

      {ticketType === "group" && (
        <div>
          <label>
            Number of People:
            <input
              type="number"
              value={numberOfPeople}
              min="1"
              max="25"
              onChange={handlePeopleCountChange}
            />
          </label>
          <p>Rooms Needed: {roomsNeeded}</p>
        </div>
      )}

      {ticketType === "individual" && (
        <div>
          <label>
            Number of Tickets:
            <input
              type="number"
              value={numberOfPeople}
              min="1"
              onChange={handlePeopleCountChange}
            />
          </label>
          <p>Rooms Needed: {numberOfPeople}</p>
        </div>
      )}

      <p>Total Price: ${totalPrice}</p>

      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
}

export default TicketSelection;
