export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-sora text-4xl font-bold text-white mb-3">Cookie Policy</h1>
          <p className="text-white/70">Last updated: January 1, 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div style={{ color: 'var(--text)' }}>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>What Are Cookies?</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>Cookies We Use</h2>

          <div className="border border-gray-100 rounded-2xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--light)' }}>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Type</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Purpose</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Required</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Essential', purpose: 'Authentication, session management, security', required: 'Yes' },
                  { type: 'Functional', purpose: 'Language preferences, saved settings', required: 'No' },
                  { type: 'Analytics', purpose: 'Understanding how visitors use the platform', required: 'No' },
                ].map((row, i) => (
                  <tr key={row.type} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                    <td className="px-4 py-3 font-semibold text-xs" style={{ color: 'var(--navy)' }}>{row.type}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{row.purpose}</td>
                    <td className="px-4 py-3 text-xs font-semibold" style={{ color: row.required === 'Yes' ? '#1E8A4C' : 'var(--muted)' }}>{row.required}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>Managing Cookies</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            You can control cookies through your browser settings. Note that disabling essential cookies may affect the functionality of the platform, including your ability to log in.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>Contact</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            Questions about our cookie use? Email <a href="mailto:hello@ayitidata.org" className="font-semibold" style={{ color: 'var(--blue)' }}>hello@ayitidata.org</a>.
          </p>
        </div>
      </div>
    </div>
  )
}