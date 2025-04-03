// src/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to the Cleanup Game</h1>
      <p>Track cleanup efforts and make it fun!</p>
      <Link className="button" to="/cleanup">Start Game</Link>
    </div>
  );
}
