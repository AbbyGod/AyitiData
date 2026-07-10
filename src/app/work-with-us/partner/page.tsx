'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { CheckCircle, Handshake } from 'lucide-react'

const PARTNER_TYPES = ['Academic Institution', 'NGO / Non-profit', 'Government Agency', 'Media Organization', 'International Organization', 'Private Sector', 'Other']

const benefits = [
  { emoji: '📊', title: 'Data Access', description: 'Early access to new datasets and reports before public release.' },
  { emoji: '🔗', title: 'Co-branding', description: 'Your logo and link featured on the Ayiti Data partners page.' },
  { emoji: '📣', title: 'Visibility', description: 'Joint communications and social media mentions to our audience.' },
  { emoji: '🤝', title: 'Collaboration', description: 'Opportunities to co-produce research, reports, and data projects.' },
  { emoji: '🎓', title: 'Capacity Building', description: 'Access to our data literacy workshops and training sessions.' },
  { emoji: '🌍', title: 'Impact', description: 'Contribute to a more data-driven and transparent Haiti.' },
]

export default function PartnerPage() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', type: '', website: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const supabase = createClient()
    await supabase.from('submissions').insert({
      name: form.name,
      email: form.email,
      title: `Partnership Inquiry — ${form.organization}`,
      abstract: `Organization: ${form.organization}\nType: ${form.type}\nWebsite: ${form.website}\n\nMessage: ${form.message}`,
      category: 'Other',
      status: 'pending',
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--light)' }}>
        <div className="bg-white rounded-2xl border border-gray-100 p-12 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#1E8A4C' }} />
          <h2 className="font-sora text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>Thank you!</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            We've received your partnership inquiry and will get back to you within 3–5 business days.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Partner With Us</h1>
            <p className="text-white/70 text-lg max-w-xl">
              Join our network of organizations committed to open data and transparency in Haiti.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* BENEFITS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {benefits.map(b => (
            <div key={b.title} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-2xl mb-2">{b.emoji}</div>
              <h3 className="font-sora font-bold text-sm mb-1" style={{ color: 'var(--navy)' }}>{b.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{b.description}</p>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-sora font-bold text-xl mb-6" style={{ color: 'var(--navy)' }}>
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Your Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Organization *</label>
                <input type="text" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Organization Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                  <option value="">Select...</option>
                  {PARTNER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Website</label>
              <input type="text" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Message *</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5}
                placeholder="Tell us about your organization and how you'd like to collaborate..."
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
            </div>
            <button type="submit" disabled={submitting}
              className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: 'var(--navy)' }}>
              {submitting
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <Handshake className="w-4 h-4" />}
              Send Partnership Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}