import React, { useState } from "react";
import Ticketselection from "./Ticketselection";
import Payment from "./Payment";
import "./BookingForm.css";
function BookingPage() {
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleBookingConfirm = ({ roomsNeeded, totalPrice, numberOfPeople }) => {
    setBookingDetails({ roomsNeeded, totalPrice, numberOfPeople });
  };

  const handlePaymentComplete = (paymentInfo) => {
    console.log("Payment complete: ", paymentInfo);
  };

  return (
    <div className="booking-page">
      <TicketSelection onConfirmBooking={handleBookingConfirm} />
      {bookingDetails && <Payment bookingDetails={bookingDetails} onPaymentComplete={handlePaymentComplete} />}
    </div>
  );
}

export default BookingPage;
