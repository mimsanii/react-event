import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./room";  // Import Room component
import "./EventDetails.css";

const EventDetails = ({ name, date, eventLocation, description, image }) => {
  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);
  const [roomsAvailable, setRoomsAvailable] = useState(10);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("MPesa");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  const eventImages = [
    "path/to/event-image1.jpg",
    "path/to/event-image2.jpg",
    "path/to/event-image3.jpg"
  ];

  const sponsors = [
    { name: "Sponsor 1", logo: "path/to/sponsor-logo1.png" },
    { name: "Sponsor 2", logo: "path/to/sponsor-logo2.png" },
    { name: "Sponsor 3", logo: "path/to/sponsor-logo3.png" }
  ];

  // Ensure the event date is parsed correctly and consider time as well
  const eventDate = date ? new Date(date + "T23:59:59") : null;  // Set to the end of the event date
  const currentDate = new Date();

  // Check if event is expired
  const isEventExpired = eventDate && !isNaN(eventDate.getTime()) ? currentDate > eventDate : false;

  useEffect(() => {
    // Preload images
    eventImages.forEach(image => {
      const img = new Image();
      img.src = image;
    });
  }, [eventImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsorIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRoomBooking = () => {
    if (roomsAvailable > 0) {
      setRoomsAvailable(roomsAvailable - 1);
      setBookingDetails({
        name: userName,
        email: userEmail,
        room: roomType,
        paymentMethod: paymentMethod
      });
      alert(`Room booked successfully! You selected the ${roomType} room.`);
      setIsBookingFormVisible(false);  // Hide booking form after booking
    } else {
      alert("Sorry, no rooms available!");
    }
  };

  const handleBookingFormSubmit = (e) => {
    e.preventDefault();
    handleRoomBooking();
  };

  return (
    <div className="event-details-container">
      <div className="event-header">
        <img src={image || eventImages[0]} alt={name} className="event-img" />
        <div className="event-info">
          <h2>{name}</h2>
          <p><strong>Location:</strong> {eventLocation}</p>
          <p><strong>Date:</strong> {eventDate ? eventDate.toLocaleDateString() : "N/A"}</p>
          <p><strong>Description:</strong> {description}</p>
        </div>
      </div>

      <div className="ticket-options">
        <p>{isEventExpired ? "This event has ended" : "Book your room now!"}</p>
        {!isEventExpired && (
          <>
            {!isBookingFormVisible && roomsAvailable > 0 && (
              <div className="rooms-list">
                <button onClick={() => { setRoomType("Single"); setIsBookingFormVisible(true); }}>
                  Book Single Room - 3000 KES
                </button>
                <button onClick={() => { setRoomType("Double"); setIsBookingFormVisible(true); }}>
                  Book Double Room - 4000 KES
                </button>
                <button onClick={() => { setRoomType("Suite"); setIsBookingFormVisible(true); }}>
                  Book Suite - 5000 KES
                </button>
              </div>
            )}

            {isBookingFormVisible && (
              <form onSubmit={handleBookingFormSubmit} className="booking-form">
                <h3>Book {roomType} Room</h3>
                <label>
                  Full Name:
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Payment Method:
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="MPesa">MPesa</option>
                    <option value="Visa">Visa</option>
                  </select>
                </label>
                <button type="submit">Confirm Booking</button>
              </form>
            )}
          </>
        )}
        {roomsAvailable === 0 && !isEventExpired && (
          <p>No rooms available for booking at the moment.</p>
        )}
      </div>

      {bookingDetails && (
        <div className="booking-summary">
          <h3>Booking Confirmation</h3>
          <p><strong>Name:</strong> {bookingDetails.name}</p>
          <p><strong>Email:</strong> {bookingDetails.email}</p>
          <p><strong>Room Type:</strong> {bookingDetails.room}</p>
          <p><strong>Payment Method:</strong> {bookingDetails.paymentMethod}</p>
        </div>
      )}

      <div className="sponsor-slideshow">
        <h3>Our Sponsors</h3>
        <div className="sponsor-logos">
          {sponsors.map((sponsor, index) => (
            <img
              key={index}
              src={sponsor.logo}
              alt={sponsor.name}
              className="sponsor-img"
              style={{
                opacity: index === currentSponsorIndex ? 1 : 0.6,
                transition: "opacity 0.5s ease-in-out"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
