'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, Plus, Database, Trash2, Edit, Download, X, Save } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  'Population', 'Education', 'Economy', 'Health',
  'Agriculture', 'Environment', 'Politics', 'Other'
]

const categoryColors: Record<string, { bg: string; color: string }> = {
  Population: { bg: '#E8F0FC', color: '#1A56A0' },
  Education: { bg: '#FFF3E0', color: '#E8A020' },
  Economy: { bg: '#E6F5ED', color: '#1E8A4C' },
  Health: { bg: '#FDE8E8', color: '#C0392B' },
  Agriculture: { bg: '#F3E8FF', color: '#7C3AED' },
  Environment: { bg: '#E0F7F4', color: '#0D9488' },
  Politics: { bg: '#FFF1F2', color: '#E11D48' },
  Other: { bg: '#F4F7FB', color: '#6B7A90' },
}

const emptyForm = {
  title: '',
  description: '',
  source: '',
  category: '',
  csv_url: '',
  excel_url: '',
  json_url: '',
  metadata: '',
  last_updated: '',
}

export default function DatasetsAdminPage() {
  const [datasets, setDatasets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadDatasets()
  }, [])

  async function loadDatasets() {
    const supabase = createClient()
    const { data } = await supabase
      .from('datasets')
      .select('*')
      .order('created_at', { ascending: false })
    setDatasets(data || [])
    setLoading(false)
  }

  function openNew() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  function openEdit(dataset: any) {
    setForm({
      title: dataset.title || '',
      description: dataset.description || '',
      source: dataset.source || '',
      category: dataset.category || '',
      csv_url: dataset.csv_url || '',
      excel_url: dataset.excel_url || '',
      json_url: dataset.json_url || '',
      metadata: dataset.metadata || '',
      last_updated: dataset.last_updated?.split('T')[0] || '',
    })
    setEditingId(dataset.id)
    setShowForm(true)
  }

  async function saveDataset() {
    if (!form.title.trim()) { alert('Please add a title.'); return }
    setSaving(true)
    const supabase = createClient()

    const payload = {
      ...form,
      last_updated: form.last_updated ? new Date(form.last_updated).toISOString() : null,
    }

    if (editingId) {
      await supabase.from('datasets').update(payload).eq('id', editingId)
    } else {
      await supabase.from('datasets').insert(payload)
    }

    setSaving(false)
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    loadDatasets()
  }

  async function deleteDataset(id: string) {
    if (!confirm('Delete this dataset?')) return
    const supabase = createClient()
    await supabase.from('datasets').delete().eq('id', id)
    setDatasets(datasets.filter(d => d.id !== id))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--muted)' }}>
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>
              Datasets
            </h1>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--navy)' }}
          >
            <Plus className="w-4 h-4" /> Add Dataset
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">

        {/* ADD / EDIT FORM */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sora font-bold text-lg" style={{ color: 'var(--navy)' }}>
                {editingId ? 'Edit Dataset' : 'Add New Dataset'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" style={{ color: 'var(--muted)' }} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Haiti Population 2020–2024"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="What does this dataset contain?"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Source
                </label>
                <input
                  type="text"
                  value={form.source}
                  onChange={e => setForm({ ...form, source: e.target.value })}
                  placeholder="World Bank, IHSI, MENFP..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  CSV File URL
                </label>
                <input
                  type="text"
                  value={form.csv_url}
                  onChange={e => setForm({ ...form, csv_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Excel File URL
                </label>
                <input
                  type="text"
                  value={form.excel_url}
                  onChange={e => setForm({ ...form, excel_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  JSON File URL
                </label>
                <input
                  type="text"
                  value={form.json_url}
                  onChange={e => setForm({ ...form, json_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Last Updated
                </label>
                <input
                  type="date"
                  value={form.last_updated}
                  onChange={e => setForm({ ...form, last_updated: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Metadata / Notes
                </label>
                <textarea
                  value={form.metadata}
                  onChange={e => setForm({ ...form, metadata: e.target.value })}
                  placeholder="Additional notes, data dictionary, column descriptions..."
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-5 border-t border-gray-100">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50"
                style={{ color: 'var(--muted)' }}
              >
                Cancel
              </button>
              <button
                onClick={saveDataset}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: 'var(--navy)' }}
              >
                {saving
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Save className="w-4 h-4" />}
                {editingId ? 'Update Dataset' : 'Save Dataset'}
              </button>
            </div>
          </div>
        )}

        {/* DATASETS LIST */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : datasets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Database className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>
              No datasets yet
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              Add your first dataset to make it available for download.
            </p>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--navy)' }}
            >
              <Plus className="w-4 h-4" /> Add First Dataset
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {datasets.map(dataset => {
              const cat = categoryColors[dataset.category] || categoryColors.Other
              return (
                <div
                  key={dataset.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cat.bg }}>
                    <Database className="w-5 h-5" style={{ color: cat.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--navy)' }}>
                        {dataset.title}
                      </h3>
                      {dataset.category && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: cat.bg, color: cat.color }}>
                          {dataset.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                      {dataset.source && <span>Source: <strong style={{ color: 'var(--text)' }}>{dataset.source}</strong></span>}
                      {dataset.last_updated && <span>· Updated: {new Date(dataset.last_updated).toLocaleDateString()}</span>}
                      <span className="flex items-center gap-1">
                        · <Download className="w-3 h-3" /> {dataset.download_count || 0} downloads
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {dataset.csv_url && <span className="text-xs px-2 py-0.5 rounded border" style={{ color: '#1A56A0', borderColor: '#1A56A0' }}>CSV</span>}
                      {dataset.excel_url && <span className="text-xs px-2 py-0.5 rounded border" style={{ color: '#1E8A4C', borderColor: '#1E8A4C' }}>Excel</span>}
                      {dataset.json_url && <span className="text-xs px-2 py-0.5 rounded border" style={{ color: '#7C3AED', borderColor: '#7C3AED' }}>JSON</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEdit(dataset)}
                      className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      style={{ color: 'var(--blue)' }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteDataset(dataset.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      style={{ color: '#C0392B' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}