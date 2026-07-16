'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Search, Clock, Eye, ArrowRight, BookOpen } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// UI translation dictionary
const UI_MAP: Record<string, Record<string, string>> = {
  'Insights': { en: 'Insights', fr: 'Analyses', ht: 'Analiz' },
  'HeroDesc': { 
    en: 'Data-driven analyses and reports on Haiti: Education, Economy, Health, Population, and more.', 
    fr: 'Analyses et rapports basés sur des données concernant Haïti:  Éducation, Économie, Santé, Population, et plus.', 
    ht: 'Analiz ak rapò ki baze sou done sou Ayiti: Edikasyon, Ekonomi, Sante, Popilasyon, ak plis ankò.' 
  },
  'SearchPlaceholder': { en: 'Search insights...', fr: 'Rechercher des analyses...', ht: 'Chèche analiz...' },
  'found': { en: 'insight(s) found', fr: 'analyse(s) trouvée(s)', ht: 'analiz yo jwenn' },
  'No insights found': { en: 'No insights found', fr: 'Aucune analyse trouvée', ht: 'Pa jwenn okenn analiz' },
  'Try a different search or category.': { en: 'Try a different search or category.', fr: 'Essayez une autre recherche ou catégorie.', ht: 'Eseye yon lòt rechèch oswa kategori.' },
  'Clear filters': { en: 'Clear filters', fr: 'Effacer les filtres', ht: 'Efase filtè yo' },
  'Read insight': { en: 'Read insight', fr: 'Lire l\'analyse', ht: 'Li analiz la' },
  'min read': { en: 'min read', fr: 'min de lecture', ht: 'minit pou li' }
}

// Unified Categories
const CATEGORY_MAP: Record<string, Record<string, string>> = {
  'All': { en: 'All', fr: 'Tous', ht: 'Tout' },
  'Population': { en: 'Population', fr: 'Population', ht: 'Popilasyon' },
  'Education': { en: 'Education', fr: 'Éducation', ht: 'Edikasyon' },
  'Economy': { en: 'Economy', fr: 'Économie', ht: 'Ekonomi' },
  'Health': { en: 'Health', fr: 'Santé', ht: 'Sante' },
  'Agriculture': { en: 'Agriculture', fr: 'Agriculture', ht: 'Agrikilti' },
  'Humanitarian': { en: 'Humanitarian', fr: 'Humanitaire', ht: 'Èd Imanitè' },
  'Politics': { en: 'Politics', fr: 'Politique', ht: 'Politik' },
  'Other': { en: 'Other', fr: 'Autre', ht: 'Lòt' }
}


const CATEGORIES = ['All', 'Population', 'Education', 'Economy', 'Health', 'Agriculture', 'Humanitarian', 'Politics', 'Other']

const categoryColors: Record<string, { bg: string; color: string }> = {
  Population: { bg: '#E8F0FC', color: '#1A56A0' }, Education: { bg: '#FFF3E0', color: '#E8A020' },
  Economy: { bg: '#E6F5ED', color: '#1E8A4C' }, Health: { bg: '#FDE8E8', color: '#C0392B' },
  Agriculture: { bg: '#F3E8FF', color: '#7C3AED' }, Humanitarian: { bg: '#E0F7F4', color: '#0D9488' },
  Politics: { bg: '#FFF1F2', color: '#E11D48' }, Other: { bg: '#F4F7FB', color: '#6B7A90' }
}


export default function InsightsPage() {
  const [insights, setInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const { lang } = useLanguage()
  const currentLanguage = lang || 'en'

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()
      const { data } = await supabase
        .from('articles')
        .select('*, profiles(name)')
        .eq('status', 'published')
        .eq('language', currentLanguage)
        .order('published_at', { ascending: false })
      
      setInsights(data || [])
      setLoading(false)
    }
    load()
  }, [currentLanguage])

  const filtered = insights.filter(item => {
    const matchSearch = search === '' || item.title?.toLowerCase().includes(search.toLowerCase()) || item.summary?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || item.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">{UI_MAP['Insights'][currentLanguage]}</h1>
            <p className="text-white/70 text-lg max-w-xl mb-8">{UI_MAP['HeroDesc'][currentLanguage]}</p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={UI_MAP['SearchPlaceholder'][currentLanguage]} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm outline-none shadow-sm" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={category === cat ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' } : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }}>
              {CATEGORY_MAP[cat][currentLanguage]}
            </button>
          ))}
        </div>

        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {filtered.length} {UI_MAP['found'][currentLanguage]}
        </p>

        {loading ? <div className="py-20 text-center">...</div> : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-sora font-bold text-lg mb-2 text-navy">{UI_MAP['No insights found'][currentLanguage]}</h3>
            <p className="text-sm mb-4 text-gray-500">{UI_MAP['Try a different search or category.'][currentLanguage]}</p>
            <button onClick={() => { setSearch(''); setCategory('All') }} className="text-sm font-semibold hover:underline text-blue-600">{UI_MAP['Clear filters'][currentLanguage]}</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((insight, i) => {
              const cat = categoryColors[insight.category] || categoryColors.Other
              return (
                <motion.div key={insight.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <a href={`/insights/${insight.slug}`} className="block bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: cat.bg, color: cat.color }}>
                        {CATEGORY_MAP[insight.category][currentLanguage]}
                      </span>
                      {insight.reading_time && <span className="text-xs text-gray-400">{insight.reading_time} {UI_MAP['min read'][currentLanguage]}</span>}
                    </div>
                    <h3 className="font-sora font-bold text-base mb-2 text-navy">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{insight.summary}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t">
                      <span>{new Date(insight.published_at).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {insight.view_count}</span>
                    </div>
                  </a>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}