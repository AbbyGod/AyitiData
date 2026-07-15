'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, Plus, BookOpen, Trash2, Edit, X, Save, Copy, Search } from 'lucide-react'
import Link from 'next/link'

// Master translation dictionary matched exactly to your DB Enum
const CATEGORY_MAP: Record<string, Record<string, string>> = {
  'Population': { en: 'Population', fr: 'Population', ht: 'Popilasyon', es: 'Población' },
  'Education': { en: 'Education', fr: 'Éducation', ht: 'Edikasyon', es: 'Educación' },
  'Economy': { en: 'Economy', fr: 'Économie', ht: 'Ekonomi', es: 'Economía' },
  'Health': { en: 'Health', fr: 'Santé', ht: 'Sante', es: 'Salud' },
  'Agriculture': { en: 'Agriculture', fr: 'Agriculture', ht: 'Agrikilti', es: 'Agricultura' },
  'Humanitarian': { en: 'Humanitarian', fr: 'Humanitaire', ht: 'Imanitè', es: 'Humanitario' },
  'Politics': { en: 'Politics', fr: 'Politique', ht: 'Politik', es: 'Política' },
  'Other': { en: 'Other', fr: 'Autre', ht: 'Lòt', es: 'Otro' }
};

// Matched exactly to your DB Enum
const CATEGORIES = [
  'Population', 'Education', 'Economy', 'Health', 
  'Agriculture', 'Humanitarian', 'Politics', 'Other'
]

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ht', label: 'Kreyòl' },
  { code: 'es', label: 'Español' },
]

const emptyForm = { term: '', definition: '', category: '', language: 'en', translation_group_id: '' }

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openEdit(term: any) {
    setForm({
      term: term.term || '',
      definition: term.definition || '',
      category: term.category || '',
      language: term.language || 'en',
      translation_group_id: term.translation_group_id || '', 
    })
    setEditingId(term.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function saveTerm() {
    if (!form.term.trim() || !form.definition.trim()) {
      alert('Please add a term and definition.')
      return
    }
    setSaving(true)
    const supabase = createClient()

    const { translation_group_id, ...restOfForm } = form;
    
    // Auto-generate UUID if left blank
    const payload = (!translation_group_id || translation_group_id.trim() === '') 
      ? restOfForm 
      : form;

    if (editingId) {
      await supabase.from('glossary').update(payload).eq('id', editingId)
    } else {
      await supabase.from('glossary').insert(payload)
    }
    
    setSaving(false)
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    loadTerms()
  }

  async function deleteTerm(id: string) {
    if (!confirm('Are you sure you want to delete this term?')) return
    const supabase = createClient()
    await supabase.from('glossary').delete().eq('id', id)
    setTerms(terms.filter(t => t.id !== id))
  }

  const filtered = terms.filter(t =>
    search === '' ||
    t.term?.toLowerCase().includes(search.toLowerCase()) ||
    t.definition?.toLowerCase().includes(search.toLowerCase()) ||
    t.translation_group_id?.includes(search)
  )

  return (
    <div className="min-h-screen pb-16" style={{ background: 'var(--light)' }}>
      <div className="bg-white border-b border-gray-100 px-4 sm:px-8 py-5 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition-colors text-gray-500">
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
            <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>
              Glossary Admin
            </h1>
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600">
              {terms.length} terms total
            </span>
          </div>
          <button onClick={openNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-transform active:scale-95 shadow-sm"
            style={{ background: 'var(--navy)' }}>
            <Plus className="w-4 h-4" /> Add Term
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h2 className="font-sora font-bold text-xl" style={{ color: 'var(--navy)' }}>
                {editingId ? 'Edit Term' : 'Add New Term'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Term *</label>
                <input type="text" value={form.term}
                  onChange={e => setForm({ ...form, term: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-gray-50 focus:bg-white" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Definition *</label>
                <textarea value={form.definition}
                  onChange={e => setForm({ ...form, definition: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-gray-50 focus:bg-white resize-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                <select value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-gray-50 focus:bg-white cursor-pointer">
                  <option value="">Select...</option>
                  {CATEGORIES.map(catKey => (
                    <option key={catKey} value={catKey}>
                      {CATEGORY_MAP[catKey]?.[form.language] || catKey}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Language</label>
                <select value={form.language}
                  onChange={e => setForm({ ...form, language: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-gray-50 focus:bg-white cursor-pointer">
                  {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
              </div>
              
              <div className="md:col-span-2 p-5 rounded-xl bg-blue-50/50 border border-blue-100">
                <label className="block text-sm font-semibold mb-1 text-blue-900">Translation Link ID (Optional)</label>
                <p className="text-xs text-blue-600/80 mb-3">
                  Leave blank for a completely new word. To add a translation to an existing word, paste its Link ID here.
                </p>
                <input type="text" value={form.translation_group_id}
                  onChange={e => setForm({ ...form, translation_group_id: e.target.value })}
                  placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                  className="w-full px-4 py-3 text-sm border border-blue-200 rounded-xl outline-none focus:border-blue-500 font-mono bg-white" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
              <button onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50 text-gray-600">
                Cancel
              </button>
              <button onClick={saveTerm} disabled={saving}
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md"
                style={{ background: 'var(--navy)' }}>
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {editingId ? 'Update Term' : 'Save Term'}
              </button>
            </div>
          </div>
        )}

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by term, definition, or Link ID..."
            className="w-full pl-11 pr-4 py-3.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white shadow-sm" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-sora font-bold text-lg mb-2 text-gray-700">No terms found</h3>
            <p className="text-sm text-gray-500 mb-6">{search ? 'Try adjusting your search criteria.' : 'Your glossary is empty.'}</p>
            {!search && (
              <button onClick={openNew}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'var(--navy)' }}>
                <Plus className="w-4 h-4" /> Add First Term
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map(term => (
              <div key={term.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row md:items-start gap-4 hover:shadow-md transition-shadow group">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-sora font-bold text-base" style={{ color: 'var(--navy)' }}>{term.term}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-md font-bold uppercase bg-gray-100 text-gray-600">{term.language}</span>
                    {term.category && (
                      <span className="text-xs px-2.5 py-1 rounded-md font-medium" style={{ background: '#F0F4FA', color: '#1A56A0' }}>
                        {CATEGORY_MAP[term.category]?.[term.language] || term.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 mb-4 pr-4">{term.definition}</p>
                  {term.translation_group_id && (
                    <div className="flex items-center gap-2 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                      <span className="text-xs font-mono text-gray-500">ID: {term.translation_group_id.substring(0, 8)}...</span>
                      <div className="w-px h-3 bg-gray-300 mx-1"></div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(term.translation_group_id)
                          alert('Translation Link ID copied! Paste this when adding a new translation.')
                        }}
                        className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy ID
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 md:flex-col md:opacity-0 md:group-hover:opacity-100 transition-opacity flex-shrink-0 mt-4 md:mt-0">
                  <button onClick={() => openEdit(term)} className="flex-1 md:flex-none p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteTerm(term.id)} className="flex-1 md:flex-none p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center">
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