import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EventListing.css";

// Dummy data for categories and trending events
const categories = [
  { name: "Social App", icon: "/icons/photography.png" },
  { name: "Music", icon: "/icons/music.png" },
  { name: "Sports", icon: "/icons/sports.png" },
  { name: "Church Events", icon: "/icons/church events.png" },
  { name: "Merchandise", icon: "/icons/merchandise.png" },
  { name: "Investments", icon: "/icons/business.png" },
];

const trendingEvents = [
  {
    id: 4,
    name: "TOP TRENDING EVENT 2",
    date: "2025-11-15",
    location: "Nairobi",
    image: "/images/trending2.jpg",
  },
  {
    id: 5,
    name: "TOP TRENDING EVENT 3",
    date: "2025-11-20",
    location: "Nairobi",
    image: "/images/trending3.jpg",
  },
];

const dummyEvents = [
  {
    id: 1,
    name: "THE FEARLESS MOVEMENT CAMP",
    date: "2025-08-14",
    location: "CLARENCE MATTHENY BIBLE TRAINING INSTITUTE",
    description:
      "Young, Saved and Unashamed in Christ. Join us as we invite our generation to be loud and bold. A new wave of Christian joy and FEARLESS greatness.",
    image: "/images/bbb.jpg",
    requiresRoom: true,
  },
  {
    id: 2,
    name: "UNITED ADORATION",
    date: "2025-10-15",
    location: "NAIROBI",
    description: "3 Days of praise to the king",
    image: "/images/eeee.jpg",
  },
  {
    id: 3,
    name: "TOP T 1",
    date: "2025-11-10",
    location: "Nairobi",
    image: "/images/suuu.jpg",
  },
];

function EventListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(dummyEvents);
  const navigate = useNavigate();

  // Debounce the search term input
  useEffect(() => {
    const timer = setTimeout(() => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filteredData = dummyEvents.filter((event) => {
        // Safely check for undefined or null values before calling toLowerCase
        const nameMatches =
          event.name && event.name.toLowerCase().includes(lowercasedSearchTerm);
        const descriptionMatches =
          event.description &&
          event.description.toLowerCase().includes(lowercasedSearchTerm);

        return nameMatches || descriptionMatches;
      });
      setFilteredEvents(filteredData);
    }, 300); // Adjust timeout duration if necessary
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const isEventExpired = (eventDate) => {
    const currentDate = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj < currentDate;
  };

  return (
    <div className="event-listing">
      <input
        type="text"
        placeholder="Search Events..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="event-grid">
        {filteredEvents.map((event) => {
          const eventExpired = isEventExpired(event.date);

          return (
            <div key={event.id} className="event-card">
              <img
                src={event.image}
                alt={event.name}
                onError={(e) => {
                  console.error(`Image failed to load: ${event.image}`);
                  e.target.src = "/images/fallback.jpg";
                  e.target.alt = "Fallback image";
                }}
              />
              <div className="event-details">
                <h2>{event.name}</h2>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>{event.description}</p>

                {eventExpired && (
                  <p className="expired-message">Event has expired</p>
                )}

                {!eventExpired && event.requiresRoom && (
                  <button
                    onClick={() => navigate(`/event/${event.id}`, { state: event })}
                    className="view-room-booking-button"
                  >
                    Book a Room
                  </button>
                )}

                <button
                  onClick={() => navigate(`/event/${event.id}`, { state: { event } })}
                  className="view-details-button"
                  disabled={eventExpired}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explore by Category Section */}
      <div className="category-section">
        <h3>Explore by Category</h3>
        <div className="category-icons">
          {categories.map((cat, index) => (
            <div className="category-icon" key={index}>
              <img src={cat.icon} alt={cat.name} />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        <div className="event-posters">
          {dummyEvents.slice(0, 3).map((event) => (
            <img key={event.id} src={event.image} alt={event.name} className="upcoming-poster" />
          ))}
        </div>
      </div>

      {/* Top 3 Trending Events Section */}
      <div className="trending-events">
        <h3>Top 3 Trending Events</h3>
        <div className="event-posters">
          {trendingEvents.map((event) => (
            <div key={event.id} className="trending-event-card">
              <img src={event.image} alt={event.name} />
              <h4>{event.name}</h4>
              <p>{event.date} | {event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventListing;
