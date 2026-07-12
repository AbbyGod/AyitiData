'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import {
  Database, Download, Search, Filter,
  FileText, Table, Code, ArrowRight
} from 'lucide-react'

const CATEGORIES = [
  'All', 'Population', 'Education', 'Economy',
  'Health', 'Agriculture', 'Environment', 'Politics', 'Other'
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


export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('search')
    if (q) setSearch(q)
  }, [])

  useEffect(() => {
    async function loadDatasets() {
      const supabase = createClient()
      const { data } = await supabase
        .from('datasets')
        .select('*')
        .order('created_at', { ascending: false })

      // Show dataset added on supabase
    setDatasets(data || [])
      setLoading(false)
    }
    loadDatasets()
  }, [])

  async function handleDownload(dataset: any, format: string) {
    const supabase = createClient()
    // Log the download
    await supabase.from('downloads').insert({
      dataset_id: dataset.id,
      created_at: new Date().toISOString(),
    })
    // Increment download count
    await supabase
      .from('datasets')
      .update({ download_count: (dataset.download_count || 0) + 1 })
      .eq('id', dataset.id)

    // Open file
    const url = format === 'csv' ? dataset.csv_url
      : format === 'excel' ? dataset.excel_url
      : dataset.json_url
    if (url && url !== '#') window.open(url, '_blank')
  }


  const filtered = datasets.filter(d => {
    const matchSearch = search === '' ||
      d.title?.toLowerCase().includes(search.toLowerCase()) ||
      d.description?.toLowerCase().includes(search.toLowerCase()) ||
      d.source?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || d.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* PAGE HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-sora text-4xl font-bold text-white mb-3">
              Datasets
            </h1>
            <p className="text-white/70 text-lg max-w-xl mb-8">
              Clean, documented data about Haiti — free to download in CSV, Excel, or JSON.
            </p>

            {/* SEARCH */}
            
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search datasets by title, source, topic..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm outline-none shadow-sm"
                style={{ color: 'var(--text)' }}
              />
              
            </div>
          </motion.div>
          
        </div>
        
      </div>

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

        {/* RESULTS COUNT */}
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {filtered.length} dataset{filtered.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
          {category !== 'All' && ` in ${category}`}
        </p>

        {/* DATASETS GRID */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Database className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>
              No datasets found
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Try a different search term or category.
            </p>
            <button
              onClick={() => { setSearch(''); setCategory('All') }}
              className="text-sm font-semibold hover:underline"
              style={{ color: 'var(--blue)' }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((dataset, i) => {
              const cat = categoryColors[dataset.category] || categoryColors.Other
              return (
                <motion.div
                  key={dataset.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">

                      {/* CATEGORY + TITLE */}
                      <div className="flex items-center gap-2 mb-2">
                        {dataset.category && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: cat.bg, color: cat.color }}>
                            {dataset.category}
                          </span>
                        )}
                      </div>
                      <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>
                        {dataset.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                        {dataset.description}
                      </p>

                      {/* META */}
                      <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
                        {dataset.source && (
                          <span>Source: <strong style={{ color: 'var(--text)' }}>{dataset.source}</strong></span>
                        )}
                        {dataset.last_updated && (
                          <span>Updated: <strong style={{ color: 'var(--text)' }}>
                            {new Date(dataset.last_updated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </strong></span>
                        )}
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          <strong style={{ color: 'var(--text)' }}>{(dataset.download_count || 0).toLocaleString()}</strong> downloads
                        </span>
                      </div>
                    </div>

                    {/* DOWNLOAD BUTTONS */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {dataset.csv_url && (
                        <button
                          onClick={() => handleDownload(dataset, 'csv')}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:bg-blue-50"
                          style={{ color: '#1A56A0', borderColor: '#1A56A0' }}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          CSV
                        </button>
                      )}
                      {dataset.excel_url && (
                        <button
                          onClick={() => handleDownload(dataset, 'excel')}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:bg-green-50"
                          style={{ color: '#1E8A4C', borderColor: '#1E8A4C' }}
                        >
                          <Table className="w-3.5 h-3.5" />
                          Excel
                        </button>
                      )}
                      {dataset.json_url && (
                        <button
                          onClick={() => handleDownload(dataset, 'json')}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:bg-purple-50"
                          style={{ color: '#7C3AED', borderColor: '#7C3AED' }}
                        >
                          <Code className="w-3.5 h-3.5" />
                          JSON
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* REQUEST DATASET CTA */}
        <div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        >
          <h3 className="font-sora text-xl font-bold text-white mb-2">
            Can't find the data you need?
          </h3>
          <p className="text-white/70 text-sm mb-6">
            Submit a request and our team will try to find or prepare it for you.
          </p>
          
          <a  href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
          >
            Request a Dataset <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  )
  
}