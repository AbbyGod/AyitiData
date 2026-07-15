'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Search, BookOpen } from 'lucide-react'

const CATEGORIES = [
  'All', 'Economy', 'Health', 'Demography',
  'Education', 'Agriculture', 'Politics', 'Environment', 'Other'
]

const categoryColors: Record<string, { bg: string; color: string }> = {
  Economy: { bg: '#E6F5ED', color: '#1E8A4C' },
  Health: { bg: '#FDE8E8', color: '#C0392B' },
  Demography: { bg: '#E8F0FC', color: '#1A56A0' },
  Education: { bg: '#FFF3E0', color: '#E8A020' },
  Agriculture: { bg: '#F3E8FF', color: '#7C3AED' },
  Politics: { bg: '#FFF1F2', color: '#E11D48' },
  Environment: { bg: '#E0F7F4', color: '#0D9488' },
  Other: { bg: '#F4F7FB', color: '#6B7A90' },
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function GlossaryPage() {
  const [terms, setTerms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [letter, setLetter] = useState('All')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('glossary')
        .select('*')
        .order('term', { ascending: true })
      
      // Now strictly sets the fetched data, defaulting to an empty array if nothing is found
      setTerms(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = terms.filter(t => {
    const matchSearch = search === '' ||
      t.term?.toLowerCase().includes(search.toLowerCase()) ||
      t.definition?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || t.category === category
    const matchLetter = letter === 'All' || t.term?.toUpperCase().startsWith(letter)
    return matchSearch && matchCategory && matchLetter
  })

  // Group by first letter
  const grouped = filtered.reduce((acc: Record<string, any[]>, term) => {
    const l = term.term?.charAt(0).toUpperCase() || '#'
    if (!acc[l]) acc[l] = []
    acc[l].push(term)
    return acc
  }, {})

  const availableLetters = Object.keys(grouped).sort()

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Glossary</h1>
            <p className="text-white/70 text-lg max-w-xl mb-8">
              Key terms in finance, health, demography, education and more —
              explained simply so anyone can understand Haiti's data.
            </p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setLetter('All') }}
                placeholder="Search terms and definitions..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm outline-none shadow-sm"
                style={{ color: 'var(--text)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR FILTERS */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-5">

              {/* CATEGORY FILTER */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h4 className="font-sora font-bold text-sm mb-3" style={{ color: 'var(--navy)' }}>
                  Category
                </h4>
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setCategory(cat)}
                      className="text-left px-3 py-2 rounded-lg text-sm transition-colors"
                      style={category === cat
                        ? { background: 'var(--navy)', color: 'white', fontWeight: 600 }
                        : { color: 'var(--muted)' }
                      }>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* ALPHABET FILTER */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h4 className="font-sora font-bold text-sm mb-3" style={{ color: 'var(--navy)' }}>
                  Browse A–Z
                </h4>
                <div className="flex flex-wrap gap-1">
                  <button onClick={() => setLetter('All')}
                    className="w-8 h-8 rounded-lg text-xs font-bold transition-colors"
                    style={letter === 'All'
                      ? { background: 'var(--navy)', color: 'white' }
                      : { background: 'var(--light)', color: 'var(--muted)' }
                    }>
                    All
                  </button>
                  {ALPHABET.map(l => (
                    <button key={l} onClick={() => setLetter(l)}
                      className="w-8 h-8 rounded-lg text-xs font-bold transition-colors"
                      style={letter === l
                        ? { background: 'var(--navy)', color: 'white' }
                        : availableLetters.includes(l)
                          ? { background: 'var(--light)', color: 'var(--text)' }
                          : { background: 'transparent', color: 'var(--border)' }
                      }
                      disabled={!availableLetters.includes(l) && letter !== l}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* TERMS LIST */}
          <div className="lg:col-span-3">
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              {filtered.length} term{filtered.length !== 1 ? 's' : ''} found
              {search && ` for "${search}"`}
            </p>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
                <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>
                  No terms found
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                  Try a different search or category.
                </p>
                <button onClick={() => { setSearch(''); setCategory('All'); setLetter('All') }}
                  className="text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {Object.keys(grouped).sort().map(l => (
                  <div key={l}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-sora font-bold text-lg text-white flex-shrink-0"
                        style={{ background: 'var(--navy)' }}>
                        {l}
                      </div>
                      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                    </div>
                    <div className="flex flex-col gap-3">
                      {grouped[l].map((term: any, i: number) => {
                        const cat = categoryColors[term.category] || categoryColors.Other
                        return (
                          <motion.div key={term.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.03 }}
                            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="font-sora font-bold text-base"
                                style={{ color: 'var(--navy)' }}>
                                {term.term}
                              </h3>
                              {term.category && (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                                  style={{ background: cat.bg, color: cat.color }}>
                                  {term.category}
                                </span>
                              )}
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                              {term.definition}
                            </p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}