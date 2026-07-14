'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Clock, Eye, ArrowRight, BookOpen } from 'lucide-react'

const CATEGORIES = [
  'All', 'Education', 'Economy', 'Health',
  'Population', 'Agriculture', 'Environment', 'Politics', 'Other'
]

const categoryColors: Record<string, { bg: string; color: string }> = {
  Education: { bg: '#FFF3E0', color: '#E8A020' },
  Economy: { bg: '#E6F5ED', color: '#1E8A4C' },
  Health: { bg: '#FDE8E8', color: '#C0392B' },
  Population: { bg: '#E8F0FC', color: '#1A56A0' },
  Agriculture: { bg: '#F3E8FF', color: '#7C3AED' },
  Environment: { bg: '#E0F7F4', color: '#0D9488' },
  Politics: { bg: '#FFF1F2', color: '#E11D48' },
  Other: { bg: '#F4F7FB', color: '#6B7A90' },
}

const emojis: Record<string, string> = {
  Education: '📚', Economy: '📈', Health: '🏥',
  Population: '🗺️', Agriculture: '🌾', Environment: '🌿',
  Politics: '🏛️', Other: '📊',
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('articles')
        .select('*, profiles(name)')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
      
      // Now strictly sets the fetched data, defaulting to an empty array if nothing is found
      setInsights(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = insights.filter(item => {
    const matchSearch = search === '' ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.summary?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || item.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Insights</h1>
            <p className="text-white/70 text-lg max-w-xl mb-8">
              Data-driven analyses and reports on Haiti — education, economy, health, population, and more.
            </p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search insights..."
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
            <button key={cat} onClick={() => setCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={category === cat
                ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }
              }>
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {filtered.length} insight{filtered.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
          {category !== 'All' && ` in ${category}`}
        </p>

        {/* INSIGHTS GRID */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>No insights found</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Try a different search or category.</p>
            <button onClick={() => { setSearch(''); setCategory('All') }}
              className="text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((insight, i) => {
              const cat = categoryColors[insight.category] || categoryColors.Other
              const emoji = emojis[insight.category] || '📊'
              return (
                <motion.div key={insight.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <Link href={`/insights/${insight.slug}`}
                    className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group h-full">

                    {/* EMOJI BANNER */}
                    <div className="h-32 flex items-center justify-center text-5xl"
                      style={{ background: cat.bg }}>
                      {emoji}
                    </div>

                    <div className="p-5 flex flex-col h-full">
                      {/* CATEGORY + META */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: cat.bg, color: cat.color }}>
                          {insight.category}
                        </span>
                        {insight.reading_time && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                            <Clock className="w-3 h-3" /> {insight.reading_time} min read
                          </span>
                        )}
                      </div>

                      {/* TITLE */}
                      <h3 className="font-sora font-bold text-base leading-snug mb-2"
                        style={{ color: 'var(--navy)' }}>
                        {insight.title}
                      </h3>

                      {/* SUMMARY */}
                      {insight.summary && (
                        <p className="text-sm leading-relaxed mb-4 flex-1"
                          style={{ color: 'var(--muted)' }}>
                          {insight.summary}
                        </p>
                      )}

                      {/* FOOTER */}
                      <div className="flex items-center justify-between text-xs mt-auto pt-3 border-t border-gray-100"
                        style={{ color: 'var(--muted)' }}>
                        <div className="flex items-center gap-3">
                          {insight.published_at && (
                            <span>{new Date(insight.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          )}
                          {insight.profiles?.name && (
                            <span>· {insight.profiles.name}</span>
                          )}
                        </div>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {(insight.view_count || 0).toLocaleString()}
                        </span>
                      </div>

                      {/* READ MORE */}
                      <div className="flex items-center gap-1 mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--blue)' }}>
                        Read insight <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}