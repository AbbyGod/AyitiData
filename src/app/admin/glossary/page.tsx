'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, Plus, BookOpen, Trash2, Edit, X, Save } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  'Finance', 'Health', 'Demography', 'Education',
  'Agriculture', 'Politics', 'Environment', 'Other'
]

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ht', label: 'Kreyòl' },
  { code: 'es', label: 'Español' },
]

const emptyForm = { term: '', definition: '', category: '', language: 'en' }

export default function GlossaryAdminPage() {
  const [terms, setTerms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { loadTerms() }, [])

  async function loadTerms() {
    const supabase = createClient()
    const { data } = await supabase
      .from('glossary')
      .select('*')
      .order('term', { ascending: true })
    setTerms(data || [])
    setLoading(false)
  }

  function openNew() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  function openEdit(term: any) {
    setForm({
      term: term.term || '',
      definition: term.definition || '',
      category: term.category || '',
      language: term.language || 'en',
    })
    setEditingId(term.id)
    setShowForm(true)
  }

  async function saveTerm() {
    if (!form.term.trim() || !form.definition.trim()) {
      alert('Please add a term and definition.')
      return
    }
    setSaving(true)
    const supabase = createClient()
    if (editingId) {
      await supabase.from('glossary').update(form).eq('id', editingId)
    } else {
      await supabase.from('glossary').insert(form)
    }
    setSaving(false)
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    loadTerms()
  }

  async function deleteTerm(id: string) {
    if (!confirm('Delete this term?')) return
    const supabase = createClient()
    await supabase.from('glossary').delete().eq('id', id)
    setTerms(terms.filter(t => t.id !== id))
  }

  const filtered = terms.filter(t =>
    search === '' ||
    t.term?.toLowerCase().includes(search.toLowerCase()) ||
    t.definition?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--muted)' }}>
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>
              Glossary
            </h1>
            <span className="text-sm px-2 py-0.5 rounded-full"
              style={{ background: 'var(--light)', color: 'var(--muted)' }}>
              {terms.length} terms
            </span>
          </div>
          <button onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--navy)' }}>
            <Plus className="w-4 h-4" /> Add Term
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">

        {/* FORM */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sora font-bold text-lg" style={{ color: 'var(--navy)' }}>
                {editingId ? 'Edit Term' : 'Add New Term'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" style={{ color: 'var(--muted)' }} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--muted)' }}>Term *</label>
                <input type="text" value={form.term}
                  onChange={e => setForm({ ...form, term: e.target.value })}
                  placeholder="e.g. GDP, Inflation, Maternal Mortality Rate"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--muted)' }}>Definition *</label>
                <textarea value={form.definition}
                  onChange={e => setForm({ ...form, definition: e.target.value })}
                  placeholder="Clear, simple explanation accessible to non-experts..."
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--muted)' }}>Category</label>
                <select value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                  <option value="">Select...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--muted)' }}>Language</label>
                <select value={form.language}
                  onChange={e => setForm({ ...form, language: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                  {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-5 border-t border-gray-100">
              <button onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50"
                style={{ color: 'var(--muted)' }}>
                Cancel
              </button>
              <button onClick={saveTerm} disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: 'var(--navy)' }}>
                {saving
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Save className="w-4 h-4" />}
                {editingId ? 'Update Term' : 'Save Term'}
              </button>
            </div>
          </div>
        )}

        {/* SEARCH */}
        <div className="relative mb-6">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search terms..."
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 bg-white" />
        </div>

        {/* TERMS LIST */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>
              No terms yet
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              Add key terms to help readers understand Haiti's data.
            </p>
            <button onClick={openNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--navy)' }}>
              <Plus className="w-4 h-4" /> Add First Term
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(term => (
              <div key={term.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--navy)' }}>
                      {term.term}
                    </h3>
                    {term.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--light)', color: 'var(--muted)' }}>
                        {term.category}
                      </span>
                    )}
                    {term.language && term.language !== 'en' && (
                      <span className="text-xs px-2 py-0.5 rounded-full uppercase font-bold"
                        style={{ background: '#E8F0FC', color: '#1A56A0' }}>
                        {term.language}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {term.definition.length > 150
                      ? term.definition.substring(0, 150) + '...'
                      : term.definition}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(term)}
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ color: 'var(--blue)' }}>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteTerm(term.id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    style={{ color: '#C0392B' }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}