import React, { useState } from "react";
import "./room.css"; // Ensure this path is correct
import"./BookingForm";
function Room({ roomPrice, totalRooms, onBook, eventRequiresRooms }) {
  const [isBooked, setIsBooked] = useState(Array(totalRooms).fill(false)); // Track availability for all rooms
  const [roomsNeeded, setRoomsNeeded] = useState(0); // Number of rooms the user needs to book
  const [peopleCount, setPeopleCount] = useState(0); // Number of people in the group

  const handlePeopleCountChange = (e) => {
    const people = parseInt(e.target.value);
    setPeopleCount(people);

    // Calculate how many rooms are needed based on the number of people
    const roomsRequired = Math.ceil(people / 5); // Each room accommodates up to 5 people
    setRoomsNeeded(roomsRequired);
  };

  const handleBookRoom = () => {
    if (!eventRequiresRooms) {
      alert("This event does not require room booking.");
      return;
    }

    if (roomsNeeded <= 0) {
      alert("Please specify the number of people first.");
      return;
    }

    let roomsToBook = 0;
    const updatedBookings = [...isBooked];

    for (let i = 0; i < totalRooms && roomsToBook < roomsNeeded; i++) {
      if (!updatedBookings[i]) {
        updatedBookings[i] = true;
        roomsToBook++;
      }
    }

    if (roomsToBook === roomsNeeded) {
      setIsBooked(updatedBookings);
      alert(`You have successfully booked ${roomsNeeded} rooms!`);
      onBook(roomsNeeded); // Pass the number of rooms booked to the parent
    } else {
      alert("Not enough rooms available.");
    }
  };

  return (
    <div className="room-card">
      <h3>Event Room Booking</h3>
      {eventRequiresRooms && (
        <>
          <div>
            <label>Enter number of people in your group:</label>
            <input
              type="number"
              min="1"
              value={peopleCount}
              onChange={handlePeopleCountChange}
              placeholder="Number of people"
            />
          </div>
          <p>Rooms needed: {roomsNeeded}</p>
        </>
      )}
      <p>Ticket Price: ${roomPrice}</p>
      <button
        onClick={handleBookRoom}
        className="book-room-btn"
        disabled={roomsNeeded === 0 || !eventRequiresRooms}
      >
        {eventRequiresRooms ? "Book Now" : "No Room Booking Required"}
      </button>
    </div>
  );
}

export default Room;
