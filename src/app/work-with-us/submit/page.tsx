'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Send, Upload, CheckCircle } from 'lucide-react'

const CATEGORIES = [
  'Education', 'Economy', 'Health', 'Population',
  'Agriculture', 'Environment', 'Politics', 'Other'
]

export default function SubmitResearchPage() {
  const [form, setForm] = useState({
    name: '', email: '', title: '', category: '',
    affiliation: '', abstract: '', file_url: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Honeypot check
    if ((document.getElementById('website') as HTMLInputElement)?.value) return

    // Validation
    if (!form.name.trim() || form.name.trim().length < 2) {
      alert('Please enter your full name.'); return
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert('Please enter a valid email address.'); return
    }
    if (!form.title.trim() || form.title.trim().length < 5) {
      alert('Please enter a research title (at least 5 characters).'); return
    }
    if (!form.abstract.trim() || form.abstract.trim().length < 50) {
      alert('Please provide a summary of at least 50 characters.'); return
    }

    setSubmitting(true)
    const supabase = createClient()
    const { error } = await supabase.from('submissions').insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      title: form.title.trim(),
      category: form.category,
      abstract: form.abstract.trim(),
      file_url: form.file_url.trim() || null,
      status: 'pending',
    })
    setSubmitting(false)
    if (error) { alert('Something went wrong. Please try again.'); return }
    setSubmitted(true)
  }
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--light)' }}>
        <div className="bg-white rounded-2xl border border-gray-100 p-12 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#1E8A4C' }} />
          <h2 className="font-sora text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>
            Submission received!
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            Thank you for submitting your research. Our team will review it within
            5–7 business days and contact you at <strong>{form.email}</strong>.
          </p>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', title: '', category: '', affiliation: '', abstract: '', file_url: '' }) }}
            className="text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
            Submit another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Submit Your Research</h1>
            <p className="text-white/70 text-lg max-w-xl">
              Are you a researcher, student, or analyst with data-driven work about Haiti?
              Share it with our community — we review all submissions and publish the best ones.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  Full Name *
                </label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Jean Pierre" required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  Email *
                </label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com" required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                Research Title *
              </label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Unemployment trends in Haiti 2020–2024" required
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  Category
                </label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                  <option value="">Select a category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  Affiliation (optional)
                </label>
                <input type="text" value={form.affiliation} onChange={e => setForm({ ...form, affiliation: e.target.value })}
                  placeholder="University, NGO, organization..."
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                Abstract / Summary *
              </label>
              <textarea value={form.abstract} onChange={e => setForm({ ...form, abstract: e.target.value })}
                placeholder="Describe your research, methodology, and key findings (200–500 words)..." required
                rows={6}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                File Link (optional)
              </label>
              <input type="text" value={form.file_url} onChange={e => setForm({ ...form, file_url: e.target.value })}
                placeholder="Google Drive, Dropbox, or direct link to your PDF/DOCX..."
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              <p className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>
                Upload your file to Google Drive or Dropbox and paste the shareable link here.
              </p>
            </div>

            <div className="pt-2">
              {/* HONEYPOT — hidden from real users, catches bots */}
            <input type="text" id="website" name="website" 
              style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <button type="submit" disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: 'var(--navy)' }}>
                {submitting
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Send className="w-4 h-4" />}
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}