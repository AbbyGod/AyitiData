import { ImageResponse } from 'next/og'

export const alt = 'Ayiti Data — Open Data on Haiti'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            🇭🇹
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>Ayiti Data</div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: 'white', lineHeight: 1.15, display: 'flex', maxWidth: 900 }}>
          Open Data on Haiti
        </div>
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.75)', marginTop: 24, display: 'flex', maxWidth: 850 }}>
          Datasets, insights, and reports on population, economy, health, and education.
        </div>
      </div>
    ),
    { ...size }
  )
}
