export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
      <h1 style={{ color: 'var(--navy)', fontSize: '2rem', fontWeight: 'bold' }}>
        Ayiti Data
      </h1>
      <p style={{ color: 'var(--muted)' }}>Layout test — do you see the navbar above and footer below?</p>
    </div>
  )
}