import React, { useEffect, useState } from 'react';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function App() {
  const [gifts, setGifts] = useState([]);
  const [page, setPage] = useState('home');
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`${API}/api/gifts`).then(r => r.json()).then(setGifts).catch(() => setGifts([]));
  }, []);

  async function search(e) {
    e.preventDefault();
    const response = await fetch(`${API}/api/search?q=${encodeURIComponent(query)}`);
    setGifts(await response.json());
  }

  if (page === 'register') return <RegisterPage api={API} onLogin={() => setPage('login')} onHome={() => setPage('home')} />;
  if (page === 'login') return <LoginPage api={API} onHome={() => setPage('home')} />;
  return <main className="wrap">
    <header><strong>GiftLink</strong><nav><button onClick={() => setPage('login')}>Login</button><button onClick={() => setPage('register')}>Register</button></nav></header>
    <section className="hero"><p className="eyebrow">GIVE • REUSE • CONNECT</p><h1>Give useful things a second life.</h1><p>Discover gifts shared by your community and pass along items someone else can use.</p><button className="primary" onClick={() => document.getElementById('catalog').scrollIntoView({behavior:'smooth'})}>Get Started</button></section>
    <section id="catalog"><h2>Available gifts</h2><form onSubmit={search}><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search gifts"/><button>Search</button></form>
      <div className="grid">{gifts.map(g => <article key={g._id} onClick={() => setSelected(g)}><span>{g.category}</span><h3>{g.name}</h3><p>{g.description}</p><small>{g.condition}</small></article>)}</div>
    </section>
    {selected && <div className="modal" onClick={() => setSelected(null)}><div><button onClick={() => setSelected(null)}>Close</button><h2>{selected.name}</h2><p>{selected.description}</p><p>Category: {selected.category}</p><p>Condition: {selected.condition}</p></div></div>}
  </main>;
}
