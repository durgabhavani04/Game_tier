import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Background from './components/background'; // adjust the path if needed
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Background />
  </React.StrictMode>
);

// Optional performance monitoring
reportWebVitals();
