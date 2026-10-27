import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./main.css";

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Score service returned ${response.status}`);
  return response.json();
}

export default function CleanupGameTracker() {
  const [parentScore, setParentScore] = useState(0);
  const [kidScore, setKidScore] = useState(0);
  const [weekStart, setWeekStart] = useState('Loading…');
  const [sadEffect, setSadEffect] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');

  const loadScores = async () => {
    const [week, parents, children] = await Promise.all([
      fetchJson('/api/week'),
      fetchJson('/api/scores?team=parent'),
      fetchJson('/api/scores?team=children'),
    ]);
    setWeekStart(week.week);
    setParentScore(parents.total_points);
    setKidScore(children.total_points);
  };

  useEffect(() => {
    loadScores()
      .catch(() => setError('Unable to load scores. Please reload to try again.'))
      .finally(() => setBusy(false));
  }, []);

  const recordScores = async (changes, effect) => {
    setBusy(true);
    setError('');
    try {
      for (const [team, point] of changes) {
        if (point !== 0) {
          await fetchJson('/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ team, point }),
          });
        }
      }
      if (effect) {
        setSadEffect(effect);
        setTimeout(() => setSadEffect(null), 1500);
      }
    } catch {
      setError('Unable to save all changes. Check the scores before trying again.');
    } finally {
      try {
        await loadScores();
      } catch {
        setError('Unable to refresh scores. Please reload before trying again.');
      }
      setBusy(false);
    }
  };

  const resetScores = () => recordScores([
    ['parent', -parentScore],
    ['children', -kidScore],
  ]);

  return (
    <>
      <title>Cleanup Game</title>
      <meta name="theme-color" content="#1e3a8a" />
      <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />
      <link rel="icon" href={`${import.meta.env.BASE_URL}icons/cleanup_game.png`} sizes="192x192" />
      <link rel="apple-touch-icon" href={`${import.meta.env.BASE_URL}icons/cleanup_game2.png`} />

      <div className="game-container">
        <h1 className="title">Cleanup Game</h1>
        <p className="week">{weekStart}</p>
        {error && <p role="alert">{error}</p>}

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
              disabled={busy || Boolean(error)}
              onClick={() => recordScores([['parent', 1]], 'parent')}
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
              disabled={busy || Boolean(error)}
              onClick={() => recordScores([['children', 1]], 'kid')}
            >
              Parents Left Something Out!
            </button>
          </div>
        </div>

        <button disabled={busy || Boolean(error)} onClick={resetScores} className="reset-button">
          Reset for New Week
        </button>
      </div>
    </>
  );
}
