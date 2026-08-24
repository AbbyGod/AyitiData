'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Database, Download, Search, FileText, Table, Code, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// UI translation dictionary
const UI_MAP: Record<string, Record<string, string>> = {
  'Datasets': { en: 'Datasets', fr: 'Jeux de données', ht: 'Done' },
  'HeroDesc': { 
    en: 'Clean, documented data about Haiti, free to download in CSV, Excel, or JSON.', 
    fr: 'Données propres et documentées sur Haïti, gratuites à télécharger en CSV, Excel ou JSON.', 
    ht: 'Done pwòp epi byen dokimante sou Ayiti, gratis pou telechaje nan fòma CSV, Excel oswa JSON.' 
  },
  'SearchPlaceholder': { en: 'Search datasets by title, source, topic...', fr: 'Rechercher des données par titre, source, sujet...', ht: 'Chèche done pa tit, sous, sijè...' },
  'dataset(s) found': { en: 'dataset(s) found', fr: 'jeu(x) de données trouvé(s)', ht: 'done yo jwenn' },
  'No datasets found': { en: 'No datasets found', fr: 'Aucun jeu de données trouvé', ht: 'Pa gen done yo te jwenn' },
  'Try a different search or category.': { en: 'Try a different search or category.', fr: 'Essayez une autre recherche ou catégorie.', ht: 'Eseye yon lòt rechèch oswa kategori.' },
  'Clear filters': { en: 'Clear filters', fr: 'Effacer les filtres', ht: 'Efase filtè yo' },
  'Can\'t find the data you need?': { en: 'Can\'t find the data you need?', fr: 'Vous ne trouvez pas les données dont vous avez besoin ?', ht: 'Èske ou pa jwenn done ou bezwen yo?' },
  'Submit a request...': { en: 'Submit a request and our team will try to find or prepare it for you.', fr: 'Soumettez une demande et notre équipe essaiera de les trouver ou de les préparer pour vous.', ht: 'Soumèt yon demann epi ekip nou an ap eseye jwenn oswa prepare yo pou ou.' },
  'Request a Dataset': { en: 'Request a Dataset', fr: 'Demander un jeu de données', ht: 'Mande yon done' }
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


export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const { lang } = useLanguage()
  const currentLanguage = lang || 'en'

  useEffect(() => {
    async function loadDatasets() {
      setLoading(true)
      const supabase = createClient()
      const { data } = await supabase
        .from('datasets')
        .select('*')
        .eq('language', currentLanguage)
        .order('created_at', { ascending: false })

      setDatasets(data || [])
      setLoading(false)
    }
    loadDatasets()
  }, [currentLanguage])

  async function handleDownload(dataset: any, format: string) {
    const supabase = createClient()
    await supabase.from('downloads').insert({ dataset_id: dataset.id, created_at: new Date().toISOString() })
    await supabase.from('datasets').update({ download_count: (dataset.download_count || 0) + 1 }).eq('id', dataset.id)
    
    const url = format === 'csv' ? dataset.csv_url : format === 'excel' ? dataset.excel_url : dataset.json_url
    if (url && url !== '#') window.open(url, '_blank')
  }

  const filtered = datasets.filter(d => {
    const matchSearch = search === '' || d.title?.toLowerCase().includes(search.toLowerCase()) || d.description?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || d.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-sora text-4xl font-bold text-white mb-3">{UI_MAP['Datasets'][currentLanguage]}</h1>
          <p className="text-white/70 text-lg max-w-xl mb-8">{UI_MAP['HeroDesc'][currentLanguage]}</p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={UI_MAP['SearchPlaceholder'][currentLanguage]} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm outline-none shadow-sm" />
          </div>
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
          {filtered.length} {UI_MAP['dataset(s) found'][currentLanguage]}
        </p>

        {loading ? <div className="py-20 text-center">...</div> : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Database className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>{UI_MAP['No datasets found'][currentLanguage]}</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{UI_MAP['Try a different search or category.'][currentLanguage]}</p>
            <button onClick={() => { setSearch(''); setCategory('All') }} className="text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>{UI_MAP['Clear filters'][currentLanguage]}</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((d, i) => {
              const cat = categoryColors[d.category] || categoryColors.Other
              return (
                <motion.div key={d.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {d.category && <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: cat.bg, color: cat.color }}>{CATEGORY_MAP[d.category][currentLanguage]}</span>}
                      </div>
                      <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>{d.title}</h3>
                      <p className="text-sm leading-relaxed mb-4 text-gray-600">{d.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {d.csv_url && <button onClick={() => handleDownload(d, 'csv')} className="px-4 py-2 rounded-xl text-xs font-bold border border-blue-600 text-blue-600">CSV</button>}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}>
          <h3 className="font-sora text-xl font-bold text-white mb-2">{UI_MAP['Can\'t find the data you need?'][currentLanguage]}</h3>
          <p className="text-white/70 text-sm mb-6">{UI_MAP['Submit a request...'][currentLanguage]}</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/30">{UI_MAP['Request a Dataset'][currentLanguage]} <ArrowRight className="w-4 h-4" /></a>
        </div>
      </div>
    </div>
  )
}