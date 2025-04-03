// src/main.jsx
import React from 'react';
import { ViteSSG } from 'vite-ssg';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// Export for vite-ssg
export const createApp = ViteSSG(
  () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
  // Static routes to prerender
  {
    routes: [
      { path: '/', component: () => import('./HomePage.jsx') },
      { path: '/cleanup', component: () => import('./cleanup_game_tracker.jsx') },
    ],
  }
);
