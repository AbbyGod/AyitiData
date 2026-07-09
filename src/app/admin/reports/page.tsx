'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, Plus, FileText, Trash2, Edit, ExternalLink, X, Save } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  'Economy', 'Health', 'Education', 'Population',
  'Agriculture', 'Environment', 'Politics', 'Other'
]

const emptyForm = {
  title: '',
  organization: '',
  category: '',
  year: new Date().getFullYear(),
  description: '',
  embed_url: '',
  pdf_url: '',
}

export default function ReportsAdminPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<any>(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadReports() }, [])

  async function loadReports() {
    const supabase = createClient()
    const { data } = await supabase
      .from('reports')
      .select('*')
      .order('year', { ascending: false })
    setReports(data || [])
    setLoading(false)
  }

  function openNew() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  function openEdit(report: any) {
    setForm({
      title: report.title || '',
      organization: report.organization || '',
      category: report.category || '',
      year: report.year || new Date().getFullYear(),
      description: report.description || '',
      embed_url: report.embed_url || '',
      pdf_url: report.pdf_url || '',
    })
    setEditingId(report.id)
    setShowForm(true)
  }

  async function saveReport() {
    if (!form.title.trim()) { alert('Please add a title.'); return }
    setSaving(true)
    const supabase = createClient()
    if (editingId) {
      await supabase.from('reports').update(form).eq('id', editingId)
    } else {
      await supabase.from('reports').insert(form)
    }
    setSaving(false)
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    loadReports()
  }

  async function deleteReport(id: string) {
    if (!confirm('Delete this report?')) return
    const supabase = createClient()
    await supabase.from('reports').delete().eq('id', id)
    setReports(reports.filter(r => r.id !== id))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--muted)' }}>
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>
              Reports
            </h1>
          </div>
          <button onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--navy)' }}>
            <Plus className="w-4 h-4" /> Add Report
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">

        {/* FORM */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sora font-bold text-lg" style={{ color: 'var(--navy)' }}>
                {editingId ? 'Edit Report' : 'Add New Report'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" style={{ color: 'var(--muted)' }} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Title *</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Haiti Economic Update 2024"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Organization *</label>
                <input type="text" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })}
                  placeholder="World Bank, OCHA, UNESCO..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                  <option value="">Select...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Year</label>
                <input type="number" value={form.year} onChange={e => setForm({ ...form, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Source URL (official page)
                </label>
                <input type="text" value={form.embed_url} onChange={e => setForm({ ...form, embed_url: e.target.value })}
                  placeholder="https://worldbank.org/..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  PDF Direct URL (for embedding)
                </label>
                <input type="text" value={form.pdf_url} onChange={e => setForm({ ...form, pdf_url: e.target.value })}
                  placeholder="https://.../.pdf (optional)"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="What does this report cover?"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-5 border-t border-gray-100">
              <button onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50"
                style={{ color: 'var(--muted)' }}>
                Cancel
              </button>
              <button onClick={saveReport} disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: 'var(--navy)' }}>
                {saving
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Save className="w-4 h-4" />}
                {editingId ? 'Update' : 'Save Report'}
              </button>
            </div>
          </div>
        )}

        {/* LIST */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>No reports yet</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              Add links to official government and international organization reports.
            </p>
            <button onClick={openNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--navy)' }}>
              <Plus className="w-4 h-4" /> Add First Report
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {reports.map(report => (
              <div key={report.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--light)' }}>
                  <FileText className="w-5 h-5" style={{ color: 'var(--blue)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--navy)' }}>
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
                    <span>{report.organization}</span>
                    {report.year && <><span>·</span><span>{report.year}</span></>}
                    {report.category && <><span>·</span><span>{report.category}</span></>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {(report.embed_url || report.pdf_url) && (
                    <a href={report.embed_url || report.pdf_url}
                      target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      style={{ color: 'var(--muted)' }}>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button onClick={() => openEdit(report)}
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ color: 'var(--blue)' }}>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteReport(report.id)}
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