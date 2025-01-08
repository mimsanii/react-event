// src/components/Testimonial.js
import React from "react";
import "./Testimonials.css";

function Testimonial({ testimonials }) {
  if (!testimonials || testimonials.length === 0) {
    return <p>No testimonials available.</p>;
  }

  return (
    <div className="testimonial-container">
      <h2>What People Are Saying</h2>
      {testimonials.map((testimonial, index) => (
        <div className="testimonial" key={index}>
          <p>"{testimonial.message}"</p>
          <h4>- {testimonial.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default Testimonial;
