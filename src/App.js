// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Header from "./components/Header";
import EventListing from "./components/EventListing";
import EventDetails from "./components/EventDetails";
import room from"./components/room";
import BookingForm from "./components/BookingForm";
import Payment from "./components/Payment";
import QRCodeGenerator from "./components/QRCodeGenerator";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonials";
import AttendeeList from "./components/AttendeeList";
import CreateEvent from "./components/CreateEvent";
import ReviewEvent from "./components/ReviewEvent";
import "./App.css";

// ErrorBoundary Component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error("Error caught by ErrorBoundary:", error);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  return hasError ? (
    <div style={{ textAlign: "center", color: "red" }}>
      <h1>Something went wrong!</h1>
      <p>Please refresh the page or contact support if the issue persists.</p>
    </div>
  ) : (
    children
  );
};

function App() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [testimonials, setTestimonials] = useState([
    { name: "Billy", message: "Great event experience!" },
    { name: "Baraka", message: "Loved the smooth booking process." },
    { name: "Micky", message: "Loved the app, I'd give it 5 stars!" },
  ]);
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]); // Events data

  // Booking form submission handler
  const handleBookingSubmit = (details) => {
    setBookingDetails(details);
    console.log("Booking state updated:", details);
  };

  // Payment completion handler
  const handlePaymentComplete = (paymentInfo) => {
    setPaymentDetails(paymentInfo);
    console.log("Payment complete:", paymentInfo);
  };

  // Event creation handler
  const handleCreateEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    console.log("Event created:", newEvent);
  };

  // Fetch specific event details
  const fetchEventDetails = (id) => {
    const event = {
      id,
      name: `Event ${id}`,
      date: new Date().toDateString(),
      location: "Event Location",
      description: "Detailed event description goes here.",
      image: "/path/to/event-image.jpg",
    };
    return event;
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<EventListing events={events} />} />
            <Route
              path="/event/:id"
              element={<EventDetailsWrapper fetchEventDetails={fetchEventDetails} />}
            />
            <Route
              path="/booking"
              element={<BookingForm onSubmit={handleBookingSubmit} />}
            />
            <Route
              path="/payment"
              element={
                <Payment
                  bookingDetails={bookingDetails}
                  onPaymentComplete={handlePaymentComplete}
                />
              }
            />
            <Route
              path="/qr-code"
              element={<QRCodeGenerator bookingDetails={bookingDetails} />}
            />
            <Route
              path="/testimonials"
              element={<Testimonial testimonials={testimonials} />}
            />
            <Route
              path="/attendee-list"
              element={<AttendeeList attendees={attendees} />}
            />
            <Route
              path="/create-event"
              element={<CreateEvent onCreateEvent={handleCreateEvent} />}
            />
            <Route path="/review-event" element={<ReviewEvent />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

// Wrapper Component for Event Details with Dynamic Fetching
const EventDetailsWrapper = ({ fetchEventDetails }) => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const event = fetchEventDetails(id);
    setEventData(event);
  }, [id, fetchEventDetails]);

  if (!eventData) {
    return <div>Loading event details...</div>;
  }

  return <EventDetails {...eventData} />;
};

export default App;
