import React, { useState } from 'react';

export default function LoginPage({ api, onHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  async function submit(e) {
    e.preventDefault();
    const response = await fetch(`${api}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : '' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) { setToken(data.token); localStorage.setItem('giftlink_token', data.token); setMessage(`Welcome, ${data.user.name}`); }
    else setMessage(data.error || 'Login failed');
  }
  return <main className="auth"><button onClick={onHome}>← Home</button><h1>Welcome back</h1><form onSubmit={submit}>
    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
    <button className="primary">Login</button></form><p>{message}</p></main>;
}
