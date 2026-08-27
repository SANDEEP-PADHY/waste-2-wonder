import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MarketplaceProvider } from './context/MarketplaceContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MarketplaceProvider>
      <App />
    </MarketplaceProvider>
  </React.StrictMode>,
);
