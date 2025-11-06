import React, { useState } from 'react';

function validEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function AuthPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async () => {
    setMsg('');

    // basic validation
    if (!username.trim() || !password.trim() || (isRegister && !email.trim())) {
      setMsg('Please fill all fields');
      return;
    }
    if (isRegister && !validEmail(email)) {
      setMsg('Invalid email');
      return;
    }

    // choose correct API endpoint
    const API_BASE = "http://localhost:8080";

const url = isRegister ? `${API_BASE}/api/auth/register` : `${API_BASE}/api/auth/login`;
    const payload = isRegister
      ? { username, email, password }
      : { username, password };

    try {
  
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || 'Error');
        return;
      }

      if (isRegister) {
        setMsg('Registered! Please login.');
        setIsRegister(false);
        setEmail('');
        setPassword('');
      } else {
        if (data.token) {
          onLogin(data.token);
        }
      }
    } catch (e) {
      console.error(e);
      setMsg('Network error');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: 'auto', paddingTop: 50 }}>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setIsRegister(false)} disabled={!isRegister}>
          Login
        </button>
        <button
          onClick={() => setIsRegister(true)}
          disabled={isRegister}
          style={{ marginLeft: 8 }}
        >
          Register
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: 8, marginBottom: 8 }}
        />
        {isRegister && (
          <input
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: 8, marginBottom: 8 }}
          />
        )}
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 8, marginBottom: 8 }}
        />
        <button onClick={submit}>{isRegister ? 'Register' : 'Login'}</button>
        {msg && <div style={{ color: 'red', marginTop: 8 }}>{msg}</div>}
      </div>
    </div>
  );
}
