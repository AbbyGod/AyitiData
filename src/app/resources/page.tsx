'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Database, FileText, Download, Search, ExternalLink, X } from 'lucide-react'

const CATEGORIES = [
  'All', 'Population', 'Education', 'Economy',
  'Health', 'Agriculture', 'Environment', 'Politics', 'Other'
]

const TYPES = ['All', 'Datasets', 'Reports']

const categoryColors: Record<string, { bg: string; color: string }> = {
  Population: { bg: '#E8F0FC', color: '#1A56A0' },
  Education: { bg: '#FFF3E0', color: '#E8A020' },
  Economy: { bg: '#E6F5ED', color: '#1E8A4C' },
  Health: { bg: '#FDE8E8', color: '#C0392B' },
  Agriculture: { bg: '#F3E8FF', color: '#7C3AED' },
  Environment: { bg: '#E0F7F4', color: '#0D9488' },
  Politics: { bg: '#FFF1F2', color: '#E11D48' },
  Humanitarian: { bg: '#FFF8E1', color: '#E8A020' },
  Other: { bg: '#F4F7FB', color: '#6B7A90' },
}

const demoDatasets = [
  { id: 'd1', type: 'dataset', title: 'Haiti Population 2020–2024', description: 'Population estimates by year, department and municipality.', source: 'World Bank', category: 'Population', csv_url: '#', excel_url: '#', json_url: '#', download_count: 1240, last_updated: '2024-05-12T00:00:00Z' },
  { id: 'd2', type: 'dataset', title: 'Education Statistics 2016–2023', description: 'School enrollment, teachers, and schools by department.', source: 'MENFP', category: 'Education', csv_url: '#', excel_url: '#', json_url: null, download_count: 890, last_updated: '2024-04-30T00:00:00Z' },
  { id: 'd3', type: 'dataset', title: 'Inflation Data 2010–2024', description: 'Monthly inflation rate and consumer price index.', source: 'IHSI', category: 'Economy', csv_url: '#', excel_url: '#', json_url: null, download_count: 2100, last_updated: '2024-05-05T00:00:00Z' },
  { id: 'd4', type: 'dataset', title: 'Health Facilities by Region', description: 'Hospital locations, bed counts and service availability by commune.', source: 'MSPP', category: 'Health', csv_url: '#', excel_url: '#', json_url: '#', download_count: 670, last_updated: '2024-03-18T00:00:00Z' },
  { id: 'd5', type: 'dataset', title: 'GDP & Trade 1990–2023', description: 'Annual GDP, imports, exports and public debt data.', source: 'BRH / IMF', category: 'Economy', csv_url: '#', excel_url: '#', json_url: null, download_count: 1560, last_updated: '2024-04-10T00:00:00Z' },
  { id: 'd6', type: 'dataset', title: 'Agricultural Production 2005–2022', description: 'Crop yield, cultivated land area and food security indicators.', source: 'MARNDR', category: 'Agriculture', csv_url: '#', excel_url: '#', json_url: null, download_count: 430, last_updated: '2024-02-22T00:00:00Z' },
]

const demoReports = [
  { id: 'r1', type: 'report', title: 'Haiti Economic Update 2024', description: 'Annual assessment of Haiti\'s economic situation including GDP, inflation and fiscal outlook.', organization: 'World Bank', category: 'Economy', year: 2024, embed_url: 'https://worldbank.org', pdf_url: null },
  { id: 'r2', type: 'report', title: 'Haiti Humanitarian Response Plan 2024', description: 'Comprehensive humanitarian needs covering food security, health, shelter and protection.', organization: 'OCHA', category: 'Other', year: 2024, embed_url: 'https://unocha.org', pdf_url: null },
  { id: 'r3', type: 'report', title: 'Education Sector Analysis Haiti', description: 'Detailed analysis of Haiti\'s education system including enrollment and policy recommendations.', organization: 'UNESCO', category: 'Education', year: 2023, embed_url: 'https://unesco.org', pdf_url: null },
]

