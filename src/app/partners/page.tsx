'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Handshake } from 'lucide-react'

// Define your categories
const partnerTypes = ['All', 'Academic', 'NGO', 'Government', 'Media', 'International']

// Translation map for UI display
const translations: Record<string, { en: string, fr: string, ht: string }> = {
  'All': { en: 'All', fr: 'Tous', ht: 'Tout' },
  'Academic': { en: 'Academic', fr: 'Académique', ht: 'Akademik' },
  'NGO': { en: 'NGO', fr: 'ONG', ht: 'ONG' },
  'Government': { en: 'Government', fr: 'Gouvernement', ht: 'Gouvènman' },
  'Media': { en: 'Media', fr: 'Média', ht: 'Medya' },
  'International': { en: 'International', fr: 'International', ht: 'Entènasyonal' }
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState('All')
  
  // Set your active language here (e.g., 'en', 'fr', or 'ht')
  const lang = 'fr' 

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('partners')
        .select('*')
        .eq('active', true)
        .order('name', { ascending: true })
      setPartners(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = type === 'All' ? partners : partners.filter(p => p.category === type)

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Nos Partenaires</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Organisations et institutions qui soutiennent la mission d'Ayiti Data de rendre
              les données d'Haïti ouvertes et accessibles.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* TYPE FILTERS */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {partnerTypes.map(t => (
            <button key={t} onClick={() => setType(t)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={type === t
                ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }
              }>
              {translations[t][lang as keyof typeof translations['All']]}
            </button>
          ))}
        </div>

        {/* PARTNERS GRID */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filtered.map((partner, i) => (
                <motion.div key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    {partner.logo_url ? (
                      <img src={partner.logo_url} alt={partner.name}
                        className="h-12 object-contain" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold font-sora"
                        style={{ background: 'var(--navy)' }}>
                        {partner.name?.charAt(0)}
                      </div>
                    )}
                    {partner.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: 'var(--light)', color: 'var(--muted)' }}>
                        {translations[partner.category][lang as keyof typeof translations['All']]}
                      </span>
                    )}
                  </div>
                  <h3 className="font-sora font-bold text-base mb-2"
                    style={{ color: 'var(--navy)' }}>
                    {partner.name}
                  </h3>
                  {partner.description && (
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                      {partner.description}
                    </p>
                  )}
                  {partner.website && (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                      style={{ color: 'var(--blue)' }}>
                      <ExternalLink className="w-3.5 h-3.5" /> Visiter le site
                    </a>
                  )}
                </motion.div>
              ))}

              {/* BECOME A PARTNER CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: filtered.length * 0.08 }}
              >
                <Link href="/work-with-us/partner"
                  className="block bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all h-full flex flex-col items-center justify-center text-center gap-3 min-h-48">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--light)' }}>
                    <Handshake className="w-6 h-6" style={{ color: 'var(--blue)' }} />
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-base mb-1"
                      style={{ color: 'var(--navy)' }}>
                      Devenir Partenaire
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                      Rejoignez notre réseau d'organisations soutenant les données ouvertes en Haïti.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: 'var(--blue)' }}>
                    En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}