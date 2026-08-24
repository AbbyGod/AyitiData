'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Database, FileText, Download, Search, ExternalLink, X } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// --- MAPPINGS (Add to your top-level constants) ---
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
const TYPES = ['All', 'Datasets', 'Reports']

const categoryColors: Record<string, { bg: string; color: string }> = {
  Population: { bg: '#E8F0FC', color: '#1A56A0' }, Education: { bg: '#FFF3E0', color: '#E8A020' },
  Economy: { bg: '#E6F5ED', color: '#1E8A4C' }, Health: { bg: '#FDE8E8', color: '#C0392B' },
  Agriculture: { bg: '#F3E8FF', color: '#7C3AED' }, Humanitarian: { bg: '#E0F7F4', color: '#0D9488' },
  Politics: { bg: '#FFF1F2', color: '#E11D48' }, Other: { bg: '#F4F7FB', color: '#6B7A90' }
}

export default function ResourcesPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All')
  const [embedded, setEmbedded] = useState<any | null>(null)

  const { lang } = useLanguage()
  const currentLanguage = lang || 'en'

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()
      const [{ data: datasets }, { data: reports }] = await Promise.all([
        supabase.from('datasets').select('*').eq('language', currentLanguage),
        supabase.from('reports').select('*').eq('language', currentLanguage),
      ])
      const ds = (datasets || []).map((d: any) => ({ ...d, type: 'dataset' }))
      const rs = (reports || []).map((r: any) => ({ ...r, type: 'report' }))
      setItems([...ds, ...rs])
      setLoading(false)
    }
    load()
  }, [currentLanguage])

  const filtered = items.filter(item => {
    const matchSearch = search === '' || item.title?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || item.category === category
    const matchType = type === 'All' || (type === 'Datasets' && item.type === 'dataset') || (type === 'Reports' && item.type === 'report')
    return matchSearch && matchCategory && matchType
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section ... */}
      
      <div className="max-w-7xl mx-auto px-4 py-10">
      {/* FILTERS & TYPE TOGGLE */}
        <div className="flex flex-col gap-6 mb-10">
          {/* TYPE TOGGLE */}
          <div className="flex gap-2">
            {TYPES.map(t => (
              <button 
                key={t} 
                onClick={() => setType(t)} 
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all border ${
                  type === t ? 'bg-[#0D2B52] text-white border-[#0D2B52]' : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* CATEGORIES */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)} 
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all border ${
                  category === cat ? 'bg-[#1A56A0] text-white' : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                {CATEGORY_MAP[cat][currentLanguage]}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid (Square Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const catStyle = categoryColors[item.category] || categoryColors.Other
            return (
              <motion.div key={item.id} className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold mb-3 w-fit" style={{ background: catStyle.bg, color: catStyle.color }}>
                  {CATEGORY_MAP[item.category]?.[currentLanguage] || item.category}
                </span>
                <h3 className="font-bold text-lg mb-2 flex-grow">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-3">{item.description}</p>
                
                <div className="mt-auto">
                  {item.type === 'report' ? (
                    <button onClick={() => setEmbedded(item)} className="w-full py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">
                      View Report
                    </button>
                  ) : (
                    <a href={item.csv_url} className="w-full block text-center py-2 bg-[#1A56A0] text-white rounded-lg text-sm font-semibold">
                      Download Dataset
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}