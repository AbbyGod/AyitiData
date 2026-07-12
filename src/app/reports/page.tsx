'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { FileText, ExternalLink, Search, X } from 'lucide-react'

const CATEGORIES = [
  'All', 'Economy', 'Health', 'Education',
  'Population', 'Agriculture', 'Environment', 'Politics', 'Other'
]

const categoryColors: Record<string, { bg: string; color: string }> = {
  Economy: { bg: '#E6F5ED', color: '#1E8A4C' },
  Health: { bg: '#FDE8E8', color: '#C0392B' },
  Education: { bg: '#FFF3E0', color: '#E8A020' },
  Population: { bg: '#E8F0FC', color: '#1A56A0' },
  Agriculture: { bg: '#F3E8FF', color: '#7C3AED' },
  Environment: { bg: '#E0F7F4', color: '#0D9488' },
  Politics: { bg: '#FFF1F2', color: '#E11D48' },
  Other: { bg: '#F4F7FB', color: '#6B7A90' },
}



export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [embedded, setEmbedded] = useState<any | null>(null)

  useEffect(() => {
    async function loadReports() {
      const supabase = createClient()
      const { data } = await supabase
        .from('reports')
        .select('*')
        .order('year', { ascending: false })
      setReports(data || [])
      setLoading(false)
    }
    loadReports()
  }, [])

  const filtered = reports.filter(r => {
    const matchSearch = search === '' ||
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.organization?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || r.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-sora text-4xl font-bold text-white mb-3">
              Reports & Official Documents
            </h1>
            <p className="text-white/70 text-lg max-w-xl mb-8">
              Official reports from government agencies, international organizations,
              and research institutions — linked directly from their original sources.
            </p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search reports by title, organization, topic..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm outline-none shadow-sm"
                style={{ color: 'var(--text)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* EMBED VIEWER */}
      {embedded && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-sora font-bold text-base" style={{ color: 'var(--navy)' }}>
                  {embedded.title}
                </h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  {embedded.organization} · {embedded.year}
                </p>
              </div>
              <div className="flex items-center gap-3">
                
                <a  href={embedded.embed_url || embedded.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--blue)', borderColor: 'var(--border)' }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Original
                </a>
                <button
                  onClick={() => setEmbedded(null)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  style={{ color: 'var(--muted)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              {embedded.pdf_url ? (
                <iframe
                  src={embedded.pdf_url}
                  className="w-full h-full border-none"
                  title={embedded.title}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                  <FileText className="w-16 h-16" style={{ color: 'var(--muted)' }} />
                  <h4 className="font-sora font-bold text-lg" style={{ color: 'var(--navy)' }}>
                    View on original source
                  </h4>
                  <p className="text-sm max-w-md" style={{ color: 'var(--muted)' }}>
                    This report is hosted on {embedded.organization}'s official website.
                    Click the button below to view it directly from the source.
                  </p>
                  
                  <a  href={embedded.embed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: 'var(--navy)' }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open {embedded.organization} Report
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* CATEGORY FILTERS */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={category === cat
                ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LEGAL NOTE */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-8 flex gap-3">
          <span className="text-lg flex-shrink-0">ℹ️</span>
          <p className="text-sm" style={{ color: '#1A56A0' }}>
            All reports on this page are linked directly from their original sources —
            government agencies, international organizations, and research institutions.
            Ayiti Data does not host or reproduce these documents.
          </p>
        </div>

        {/* REPORTS GRID */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>
              No reports found
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((report, i) => {
              const cat = categoryColors[report.category] || categoryColors.Other
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col hover:shadow-md transition-all"
                >
                  {/* ICON + CATEGORY */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: cat.bg }}>
                      <FileText className="w-6 h-6" style={{ color: cat.color }} />
                    </div>
                    <div className="flex items-center gap-2">
                      {report.year && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--light)', color: 'var(--muted)' }}>
                          {report.year}
                        </span>
                      )}
                      {report.category && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: cat.bg, color: cat.color }}>
                          {report.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* TITLE + ORG */}
                  <h3 className="font-sora font-bold text-base mb-1 leading-snug"
                    style={{ color: 'var(--navy)' }}>
                    {report.title}
                  </h3>
                  <p className="text-xs font-semibold mb-3" style={{ color: 'var(--blue)' }}>
                    {report.organization}
                  </p>
                  <p className="text-sm leading-relaxed flex-1 mb-5"
                    style={{ color: 'var(--muted)' }}>
                    {report.description}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => setEmbedded(report)}
                      className="flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors hover:bg-gray-50"
                      style={{ color: 'var(--navy)', borderColor: 'var(--border)' }}
                    >
                      View Report
                    </button>
                    
                     <a href={report.embed_url || report.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border transition-colors hover:bg-gray-50"
                      style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
                      title="Open original source"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}