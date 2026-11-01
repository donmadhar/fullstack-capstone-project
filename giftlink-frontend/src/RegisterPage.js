import React, { useState } from 'react';

export default function RegisterPage({ api, onLogin, onHome }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  async function submit(e) {
    e.preventDefault();
    const response = await fetch(`${api}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (response.ok) onLogin();
  }
  return <main className="auth"><button onClick={onHome}>← Home</button><h1>Create your GiftLink account</h1><form onSubmit={submit}>
    <input placeholder="Name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required/>
    <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required/>
    <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} required/>
    <button className="primary">Register</button></form><p>{message}</p><button onClick={onLogin}>Already registered? Login</button></main>;
}
