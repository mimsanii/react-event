import React, { useState } from "react";
import "./Payment.css";

function Payment({ bookingDetails, onPaymentComplete }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handlePayment = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (!paymentDetails) {
      setError("Please enter payment details.");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      const paymentInfo = { ...bookingDetails, paymentMethod, paymentDetails };
      onPaymentComplete(paymentInfo);
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>

      {error && <p className="error-message">{error}</p>}
      {paymentSuccess && <p className="success-message">Payment Successful! Your booking is confirmed.</p>}
      {paymentSuccess === false && <p className="error-message">Payment Failed. Please try again.</p>}

      <form onSubmit={handlePayment}>
        <div>
          <label>Amount to Pay: </label>
          <p>Ksh {bookingDetails.totalPrice}</p>
        </div>

        <label>Select Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="MPesa">MPesa</option>
          <option value="Visa">Visa</option>
        </select>

        {paymentMethod === "MPesa" && (
          <div>
            <label>Enter Your MPesa Number:</label>
            <input
              type="tel"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              placeholder="e.g., 0712345678"
              required
            />
          </div>
        )}

        {paymentMethod === "Visa" && (
          <div>
            <label>Enter Your Visa Card Number:</label>
            <input
              type="text"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              placeholder="e.g., 4111 1111 1111 1111"
              required
            />
          </div>
        )}

        <button type="submit" className="pay-btn" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default Payment;
