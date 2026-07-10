'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { CheckCircle, Users } from 'lucide-react'

const EXPERTISE_AREAS = [
  'Finance & Economics', 'Healthcare & Public Health', 'Education',
  'Political Science', 'Demography & Statistics', 'Data Science & Engineering',
  'Journalism & Communication', 'Agriculture & Environment', 'Law & Policy', 'Other'
]

const openRoles = [
  { title: 'Finance Analyst', description: 'Analyze Haiti\'s economic data and write data-driven reports on GDP, inflation, trade, and fiscal policy.' },
  { title: 'Health Data Specialist', description: 'Work with health datasets to produce insights on healthcare access, mortality, disease, and public health in Haiti.' },
  { title: 'Education Researcher', description: 'Analyze enrollment, literacy, and education policy data to produce accessible reports for a general audience.' },
  { title: 'Data Engineer', description: 'Help us clean, structure, and publish datasets. Build pipelines to import data from government and international sources.' },
  { title: 'Political Analyst', description: 'Cover elections, governance, and political developments in Haiti through a data lens.' },
  { title: 'Content Editor', description: 'Review and edit articles written by our analysts for clarity, accuracy, and accessibility.' },
]

export default function JoinPage() {
  const [form, setForm] = useState({ name: '', email: '', expertise: '', linkedin: '', motivation: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const supabase = createClient()
    await supabase.from('submissions').insert({
      name: form.name,
      email: form.email,
      title: `Join the Team — ${form.expertise}`,
      abstract: `Expertise: ${form.expertise}\nLinkedIn: ${form.linkedin}\n\nMotivation: ${form.motivation}`,
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
          <h2 className="font-sora text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>Application received!</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            Thank you for your interest in joining Ayiti Data. We'll review your application and get back to you soon.
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
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Join the Team</h1>
            <p className="text-white/70 text-lg max-w-xl">
              We're building a team of domain experts to produce world-class data analysis about Haiti.
              Are you in?
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* OPEN ROLES */}
        <h2 className="font-sora font-bold text-xl mb-6" style={{ color: 'var(--navy)' }}>
          Open Roles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {openRoles.map(role => (
            <div key={role.title} className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-sora font-bold text-sm mb-2" style={{ color: 'var(--navy)' }}>
                {role.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                {role.description}
              </p>
            </div>
          ))}
        </div>

        {/* APPLICATION FORM */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-sora font-bold text-xl mb-6" style={{ color: 'var(--navy)' }}>
            Apply Now
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Full Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Area of Expertise *</label>
                <select value={form.expertise} onChange={e => setForm({ ...form, expertise: e.target.value })} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                  <option value="">Select...</option>
                  {EXPERTISE_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>LinkedIn (optional)</label>
                <input type="text" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                Why do you want to join Ayiti Data? *
              </label>
              <textarea value={form.motivation} onChange={e => setForm({ ...form, motivation: e.target.value })} required rows={5}
                placeholder="Tell us about your background, what you bring to the team, and why you're passionate about Haiti's data..."
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
            </div>
            <button type="submit" disabled={submitting}
              className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: 'var(--navy)' }}>
              {submitting
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <Users className="w-4 h-4" />}
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}