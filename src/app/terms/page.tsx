export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-sora text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-white/70">Last updated: January 1, 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none" style={{ color: 'var(--text)' }}>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>1. Acceptance of Terms</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            By accessing and using Ayiti Data (ayitidata.org), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>2. Use of Data</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            All datasets published by Ayiti Data are free to use for research, journalism, education, and non-commercial purposes. When using our data, you must cite Ayiti Data and the original source. Commercial use requires prior written permission.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>3. User Accounts</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information when creating an account and to notify us immediately of any unauthorized use.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>4. Content Submissions</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            By submitting research or content to Ayiti Data, you grant us a non-exclusive license to publish, display, and distribute your work on our platform. You retain ownership of your original work.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>5. Prohibited Uses</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            You may not use Ayiti Data to spread misinformation, engage in harassment, violate any applicable laws, or attempt to gain unauthorized access to our systems.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>6. Disclaimer</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Ayiti Data provides information for educational and research purposes. While we strive for accuracy, we make no warranties about the completeness or reliability of our data. Always verify critical information with official sources.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>7. Changes to Terms</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>8. Contact</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            For questions about these terms, contact us at <a href="mailto:hello@ayitidata.org" className="font-semibold" style={{ color: 'var(--blue)' }}>hello@ayitidata.org</a>.
          </p>
        </div>
      </div>
    </div>
  )
}