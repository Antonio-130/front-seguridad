import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UsuarioState from 'context/UsuarioState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsuarioState>
      <App />
    </UsuarioState>
  </React.StrictMode>
);

reportWebVitals();
