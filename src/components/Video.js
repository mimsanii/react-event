import React, { useState, useEffect } from "react";
import "./Video.css";

function Video() {
  // List of video file paths (update with your actual file paths)
  const videoFiles = [
    "/videos/The Fearless Camp 2023_1080p.mp4",
    "/videos/promo2.mp4",
    "/videos/promo3.mp4",
    "/videos/promo4.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    // Function to handle the video ending and switch to the next video
    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoFiles.length);
    };

    // Access the video element
    const videoElement = document.querySelector(".video-element");
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    // Cleanup listener when component unmounts
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [currentVideoIndex, videoFiles.length]);

  return (
    <div className="video-container">
      <video
        className="video-element"
        src={videoFiles[currentVideoIndex]}
        autoPlay
        muted
      ></video>
    </div>
  );
}

export default Video;
