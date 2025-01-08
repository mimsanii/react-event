import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';


// Optional: If you want to measure web vitals for performance, keep the import.
// Otherwise, you can remove it.
import reportWebVitals from './reportWebVitals';

// Creating the root element for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the main application wrapped inside React.StrictMode for development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: If you want to measure the app's performance, you can log it or send it to an analytics tool
// If you don't need this, you can simply remove the line below.
// reportWebVitals(console.log);