export default function ResourcesPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All')
  const [embedded, setEmbedded] = useState<any | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const [{ data: datasets }, { data: reports }] = await Promise.all([
        supabase.from('datasets').select('*').order('created_at', { ascending: false }),
        supabase.from('reports').select('*').order('year', { ascending: false }),
      ])
      const ds = (datasets && datasets.length > 0 ? datasets : demoDatasets).map((d: any) => ({ ...d, type: 'dataset' }))
      const rs = (reports && reports.length > 0 ? reports : demoReports).map((r: any) => ({ ...r, type: 'report' }))
      setItems([...ds, ...rs])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = items.filter(item => {
    const matchSearch = search === '' ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.source?.toLowerCase().includes(search.toLowerCase()) ||
      item.organization?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || item.category === category
    const matchType = type === 'All' ||
      (type === 'Datasets' && item.type === 'dataset') ||
      (type === 'Reports' && item.type === 'report')
    return matchSearch && matchCategory && matchType
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Resources</h1>
            <p className="text-white/70 text-lg max-w-xl mb-8">
              All datasets and official reports in one place — download data or explore documents from trusted sources.
            </p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by title, source, organization, topic..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm outline-none shadow-sm"
                style={{ color: 'var(--text)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* REPORT EMBED MODAL */}
      {embedded && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl flex flex-col overflow-hidden shadow-2xl" style={{ maxHeight: '85vh' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-sora font-bold text-base" style={{ color: 'var(--navy)' }}>{embedded.title}</h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{embedded.organization} · {embedded.year}</p>
              </div>
              <div className="flex items-center gap-3">
                <a href={embedded.embed_url || embedded.pdf_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border hover:bg-gray-50"
                  style={{ color: 'var(--blue)', borderColor: 'var(--border)' }}>
                  <ExternalLink className="w-3.5 h-3.5" /> Open Original
                </a>
                <button onClick={() => setEmbedded(null)} className="p-2 rounded-xl hover:bg-gray-100" style={{ color: 'var(--muted)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              {embedded.pdf_url ? (
                <iframe src={embedded.pdf_url} className="w-full h-full border-none" title={embedded.title} style={{ minHeight: '60vh' }} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center" style={{ minHeight: '40vh' }}>
                  <FileText className="w-16 h-16" style={{ color: 'var(--muted)' }} />
                  <h4 className="font-sora font-bold text-lg" style={{ color: 'var(--navy)' }}>View on original source</h4>
                  <p className="text-sm max-w-md" style={{ color: 'var(--muted)' }}>
                    This report is hosted on {embedded.organization}'s official website.
                  </p>
                  <a href={embedded.embed_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90"
                    style={{ background: 'var(--navy)' }}>
                    <ExternalLink className="w-4 h-4" /> Open {embedded.organization} Report
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* TYPE */}
          <div className="flex gap-2">
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
                style={type === t
                  ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                  : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }
                }>
                {t}
              </button>
            ))}
          </div>
          <div className="w-px bg-gray-200" />
          {/* CATEGORY */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
                style={category === cat
                  ? { background: '#1A56A0', color: 'white', borderColor: '#1A56A0' }
                  : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }
                }>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {filtered.length} resource{filtered.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
        </p>

        {/* LEGAL NOTE */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 mb-8 flex gap-3">
          <span className="text-base flex-shrink-0">ℹ️</span>
          <p className="text-xs" style={{ color: '#1A56A0' }}>
            Reports are linked directly from their original sources. Ayiti Data does not host or reproduce official documents.
            Datasets marked with download buttons are cleaned versions prepared by our team.
          </p>
        </div>

        {/* ITEMS LIST */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Database className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>No resources found</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Try a different search or filter.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); setType('All') }}
              className="text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((item, i) => {
              const cat = categoryColors[item.category] || categoryColors.Other
              const isDataset = item.type === 'dataset'
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {/* TYPE BADGE */}
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={isDataset
                            ? { background: '#E8F0FC', color: '#1A56A0' }
                            : { background: '#E6F5ED', color: '#1E8A4C' }}>
                          {isDataset ? 'Dataset' : 'Report'}
                        </span>
                        {item.category && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: cat.bg, color: cat.color }}>
                            {item.category}
                          </span>
                        )}
                        {!isDataset && item.year && (
                          <span className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: 'var(--light)', color: 'var(--muted)' }}>
                            {item.year}
                          </span>
                        )}
                      </div>
                      <h3 className="font-sora font-bold text-base mb-1" style={{ color: 'var(--navy)' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
                        {isDataset && item.source && (
                          <span>Source: <strong style={{ color: 'var(--text)' }}>{item.source}</strong></span>
                        )}
                        {!isDataset && item.organization && (
                          <span className="font-semibold" style={{ color: 'var(--blue)' }}>{item.organization}</span>
                        )}
                        {isDataset && item.last_updated && (
                          <span>Updated: <strong style={{ color: 'var(--text)' }}>
                            {new Date(item.last_updated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </strong></span>
                        )}
                        {isDataset && (
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            <strong style={{ color: 'var(--text)' }}>{(item.download_count || 0).toLocaleString()}</strong> downloads
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {isDataset ? (
                        <>
                          {item.csv_url && (
                            <button onClick={() => item.csv_url !== '#' && window.open(item.csv_url, '_blank')}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:bg-blue-50"
                              style={{ color: '#1A56A0', borderColor: '#1A56A0' }}>
                              <FileText className="w-3.5 h-3.5" /> CSV
                            </button>
                          )}
                          {item.excel_url && (
                            <button onClick={() => item.excel_url !== '#' && window.open(item.excel_url, '_blank')}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:bg-green-50"
                              style={{ color: '#1E8A4C', borderColor: '#1E8A4C' }}>
                              <Database className="w-3.5 h-3.5" /> Excel
                            </button>
                          )}
                          {item.json_url && (
                            <button onClick={() => item.json_url !== '#' && window.open(item.json_url, '_blank')}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:bg-purple-50"
                              style={{ color: '#7C3AED', borderColor: '#7C3AED' }}>
                              <FileText className="w-3.5 h-3.5" /> JSON
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={() => setEmbedded(item)}
                            className="px-4 py-2 rounded-xl text-sm font-semibold border hover:bg-gray-50 transition-colors"
                            style={{ color: 'var(--navy)', borderColor: 'var(--border)' }}>
                            View Report
                          </button>
                          <a href={item.embed_url || item.pdf_url} target="_blank" rel="noopener noreferrer"
                            className="p-2 rounded-xl border hover:bg-gray-50 transition-colors"
                            style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
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