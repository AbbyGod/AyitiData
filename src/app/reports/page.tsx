'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { FileText, ExternalLink, Search, X } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// Translation dictionary
const UI_MAP: Record<string, Record<string, string>> = {
  'Reports': { en: 'Reports & Official Documents', fr: 'Rapports & Documents Officiels', ht: 'Rapò & Dokiman Ofisyèl' },
  'HeroDesc': { 
    en: 'Official reports from government agencies, international organizations, and research institutions linked directly from their original sources.', 
    fr: 'Rapports officiels d\'agences gouvernementales, d\'organisations internationales et d\'institutions de recherche liés directement depuis leurs sources originales.', 
    ht: 'Rapò ofisyèl ki soti nan ajans gouvènman, òganizasyon entènasyonal, ak enstitisyon rechèch ki soti dirèkteman nan sous orijinal yo.' 
  },
  'SearchPlaceholder': { en: 'Search reports by title, organization, topic...', fr: 'Rechercher par titre, organisation, sujet...', ht: 'Chèche rapò pa tit, òganizasyon, sijè...' },
  'No reports found': { en: 'No reports found', fr: 'Aucun rapport trouvé', ht: 'Pa jwenn okenn rapò' },
  'LegalNote': { 
    en: 'All reports on this page are linked directly from their original sources. Ayiti Data does not host or reproduce these documents.', 
    fr: 'Tous les rapports sur cette page sont liés directement depuis leurs sources originales. Ayiti Data n\'héberge ni ne reproduit ces documents.', 
    ht: 'Tout rapò ki sou paj sa a soti dirèkteman nan sous orijinal yo. Ayiti Data pa fabrike ni repwodui dokiman sa yo.' 
  },
  'ViewReport': { en: 'View Report', fr: 'Voir le rapport', ht: 'Gade rapò a' },
  'OpenOriginal': { en: 'Open Original', fr: 'Ouvrir l\'original', ht: 'Louvri orijinal la' },
  'ViewOnSource': { en: 'View on original source', fr: 'Voir sur la source originale', ht: 'Gade sou sous orijinal la' },
  'HostedOn': { en: 'This report is hosted on official website.', fr: 'Ce rapport est hébergé sur le site officiel.', ht: 'Rapò sa a sou sit entènèt ofisyèl la.' },
  'OpenReportBtn': { en: 'Open Report', fr: 'Ouvrir le rapport', ht: 'Louvri rapò a' }
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


export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [embedded, setEmbedded] = useState<any | null>(null)

  const { lang } = useLanguage()
  const currentLanguage = lang || 'en'

  useEffect(() => {
    async function loadReports() {
      setLoading(true)
      const supabase = createClient()
      const { data } = await supabase
        .from('reports')
        .select('*')
        .eq('language', currentLanguage)
        .order('year', { ascending: false })
      setReports(data || [])
      setLoading(false)
    }
    loadReports()
  }, [currentLanguage])

  const filtered = reports.filter(r => {
    const matchSearch = search === '' || r.title?.toLowerCase().includes(search.toLowerCase()) || r.organization?.toLowerCase().includes(search.toLowerCase()) || r.description?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || r.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">{UI_MAP['Reports'][currentLanguage]}</h1>
            <p className="text-white/70 text-lg max-w-xl mb-8">{UI_MAP['HeroDesc'][currentLanguage]}</p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={UI_MAP['SearchPlaceholder'][currentLanguage]} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm outline-none shadow-sm" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* EMBED VIEWER */}
      {embedded && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h3 className="font-sora font-bold text-base text-navy">{embedded.title}</h3>
                <p className="text-xs text-muted">{embedded.organization} · {embedded.year}</p>
              </div>
              <div className="flex items-center gap-3">
                <a href={embedded.embed_url || embedded.pdf_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl text-sm font-semibold border text-blue-600 hover:bg-gray-50">{UI_MAP['OpenOriginal'][currentLanguage]}</a>
                <button onClick={() => setEmbedded(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              {embedded.pdf_url ? <iframe src={embedded.pdf_url} className="w-full h-full border-none" /> : 
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-300 mb-4" />
                  <h4 className="font-bold text-lg mb-2 text-navy">{UI_MAP['ViewOnSource'][currentLanguage]}</h4>
                  <p className="text-sm max-w-md mb-6 text-gray-500">{UI_MAP['HostedOn'][currentLanguage]}</p>
                  <a href={embedded.embed_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-semibold text-white bg-navy">{UI_MAP['OpenReportBtn'][currentLanguage]}</a>
                </div>
              }
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={category === cat ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' } : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }}>
              {CATEGORY_MAP[cat][currentLanguage]}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-8 flex gap-3 text-sm text-blue-800">
          <span>ℹ️</span><p>{UI_MAP['LegalNote'][currentLanguage]}</p>
        </div>

        {loading ? <div className="py-20 text-center">...</div> : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border p-16 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-bold text-lg text-navy">{UI_MAP['No reports found'][currentLanguage]}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => {
              const cat = categoryColors[r.category] || categoryColors.Other
              return (
                <motion.div key={r.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="bg-white rounded-2xl border p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: cat.bg }}><FileText className="w-6 h-6" style={{ color: cat.color }} /></div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: cat.bg, color: cat.color }}>
                      {CATEGORY_MAP[r.category]?.[currentLanguage] || r.category || 'Other'}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-1 text-navy">{r.title}</h3>
                  <p className="text-sm text-gray-600 mb-5 flex-1">{r.description}</p>
                  <button onClick={() => setEmbedded(r)} className="w-full py-2 rounded-xl text-sm font-semibold border hover:bg-gray-50">{UI_MAP['ViewReport'][currentLanguage]}</button>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}