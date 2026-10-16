import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PinLock from './components/PinLock.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Layout from './components/Layout.jsx';
import PlayTime from './pages/PlayTime.jsx';

const SESSION_KEY = 'xplay_unlocked';
const ACTOR_KEY = 'xplay_actor';
const TTL_MS = Number(import.meta.env.VITE_XPLAY_SESSION_TTL_MS || 900000);

function isSessionValid() {
  return Number(sessionStorage.getItem(SESSION_KEY) || 0) > Date.now();
}

export default function App() {
  const [unlocked, setUnlocked] = useState(() => isSessionValid());

  useEffect(() => {
    if (!unlocked) return;
    const tick = setInterval(() => {
      if (!isSessionValid()) {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(ACTOR_KEY);
        setUnlocked(false);
      }
    }, 30000);
    return () => clearInterval(tick);
  }, [unlocked]);

  useEffect(() => {
    if (!unlocked) return;
    let last = 0;
    const extend = () => {
      const now = Date.now();
      if (now - last < 30000) return;
      last = now;
      sessionStorage.setItem(SESSION_KEY, String(now + TTL_MS));
    };
    window.addEventListener('click', extend);
    window.addEventListener('keydown', extend);
    return () => { window.removeEventListener('click', extend); window.removeEventListener('keydown', extend); };
  }, [unlocked]);

  if (!unlocked) {
    return <PinLock onUnlock={() => { sessionStorage.setItem(SESSION_KEY, String(Date.now() + TTL_MS)); setUnlocked(true); }} />;
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<PlayTime />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}
