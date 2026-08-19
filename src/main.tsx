import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { reactErrorHandlers } from './sentry';
import './styles/globals.css';
import { initializeAnalytics } from './utils/analytics';
import { initializeSpeedInsights } from './utils/speed-insights';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app, reactErrorHandlers);
} else {
  createRoot(rootElement, reactErrorHandlers).render(app);
}

initializeAnalytics();
initializeSpeedInsights();
