export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-sora text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/70">Last updated: January 1, 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div style={{ color: 'var(--text)' }}>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>1. Information We Collect</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            We collect information you provide directly — such as your name, email address, and any content you submit. We also collect usage data such as pages visited and datasets downloaded, to improve our platform.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>2. How We Use Your Information</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            We use your information to operate and improve Ayiti Data, send newsletters (with your consent), respond to your inquiries, and analyze platform usage. We never sell your personal data to third parties.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>3. Data Storage</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Your data is stored securely using Supabase, a trusted data infrastructure provider. We implement industry-standard security measures to protect your information.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>4. Cookies</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            We use essential cookies to maintain your session and preferences. We use analytics cookies to understand how visitors use our platform. You can control cookie preferences through your browser settings or our cookie consent tool.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>5. Your Rights</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at hello@ayitidata.org. We will respond within 30 days.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>6. Newsletter</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            If you subscribe to our newsletter, we will send you updates about new datasets and insights. You can unsubscribe at any time by clicking the unsubscribe link in any email.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>7. Third-Party Services</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            We use Supabase for database services, Vercel for hosting, and Resend for email delivery. Each of these providers has their own privacy policies governing their use of your data.
          </p>

          <h2 className="font-sora font-bold text-xl mt-8 mb-3" style={{ color: 'var(--navy)' }}>8. Contact</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            For privacy-related questions, contact us at <a href="mailto:hello@ayitidata.org" className="font-semibold" style={{ color: 'var(--blue)' }}>hello@ayitidata.org</a>.
          </p>
        </div>
      </div>
    </div>
  )
}