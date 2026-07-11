'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, Database } from 'lucide-react'

const CATEGORIES = [
  'General Question', 'Dataset Request', 'Report an Error',
  'Partnership', 'Media Inquiry', 'Other'
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', category: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isDatasetRequest, setIsDatasetRequest] = useState(false)
  const [datasetForm, setDatasetForm] = useState({ name: '', email: '', description: '', category: '', reason: '' })
  const [datasetSubmitting, setDatasetSubmitting] = useState(false)
  const [datasetSubmitted, setDatasetSubmitted] = useState(false)

 async function handleContact(e: React.FormEvent) {
    e.preventDefault()
    if ((document.getElementById('website_trap') as HTMLInputElement)?.value) return
    if (!form.name.trim() || form.name.trim().length < 2) { alert('Please enter your name.'); return }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { alert('Please enter a valid email.'); return }
    if (!form.subject.trim() || form.subject.trim().length < 3) { alert('Please enter a subject.'); return }
    if (!form.message.trim() || form.message.trim().length < 20) { alert('Please write a message of at least 20 characters.'); return }
    setSubmitting(true)
    const supabase = createClient()
    const { error } = await supabase.from('submissions').insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      title: `Contact: ${form.category || 'General'} — ${form.subject.trim()}`,
      abstract: form.message.trim(),
      category: 'Other',
      status: 'pending',
    })
    setSubmitting(false)
    if (error) { alert('Something went wrong. Please try again.'); return }
    setSubmitted(true)
  }

async function handleDatasetRequest(e: React.FormEvent) {
    e.preventDefault()
    if ((document.getElementById('website_trap') as HTMLInputElement)?.value) return
    if (!datasetForm.name.trim() || datasetForm.name.trim().length < 2) { alert('Please enter your name.'); return }
    if (!datasetForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datasetForm.email)) { alert('Please enter a valid email.'); return }
    if (!datasetForm.description.trim() || datasetForm.description.trim().length < 10) { alert('Please describe the dataset you need.'); return }
    if (!datasetForm.reason.trim() || datasetForm.reason.trim().length < 20) { alert('Please explain why you need this data (at least 20 characters).'); return }
    setDatasetSubmitting(true)
    const supabase = createClient()
    const { error } = await supabase.from('dataset_requests').insert({
      name: datasetForm.name.trim(),
      email: datasetForm.email.trim().toLowerCase(),
      description: datasetForm.description.trim(),
      category: datasetForm.category,
      reason: datasetForm.reason.trim(),
      status: 'pending',
    })
    setDatasetSubmitting(false)
    if (error) { alert('Something went wrong. Please try again.'); return }
    setDatasetSubmitted(true)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Contact Us</h1>
            <p className="text-white/70 text-lg max-w-xl">
              Have a question, a dataset request, or want to report an error?
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CONTACT INFO */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-sora font-bold text-base mb-4" style={{ color: 'var(--navy)' }}>
                  Get in Touch
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--blue)' }} />
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--navy)' }}>Email</p>
                      <a href="mailto:hello@ayitidata.org" className="text-sm hover:underline"
                        style={{ color: 'var(--blue)' }}>
                        hello@ayitidata.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--blue)' }} />
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--navy)' }}>Location</p>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>Port-au-Prince, Haiti</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOGGLE */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-sm font-semibold mb-3" style={{ color: 'var(--navy)' }}>
                  What are you looking for?
                </p>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setIsDatasetRequest(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all text-left"
                    style={!isDatasetRequest
                      ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                      : { color: 'var(--muted)', borderColor: 'var(--border)' }}>
                    💬 General Contact
                  </button>
                  <button onClick={() => setIsDatasetRequest(true)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all text-left"
                    style={isDatasetRequest
                      ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                      : { color: 'var(--muted)', borderColor: 'var(--border)' }}>
                    📊 Request a Dataset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FORMS */}
          <div className="lg:col-span-2">

            {/* GENERAL CONTACT */}
            {!isDatasetRequest && (
              submitted ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <CheckCircle className="w-14 h-14 mx-auto mb-4" style={{ color: '#1E8A4C' }} />
                  <h3 className="font-sora font-bold text-xl mb-2" style={{ color: 'var(--navy)' }}>Message sent!</h3>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    We'll get back to you at {form.email} within 2–3 business days.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                  <h2 className="font-sora font-bold text-xl mb-6" style={{ color: 'var(--navy)' }}>
                    Send a Message
                  </h2>
                  <form onSubmit={handleContact} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Name *</label>
                        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Email *</label>
                        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Category</label>
                      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                        <option value="">Select...</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Subject *</label>
                      <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Message *</label>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
                    </div>
                    <input type="text" id="website_trap" name="website_trap"
  style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                    <button type="submit" disabled={submitting}
                      className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                      style={{ background: 'var(--navy)' }}>
                      {submitting
                        ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <Send className="w-4 h-4" />}
                      Send Message
                    </button>
                  </form>
                </div>
              )
            )}

            {/* DATASET REQUEST */}
            {isDatasetRequest && (
              datasetSubmitted ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <CheckCircle className="w-14 h-14 mx-auto mb-4" style={{ color: '#1E8A4C' }} />
                  <h3 className="font-sora font-bold text-xl mb-2" style={{ color: 'var(--navy)' }}>Request submitted!</h3>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    We'll review your request and get back to you at {datasetForm.email}.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                  <h2 className="font-sora font-bold text-xl mb-2" style={{ color: 'var(--navy)' }}>
                    Request a Dataset
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                    Can't find the data you need? Tell us what you're looking for and we'll try to find or prepare it.
                  </p>
                  <form onSubmit={handleDatasetRequest} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Name *</label>
                        <input type="text" value={datasetForm.name} onChange={e => setDatasetForm({ ...datasetForm, name: e.target.value })} required
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Email *</label>
                        <input type="email" value={datasetForm.email} onChange={e => setDatasetForm({ ...datasetForm, email: e.target.value })} required
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Dataset Description *</label>
                      <input type="text" value={datasetForm.description} onChange={e => setDatasetForm({ ...datasetForm, description: e.target.value })} required
                        placeholder="e.g. Unemployment by department 2020–2024"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Category</label>
                      <select value={datasetForm.category} onChange={e => setDatasetForm({ ...datasetForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                        <option value="">Select...</option>
                        {['Population', 'Education', 'Economy', 'Health', 'Agriculture', 'Environment', 'Other'].map(c =>
                          <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Why do you need this data? *</label>
                      <textarea value={datasetForm.reason} onChange={e => setDatasetForm({ ...datasetForm, reason: e.target.value })} required rows={4}
                        placeholder="Explain how you plan to use this dataset..."
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
                    </div>
                    <input type="text" id="website_trap" name="website_trap"
  style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                    <button type="submit" disabled={datasetSubmitting}
                      className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                      style={{ background: 'var(--navy)' }}>
                      {datasetSubmitting
                        ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <Database className="w-4 h-4" />}
                      Submit Request
                    </button>
                  </form>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}