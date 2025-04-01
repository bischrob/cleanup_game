// cleanup_game_tracker.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./main.css";

const getCurrentWeek = () => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay()); // Sunday
  start.setHours(0, 0, 0, 0);
  return start.toISOString().split("T")[0];
};

export default function CleanupGameTracker() {
  const [parentScore, setParentScore] = useState(0);
  const [kidScore, setKidScore] = useState(0);
  const [weekStart, setWeekStart] = useState(getCurrentWeek());
  const [sadEffect, setSadEffect] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8002/scores")
      .then((res) => res.json())
      .then((data) => {
        if (data.weekStart === getCurrentWeek()) {
          setParentScore(data.parentScore || 0);
          setKidScore(data.kidScore || 0);
          setWeekStart(data.weekStart);
        } else {
          resetScores();
        }
        setLoaded(true);
      })
      .catch((err) => console.error("Failed to fetch scores:", err));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const data = {
      parentScore,
      kidScore,
      weekStart,
    };
    fetch("http://localhost:8002/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch((err) => console.error("Failed to save scores:", err));
  }, [parentScore, kidScore, weekStart, loaded]);

  const triggerSadEffect = (type) => {
    setSadEffect(type);
    setTimeout(() => setSadEffect(null), 1500);
  };

  const resetScores = () => {
    setParentScore(0);
    setKidScore(0);
    const currentWeek = getCurrentWeek();
    setWeekStart(currentWeek);
  };

  return (
    <div className="game-container">
      <h1 className="title">Cleanup Game</h1>
      <p className="week">Week of: {weekStart}</p>

      <AnimatePresence>
        {sadEffect && (
          <motion.div
            className="sad-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="sad-face"
              initial={{ y: -50, scale: 0 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              😢
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="columns">
        <div className="card parent-card">
          <h2 className="label">Parents</h2>
          <motion.div layout className="score-box">
            {parentScore}
          </motion.div>
          <button
            className="score-button blue"
            onClick={() => {
              setParentScore(parentScore + 1);
              triggerSadEffect("parent");
            }}
          >
            Kids Left Something Out!
          </button>
        </div>

        <div className="card kid-card">
          <h2 className="label">Kids</h2>
          <motion.div layout className="score-box">
            {kidScore}
          </motion.div>
          <button
            className="score-button green"
            onClick={() => {
              setKidScore(kidScore + 1);
              triggerSadEffect("kid");
            }}
          >
            Parents Left Something Out!
          </button>
        </div>
      </div>

      <button onClick={resetScores} className="reset-button">
        Reset for New Week
      </button>
    </div>
  );
}
