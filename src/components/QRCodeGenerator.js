import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./QRCodeGenerator.css";

function QRCodeGenerator({ bookingDetails }) {
  const { name, bookingID, event, paymentMethod } = bookingDetails;
  const [downloadStatus, setDownloadStatus] = useState("");

  // Handle download of the QR code as SVG file
  const handleDownload = () => {
    try {
      const svgElement = document.getElementById("qrcode");
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `Ticket_${bookingID}.svg`;
        downloadLink.click();
        setDownloadStatus("Your ticket is being downloaded!");
      } else {
        setDownloadStatus("Failed to download ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error downloading QR code:", error);
      setDownloadStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="qrcode-container">
      <h2>Event Ticket</h2>
      <div className="ticket-info">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Booking ID:</strong> {bookingID}</p>
        <p><strong>Event:</strong> {event}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
      </div>
      <p>Scan this QR code at the event:</p>
      <QRCodeSVG id="qrcode" value={JSON.stringify(bookingDetails)} size={200} />
      <button className="download-btn" onClick={handleDownload}>Download Ticket</button>
      {downloadStatus && <p className="download-status">{downloadStatus}</p>}
    </div>
  );
}

export default QRCodeGenerator;
