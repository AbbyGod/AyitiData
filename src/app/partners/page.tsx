'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Handshake } from 'lucide-react'

const partnerTypes = ['All', 'Academic', 'NGO', 'Government', 'Media', 'International']

const demoPartners = [
  { id: '1', name: 'World Bank Haiti', logo_url: null, website: 'https://worldbank.org', type: 'International', description: 'Key source of economic and development data for Haiti.' },
  { id: '2', name: 'OCHA Haiti', logo_url: null, website: 'https://unocha.org', type: 'International', description: 'Humanitarian coordination and data on crises in Haiti.' },
  { id: '3', name: 'IHSI', logo_url: null, website: 'https://ihsi.ht', type: 'Government', description: 'Institut Haïtien de Statistique et d\'Informatique — official statistics body of Haiti.' },
]

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState('All')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('partners')
        .select('*')
        .eq('active', true)
        .order('name', { ascending: true })
      setPartners(data && data.length > 0 ? data : demoPartners)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = type === 'All' ? partners : partners.filter(p => p.type === type)

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Our Partners</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Organizations and institutions that support Ayiti Data's mission to make
              Haiti's data open and accessible.
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
              {t}
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
                    {partner.type && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: 'var(--light)', color: 'var(--muted)' }}>
                        {partner.type}
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
                      <ExternalLink className="w-3.5 h-3.5" /> Visit Website
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
                      Become a Partner
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                      Join our network of organizations supporting open data in Haiti.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: 'var(--blue)' }}>
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
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