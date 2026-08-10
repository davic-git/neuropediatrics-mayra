import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-400-italic.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import App from './App';
import { reactErrorHandlers } from './sentry';
import './styles/globals.css';
import { initializeAnalytics } from './utils/analytics';

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
