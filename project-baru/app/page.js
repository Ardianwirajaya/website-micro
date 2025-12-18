"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
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

    //Redirect if login success
    if (action === 'login' && data.success) {
      router.push('/Dashboard');
    }
  };

  return (
    <main style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Sistem Login Microservices</h1>

      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <br /><br />

      <button onClick={() => handleAuth('register')}>Register</button>
      <button onClick={() => handleAuth('login')}>Login</button>

      {message && <p>{message}</p>}
    </main>
  );
}