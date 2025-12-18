"use client";
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (action) => {
    const res = await fetch(`/api/auth/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <main style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Sistem Login Microservices</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: '10px' }}
        />
      </div>

      <button onClick={() => handleAuth('register')} style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}>
        Daftar (Register)
      </button>
      <button onClick={() => handleAuth('login')} style={{ padding: '10px 20px', cursor: 'pointer', background: '#0070f3', color: 'white', border: 'none' }}>
        Masuk (Login)
      </button>

      {message && <p style={{ marginTop: '20px', color: 'blue' }}>{message}</p>}
    </main>
  );
}