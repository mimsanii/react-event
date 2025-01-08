import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

function CreateEvent({ onCreateEvent }) {
  const navigate = useNavigate();

  // State hooks for form fields
  const [coverImage, setCoverImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [album, setAlbum] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [ticketType, setTicketType] = useState("Free");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [ticketPrice, setTicketPrice] = useState(2000);
  const [salesStart, setSalesStart] = useState("");
  const [salesEnd, setSalesEnd] = useState("");
  const [promotionsEnabled, setPromotionsEnabled] = useState(false);

  // Dynamically calculate ticket price for paid events
  const handleTicketQuantityChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    setTicketQuantity(quantity);
    setTicketPrice(quantity * 2000); // Example: KSh 2000 per ticket
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      coverImage,
      name: eventName,
      description: eventDescription,
      category: eventCategory,
      album,
      address,
      city,
      region,
      country,
      timezone,
      date: eventDate,
      startTime,
      endTime,
      ticketType,
      ticketQuantity,
      ticketPrice,
      salesStart,
      salesEnd,
      promotionsEnabled,
    };

    if (onCreateEvent) {
      onCreateEvent(newEvent); // Pass the data to the parent component
      alert("Event created successfully!");
    }
    navigate("/"); // Redirect to event listing
  };

  const handleSaveDraft = () => {
    // Save draft logic
    alert("Event draft saved!");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleNextPage = () => {
    const eventData = {
      coverImage,
      name: eventName,
      description: eventDescription,
      category: eventCategory,
      album,
      address,
      city,
      region,
      country,
      timezone,
      date: eventDate,
      startTime,
      endTime,
      ticketType,
      ticketQuantity,
      ticketPrice,
      salesStart,
      salesEnd,
      promotionsEnabled,
    };
    navigate("/review-event", { state: eventData }); // Pass data to the review page
  };

  return (
    <div className="create-event-page">
      <h1>Create Event</h1>
      <form className="create-event-form" onSubmit={handleSubmit}>
        {/* Upload Cover Section */}
        <div className="form-section">
          <label>Upload Cover Image:</label>
          <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />
        </div>

        {/* General Information Section */}
        <div className="form-section">
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
          />
          <label>Description:</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Enter event description"
          />
          <label>Category:</label>
          <input
            type="text"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            placeholder="Enter event category"
          />
          <label>Upload Album/Images:</label>
          <input type="file" multiple onChange={(e) => setAlbum(e.target.files)} />
        </div>

        {/* Location Section */}
        <div className="form-section">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <label>Region:</label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Enter region"
          />
          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
          />
        </div>

        {/* Time Section */}
        <div className="form-section">
          <label>Time Zone:</label>
          <input
            type="text"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            placeholder="Enter time zone"
          />
          <label>Event Date:</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* Ticket Section */}
        <div className="form-section">
          <label>Ticket Type:</label>
          <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
          {ticketType === "Paid" && (
            <>
              <label>Ticket Quantity:</label>
              <input
                type="number"
                min="1"
                max="6"
                value={ticketQuantity}
                onChange={handleTicketQuantityChange}
              />
              <label>Ticket Price (KSh):</label>
              <input type="number" value={ticketPrice} readOnly />
            </>
          )}
        </div>

        {/* Sales Date Section */}
        <div className="form-section">
          <label>Sales Start Date:</label>
          <input
            type="datetime-local"
            value={salesStart}
            onChange={(e) => setSalesStart(e.target.value)}
          />
          <label>Sales End Date:</label>
          <input
            type="datetime-local"
            value={salesEnd}
            onChange={(e) => setSalesEnd(e.target.value)}
          />
          <label>Enable Promotions:</label>
          <input
            type="checkbox"
            checked={promotionsEnabled}
            onChange={(e) => setPromotionsEnabled(e.target.checked)}
          />
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="save-draft-btn" onClick={handleSaveDraft}>
            Save Draft
          </button>
          <button type="button" className="next-page-btn" onClick={handleNextPage}>
            Next Page
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;