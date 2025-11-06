import React, { useState } from 'react';
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const onLogin = (t) => { localStorage.setItem('token', t); setToken(t); };
  const onLogout = () => { localStorage.removeItem('token'); setToken(null); };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: '20px auto' }}>
      <h1>Social Feed App</h1>
      {!token ? <AuthPage onLogin={onLogin} /> : <FeedPage token={token} onLogout={onLogout} />}
    </div>
  );
}
