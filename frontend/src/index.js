import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App';
import { SportProvider } from './SportContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <SportProvider>
     <App/>
   </SportProvider>
   </BrowserRouter>
  </React.StrictMode>
);
