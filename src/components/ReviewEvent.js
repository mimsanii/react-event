import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReviewEvent.css";

const ReviewEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventDetails = location.state?.eventDetails || {};
  const [publishingOption, setPublishingOption] = useState("Public");
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const handleEdit = () => {
    navigate("/create-event", { state: { eventDetails } });
  };

  const handleSaveDraft = () => {
    console.log("Draft saved:", eventDetails);
    alert("Event saved as draft!");
  };

  const handlePublish = () => {
    console.log(`Event published as ${publishingOption}:`, eventDetails);
    alert(`Event published as ${publishingOption}!`);
    navigate("/dashboard");
  };

  const handlePreview = () => {
    alert("Previewing event...");
    // Additional preview logic can be added here
  };

  return (
    <div className="review-event">
      <h1 className="title">Review & Finalize Your Event</h1>

      {/* Event Information Review */}
      <div className="event-summary">
        <h2>Event Summary</h2>
        <p><strong>Title:</strong> {eventDetails.title || "No Title Provided"}</p>
        <p><strong>Date:</strong> {eventDetails.date || "No Date Provided"}</p>
        <p><strong>Location:</strong> {eventDetails.location || "No Location Provided"}</p>
        <p><strong>Description:</strong> {eventDetails.description || "No Description Provided"}</p>
      </div>

      {/* Drafted Events Section */}
      <div className="drafted-events">
        <h2>Drafted Events</h2>
        <p>Manage your unfinished events here.</p>
        <ul>
          <li>Event 1 - Draft</li>
          <li>Event 2 - Draft</li>
          <li>Event 3 - Draft</li>
        </ul>
      </div>

      {/* Event Preview */}
      <div className="event-preview">
        <h2>Event Preview</h2>
        <button onClick={handlePreview} className="preview-btn">Preview Event</button>
        <div className="preview-box">
          <h3>{eventDetails.title || "Event Title"}</h3>
          <p>{eventDetails.description || "Event Description"}</p>
          <p><strong>Date:</strong> {eventDetails.date || "Event Date"}</p>
          <p><strong>Location:</strong> {eventDetails.location || "Event Location"}</p>
        </div>
      </div>

      {/* Publishing Options */}
      <div className="publishing-options">
        <h2>Publishing Options</h2>
        <select
          value={publishingOption}
          onChange={(e) => setPublishingOption(e.target.value)}
          className="publishing-select"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Scheduled">Scheduled</option>
        </select>
        {publishingOption === "Scheduled" && (
          <div className="schedule-options">
            <label>
              Release Date: <input type="date" />
            </label>
            <label>
              Release Time: <input type="time" />
            </label>
          </div>
        )}
      </div>

      {/* Advanced Settings */}
      <div className="advanced-settings">
        <button
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
          className="advanced-settings-btn"
        >
          {showAdvancedSettings ? "Hide Advanced Settings" : "Show Advanced Settings"}
        </button>
        {showAdvancedSettings && (
          <div className="advanced-settings-content">
            <p>Additional settings can go here.</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={handleSaveDraft} className="save-draft-btn">Save Draft</button>
        <button onClick={handleEdit} className="edit-btn">Edit</button>
        <button onClick={handlePublish} className="publish-btn">Publish</button>
      </div>
    </div>
  );
};

export default ReviewEvent;
