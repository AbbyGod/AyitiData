'use client'

import { motion } from 'framer-motion'
import { Heart, Server, Users, Globe } from 'lucide-react'

const tiers = [
  {
    icon: Server,
    title: 'Technical Support',
    description: 'Keep our servers running, fund new features, and maintain data infrastructure.',
    color: '#1A56A0',
    bg: '#E8F0FC',
    examples: ['Server hosting', 'Data storage', 'New features', 'Security'],
  },
  {
    icon: Users,
    title: 'People & Analysts',
    description: 'Pay our analysts, writers, researchers, and editorial staff.',
    color: '#1E8A4C',
    bg: '#E6F5ED',
    examples: ['Data analysts', 'Writers & editors', 'Researchers', 'Community managers'],
  },
  {
    icon: Globe,
    title: 'Community & Charity',
    description: 'Fund education initiatives, field activities, and community programs in Haiti.',
    color: '#E8A020',
    bg: '#FFF8E1',
    examples: ['Data literacy workshops', 'School programs', 'Field research', 'Community grants'],
  },
]

const paymentMethods = [
  { name: 'PayPal', emoji: '💳', description: 'Pay securely with PayPal, credit or debit card.' },
  { name: 'Apple Pay', emoji: '🍎', description: 'Quick payment with Apple Pay on supported devices.' },
  { name: 'Google Pay', emoji: '🟢', description: 'Fast checkout with Google Pay.' },
  { name: 'Bank Transfer', emoji: '🏦', description: 'Direct bank transfer for larger donations.' },
]

export default function SupportUsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-sora text-4xl font-bold text-white mb-4">
              Support Ayiti Data
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              Ayiti Data is free for everyone. Your support keeps the platform running,
              our analysts paid, and Haiti's data accessible to all.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* WHY SUPPORT */}
        <div className="text-center mb-12">
          <h2 className="font-sora text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>
            Why Your Support Matters
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Every donation directly funds our mission to make data about Haiti open, clean,
            and accessible. Here's where your money goes:
          </p>
        </div>

        {/* TIERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier, i) => (
            <motion.div key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: tier.bg }}>
                <tier.icon className="w-6 h-6" style={{ color: tier.color }} />
              </div>
              <h3 className="font-sora font-bold text-base mb-2" style={{ color: 'var(--navy)' }}>
                {tier.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                {tier.description}
              </p>
              <ul className="flex flex-col gap-1.5">
                {tier.examples.map(ex => (
                  <li key={ex} className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: tier.color }} />
                    {ex}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* DONATION SECTION */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="font-sora font-bold text-xl mb-2 text-center" style={{ color: 'var(--navy)' }}>
            Make a Donation
          </h2>
          <p className="text-sm text-center mb-8" style={{ color: 'var(--muted)' }}>
            Choose one-time or monthly. Every amount makes a difference.
          </p>

          {/* AMOUNT SELECTOR */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {['$5', '$10', '$25', '$50', '$100', 'Custom'].map(amount => (
              <button key={amount}
                className="px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all hover:border-blue-400"
                style={{ borderColor: 'var(--border)', color: 'var(--navy)' }}>
                {amount}
              </button>
            ))}
          </div>

          {/* FREQUENCY */}
          <div className="flex justify-center gap-3 mb-8">
            {['One-time', 'Monthly'].map(freq => (
              <button key={freq}
                className="px-6 py-2 rounded-xl text-sm font-semibold border transition-all"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                {freq}
              </button>
            ))}
          </div>

          {/* PAYMENT METHODS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {paymentMethods.map(method => (
              <div key={method.name}
                className="border border-gray-100 rounded-xl p-4 text-center hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                <div className="text-2xl mb-1">{method.emoji}</div>
                <div className="text-xs font-semibold" style={{ color: 'var(--navy)' }}>{method.name}</div>
              </div>
            ))}
          </div>

          {/* PAYPAL BUTTON PLACEHOLDER */}
          <div className="text-center">
            <div className="inline-block bg-yellow-400 text-yellow-900 font-bold px-10 py-3 rounded-xl text-sm cursor-pointer hover:bg-yellow-300 transition-colors">
              💛 Donate with PayPal
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>
              Secure payment processing. You can also donate anonymously.
            </p>
          </div>
        </div>

        {/* ANONYMOUS NOTE */}
        <p className="text-center text-sm" style={{ color: 'var(--muted)' }}>
          Want to donate anonymously? Email us at{' '}
          <a href="mailto:hello@ayitidata.org" className="font-semibold hover:underline"
            style={{ color: 'var(--blue)' }}>
            hello@ayitidata.org
          </a>
        </p>
      </div>
    </div>
  )
}