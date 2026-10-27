import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import CleanupGameTracker from './cleanup_game_tracker.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cleanup" element={<CleanupGameTracker />} />
    </Routes>
  </BrowserRouter>,
);
