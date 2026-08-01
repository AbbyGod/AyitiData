'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// We keep categories in English as values so your database stays standardized.
// If you want to translate these in the dropdown later, you can add them to translations.ts
const CATEGORIES = [
  'Education', 'Economy', 'Health', 'Population',
  'Agriculture', 'Environment', 'Politics', 'Other'
]

export default function SubmitResearchPage() {
  const { t } = useLanguage()
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
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--light)' }}>
        <div className="bg-white rounded-2xl border border-gray-100 p-12 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#1E8A4C' }} />
          <h2 className="font-sora text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>
            {t('research_successTitle' as any)}
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            {t('research_successMsg' as any)} <strong>{form.email}</strong>.
          </p>
          <button 
            onClick={() => { 
              setSubmitted(false); 
              setForm({ name: '', email: '', title: '', category: '', affiliation: '', abstract: '', file_url: '' }) 
            }}
            className="text-sm font-semibold hover:underline" 
            style={{ color: 'var(--blue)' }}
          >
            {t('research_successBtn' as any)}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">
              {t('research_heroTitle' as any)}
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              {t('research_heroSubtitle' as any)}
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
                  {t('research_formName' as any)}
                </label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder={t('research_formNamePlaceholder' as any)} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  {t('research_formEmail' as any)}
                </label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com" required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {t('research_formTitle' as any)}
              </label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder={t('research_formTitlePlaceholder' as any)} required
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  {t('research_formCategory' as any)}
                </label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                  <option value="">{t('research_formCategorySelect' as any)}</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  {t('research_formAffiliation' as any)}
                </label>
                <input type="text" value={form.affiliation} onChange={e => setForm({ ...form, affiliation: e.target.value })}
                  placeholder={t('research_formAffiliationPlaceholder' as any)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {t('research_formAbstract' as any)}
              </label>
              <textarea value={form.abstract} onChange={e => setForm({ ...form, abstract: e.target.value })}
                placeholder={t('research_formAbstractPlaceholder' as any)} required
                rows={6}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {t('research_formFileLink' as any)}
              </label>
              <input type="text" value={form.file_url} onChange={e => setForm({ ...form, file_url: e.target.value })}
                placeholder={t('research_formFilePlaceholder' as any)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              <p className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>
                {t('research_formFileHelp' as any)}
              </p>
            </div>

            <div className="pt-2">
              <input type="text" id="website" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <button type="submit" disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: 'var(--navy)' }}>
                {submitting
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Send className="w-4 h-4" />}
                {t('research_submitBtn' as any)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}