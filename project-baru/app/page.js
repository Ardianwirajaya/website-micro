export default function Home() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Selamat Datang di Website Microservices Saya</h1>
      <p>Frontend ini berhasil di-deploy di Vercel!</p>
      
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Status Microservices:</h3>
        <p>Auth Service: 🟢 Online</p>
        <p>Product Service: 🟢 Online</p>
      </div>
    </main>
  )
}