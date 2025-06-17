import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element with ID "root" was not found in the document.');
}
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);