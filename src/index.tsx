import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
// Import custom styles after Bootstrap
import './styles/App.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
